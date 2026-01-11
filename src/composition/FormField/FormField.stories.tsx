import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Input } from "../../primitives/Input";
import { Select } from "../../primitives/Select";
import { Textarea } from "../../primitives/Textarea";
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
    children: <Input id="email" placeholder="you@example.com" />,
  },
};

export const Invalid: Story = {
  args: {
    id: "email-invalid",
    label: "Email",
    error: "Enter a valid email address.",
    children: <Input id="email-invalid" placeholder="you@example.com" />,
  },
};

export const Disabled: Story = {
  args: {
    id: "email-disabled",
    label: "Email",
    description: "We will only use this for account alerts.",
    disabled: true,
    children: <Input id="email-disabled" placeholder="you@example.com" />,
  },
};

export const WithoutLabel: Story = {
  args: {
    id: "email-no-label",
    description: "Visible label omitted; input carries aria-label.",
    children: (
      <Input
        id="email-no-label"
        aria-label="Email"
        placeholder="you@example.com"
      />
    ),
  },
};

export const FocusLabel: Story = {
  args: {
    id: "email-focus",
    label: "Email",
    children: <Input id="email-focus" placeholder="Press tab after click" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Email"));
    await expect(canvas.getByRole("textbox")).toHaveFocus();
  },
};

export const SelectField: Story = {
  args: {
    id: "plan",
    label: "Plan",
    description: "Choose the plan that fits your team.",
    children: (
      <Select id="plan">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </Select>
    ),
  },
};

export const TextareaField: Story = {
  args: {
    id: "bio",
    label: "Bio",
    description: "Keep it short and clear.",
    children: <Textarea id="bio" placeholder="Short bio" />,
  },
};
