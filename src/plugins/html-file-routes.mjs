import { readdir, rename, rmdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Emit /guide.html instead of /guide.html/index.html, with no redirects. */
export function htmlFileRoutes() {
  return {
    name: 'cachix-html-file-routes',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        async function flatten(directory) {
          for (const entry of await readdir(directory, { withFileTypes: true })) {
            if (!entry.isDirectory()) continue;
            const path = join(directory, entry.name);
            await flatten(path);
            if (!entry.name.endsWith('.html')) continue;
            const temporary = `${path}.tmp`;
            await rename(join(path, 'index.html'), temporary);
            await rmdir(path);
            await rename(temporary, path);
          }
        }
        await flatten(fileURLToPath(dir));
      },
    },
  };
}
