import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Label } from "../Label";
import { Select } from ".";

const meta = {
  title: "Primitives/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="starter">Starter</option>
    <option value="pro">Pro</option>
    <option value="enterprise">Enterprise</option>
  </>
);

export const Default: Story = {
  args: {
    id: "plan",
    children: options,
  },
};

export const Disabled: Story = {
  args: {
    id: "plan-disabled",
    children: options,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    id: "plan-invalid",
    children: options,
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <Label htmlFor={args.id}>Plan</Label>
      <Select {...args} />
    </div>
  ),
  args: {
    id: "plan-label",
    children: options,
  },
};

export const FocusVisible: Story = {
  args: {
    id: "plan-focus",
    children: options,
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("combobox")).toHaveFocus();
  },
};
