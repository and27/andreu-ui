# @andreu/ui

Personal UI foundation: token-driven theming, accessibility-first primitives, documented in Storybook and enforced with tests + CI.

## Requirements

- Node 24+

## Commands

- `npm run dev` — Vite dev server
- `npm run storybook` — Storybook
- `npm run test` — Vitest (watch)
- `npm run test:ci` — Vitest run + coverage
- `npm run lint` — ESLint

## Theming

Tokens are CSS variables in `src/tokens/tokens.css`.

- Default theme: light (`:root`)
- Dark theme: set `data-theme="dark"` on `html`

## Package status

Not published to npm yet.
