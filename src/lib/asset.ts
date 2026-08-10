const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a public-folder path with the base path the site is served under.
    GitHub Pages serves this repo from a subdirectory, so "/media/x.jpg" has
    to become "/portfolio_website/media/x.jpg" in that build. */
export function asset(path: string) {
  return `${BASE}${path}`;
}
