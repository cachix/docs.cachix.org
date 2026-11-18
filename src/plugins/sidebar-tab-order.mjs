/** Keep the initial Tab stop at the skip link instead of the current sidebar entry. */
export function sidebarTabOrder() {
  return {
    name: 'sidebar-tab-order',
    enforce: 'pre',
    transform(source, id) {
      if (!id.split('?')[0].endsWith('/astro-vtbot/components/starlight/StarlightConnector.astro')) return;
      // Chromium moves its sequential focus starting point on scrollIntoView.
      // Expand the initial category without scrolling; retain scrolling after navigation.
      return source.replace('openCategory();', 'openCategory(undefined, false);');
    },
  };
}
