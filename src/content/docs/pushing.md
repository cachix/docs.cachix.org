---
title: "Pushing to Cachix"
description: "There are different ways to push store paths to Cachix."
slug: "pushing.html"
---

<span id="pushing" class="legacy-anchor"></span>

<span id="pushing-to-cachix" class="legacy-anchor"></span>

There are different ways to push store paths to Cachix.

These instructions assume your binary cache is called `mycache`.

## Pushing runtime dependencies {#pushing-runtime-dependencies}

```console
$ nix-build | cachix push mycache
```

## Pushing build and runtime dependencies {#pushing-build-and-runtime-dependencies}

```console
$ nix-store -qR --include-outputs $(nix-store -qd $(nix-build)) \
  | grep -v '\.drv$' \
  | cachix push mycache
```

## Pushing shell environment {#pushing-shell-environment}

```console
$ nix-build shell.nix -A inputDerivation \
  | cachix push mycache
```

## Pushing whole /nix/store {#pushing-whole-nix-store}

```console
$ nix path-info --all | cachix push mycache
```

## Pushing all newly built store paths {#pushing-all-newly-built-store-paths}

```console
$ cachix watch-store mycache
```

## Push all store paths produced during a command {#push-all-store-paths-produced-during-a-command}

```console
$ cachix watch-exec mycache -- nix-build --max-jobs 4
```

## Flakes {#flakes}

Assuming [you’re familiar with Flakes](https://nix.dev/concepts/flakes).

### Pushing flake inputs {#pushing-flake-inputs}

As flake inputs are downloaded from the internet, they can disappear.
Copying them over to Cachix saves you from that day.

```console
$ nix flake archive --json \
  | jq -r '.path,(.inputs|to_entries[].value.path)' \
  | cachix push mycache
```

### Pushing runtime closure {#pushing-runtime-closure}

To push runtime closure of the default package in a Flake:

```console
$ nix build --no-link --print-out-paths \
  | cachix push mycache
```

To push runtime closure of any set of packages in a Flake:

```console
$ nix build --no-link --print-out-paths .#package-a .#package-b \
  | cachix push mycache
```

Note: to build all packages, leave a thumbs up on [NixOS/nix#7165](https://github.com/NixOS/nix/issues/7165).

### Pushing shell environment {#id1}

```console
$ nix develop --profile dev-profile -c true
$ cachix push mycache dev-profile
```
