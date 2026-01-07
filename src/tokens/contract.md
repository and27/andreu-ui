# Token Contract

## Theme mechanism
- Tokens are CSS custom properties in `src/tokens/tokens.css`.
- Light theme is the default and is defined on `:root`.
- Dark theme overrides are defined on `[data-theme="dark"]`, applied on `html` or `body`.
- Do not set theme in component code; only toggle `data-theme` at the document level.

## Required token groups
- Color roles: background, surface, text, border, primary, danger, focus.
- Typography: font family tokens.
- Spacing scale: space tokens for consistent gaps and padding.
- Radius scale: radius tokens for rounded corners.

## Naming rules
- Role-based only; no color names (no `--color-blue-*`).
- Use kebab-case and group prefixes:
  - `--color-*` for semantic color roles
  - `--space-*` for spacing steps
  - `--radius-*` for corner radii
  - `--font-*` for font families

## Constraints
- Components must consume tokens via `var(--token)` only; no hardcoded visual values.
- Every token must be defined for both light and dark themes.
- Changes to the token set require updating this contract and `tokens.css` together.
- Focus styling must rely on `--color-focus`.
