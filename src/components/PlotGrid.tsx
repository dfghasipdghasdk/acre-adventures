import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Plot } from "@/data/projects";
import { TreePine, TrendingUp, Sparkles, X } from "lucide-react";
import { akulLayout, akulPlotShapes } from "@/data/akulGardensMap";
import { Button } from "@/components/ui/button";

const statusColors: Record<string, string> = {
  available: "fill-[#d5efb8] stroke-[#4f6b3a]",
  booked: "fill-[#e8a270] stroke-[#9f5c38]",
  sold: "fill-[#68d853] stroke-[#2f7f2f]",
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

const PlotGrid = ({ plots }: PlotGridProps) => {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const plotByNumber = new Map(plots.map((plot) => [plot.number, plot]));
  const navigate = useNavigate();
  const { slug } = useParams();
  const statusCount = plots.reduce(
    (acc, plot) => {
      acc[plot.status] += 1;
      return acc;
    },
    { available: 0, booked: 0, sold: 0 }
  );

  const activePlot = hoveredPlot ?? selectedPlot;

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
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card">
            <svg viewBox={akulLayout.viewBox} className="h-auto w-full">
              <path
                d={akulLayout.boundaryPath}
                fill="hsl(var(--secondary) / 0.18)"
                stroke="hsl(var(--secondary) / 0.55)"
                strokeWidth="3"
              />
              <text
                x={akulLayout.screen.x}
                y={akulLayout.screen.y}
                textAnchor="middle"
                className="fill-foreground/60 text-[14px] font-heading font-semibold tracking-[0.3em]"
              >
                {akulLayout.screen.label}
              </text>
              <text
                x={akulLayout.stageLabel.x}
                y={akulLayout.stageLabel.y}
                textAnchor="middle"
                className="fill-foreground/40 text-[11px] font-body tracking-[0.4em]"
              >
                {akulLayout.stageLabel.label}
              </text>

              {akulPlotShapes.map((shape) => {
                const plot = plotByNumber.get(shape.plotNumber);
                if (!plot) return null;
                const isSelected = selectedPlot?.number === shape.plotNumber;
                return (
                  <g key={shape.plotNumber}>
                    <polygon
                      points={shape.polygonPoints}
                      role="button"
                      tabIndex={0}
                      aria-label={`Plot ${plot.number}, ${statusLabels[plot.status]}`}
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                      onFocus={() => setHoveredPlot(plot)}
                      onBlur={() => setHoveredPlot(null)}
                      onClick={() => {
                        setSelectedPlot(plot);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedPlot(plot);
                        }
                      }}
                      className={`${statusColors[plot.status]} cursor-pointer transition-opacity hover:opacity-90 ${isSelected ? "stroke-[3]" : "stroke-[1.2]"}`}
                    />
                    <text
                      x={shape.center.x}
                      y={shape.center.y + 3}
                      textAnchor="middle"
                      className="pointer-events-none fill-foreground text-[7px] font-bold"
                    >
                      {plot.number}
                    </text>
                  </g>
                );
              })}
            </svg>

            {activePlot ? (
              <div className="pointer-events-none absolute right-3 top-3 w-56 rounded-lg border border-border bg-background/95 p-3 shadow-lg">
                <p className="font-heading text-sm font-bold">Plot {activePlot.number}</p>
                <p className="text-xs text-muted-foreground">Status: {statusLabels[activePlot.status]}</p>
                <p className="text-xs text-muted-foreground">Size: {activePlot.sqft} sqft</p>
                <p className="text-xs text-muted-foreground">Trees: {activePlot.sandalwoodTrees}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{activePlot.benefits[0]}</p>
              </div>
            ) : null}
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
