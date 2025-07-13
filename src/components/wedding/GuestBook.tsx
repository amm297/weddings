"use client";

import { useState } from "react";
import { BookHeart, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

interface Message {
  name: string;
  message: string;
  timestamp: Date;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

const initialMessages: Message[] = [
  {
    name: "Aunt Carol",
    message: "So thrilled for you both! Can't wait to celebrate with you.",
    timestamp: new Date(2023, 5, 15),
  },
  {
    name: "John & Jane",
    message: "Wishing you a lifetime of love and happiness. Congratulations!",
    timestamp: new Date(2023, 5, 10),
  },
];

export function GuestBook() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setMessages([
      {
        name: values.name,
        message: values.message,
        timestamp: new Date(),
      },
      ...messages,
    ]);

    form.reset();

    toast({
      title: "Message Sent!",
      description: "Thank you for your well wishes.",
    });
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return (
    <section id="rsvp" className="py-12 md:py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-4 font-headline border-primary/30 text-primary px-3 py-1"
          >
            RSVP & WISHES
          </Badge>
          <h2 className="text-3xl md:text-4xl font-headline mb-4 text-foreground">
            Digital Guest Book
          </h2>
          <p className="text-foreground/80">
            Leave us your well wishes and let us know if you'll be joining us on
            our special day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-3 text-foreground">
                <BookHeart className="text-primary" />
                Leave a Message
              </CardTitle>
              <CardDescription>
                Share your thoughts and well wishes with the couple
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Jane Doe"
                            className="bg-background/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your well wishes..."
                            className="bg-background/50"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={cn(
                      "w-full gap-2",
                      "transition-all duration-300"
                    )}
                  >
                    <Send className="w-4 h-4" />
                    Sign Guest Book
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-xl font-headline mb-4 flex items-center gap-2">
              <Heart className="text-primary w-5 h-5" />
              Recent Messages
            </h3>

            <ScrollArea className="h-[500px] rounded-md border border-primary/20 p-4">
              <div className="space-y-6 pr-4">
                {messages.map((msg, index) => (
                  <Card
                    key={index}
                    className="bg-accent/70 border-none shadow-sm"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {getInitials(msg.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-foreground/90 text-lg italic">
                            "{msg.message}"
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-primary font-semibold">
                              - {msg.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
}
