---
title: "Upstreams"
slug: "upstreams.html"
---

## Uploads and dependencies

When pushing Nix store paths to Cachix,
they **are first checked for existence** in [upstream NixOS cache](https://cache.nixos.org)
(to avoid wasting storage) and if not,
they are **compressed and uploaded**.

## Configure upstreams

<!-- TODO: Show how to add a Cachix cache by name in another cache's settings. Walk through a dependency already in the upstream and show how to verify reuse. -->

## Lookup order and direct upstreams

## Visibility and ownership rules

## cache.nixos.org

<!-- TODO: Explain how cache.nixos.org satisfies closure checks and distinguish that behavior from downloading a path through a Cachix upstream. -->

## Signing keys and client configuration

[Configure Nix](/configuring-a-cache.html#configuring-nix)

## Retain content from upstreams

[Pins](/pins.html)
