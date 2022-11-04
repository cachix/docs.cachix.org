CircleCI
========

1. Create new binary cache on https://app.cachix.org/cache and generate a write auth token.

2. Follow `circleci documentation to setup environment variable <https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project>`_  to set ``$CACHIX_AUTH_TOKEN``.

2. Replace ``mycache`` in the following ``.circleci/config.yml``:

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
        - image: nixos/nix:2.3.12
          environment:
            CACHIX_NAME: mycache
      steps:
        - checkout
        - run:
            name: Set up Cachix
            command: |
              nix-env -iA nixpkgs.cachix nixpkgs.bash
              cachix use $CACHIX_NAME
        - run: cachix watch-exec $CACHIX_NAME nix-build
        - run: cachix watch-exec $CACHIX_NAME nix-shell --run "echo nix-shell successfully entered"
