.. _pushing:

Pushing to Cachix
=================

There are different ways to push store paths to Cachix.

These instructions assume your binary cache is called ``mycache``.


Pushing runtime dependencies
----------------------------

.. code:: shell-session

  $ nix-build | cachix push mycache


Pushing build and runtime dependencies
--------------------------------------

.. code:: shell-session

  $ nix-store -qR --include-outputs $(nix-store -qd $(nix-build)) \
    | grep -v '\.drv$' \
    | cachix push mycache


Pushing shell environment
-------------------------

.. code:: shell-session

  $ nix-build shell.nix -A inputDerivation \
    | cachix push mycache


Pushing whole /nix/store
------------------------

.. code:: shell-session

  $ nix path-info --all | cachix push mycache


Pushing all newly built store paths
-----------------------------------

.. code:: shell-session

  $ cachix watch-store mycache


Push all store paths produced during a command
----------------------------------------------

.. code:: shell-session

  $ cachix watch-exec mycache -- nix-build --max-jobs 4


Flakes
------

Assuming `you're familiar with experimental Flakes support <https://www.tweag.io/blog/2020-05-25-flakes/>`_.


Pushing flake inputs
********************

As flake inputs are downloaded from the internet, they can disappear.
Copying them over to Cachix saves you from that day.

.. code:: shell-session

  $ nix flake archive --json \
    | jq -r '.path,(.inputs|to_entries[].value.path)' \
    | cachix push mycache


Pushing runtime closure
***********************

To push runtime closure of the default package in a Flake:

.. code:: shell-session

  $ nix build --json \
    | jq -r '.[].outputs | to_entries[].value' \
    | cachix push mycache

Note: to build all packages, leave a thumbs up on [#7165](https://github.com/NixOS/nix/issues/7165) issue.

Pushing shell environment
*************************

.. code:: shell-session

  $ nix develop --profile dev-profile -c true
  $ cachix push mycache dev-profile
