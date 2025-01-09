import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Expose global variables
    environment: "jsdom", // Simulates a browser-like environment
    setupFiles: "./src/setupTests.ts", // Jest-like setup file
  },
});
