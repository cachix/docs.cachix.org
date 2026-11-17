---
title: "FAQ"
description: "FAQ"
slug: "faq.html"
---

<span id="frequently-asked-questions" class="legacy-anchor"></span>

## First step for any problem: run `cachix doctor` {#first-step-for-any-problem-run-cachix-doctor}

See [Using the CLI](/cli.html#first-step-for-any-problem-run-cachix-doctor).

If `cachix doctor` reports everything is healthy and you still see a problem, continue with the
questions below.

## What Nix versions are supported? {#what-nix-versions-are-supported}

We test against the current stable Nix release and the most recent NixOS release branches.
In practice this means Nix 2.18 (the long-term-support series) or newer.
Older Nix versions may still work, but are not actively tested and security fixes will not be backported for them.

## Does pushing a store path override an existing entry? {#does-pushing-a-store-path-override-an-existing-entry}

No. The existing entry first needs to be deleted.

## Are entries immediately available after they are pushed? {#are-entries-immediately-available-after-they-are-pushed}

Yes. See the next questions what might happen to seem otherwise.

## Why is Nix not picking up on any of the pre-built artifacts? {#why-is-nix-not-picking-up-on-any-of-the-pre-built-artifacts}

For example, given that `/nix/store/spznih45c56kfwygx8qyq1skd1rs4zv1-myproject-1.0.0` is missing,
check if store path exists in the binary cache:

```console
$ curl https://MY_CACHE.cachix.org/spznih45c56kfwygx8qyq1skd1rs4zv1.narinfo
```

Replace `MY_CACHE` with your cache name in the examples on this page.

If the entry exists:

> 1. It is possible that you need to restart `nix-daemon` to pick up `nix.conf` changes. Run `sudo pkill nix-daemon`.
> 2. If you ran `nix-build` before binary cache has been populated,
>    Nix will maintain a negative cache for the entry.
>
>    [See a workaround to remove negative caching](https://nix.dev/guides/troubleshooting.html#how-to-force-nix-to-re-check-if-something-exists-in-the-binary-cache).
> 3. Substitution could be disabled for that derivation via `allowSubstitutes = false;` attribute.
> 4. On NixOS, it’s [a known limitation](https://github.com/cachix/cachix/issues/323)
>    that you first need to add cachix configuration and run `nixos-rebuild switch` and only after the
>    next run of `nixos-rebuild switch` binary caches would be used.

If the entry does not exist:

> 1. Check if the entry that you expected has a different hash.
>
>    You can compare the difference between two derivations via `nix-shell -p nix-diff --run "nix-diff drv1 drv"`.
>
>    In order to have both derivations available locally you can run `nix-instantiate default.nix | cachix push MY_CACHE`
>    to push the derivation into Cachix and then run `nix-store -r /nix/store/hash.drv` to retrieve it on another machine.
>
>    Common reason for derivation hash differences are [described in language anti-patterns](https://nix.dev/recipes/best-practices#reproducible-source-paths).
> 2. Maybe `cachix push` got interrupted and the whole dependency tree is not available from Cachix.
>    In that case push again to make sure everything is uploaded.
> 3. If your cache has `cache.nixos.org` configured as an upstream, Cachix can skip uploading paths already available there.
>    Nix needs that substituter to download them.
>    See [Upstreams](/upstreams.html).

## Is there a way to cache `nix-shell`? {#is-there-a-way-to-cache-nix-shell}

Many of CI integrations will push everything that was built during the CI run.
Otherwise you can do the following.

Make sure shell dependencies are built:

```console
$ nix-shell --run "echo OK"
```

Push to cachix:

```console
$ nix-store --query --references $(nix-instantiate shell.nix) | xargs nix-store --realise | xargs nix-store --query --requisites | cachix push MY_CACHE
```

## How to disable binary caches when working offline? {#how-to-disable-binary-caches-when-working-offline}

Pass `--option substitute false` to Nix commands.

<span id="cachix-use-effects" class="legacy-anchor"></span>

## What happens when I run cachix use (both immediately and any stateful effects for the future)? {#what-happens-when-i-run-cachix-use-both-immediately-and-any-stateful-effects-for-the-future}

See [Configuring Nix](/configuring-a-cache.html#configuring-nix).

## I get `InvalidPath` error from Nix when invoking Cachix {#i-get-invalidpath-error-from-nix-when-invoking-cachix}

There are two cases under which the error is raised:

- Garbage Collection kicks in while Cachix is trying to push a path.
  To confirm if that’s the case, check if GC timestamps correlate with when the error was raised
- Store paths weren’t built yet. Some Nix commands return store paths that would exist if Nix has built them.

## warning: ‘`https://MY_CACHE.cachix.org`’ does not appear to be a binary cache {#warning-https-mycache-cachix-org-does-not-appear-to-be-a-binary-cache}

Two causes:

1. You have mistyped the binary cache name
2. You didn’t set correct auth token via `netrc` for a private binary cache.
   Open `https://MY_CACHE.cachix.org` with your cache name for instructions.

## How can I check if my auth token works? {#how-can-i-check-if-my-auth-token-works}

For API authentication tokens:

```console
$ curl -v -H "Authorization: Bearer ${CACHIX_AUTH_TOKEN}" https://app.cachix.org/api/v1/user
```

For cache authentication tokens:

```console
$ curl -s --netrc-file ~/.config/nix/netrc https://MY_CACHE.cachix.org/nix-cache-info
```

## How do I supply a custom CA certificate? {#how-do-i-supply-a-custom-ca-certificate}

See [Custom CA certificates](/cli.html#how-do-i-supply-a-custom-ca-certificate).
