CircleCI
========

1. Create new binary cache on https://app.cachix.org and generate a signing key
2. Replace ``mycache`` in following ``.circleci/config.yml``:

.. code:: yaml

  version: 2.1

  workflows:
    version: 2
    workflow:
      jobs:
        - build

  jobs:
    build:
      docker:
        - image: nixos/nix:latest
          environment:
            CACHIX_NAME: mycache
      steps:
        - checkout
        - run:
            name: Set up Cachix
            command: |
              nix-env -iA nixpkgs.cachix nixpkgs.bash
              cachix use $CACHIX_NAME
              nix path-info --all > /tmp/store-path-pre-build
        - run: nix-build
        - run: nix-shell --run "echo nix-shell successfully entered"
        - run: 
            name: Push to Cachix
            command: |
              bash -c "comm -13 <(sort /tmp/store-path-pre-build | grep -v '\.drv$') <(nix path-info --all | grep -v '\.drv$' | sort) | cachix push $CACHIX_NAME"

3. Follow `circleci documentation to setup environment variable <https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project>`_  using ``$CACHIX_SIGNING_KEY``.

4. If you're using a private cache, export ``$CACHIX_AUTH_TOKEN`` and 
   call ``cachix authtoken $CACHIX_AUTH_TOKEN` just before ``cachix use``.