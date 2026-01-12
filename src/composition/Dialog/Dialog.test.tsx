import { useRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from ".";

const ControlledDialog = () => {
  const [open, setOpen] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Dialog
        id="dialog"
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        initialFocusRef={confirmRef}
      >
        <button ref={confirmRef} type="button">
          Confirm
        </button>
        <button type="button" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </Dialog>
    </>
  );
};

describe("Dialog", () => {
  it("renders when open and hides when closed", () => {
    const { rerender } = render(
      <Dialog id="dialog" open title="Dialog title">
        Content
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    rerender(
      <Dialog id="dialog" open={false} title="Dialog title">
        Content
      </Dialog>
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("moves focus into the dialog and restores on close", async () => {
    const user = userEvent.setup();
    render(<ControlledDialog />);

    const trigger = screen.getByRole("button", { name: "Open dialog" });
    await user.click(trigger);

    const confirm = screen.getByRole("button", { name: "Confirm" });
    await waitFor(() => expect(confirm).toHaveFocus());

    await user.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes on backdrop click and notifies change", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Dialog
        id="dialog"
        defaultOpen
        onOpenChange={handleChange}
        title="Dialog title"
      >
        <button type="button">Confirm</button>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    if (!backdrop) {
      throw new Error("Dialog backdrop was not found.");
    }

    await user.click(backdrop);

    expect(handleChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("traps focus within the dialog", async () => {
    const user = userEvent.setup();

    render(
      <Dialog id="dialog" defaultOpen title="Dialog title">
        <button type="button">First</button>
        <button type="button">Second</button>
      </Dialog>
    );

    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });

    await waitFor(() => expect(first).toHaveFocus());
    await user.tab();
    expect(second).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
  });
});
