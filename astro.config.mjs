import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  vite: {
    build: {
      rollupOptions: {
        external: ["@astrojs/rss"],
      },
    },
  },
  integrations: [
    tailwind(),
    icon({
      include: {
        lucide: ["*"],
      },
    }),
  ],
});
