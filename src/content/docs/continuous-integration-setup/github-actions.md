---
title: "GitHub Actions (recommended)"
description: "Configure cachix-action, authentication, and automatic uploads in GitHub Actions."
slug: "continuous-integration-setup/github-actions.html"
---

<span id="github-actions-recommended" class="legacy-anchor"></span>

<!-- TODO: Describe when Nix downloads missing outputs during a build and when the action uploads new outputs in each push mode. -->

During a build, Nix queries the configured caches for missing outputs.
In the default daemon mode, the action queues uploads as Nix finishes building paths.
In store scan mode, the action checks for paths added during the job and pushes them at the end.
See [Push modes](#push-modes).

## Examples

<!-- TODO: Add a complete job that installs Nix, configures cachix-action with the cache name and a write token from GitHub secrets, then runs the project's build command. -->

For a repository with a flake that defines a default package, save this workflow as `.github/workflows/build.yml`.
Replace `MY_CACHE` with your cache name and add a repository secret named `CACHIX_AUTH_TOKEN` containing a write token for that cache.

```yaml
name: Build
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: cachix/install-nix-action@v31
      - uses: cachix/cachix-action@v17
        with:
          name: MY_CACHE
          authToken: ${{ secrets.CACHIX_AUTH_TOKEN }}
      - run: nix build
```

### Read-only cache

```yaml
- uses: cachix/cachix-action@v17
  with:
    name: MY_CACHE
```

### Write cache with auth token

```yaml
- uses: cachix/cachix-action@v17
  with:
    name: MY_CACHE
    authToken: "${{ secrets.CACHIX_AUTH_TOKEN }}"
```

### Write cache with signing key

```yaml
- uses: cachix/cachix-action@v17
  with:
    name: MY_CACHE
    authToken: "${{ secrets.CACHIX_AUTH_TOKEN }}"
    signingKey: "${{ secrets.CACHIX_SIGNING_KEY }}"
```

## Options

### Cache Configuration

| Input            | Description                                                                     | Required | Default |
| ---------------- | ------------------------------------------------------------------------------- | -------- | ------- |
| `name`           | Name of the Cachix cache to pull (substitute) from and optionally push to       | ✓        |         |
| `extraPullNames` | Comma-separated list of additional Cachix cache names to pull (substitute) from |          |         |

### Authentication

| Input        | Description                                                                                        | Required | Default |
| ------------ | -------------------------------------------------------------------------------------------------- | -------- | ------- |
| `authToken`  | Authentication token for Cachix, required for private cache access or to push to any cache         |          |         |
| `signingKey` | Private signing key for self-signed caches, used in addition to the auth token to sign store paths |          |         |

### Push Configuration

| Input         | Description                                                                                                                                                                                                                  | Required | Default |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `skipPush`    | Set to `true` to only pull from the cache without pushing any build results                                                                                                                                                  |          | `false` |
| `useDaemon`   | Use Cachix daemon mode to push store paths as they're built via post-build hooks. See [Push modes](#push-modes) for more information                                                                                         |          | `true`  |
| `pathsToPush` | Whitespace-separated list of specific store paths to push. Leave empty to push all build results                                                                                                                             |          |         |
| `pushFilter`  | Regular expression to exclude derivations from being pushed, for example `"(-source$ \| nixpkgs\.tar\.gz$)"`. Ignored if `pathsToPush` is set. Warning: paths may still be pushed if they are part of another path's closure |          |

### Advanced Options

| Input                   | Description                                                                                             | Required | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `skipAddingSubstituter` | Set to `true` to skip adding the cache as a Nix substituter                                             |          | `false` |
| `cachixArgs`            | Additional command-line arguments to pass to Cachix commands. Defaults to `-j8` for parallel processing |          |         |
| `cachixBin`             | Custom path to the Cachix binary if not using the default installation                                  |          |         |
| `installCommand`        | Custom command to install Cachix instead of the default installation method                             |          |         |

## Push modes

The action can push in two modes: daemon mode with post-build hooks and store scan.
This can be controlled with the `useDaemon` option.
See [Automatic uploads](/pushing.html#automatic-uploads) for the CLI workflow.

### Daemon mode (default)

The daemon registers a [post-build hook](https://nixos.org/manual/nix/stable/command-ref/conf-file.html#conf-post-build-hook) with Nix.
Newly built store paths are pushed to the cache as they're built.
The limitation is that Nix does not trigger the hook for substituted paths.

:::note
Post-build hooks may be run as root if the nix-daemon is root.
This can lead to unexpected privilege escalation if you run untrusted code.
For common CI scenarios (hosted GitHub Actions), this is typically not an issue, but you should evaluate the risks for your infrastructure.

Follow https://github.com/NixOS/nix/issues/5208 for updates on non-root nix-daemon support.
:::

### Store scan mode

The store scan method looks for differences in the store at the file system level.
It will capture all store paths, including those substituted.

:::note
This is not a safe method for multi-user stores.
You can inadvertently upload and leak store paths built by other users.
Prefer the daemon mode in such cases.
:::

## Security

Cachix tokens and signing keys provide full read and/or write access to your caches.

[GitHub Actions allows](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#accessing-your-secrets) anyone who can edit workflow files to read secrets.

This means developers with write access can read your secrets and access your cache.

Forked pull requests cannot access secrets, so they can only read from public caches.

Malicious code merged from forks can reveal your tokens.

## Further reading

- [cachix-action source](https://github.com/cachix/cachix-action)
- [Continuous Integration with GitHub Actions on nix.dev](https://nix.dev/tutorials/nixos/continuous-integration-github-actions)
