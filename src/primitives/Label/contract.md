# Label — Contract (v1)

## Purpose

Provide a minimal, accessible `<label>` primitive that can be reused across form patterns (FormField, Select, etc.).

## Rendered element

- Renders a native `<label>` element.

## Required props

- `htmlFor: string`
  - Must match the `id` of the associated form control.

## Optional props

- `children: React.ReactNode`
- `className?: string`

## Non-goals (v1)

- No layout responsibilities (no spacing, no grids).
- No “required/optional” rendering logic.
- No error rendering.
- No tooltip/help icon.

## Token usage

- Text color uses `--color-text`.
- Font uses `--font-sans`.

## Accessibility requirements

- Must always be associated with a form control via `htmlFor`.
- Must not be focusable (native label behavior).

## Keyboard behavior

- Not interactive. No custom keyboard handling.

## Acceptance criteria

- Consumers can rely on correct semantics (`<label htmlFor="...">`).
- Styling is token-driven only.
