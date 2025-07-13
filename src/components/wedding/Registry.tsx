import { Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const registryItems = [
    { name: 'Amazon', url: '#', description: 'For a variety of home goods and fun gadgets.' },
    { name: 'Crate & Barrel', url: '#', description: 'To help us build our dream kitchen and dining space.' },
    { name: 'Honeymoon Fund', url: '#', description: 'Contribute to our dream getaway adventure!' },
];

export function Registry() {
  return (
    <section className="py-12 md:py-20 bg-accent">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline mb-4 text-foreground">
          Wedding Registry
        </h2>
        <p className="max-w-2xl mx-auto mb-8 md:mb-12 text-foreground/80">
          Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at the following places.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
            {registryItems.map((item) => (
                <Card key={item.name} className="p-6 flex flex-col items-center justify-center bg-card shadow-lg border-primary/20">
                    <CardContent className="flex flex-col items-center justify-center p-0">
                        <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                            <Gift className="w-8 h-8"/>
                        </div>
                        <h3 className="text-2xl font-headline text-foreground">{item.name}</h3>
                        <p className="text-foreground/70 my-4 flex-grow">{item.description}</p>
                        <Button asChild className="mt-auto">
                            <Link href={item.url}>View Registry</Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
