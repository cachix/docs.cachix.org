---
title: "Getting Started"
description: "With Nix and Cachix installed you can cache any Nix build result."
slug: "getting-started.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="getting-started" class="legacy-anchor"></span>

## Install Cachix

Install [Nix and Cachix](/installation.html#installation).

## Creating the cache {#creating-the-cache}

With [Nix and Cachix installed](/installation.html#installation)
you can cache any Nix build result.

After logging into [Cachix](https://app.cachix.org)
you’ll be able to create a new binary cache.

### Organizing your caches {#organizing-your-caches}

See [Organizing your caches](/configuring-a-cache.html#organizing-your-caches).

## Authenticating {#authenticating}

See [Authenticating](/configuring-a-cache.html#authenticating) to generate an [access token](/glossary.html#term-access-token).

You can set the auth token with either:

1. `$ cachix authtoken XXX`
2. `$ export CACHIX_AUTH_TOKEN=XXX`

:::tip
Run `cachix doctor` to verify your configuration and authentication are set up correctly.
:::

## Signing key (advanced) {#signing-key-advanced}

See [Signing key (advanced)](/configuring-a-cache.html#signing-key-advanced).

## Pushing binaries with Cachix {#pushing-binaries-with-cachix}

<!-- TODO: Guide the reader through building their own project with nix-build and pushing ./result using the cache name chosen above. Explain the default.nix prerequisite and show how to recognize a successful push. -->

Assuming you have a project with `default.nix` you can build it and push:

```console
$ nix-build | cachix push mycache
```

It’s recommended to set up [Continuous Integration to push](/continuous-integration-setup/index.html#getting-started-ci) for every branch of every project.

See [all different ways of pushing](/pushing.html#pushing).

## Verify the cached build

### Using binaries with Nix {#using-binaries-with-nix}

See [Use an existing cache](/using-a-cache.html) to configure Nix and use the builds you pushed.
