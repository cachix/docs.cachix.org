Buildkite
=========

1. Create new binary cache on https://app.cachix.org and generate a signing key

2. Replace ``mycache`` occourances in following ``.buildkite/pipeline.yml``:

.. code:: yaml

    env:
      CACHE_NAME: mycache

    steps:
    - label: Set up Cachix
        commands:
        - nix-env -iA nixpkgs.cachix
        - cachix use $CACHIX_NAME
        - nix path-info --all > /tmp/store-path-pre-build
    - wait
    - label: Build
        commands:
        - nix-build
        - nix-shell --run "echo nix-shell successfully entered"
    - wait
    - label: Push to Cachix
        commands:
        - comm -13 <(sort /tmp/store-path-pre-build | grep -v '\.drv$') <(nix path-info --all | grep -v '\.drv$' | sort) | cachix push $CACHIX_NAME

3. Follow `buildkite storing secrets in environment hooks <https://buildkite.com/docs/pipelines/secrets#storing-secrets-in-environment-hooks>`_
   tutorial to set ``$CACHIX_SIGNING_KEY``.

4. If you're using a private cache, export ``$CACHIX_AUTH_TOKEN`` and 
   call ``cachix authtoken $CACHIX_AUTH_TOKEN` just before ``cachix use``.