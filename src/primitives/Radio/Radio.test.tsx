import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Label } from "../Label";
import Radio from "./Radio";

describe("Radio", () => {
  it("renders a radio input with required attributes", () => {
    render(<Radio id="plan-basic" name="plan" />);

    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("type", "radio");
    expect(radio).toHaveAttribute("id", "plan-basic");
    expect(radio).toHaveAttribute("name", "plan");
  });

  it("honors disabled state", () => {
    render(<Radio id="plan-disabled" name="plan" disabled />);

    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("reflects aria-invalid", () => {
    render(<Radio id="plan-invalid" name="plan" aria-invalid="true" />);

    expect(screen.getByRole("radio")).toHaveAttribute("aria-invalid", "true");
  });

  it("can be focused via tab", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">Before</button>
        <Radio id="plan-focus" name="plan" />
      </div>
    );

    await user.tab();
    await user.tab();

    expect(screen.getByRole("radio")).toHaveFocus();
  });

  it("selects when label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Radio id="plan-choice" name="plan" />
        <Label htmlFor="plan-choice">Basic plan</Label>
      </div>
    );

    const radio = screen.getByRole("radio");
    expect(radio).not.toBeChecked();

    await user.click(screen.getByText("Basic plan"));
    expect(radio).toBeChecked();
  });

  it("forwards refs to the native input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio id="plan-ref" name="plan" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
