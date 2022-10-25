Buildkite
=========

1. Create new binary cache on https://app.cachix.org/cache and generate a write auth token.

2. Follow `buildkite storing secrets in environment hooks <https://buildkite.com/docs/pipelines/secrets#exporting-secrets-with-environment-hooks>`_
   tutorial to set ``$CACHIX_AUTH_TOKEN``.

3. Replace ``mycache`` in the following ``.buildkite/pipeline.yml``:

.. code:: yaml

    env:
      CACHE_NAME: mycache

    steps:
    - label: Set up Cachix
        commands:
        - nix-env -iA nixpkgs.cachix
        - cachix use $CACHE_NAME
    - wait
    - label: Build
        commands:
        - cachix watch-exec $CACHE_NAME nix-build
        - cachix watch-exec $CACHE_NAME nix-shell --run "echo nix-shell successfully entered"
