import { Footer } from "@/components/wedding/Footer";
import { WeddingDisplay } from "@/components/wedding/WeddingDisplay";
import { weddingModel } from "@/db";
import { Metadata } from "next";

interface WeddingPageProps {
  params: {
    slug: string;
  };
}

// This function runs at build time to generate the static paths
export async function generateStaticParams() {
  const weddings = await weddingModel.findAll();
  return weddings.map((wedding) => ({
    slug: wedding.slug,
  }));
}

// Generate metadata based on wedding information
export async function generateMetadata({
  params,
}: WeddingPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const wedding = await weddingModel.findBySlug(slug);

    if (!wedding) {
      return {
        title: "Boda no encontrada",
      };
    }

    const { summary } = wedding;

    // Add null checks for summary and couple data
    if (!summary?.couple?.person1?.name || !summary?.couple?.person2?.name) {
      return {
        title: "Boda",
        description: "Información de la boda",
      };
    }

    return {
      title: `${summary.couple.person1.name} & ${summary.couple.person2.name} - Boda`,
      description: `Únete a nosotros para celebrar la boda de ${summary.couple.person1.name} y ${summary.couple.person2.name}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Boda",
    };
  }
}

export default function WeddingPage({ params }: WeddingPageProps) {
  return (
    <div id="home" className="flex flex-col min-h-dvh bg-background font-body">
      <main className="flex-grow">
        <WeddingDisplay />
      </main>
      <Footer />
    </div>
  );
}
