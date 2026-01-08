import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Input from "./Input";

describe("Input", () => {
  it("can be focused via tab", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">Before</button>
        <Input id="email" />
      </div>
    );

    await user.tab();
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("honors disabled state", () => {
    render(<Input id="email" disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("reflects aria-invalid", () => {
    render(<Input id="email" aria-invalid="true" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
});
