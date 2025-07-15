import { Hero } from "@/components/wedding/Hero";
import { CountdownTimer } from "@/components/wedding/CountdownTimer";
import { WeddingInfo } from "@/components/wedding/WeddingInfo";
import { PhotoGallery } from "@/components/wedding/PhotoGallery";
import { Registry } from "@/components/wedding/Registry";
import { GuestBook } from "@/components/wedding/GuestBook";
import { Footer } from "@/components/wedding/Footer";
import { FAQ } from "@/components/wedding/FAQ";
import { Separator } from "@/components/ui/separator";
import { weddingModel } from "@/db";
import { Metadata } from "next";

interface WeddingPageProps {
  params: {
    slug: string;
  };
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
        <Hero />
        <CountdownTimer />
        {/* <WeddingInfo /> */}
        {/* Add new hotels section */}
        {/* add new timeline section */}
        {/* <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" /> */}
        {/* <PhotoGallery /> New page with a QR only available on wedding date */}
        {/* <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" /> */}
        {/* <Registry />  Update by seciton called bankAccount*/}
        {/* <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" /> */}
        <FAQ />
        {/* <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" /> */}
        {/* <GuestBook /> */}
      </main>
      <Footer />
    </div>
  );
}
