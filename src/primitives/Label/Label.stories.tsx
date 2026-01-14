import type { Meta, StoryObj } from "@storybook/react";

import { Label } from ".";

const meta = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A11y: associates with a control via htmlFor. Keyboard: none.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: "example-input",
    children: "Email address",
  },
};

export const LongText: Story = {
  args: {
    htmlFor: "example-input",
    children: "This is a longer label that should wrap on smaller widths",
  },
};

export const WithControl: Story = {
  args: {
    htmlFor: "label-control",
    children: "Full name",
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <Label {...args} />
      <input id={args.htmlFor} placeholder="Type here" />
    </div>
  ),
};
