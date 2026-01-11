import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import Radio from "./Radio";

const meta = {
  title: "Primitives/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "radio-default",
    name: "radio-demo",
  },
};

export const Checked: Story = {
  args: {
    id: "radio-checked",
    name: "radio-demo",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "radio-disabled",
    name: "radio-demo",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    id: "radio-invalid",
    name: "radio-demo",
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <label
      htmlFor={args.id}
      style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}
    >
      <Radio {...args} />
      Email updates
    </label>
  ),
  args: {
    id: "radio-label",
    name: "radio-demo",
  },
};

export const FocusVisible: Story = {
  args: {
    id: "radio-focus",
    name: "radio-demo",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <Radio {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("radio")).toHaveFocus();
  },
};
