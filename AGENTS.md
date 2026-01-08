# AGENTS.md — @andreu/ui

This repo is a token-driven, accessibility-first UI foundation.

## Non-negotiables

- Contract-first: write/update `contract.md` before implementation.
- No hardcoded visual values in components (must use CSS variables tokens).
- Accessibility is required (focus-visible, keyboard, correct semantics).

## Contracts

- All components must include `contract.md` following:
  `docs/contracts/COMPONENT_CONTRACT_TEMPLATE.md`
- When behavior changes, update:
  - contract
  - stories
  - tests (when applicable)

## Storybook

- Global styles must be loaded in `.storybook/preview.ts` (no per-story global CSS imports).
- Stories must cover supported states from the contract.
- Use `play` only for meaningful keyboard/interaction verification.

## Testing (Vitest + RTL)

- Tests verify public behavior (roles, focus, keyboard) — avoid implementation details.
- Ensure DOM cleanup between tests via global setup.

## Git workflow

- Use feature branches (e.g. `feat/primitives-button`).
- Small commits with clear intent.
