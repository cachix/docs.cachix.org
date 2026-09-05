import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

// Starlight normalizes sidebar links for directory builds. Restore the file
// extension because our build hook emits the original Sphinx file layout.
export const onRequest = defineRouteMiddleware(({ locals }) => {
  const restore = (href: string) => href.startsWith('/') && href !== '/' && !href.endsWith('.html')
    ? `${href}.html`
    : href;
  function visit(entries: StarlightRouteData['sidebar']) {
    for (const entry of entries) {
      if (entry.type === 'group') visit(entry.entries);
      else entry.href = restore(entry.href);
    }
  }
  visit(locals.starlightRoute.sidebar);
  for (const link of Object.values(locals.starlightRoute.pagination)) {
    if (link) link.href = restore(link.href);
  }
});
