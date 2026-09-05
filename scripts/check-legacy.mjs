import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { parse } from 'parse5';

const manifest = JSON.parse(await readFile(new URL('./legacy-urls.json', import.meta.url), 'utf8'));
const output = new URL('../dist/', import.meta.url);
const attr = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value;
function all(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => all(child, predicate))];
}
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
let anchors = 0;

for (const [url, legacy] of Object.entries(manifest)) {
  const file = new URL(url.slice(1), output);
  assert.ok((await stat(file)).isFile(), `${url} must be an HTML file`);
  const html = await readFile(file, 'utf8');
  const document = parse(html);
  const ids = all(document, (node) => attr(node, 'id')).map((node) => attr(node, 'id'));
  assert.equal(new Set(ids).size, ids.length, `${url}: duplicate IDs`);
  for (const id of legacy.ids) {
    assert.ok(ids.includes(id), `${url}#${id} no longer resolves`);
    anchors++;
  }
  const headings = all(document, (node) => node.tagName === 'h1');
  assert.equal(headings.length, 1, `${url}: expected one page heading`);
  assert.equal(text(headings[0]), legacy.title, `${url}: page title changed`);
  const canonical = all(document, (node) => node.tagName === 'link' && attr(node, 'rel') === 'canonical')[0];
  assert.equal(new URL(attr(canonical, 'href')).href, `https://docs.cachix.org${url === '/index.html' ? '/' : url}`, `${url}: canonical URL changed`);
  assert.ok(!html.includes('{#'), `${url}: unprocessed heading ID`);
  for (const link of all(document, (node) => node.tagName === 'a' && attr(node, 'href')?.startsWith('/'))) {
    const pathname = new URL(attr(link, 'href'), 'https://docs.cachix.org').pathname;
    assert.ok(pathname === '/' || pathname.endsWith('.html') || pathname.startsWith('/_'), `${url}: navigation changed a legacy URL to ${pathname}`);
  }
}

for (const file of ['search.html', '404.html', 'pagefind/pagefind.js', 'objects.inv', '_sources/index.rst.txt']) {
  assert.ok((await stat(new URL(file, output))).isFile(), `Missing compatibility or search asset: ${file}`);
}

console.log(`Preserved ${Object.keys(manifest).length} legacy pages and ${anchors} anchors; search and compatibility assets exist.`);
