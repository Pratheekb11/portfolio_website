"use client";

import { useEffect, useRef } from "react";

type Mode = "ink" | "duotone";
type Shape = "dot" | "square";

/* Renders a photo as a grid, once, then leaves it alone.
   - "ink" draws light cells on the page ground, so the frame dissolves into it.
   - "duotone" floods the box with the accent and draws the image back in
     black, the way a newspaper halftone works.
   No animation loop and no pointer tracking, so it costs one frame and then nothing. */
export default function Halftone({
  src,
  className,
  cell = 7,
  mode = "ink",
  shape = "dot",
  ink = "#ECE7DE",
  fill = "#FF5A1F",
  focus = [0.5, 0.42],
  falloff = 0.92,
  anchor = [0.5, 0.5],
  region,
  baseline = 0,
  zoom = 1,
  lift = 0.16,
  gain = 1.85,
}: {
  src: string;
  className?: string;
  cell?: number;
  mode?: Mode;
  shape?: Shape;
  ink?: string;
  /** duotone only: the colour flooding the box behind the black grid */
  fill?: string;
  /** where the subject sits in the frame, normalised */
  focus?: [number, number];
  /** how fast the grid fades toward the edges. ink mode only */
  falloff?: number;
  /** which part of the source survives the cover-crop; [0.5, 0] keeps the top */
  anchor?: [number, number];
  /** normalised [x, y, w, h] box the photo occupies; defaults to the whole canvas */
  region?: [number, number, number, number];
  /** faint cells everywhere else, so the grid reads as one continuous field */
  baseline?: number;
  /** tightens the cover-crop around the anchor, so a narrow box can still hold a face */
  zoom?: number;
  /** black point. anything darker than this drops out of the grid */
  lift?: number;
  /** contrast push above the black point. a coarse grid needs less of it, or the
      highlights on a face merge into one white slab */
  gain?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // focus/anchor/region arrive as fresh array literals on every parent render;
  // key the effect on their values so the grid is drawn once, not per render
  const geometry = JSON.stringify([focus, anchor, region]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // canvas takes literal colours only, so resolve any CSS variable first
    const resolve = (c: string) => {
      if (!c.startsWith("var(")) return c;
      const name = c.slice(4, c.indexOf(")")).trim();
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#FF5A1F";
    };

    let cancelled = false;
    let debounce = 0;
    const img = new Image();
    img.decoding = "async";

    const render = () => {
      if (cancelled || !img.naturalWidth) return;

      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      // the photo may occupy only part of the field; the rest stays baseline
      const [rx, ry, rw, rh] = region ?? [0, 0, 1, 1];
      const dx0 = Math.round(rx * cols);
      const dy0 = Math.round(ry * rows);
      const dw = Math.max(1, Math.round(rw * cols));
      const dh = Math.max(1, Math.round(rh * rows));

      // cover-fit the source into that box
      const sr = img.width / img.height;
      const dr = dw / dh;
      let sw = img.width;
      let sh = img.height;
      if (sr > dr) {
        sw = img.height * dr;
      } else {
        sh = img.width / dr;
      }
      // zoom > 1 keeps less of the source, which is what lets a phone-width
      // box hold a face instead of a whole torso
      sw = Math.min(img.width, sw / zoom);
      sh = Math.min(img.height, sh / zoom);
      const sx = (img.width - sw) * anchor[0];
      const sy = (img.height - sh) * anchor[1];
      octx.drawImage(img, sx, sy, sw, sh, dx0, dy0, dw, dh);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const [fx, fy] = focus;
      const half = cell / 2;

      if (mode === "duotone") {
        ctx.fillStyle = resolve(fill);
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#0B0B0C";
      } else {
        ctx.fillStyle = resolve(ink);
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let v = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;

          // push contrast so the subject separates from a busy background
          v = Math.min(1, Math.max(0, (v - lift) * gain));

          if (mode === "ink") {
            // fade the grid away from the subject so the frame dissolves into the page
            const ox = x / cols - fx;
            const oy = (y / rows - fy) * 0.82;
            const dist = Math.hypot(ox, oy) / falloff;
            v *= Math.max(0, 1 - dist * dist);
            if (baseline > 0) v = Math.max(v, baseline);
          } else {
            // duotone inks the dark half of the image, so invert the weight
            v = 1 - v;
          }

          const px = x * cell;
          const py = y * cell;

          if (shape === "square") {
            const s = v * cell;
            if (s < 0.34) continue;
            ctx.globalAlpha = mode === "ink" ? Math.min(1, 0.4 + v * 0.75) : 1;
            ctx.fillRect(px + (cell - s) / 2, py + (cell - s) / 2, s, s);
          } else {
            const r = v * 0.62 * cell;
            if (r < 0.35) continue;
            ctx.globalAlpha = mode === "ink" ? Math.min(1, 0.34 + v * 0.8) : 1;
            ctx.beginPath();
            ctx.arc(px + half, py + half, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    img.onload = render;
    img.src = src;

    let lastW = 0;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w === lastW) return; // ignore height-only jitter from scrollbars
      lastW = w;
      clearTimeout(debounce);
      debounce = window.setTimeout(render, 140);
    });
    ro.observe(host);

    return () => {
      cancelled = true;
      clearTimeout(debounce);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, cell, mode, shape, ink, fill, falloff, baseline, zoom, lift, gain, geometry]);

  return (
    <div ref={hostRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
