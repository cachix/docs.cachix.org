---
title: "Upstreams"
description: "Reuse store paths from other binary caches when pushing to and downloading from your cache."
slug: "upstreams.html"
---

An upstream is another binary cache your cache can use as a source of store paths.
This lets you reuse builds across caches without uploading or storing duplicate copies.

For example, your team might have a cache for each project but use the same development tools across projects.
You can publish those tools to a shared cache and use it as an upstream for each project.
Developers can then download the tools through the project cache they already use.

## Setup

1. Open your cache in the [Cachix dashboard](https://app.cachix.org).
2. Go to Settings → General.
3. Under Upstream caches, enter the upstream’s name in the Cachix cache name field.
4. Select Add, then Save.

Every cache uses `cache.nixos.org` as an upstream by default.

## How it works

On a push, the CLI uploads only the store paths missing from both your cache and its upstreams.

When Nix requests a store path, the lookup starts in your cache.
If the path is missing, your cache checks its upstreams in the order you configured them and serves the first match as a pass-through download.

Upstream signatures are preserved.
Configure Nix to trust the [public signing keys for your cache and its upstreams](/configuring-a-cache.html#public-signing-keys).

## Limitations

### Eligible caches

Only Cachix caches and `cache.nixos.org` are eligible to be upstreams.

| Your cache | Upstreams you can add                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Public     | Any public Cachix cache                                                                             |
| Private    | Any public Cachix cache, or a private cache owned by the same account or organization as your cache |

### Search depth

A cache searches only its direct upstreams for store paths.
In other words, the search algorithm performs at most one hop from your cache to an upstream.
If an upstream configures its own upstreams, those caches are not searched.

### Garbage collection

Store paths served from an upstream are subject to that upstream’s storage allowance and may be garbage collected.
[Use pins](/pins.html#pins-and-upstreams) to protect paths from garbage collection.
