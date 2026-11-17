---
title: "Use an existing cache"
slug: "using-a-cache.html"
---

## Before you start

Install [Nix and Cachix](/installation.html#installation).

## Authenticate for a private cache

:::note
For read access to private caches you’ll also need to run `cachix authtoken XXX` or export CACHIX_AUTH_TOKEN=xxx
before invoking `cachix use` in order to configure [access token](/glossary.html#term-access-token),
to be used for authenticating using netrc file.
:::

## Configure Nix

With [Nix and Cachix installed](/installation.html#installation) invoke:

```console
$ cachix use mycache
```

to configure Nix to use your binary cache.

There are different ways to configure Nix so Cachix will
pick [the most appropriate one](/configuring-a-cache.html#configuring-nix) for your setup.

## Verify a cache hit

<!-- TODO: Build the same project with the same inputs on a compatible machine where the output is missing. Include the Nix log line that identifies the cache it was downloaded from. -->
