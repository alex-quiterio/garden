export type Season = "spring" | "summer" | "autumn" | "winter";

export const SEASONS: readonly Season[] = ["spring", "summer", "autumn", "winter"];

export interface Sky {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  rule: string;
  leaf: string;
  hill1: string;
  hill2: string;
  body: string;
  leafOpacity: number;
  stars: number;
  isNight: boolean;
  /** 0..1 across the horizon */
  bodyX: number;
  /** 0 (top) .. 1 (bottom) */
  bodyY: number;
}

interface Palette {
  bg: string;
  ink: string;
  accent: string;
  leaf: string;
  hill1: string;
  hill2: string;
}

const DAY: Record<Season, Palette> = {
  spring: { bg: "#f4f1e6", ink: "#23301f", accent: "#3d6f2d", leaf: "#8fbf63", hill1: "#c9d8a3", hill2: "#aac27f" },
  summer: { bg: "#f8f1dc", ink: "#2a2a1c", accent: "#8a6212", leaf: "#6f9a3a", hill1: "#e1d197", hill2: "#c9b86d" },
  autumn: { bg: "#f6ebdd", ink: "#33241b", accent: "#a8461f", leaf: "#d2822f", hill1: "#e3c39a", hill2: "#c99a6b" },
  winter: { bg: "#eef1f4", ink: "#1f2a33", accent: "#3b5f7c", leaf: "#8aa0ab", hill1: "#dfe6ea", hill2: "#c4cfd6" },
};

/** Midnight garden: deep indigo sky, teal hills, one lit accent per season. */
const NIGHT: Record<Season, Palette> = {
  spring: { bg: "#0b1622", ink: "#e4efe9", accent: "#7fe0b4", leaf: "#2e6b5a", hill1: "#14283a", hill2: "#1b3a48" },
  summer: { bg: "#0d1226", ink: "#e8e6f5", accent: "#ffc66e", leaf: "#2f6a58", hill1: "#182346", hill2: "#213056" },
  autumn: { bg: "#0f1428", ink: "#e9e8f5", accent: "#ff9a6b", leaf: "#5a4d78", hill1: "#1a2146", hill2: "#262c5a" },
  winter: { bg: "#0a1420", ink: "#e3edf6", accent: "#8fd0ff", leaf: "#3a5b6e", hill1: "#14293b", hill2: "#1c3a50" },
};

export const SUN = "#f2b84b";
export const MOON = "#dfe6f2";

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const ch = (x: number, y: number) =>
    Math.round(x + (y - x) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${ch(ar, br)}${ch(ag, bg)}${ch(ab, bb)}`;
}

/** How much daylight there is at a given hour (0 = deep night, 1 = full day). */
export function daylight(hour: number): number {
  const elevation = Math.sin((Math.PI * (hour - 6)) / 12);
  return clamp(0.5 + elevation * 0.9);
}

/** Meteorological seasons for the northern hemisphere. */
export function seasonOf(monthIndex: number): Season {
  if (monthIndex >= 2 && monthIndex <= 4) return "spring";
  if (monthIndex >= 5 && monthIndex <= 7) return "summer";
  if (monthIndex >= 8 && monthIndex <= 10) return "autumn";
  return "winter";
}

export function skyFor(hour: number, season: Season): Sky {
  const h = ((hour % 24) + 24) % 24;
  const d = daylight(h);
  const day = DAY[season];
  const night = NIGHT[season];
  const m = (k: keyof Palette) => mix(night[k], day[k], d);

  const bg = m("bg");
  const ink = m("ink");
  const isSunUp = h >= 6 && h < 18;
  const progress = isSunUp ? (h - 6) / 12 : ((h - 18 + 24) % 24) / 12;

  return {
    bg,
    ink,
    muted: mix(ink, bg, 0.32),
    accent: m("accent"),
    rule: mix(ink, bg, 0.82),
    leaf: m("leaf"),
    hill1: m("hill1"),
    hill2: m("hill2"),
    body: isSunUp ? SUN : MOON,
    leafOpacity: season === "winter" ? 0.3 : 1,
    stars: clamp(1 - d * 1.6),
    isNight: d < 0.5,
    bodyX: 0.08 + 0.84 * progress,
    bodyY: 0.86 - 0.55 * Math.sin(Math.PI * progress),
  };
}
