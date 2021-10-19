GitLab CI
=========

1. `Create a new binary cache <https://app.cachix.org>`_ and generate an :term:`access token` or :term:`signing key`.

2. Replace ``mycache`` in the following ``.gitlab-ci.yml`` with your own cache name:

.. code:: yaml

    image: nixos/nix:2.3.12

    build:
      before_script:
        - nix-env -iA nixpkgs.cachix nixpkgs.bash
        - cachix use mycache
        - nix path-info --all > /tmp/store-path-pre-build
      script:
        - nix-build default.nix
      after_script:
        # push all store paths that were added during the build
        - bash -c "comm -13 <(sort /tmp/store-path-pre-build | grep -v '\.drv$') <(nix path-info --all | grep -v '\.drv$' | sort) | cachix push mycache"


3. Follow `variables configuration tutorial <https://docs.gitlab.com/ee/ci/variables/#creating-a-custom-environment-variable>`_
   to export ``$CACHIX_SIGNING_KEY`` and  (needed if the cache is private).

4. If you're using a private cache, export ``$CACHIX_AUTH_TOKEN`` and
   call ``cachix authtoken $CACHIX_AUTH_TOKEN` just before ``cachix use``.
