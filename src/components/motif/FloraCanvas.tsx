import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { renderFlora } from "@/lib/floraUtils";
import { FloraState, PALETTES } from "@/lib/motifTypes";

export function FloraCanvas({ state }: { state: FloraState }) {
  const floraContent = useMemo(() => renderFlora(state), [state]);
  const palette = PALETTES[state.palette];

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-3xl border border-border/50 transition-colors duration-500 shadow-2xl"
      style={{ backgroundColor: palette.bg }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.species}-${state.seed}-${state.palette}-${state.petals}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[75%] h-[75%] max-w-[500px] max-h-[500px]"
        >
          <svg
            viewBox="-200 -200 400 400"
            className="w-full h-full overflow-visible"
            dangerouslySetInnerHTML={{ __html: floraContent }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
