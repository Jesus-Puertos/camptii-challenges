import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";
import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";

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
    react(),
    auth(),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
