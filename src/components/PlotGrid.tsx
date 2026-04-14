import { useState } from "react";
import { Plot } from "@/data/projects";
import { TreePine, TrendingUp, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  available: "bg-accent/15 border-accent/40 hover:border-accent cursor-pointer",
  booked: "bg-destructive/10 border-destructive/30 cursor-not-allowed",
  sold: "bg-muted border-muted-foreground/20 cursor-not-allowed opacity-60",
};

const statusDotColors: Record<string, string> = {
  available: "bg-accent",
  booked: "bg-destructive",
  sold: "bg-muted-foreground",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  booked: "Booked",
  sold: "Sold",
};

interface PlotGridProps {
  plots: Plot[];
  onSelectPlot: (plot: Plot) => void;
  projectName?: string;
}

const PlotGrid = ({ plots, projectName = "" }: PlotGridProps) => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [prebookForm, setPrebookForm] = useState({ name: "", phone: "", email: "" });
  const { toast } = useToast();

  const handlePrebookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlot) return;
    toast({
      title: "Pre-Booking Submitted! 🌳",
      description: `Interest registered for Plot ${selectedPlot.number}. Our team will contact you within 24 hours.`,
    });
    setPrebookForm({ name: "", phone: "", email: "" });
  };

  return (
    <div>
      <div className="mb-6 flex gap-4 text-sm font-body">
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded border ${statusDotColors[key]}`} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="relative" style={{ perspective: "1200px" }}>
            <div
              className="grid grid-cols-5 gap-3 rounded-xl border border-border bg-card p-6"
              style={{ transformStyle: "preserve-3d", transform: "rotateX(12deg) rotateY(-4deg)" }}
            >
              {plots.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => plot.status === "available" && setSelectedPlot(plot)}
                  className={`relative rounded-lg border p-3 transition-all ${statusColors[plot.status]} ${selectedPlot?.id === plot.id ? "ring-2 ring-accent shadow-lg" : ""}`}
                  style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
                >
                  <p className="font-heading text-sm font-bold">{plot.number}</p>
                  <p className="text-xs text-muted-foreground">{plot.sqft} sqft</p>
                  <p className="mt-1 text-xs font-semibold text-accent">₹{(plot.price / 100000).toFixed(1)}L</p>
                  <span className={`absolute right-1 top-1 h-2 w-2 rounded-full ${statusDotColors[plot.status]}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedPlot && (
          <div className="w-full lg:w-[380px] rounded-xl border border-border bg-card p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold">Plot {selectedPlot.number}</h3>
                <p className="text-sm text-muted-foreground">{selectedPlot.sqft} sqft · {selectedPlot.facing} facing</p>
              </div>
              <button onClick={() => setSelectedPlot(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
              <p className="text-2xl font-heading font-bold text-accent">₹{(selectedPlot.price / 100000).toFixed(1)}L</p>
              <p className="text-xs text-muted-foreground">₹{selectedPlot.pricePerSqft}/sqft · {selectedPlot.dimensions}</p>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold mb-2 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-accent" /> Plot Benefits
              </h4>
              <ul className="space-y-1">
                {selectedPlot.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <TreePine className="mx-auto mb-1 h-5 w-5 text-accent" />
                <p className="font-heading text-lg font-bold">{selectedPlot.sandalwoodTrees}</p>
                <p className="text-xs text-muted-foreground">Sandalwood Trees</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <TrendingUp className="mx-auto mb-1 h-5 w-5 text-accent" />
                <p className="font-heading text-lg font-bold">{selectedPlot.yieldPercentage}%</p>
                <p className="text-xs text-muted-foreground">Est. Annual Yield</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-heading text-sm font-semibold mb-3">Pre-Book This Plot</h4>
              <form onSubmit={handlePrebookSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="pb-name" className="text-xs">Full Name</Label>
                  <Input id="pb-name" required value={prebookForm.name} onChange={e => setPrebookForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="h-9 text-sm" />
                </div>
                <div>
                  <Label htmlFor="pb-phone" className="text-xs">Phone</Label>
                  <Input id="pb-phone" required type="tel" value={prebookForm.phone} onChange={e => setPrebookForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" className="h-9 text-sm" />
                </div>
                <div>
                  <Label htmlFor="pb-email" className="text-xs">Email</Label>
                  <Input id="pb-email" required type="email" value={prebookForm.email} onChange={e => setPrebookForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" className="h-9 text-sm" />
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground font-heading font-semibold hover:opacity-90">
                  Submit Pre-Booking
                </Button>
                <p className="text-xs text-muted-foreground text-center">No payment required</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotGrid;
