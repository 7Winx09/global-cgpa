// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://globalcgpa.in',
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        // Higher priority for main pages
        const highPriorityPaths = ['/', '/cgpa-to-percentage-in-hindi', '/ar/', '/vn/'];
        if (highPriorityPaths.includes(item.url.replace('https://globalcgpa.in', ''))) {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        // Lower priority for individual CGPA value pages
        if (item.url.includes('-cgpa-to-percentage/') && /[0-9]/.test(item.url)) {
          return { ...item, priority: 0.5, changefreq: 'monthly' };
        }
        // University pages
        if (item.url.includes('/university') || item.url.includes('-university-')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        // Guide pages
        if (item.url.includes('/guides/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }
        return item;
      },
      filter: (page) => {
        // Exclude 404, 500, and other utility pages
        if (page.includes('/404') || page.includes('/500')) return false;
        // Exclude noindex CGPA value pages (e.g., /7.5-cgpa-to-percentage/)
        if (page.match(/\/\d+(\.\d+)?-cgpa-to-percentage\//)) return false;
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
