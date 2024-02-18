GitLab CI
=========

1. Create new binary cache on https://app.cachix.org/cache and generate a write auth token.

2. Replace ``mycache`` in the following ``.gitlab-ci.yml`` with your cache name:

.. code:: yaml

    image: docker.nix-community.org/nixpkgs/cachix-flakes

    build:
      variables:
        CACHIX_CACHE_NAME: mycache
      before_script:
        - cachix use "$CACHIX_CACHE_NAME"
      script:
        - cachix watch-exec $CACHIX_CACHE_NAME -- nix-build default.nix


3. Follow `variables configuration tutorial <https://docs.gitlab.com/ee/ci/variables/#creating-a-custom-environment-variable>`_
   to export ``$CACHIX_AUTH_TOKEN``.
