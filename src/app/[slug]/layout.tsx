import { Navigation } from "@/components/wedding/Navigation";
import { WeddingConfigProvider } from "@/providers/WeddingConfigProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { weddingModel } from "@/db";
import FirebaseInitializer from "@/components/FirebaseInitializer";
import { Suspense } from "react";
import { redirect } from "next/navigation";

interface WeddingLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default async function WeddingLayout({
  children,
  params,
}: WeddingLayoutProps) {
  const { slug } = await params;

  return (
    <>
      <FirebaseInitializer />
      <Suspense fallback={<div>Loading...</div>}>
        <WeddingContent slug={slug}>{children}</WeddingContent>
      </Suspense>
    </>
  );
}

// This component ensures Firebase is initialized before data fetching
async function WeddingContent({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const wedding = await weddingModel.findBySlug(slug);

  if (!wedding) {
    redirect("/not-found");
  }

  return (
    <WeddingConfigProvider slug={slug} config={wedding}>
      <ThemeProvider>
        <Navigation />
        {children}
      </ThemeProvider>
    </WeddingConfigProvider>
  );
}
