import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "../../primitives/Input";
import { FormField } from ".";

describe("FormField", () => {
  it("associates the label with the control", async () => {
    const user = userEvent.setup();

    render(
      <FormField id="email" label="Email">
        <Input id="email" />
      </FormField>
    );

    const input = screen.getByRole("textbox");
    await user.click(screen.getByText("Email"));
    expect(input).toHaveFocus();
  });

  it("merges aria-describedby in the correct order", () => {
    render(
      <FormField
        id="email"
        label="Email"
        description="Helpful text"
        error="Required"
      >
        <Input id="email" aria-describedby="custom" />
      </FormField>
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "custom email--description email--error"
    );
  });

  it("marks the control invalid when error is provided", () => {
    render(
      <FormField id="email" label="Email" error="Required">
        <Input id="email" />
      </FormField>
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards disabled and required to the control", () => {
    render(
      <FormField id="email" label="Email" disabled required>
        <Input id="email" />
      </FormField>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
  });
});
