import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plot } from "@/data/projects";
import { TreePine, TrendingUp, Sparkles, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import layoutImage from "/akul-gardens-layout.png";

const statusLabels: Record<string, string> = {
  available: "Vacant",
  booked: "Booked",
  sold: "Registered",
};

const statusDotColors: Record<string, string> = {
  available: "bg-[#d5efb8]",
  booked: "bg-[#e8a270]",
  sold: "bg-[#68d853]",
};

interface PlotGridProps {
  plots: Plot[];
  onSelectPlot: (plot: Plot) => void;
  projectName?: string;
}

const PlotGrid = ({ plots }: PlotGridProps) => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [plotInput, setPlotInput] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const plotByNumber = new Map(plots.map((p) => [String(p.number), p]));
  const statusCount = plots.reduce(
    (acc, plot) => {
      acc[plot.status] += 1;
      return acc;
    },
    { available: 0, booked: 0, sold: 0 }
  );

  return (
    <div>
      <div className="mb-6 flex gap-4 text-sm font-body">
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded border ${statusDotColors[key]}`} />
            <span className="text-muted-foreground">
              {label} ({statusCount[key as keyof typeof statusCount]})
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={layoutImage}
              alt="Akul Gardens master layout"
              className="block w-full h-auto"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-heading text-sm font-bold">Find a Plot</h4>
              <span className="text-xs text-muted-foreground">Enter a plot number to view details</span>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  min={1}
                  max={plots.length}
                  placeholder="Plot number (e.g. 42)"
                  className="pl-9"
                  value={plotInput}
                onChange={(e) => {
                    const value = e.target.value;
                    setPlotInput(value);
                    const num = String(parseInt(value, 10));
                    const plot = plots.find((p) => p.number === num);
                    setSelectedPlot(plot ?? null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const num = String(parseInt(plotInput, 10));
                      const plot = plots.find((p) => p.number === num);
                      if (plot) setSelectedPlot(plot);
                    }
                  }}
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  const num = String(parseInt(plotInput, 10));
                  const plot = plots.find((p) => p.number === num);
                  if (plot) setSelectedPlot(plot);
                }}
              >
                Show Info
              </Button>
            </div>
            {selectedPlot && (
              <p className="mt-3 text-sm text-muted-foreground">
                Showing details for Plot <span className="font-semibold text-foreground">{selectedPlot.number}</span>
              </p>
            )}
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

            {slug && selectedPlot.status === "available" ? (
              <div className="border-t border-border pt-4">
                <Button
                  onClick={() => navigate(`/prebook/${slug}/${selectedPlot.number}`)}
                  className="w-full bg-accent text-accent-foreground font-heading font-semibold hover:opacity-90"
                >
                  Pre-Book This Plot
                </Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">Opens booking form · No payment required</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotGrid;
