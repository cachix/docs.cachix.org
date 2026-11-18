---
title: "Use an existing cache"
description: "Configure Nix to download builds from a public or private Cachix cache and verify access with cachix doctor."
slug: "using-a-cache.html"
---

Use the Cachix CLI to configure Nix to download builds from an existing Cachix cache.
Once configured, Nix checks the cache during your normal builds and downloads matching results instead of rebuilding them.

## Find the cache name

Get the cache name from the project’s documentation or the person sharing the cache.
For a cache at `https://my-team.cachix.org`, the name is `my-team`.
Replace `MY_CACHE` with that name in the commands below.

If you want to create your own cache, follow [Make your first push](/getting-started.html).

## Install the CLI

Install [Nix and the Cachix CLI](/installation.html#installation) on each machine that should use the cache.

## Authenticate for a private cache

For a public cache, skip this step. You don't need a Cachix account or token to download public builds.

For a private cache, ask the cache owner for a token with read access.
If you manage the cache, you can create a **Read only** token in its **Settings**.
Save the token in your local Cachix configuration, replacing `YOUR_TOKEN` with its value:

```console
$ cachix authtoken YOUR_TOKEN
```

Authenticate before running `cachix use` so it can configure Nix’s access to the private cache.
For CI, supply the token through `CACHIX_AUTH_TOKEN` instead.

## Configure Nix

Add the cache to your Nix configuration:

```console
$ cachix use MY_CACHE
```

This adds the cache’s URL and public signing keys so Nix can download and verify its builds.
Follow any instructions printed by the command to finish applying the configuration.
On NixOS, this can include importing the generated module and running `sudo nixos-rebuild switch`.
See [Configuring Nix](/configuring-a-cache.html#configuring-nix) for how Cachix chooses where to write the configuration.

## Verify the cache

Run `cachix doctor` to check your Cachix configuration, connectivity, and authentication:

```console
$ cachix doctor --cache MY_CACHE
```

If a check fails, follow its diagnostic message before continuing.

## Use cached builds

Build your project as usual. For a project with a `default.nix`:

```console
$ nix-build
```

For a flake project, use `nix build` instead.
Nix needs a cached result for the exact store path your build requests, which depends on the build’s inputs and system type.

When Nix downloads a build result, its log identifies the cache:

```text
copying path '/nix/store/…-myproject-1.0' from 'https://MY_CACHE.cachix.org'...
```

If the result is already in your local Nix store, Nix reuses it without downloading it again.

## Check a specific build

To check whether an existing build result is available from the cache, pass its store path:

```console
$ cachix doctor --cache MY_CACHE "$(nix path-info ./result)"
```

Replace `./result` with your build result symlink.
Look for `found in cache` in the store path check.
This works even when the result is already in your local Nix store.

If the path is available but Nix builds it locally, see [Troubleshooting cache misses](/faq.html#why-is-nix-not-picking-up-on-any-of-the-pre-built-artifacts).
