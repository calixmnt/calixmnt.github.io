import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export async function get() {
  // Liste des URLs du site
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/projects', changefreq: 'weekly', priority: 0.8 },
    { url: '/blog', changefreq: 'weekly', priority: 0.7 },
  ];

  // Création du flux sitemap
  const stream = new SitemapStream({ 
    hostname: 'https://calixmnt.github.io',
    xmlns: {
      news: false,
      xhtml: false,
      image: false,
      video: false
    }
  });

  // Conversion du tableau en flux lisible
  const data = await streamToPromise(Readable.from(links).pipe(stream));
  const sitemap = data.toString();

  return {
    body: sitemap,
    encoding: 'utf-8',
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      'Cache-Control': 'public, max-age=3600',
    },
  };
}
