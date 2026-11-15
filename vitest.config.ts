import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Unit tests run without starting or migrating the user's persistent database.
export default defineConfig({
  plugins: [react()],
  test: {
    testTimeout: 120_000,
    hookTimeout: 120_000,
  },
});
