import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, TreePine, TrendingUp, Sparkles } from "lucide-react";

const Prebook = () => {
  const { slug, plotNumber } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const project = projects.find((p) => p.slug === slug);
  const plot = project?.plots.find((pl) => pl.number === plotNumber);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });

  if (!project || !plot) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-2xl font-bold">Plot not found</h1>
          <Link to="/projects" className="text-accent underline">Browse Projects</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pre-Booking Submitted! 🌳",
      description: `Interest registered for Plot ${plot.number} at ${project.name}. Our team will contact you within 24 hours.`,
    });
    setTimeout(() => navigate(`/project/${project.slug}`), 1200);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="gradient-forest py-10 text-primary-foreground">
        <div className="container">
          <Link to={`/project/${project.slug}`} className="mb-3 inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back to {project.name}
          </Link>
          <h1 className="font-heading text-3xl font-bold lg:text-4xl">Pre-Book Plot {plot.number}</h1>
          <p className="mt-2 opacity-80">{project.name} · {project.location}, {project.city}</p>
        </div>
      </section>

      <div className="container py-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Selected Plot</p>
              <h3 className="font-heading text-2xl font-bold">Plot {plot.number}</h3>
              <p className="text-sm text-muted-foreground">{plot.sqft} sqft · {plot.dimensions} · {plot.facing} facing</p>
            </div>
            <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
              <p className="text-2xl font-heading font-bold text-accent">₹{(plot.price / 100000).toFixed(1)}L</p>
              <p className="text-xs text-muted-foreground">₹{plot.pricePerSqft}/sqft</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <TreePine className="mx-auto mb-1 h-5 w-5 text-accent" />
                <p className="font-heading text-lg font-bold">{plot.sandalwoodTrees}</p>
                <p className="text-xs text-muted-foreground">Sandalwood Trees</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <TrendingUp className="mx-auto mb-1 h-5 w-5 text-accent" />
                <p className="font-heading text-lg font-bold">{plot.yieldPercentage}%</p>
                <p className="text-xs text-muted-foreground">Est. Annual Yield</p>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold mb-2 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-accent" /> Plot Benefits
              </h4>
              <ul className="space-y-1">
                {plot.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-xl font-bold mb-1">Your Details</h3>
          <p className="text-sm text-muted-foreground mb-5">No payment required. Our team will reach out to confirm your booking.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" required type="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" required type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes (optional)</Label>
              <Textarea id="notes" maxLength={500} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any questions or preferences?" />
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground font-heading font-semibold hover:opacity-90">
              Submit Pre-Booking
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Prebook;