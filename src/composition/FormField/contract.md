# FormField - Contract (v1)

## Purpose

Provide a minimal composition wrapper that binds a label, a single form control,
and supporting hint/error text with correct accessibility wiring.

## Rendered elements

- Wrapper: `<div>`
- Label: `<label>` (via `Label` primitive) when `label` is provided
- Hint/error text: `<p>` elements
- Control: single child element (cloned to apply props)

### Derived IDs

- `descriptionId`: `${id}--description`
- `errorId`: `${id}--error`

## Required props

- `id: string`
  - Applied to the child control and referenced by the label.
- `children: React.ReactElement`
  - The form control to be wrapped (Input, Checkbox, Switch, Select, etc.).

## Optional props

- `label?: React.ReactNode`
  - Visible label content; only use with labelable controls (controls that accept
    `id` and can associate with `<label htmlFor>`).
- `description?: React.ReactNode`
  - Supporting text rendered below the control.
- `error?: React.ReactNode`
  - Error text; also marks the field as invalid.
- `invalid?: boolean`
  - Forces invalid state without error text.
- `disabled?: boolean`
  - Disables the child control; wrapper styles are visual-only.
- `required?: boolean`
  - Passed to the child control when supported.
- `className?: string`

## Supported states

- Default
- With description
- Invalid (error and/or `invalid=true`)
- Disabled

## Non-goals (v1)

- No validation logic.
- No fieldset/legend rendering.
- RadioGroup with its own `<fieldset>/<legend>` (use a dedicated FieldsetField v2).
- No complex layout system (grid/columns).
- No automatic required indicator.

## Token usage

- Spacing uses `--space-*`.
- Label text uses `--color-text` and `--font-sans`.
- Description text uses `--color-muted`.
- Error text uses `--color-danger`.

## Accessibility requirements

- Label must associate with the control via `htmlFor=id`.
- `aria-describedby` must include description/error IDs when present, ordered as:
  existing child `aria-describedby`, then description, then error.
- `aria-invalid="true"` is applied when `invalid` or `error` is present.
- `disabled` and `required` must be forwarded to the child control.

## Keyboard behavior

- No custom keyboard handling (native control behavior only).

## Acceptance criteria

- Clicking the label focuses the wrapped control.
- Screen readers announce description/error via `aria-describedby`.
- Invalid state is reflected in the DOM.
- Disabled state is reflected in the DOM and prevents interaction.
