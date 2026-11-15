/** Tiny pixel icons, generated from geometry and rendered as crisp SVG squares. */
const SIZE = 11;
const C = 5;

function svg(on: (x: number, y: number) => boolean): string {
  let rects = "";
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (on(x, y)) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" width="15" height="15" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${rects}</svg>`;
}

const RAYS = [
  [0, -4], [0, 4], [-4, 0], [4, 0], [-3, -3], [3, -3], [-3, 3], [3, 3],
] as const;

export const sunIcon = svg((x, y) => {
  const dx = x - C;
  const dy = y - C;
  return dx * dx + dy * dy <= 7 || RAYS.some(([rx, ry]) => rx === dx && ry === dy);
});

export const moonIcon = svg((x, y) => {
  const dx = x - C;
  const dy = y - C;
  const bite = (dx - 2) * (dx - 2) + (dy + 1) * (dy + 1) <= 14;
  return dx * dx + dy * dy <= 18 && !bite;
});
