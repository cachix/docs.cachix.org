---
title: "Use an existing cache"
slug: "using-a-cache.html"
---

## Before you start

Install [Nix and Cachix](/installation.html#installation).

## Authenticate for a private cache

:::note
For read access to private caches you’ll also need to run `cachix authtoken XXX` or export CACHIX_AUTH_TOKEN=xxx before invoking `cachix use` in order to configure [access token](/glossary.html#term-access-token), to be used for authenticating using netrc file.
:::

## Configure Nix

With [Nix and Cachix installed](/installation.html#installation) invoke:

```console
$ cachix use MY_CACHE
```

Replace `MY_CACHE` with your cache name to configure Nix to use your binary cache.

There are different ways to configure Nix so Cachix will pick [the most appropriate one](/configuring-a-cache.html#configuring-nix) for your setup.

## Verify a cache hit

<!-- TODO: Build the same project with the same inputs on a compatible machine where the output is missing. Include the Nix log line that identifies the cache it was downloaded from. -->

On a second machine with the same system type, configure the cache as above.
Choose a machine whose Nix store does not already contain the output.
Check out the same project revision and use the same Nix inputs as the original build.

For a project with a `default.nix`, run `nix-build`.
Look for a line like this in the build log, with your output path and cache name:

```text
copying path '/nix/store/…-myproject-1.0' from 'https://MY_CACHE.cachix.org'...
```

If Nix builds the output locally, compare its store path with the one you pushed.
See [Troubleshooting cache misses](/faq.html#why-is-nix-not-picking-up-on-any-of-the-pre-built-artifacts).
