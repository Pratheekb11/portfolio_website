"use client";

import { useEffect, useRef } from "react";

/* The portrait is rendered once as a dot grid, then left alone.
   No animation loop and no pointer tracking, so it costs one frame and then nothing. */
export default function Halftone({
  src,
  className,
  cell = 7,
  ink = "#ECE7DE",
  focus = [0.5, 0.42],
  falloff = 0.92,
  anchor = [0.5, 0.5],
  region,
  baseline = 0,
}: {
  src: string;
  className?: string;
  cell?: number;
  ink?: string;
  /** where the subject sits in the frame, normalised */
  focus?: [number, number];
  /** how fast the grid fades toward the edges */
  falloff?: number;
  /** which part of the source survives the cover-crop; [0.5, 0] keeps the top */
  anchor?: [number, number];
  /** normalised [x, y, w, h] box the photo occupies; defaults to the whole canvas */
  region?: [number, number, number, number];
  /** faint dots everywhere else, so the grid reads as one continuous field */
  baseline?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let debounce = 0;
    const img = new Image();
    img.decoding = "async";

    const render = () => {
      if (cancelled || !img.naturalWidth) return;

      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      let sx = 0;
      let sy = 0;
      if (sr > dr) {
        sw = img.height * dr;
        sx = (img.width - sw) * anchor[0];
      } else {
        sh = img.width / dr;
        sy = (img.height - sh) * anchor[1];
      }
      octx.drawImage(img, sx, sy, sw, sh, dx0, dy0, dw, dh);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const [fx, fy] = focus;
      const half = cell / 2;
      ctx.fillStyle = ink;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let v = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;

          // push contrast so the subject separates from a busy background
          v = Math.min(1, Math.max(0, (v - 0.16) * 1.85));

          // fade the grid away from the subject so the frame dissolves into the page
          const ox = x / cols - fx;
          const oy = (y / rows - fy) * 0.82;
          const dist = Math.hypot(ox, oy) / falloff;
          v *= Math.max(0, 1 - dist * dist);

          if (baseline > 0) v = Math.max(v, baseline);

          const r = v * 0.5 * cell;
          if (r < 0.35) continue;

          ctx.globalAlpha = Math.min(1, 0.34 + v * 0.8);
          ctx.beginPath();
          ctx.arc(x * cell + half, y * cell + half, r, 0, Math.PI * 2);
          ctx.fill();
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
  }, [src, cell, ink, focus, falloff, anchor, region, baseline]);

  return (
    <div ref={hostRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
