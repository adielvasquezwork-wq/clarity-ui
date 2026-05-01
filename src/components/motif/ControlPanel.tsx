import { FloraState, Species, PALETTES } from "@/lib/motifTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shuffle, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  state: FloraState;
  onChange: (s: Partial<FloraState>) => void;
  onRandomize: () => void;
  onDownload: () => void;
}

const SPECIES: { value: Species; label: string }[] = [
  { value: "rose", label: "Rose" },
  { value: "cheshire", label: "Cheshire" },
];

export function ControlPanel({ state, onChange, onRandomize, onDownload }: Props) {
  return (
    <div className="flex items-center gap-6 rounded-full border border-border bg-card px-5 py-3 shadow-sm">
      <div className="flex items-center gap-1">
        {SPECIES.map((s) => (
          <button
            key={s.value}
            onClick={() => onChange({ species: s.value })}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm transition-colors",
              state.species === s.value
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-1.5">
        {PALETTES.map((p, i) => (
          <button
            key={p.nm}
            onClick={() => onChange({ palette: i })}
            title={p.nm}
            className={cn(
              "h-7 w-7 rounded-full overflow-hidden border-2 transition-all",
              state.palette === i
                ? "border-foreground scale-110"
                : "border-transparent hover:border-border",
            )}
          >
            <div className="flex h-full w-full">
              <div style={{ background: p.ou }} className="flex-1" />
              <div style={{ background: p.inn }} className="flex-1" />
              <div style={{ background: p.acc }} className="flex-1" />
            </div>
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-border" />

      <Input
        type="number"
        value={state.seed}
        onChange={(e) => onChange({ seed: parseInt(e.target.value) || 0 })}
        className="h-8 w-24 font-mono text-sm"
      />

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onRandomize} className="h-8 w-8 rounded-full">
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDownload} className="h-8 w-8 rounded-full">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
