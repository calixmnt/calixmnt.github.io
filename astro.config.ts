import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://calixmnt.github.io/",
  integrations: [
    mdx({}),
    icon({
      iconDir: "src/icons",
      include: {
        feather: ["github", "mail", "at-sign", "corner-down-left"],
        hugeicons: ["notion-01", "notion-02"],
      },
    }),
  ],
});
