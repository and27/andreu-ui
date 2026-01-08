import type { Meta, StoryObj } from '@storybook/react'

const styles = `
.theme-preview {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  max-width: 680px;
}

.theme-preview__row {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  align-items: center;
}

.theme-preview__swatch {
  width: 140px;
  height: 80px;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  display: flex;
  align-items: flex-end;
  font-size: 12px;
}

.theme-preview__swatch--bg {
  background: var(--color-bg);
}

.theme-preview__swatch--surface {
  background: var(--color-surface);
}

.theme-preview__swatch--surface-2 {
  background: var(--color-surface-2);
}

.theme-preview__swatch--border {
  background: var(--color-surface);
  box-shadow: inset 0 0 0 2px var(--color-border);
}

.theme-preview__swatch--primary {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border-color: transparent;
}

.theme-preview__swatch--danger {
  background: var(--color-danger);
  color: var(--color-danger-foreground);
  border-color: transparent;
}

.theme-preview__text {
  font-size: 14px;
}

.theme-preview__muted {
  color: var(--color-muted);
}

.theme-preview__controls {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.theme-preview__control {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-sans);
}

.theme-preview__control:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
`

const ThemePreview = () => {
  return (
    <div className="theme-preview">
      <style>{styles}</style>
      <div className="theme-preview__row">
        <div className="theme-preview__swatch theme-preview__swatch--bg">bg</div>
        <div className="theme-preview__swatch theme-preview__swatch--surface">
          surface
        </div>
        <div className="theme-preview__swatch theme-preview__swatch--surface-2">
          surface-2
        </div>
        <div className="theme-preview__swatch theme-preview__swatch--border">
          border
        </div>
      </div>
      <div className="theme-preview__row theme-preview__text">
        <div>Text sample</div>
        <div className="theme-preview__muted">Muted text sample</div>
      </div>
      <div className="theme-preview__row">
        <div className="theme-preview__swatch theme-preview__swatch--primary">
          primary
        </div>
        <div className="theme-preview__swatch theme-preview__swatch--danger">
          danger
        </div>
      </div>
      <div className="theme-preview__row theme-preview__controls">
        <input
          className="theme-preview__control"
          placeholder="Focusable input"
        />
        <button className="theme-preview__control" type="button">
          Focusable button
        </button>
      </div>
    </div>
  )
}

const meta = {
  title: 'Tokens/Theme Preview',
  component: ThemePreview,
} satisfies Meta<typeof ThemePreview>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
  parameters: {
    backgrounds: { disable: true },
  },
  globals: {
    theme: 'light',
  },
}

export const Dark: Story = {
  parameters: {
    backgrounds: { disable: true },
  },
  globals: {
    theme: 'dark',
  },
}
