import { Plot } from "@/data/projects";

const statusColors: Record<string, string> = {
  available: "bg-secondary hover:border-gold cursor-pointer",
  booked: "bg-accent/20 border-accent/50 cursor-not-allowed",
  sold: "bg-muted border-muted-foreground/20 cursor-not-allowed opacity-60",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  booked: "Booked",
  sold: "Sold",
};

interface PlotGridProps {
  plots: Plot[];
  onSelectPlot: (plot: Plot) => void;
}

const PlotGrid = ({ plots, onSelectPlot }: PlotGridProps) => (
  <div>
    <div className="mb-6 flex gap-4 text-sm font-body">
      {Object.entries(statusLabels).map(([key, label]) => (
        <div key={key} className="flex items-center gap-2">
          <div className={`h-4 w-4 rounded border ${statusColors[key].split(" ")[0]}`} />
          <span className="text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>

    <div className="relative" style={{ perspective: "1200px" }}>
      <div
        className="grid grid-cols-5 gap-3 rounded-lg border border-border bg-card p-6"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(15deg) rotateY(-5deg)" }}
      >
        {plots.map((plot) => (
          <button
            key={plot.id}
            onClick={() => plot.status === "available" && onSelectPlot(plot)}
            className={`relative rounded-md border p-3 transition-all ${statusColors[plot.status]}`}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
          >
            <p className="font-heading text-sm font-bold">{plot.number}</p>
            <p className="text-xs text-muted-foreground">{plot.sqft} sqft</p>
            <p className="mt-1 text-xs font-semibold text-gold">₹{(plot.price / 100000).toFixed(1)}L</p>
            <span className={`absolute right-1 top-1 h-2 w-2 rounded-full ${plot.status === "available" ? "bg-green-500" : plot.status === "booked" ? "bg-accent" : "bg-muted-foreground"}`} />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default PlotGrid;
