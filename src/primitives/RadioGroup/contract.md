# RadioGroup — Contract (v1)

## Purpose

Provide a minimal composition layer for grouping radio options with predictable API and accessibility-friendly defaults.

## Rendered elements

- Renders a semantic group wrapper:
  - `<fieldset>` + `<legend>` when `label` is provided.
  - `<div role="radiogroup">` when consumers provide labeling externally.
- Uses native `<input type="radio">` radios for selection.

## API (recommended)

### RadioGroup props

- `name: string` (required)
  - Applied to all radio items to form a native group.
- `children: React.ReactNode` (required)
  - RadioGroupItem elements.
- `label?: React.ReactNode`
  - Visible group label rendered inside a `<legend>`.
- `value?: string`
  - Controlled selected value.
- `defaultValue?: string`
  - Uncontrolled initial selected value.
  - Applied on initial mount only; updates after mount are ignored.
- `onValueChange?: (value: string) => void`
  - Fired when selection changes.
- `disabled?: boolean`
  - Disables all items (implementation may pass `disabled` down).
- `aria-invalid?: boolean`
  - Visual invalid state for the group (may pass down to items).

### RadioGroupItem props

- `id: string` (required)
- `value: string` (required)
- `children: React.ReactNode` (label content)
- `disabled?: boolean`

## Required behaviors

- In uncontrolled mode, radios manage state natively; RadioGroup just wires name + initial default selection.
- In controlled mode, RadioGroup ensures the correct radio is checked, and emits `onValueChange`.
- All items share the same `name` (native grouping).

## States (must be supported)

- Default (none selected or one selected)
- Checked (selected item)
- Focus-visible
- Disabled (group or item)
- Invalid (group-level)

## Non-goals (v1)

- No roving tabindex implementation (native behavior only).
- No virtualization.
- No complex layout system (stacking/spacing can be minimal and token-driven).
- No helper/error text rendering (future FormField).

## Token usage

- Spacing between items uses `--space-*`.
- Text uses `--color-text` (label) and `--color-muted` (optional secondary text).
- Invalid may use `--color-danger` as a border/accent on the group container (if present).

## Accessibility requirements

- If a group label is rendered internally, prefer `<fieldset><legend>`.
- Otherwise, require consumers to provide an accessible name via:
  - `aria-label` or `aria-labelledby` on the radiogroup wrapper.
- Must preserve native radio semantics.
- Must honor `disabled` at group level (propagate to radios).

## Keyboard behavior

- Native only:
  - `Tab` enters/leaves the group.
  - Arrow keys change selection within same `name`.
  - `Space` selects focused item.

## Acceptance criteria

- A screen reader announces the group name (fieldset/legend or aria-label).
- Arrow keys move selection among options (native).
- Disabled group prevents selection changes.
- Controlled and uncontrolled modes work as specified.
