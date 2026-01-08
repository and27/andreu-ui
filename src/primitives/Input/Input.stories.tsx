import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "storybook/test";

import "../../styles/globals.css";
import Input from "./Input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-input",
    placeholder: "Type here",
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    placeholder: "Disabled",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    id: "invalid-input",
    placeholder: "Invalid",
    "aria-invalid": true,
  },
};

export const FocusVisible: Story = {
  args: { id: "focus-visible" },
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-2)" }}>
      <button type="button">Focus me first</button>
      <Input id="focus-demo" placeholder="Press tab" />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.tab();
    await canvas.findByPlaceholderText("Press tab");
  },
};
