Travis CI
=========

1. Create new binary cache on https://app.cachix.org/cache and generate a write auth token.

2. Replace ``mycache`` in the following ``.travis.yml``:

.. code:: yaml

  language: nix
  nix: 2.3.7
  sudo: false
  env:
    global:
    - CACHIX_CACHE=mycache
  install:
  - echo "trusted-users = $USER" | sudo tee -a /etc/nix/nix.conf
  - sudo systemctl restart nix-daemon
  - nix-env -iA nixpkgs.cachix
  - cachix use $CACHIX_CACHE
  script:
  - cachix watch-exec $CACHIX_NAME nix-build
  - cachix watch-exec $CACHIX_NAME -- nix-shell --run "echo nix-shell successfully entered"

3. Inside your project top-level directory run:

.. code:: shell-session

  nix-shell -p travis --run "travis login --pro --auto"
  nix-shell -p travis --run "travis encrypt CACHIX_AUTH_TOKEN=XXX --add"
  