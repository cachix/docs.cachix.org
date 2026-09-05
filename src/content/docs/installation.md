---
title: "Installation"
description: "With Nix installed :"
slug: "installation.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="installation" class="legacy-anchor"></span>

## Recommended {#recommended}

With [Nix installed](https://nix.dev/install-nix):

```console
$ nix-env -iA cachix -f https://cachix.org/api/v1/install
```

## Flakes {#flakes}

```console
$ nix profile install --accept-flake-config nixpkgs#cachix
```

## Using Nixpkgs or NixOS {#using-nixpkgs-or-nixos}

Using `pkgs.cachix` attribute will install the latest stable version.
