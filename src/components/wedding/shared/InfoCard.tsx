import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="w-full transition-transform hover:-translate-y-1 border-primary/20">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 bg-primary/5">
      <div className="text-primary">{icon}</div>
      <CardTitle className="font-headline text-2xl text-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 text-foreground/80 space-y-2">
      {children}
    </CardContent>
  </Card>
);
