import { Navigation } from "@/components/wedding/Navigation";
import { WeddingConfigProvider } from "@/providers/WeddingConfigProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { weddingModel } from "@/db";

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
  const { slug } = params;
  const wedding = await weddingModel.findBySlug(slug);

  return (
    <WeddingConfigProvider slug={slug} config={wedding || undefined}>
      <ThemeProvider>
        <Navigation />
        {children}
      </ThemeProvider>
    </WeddingConfigProvider>
  );
}
