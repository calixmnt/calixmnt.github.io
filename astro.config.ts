import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Configuration de base pour le site
export default defineConfig({
  // URL de base du site
  site: "https://calixmnt.github.io",
  
  // Configuration des métadonnées SEO via des variables d'environnement
  // Ces variables peuvent être définies dans un fichier .env
  // SITE_TITLE="Calix Monnet - Développeur Web"
  // SITE_DESCRIPTION="Développeur web passionné par le design simple. Découvrez mon travail et mes projets."
  
  // Configuration des intégrations
  integrations: [
    // Intégration MDX pour le support des fichiers .mdx
    mdx({
      // Activation de la syntaxe GFM (GitHub Flavored Markdown)
      gfm: true,
      // Configuration des plugins
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    
    // Intégration des icônes
    icon({
      iconDir: "src/icons",
      include: {
        feather: ["github", "mail", "at-sign", "corner-down-left"],
        hugeicons: ["notion-01", "notion-02"],
        'simple-icons': ['upwork']
      },
    }),
    
    // Intégration du sitemap
    sitemap({
      // Personnalisation de l'URL du sitemap
      customPages: [
        'https://calixmnt.github.io/',
        'https://calixmnt.github.io/about',
        'https://calixmnt.github.io/projects',
        'https://calixmnt.github.io/blog',
      ]
    })
  ],
  
  // Configuration du build
  build: {
    // Options de build
  },
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Configuration de Vite
  vite: {
    // Optimisations de build
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'esnext',
      assetsInlineLimit: 4096,
    },
    // Optimisation des dépendances
    ssr: {
      noExternal: ['@astrojs/mdx']
    }
  }
});
