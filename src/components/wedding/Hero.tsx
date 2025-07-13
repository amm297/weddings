import { Calendar } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-accent">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="font-headline text-lg md:text-xl text-foreground/80 mb-4 tracking-widest">
          WE'RE GETTING MARRIED
        </p>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
          Olivia &amp; Liam
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4 text-foreground/90">
          <Calendar className="w-6 h-6 text-primary" />
          <p className="font-headline text-2xl md:text-3xl">
            September 20, 2025
          </p>
        </div>
      </div>
    </section>
  );
}
