import Image from 'next/image';

const photos = [
  { src: 'https://placehold.co/600x400.png', alt: 'Couple smiling', hint: 'couple smiling', className: 'md:col-span-2' },
  { src: 'https://placehold.co/400x600.png', alt: 'Couple holding hands', hint: 'couple hands', className: 'md:row-span-2' },
  { src: 'https://placehold.co/600x400.png', alt: 'Couple on a beach', hint: 'couple beach', className: 'md:col-span-2' },
  { src: 'https://placehold.co/600x400.png', alt: 'Couple laughing', hint: 'couple laughing' },
  { src: 'https://placehold.co/600x400.png', alt: 'Proposal moment', hint: 'proposal ring' },
];

export function PhotoGallery() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          Our Moments
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {photos.map((photo, index) => (
            <div key={index} className={`overflow-hidden rounded-lg shadow-lg group ${photo.className}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                data-ai-hint={photo.hint}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
