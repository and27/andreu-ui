import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Label } from "../Label";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox id="consent" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("honors disabled state", () => {
    render(<Checkbox id="consent" disabled />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox id="consent" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("toggles when label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(screen.getByText("Accept terms"));
    expect(checkbox).toBeChecked();
  });
});
