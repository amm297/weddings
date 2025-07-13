import { Navigation } from "@/components/wedding/Navigation";
import { WeddingConfigProvider } from "@/providers/WeddingConfigProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
    <WeddingConfigProvider slug={slug}>
      <ThemeProvider>
        <Navigation />
        {children}
      </ThemeProvider>
    </WeddingConfigProvider>
  );
}
