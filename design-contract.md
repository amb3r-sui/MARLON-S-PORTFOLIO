# Bryl Reference Design Contract

## Goal and target artifact

Restyle Marlon Magno's Next.js/Vinext automation portfolio with the Bryl minimal design language while preserving its CV-backed content, accessibility, static export, and interactive workflow demonstrations. The audience is recruiters, clients, agencies, and remote employers evaluating Marlon's automation and integration work.

## Evidence

| Evidence | Confidence | Use |
| --- | --- | --- |
| `bryllim/bryl-minimal-design` `SKILL.md` | Provided | Binding visual values, typography roles, layout, component recipes, halftone motif, motion, and accessibility rules |
| Repository README and MIT/OFL notices | Observed | Confirms the design language is intended for reuse and the specified fonts are openly licensed |
| Current Marlon portfolio and automated tests | Observed | Defines the existing content, routes, workflow behavior, responsive requirements, and quality floor |
| Marlon Magno CV supplied in the previous milestone | Provided | Authoritative source for profile, education, skills, and project claims |
| Preserve current information architecture | Inferred | Avoids weakening the completed portfolio while changing its presentation |

## Reference boundaries

| Keep | Change | Do not copy |
| --- | --- | --- |
| Strict monochrome semantic palette | Apply the palette to Marlon's existing project and workflow states | Bryl's brand identity or personal details |
| Geist body/mono roles and Geist Pixel display role | Adapt headings and labels to Marlon's automation subject matter | Exact copy, biography, project descriptions, or claims |
| Fixed left rail on desktop and compact mobile navigation | Preserve all five Marlon routes and resume action | Literal page-by-page composition from bryllim.com |
| Narrow reading measure, hairline dividers, compact scale | Keep wider canvases where workflow readability requires it | Screenshots, logos, images, or protected assets |
| Numbered micro-labels and restrained halftone texture | Generate texture in CSS using semantic tokens | Exact source code or prompt wording from another portfolio |
| Soft cards, subtle lift, complete light/dark theming | Retain Marlon's original editorial imagery under monochrome treatment | Any metric or outcome not supported by Marlon's CV |

## Final design stance

The site will become a monochrome technical zine for trustworthy automation: a fixed utility rail frames a narrow, typography-led body; pixel display titles and uppercase mono labels organize the evidence; hairline dividers replace tinted bands; soft cards contain only the information that benefits from containment; and one restrained halftone motif adds identity. Marlon's content and workflow interactions remain unmistakably his.

## Risks and unknowns

- Geist Pixel can reduce readability when overused, so it is limited to display titles, numbers, and section labels.
- Complex workflow canvases need more width than the standard reading measure and are allowed a documented wide-layout exception.
- The Bryl skill specifies Source Serif 4 for long-form articles, but the current portfolio has no article surface, so that font is intentionally omitted.
- The reference repository provides a design specification, not a component library or page template.

## Quality gate

- [x] Strict monochrome palette in both themes with no accent hue.
- [x] Geist body, Geist Mono technical, and Geist Pixel Square display roles are visible and locally bundled.
- [x] Desktop fixed sidebar and mobile sticky navigation both work by keyboard and pointer.
- [x] Numbered labels, hairlines, radius ladder, soft shadows, and sparse halftone texture match the contract.
- [x] Existing routes, resume, contact states, project filters, and workflow simulations still work.
- [x] Reduced motion, contrast, focus visibility, and responsive overflow checks pass.
- [x] Static export, tests, Lighthouse, and browser console checks pass their release thresholds.
- [x] No Bryl branding, copy, assets, or literal page composition appears in the portfolio.
