"use client";

import { useEffect, useState } from "react";

/** true once the query matches. Starts false so server and first paint agree. */
export default function useMedia(query: string) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);

  return match;
}
