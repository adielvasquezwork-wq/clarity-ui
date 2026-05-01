import { FloraState, Species, PALETTES } from "@/lib/motifTypes";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Shuffle, Download, Leaf, Palette, Flower } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  state: FloraState;
  onChange: (s: Partial<FloraState>) => void;
  onRandomize: () => void;
  onDownload: () => void;
}

const SPECIES: { value: Species; label: string; icon: React.ReactNode }[] = [
  { value: "rose", label: "Rose", icon: <Flower className="h-4 w-4" /> },
  { value: "cheshire", label: "Cheshire", icon: <Leaf className="h-4 w-4" /> },
];

export function ControlPanel({ state, onChange, onRandomize, onDownload }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Shape Selection */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("shape")}
          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-2">
            <Flower className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Shape</span>
          </div>
          <span className="text-xs text-muted-foreground">{state.species}</span>
        </button>
        {expandedSection === "shape" && (
          <div className="grid grid-cols-2 gap-2 pl-3">
            {SPECIES.map((s) => (
              <button
                key={s.value}
                onClick={() => onChange({ species: s.value })}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all",
                  state.species === s.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50",
                )}
              >
                {s.icon}
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Palette Selection */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("palette")}
          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
        >
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Palette</span>
          </div>
          <span className="text-xs text-muted-foreground">#{state.palette + 1}</span>
        </button>
        {expandedSection === "palette" && (
          <div className="grid grid-cols-5 gap-2 pl-3">
            {PALETTES.map((p, i) => (
              <button
                key={p.nm}
                onClick={() => onChange({ palette: i })}
                title={p.nm}
                className={cn(
                  "aspect-square rounded-md overflow-hidden border-2 transition-all hover:scale-105",
                  state.palette === i
                    ? "border-foreground ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary",
                )}
              >
                <div className="flex h-full w-full flex-col">
                  <div style={{ background: p.ou }} className="flex-1" />
                  <div style={{ background: p.inn }} className="flex-1" />
                  <div style={{ background: p.acc }} className="flex-1" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Petals Control */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("petals")}
          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
        >
          <span className="text-sm font-medium">Petals</span>
          <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">{state.petals}</span>
        </button>
        {expandedSection === "petals" && (
          <div className="pl-3 pr-3 space-y-3">
            <Slider
              min={3}
              max={5}
              step={1}
              value={[state.petals]}
              onValueChange={([v]) => onChange({ petals: v })}
            />
          </div>
        )}
      </div>

      {/* Seed Control */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("seed")}
          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
        >
          <span className="text-sm font-medium">Seed</span>
          <span className="text-xs font-mono text-muted-foreground">{state.seed}</span>
        </button>
        {expandedSection === "seed" && (
          <div className="pl-3 pr-3">
            <input
              type="number"
              value={state.seed}
              onChange={(e) => onChange({ seed: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background font-mono"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto pt-6 border-t border-border grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={onRandomize}
          className="flex items-center justify-center gap-2"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button
          onClick={onDownload}
          className="flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
