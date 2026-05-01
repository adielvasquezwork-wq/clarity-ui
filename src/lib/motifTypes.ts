export type Species = 'rose' | 'cheshire';
export type CenterStyle = 'crown';

export interface Palette {
  bg: string;
  ou: string;
  inn: string;
  tip: string;
  vn: string;
  ce: string;
  acc: string;
  st: string;
  lf: string;
  nm: string;
}

export interface FloraState {
  species: Species;
  palette: number;
  petals: number;
  seed: number;
}

export const PALETTES: Palette[] = [
  { bg: '#1C1A1D', ou: '#FF5E2A', inn: '#FFD445', tip: '#019CC7', vn: '#FAA715', ce: '#FFD445', acc: '#019CC7', st: '#FF5E2A', lf: '#019CC7', nm: 'Solar Flare' },
  { bg: '#1C1A1D', ou: '#042952', inn: '#2C8EC9', tip: '#C1DCFF', vn: '#019CC7', ce: '#2C8EC9', acc: '#C1DCFF', st: '#042952', lf: '#C1DCFF', nm: 'Deep Ocean' },
  { bg: '#1C1A1D', ou: '#6C78FF', inn: '#FFD445', tip: '#042952', vn: '#FAA715', ce: '#FFD445', acc: '#042952', st: '#6C78FF', lf: '#FFD445', nm: 'Midnight Neon' },
  { bg: '#1C1A1D', ou: '#FF5216', inn: '#FAA715', tip: '#FFDB65', vn: '#FF7200', ce: '#FF5216', acc: '#FFDB65', st: '#FF5216', lf: '#FFDB65', nm: 'Citrus Punch' },
  { bg: '#1C1A1D', ou: '#11664E', inn: '#30D3A5', tip: '#72EDCA', vn: '#00736D', ce: '#30D3A5', acc: '#72EDCA', st: '#11664E', lf: '#72EDCA', nm: 'Emerald Depth' }
];
