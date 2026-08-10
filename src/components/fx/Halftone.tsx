"use client";

import { useEffect, useRef } from "react";

/* The portrait is never shown as a photograph. It is resolved into a
   halftone grid — and the grid sharpens under the pointer, so the face
   only fully resolves where you're looking. That's the signature. */
export default function Halftone({
  src,
  className,
  cell = 7,
  tint = "#FF5A1F",
  ink = "#ECE7DE",
  focus = [0.5, 0.42],
  falloff = 0.92,
}: {
  src: string;
  className?: string;
  cell?: number;
  tint?: string;
  ink?: string;
  /** where the subject sits in the frame, normalised */
  focus?: [number, number];
  /** how fast the grid fades toward the edges */
  falloff?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lum: Float32Array | null = null;
    let cols = 0;
    let rows = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999, on: 0 };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const img = new Image();
    img.decoding = "async";

    /* Sample the image into a luminance grid sized to the box. */
    const sample = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      // cover-fit the source into the grid
      const sr = img.width / img.height;
      const dr = cols / rows;
      let sw = img.width;
      let sh = img.height;
      let sx = 0;
      let sy = 0;
      if (sr > dr) {
        sw = img.height * dr;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / dr;
        sy = (img.height - sh) / 2;
      }
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      lum = new Float32Array(cols * rows);
      const [fx, fy] = focus;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];
          let v = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

          // push contrast so the subject separates from a busy background
          v = Math.min(1, Math.max(0, (v - 0.16) * 1.85));

          // fade the grid away from the subject so the frame dissolves into the page
          const dx = x / cols - fx;
          const dy = (y / rows - fy) * 0.82;
          const d = Math.hypot(dx, dy) / falloff;
          v *= Math.max(0, 1 - d * d);

          lum[i] = v;
        }
      }
    };

    const draw = () => {
      if (!lum) return;
      ctx.clearRect(0, 0, w, h);

      const half = cell / 2;
      const focusR = 150;
      const px = pointer.x;
      const py = pointer.y;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = lum[y * cols + x];
          if (v < 0.06) continue;

          const cx = x * cell + half;
          const cy = y * cell + half;

          // pointer focus: dots swell and warm toward the accent
          let boost = 0;
          if (pointer.on > 0) {
            const d = Math.hypot(cx - px, cy - py);
            if (d < focusR) boost = (1 - d / focusR) * pointer.on;
          }

          const r = (v * 0.5 + boost * 0.42) * cell;
          if (r < 0.35) continue;

          ctx.fillStyle = boost > 0.3 ? tint : ink;
          ctx.globalAlpha = Math.min(1, 0.34 + v * 0.8);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    img.onload = () => {
      sample();
      if (still) {
        draw();
      } else {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    img.src = src;

    const move = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on = 1;
    };
    const leave = () => {
      pointer.on = 0;
    };
    if (!still && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerleave", leave);
    }

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) {
        sample();
        if (still) draw();
      }
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [src, cell, tint, ink, focus, falloff]);

  return (
    <div ref={hostRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
