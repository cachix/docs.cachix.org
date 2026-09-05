import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import { siteKitStarlight } from '@cachix/site-kit/starlight';
import { sidebar } from './src/navigation.mjs';
import { legacyHeadingIds } from './src/plugins/legacy-heading-ids.mjs';
import { keyboardTables } from './src/plugins/keyboard-tables.mjs';
import { htmlFileRoutes } from './src/plugins/html-file-routes.mjs';

export default defineConfig({
  site: 'https://docs.cachix.org',
  trailingSlash: 'never',
  // Explicit .html pages intentionally take precedence over Starlight's catch-all.
  prerenderConflictBehavior: 'ignore',
  // Starlight slugs include .html so navigation, canonicals, and search agree.
  // Flatten Astro's directory output into the original Sphinx file layout.
  build: { format: 'directory' },
  markdown: { processor: unified({ remarkPlugins: [legacyHeadingIds, keyboardTables] }) },
  integrations: [
    starlight({
      title: 'Cachix Docs',
      description: 'Documentation for Cachix binary cache hosting, Cachix Deploy, and Cachix Server for Enterprise.',
      favicon: '/favicon.svg',
      head: [
        { tag: 'script', content: 'window.$crisp = []; window.CRISP_WEBSITE_ID = "b2f69f1c-c734-49c6-be77-9e8a58b85e8c";' },
        { tag: 'script', attrs: { src: 'https://client.crisp.chat/l.js', async: true } },
      ],
      defaultLocale: 'root',
      locales: { root: { label: 'English', lang: 'en' } },
      editLink: { baseUrl: 'https://github.com/cachix/docs.cachix.org/edit/master/' },
      customCss: ['./src/styles/cachix.css'],
      routeMiddleware: './src/route-data.ts',
      expressiveCode: { themes: ['github-light'] },
      components: {
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        MobileMenuToggle: './src/components/MobileMenuToggle.astro',
        Search: './src/components/Search.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        SocialIcons: './src/components/SiteNavigation.astro',
      },
      plugins: [siteKitStarlight({
        footer: {
          title: 'Cachix',
          description: 'Never build software twice.',
          copyright: `© 2016–${new Date().getFullYear()} Enlambda OÜ. All rights reserved.`,
          columns: [
            { heading: 'Support', links: [
              { label: 'Contact us', href: 'mailto:support@cachix.org' },
              { label: 'Status', href: 'https://status.cachix.org' },
              { label: 'GitHub', href: 'https://github.com/cachix' },
            ] },
            { heading: 'Resources', links: [
              { label: 'Pricing', href: 'https://www.cachix.org/pricing' },
              { label: 'Blog', href: 'https://blog.cachix.org' },
              { label: 'Nix tutorials', href: 'https://nix.dev' },
            ] },
          ],
        },
      })],
      sidebar,
    }),
    htmlFileRoutes(),
  ],
});
