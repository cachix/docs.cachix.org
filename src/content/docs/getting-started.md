---
title: "Getting Started"
description: "With Nix and Cachix installed you can cache any Nix build result."
slug: "getting-started.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="getting-started" class="legacy-anchor"></span>

## Creating the cache {#creating-the-cache}

With [Nix and Cachix installed](/installation.html#installation)
you can cache any Nix build result.

After logging into [Cachix](https://app.cachix.org)
you’ll be able to create a new binary cache.

### Organizing your caches {#organizing-your-caches}

Create separate caches based on **who has write access** and **who needs read access**.
Most teams use a **public cache** for open source projects and a **private cache** for proprietary software.
See [Security](/security.html) for details on access control.

Common patterns:

- **One cache per team or organization**: all members push to and pull from the same cache. Simple to manage, works well when everyone trusts each other.
- **Separate caches per project**: useful when different projects have different contributors or access requirements.
- **Separate caches for CI and development**: CI pushes to a shared cache, while experimental or local builds go into a different one to avoid polluting the main cache.

Choose a descriptive name for your cache (e.g. `myorg`, `myorg-private`, `myproject`) since the name appears in your Nix configuration and is visible to anyone using it.

## Authenticating {#authenticating}

There are two kinds of auth tokens:

1. Personal

   > These allow full access to your account and can be generated [here](https://app.cachix.org/personal-auth-tokens).
2. Per-cache

   > These allow write and/or read access to only a specific binary cache.
   > On [dashboard](https://app.cachix.org) you can
   > click on your newly generated binary cache Settings and
   > generate a new [access token](/glossary.html#term-access-token).
   >
   > You can set the auth token with either:
   >
   > 1. `$ cachix authtoken XXX`
   > 2. `$ export CACHIX_AUTH_TOKEN=XXX`

:::tip
Run `cachix doctor` to verify your configuration and authentication are set up correctly.
:::

## Signing key (advanced) {#signing-key-advanced}

:::note
If you didn’t opt in to using a self-generated signing key when creating the cache, you can skip this step.
:::

Store paths in Nix are signed with public-key encryption to prevent tampering.
By default, Cachix will manage the entire signing process for you. This is what we recommend for most users.

Advanced users can opt in to use their own signing key when creating a new cache. The signing key can be securely generated and stored on your machine.
The Cachix CLI will then sign the store paths locally, adding a extra layer of protection against Man-In-The-Middle and cache poisoning attacks.

[Read our blog post on the pros and cons of using a self-generated signing key.](https://blog.cachix.org/posts/2020-11-09-write-access-control-for-binary-caches/)

To generate a new [signing key](/glossary.html#term-signing-key):

```console
$ cachix authtoken <my auth token>
$ cachix generate-keypair <mycache>
```

The [signing key](/glossary.html#term-signing-key) is generated locally on your computer and is printed out to stdout.
This is the only copy, so make sure to create a backup.

Cachix will automatically pick up the recently written signing key (or if you export it via environment variable `$CACHIX_SIGNING_KEY`).

## Pushing binaries with Cachix {#pushing-binaries-with-cachix}

Assuming you have a project with `default.nix` you can build it and push:

```console
$ nix-build | cachix push mycache
```

It’s recommended to set up [Continuous Integration to push](/continuous-integration-setup/index.html#getting-started-ci) for every branch of every project.

See [all different ways of pushing](/pushing.html#pushing).

## Using binaries with Nix {#using-binaries-with-nix}

:::note
For read access to private caches you’ll also need to run `cachix authtoken XXX` or export CACHIX_AUTH_TOKEN=xxx
before invoking `cachix use` in order to configure [access token](/glossary.html#term-access-token),
to be used for authenticating using netrc file.
:::

With [Nix and Cachix installed](/installation.html#installation) invoke:

```console
$ cachix use mycache
```

to configure Nix to use your binary cache.

There are different ways to configure Nix so Cachix will
pick [the most appropriate one](/faq.html#cachix-use-effects) for your setup.
