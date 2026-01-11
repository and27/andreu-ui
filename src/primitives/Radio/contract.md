# Radio — Contract (v1)

## Purpose

Provide a minimal, accessible radio button primitive that is token-driven and can be composed into higher-level selection patterns (RadioGroup).

## Rendered element

- Renders a native `<input type="radio">`.
- Visual appearance may be custom, but semantics remain native.

## Required props

- `id: string`
  - Required for `<Label htmlFor="...">` association.
- `name: string`
  - Required for correct native grouping behavior across radio inputs.

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

- Unchecked
- Checked
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Invalid (when `aria-invalid="true"`)

## Non-goals (v1)

- No label rendering (Label is separate).
- No description/hint rendering (belongs to RadioGroupField or future FormField).
- No validation logic.
- No custom keyboard behavior beyond native radio behavior.

## Token usage

- Background uses `--color-control-bg` (or `--color-surface` if you decide; must be consistent).
- Border uses `--color-control-border` (or `--color-border`).
- Checked indicator uses `--color-primary`.
- Border width uses `--border-width-sm`.
- Focus ring uses `--color-focus`, `--focus-ring-width`, and `--focus-ring-offset-tight`.
- Invalid uses `--color-danger`.
- Control size uses `--size-control-sm`.
- Indicator size uses `--size-control-indicator`.

## Accessibility requirements

- Must preserve native radio semantics.
- Must not remove focus indicator without a replacement.
- Must honor the `disabled` attribute.
- Must forward all `aria-*` attributes.
- Must support association via `id` + `<Label htmlFor>`.

## Keyboard behavior

- Native radio behavior only.
  - `Tab` focuses into the group.
  - Arrow keys move selection within same `name` group (browser-native behavior).
  - `Space` selects the focused radio.

## Acceptance criteria

- Renders `<input type="radio">` with required `id` and `name`.
- Checked state is clearly distinguishable in both themes.
- Focus ring visible in both themes when focused via keyboard.
- Disabled radios are non-interactive and visually distinct.
- Invalid state is reflected in DOM and triggers invalid visual styling.
- Works correctly with `<Label htmlFor>` (clicking label selects radio).
