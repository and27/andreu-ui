import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Button } from ".";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading button",
    loading: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}
    >
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
    </div>
  ),
};

export const FocusVisible: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <Button>Press tab</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Press tab" })
    ).toHaveFocus();
  },
};
