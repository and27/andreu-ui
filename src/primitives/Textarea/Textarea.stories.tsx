import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Label } from "../Label";
import { Textarea } from ".";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A11y: native textarea; supports aria-invalid and labels via htmlFor. Keyboard: browser-default textarea behavior.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "bio",
    placeholder: "Tell us about yourself",
  },
};

export const Disabled: Story = {
  args: {
    id: "bio-disabled",
    placeholder: "Disabled",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    id: "bio-invalid",
    placeholder: "Invalid",
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <Label htmlFor={args.id}>Bio</Label>
      <Textarea {...args} />
    </div>
  ),
  args: {
    id: "bio-label",
    placeholder: "Short bio",
  },
};

export const FocusVisible: Story = {
  args: {
    id: "bio-focus",
    placeholder: "Press tab",
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <Textarea {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("textbox")).toHaveFocus();
  },
};
