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

    // Get preview image and make it absolute
    // Extract just the path from image metadata format like "path/to/image.png 1200 630 webp"
    const previewImageRaw = summary?.previewImage;
    const previewImagePath = previewImageRaw?.split(" ")[0]; // Extract just the path
    const absoluteImageUrl = previewImagePath
      ? previewImagePath.startsWith("http")
        ? previewImagePath
        : `https://wedding-page-4te30.web.app${
            previewImagePath.startsWith("/") ? "" : "/"
          }${previewImagePath}`
      : null;

    const pageUrl = `https://wedding-page-4te30.web.app/${slug}`;

    const description = `Únete a nosotros para celebrar la boda de ${summary.couple.person1.name} y ${summary.couple.person2.name}`;
    const title = `${summary.couple.person1.name} & ${summary.couple.person2.name}`;
    const imageAlt = `Boda de ${summary.couple.person1.name} y ${summary.couple.person2.name}`;

    return {
      title: `${title} - Boda`,
      description,
      openGraph: {
        title,
        description: `Únete a nosotros para celebrar nuestra boda`,
        url: pageUrl,
        siteName: title,
        locale: "es_ES",
        type: "website",
        ...(absoluteImageUrl && {
          images: [
            {
              url: absoluteImageUrl,
              width: 1200,
              height: 630,
              alt: imageAlt,
              type: "image/png",
            },
          ],
        }),
      },
      // Twitter Card meta tags (used by Android and many apps)
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(absoluteImageUrl && {
          images: [absoluteImageUrl],
        }),
      },
      // Additional meta tags for better compatibility
      ...(absoluteImageUrl && {
        other: {
          image: absoluteImageUrl,
          "og:image:secure_url": absoluteImageUrl,
          "og:image:type": "image/png",
          "og:image:width": "1200",
          "og:image:height": "630",
        },
      }),
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
