import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Input } from "../../primitives/Input";
import { FormField } from ".";

const meta = {
  title: "Composition/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "email",
    label: "Email",
    description: "We will only use this for account alerts.",
  },
  render: (args) => (
    <FormField {...args}>
      <Input id="email" placeholder="you@example.com" />
    </FormField>
  ),
};

export const Invalid: Story = {
  args: {
    id: "email-invalid",
    label: "Email",
    error: "Enter a valid email address.",
  },
  render: (args) => (
    <FormField {...args}>
      <Input id="email-invalid" placeholder="you@example.com" />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    id: "email-disabled",
    label: "Email",
    description: "We will only use this for account alerts.",
    disabled: true,
  },
  render: (args) => (
    <FormField {...args}>
      <Input id="email-disabled" placeholder="you@example.com" />
    </FormField>
  ),
};

export const WithoutLabel: Story = {
  args: {
    id: "email-no-label",
    description: "Visible label omitted; input carries aria-label.",
  },
  render: (args) => (
    <FormField {...args}>
      <Input
        id="email-no-label"
        aria-label="Email"
        placeholder="you@example.com"
      />
    </FormField>
  ),
};

export const FocusLabel: Story = {
  args: {
    id: "email-focus",
    label: "Email",
  },
  render: (args) => (
    <FormField {...args}>
      <Input id="email-focus" placeholder="Press tab after click" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Email"));
    await expect(canvas.getByRole("textbox")).toHaveFocus();
  },
};
