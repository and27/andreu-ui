# Definition of Done (Alpha Close)

This checklist defines what "done" means for @andreu27/ui alpha close. It is
aligned with `STABILITY.md`.

## Scope

In scope:
- Primitives: Button, Input, Select, Textarea, Checkbox, Radio, RadioGroup,
  Switch, Label.
- Composition: FormField, Dialog, Tabs, DropdownMenu.
- Tokens in `tokens.css` and component styles in `ui.css`.
- Themes: light (default) + dark via `data-theme="dark"`.

Out of scope:
- New components or features beyond the list above.

## Quality gates (per component)

- Contract: contract v1 exists and matches behavior.
- Storybook: minimum states covered + a11y/keyboard notes present.
- Tests: RTL/Vitest invariants covered and passing.
- Tokens: no hardcoded values in component CSS (tokens only).

## Repo-level gates

- CI passes (lint, test, build).
- Packaging exports are correct for JS/CSS (tokens.css, ui.css).
- Smoke test passes in a real consumer project.

## Release gates

- Version updated for the release.
- Release notes documented.
- `STABILITY.md` reviewed and up to date.

## Post-close policy (maintenance mode)

- Only bug fixes and documentation updates.
- New features go to backlog for a future phase.
