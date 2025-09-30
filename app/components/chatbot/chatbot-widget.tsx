'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader, MessageSquare, Send, User, X } from 'lucide-react';
import { Button } from './../ui/button';
import { Input } from './../ui/input';
import { resumeChatbot } from './../../ai/flows/resume-chatbot';
import { ScrollArea } from './../ui/scroll-area';
import { Avatar, AvatarFallback } from './../ui/avatar';
import { cn } from './../../lib/utils';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'bot',
          text: "Hello! I'm Bazzinga, an AI assistant created by Sanjeet. Ask me anything about him.",
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, 100)
  }, [messages]);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // For local testing or when you want to avoid calling the real function,
      // use an inline mocked resolved promise. This preserves async behavior
      // so the UI (loading state, try/catch, etc.) behaves the same.
       const result = await resumeChatbot({ query: input });
      //const result = await Promise.resolve({ response: 'This is a mocked response.' });
      const botMessage: Message = { role: 'bot', text: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        role: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Button
            className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Chatbot"
          >
            {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-card rounded-xl border shadow-xl flex flex-col glassmorphism"
          >
            <header className="p-4 border-b flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="font-semibold font-headline">AI Assistant &quot;Bazzinga&quot;</h3>
            </header>

            <ScrollArea className="flex-1 p-4">
              <div ref={scrollAreaRef} className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {message.role === 'bot' && (
                      <Avatar className="w-8 h-8">
                         <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn(
                        'max-w-[80%] rounded-xl px-4 py-2 text-sm',
                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                        {message.text}
                    </div>
                     {message.role === 'user' && (
                      <Avatar className="w-8 h-8">
                         <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 justify-start">
                     <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                     </Avatar>
                      <div className="bg-muted rounded-xl px-4 py-2 flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin"/>
                        <span>Bazzinga is typing...</span>
                      </div>
                   </div>
                )}
              </div>
            </ScrollArea>

            <footer className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
