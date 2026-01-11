# Textarea - Contract (v1)

## Purpose

Provide a minimal, accessible textarea primitive that is token-driven and
composable with higher-level form patterns (FormField).

## Rendered element

- Renders a native `<textarea>` element.
- Uses native browser behavior.

## Required props

- `id: string`
  - Required to support `<Label htmlFor="id" />` association.

## Optional props

- Pass through all standard textarea props via:
  - `React.TextareaHTMLAttributes<HTMLTextAreaElement>`
- `className?: string`
- `aria-invalid?: boolean`
  - When true, styles reflect invalid state (visual only).

## States (must be supported)

- Default
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Invalid (`aria-invalid="true"`)

## Non-goals (v1)

- No auto-resize behavior.
- No character counter.
- No validation logic.

## Token usage

- Background uses `--color-surface`.
- Text uses `--color-text`.
- Border uses `--color-border`.
- Focus ring uses `--color-focus`.
- Invalid border uses `--color-danger` when `aria-invalid=true`.
- Radius uses `--radius-sm`.
- Spacing uses `--space-*`.
- Disabled uses `--opacity-disabled`.

## Accessibility requirements

- Must keep native textarea semantics.
- Must not remove focus indicator without a replacement.
- Must honor `disabled` attribute.
- Must forward all `aria-*` attributes.
- Must support association via `id` + `<Label htmlFor>`.

## Keyboard behavior

- Native textarea behavior only.

## Acceptance criteria

- `tab` focuses the textarea.
- Focus ring is visible in both themes.
- Disabled textarea is non-interactive.
- Invalid state is visually distinguishable.
