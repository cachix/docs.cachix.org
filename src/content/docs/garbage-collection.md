---
title: "Garbage Collection"
description: "When pushing Nix store paths to Cachix, they are first checked for existence in upstream NixOS cache (to avoid wasting storage) and if not, they are compressed and uploaded ."
slug: "garbage-collection.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="garbage-collection" class="legacy-anchor"></span>

When pushing Nix store paths to Cachix,
they **are first checked for existence** in [upstream NixOS cache](https://cache.nixos.org)
(to avoid wasting storage) and if not,
they are **compressed and uploaded**.

You can [switch between different storage plans](https://www.cachix.org/pricing)
to avoid reaching the storage limits.

Once you reach **85% of your storage limit**, you will receive **a warning email**
and another email **when you reach the limit**.

You can always check [Garbage Collection page](https://app.cachix.org/garbage-collection)
to see which store paths would be deleted first in case the limit is reached.

## Deletion algorithm {#deletion-algorithm}

The following statistics are collected for each binary cache:

- **creation date** of a pushed [narinfo](/glossary.html#term-narinfo)
- **last accessed date** of [narinfo](/glossary.html#term-narinfo) and [nar archive](/glossary.html#term-nar-archive) files

Garbage collection algorithm sorts all store paths
**by their last accessed date or creation date if the path was never accessed**.
It deletes **the oldest entries** up until your storage limit.

Due to a [known Nix bug](https://github.com/NixOS/nix/issues/3534),
Cachix will never serve a [narinfo](/glossary.html#term-narinfo) that does not contain full closure
(all dependencies).
