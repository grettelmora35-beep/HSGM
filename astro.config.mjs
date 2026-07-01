// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: { enabled: true },
  }),
  integrations: [react()],
  site: "https://thewoods.pages.dev",
});
