/** Pure pixel-art helpers: dithering, terrain and sprite data. No DOM here. */

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** Ordered-dither threshold in (0, 1) for a pixel position. */
export const bayer = (x: number, y: number): number => ((BAYER4[((y & 3) << 2) | (x & 3)] ?? 0) + 0.5) / 16;

/** Deterministic pseudo-random number in [0, 1) from an integer seed. */
export function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export interface Ridge {
  base: number;
  amp: number;
  phase: number;
  freq: number;
}

export const RIDGES = {
  far: { base: 0.58, amp: 0.05, phase: 0.7, freq: 1.1 },
  mid: { base: 0.7, amp: 0.045, phase: 2.1, freq: 1.6 },
  front: { base: 0.83, amp: 0.03, phase: 4.0, freq: 2.2 },
} as const satisfies Record<string, Ridge>;

/** Height (row index) of a ridge line at horizontal position u in 0..1. */
export function ridgeRow(r: Ridge, u: number, rows: number): number {
  const wave =
    Math.sin(u * Math.PI * 2 * r.freq + r.phase) * 0.65 +
    Math.sin(u * Math.PI * 2 * r.freq * 2.3 + r.phase * 1.7) * 0.35;
  return Math.round((r.base + wave * r.amp) * rows);
}

/** L leaf, h highlight, l shade, T trunk. */
export const TREE_SPRITES = {
  big: [
    "....hLLLL....",
    "..hhLLLLLL...",
    ".hLLLLLLLLL..",
    ".LLLLLLLLLLl.",
    "hLLLLLLLLLLLl",
    "LLLLLLLLLLLll",
    "LLLLLLLLLLlll",
    ".LLLLLLLLllL.",
    "..LLLLLLlll..",
    "....LLLll....",
    ".....TT......",
    ".....TT......",
    ".....TT......",
  ],
  medium: [
    "..hLLL...",
    ".hLLLLL..",
    "hLLLLLLl.",
    "LLLLLLLll",
    "LLLLLLlll",
    ".LLLLllL.",
    "...LLl...",
    "....T....",
    "....T....",
    "....T....",
  ],
  small: [
    ".hLL.",
    "hLLLl",
    "LLLll",
    ".Lll.",
    "..T..",
    "..T..",
  ],
} as const satisfies Record<string, readonly string[]>;

export const TREES: readonly { u: number; kind: keyof typeof TREE_SPRITES; phase: number }[] = [
  { u: 0.12, kind: "medium", phase: 0 },
  { u: 0.4, kind: "big", phase: 1.3 },
  { u: 0.6, kind: "small", phase: 2.1 },
  { u: 0.86, kind: "big", phase: 0.6 },
];

/** F fur, W white tip, N nose. Two walking frames, facing right. */
export const FOX_FRAMES: readonly (readonly string[])[] = [
  ["......F.", "WW.FFFFF", "WFFFFFFN", ".FFFFFF.", ".F.F..F."],
  ["......F.", "WW.FFFFF", "WFFFFFFN", ".FFFFFF.", "..F.F.F."],
];

export const CLOUDS = [
  { u: 0.15, row: 12, w: 11, speed: 0.9 },
  { u: 0.62, row: 7, w: 14, speed: 0.55 },
  { u: 0.88, row: 20, w: 9, speed: 0.7 },
] as const;

/** Plants that stand in for list bullets. S stem, L leaf, P petal, C centre, R cap, W spot, D soil. */
export const PLANT_SPRITES = {
  sprout: [
    "..L...L..",
    ".LLL.LLL.",
    "..LLSLL..",
    "....S....",
    "....S....",
    "....S....",
    ".D.DSD.D.",
  ],
  flower: [
    "...PPP...",
    "..PPCPP..",
    "..PPCPP..",
    "...PPP...",
    "....S....",
    "..L.S.L..",
    ".LL.S.LL.",
    "....S....",
    ".D.DSD.D.",
  ],
  tulip: [
    "..P.P.P..",
    "..PPPPP..",
    "..PPPPP..",
    "...PPP...",
    "....S....",
    "..L.S....",
    "..LLS....",
    "....S....",
    ".D.DSD.D.",
  ],
  mushroom: [
    "..RRRRR..",
    ".RRWRRWR.",
    "RRRRRRRRR",
    "..WWWWW..",
    "...WWW...",
    "...WWW...",
    ".D.DWD.D.",
  ],
} as const satisfies Record<string, readonly string[]>;

export type PlantKind = keyof typeof PLANT_SPRITES;
export const PLANT_ORDER: readonly PlantKind[] = ["sprout", "flower", "tulip", "mushroom"];
