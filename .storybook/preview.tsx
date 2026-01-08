import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as "light" | "dark";

      const root = document.documentElement;
      if (theme === "dark") root.dataset.theme = "dark";
      else delete root.dataset.theme;

      return (
        <div
          style={{
            minHeight: "100vh",
            background: "var(--color-bg)",
            color: "var(--color-text)",
            padding: "var(--space-4)",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
