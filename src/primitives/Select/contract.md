# Select - Contract (v1)

## Purpose

Provide a minimal, accessible native select primitive that is token-driven and
composable with higher-level form patterns (FormField).

## Rendered element

- Renders a native `<select>` element.
- Uses native browser behavior (no custom listbox).

## Required props

- `id: string`
  - Required to support `<Label htmlFor="id" />` association.
- `children: React.ReactNode`
  - Options to render inside the select.

## Optional props

- Pass through all standard select props via:
  - `React.SelectHTMLAttributes<HTMLSelectElement>`
- `className?: string`
- `aria-invalid?: boolean`
  - When true, styles reflect invalid state (visual only).

## States (must be supported)

- Default
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Invalid (`aria-invalid="true"`)

## Non-goals (v1)

- No custom listbox.
- No async loading or option virtualization.
- No custom option rendering beyond native `<option>`.

## Token usage

- Background uses `--color-surface`.
- Text uses `--color-text`.
- Border uses `--color-border`.
- Border width uses `--border-width-sm`.
- Focus ring uses `--color-focus`, `--focus-ring-width`, and `--focus-ring-offset-tight`.
- Invalid border uses `--color-danger` when `aria-invalid=true`.
- Radius uses `--radius-sm`.
- Spacing uses `--space-*`.

## Accessibility requirements

- Must keep native select semantics.
- Must not remove focus indicator without a replacement.
- Must honor `disabled` attribute.
- Must forward all `aria-*` attributes.
- Must support association via `id` + `<Label htmlFor>`.

## Keyboard behavior

- Native select behavior only.

## Acceptance criteria

- `tab` focuses the select.
- Focus ring is visible in both themes.
- Disabled select is non-interactive.
- Invalid state is visually distinguishable.
