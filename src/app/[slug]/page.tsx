import { Footer } from "@/components/wedding/Footer";
import { weddingModel } from "@/db";
import { Metadata } from "next";
import { WeddingDisplay } from "@/components/wedding/WeddingDisplay";

interface WeddingPageProps {
  params: {
    slug: string;
  };
}

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
  const { slug } = params;

  try {
    const wedding = await weddingModel.findBySlug(slug);

    if (!wedding) {
      return {
        title: "Wedding Not Found",
      };
    }

    return {
      title: `${wedding.couple.person1.name} & ${wedding.couple.person2.name} - Wedding`,
      description: `Join us to celebrate the wedding of ${wedding.couple.person1.name} and ${wedding.couple.person2.name}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Wedding",
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
