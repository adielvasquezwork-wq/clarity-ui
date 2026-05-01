import { FloraState, PALETTES } from './motifTypes';

export function mkR(seed: number) {
  let s = (seed + 1) * 9999;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (s >>> 0) / 0xFFFFFFFF;
  };
}

const f1 = (n: number) => n.toFixed(1);

/* ---- BLOBBY MOTIF PATHS (Abstract Mode) ---- */
function blobPD(n: number, r: number, pull: number) {
  const d: string[] = [];
  const step = (Math.PI * 2) / n;
  for (let i = 0; i < n; i++) {
    const a1 = i * step;
    const a2 = (i + 1) * step;
    const mid = (a1 + a2) / 2;
    const p1x = Math.cos(a1) * r;
    const p1y = Math.sin(a1) * r;
    const cp1x = Math.cos(mid) * r * pull;
    const cp1y = Math.sin(mid) * r * pull;
    const p2x = Math.cos(a2) * r;
    const p2y = Math.sin(a2) * r;
    if (i === 0) d.push(`M ${f1(p1x)} ${f1(p1y)}`);
    d.push(`Q ${f1(cp1x)} ${f1(cp1y)}, ${f1(p2x)} ${f1(p2y)}`);
  }
  return d.join(' ') + ' Z';
}

export function renderFlora(s: FloraState) {
  const p = PALETTES[s.palette];
  let o = '';

  const sz = 1.0;
  const n = s.petals % 2 === 0 ? s.petals : s.petals + 1; // Prefer even for symmetry

  switch (s.species) {
    case 'rose':
      // The "Floral Stack" (Scalloped style)
      o += `<path d="${blobPD(n, 120 * sz, 1.5)}" fill="${p.ou}" />`;
      o += `<path d="${blobPD(n, 85 * sz, 1.6)}" fill="${p.inn}" />`;
      o += `<path d="${blobPD(n * 2, 50 * sz, 1.4)}" fill="${p.acc}" />`;
      o += `<circle r="${f1(12 * sz)}" fill="${p.ou}" />`;
      break;
    case 'cheshire':
      // The "Stacked Motif" (Rounded Diamond/Square Ref: image)
      o += `<path d="${blobPD(4, 125 * sz, 1.8)}" fill="${p.ou}" />`;
      o += `<path d="${blobPD(4, 95 * sz, 1.8)}" fill="${p.inn}" transform="rotate(45)" />`;
      o += `<path d="${blobPD(8, 55 * sz, 1.4)}" fill="${p.acc}" />`;
      o += `<circle r="${f1(10 * sz)}" fill="${p.ce}" />`;
      break;
  }

  return o;
}
