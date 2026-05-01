import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { renderFlora } from "@/lib/floraUtils";
import { FloraState, PALETTES } from "@/lib/motifTypes";

export function FloraCanvas({ state }: { state: FloraState }) {
  const floraContent = useMemo(() => renderFlora(state), [state]);
  const palette = PALETTES[state.palette];

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-2xl border border-border transition-colors duration-500"
      style={{ backgroundColor: palette.bg }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.species}-${state.seed}-${state.palette}-${state.petals}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-[80%] h-[80%] max-w-[560px] max-h-[560px]"
        >
          <svg
            viewBox="-200 -200 400 400"
            className="w-full h-full overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            dangerouslySetInnerHTML={{ __html: floraContent }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
