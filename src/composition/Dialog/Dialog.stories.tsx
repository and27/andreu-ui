import type { ComponentProps } from "react";
import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "../../primitives/Button";
import { Dialog } from ".";

const meta = {
  title: "Composition/Dialog",
  component: Dialog,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A11y: role=\"dialog\" with aria-modal; label and description supported. Keyboard: Esc closes, Tab/Shift+Tab trapped, focus restored.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const DialogExample = (args: ComponentProps<typeof Dialog>) => {
  const [open, setOpen] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        initialFocusRef={confirmRef}
      >
        <p>This action cannot be undone.</p>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button ref={confirmRef}>Confirm</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  args: {
    id: "dialog-default",
    title: "Delete project",
    description: "This removes the project and all related data.",
    children: null,
  },
  render: (args) => <DialogExample {...args} />,
};

export const WithoutTitle: Story = {
  args: {
    id: "dialog-aria",
    "aria-label": "Remove project",
    children: null,
  },
  render: (args) => <DialogExample {...args} />,
};

export const FocusTrap: Story = {
  args: {
    id: "dialog-focus",
    title: "Edit profile",
    description: "Tab should stay inside the dialog.",
    children: null,
  },
  render: (args) => {
    const confirmRef = useRef<HTMLButtonElement>(null);

    return (
      <Dialog {...args} defaultOpen initialFocusRef={confirmRef}>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button ref={confirmRef}>Save</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </Dialog>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const saveButton = await canvas.findByRole("button", { name: "Save" });
    const cancelButton = canvas.getByRole("button", { name: "Cancel" });

    await expect(saveButton).toHaveFocus();
    await userEvent.tab();
    await expect(cancelButton).toHaveFocus();
    await userEvent.tab();
    await expect(saveButton).toHaveFocus();
  },
};
