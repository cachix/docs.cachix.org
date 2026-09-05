---
title: "What is a Binary Cache?"
description: "Every Nix package is identified by a unique hash derived from all of its inputs (source code, dependencies, build flags, etc.). Before performing a build, Nix checks whether a…"
slug: "what-is-a-binary-cache.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="what-is-a-binary-cache" class="legacy-anchor"></span>

Every Nix package is identified by a unique hash derived from all of its inputs (source code, dependencies, build flags, etc.).
Before performing a build, Nix checks whether a result with that hash already exists somewhere.
If it does, Nix downloads the prebuilt result instead of rebuilding from source.

A [binary cache](/glossary.html#term-binary-cache) is the server that stores and serves these prebuilt results.

## Without a binary cache {#without-a-binary-cache}

When no binary cache is available, Nix builds everything from source.
This means compiling the entire dependency tree, which can take minutes for small projects and hours for larger ones.
Every developer on your team and every CI run repeats this work, even though the inputs are identical.

## How a binary cache helps {#how-a-binary-cache-helps}

A binary cache stores the output of builds so they can be reused.
When Nix finds a matching hash in a binary cache, it downloads the prebuilt result in seconds instead of rebuilding it.

This saves time in several scenarios:

- **Developer machines**: team members get prebuilt dependencies instead of compiling them locally.
- **CI/CD pipelines**: builds reuse artifacts from previous runs rather than starting from scratch.
- **Deployment**: machines pull the exact binaries that were tested in CI.

## The default binary cache {#the-default-binary-cache}

NixOS provides a public binary cache at `cache.nixos.org` that serves prebuilt versions of packages in Nixpkgs.
Most standard packages are already available there.

However, `cache.nixos.org` only covers official Nixpkgs. Your own projects, custom packages,
patched dependencies, and private software are not available in it.

## Where Cachix fits in {#where-cachix-fits-in}

[Cachix](https://cachix.org) provides hosted binary caches so you can store and share your own build results.

With Cachix, you can:

- **Push** build outputs from CI so your team never rebuilds the same thing twice.
- **Share** public caches with the community for open source projects.
- **Protect** proprietary builds with private caches that require authentication.
- **Pin** important store paths to prevent them from being garbage collected.

A typical workflow looks like this:

1. CI builds your project and pushes the result to your Cachix binary cache.
2. Developers run `cachix use mycache` to configure Nix to pull from your cache.
3. Nix automatically downloads prebuilt artifacts instead of rebuilding.

To get started, see [Installation](/installation.html#installation) and [Getting Started](/getting-started.html#getting-started).
