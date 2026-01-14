# DropdownMenu - Contract (v1)

## Purpose

Provide a simple dropdown menu pattern for action lists, with minimal focus
management and native semantics.

## Rendered elements

- Root: `<div>`
- Trigger: `<button type="button">`
- Menu: `<div>`
- Item: `<button type="button">`

### Derived IDs

- `triggerId`: `${id}--trigger`
- `menuId`: `${id}--menu`

## Required props

### DropdownMenu

- `id: string`
  - Base ID for menu and trigger association.
- `children: React.ReactNode`
  - Must include a `DropdownMenuTrigger` and `DropdownMenuContent`.

### DropdownMenuItem

- `children: React.ReactNode`
  - Item label.

## Optional props

### DropdownMenu

- `open?: boolean`
  - Controlled open state.
- `defaultOpen?: boolean`
  - Uncontrolled initial open state (mount-time only).
- `onOpenChange?: (open: boolean) => void`
  - Called when menu requests open/close.
- `className?: string`

### DropdownMenuTrigger

- `className?: string`

### DropdownMenuContent

- `className?: string`
- `aria-label?: string`
- `aria-labelledby?: string`
  - Only required if the menu content has no visible label.

### DropdownMenuItem

- `disabled?: boolean`
- `className?: string`
- `onSelect?: () => void`

### Controlled vs uncontrolled

- If `open` is provided, `defaultOpen` is ignored.
- `defaultOpen` is only applied on the initial mount.
- Controlled usage without `onOpenChange` is allowed, but Escape/selection will
  not close the menu (state is owned by the consumer).

## Supported states

- Closed (content not rendered).
- Open.
- Focus-visible.
- Disabled (item).

## Non-goals (v1)

- No submenus.
- No typeahead search.
- No positioning engine; content is inline.
- No portals.
- No ARIA menu roles.

## Token usage

- Surface uses `--color-surface`.
- Hover background uses `--color-surface-2`.
- Text uses `--color-text`.
- Border uses `--color-border` with `--border-width-sm`.
- Focus ring uses `--color-focus`, `--focus-ring-width`, `--focus-ring-offset`.
- Disabled uses `--opacity-disabled`.
- Shadow uses `--shadow-control`.
- Spacing uses `--space-*`.
- Radius uses `--radius-sm`.

## Accessibility requirements

- Trigger sets `aria-haspopup="menu"` and `aria-expanded`.
- Content is labelled by trigger (or `aria-label`) via `aria-labelledby`.
- Items remain native focusable elements (no roving tabindex).
- Disabled items use native `disabled` when applicable.

## Keyboard behavior

- `Enter`/`Space` on trigger toggles menu.
- `Escape` closes menu and returns focus to trigger.
- `Tab` moves focus through items normally.

## Acceptance criteria

- Trigger toggles menu and reflects `aria-expanded`.
- Disabled items cannot be focused or selected.
- `Escape` closes and returns focus to trigger.
