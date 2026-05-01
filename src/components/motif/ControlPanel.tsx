import { FloraState, Species, PALETTES } from "@/lib/motifTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
    <div className="flex flex-col gap-8 h-full">
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Shape</Label>
        <div className="grid grid-cols-2 gap-2">
          {SPECIES.map((s) => (
            <button
              key={s.value}
              onClick={() => onChange({ species: s.value })}
              className={cn(
                "rounded-md border px-3 py-2 text-sm transition-colors",
                state.species === s.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:bg-accent",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Palette</Label>
        <div className="grid grid-cols-5 gap-2">
          {PALETTES.map((p, i) => (
            <button
              key={p.nm}
              onClick={() => onChange({ palette: i })}
              title={p.nm}
              className={cn(
                "aspect-square rounded-md overflow-hidden border-2 transition-all",
                state.palette === i
                  ? "border-foreground scale-105"
                  : "border-transparent hover:border-border",
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
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <Label className="text-xs text-muted-foreground">Petals</Label>
          <span className="font-mono text-sm tabular-nums">{state.petals}</span>
        </div>
        <Slider
          min={3}
          max={5}
          step={1}
          value={[state.petals]}
          onValueChange={([v]) => onChange({ petals: v })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seed" className="text-xs text-muted-foreground">Seed</Label>
        <Input
          id="seed"
          type="number"
          value={state.seed}
          onChange={(e) => onChange({ seed: parseInt(e.target.value) || 0 })}
          className="font-mono"
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onRandomize}>
          <Shuffle className="mr-2 h-4 w-4" />
          Random
        </Button>
        <Button onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
