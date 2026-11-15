import { PLANT_SPRITES, type PlantKind } from "@domain/pixel";

const CLASS: Record<string, string> = {
  S: "px-s",
  L: "px-l",
  P: "px-p",
  C: "px-c",
  R: "px-r",
  W: "px-w",
  D: "px-d",
};

/** A pixel plant as inline SVG; colours come from CSS so it follows day, night and season. */
export function plantSvg(kind: PlantKind): string {
  const rows = PLANT_SPRITES[kind];
  const w = rows[0]?.length ?? 0;
  let rects = "";
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const cls = CLASS[row[x] ?? "."];
      if (cls) rects += `<rect class="${cls}" x="${x}" y="${y}" width="1" height="1"/>`;
    }
  });
  return `<svg class="plant-svg plant-${kind}" viewBox="0 0 ${w} ${rows.length}" width="${w * 3}" height="${rows.length * 3}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}
