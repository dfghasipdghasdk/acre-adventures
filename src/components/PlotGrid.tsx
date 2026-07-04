import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plot } from "@/data/projects";
import { TreePine, TrendingUp, Sparkles, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import layoutImage from "/akul-gardens-layout.png";

const statusFill: Record<string, string> = {
  available: "#d5efb8",
  booked: "#e8a270",
  sold: "#68d853",
};
const statusStroke: Record<string, string> = {
  available: "#4f6b3a",
  booked: "#9f5c38",
  sold: "#2f7f2f",
};

const statusDotColors: Record<string, string> = {
  available: "bg-[#d5efb8]",
  booked: "bg-[#e8a270]",
  sold: "bg-[#68d853]",
};

const statusLabels: Record<string, string> = {
  available: "Vacant",
  booked: "Booked",
  sold: "Registered",
};

interface PlotGridProps {
  plots: Plot[];
  onSelectPlot: (plot: Plot) => void;
  projectName?: string;
}

const statusButtonColors: Record<string, string> = {
  available: "bg-[#d5efb8] text-[#2f4a1a] border-[#7fa05a] hover:bg-[#c2e29c]",
  booked: "bg-[#e8a270] text-[#5a2a14] border-[#9f5c38] hover:bg-[#d88a55]",
  sold: "bg-[#68d853] text-[#143a0e] border-[#2f7f2f] hover:bg-[#54c440]",
};

const PlotGrid = ({ plots }: PlotGridProps) => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
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
            <svg
              viewBox={akulLayout.viewBox}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {akulPlotShapes.map((shape) => {
                const plot = plotByNumber.get(shape.plotNumber);
                if (!plot) return null;
                const isSelected = selectedPlot?.number === plot.number;
                return (
                  <g key={shape.plotNumber} className="cursor-pointer" onClick={() => setSelectedPlot(plot)}>
                    <polygon
                      points={shape.polygonPoints}
                      fill={statusFill[plot.status]}
                      fillOpacity={isSelected ? 0.95 : 0.75}
                      stroke={isSelected ? "#0d0d0d" : statusStroke[plot.status]}
                      strokeWidth={isSelected ? 2 : 0.8}
                    />
                    <text
                      x={shape.center.x}
                      y={shape.center.y + 2}
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight="700"
                      fill="#1a1a1a"
                      pointerEvents="none"
                    >
                      {shape.plotNumber}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h4 className="font-heading text-sm font-bold">Choose a Plot</h4>
              <span className="text-xs text-muted-foreground">{plots.length} plots · refer to the layout above</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10 md:grid-cols-12">
              {plots.map((plot) => {
                const isSelected = selectedPlot?.number === plot.number;
                return (
                  <button
                    key={plot.number}
                    onClick={() => setSelectedPlot(plot)}
                    aria-label={`Plot ${plot.number}, ${statusLabels[plot.status]}`}
                    className={`aspect-square rounded border text-[10px] font-bold font-body transition-all ${statusButtonColors[plot.status]} ${isSelected ? "ring-2 ring-accent ring-offset-1 scale-110" : ""}`}
                  >
                    {plot.number}
                  </button>
                );
              })}
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
