---
title: "Pins"
description: "Protect important store paths from garbage collection and expose files with Cachix pins and artifacts."
slug: "pins.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="pins" class="legacy-anchor"></span>

<span id="overview" class="legacy-anchor"></span>

Pins are a feature in Cachix that let you assign a persistent name to a store path.

Pinned paths are immune from [garbage collection](/garbage-collection.html#garbage-collection) by default and their retention can be individually controlled.

Pins are useful for:

- Protecting important store paths, like releases and long-lived dependencies, from [garbage collection](/garbage-collection.html#garbage-collection).
- Exposing files from within a store path.
- Controlling the retention of certain store paths.

## How to create a pin {#how-to-create-a-pin}

For a project that builds with `nix-build`, the following commands publish a release and name it `stable`.
Replace `MY_CACHE` with your destination cache.

```console
$ nix-build
$ cachix push MY_CACHE ./result
$ cachix pin MY_CACHE stable ./result --keep-revisions 3
$ cachix pins get MY_CACHE stable
```

Reuse the name `stable` for the next release to keep its three most recent revisions.
Open the **Pins** tab in your cache’s dashboard to view or manage them.

## Roots and dependency closures

The store path you pin is the **root** of a revision.
Its **closure** includes the root and every store path reachable through its references.
For example, pinning an application protects the application, the library it loads, and the libraries that library needs.
A compiler used only at build time falls outside this closure.

For a project with a `default.nix`, build the release and list its closure.

```console
$ nix-build
$ nix-store --query --requisites ./result
```

Each retained revision protects its closure.
If two releases use the same library, expiring the older revision still leaves the library protected by the newer one.

## Controlling retention {#controlling-retention-with-pins}

Pins maintain a history of revisions for each pin name.
A new revision is created every time a store path is pinned with the same name.
A new pin keeps all revisions indefinitely by default.
Adding a revision without a retention option preserves the pin’s current policy.
To set a policy, choose one of these options:

- `--keep-days N`: Each revision expires N days after it was created, including the latest revision. Cachix deletes the pin when no revisions remain.
- `--keep-revisions N`: Keep the latest N revisions. These revisions do not expire with time.

To create a pin that expires after 3 days:

```bash
$ cachix pin MY_CACHE v1.0 /nix/store/xxx-name-1.0 --keep-days 3
```

If you add no more revisions to `v1.0`, Cachix deletes the pin when the background expiry job runs after those 3 days. If you add another revision with the same name, that revision has its own 3-day lifetime. The pin remains until all its revisions have expired.

Expiry removes the pin's protection from [garbage collection](/garbage-collection.html#garbage-collection).
A later collection can remove the paths once their last pin expires.

Clearing a cache preserves pinned content.
To remove protection for every revision in the cache, use **Delete all pins** in the cache settings.
Unprotected paths then become eligible for collection.

## Getting pin information {#getting-pin-information}

Use `cachix pins get` to retrieve a pin's metadata and latest revision.
The command uses the existing pin listing API and selects the exact pin name
locally. It does not require a server upgrade.

```bash
$ cachix pins get MY_CACHE 'mypin:1.0.0'
$ cachix pins get MY_CACHE 'mypin:1.0.0' --json
```

The JSON output is one object with `name`, `createdOn`, `keep`, and
`lastRevision`. The latest revision contains `storePath`, `revision`, `createdOn`,
`artifacts`, and `orphaned`.

Pin names are literal. For example, `mypin:1.0.0` is a pin name, not a revision
selector. Public caches allow anonymous reads. Private caches require a token
with read access. A missing pin produces a nonzero exit status.

If `orphaned` is `true`, the cache no longer has the store path metadata for that
revision. Its `storePath` lacks the name suffix and its artifact links are unavailable.

## Exposing files with artifacts {#exposing-files-with-artifacts}

Pins allow you to expose and serve certain files from within a store path. Multiple artifacts can be added with the `--artifact` option when creating a new pin.

```bash
$ cachix pin MY_CACHE v1.0 /nix/store/xxx-name-1.0 --artifact etc/nginx.conf --artifact bin/name
```

## Pins and upstreams

When you create a pin, Cachix retains any required paths found in your cache’s [direct Cachix upstreams](/upstreams.html#limitations), including the root path if it is missing from your cache.
If a required path is missing from both the cache and its upstreams, pin creation fails without changing the existing pin.

The retained paths count toward your cache’s pinned storage and remain available if the source cache is removed or garbage collected.
You do not need to upload those paths again.

Dependencies supplied by `cache.nixos.org` remain external and are not retained in your cache.
Your cache must have `cache.nixos.org` configured as an upstream, and clients must be able to download those dependencies from it.
The root path must exist in your cache or a direct Cachix upstream.

## Examples {#examples}

In the following commands, we pin the `go-1.7` and `go-1.8` store paths:

```bash
$ cachix pin MY_CACHE go-1.7 /nix/store/nd3ssg3hiqj6ivvkv2n5q7ppdwh0wqcf-go-1.7
$ cachix pin MY_CACHE go-1.8 /nix/store/canq1nwdhxk4d2yj8pgywz7lqhkpyq2d-go-1.8
```
