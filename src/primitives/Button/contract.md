# Button — Contract (v1)

## Purpose

Provide a minimal, accessible button primitive with a predictable API, token-driven styling, and support for common UI states. Designed to be reused across composed components (e.g. Dialog, Dropdown).

## Rendered element

- Renders a native `<button>` element.
- Default `type` is `"button"` (prevents accidental form submits).

## Required props

- `children: React.ReactNode`

## Optional props

- Extends `React.ButtonHTMLAttributes<HTMLButtonElement>` and forwards standard button props.
- `variant?: "primary" | "secondary" | "ghost"` (default: `"primary"`)
- `size?: "sm" | "md"` (default: `"md"`)
- `loading?: boolean` (default: `false`)
  - When `true`, the button is non-interactive and communicates busy state.
- `className?: string`

## Supported states

> Note: States must be token-driven.

- Default
- Hover (if applicable)
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Loading (`loading=true`)

## Behavior rules

- When `loading=true`:
  - The button must be non-interactive (treat as disabled).
  - Must expose busy state (`aria-busy="true"`).
  - Should prevent multiple activations.
- Do not implement custom keyboard handling (native button behavior only).

## Non-goals (v1)

- No polymorphic `asChild` / `as` prop.
- No icon system or icon-only API (can be added in v2).
- No toggle/pressed behavior (`aria-pressed`) (separate component).
- No theming logic inside the component.

## Token usage

- Background and border are variant-dependent (token-driven).
- Text color must use tokens.
- Focus ring uses `--color-focus`.

Minimum token mapping (suggested):

- `primary`: background `--color-primary`, text `--color-primary-foreground`
- `secondary`: background `--color-surface`, border `--color-border`, text `--color-text`
- `ghost`: background `transparent`, text `--color-text`

## Accessibility requirements

- Must preserve native button semantics.
- Must not remove focus indicator without a replacement.
- Must honor `disabled` attribute.
- Loading state must be perceivable (not only color).

## Keyboard behavior

- Native button behavior only.

## Acceptance criteria

- `Tab` focuses the button and focus ring is visible in both themes.
- `type` defaults to `"button"`.
- `disabled` prevents interaction and sets correct semantics.
- `loading=true` prevents interaction and sets `aria-busy="true"`.
- Variants and sizes render consistently with token-driven styles.
