# Token Contract (v1)

## Theme mechanism

- Tokens are CSS custom properties in `src/tokens/tokens.css`.
- Light theme is the default and is defined on `:root` (no `data-theme` required).
- Dark theme overrides are defined on `[data-theme="dark"]`, applied at the document level (`html` recommended).
- Do not set theme in component code; only toggle `data-theme` at the document level.

## Required tokens (v1)

### Colors

- `--color-bg`
- `--color-surface`
- `--color-surface-2`
- `--color-border`
- `--color-text`
- `--color-muted`
- `--color-primary`
- `--color-primary-foreground`
- `--color-danger`
- `--color-danger-foreground`
- `--color-focus`

### Radius

- `--radius-sm`
- `--radius-md`

### Spacing

- `--space-1`
- `--space-2`
- `--space-3`
- `--space-4`

### Typography

- `--font-sans`

## Naming rules

- Role-based only; no color-name tokens (no `--color-blue-*`).
- Use kebab-case and group prefixes:
  - `--color-*` for semantic color roles
  - `--space-*` for spacing steps
  - `--radius-*` for corner radii
  - `--font-*` for font families

## Constraints

- Components must consume tokens via `var(--token)` only; no hardcoded visual values.
- Every required token must be defined for both light and dark themes.
- Changes to the required token set must update this contract and `tokens.css` together.
- Focus styling must rely on `--color-focus` (never remove focus without a replacement).

## Accessibility targets

- Target: WCAG AAA readability for default body text on `--color-bg` / `--color-surface` where feasible.
- `--color-muted` must remain readable (secondary, not “faint”).
- Focus ring must be clearly visible in both themes.
