---
title: "Garbage Collection"
description: "Garbage Collection"
slug: "garbage-collection.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="garbage-collection" class="legacy-anchor"></span>

You can [switch between different storage plans](https://www.cachix.org/pricing)
to avoid reaching the storage limits.

Once you reach **85% of your storage limit**, you will receive **a warning email**
and another email **when you reach the limit**.

You can always check [Garbage Collection page](https://app.cachix.org/garbage-collection)
to see which store paths would be deleted first in case the limit is reached.

## Collection policies

<!-- TODO: Explain how the hosted service applies an account's storage limit and identify which collection policies can be configured on Cachix Server for Enterprise. -->

### Storage limit

### Last access

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

## Preview collection

<!-- TODO: Show where to find the account's collection preview and how to read its estimate, including how pins and later access can change which paths are eligible. -->

## Protect paths from collection

[Pins and retention](/pins.html#controlling-retention-with-pins)
