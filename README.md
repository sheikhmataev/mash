# Mash Website

Next.js website for Mash Partners, deployed as a static export.

## Local Development

```bash
npm ci
npm run dev
```

## Production Build

```bash
npm run build
```

## Performance Checklist

Use this before shipping visual/content updates:

- Keep project preview images in `public/assets` as optimized WebP and target `< 250 KB` each.
- When adding images in UI sections, use `next/image` with explicit `sizes`.
- Avoid importing large brand images into metadata; use lightweight icon files from `public`.
- Defer non-critical visuals (custom cursor, particle layers, heavy 3D runtime) until after first paint/idle or viewport entry.
- Keep scroll-triggered JS animations desktop-only where possible; prefer viewport-triggered motion/CSS for simpler reveals.
- Run `npm run build` and re-check output size (`out/_next/static/chunks` and `public/assets`) before deployment.
