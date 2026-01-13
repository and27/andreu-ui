import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsList, TabsPanel, TabsTrigger } from ".";

const renderTabs = () =>
  render(
    <Tabs id="account" defaultValue="profile">
      <TabsList aria-label="Account">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsPanel value="profile">Profile content</TabsPanel>
      <TabsPanel value="billing">Billing content</TabsPanel>
      <TabsPanel value="security">Security content</TabsPanel>
    </Tabs>
  );

describe("Tabs", () => {
  it("selects the default tab and shows its panel", () => {
    renderTabs();

    expect(screen.getByRole("tab", { name: "Profile" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel", { name: "Profile" })).toBeVisible();
    const billingPanel = document.getElementById("account--panel-billing");
    expect(billingPanel).not.toBeNull();
    expect(billingPanel).toHaveAttribute("hidden");
  });

  it("moves selection with arrow keys", async () => {
    const user = userEvent.setup();
    renderTabs();

    const profileTab = screen.getByRole("tab", { name: "Profile" });
    await user.click(profileTab);
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel", { name: "Billing" })).toBeVisible();
  });

  it("skips disabled tabs during navigation", async () => {
    const user = userEvent.setup();

    render(
      <Tabs id="account" defaultValue="profile">
        <TabsList aria-label="Account">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsPanel value="profile">Profile content</TabsPanel>
        <TabsPanel value="billing">Billing content</TabsPanel>
        <TabsPanel value="security">Security content</TabsPanel>
      </Tabs>
    );

    const profileTab = screen.getByRole("tab", { name: "Profile" });
    await user.click(profileTab);
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Security" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
