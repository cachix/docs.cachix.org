/** Support explicit Markdown heading IDs: ## Heading {#existing-sphinx-id}. */
export function legacyHeadingIds() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'heading') {
        const last = node.children.at(-1);
        const match = last?.type === 'text' && last.value.match(/\s+\{#([^}]+)\}$/);
        if (match) {
          last.value = last.value.slice(0, match.index);
          node.data ??= {};
          node.data.hProperties ??= {};
          node.data.hProperties.id = match[1];
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
