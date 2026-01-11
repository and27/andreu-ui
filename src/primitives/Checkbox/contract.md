# Checkbox — Contract (v1)

## Purpose

Provide a minimal, accessible checkbox primitive that is token-driven and can be composed into higher-level form patterns (e.g., FormField, CheckboxGroup).

## Rendered element

- Renders a native `<input type="checkbox" />`.
- Must preserve native checkbox semantics.

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

- Default (unchecked)
- Checked
- Focus-visible (clear ring using `--color-focus`)
- Disabled (`disabled` attribute)
- Invalid (when `aria-invalid="true"`)

## Non-goals (v1)

- No label rendering (Label is separate).
- No hint/error message rendering (belongs to FormField).
- No validation logic.
- No indeterminate state (v2).
- No “select all” / group behavior (belongs to CheckboxGroup).

## Token usage

- Border uses `--color-control-border`.
- Background uses `--color-control-bg` (unchecked) and `--color-primary` (checked), unless you implement an alternative token-driven approach.
- Checkmark uses `--color-primary-foreground` (when checked).
- Border width uses `--border-width-sm`.
- Focus ring uses `--color-focus`, `--focus-ring-width`, and `--focus-ring-offset-tight`.
- Invalid border uses `--color-danger` when `aria-invalid="true"`.
- Radius uses `--radius-sm` (or a consistent system choice).
- Control size uses `--size-control-sm`.
- Indicator size uses `--size-control-indicator`.
- Spacing uses `--space-*` for layout around the control (if the component includes any wrapper; otherwise leave layout to consumers).
- Disabled opacity uses `--opacity-disabled`.
- Motion uses `--motion-duration-fast` + `--motion-ease-out`.

## Accessibility requirements

- Must keep native checkbox semantics (`type="checkbox"`).
- Must not remove focus indicator without a replacement.
- Must honor the `disabled` attribute.
- Must forward all `aria-*` attributes.
- Must support association via `id` + `<Label htmlFor>`.

## Keyboard behavior

- Native checkbox behavior only.
  - `Tab` moves focus to/from the checkbox.
  - `Space` toggles checked state when focused.

## Acceptance criteria

- Renders an `<input type="checkbox">` with the provided `id`.
- Checkbox is focusable via `Tab` and shows a visible focus ring in both themes.
- `disabled` makes the checkbox non-interactive and visually distinct.
- `checked`/`defaultChecked` behave as expected.
- `aria-invalid="true"` is reflected in the DOM and triggers an invalid visual state.
- When paired with `<Label htmlFor="...">`, clicking the label toggles the checkbox.
