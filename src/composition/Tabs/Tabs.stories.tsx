import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { Tabs, TabsList, TabsPanel, TabsTrigger } from ".";

const meta = {
  title: "Composition/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const TabsExample = () => (
  <Tabs id="account" defaultValue="profile">
    <TabsList aria-label="Account">
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="security">Security</TabsTrigger>
    </TabsList>
    <TabsPanel value="profile">Profile settings content.</TabsPanel>
    <TabsPanel value="billing">Billing content.</TabsPanel>
    <TabsPanel value="security">Security settings.</TabsPanel>
  </Tabs>
);

export const Default: Story = {
  args: {
    id: "account",
    children: null,
  },
  render: () => <TabsExample />,
};

export const DisabledTab: Story = {
  args: {
    id: "account-disabled",
    children: null,
  },
  render: () => (
    <Tabs id="account-disabled" defaultValue="profile">
      <TabsList aria-label="Account">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsPanel value="profile">Profile settings content.</TabsPanel>
      <TabsPanel value="billing">Billing content.</TabsPanel>
      <TabsPanel value="security">Security settings.</TabsPanel>
    </Tabs>
  ),
};

export const KeyboardNavigation: Story = {
  args: {
    id: "account-keyboard",
    children: null,
  },
  render: () => (
    <Tabs id="account-keyboard" defaultValue="profile">
      <TabsList aria-label="Account">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsPanel value="profile">Profile settings content.</TabsPanel>
      <TabsPanel value="billing">Billing content.</TabsPanel>
      <TabsPanel value="security">Security settings.</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const profileTab = canvas.getByRole("tab", { name: "Profile" });
    await userEvent.click(profileTab);
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Billing" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  },
};
