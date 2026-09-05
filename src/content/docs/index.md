---
title: "Welcome to Cachix documentation"
description: "Cachix is a service for Nix binary cache hosting."
slug: ""
---

<span id="welcome-to-cachix-documentation" class="legacy-anchor"></span>

[Cachix](https://cachix.org) is a service for [Nix](https://nixos.org/) [binary cache](/glossary.html#term-binary-cache) hosting.

New to Cachix? Read [What is a Binary Cache?](/what-is-a-binary-cache.html) for a conceptual overview, then follow [Getting Started](/getting-started.html) to create and use your first cache.

Feedback can be reported via [a public github issue](https://github.com/cachix/feedback/issues),
live chat on [app.cachix.org](https://app.cachix.org)
or at [support@cachix.org](mailto:support%40cachix.org).

## Get started

- [What is a Binary Cache?](/what-is-a-binary-cache.html)
  - [Without a binary cache](/what-is-a-binary-cache.html#without-a-binary-cache)
  - [How a binary cache helps](/what-is-a-binary-cache.html#how-a-binary-cache-helps)
  - [The default binary cache](/what-is-a-binary-cache.html#the-default-binary-cache)
  - [Where Cachix fits in](/what-is-a-binary-cache.html#where-cachix-fits-in)
- [Installation](/installation.html)
  - [Recommended](/installation.html#recommended)
  - [Flakes](/installation.html#flakes)
  - [Using Nixpkgs or NixOS](/installation.html#using-nixpkgs-or-nixos)
- [Getting Started](/getting-started.html)
  - [Creating the cache](/getting-started.html#creating-the-cache)
  - [Authenticating](/getting-started.html#authenticating)
  - [Signing key (advanced)](/getting-started.html#signing-key-advanced)
  - [Pushing binaries with Cachix](/getting-started.html#pushing-binaries-with-cachix)
  - [Using binaries with Nix](/getting-started.html#using-binaries-with-nix)

## Guides

- [Pushing to Cachix](/pushing.html)
  - [Pushing runtime dependencies](/pushing.html#pushing-runtime-dependencies)
  - [Pushing build and runtime dependencies](/pushing.html#pushing-build-and-runtime-dependencies)
  - [Pushing shell environment](/pushing.html#pushing-shell-environment)
  - [Pushing whole /nix/store](/pushing.html#pushing-whole-nix-store)
  - [Pushing all newly built store paths](/pushing.html#pushing-all-newly-built-store-paths)
  - [Push all store paths produced during a command](/pushing.html#push-all-store-paths-produced-during-a-command)
  - [Flakes](/pushing.html#flakes)
- [Getting Started With Continuous Integration](/continuous-integration-setup/index.html)
  - [GitHub Actions (recommended)](/continuous-integration-setup/github-actions.html)
  - [Buildkite](/continuous-integration-setup/buildkite.html)
  - [CircleCI](/continuous-integration-setup/circleci.html)
  - [GitLab CI](/continuous-integration-setup/gitlab.html)
  - [Hercules CI](/continuous-integration-setup/hercules-ci.html)
  - [Hydra](/continuous-integration-setup/hydra.html)
  - [Travis CI](/continuous-integration-setup/travis-ci.html)
- [Pins](/pins.html)
  - [Overview](/pins.html#overview)
  - [How to Create a Pin](/pins.html#how-to-create-a-pin)
  - [Controlling Retention with Pins](/pins.html#controlling-retention-with-pins)
  - [Exposing Files with Artifacts](/pins.html#exposing-files-with-artifacts)
  - [Examples](/pins.html#examples)
- [Garbage Collection](/garbage-collection.html)
  - [Deletion algorithm](/garbage-collection.html#deletion-algorithm)
- [Importing from S3](/importing-from-s3.html)
  - [Overview](/importing-from-s3.html#overview)
  - [Prerequisites](/importing-from-s3.html#prerequisites)
  - [Importing Cache from S3](/importing-from-s3.html#importing-cache-from-s3)
  - [Important Notes](/importing-from-s3.html#important-notes)

## Explanation

- [Security](/security.html)
  - [Login using GitHub](/security.html#login-using-github)
  - [Secrets](/security.html#secrets)
  - [Binary Caches](/security.html#binary-caches)

## Reference

- [Frequently Asked Questions](/faq.html)
  - [First step for any problem: run `cachix doctor`](/faq.html#first-step-for-any-problem-run-cachix-doctor)
  - [What Nix versions are supported?](/faq.html#what-nix-versions-are-supported)
  - [Does pushing a store path override an existing entry?](/faq.html#does-pushing-a-store-path-override-an-existing-entry)
  - [Are entries immediately available after they are pushed?](/faq.html#are-entries-immediately-available-after-they-are-pushed)
  - [Why is Nix not picking up on any of the pre-built artifacts?](/faq.html#why-is-nix-not-picking-up-on-any-of-the-pre-built-artifacts)
  - [Is there a way to cache `nix-shell`?](/faq.html#is-there-a-way-to-cache-nix-shell)
  - [How to disable binary caches when working offline?](/faq.html#how-to-disable-binary-caches-when-working-offline)
  - [What happens when I run cachix use (both immediately and any stateful effects for the future)?](/faq.html#what-happens-when-i-run-cachix-use-both-immediately-and-any-stateful-effects-for-the-future)
  - [I get `InvalidPath` error from Nix when invoking Cachix](/faq.html#i-get-invalidpath-error-from-nix-when-invoking-cachix)
  - [warning: ‘https://mycache.cachix.org’ does not appear to be a binary cache](/faq.html#warning-https-mycache-cachix-org-does-not-appear-to-be-a-binary-cache)
  - [How can I check if my auth token works?](/faq.html#how-can-i-check-if-my-auth-token-works)
  - [How do I supply a custom CA certificate?](/faq.html#how-do-i-supply-a-custom-ca-certificate)
- [Glossary](/glossary.html)

## Products

- [Cachix Deploy](/deploy/index.html)
  - [Running an agent](/deploy/running-an-agent/index.html)
  - [Deploying to agents](/deploy/deploying-to-agents/index.html)
  - [Troubleshooting](/deploy/troubleshooting.html)
  - [Reference](/deploy/reference.html)
- [Enterprise](/enterprise/index.html)
  - [Telemetry](/enterprise/telemetry.html)
