# Dialog - Contract (v1)

## Purpose

Provide a modal dialog that manages focus, blocks background interaction, and
supports accessible labeling for critical user actions.

## Rendered elements

- Portal root: renders into `document.body`.
- Backdrop: `<div>` covering the viewport.
- Dialog surface: `<div role="dialog" aria-modal="true">`.
- Title: `<h2>` when `title` is provided.
- Description: `<p>` when `description` is provided.

### Derived IDs

- `titleId`: `${id}--title`
- `descriptionId`: `${id}--description`

## Required props

- `id: string`
  - Used to derive title/description IDs for ARIA wiring.
- `children: React.ReactNode`
  - Dialog content.

## Optional props

- `open?: boolean`
  - Controlled open state.
- `defaultOpen?: boolean`
  - Uncontrolled initial open state.
- `onOpenChange?: (open: boolean) => void`
  - Called when the dialog requests to open/close (ESC/backdrop).
- `title?: React.ReactNode`
  - Visible heading content. Required unless `aria-label` is provided.
- `description?: React.ReactNode`
  - Supporting text rendered below the title.
- `aria-label?: string`
  - Accessible name when no `title` is rendered.
- `initialFocusRef?: React.RefObject<HTMLElement>`
  - Element to focus when the dialog opens.
- `className?: string`

### Controlled vs uncontrolled

- If `open` is provided, `defaultOpen` is ignored.
- `defaultOpen` is only applied on the initial mount.
- Controlled usage without `onOpenChange` is allowed, but ESC/backdrop will not
  close the dialog (state is owned by the consumer).
- No dev warning for `open` + `defaultOpen` in v1.

## Supported states

- Closed (not rendered).
- Open (focus trapped).
- Open with title.
- Open with description.

## Non-goals (v1)

- No nested dialogs.
- No alertdialog role.
- No scroll lock (v2).
- No animations or transitions.
- No keep-mounted behavior (dialog unmounts immediately on close).

## Token usage

- Backdrop uses `--color-overlay`.
- Surface uses `--color-surface`.
- Border uses `--color-border` with `--border-width-sm`.
- Text uses `--color-text`.
- Description text uses `--color-muted`.
- Shadow uses `--shadow-dialog`.
- Radius uses `--radius-md`.
- Spacing uses `--space-*` for padding/gap.
- Max width uses `--size-dialog-max-width`.
- Focus ring uses `--color-focus`, `--focus-ring-width`, and `--focus-ring-offset`.

## Accessibility requirements

- `role="dialog"` and `aria-modal="true"` on the surface element.
- Accessible name must be provided via `aria-labelledby` (title) or `aria-label`.
- `aria-describedby` must include `descriptionId` when description is provided.
- Focus is trapped within the dialog while open.
- On open, focus moves to `initialFocusRef` or the first focusable element,
  otherwise the dialog surface (via `tabIndex="-1"`).
- On close, focus is restored to the element that triggered the dialog.
- Backdrop click closes the dialog (explicit decision).
  - Close only when the click originates on the backdrop itself
    (`event.target === event.currentTarget`).

## Keyboard behavior

- `Escape`: closes the dialog and restores focus.
- `Tab`/`Shift+Tab`: cycles focus within the dialog.

## Acceptance criteria

- Dialog renders only when `open` is true (or `defaultOpen` on mount).
- `aria-modal="true"` and `role="dialog"` are present.
- Title and description are announced by screen readers when provided.
- Focus moves inside on open and returns to the trigger on close.
- `Escape` closes the dialog.
- Backdrop click closes the dialog; clicking inside does not.
