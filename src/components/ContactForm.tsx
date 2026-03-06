"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Thanks for reaching out.");
    setEmail("");
    setComment("");
    setCategory("");
  };

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-1 text-xl font-bold tracking-tight">Get in Touch</h2>
      <p className="mb-5 text-sm text-muted-foreground">
        Interested in a topic? Drop a note and select a category.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Textarea
          placeholder="What's on your mind?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a tech category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full gradient-brand text-primary-foreground">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </form>
    </section>
  );
}
