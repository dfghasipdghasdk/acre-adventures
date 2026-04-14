import { useState } from "react";
import { Plot } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PrebookDialogProps {
  plot: Plot | null;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrebookDialog = ({ plot, projectName, open, onOpenChange }: PrebookDialogProps) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const { toast } = useToast();

  if (!plot) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Submitted! 🎉",
      description: `We've received your interest in Plot ${plot.number} at ${projectName}. Our team will contact you within 24 hours.`,
    });
    onOpenChange(false);
    setForm({ name: "", phone: "", email: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Pre-Book Plot {plot.number}</DialogTitle>
          <DialogDescription className="font-body">
            {projectName} · {plot.sqft} sqft · {plot.facing} facing · ₹{(plot.price / 100000).toFixed(1)}L
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" />
          </div>
          <Button type="submit" className="w-full gradient-gold text-primary font-heading font-semibold">
            Submit Pre-Booking Request
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            No payment required. Our team will reach out to confirm.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrebookDialog;
