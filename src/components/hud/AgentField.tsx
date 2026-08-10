"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/* Ambient layer: a slow agent graph. Nodes drift, near-neighbours link,
   and a signal occasionally travels an edge. It reads as a system thinking
   in the background — never labelled, just felt. */
export default function AgentField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let pulse = { i: -1, j: -1, t: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(52, Math.max(18, (w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.2 + 0.6,
      }));
    };

    const LINK = 132;

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          ctx.globalAlpha = (1 - d / LINK) * 0.16;
          ctx.strokeStyle = "#5FA8FF";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // one travelling signal at a time
      if (pulse.i < 0 && Math.random() < 0.02 && nodes.length > 2) {
        const i = Math.floor(Math.random() * nodes.length);
        let best = -1;
        let bd = LINK;
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < bd) {
            bd = d;
            best = j;
          }
        }
        if (best >= 0) pulse = { i, j: best, t: 0 };
      }
      if (pulse.i >= 0) {
        pulse.t += 0.022;
        if (pulse.t >= 1) {
          pulse = { i: -1, j: -1, t: 0 };
        } else {
          const a = nodes[pulse.i];
          const b = nodes[pulse.j];
          const px = a.x + (b.x - a.x) * pulse.t;
          const py = a.y + (b.y - a.y) * pulse.t;
          ctx.globalAlpha = Math.sin(pulse.t * Math.PI) * 0.9;
          ctx.fillStyle = "#FF8A3D";
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#5FA8FF";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
