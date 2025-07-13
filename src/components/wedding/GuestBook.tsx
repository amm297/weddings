'use client';

import { useState } from 'react';
import { BookHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"

interface Message {
  name: string;
  message: string;
}

const initialMessages: Message[] = [
    { name: 'Aunt Carol', message: 'So thrilled for you both! Can\'t wait to celebrate with you.' },
    { name: 'John & Jane', message: 'Wishing you a lifetime of love and happiness. Congratulations!' },
];

export function GuestBook() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setMessages([{ name, message }, ...messages]);
      setName('');
      setMessage('');
      toast({
        title: "Message Sent!",
        description: "Thank you for your well wishes.",
      })
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          Digital Guest Book
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
            <div>
                <Card className="bg-card shadow-lg p-4 sm:p-6 border-primary/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-3 text-foreground">
                            <BookHeart className="text-primary"/>
                            Leave a Message
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">Your Name</label>
                                <Input 
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Jane Doe"
                                    required
                                    className="bg-background/50"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">Your Message</label>
                                <Textarea 
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Share your well wishes..."
                                    required
                                    rows={4}
                                    className="bg-background/50"
                                />
                            </div>
                            <Button type="submit" className="w-full">Sign Guest Book</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 -mr-4">
                {messages.map((msg, index) => (
                    <Card key={index} className="bg-accent/70 border-none shadow-md transition-all duration-500">
                        <CardContent className="p-6">
                            <p className="text-foreground/90 text-lg italic">"{msg.message}"</p>
                            <p className="text-right text-primary font-semibold mt-4">- {msg.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
