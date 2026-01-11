import type { Meta, StoryObj } from "@storybook/react";

import { Label } from ".";

const meta = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    layout: "centered",
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
