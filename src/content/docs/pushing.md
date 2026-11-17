---
title: "Pushing to Cachix"
description: "There are different ways to push store paths to Cachix."
slug: "pushing.html"
---

<span id="pushing" class="legacy-anchor"></span>

<span id="pushing-to-cachix" class="legacy-anchor"></span>

There are different ways to push store paths to Cachix.

Replace `MY_CACHE` with your cache name in the examples below.

## Store paths and closures

A build output can refer to other paths in the Nix store.
Together, the output and everything reachable through those references form its runtime closure.
`cachix push` takes a store path or a symlink such as `./result`, walks that closure, and uploads the paths missing from the cache and its [upstreams](/upstreams.html).

## Choose what to push

### Pushing runtime dependencies {#pushing-runtime-dependencies}

```console
$ nix-build | cachix push MY_CACHE
```

### Pushing build and runtime dependencies {#pushing-build-and-runtime-dependencies}

```console
$ nix-store -qR --include-outputs $(nix-store -qd $(nix-build)) \
  | grep -v '\.drv$' \
  | cachix push MY_CACHE
```

### Pushing shell environment {#pushing-shell-environment}

```console
$ nix-build shell.nix -A inputDerivation \
  | cachix push MY_CACHE
```

### Pushing whole /nix/store {#pushing-whole-nix-store}

```console
$ nix path-info --all | cachix push MY_CACHE
```

## Flakes {#flakes}

Assuming [you’re familiar with Flakes](https://nix.dev/concepts/flakes).

### Pushing flake inputs {#pushing-flake-inputs}

As flake inputs are downloaded from the internet, they can disappear.
Copying them over to Cachix saves you from that day.

```console
$ nix flake archive --json \
  | jq -r '.path,(.inputs|to_entries[].value.path)' \
  | cachix push MY_CACHE
```

### Pushing runtime closure {#pushing-runtime-closure}

To push runtime closure of the default package in a Flake:

```console
$ nix build --no-link --print-out-paths \
  | cachix push MY_CACHE
```

To push runtime closure of any set of packages in a Flake:

```console
$ nix build --no-link --print-out-paths .#package-a .#package-b \
  | cachix push MY_CACHE
```

Note: to build all packages, leave a thumbs up on [NixOS/nix#7165](https://github.com/NixOS/nix/issues/7165).

### Pushing shell environment {#id1}

```console
$ nix develop --profile dev-profile -c true
$ cachix push MY_CACHE dev-profile
```

## Automatic uploads

Use `watch-store` to watch the store continuously or `watch-exec` to limit observation to the duration of a command.

### Pushing all newly built store paths {#pushing-all-newly-built-store-paths}

```console
$ cachix watch-store MY_CACHE
```

### Push all store paths produced during a command {#push-all-store-paths-produced-during-a-command}

```console
$ cachix watch-exec MY_CACHE -- nix-build --max-jobs 4
```

### Daemon {#daemon}

[Daemon command reference](/cli.html#daemon)

### Continuous integration

[Cache builds in CI](/continuous-integration-setup/index.html)
