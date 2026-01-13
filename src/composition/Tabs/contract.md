# Tabs - Contract (v1)

## Purpose

Provide an accessible tabs pattern with roving focus, keyboard navigation, and
panel visibility management.

## Rendered elements

- Tabs root: `<div>`
- Tabs list: `<div role="tablist">`
- Tab trigger: `<button type="button" role="tab">`
- Tab panel: `<div role="tabpanel">`

### Derived IDs

- `tabId`: `${id}--tab-${value}`
- `panelId`: `${id}--panel-${value}`

## Required props

### Tabs

- `id: string`
  - Base ID used to connect tabs and panels.
- `children: React.ReactNode`
  - Must include a `TabsList` and matching `TabsPanel` nodes.

### TabsTrigger

- `value: string`
  - Stable identifier for the tab (must match a panel).
  - Should be ID-safe (used to build `id` attributes).
- `children: React.ReactNode`
  - Tab label content.

### TabsPanel

- `value: string`
  - Must match a tab trigger.
  - Should be ID-safe (used to build `id` attributes).
- `children: React.ReactNode`
  - Panel content.

## Optional props

### Tabs

- `value?: string`
  - Controlled active value.
- `defaultValue?: string`
  - Uncontrolled initial value (mount-time only).
- `onValueChange?: (value: string) => void`
  - Called when selection changes.
- `className?: string`

### TabsList

- `aria-label?: string`
- `aria-labelledby?: string`
- `className?: string`

### TabsTrigger

- `disabled?: boolean`
  - Disables focus/selection.
- `className?: string`

### TabsPanel

- `className?: string`

## Supported states

- Default
- Selected
- Focus-visible
- Disabled (trigger)

## Non-goals (v1)

- No vertical orientation.
- No lazy-mounting of panels.
- No animated transitions.

## Token usage

- Text uses `--color-text`.
- Selected indicator uses `--color-primary`.
- Borders use `--color-border` with `--border-width-sm`.
- Focus ring uses `--color-focus`, `--focus-ring-width`, and `--focus-ring-offset`.
- Disabled uses `--opacity-disabled`.
- Spacing uses `--space-*`.
- Radius uses `--radius-sm`.

## Accessibility requirements

- `role="tablist"` on the list container.
- Each tab has `role="tab"`, `aria-selected`, `aria-controls`, and a stable `id`.
- Each panel has `role="tabpanel"`, `aria-labelledby`, and a stable `id`.
- Only the active tab is focusable (`tabIndex=0`); others `tabIndex=-1`.
- Disabled tabs are not focusable and use `aria-disabled`.

## Keyboard behavior

- `Tab` moves focus to the active tab.
- `ArrowRight` / `ArrowLeft` moves focus and selection between tabs.
- `Home` focuses/selects the first enabled tab.
- `End` focuses/selects the last enabled tab.
- `Enter` / `Space` selects the focused tab.

## Acceptance criteria

- Selected tab is reflected in `aria-selected` and its panel is visible.
- Non-selected panels are hidden.
- Keyboard navigation cycles through enabled tabs.
- Disabled tabs cannot be focused or selected.
