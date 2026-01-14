import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from 'storybook/test'

import Switch from './Switch'

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A11y: input type checkbox with role="switch"; label via htmlFor. Keyboard: Space toggles.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'switch-default',
  },
}

export const Checked: Story = {
  args: {
    id: 'switch-checked',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    id: 'switch-disabled',
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    id: 'switch-invalid',
    'aria-invalid': true,
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <label htmlFor={args.id} style={{ display: 'flex', gap: 'var(--space-2)' }}>
      <Switch {...args} />
      Enable notifications
    </label>
  ),
  args: {
    id: 'switch-label',
  },
}

export const FocusVisible: Story = {
  args: {
    id: 'switch-focus',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
      <button type="button">Focus me first</button>
      <Switch {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await userEvent.tab()
    await canvas.findByRole('switch')
  },
}
