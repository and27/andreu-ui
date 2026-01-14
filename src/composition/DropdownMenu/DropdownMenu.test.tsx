import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from ".";

describe("DropdownMenu", () => {
  it("toggles the menu and updates aria-expanded", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu id="actions">
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu id="actions">
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);

    const item = screen.getByRole("button", { name: "Edit" });
    item.focus();

    await user.keyboard("{Escape}");

    expect(trigger).toHaveFocus();
    expect(screen.queryByText("Edit")).toBeNull();
  });

  it("calls onSelect and closes the menu", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DropdownMenu id="actions">
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleSelect}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(screen.getByRole("button", { name: "Edit" }));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Edit")).toBeNull();
  });

  it("closes when tabbing out of the menu", async () => {
    const user = userEvent.setup();

    render(
      <>
        <DropdownMenu id="actions">
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button type="button">After</button>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));

    await user.tab();
    await user.tab();

    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    expect(screen.queryByText("Edit")).toBeNull();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <>
        <DropdownMenu id="actions">
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button type="button">Outside</button>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(screen.queryByText("Edit")).toBeNull();
  });
});
