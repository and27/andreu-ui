import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Label } from "../Label";
import { Select } from ".";

describe("Select", () => {
  const options = (
    <>
      <option value="starter">Starter</option>
      <option value="pro">Pro</option>
    </>
  );

  it("renders a select with the provided id", () => {
    render(
      <Select id="plan" name="plan">
        {options}
      </Select>
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("id", "plan");
  });

  it("honors disabled state", () => {
    render(
      <Select id="plan" disabled>
        {options}
      </Select>
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("reflects aria-invalid", () => {
    render(
      <Select id="plan" aria-invalid="true">
        {options}
      </Select>
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("can be focused via tab", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">Before</button>
        <Select id="plan">{options}</Select>
      </div>
    );

    await user.tab();
    await user.tab();

    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("focuses when label is clicked", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Label htmlFor="plan">Plan</Label>
        <Select id="plan">{options}</Select>
      </div>
    );

    await user.click(screen.getByText("Plan"));
    expect(screen.getByRole("combobox")).toHaveFocus();
  });
});
