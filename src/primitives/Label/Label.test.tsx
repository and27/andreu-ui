import { render, screen } from "@testing-library/react";

import { Label } from ".";
import { describe, expect, it } from "vitest";

describe("Label", () => {
  it("renders text and associates htmlFor", () => {
    render(<Label htmlFor="name">Name</Label>);

    const label = screen.getByText("Name");
    expect(label).toHaveAttribute("for", "name");
  });
});
