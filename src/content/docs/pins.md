---
title: "Pins"
description: "Protect important store paths from garbage collection and expose files with Cachix pins and artifacts."
slug: "pins.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="pins" class="legacy-anchor"></span>

Added in version 1.5.

## Overview {#overview}

Pins are a feature in Cachix that let you assign a persistent name to a store path.

Pinned paths are immune from [garbage collection](/garbage-collection.html#garbage-collection) by default and their retention can be individually controlled.

Pins are useful for:

- Protecting important store paths, like releases and long-lived dependencies, from [garbage collection](/garbage-collection.html#garbage-collection).
- Exposing files from within a store path.
- Controlling the retention of certain store paths.

## Roots and dependency closures

<!-- TODO: Use a release output to show which runtime dependencies its pin protects and how long that protection lasts. -->

## Pins and upstreams

[Upstream caches](/upstreams.html#retain-content-from-upstreams)

## How to Create a Pin {#how-to-create-a-pin}

1. **Choose a name for your pin** - This could be anything, but we recommend choosing something meaningful, like the tool’s name, version, git revision, or some combination of them all. For example, `v1.7`.
2. **Pin a store path in a cache** - Use the `cachix pin` command followed by the name of your cache, your chosen pin name, and the store path you want to pin.

```bash
$ cachix pin mycache v1.0 /nix/store/xxx-name-1.0
```

Current pins can be viewed and managed from your cache’s dashboard at `https://app.cachix.org/cache/mycache/pins`.

## Getting Pin Information {#getting-pin-information}

Use `cachix pins get` to retrieve a pin's metadata and latest revision.
The command uses the existing pin listing API and selects the exact pin name
locally. It does not require a server upgrade.

```bash
$ cachix pins get mycache 'mypin:1.0.0'
$ cachix pins get mycache 'mypin:1.0.0' --json
```

The JSON output is one object with `name`, `createdOn`, `keep`, and
`lastRevision`. The latest revision contains `storePath`, `revision`, `createdOn`,
`artifacts`, and `orphaned`.

Pin names are literal. For example, `mypin:1.0.0` is a pin name, not a revision
selector. Public caches allow anonymous reads. Private caches require a token
with read access. A missing pin produces a nonzero exit status.

If `orphaned` is `true`, the cache no longer has the store path metadata for that
revision. Its `storePath` lacks the name suffix and its artifact links are unavailable.

## Controlling Retention with Pins {#controlling-retention-with-pins}

Pins maintain a history of revisions for each pin name. A new revision is created every time a store path is pinned with the same name.
All revisions are kept indefinitely by default. Use one of these retention policies:

- `--keep-days N`: Each revision expires N days after it was created, including the latest revision. Cachix deletes the pin when no revisions remain.
- `--keep-revisions N`: Keep the latest N revisions. These revisions do not expire with time.

To create a pin that expires after 3 days:

```bash
$ cachix pin mycache v1.0 /nix/store/xxx-name-1.0 --keep-days 3
```

If you add no more revisions to `v1.0`, Cachix deletes the pin when the background expiry job runs after those 3 days. If you add another revision with the same name, that revision has its own 3-day lifetime. The pin remains until all its revisions have expired.

Expiry removes the pin's protection from [garbage collection](/garbage-collection.html#garbage-collection). It does not immediately delete the store paths or their files. Paths protected by another pin remain protected.

## Exposing Files with Artifacts {#exposing-files-with-artifacts}

Pins allow you to expose and serve certain files from within a store path. Multiple artifacts can be added with the `--artifact` option when creating a new pin.

```bash
$ cachix pin mycache v1.0 /nix/store/xxx-name-1.0 --artifact etc/nginx.conf --artifact bin/name
```

## Examples {#examples}

In the following commands, we pin the `go-1.7` and `go-1.8` store paths:

```bash
$ cachix pin mycache go-1.7 /nix/store/nd3ssg3hiqj6ivvkv2n5q7ppdwh0wqcf-go-1.7
$ cachix pin mycache go-1.8 /nix/store/canq1nwdhxk4d2yj8pgywz7lqhkpyq2d-go-1.8
```
