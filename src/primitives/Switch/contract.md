# Switch — Contract (v1)

## Purpose

Provide a minimal, accessible toggle switch primitive that represents an on/off boolean state.
The Switch is conceptually equivalent to a checkbox, but with a different visual affordance.

## Rendered element

- Renders a native `<input type="checkbox">` with `role="switch"`.
- Visual appearance is custom (track + thumb), and semantics are exposed as a switch.

## Required props

- `id: string`
  - Required to support association with `<Label htmlFor="...">`.

## Optional props

- Pass through all standard input props via:
  - `React.InputHTMLAttributes<HTMLInputElement>`
- `className?: string`

### Controlled / uncontrolled

- Controlled:
  - `checked?: boolean`
  - `onChange?: (event) => void`
- Uncontrolled:
  - `defaultChecked?: boolean`

## States (must be supported)

Note: states are visual and must be token-driven.

- Off (unchecked)
- On (checked)
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Invalid (when `aria-invalid="true"`)

## Non-goals (v1)

- No label rendering (Label is separate).
- No description or helper text.
- No validation logic.
- No loading state.
- No indeterminate state.
- No keyboard customization beyond native behavior.

## Token usage

- Track background (off): `--color-control-bg` (or equivalent surface token).
- Track background (on): `--color-primary`.
- Thumb background: `--color-primary-foreground` or `--color-surface` (must maintain contrast).
- Border (if used): `--color-control-border` or `--color-border`.
- Focus ring uses `--color-focus`.
- Invalid state uses `--color-danger`.
- Radius uses `--radius-pill`.
- Spacing and sizing must be consistent with other form controls (derive from `--space-*`).
- Disabled opacity uses `--opacity-disabled`.
- Motion uses `--motion-duration-fast` + `--motion-ease-out`.
- Thumb shadow uses `--shadow-control`.

## Accessibility requirements

- Must preserve native checkbox behavior while exposing `role="switch"`.
- Must not remove focus indicator without a replacement.
- Must honor the `disabled` attribute.
- Must forward all `aria-*` attributes.
- Must support association via `id` + `<Label htmlFor>`.

## Keyboard behavior

- Native checkbox behavior only.
  - `Tab` moves focus to/from the switch.
  - `Space` toggles the switch when focused.

## Acceptance criteria

- Renders an `<input type="checkbox">` with the provided `id` and `role="switch"`.
- Switch is clearly distinguishable in both on and off states.
- Focus ring is visible in both themes when focused via keyboard.
- Disabled switch is non-interactive and visually distinct.
- `checked` / `defaultChecked` behave as expected.
- `aria-invalid="true"` is reflected in the DOM and triggers an invalid visual state.
- When paired with `<Label htmlFor="...">`, clicking the label toggles the switch.
