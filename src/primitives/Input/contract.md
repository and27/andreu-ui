# Input — Contract (v1)

## Purpose

Provide a minimal, accessible text input primitive that is token-driven and can be composed into higher-level form patterns (FormField).

## Rendered element

- Renders a native `<input>` element.
- Default `type` is `"text"` unless overridden.

## Required props

- `id: string`
  - Required to support `<Label htmlFor="id" />` association.

## Optional props

- All standard input props should pass through (via extending `React.InputHTMLAttributes<HTMLInputElement>`).
- `className?: string`
- `aria-invalid?: boolean`
  - When true, styles reflect invalid state (visual only).

## States (must be supported)

- Default
- Hover (if applicable)
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Invalid (`aria-invalid="true"`)

## Non-goals (v1)

- No label rendering (Label is separate).
- No hint/error message rendering (belongs to FormField).
- No validation logic.
- No masking or formatting.

## Token usage

- Background uses `--color-surface` (or `--color-bg` if you prefer; must be consistent).
- Text uses `--color-text`.
- Border uses `--color-border`.
- Focus ring uses `--color-focus`.
- Invalid border uses `--color-danger` when `aria-invalid=true`.

## Accessibility requirements

- Must keep native semantics.
- Must not remove focus indicator without a replacement.
- Must honor `disabled` attribute.
- Must forward `aria-*` attributes.

## Keyboard behavior

- Native input behavior only. No custom key handling.

## Acceptance criteria

- `tab` focuses the input.
- Focus ring is visible in both themes.
- Disabled input is non-interactive.
- Invalid state is visually distinguishable without relying on color alone (v2 will add message; v1 at least border + focus).
