---
title: "Garbage Collection"
description: "Understand when Cachix reclaims storage, preview eligible paths, and protect releases with pins."
slug: "garbage-collection.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="garbage-collection" class="legacy-anchor"></span>

Garbage collection automatically removes eligible store paths to reclaim storage.
It reclaims space across the account’s caches while protecting paths retained by pins.

## Storage limit

Garbage collection runs when your account reaches its storage limit.
You'll receive a warning email at **80% usage** and another when you reach the limit.
Uploads and downloads continue as normal, even if you're over the limit.

To keep more cached builds, [switch to a larger storage plan](https://www.cachix.org/pricing).

## Deletion algorithm {#deletion-algorithm}

When collection runs, Cachix excludes paths protected by retained pin revisions and selects eligible paths across the account’s caches using least recently used (LRU) ordering.
The least recently accessed paths are selected first, using the creation date for paths that have never been accessed.
Access to either a path’s [narinfo](/glossary.html#term-narinfo) or its [NAR archive](/glossary.html#term-nar-archive) updates its access date.

Recent access affects collection order, but does not guarantee retention.
Use a pin for paths you need to keep available.

## Protect paths from collection

A retained pin revision protects its root store path and its dependency closure.
Dependencies used only to build the release, such as a compiler, are outside that closure unless the release also references them at runtime.

When a revision expires or you delete its pin, its paths become eligible for collection unless another retained revision protects them.
Expiry removes protection; it does not immediately delete the paths.
See [Pins and retention](/pins.html#controlling-retention-with-pins) to keep revisions by age or revision count.

## Preview collection

Open the account’s [Garbage Collection page](https://app.cachix.org/garbage-collection).

- **Summary** shows storage usage and total pinned size.
- **Next** previews candidates by cache and store path, with their file size, last access date, and creation date.
- **History** shows paths already deleted and their deletion dates.

