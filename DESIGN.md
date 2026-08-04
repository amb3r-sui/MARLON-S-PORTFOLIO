# Marlon Magno Portfolio Design System

## 1. Visual Theme & Atmosphere

The portfolio uses the Bryl minimal design language as a technical editorial system: quiet, exact, monochrome, and slightly playful through pixel typography and sparse halftone texture. The page should feel like a carefully typeset automation field guide, not a SaaS dashboard. Marlon's workflow evidence remains the subject; Bryl supplies the visual grammar.

## 2. Color

- Light background: `#ffffff`; light ink: `#0a0a0a`.
- Dark background: `#0c0c0f`; dark ink: `#f4f4f5`.
- Semantic gray ramp: `50 #fafafa`, `100 #f5f5f5`, `200 #e9e9e9`, `300 #d4d4d4`, `400 #a3a3a3`, `500 #737373`, with dark-mode remapping rather than separate component colors.
- No accent hue. Emphasis uses inversion, type, borders, and halftone density.
- Body copy uses ink; supporting copy uses gray 500; readable metadata never falls below gray 400.
- Selection inverts ink and background.

## 3. Typography

- Body/UI: Geist, `15px` base, with system sans fallbacks.
- Technical: Geist Mono for navigation, metadata, tags, controls, and footer utilities.
- Display: Geist Pixel Square for hero and page titles, numbered section labels, and prominent values.
- Long-form serif is intentionally unused because the portfolio has no article-reading surface.
- Micro-labels are `9-11px`, uppercase, approximately `0.1em` tracking.
- Display titles stay compact at approximately `3rem`, line-height `1`, and mostly lowercase.
- Links use low-opacity underlines that become fully visible on hover; external links receive a trailing arrow where context allows.

## 4. Spacing & Grid

- Desktop content shifts past a fixed `14rem` sidebar at `1024px` and above.
- Reading measure is `42rem`; wider project grids may reach `56rem`.
- Horizontal padding is `1rem` mobile and `1.5rem` desktop.
- Section rhythm is approximately `3.5rem`; card padding is `1.25rem`; component gaps range from `0.75rem` to `1.5rem`.
- Divided stat and information grids use hairline rules as their primary structure.

## 5. Layout & Composition

- Desktop navigation is a fixed left rail with grouped links and a leading-arrow active state.
- Tablet and mobile use a sticky top bar plus a full-height menu overlay.
- Main content is narrow and left-aligned; whitespace carries hierarchy.
- Sections are separated by one-pixel rules and numbered labels, not tinted bands.
- Project and workflow surfaces may use two or three columns only when the content remains readable.
- One or two masked halftone fields per page provide texture without becoming wallpaper.

## 6. Components

- Borders: one-pixel gray 200 hairlines; strong boundaries use gray 300.
- Radius ladder: cards `16px`, medium surfaces `12px`, controls `8px`, inputs `6px`, tags fully rounded.
- Cards: gray 50/background fill, soft negative-spread shadow in light mode, border-led separation in dark mode.
- Primary buttons invert ink and background; secondary actions are mono links or hairline controls.
- Tags: compact uppercase Geist Mono, gray border, optional single inverted featured state.
- Images remain Marlon-specific and shift to monochrome treatment with a gentle `1.04` hover zoom.
- Inputs use subtle fill, one-pixel border, and compact mono supporting text.

## 7. Motion & Interaction

- Micro-interactions: `200ms`.
- Card lift: `350-420ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Entry motion: up to `12px` fade-up over `700ms`, used only when it does not delay first paint.
- Theme colors crossfade over `500ms`.
- No bounce, parallax, looping decoration, or essential motion.
- `prefers-reduced-motion` disables transforms, smooth scrolling, and animated transitions.

## 8. Voice & Brand

Marlon's voice remains practical, careful, and evidence-led. Labels should be concise and technical; body copy should explain process, safeguards, and human control without hype. Resume facts and sanitized workflow evidence are authoritative. Bryl's name, biography, copy, logo, and claims never appear in the product UI.

## 9. Anti-patterns

- No accent colors, chromatic or decorative gradients, glass surfaces, neon glows, or beige editorial styling. CSS radial gradients are allowed only to construct or mask the monochrome halftone texture.
- No giant headline that consumes most of the first viewport.
- No decorative dashboards, invented metrics, fake customer logos, or unsupported outcomes.
- No literal copy of Bryl's portfolio layout, words, assets, branding, or proprietary page content.
- No excessive halftone fields, shadows, pills, icon containers, or boxed sections.
- No fonts outside the defined Geist roles unless a future long-form article requires Source Serif 4.
- No motion that hides content, delays interaction, or survives reduced-motion mode.
