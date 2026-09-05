---
title: "Buildkite"
description: "Create new binary cache on https://app.cachix.org/cache and generate a write auth token."
slug: "continuous-integration-setup/buildkite.html"
---

<span id="buildkite" class="legacy-anchor"></span>

1. Create new binary cache on <https://app.cachix.org/cache> and generate a write auth token.
2. Follow [buildkite storing secrets in environment hooks](https://buildkite.com/docs/pipelines/secrets#without-a-secrets-storage-service-exporting-secrets-with-environment-hooks)
   tutorial to set `$CACHIX_AUTH_TOKEN`.
3. Replace `mycache` in the following `.buildkite/pipeline.yml`:

```yaml
env:
  CACHE_NAME: mycache

steps:
  - label: "Set up Cachix"
    commands:
      - nix-env -iA nixpkgs.cachix
      - cachix use $CACHE_NAME
  - wait
  - label: "Build"
    commands:
      - cachix watch-exec $CACHE_NAME nix-build
      - cachix watch-exec $CACHE_NAME -- nix-shell --run "echo nix-shell successfully entered"
```
