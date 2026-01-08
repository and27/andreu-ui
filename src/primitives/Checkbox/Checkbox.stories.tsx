import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import Checkbox from "./Checkbox";

const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "checkbox-default",
  },
};

export const Checked: Story = {
  args: {
    id: "checkbox-checked",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "checkbox-disabled",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    id: "checkbox-invalid",
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <label htmlFor={args.id} style={{ display: "flex", gap: "var(--space-2)" }}>
      <Checkbox {...args} />
      Accept terms
    </label>
  ),
  args: {
    id: "checkbox-terms",
  },
};

export const InvalidChecked: Story = {
  args: {
    id: "checkbox-invalid-checked",
    "aria-invalid": true,
    defaultChecked: true,
  },
};

export const FocusVisible: Story = {
  args: {
    id: "checkbox-focus",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <Checkbox {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("checkbox")).toHaveFocus();
  },
};
