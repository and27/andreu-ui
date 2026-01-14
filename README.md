# @andreu27/ui

Personal UI foundation: token-driven theming, accessibility-first primitives, documented in Storybook and enforced with tests + CI.

## Install (pre-release)

- `npm i @andreu27/ui@next`

## Usage

```tsx
import "@andreu27/ui/tokens.css";
import "@andreu27/ui/ui.css";
import { Button, FormField, Input } from "@andreu27/ui";

export const Example = () => (
  <FormField id="email" label="Email">
    <Input id="email" placeholder="you@example.com" />
  </FormField>
);
```

## Requirements

- Node 24+

## Commands

- `npm run dev` — Vite dev server
- `npm run storybook` — Storybook
- `npm run test` — Vitest (watch)
- `npm run test:ci` — Vitest run + coverage
- `npm run lint` — ESLint

## Theming

Tokens are CSS variables in the published `tokens.css`.

- Default theme: light (`:root`)
- Dark theme: set `data-theme="dark"` on `html`
