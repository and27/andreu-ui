import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup, RadioGroupItem } from ".";

describe("RadioGroup", () => {
  it("renders a fieldset and legend when label is provided", () => {
    render(
      <RadioGroup name="plan" label="Plan">
        <RadioGroupItem id="plan-basic" value="basic">
          Basic
        </RadioGroupItem>
      </RadioGroup>
    );

    const group = screen.getByRole("group", { name: "Plan" });
    expect(group.tagName).toBe("FIELDSET");
  });

  it("applies the group name to each radio item", () => {
    render(
      <RadioGroup name="plan" label="Plan">
        <RadioGroupItem id="plan-basic" value="basic">
          Basic
        </RadioGroupItem>
        <RadioGroupItem id="plan-pro" value="pro">
          Pro
        </RadioGroupItem>
      </RadioGroup>
    );

    expect(screen.getByRole("radio", { name: "Basic" })).toHaveAttribute(
      "name",
      "plan"
    );
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute(
      "name",
      "plan"
    );
  });

  it("supports uncontrolled defaultValue", () => {
    render(
      <RadioGroup name="plan" label="Plan" defaultValue="pro">
        <RadioGroupItem id="plan-basic" value="basic">
          Basic
        </RadioGroupItem>
        <RadioGroupItem id="plan-pro" value="pro">
          Pro
        </RadioGroupItem>
      </RadioGroup>
    );

    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("fires onValueChange in controlled mode", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <RadioGroup name="plan" label="Plan" value="basic" onValueChange={onValueChange}>
        <RadioGroupItem id="plan-basic" value="basic">
          Basic
        </RadioGroupItem>
        <RadioGroupItem id="plan-pro" value="pro">
          Pro
        </RadioGroupItem>
      </RadioGroup>
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(onValueChange).toHaveBeenCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Basic" })).toBeChecked();
  });

  it("disables all radios when the group is disabled", () => {
    render(
      <RadioGroup name="plan" label="Plan" disabled>
        <RadioGroupItem id="plan-basic" value="basic">
          Basic
        </RadioGroupItem>
      </RadioGroup>
    );

    expect(screen.getByRole("radio", { name: "Basic" })).toBeDisabled();
  });

  it("propagates aria-invalid to items", () => {
    render(
      <RadioGroup name="plan" label="Plan" aria-invalid="true">
        <RadioGroupItem id="plan-basic" value="basic">
          Basic
        </RadioGroupItem>
      </RadioGroup>
    );

    expect(screen.getByRole("radio", { name: "Basic" })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
