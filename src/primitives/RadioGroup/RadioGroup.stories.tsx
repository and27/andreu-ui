import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { RadioGroup, RadioGroupItem } from ".";

const meta = {
  title: "Primitives/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderItems = () => (
  <>
    <RadioGroupItem id="plan-basic" value="basic">
      Basic plan
    </RadioGroupItem>
    <RadioGroupItem id="plan-pro" value="pro">
      Pro plan
    </RadioGroupItem>
    <RadioGroupItem id="plan-enterprise" value="enterprise">
      Enterprise plan
    </RadioGroupItem>
  </>
);

export const Default: Story = {
  args: {
    name: "plan",
    label: "Plan",
    defaultValue: "basic",
    children: renderItems(),
  },
};

export const WithoutLabel: Story = {
  args: {
    name: "plan",
    "aria-label": "Plan",
    defaultValue: "pro",
    children: renderItems(),
  },
};

export const Disabled: Story = {
  args: {
    name: "plan",
    label: "Plan",
    defaultValue: "basic",
    disabled: true,
    children: renderItems(),
  },
};

export const Invalid: Story = {
  args: {
    name: "plan",
    label: "Plan",
    defaultValue: "basic",
    "aria-invalid": true,
    children: renderItems(),
  },
};

export const Controlled: Story = {
  args: {
    name: "plan",
    label: "Plan",
    children: renderItems(),
  },
  render: (args) => {
    const [value, setValue] = useState("pro");

    return (
      <RadioGroup {...args} value={value} onValueChange={setValue} />
    );
  },
};

export const FocusVisible: Story = {
  args: {
    name: "plan",
    label: "Plan",
    children: renderItems(),
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <RadioGroup {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "Basic plan" })).toHaveFocus();
  },
};
