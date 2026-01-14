# STABILITY.md

This document defines the stability guarantees for @andreu27/ui.

## API surface

Public:
- Everything exported from `src/index.ts` (currently re-exported from
  `src/primitives` and `src/composition`).

Internal:
- Anything not exported from `src/index.ts`, including helpers, hooks,
  internal utilities, and component CSS modules.

Experimental:
- Only APIs explicitly marked as unstable via one of:
  - `unstable_` export prefix
  - an `/experimental` folder
  - an explicit note in the component contract
- Experimental: none (as of 0.1.0-alpha.3).

## Controlled vs uncontrolled

- Controlled if prop `open`/`value` exists => `default*` ignored.
- Internal interactions call `onChange`/`onOpenChange` but consumer must update
  the controlled value.
- Uncontrolled uses internal state initialized from `default*`.

## Accessibility guarantees

- Native semantics first; ARIA is used only when needed.
- Focus-visible is preserved.
- Keyboard behavior is documented in each component contract.
- Behavioral expectations are defined by contracts and tests; consumers must
  follow each component's contract (for example, required labeling props).

## Tokens and theming policy

- Components do not hardcode visual values; they use CSS variables defined in
  `tokens.css`.
- Consumers must include the exported styles (`tokens.css` and `ui.css`) for
  consistent rendering.
- Theme switching is token-driven. Use `data-theme="dark"` at a root element to
  opt into the dark theme; default `:root` values represent the light theme.

## Versioning and deprecation policy

- Versions follow SemVer, with the understanding that pre-1.0 APIs may evolve.
- Breaking changes are documented in release notes.
- Deprecations are marked in contracts and removed after at least one
  subsequent release.
