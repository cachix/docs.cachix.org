import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'parse5';

const [preview, production = 'https://docs.cachix.org'] = process.argv.slice(2);
assert.ok(preview, 'Usage: node scripts/check-hosted.mjs <preview-url> [production-url]');
const manifest = JSON.parse(await readFile(new URL('./legacy-urls.json', import.meta.url), 'utf8'));
const attr = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value;
function collect(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => collect(child, predicate))];
}

async function follow(base, path) {
  const hops = [];
  let url = new URL(path, base);
  for (let count = 0; count < 6; count++) {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    const location = response.headers.get('location');
    hops.push({ path: url.pathname + url.search, status: response.status });
    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url);
      continue;
    }
    return { hops, html: await response.text(), status: response.status };
  }
  throw new Error(`Redirect loop: ${base}${path}`);
}

const paths = [...Object.keys(manifest), '/search.html?q=pins', '/not-a-cachix-doc.html'];
for (let start = 0; start < paths.length; start += 4) {
  await Promise.all(paths.slice(start, start + 4).map(async (path) => {
    const [next, current] = await Promise.all([follow(preview, path), follow(production, path)]);
    // Sphinx has no 404 page, so Pages currently falls back to the home page
    // with status 200 for unknown paths. The migration intentionally fixes this.
    if (path !== '/not-a-cachix-doc.html') {
      assert.deepEqual(next.hops, current.hops, `${path}: redirect behavior differs from production`);
    }
    assert.equal(next.status, path === '/not-a-cachix-doc.html' ? 404 : 200, `${path}: unexpected status`);
    if (manifest[path]) {
      const document = parse(next.html);
      const ids = new Set(collect(document, (node) => attr(node, 'id')).map((node) => attr(node, 'id')));
      for (const id of manifest[path].ids) assert.ok(ids.has(id), `${path}#${id}: missing hosted anchor`);
      const heading = collect(document, (node) => node.tagName === 'h1')[0];
      const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
      assert.equal(text(heading), manifest[path].title, `${path}: incorrect hosted page`);
    }
  }));
}
console.log(`${paths.length - 1} hosted URLs match production status and redirects; all ${Object.values(manifest).reduce((count, page) => count + page.ids.length, 0)} legacy anchors resolve. Unknown paths correctly return 404.`);
