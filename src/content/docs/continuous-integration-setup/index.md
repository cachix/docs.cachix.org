---
title: "Caching builds in CI"
description: "Configure Cachix in your CI jobs so builds can be reused in later runs."
slug: "continuous-integration-setup/index.html"
---

<span id="getting-started-ci" class="legacy-anchor"></span>

<span id="getting-started-with-continuous-integration" class="legacy-anchor"></span>

Cachix lets your CI jobs reuse Nix builds from earlier runs. Before building a package, Nix checks the configured caches for its output. When a job builds something new, it can upload the result so later jobs and your teammates can download it.

You can use the same cache across branches. Nix uses store paths to identify which outputs a build needs, so each job can reuse matching dependencies without needing a separate cache for its branch.

## Choose your CI platform

On GitHub Actions, [cachix-action](/continuous-integration-setup/github-actions.html) configures cache access and handles uploads for you. The other guides show how to fit Cachix into your platform's build jobs.

| Platform | Integration |
| --- | --- |
| [GitHub Actions](/continuous-integration-setup/github-actions.html) | Use `cachix-action` to configure the cache and upload builds automatically. |
| [Buildkite](/continuous-integration-setup/buildkite.html) | Configure Cachix in your pipeline and wrap build commands with `cachix watch-exec`. |
| [CircleCI](/continuous-integration-setup/circleci.html) | Set up cache access in your job and upload builds with `cachix watch-exec`. |
| [GitLab CI](/continuous-integration-setup/gitlab.html) | Configure a Nix build job with Cachix and a token stored in CI variables. |
| [Hercules CI](/continuous-integration-setup/hercules-ci.html) | Follow the cache configuration instructions for Hercules CI. |
| [Hydra](/continuous-integration-setup/hydra.html) | Upload build outputs from your build machines with a post-build hook. |
| [Travis CI](/continuous-integration-setup/travis-ci.html) | Configure Cachix in a Nix job and upload builds with `cachix watch-exec`. |

The steps below explain the workflow these integrations follow. You can also use them to set up a platform that isn't listed here.

## Configure cache access

Start with a cache your job can write to. If you don't have one yet, follow [Make your first push](/getting-started.html) to create it. For a custom CI setup, install [Nix and Cachix](/installation.html) on the runner.

Create a [per-cache access token](/configuring-a-cache.html#authenticating) with write access and store it in your CI platform's secret settings. For a private cache, include read access so Nix can also download dependencies. For CLI commands, expose it as `CACHIX_AUTH_TOKEN`. On GitHub Actions, pass the secret through the action's `authToken` input instead.

Public caches allow downloads without a token. A job that only downloads from a private cache needs read access. Give write credentials only to jobs whose code you trust; jobs without them can still use a public cache.

Configure Nix to read from the cache before the build starts. These examples use `mycache` as the cache name:

```console
$ cachix use mycache
```

`cachix-action` handles this configuration for GitHub Actions. For details on private cache access, see [Use an existing cache](/using-a-cache.html).

## Build and upload

For a project with a `default.nix`, build the output and push it to your cache:

```console
$ nix-build
$ cachix push mycache ./result
```

This uploads the result and its runtime dependencies. If you want to upload paths produced throughout a build command, use:

```console
$ cachix watch-exec mycache -- nix-build
```

Choose the approach that fits your job. When using `cachix-action`, the action already handles automatic uploads, so you can keep your normal build command.

See [Pushing to Cachix](/pushing.html) for flake examples and ways to cache development environments.

## Verify reuse in a later run

Run the same build on a fresh runner with the cache configured. Check the Nix logs for downloads from your cache in place of the corresponding build steps.

Repeating a build on a runner that still has the output in its local Nix store doesn't test the cache: Nix can use that local copy without downloading anything. Use the same project revision and Nix inputs when checking a second run, since changed inputs can require a new build.

If an expected output is rebuilt, follow the [cache troubleshooting steps](/faq.html#why-is-nix-not-picking-up-on-any-of-the-pre-built-artifacts). Your teammates can use the results too by [configuring the cache on their machines](/using-a-cache.html).

## Keep release builds available

Builds uploaded by CI are subject to [garbage collection](/garbage-collection.html). For releases you need to keep available, [create a pin](/pins.html) after uploading the build.
