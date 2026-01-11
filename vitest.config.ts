import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const storybookConfigDir = path.join(dirname, ".storybook");
const storybookProjectName = `storybook:${storybookConfigDir.replace(/\\/g, "/")}`;
const storybookProjects =
  process.env.VITEST_STORYBOOK === "true"
    ? [
        {
          extends: true,
          plugins: [storybookTest({ configDir: storybookConfigDir })],
          test: {
            name: storybookProjectName,
            browser: {
              enabled: true,
              headless: true,
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
            setupFiles: ["./src/test/setup.ts", ".storybook/vitest.setup.ts"],
          },
        },
      ]
    : undefined;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    ...(storybookProjects ? { projects: storybookProjects } : {}),
  },
});
