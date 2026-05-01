import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { FloraState, PALETTES } from "@/lib/motifTypes";
import { renderFlora } from "@/lib/floraUtils";
import { ControlPanel } from "@/components/motif/ControlPanel";
import { FloraCanvas } from "@/components/motif/FloraCanvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Motif Generator" },
      { name: "description", content: "Generate and export botanical SVG motifs." },
    ],
  }),
  component: Index,
});

function Index() {
  const [state, setState] = useState<FloraState>({
    species: "rose",
    palette: 0,
    petals: 4,
    seed: 1042,
  });

  const handleChange = (partial: Partial<FloraState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  const handleRandomize = () => {
    const sps = ["rose", "cheshire"] as const;
    setState((prev) => ({
      ...prev,
      seed: Math.floor(Math.random() * 99997) + 1,
      species: sps[Math.floor(Math.random() * sps.length)],
      palette: Math.floor(Math.random() * PALETTES.length),
      petals: 3 + Math.floor(Math.random() * 3),
    }));
  };

  const handleDownload = useCallback(() => {
    const p = PALETTES[state.palette];
    const floraContent = renderFlora(state);
    const svgString = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="${p.bg}"/>
  <g transform="translate(400,400)">
    ${floraContent}
  </g>
</svg>`;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `motif-${state.species}-s${state.seed}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [state]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <aside className="w-80 shrink-0 border-r border-border bg-card/50 backdrop-blur-sm p-6 flex flex-col overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Motif</h1>
        </div>
        <ControlPanel
          state={state}
          onChange={handleChange}
          onRandomize={handleRandomize}
          onDownload={handleDownload}
        />
      </aside>
      <main className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="w-full max-w-2xl aspect-square">
          <FloraCanvas state={state} />
        </div>
      </main>
    </div>
  );
}
