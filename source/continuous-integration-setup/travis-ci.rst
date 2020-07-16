Travis CI
=========

1. Create new binary cache on https://app.cachix.org and generate a signing key
2. Replace ``mycache`` in following ``.travis.yml``:

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
  - nix path-info --all > /tmp/store-path-pre-build
  script:
  - nix-build
  - nix-shell --run "echo nix-shell successfully entered"
  after_success:
  - comm -13 <(sort /tmp/store-path-pre-build | grep -v '\.drv$') <(nix path-info --all | grep -v '\.drv$' | sort) | cachix push $CACHIX_CACHE

3. Inside your project top-level directory run:

.. code:: shell-session

  nix-shell -p travis --run "travis login --pro --auto"
  nix-shell -p travis --run "travis encrypt CACHIX_SIGNING_KEY=XXX --add"
  
4. If you're using a private cache, export ``$CACHIX_AUTH_TOKEN`` and 
   call ``cachix authtoken $CACHIX_AUTH_TOKEN` just before ``cachix use``.