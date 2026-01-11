import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Button } from ".";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

describe("Button", () => {
  it("defaults type to button", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("allows overriding type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("honors disabled state", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("sets aria-busy and disables when loading", () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("does not call onClick when loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button loading onClick={onClick}>
        Loading
      </Button>
    );

    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards ref to the native button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveAttribute("type", "button");
  });
});
