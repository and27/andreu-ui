import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Label } from "../Label";
import { Textarea } from ".";

describe("Textarea", () => {
  it("renders a textarea with the provided id", () => {
    render(<Textarea id="bio" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("id", "bio");
  });

  it("honors disabled state", () => {
    render(<Textarea id="bio" disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("reflects aria-invalid", () => {
    render(<Textarea id="bio" aria-invalid="true" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("can be focused via tab", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">Before</button>
        <Textarea id="bio" />
      </div>
    );

    await user.tab();
    await user.tab();

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("focuses when label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" />
      </div>
    );

    await user.click(screen.getByText("Bio"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
