import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import Label from "../Label/Label";
import Switch from "./Switch";

describe("Switch", () => {
  it("renders a checkbox input", () => {
    render(<Switch id="notifications" />);

    const checkbox = screen.getByRole("switch");
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("honors disabled state", () => {
    render(<Switch id="notifications" disabled />);

    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch id="notifications" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("toggles when label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Switch id="alerts" />
        <Label htmlFor="alerts">Enable alerts</Label>
      </div>
    );

    const checkbox = screen.getByRole("switch");
    expect(checkbox).not.toBeChecked();

    await user.click(screen.getByText("Enable alerts"));
    expect(checkbox).toBeChecked();
  });
});
