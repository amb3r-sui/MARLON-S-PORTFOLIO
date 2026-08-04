# Bryl Minimal Implementation Handoff

Read `DESIGN.md`, `design-contract.md`, the [reference `SKILL.md`](https://github.com/bryllim/bryl-minimal-design/blob/main/SKILL.md), and the existing content in `src/data/` before changing UI code.

- Replace warm/accent tokens with Bryl's strict light/dark monochrome ramp.
- Bundle Geist, Geist Mono, and Geist Pixel Square locally; use pixel type only for display titles, labels, and values.
- At `1024px+`, implement a fixed `14rem` left navigation rail and offset `main`/footer. Below it, retain a sticky compact bar and accessible overlay menu.
- Limit ordinary content to `42rem`; allow `56rem` and wider only for project grids and workflow canvases.
- Use one-pixel hairlines, the `16/12/8/6` radius ladder, compact mono labels, inversion for primary actions, and no accent hue.
- Add masked CSS halftone texture to at most two locations per page. Do not introduce external decorative assets.
- Keep Marlon's CV-backed copy, generated editorial images, routes, workflow demos, and static deployment model intact.
- Respect `prefers-reduced-motion`; do not delay above-fold rendering.

The shipped artifact proves the desktop sidebar, mobile top bar/menu, pixel-display hero, monochrome card treatment, numbered section labels, and restrained halftone accents without breaking navigation or static export.
