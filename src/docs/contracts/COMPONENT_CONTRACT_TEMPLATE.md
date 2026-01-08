# Component Contract Template

This template defines the required structure for all component contracts in `@andreu/ui`.

## File location

Each component must include a `contract.md` at:

`src/<layer>/<ComponentName>/contract.md`

Examples:

- `src/primitives/Input/contract.md`
- `src/primitives/Button/contract.md`
- `src/composition/Dialog/contract.md`

---

## Contract structure (required sections)

### 1. Purpose

Explain why the component exists and what problem it solves.

### 2. Rendered element

List the native HTML element(s) rendered (e.g. `<button>`, `<input>`), and any key defaults.

### 3. Props

#### Required props

List required props and why they are required.

#### Optional props

List optional props, defaults, and any behavior implications.

### 4. Supported states

List all supported visual/behavioral states.  
Note: states must be token-driven and must map to stories and/or tests.

### 5. Non-goals

Explicitly list what is intentionally out of scope for this version.

### 6. Token usage

List the tokens consumed by the component (semantic roles only).
No hardcoded visual values are allowed.

### 7. Accessibility requirements

Document semantic roles, ARIA attributes (if any), focus behavior, and screen reader expectations.

### 8. Keyboard behavior

Provide the keyboard interaction model (native or custom).  
If custom, include a key map.

### 9. Acceptance criteria

A checklist of observable outcomes to verify via Storybook, tests, and manual QA.

---

## Mapping rules

- Every supported state must be demonstrated in Storybook **or** explained why it is not.
- Critical accessibility behaviors (focus, keyboard) must have:
  - a Storybook verification story and/or
  - automated RTL/Vitest coverage.

---

## Versioning rules

- Use `(v1)`, `(v2)` in the title.
- Changes that alter public behavior require updating `contract.md` and stories/tests together.
