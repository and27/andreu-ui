# Token Contract (v1)

## Theme mechanism

- Tokens are CSS custom properties in `src/tokens/tokens.css`.
- Light theme is the default and is defined on `:root` (no `data-theme` required).
- Dark theme overrides are defined on `[data-theme="dark"]`, applied at the document level (`html` recommended).
- Do not set theme in component code; only toggle `data-theme` at the document level.
- Keep non-theme tokens in `:root`; override only tokens that actually change in dark (typically colors and shadows).

## Required tokens (v1)

### Foundation tokens

### Colors

- `--color-bg`
- `--color-surface`
- `--color-surface-2`
- `--color-border`
- `--color-control-bg`
- `--color-control-border`
- `--color-text`
- `--color-muted`
- `--color-primary`
- `--color-primary-foreground`
- `--color-danger`
- `--color-danger-foreground`
- `--color-focus`
- `--color-overlay`

### Radius

- `--radius-sm`
- `--radius-md`
- `--radius-pill`

### Border

- `--border-width-sm`
- `--border-width-md`

### Spacing

- `--space-1`
- `--space-2`
- `--space-3`
- `--space-4`

### Typography

- `--font-sans`

### Opacity

- `--opacity-disabled`
- `--opacity-loading`

### Focus

- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-offset-tight`

### Motion

- `--motion-duration-fast`
- `--motion-duration-spin`
- `--motion-ease-out`
- `--motion-ease-linear`

### Shadow

- `--shadow-control`
- `--shadow-dialog`

### Component tokens

- `--selection-control-size`
- `--selection-indicator-size`
- `--switch-width`
- `--switch-height`
- `--switch-thumb-size`
- `--switch-thumb-offset`
- `--button-spinner-size`
- `--textarea-min-height`
- `--dialog-max-width`

## Naming rules

- Role-based only; no color-name tokens (no `--color-blue-*`).
- Use kebab-case and group prefixes:
  - `--color-*` for semantic color roles
  - `--space-*` for spacing steps
  - `--radius-*` for corner radii
  - `--border-*` for border widths
  - `--font-*` for font families
  - `--opacity-*` for opacity steps
  - `--focus-*` for focus ring sizes/offsets
  - `--motion-*` for durations/easing
  - `--shadow-*` for shadow presets
  - Component scopes like `--selection-*`, `--switch-*`, `--button-*`, `--dialog-*`, `--textarea-*`

## Constraints

- Components must consume tokens via `var(--token)` only; no hardcoded visual values.
- Every required token must be defined in `:root`; dark themes only override tokens that differ.
- Changes to the required token set must update this contract and `tokens.css` together.
- Focus styling must rely on `--color-focus` (never remove focus without a replacement).

## Accessibility targets

- Target: WCAG AAA readability for default body text on `--color-bg` / `--color-surface` where feasible.
- `--color-muted` must remain readable (secondary, not “faint”).
- Focus ring must be clearly visible in both themes.
