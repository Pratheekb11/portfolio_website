"use client";

import { useEffect, useRef, useState } from "react";

/** Fires once when the element first enters the viewport.
    Observes the element's own box, so callers must attach it to something
    with layout size. Anything scaled to zero never intersects. */
export default function useOnScreen<T extends HTMLElement>(rootMargin = "-10% 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return [ref, seen] as const;
}
