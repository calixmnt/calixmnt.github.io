import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: 'http://localhost:4321/',
  integrations: [icon()],
});