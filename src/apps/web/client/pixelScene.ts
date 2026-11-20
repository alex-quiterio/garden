import { bayer, CLOUDS, FOX_FRAMES, hash, RIDGES, ridgeRow, TREE_SPRITES, TREES } from "@domain/pixel";
import { hexToRgb, mix, MOON, type Sky } from "@domain/sky";

type RGB = [number, number, number];

/** Scene height in CSS pixels stays fixed; the pixel size decides how many rows that is. */
const SCENE_HEIGHT = 360;
const STAR_COUNT = 48;

export interface Scene {
  resize(): void;
  draw(sky: Sky, seconds: number, animate: boolean): void;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function createScene(canvas: HTMLCanvasElement): Scene {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas is not available");

  let H = SCENE_HEIGHT / 0.5;
  let W = 1;
  let px = 4;
  let img = ctx.createImageData(1, H);
  let far = new Int16Array(1);
  let mid = new Int16Array(1);
  let front = new Int16Array(1);
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({ u: hash(i * 3 + 1), v: hash(i * 3 + 2) * 0.5 }));

  function resize(): void {
    const width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    px = width < 600 ? 1.5 : 2;
    H = Math.round(SCENE_HEIGHT / px);
    W = Math.max(1, Math.ceil(width / px));
    canvas.width = W;
    canvas.height = H;
    canvas.style.height = `${H * px}px`;
    img = ctx!.createImageData(W, H);
    far = new Int16Array(W);
    mid = new Int16Array(W);
    front = new Int16Array(W);
    for (let x = 0; x < W; x++) {
      const u = x / W;
      far[x] = ridgeRow(RIDGES.far, u, H);
      mid[x] = ridgeRow(RIDGES.mid, u, H);
      front[x] = ridgeRow(RIDGES.front, u, H);
    }
  }

  function draw(sky: Sky, t: number, animate: boolean): void {
    const d = img.data;
    d.fill(0);
    const set = (x: number, y: number, c: RGB, a = 255) => {
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      const i = (y * W + x) * 4;
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = a;
    };
    const col = (hex: string): RGB => hexToRgb(hex);
    const tt = animate ? t : 0;
    // The pixels are tiny, so shapes are sized in units that keep the old proportions.
    const s = 1 / px; // scene pixels per CSS pixel
    const k = 3 * s; // scale of the original 3px-per-pixel art
    const sp = Math.max(1, Math.ceil(3 * s)); // sprite pixel
    const st = Math.max(1, Math.round(s)); // star / firefly size
    const block = (x: number, y: number, c: RGB, w = sp, h = sp) => {
      for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) set(x + dx, y + dy, c);
    };

    // Dithered dusk glow rising from the horizon.
    const glow = col(mix(sky.bg, mix(sky.accent, "#4f5fc4", clamp01(sky.stars)), 0.2));
    for (let y = 0; y < H; y++) {
      const v = Math.pow(clamp01(y / (H * 0.8)), 2.6) * 0.85;
      for (let x = 0; x < W; x++) if (v > bayer(x, y)) set(x, y, glow);
    }

    // Stars.
    const starCol = col(sky.ink);
    stars.forEach((star, i) => {
      if (i / STAR_COUNT >= sky.stars) return;
      if (animate && Math.floor(tt * 2 + i * 1.7) % 9 === 0) return;
      block(Math.floor(star.u * W), Math.floor(star.v * H), starCol, st, st);
    });

    // Sun or crescent moon with a dithered halo.
    const cx = Math.round(sky.bodyX * W);
    const cy = Math.round(sky.bodyY * H);
    const bodyCol = col(sky.body);
    const haloCol = col(mix(sky.bg, sky.body, 0.45));
    const isMoon = sky.body === MOON;
    const R = Math.ceil(9 * k);
    for (let py = -R; py <= R; py++) {
      for (let pxl = -R; pxl <= R; pxl++) {
        const dx = pxl / k;
        const dy = py / k;
        const r2 = dx * dx + dy * dy;
        const x = cx + pxl;
        const y = cy + py;
        if (r2 <= 10) {
          const bite = (dx - 2) * (dx - 2) + (dy + 1) * (dy + 1) <= 8;
          if (!(isMoon && bite)) set(x, y, bodyCol);
        } else if (r2 <= 36 && bayer(x, y) < 0.3) set(x, y, haloCol);
        else if (r2 <= 72 && bayer(x, y) < 0.1) set(x, y, haloCol);
      }
    }

    // Drifting clouds.
    const cloudCol = col(mix(sky.bg, sky.ink, 0.1));
    for (const cloud of CLOUDS) {
      const w = Math.round(cloud.w * 1.4 * k);
      const row = Math.round((cloud.row * H) / 80);
      const x0 = ((cloud.u * W + tt * cloud.speed * 2 * k) % (W + 40 * k)) - 20 * k;
      for (let dy = Math.round(-3 * k); dy <= Math.round(2 * k); dy++) {
        for (let dx = -w; dx <= w; dx++) {
          const a = (dx / w) ** 2 + (dy / (2.2 * k)) ** 2 < 1;
          const b = ((dx - w * 0.35) / (w * 0.55)) ** 2 + ((dy + 2 * k) / (2 * k)) ** 2 < 1;
          if (a || b) set(Math.round(x0 + dx), row + dy, cloudCol);
        }
      }
    }

    // Far hill: a checker dither over the sky.
    const farCol = col(sky.hill1);
    for (let x = 0; x < W; x++) {
      for (let y = far[x] ?? 0; y < H; y++) {
        const keep = 0.62 * (1 - clamp01((y - (far[x] ?? 0)) / (H - (far[x] ?? 0))));
        if (bayer(x, y) < keep) set(x, y, farCol);
      }
    }

    // Middle hill, fading out into the page with dither.
    const midCol = col(mix(sky.hill1, sky.hill2, 0.4));
    for (let x = 0; x < W; x++) {
      const top = mid[x] ?? 0;
      for (let y = top; y < H; y++) {
        const keep = 1 - Math.pow(clamp01((y - top) / (H - top)), 1.3);
        if (y === top || bayer(x, y) < keep) set(x, y, midCol);
      }
    }

    // Moinho saloio: a whitewashed round tower with a thatched cone and cloth sails.
    {
      const night = 0.1 + sky.stars * 0.78;
      const wall = col(mix("#f6f1e6", sky.bg, night));
      const shade = col(mix("#d6cdbb", sky.bg, night));
      const band = col(mix("#3f6aa8", sky.bg, night));
      const thatch = col(mix("#b0813f", sky.bg, night));
      const thatchDark = col(mix("#876029", sky.bg, night));
      const wood = col(mix("#6b4a2b", sky.bg, night));
      const cloth = col(mix("#f1ead8", sky.bg, night));
      const door = col(mix("#3a2a1d", sky.bg, night * 0.6));
      const u = sp * 2;
      const mx = Math.round(0.72 * W);
      const base = (mid[Math.min(W - 1, mx)] ?? 0) + u;
      const rowsT = 14;
      for (let r = 0; r < rowsT; r++) {
        const half = 4 - Math.floor(r / 5); // tapers from 9 wide to 5 wide
        for (let dx = -half; dx <= half; dx++) {
          const c = r < 2 ? band : dx >= half - 1 ? shade : wall;
          block(mx + dx * u, base - (r + 1) * u, c, u, u);
        }
      }
      block(mx - u, base - 4 * u, door, 2 * u, 3 * u); // door
      block(mx - u / 2, base - 9 * u, door, u, u); // window
      for (let r = 0; r < 6; r++) {
        for (let dx = -(3 - Math.floor(r / 2) * 1); dx <= 3 - Math.floor(r / 2); dx++) {
          block(mx + dx * u, base - (rowsT + r + 1) * u, dx > 0 ? thatchDark : thatch, u, u);
        }
      }
      const hubX = mx;
      const hubY = base - (rowsT + 2) * u;
      const spin = tt * 0.5 + 0.35;
      for (let arm = 0; arm < 4; arm++) {
        const a = spin + (arm * Math.PI) / 2;
        const dxu = Math.cos(a);
        const dyu = Math.sin(a);
        for (let i = 1; i <= 15; i++) {
          const x = Math.round(hubX + dxu * i * u);
          const y = Math.round(hubY + dyu * i * u);
          block(x, y, wood, u, u);
          if (i >= 5) for (const side of [1, 2]) block(Math.round(x - dyu * side * u), Math.round(y + dxu * side * u), cloth, u, u);
        }
      }
      block(hubX - u / 2, hubY - u / 2, wood, u * 2, u * 2);
    }

    // Trees stand on the middle hill and sway a pixel.
    const leaf = sky.leaf;
    const palette: Record<string, RGB> = {
      L: col(leaf),
      h: col(mix(leaf, "#ffffff", 0.3)),
      l: col(mix(leaf, "#000000", 0.3)),
      T: col(mix("#4a3526", sky.bg, 0.25)),
    };
    for (const tree of TREES) {
      const rows = TREE_SPRITES[tree.kind];
      const width = rows[0]?.length ?? 0;
      const ox = Math.round(tree.u * W - (width * sp) / 2);
      const baseY = mid[Math.min(W - 1, Math.max(0, Math.round(tree.u * W)))] ?? 0;
      const oy = baseY - (rows.length - 2) * sp;
      const trunkRow = rows.findIndex((r) => r.includes("T"));
      const sway = animate && Math.floor(tt * 0.9 + tree.phase) % 3 === 0 ? sp : 0;
      rows.forEach((row, ry) => {
        const shift = ry < trunkRow - 2 ? sway : 0;
        for (let rx = 0; rx < row.length; rx++) {
          const ch = row[rx] ?? ".";
          const c = palette[ch];
          if (!c) continue;
          if (ch !== "T" && bayer(rx + ox, ry) >= sky.leafOpacity) continue;
          block(ox + rx * sp + shift, oy + ry * sp, c);
        }
      });
    }

    // Front ground: bright edge, then dither fading out.
    const frontCol = col(sky.hill2);
    const edgeCol = col(mix(sky.hill2, "#ffffff", 0.28 * (1 - sky.stars * 0.65)));
    for (let x = 0; x < W; x++) {
      const top = front[x] ?? 0;
      for (let y = top; y < H; y++) {
        if (y === top) set(x, y, edgeCol);
        else {
          const keep = 1 - clamp01((y - top) / (H - top));
          if (bayer(x, y) < keep) set(x, y, frontCol);
        }
      }
    }

    // Fireflies at night.
    if (sky.stars > 0.4) {
      const fly = col("#f2e36b");
      for (let i = 0; i < 8; i++) {
        const fx = Math.floor(hash(i + 40) * W + Math.sin(tt * 0.6 + i) * 3 * k);
        const fy = (front[Math.min(W - 1, Math.max(0, fx))] ?? 0) - 3 * k - Math.floor(hash(i + 70) * 9 * k) + Math.round(Math.cos(tt * 0.8 + i * 2) * k);
        if (!animate || Math.sin(tt * 2.5 + i * 1.9) > -0.3) block(fx, fy, fly, st, st);
      }
    }

    // A fox patrols the ridge.
    const frame = FOX_FRAMES[animate ? Math.floor(tt * 4) % 2 : 0] ?? FOX_FRAMES[0];
    if (frame) {
      const span = Math.max(1, W * 0.78);
      const p = (tt * 5 * k) % (2 * span);
      const goingRight = p < span;
      const fx = Math.round(W * 0.11 + (goingRight ? p : 2 * span - p));
      const foot = (front[Math.min(W - 1, Math.max(0, fx))] ?? 0) + 1;
      const dim = sky.stars * 0.5;
      const fox: Record<string, RGB> = {
        F: col(mix("#d2742f", sky.bg, dim)),
        W: col(mix("#efe6d2", sky.bg, dim)),
        N: col("#2a2018"),
      };
      frame.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
          const c = fox[row[rx] ?? "."];
          if (!c) continue;
          const x = fx + (goingRight ? rx : row.length - 1 - rx) * sp;
          block(x, foot - (frame.length - ry) * sp, c);
        }
      });
    }

    // Four colours only: paper (transparent) plus three shades.
    // Tone becomes the choice between them, with ordered dither at the borders.
    const paper = col(sky.bg);
    // By day: sand, terracotta, deep brown. By night: two indigos and the pale ink of the stars,
    // so the land stays a dark silhouette and only the sky lights remain bright.
    const nt = clamp01(sky.stars * 1.5);
    const dayRamp = [mix(sky.hill1, sky.accent, 0.3), sky.accent, mix(sky.accent, sky.ink, 0.65)];
    const nightRamp = [mix(sky.bg, "#4f5fc4", 0.22), mix(sky.bg, "#4f5fc4", 0.5), sky.ink];
    const ramp = dayRamp.map((c, i) => col(mix(c, nightRamp[i] ?? c, nt)));
    const dist = (r: number, g: number, b: number) => Math.hypot(r - paper[0], g - paper[1], b - paper[2]);
    const topDist = Math.max(1, dist(...(ramp[2] ?? paper)));
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        if (d[i + 3] === 0) continue;
        const far = dist(d[i] ?? 0, d[i + 1] ?? 0, d[i + 2] ?? 0) / topDist;
        const tone = far < 0.03 ? 0 : Math.min(1, Math.sqrt(far) * 1.15);
        const level = Math.floor(tone * ramp.length + bayer(x + 2, y + 1));
        const c = level > 0 ? ramp[Math.min(ramp.length, level) - 1] : undefined;
        if (c) {
          d[i] = c[0];
          d[i + 1] = c[1];
          d[i + 2] = c[2];
        } else d[i + 3] = 0;
      }
    }

    ctx!.putImageData(img, 0, 0);
  }

  resize();
  return { resize, draw };
}
