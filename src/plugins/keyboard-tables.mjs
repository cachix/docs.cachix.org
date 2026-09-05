/** Starlight scrolls wide tables horizontally. Make them keyboard reachable. */
export function keyboardTables() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'table') {
        node.data ??= {};
        node.data.hProperties = { ...node.data.hProperties, tabIndex: 0 };
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
