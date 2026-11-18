---
title: "Getting Started"
description: "Create a Cachix cache, authenticate the CLI, and upload your first Nix build."
slug: "getting-started.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="getting-started" class="legacy-anchor"></span>

Create a binary cache on Cachix and upload a Nix build result so you can reuse it on other machines and in CI.

## Create a cache {#creating-the-cache}

1. Sign in to the [Cachix dashboard](https://app.cachix.org), or create an account if you don't have one.
2. Select **New Cache**.
3. Enter a **Unique name** using lowercase letters, numbers, and dashes. The name becomes part of your cache’s URL: `https://YOUR-CACHE-NAME.cachix.org`.
4. Choose **Public** if anyone should be able to download your builds, or **Private** to restrict downloads to authorized users. Private caches require an active subscription.
5. <span id="signing-key-advanced" class="legacy-anchor"></span>For signing, choose **Managed by Cachix**. This is the recommended option: Cachix creates the signing key and signs uploaded paths for you. If you need to manage your own key, see [self-signed cache configuration](/configuring-a-cache.html#signing-key-advanced).
6. Select **Create Cache** to open your new cache’s dashboard.

Replace `MY_CACHE` with the name you chose in all commands below.

<span id="organizing-your-caches" class="legacy-anchor"></span>
If you're setting up caches for several teams or projects, see [Organizing your caches](/configuring-a-cache.html#organizing-your-caches).

## Install the CLI

Install [Nix and the Cachix CLI](/installation.html#installation) on the machine you'll upload builds from.

## Authenticate the CLI {#authenticating}

Create a token that lets the CLI upload to your new cache:

1. Open your cache’s **Settings** and go to its auth tokens page.
2. Enter a description, such as `local development`, choose **Read and write** access, and select an expiration.
3. Select **Create token** and copy the token. Cachix shows it only once.

Save the token in your local Cachix configuration, replacing `YOUR_TOKEN` with the value you copied:

```console
$ cachix authtoken YOUR_TOKEN
```

Check that the CLI can connect and authenticate:

```console
$ cachix doctor --cache MY_CACHE
```

For CI, supply the token through `CACHIX_AUTH_TOKEN` instead of saving it locally.
See [Authentication](/configuring-a-cache.html#authenticating) for other token options.

## Build and push {#pushing-binaries-with-cachix}

Create a directory for a small example build:

```console
$ mkdir cachix-example
$ cd cachix-example
```

Save the following as `default.nix`.
It builds a directory containing a greeting:

```nix title="default.nix"
let
  pkgs = import <nixpkgs> {};
in
pkgs.runCommand "hello-cachix" {} ''
  mkdir -p "$out"
  echo "Hello from Cachix!" > "$out/message"
''
```

Build it and upload the result to your cache:

```console
$ nix-build
$ cachix push MY_CACHE ./result
```

`nix-build` creates a `result` symlink to the output in the Nix store.
Cachix follows that link and uploads the result and its runtime dependencies, skipping paths already available from the cache or its upstreams.
A successful push exits with status zero, including when all paths are already available.

## Verify the upload

Check that the build result is available:

```console
$ cachix doctor --cache MY_CACHE "$(nix path-info ./result)"
```

Look for `found in cache` in the store path check.

## Use your cache {#using-binaries-with-nix}

Configure Nix to download builds from your cache:

```console
$ cachix use MY_CACHE
```

Run this on each machine that should use the cache.
For private caches, authenticate on those machines first; a read-only token is sufficient for downloads.
Follow any configuration instructions printed by `cachix use`, or see [Use an existing cache](/using-a-cache.html) for details.

To upload future builds automatically, [set up CI](/continuous-integration-setup/index.html).
See [Pushing to Cachix](/pushing.html) for other ways to upload builds.
