.. _installation:

Installation
============


Recommended
-----------

With `Nix installed <https://nix.dev/tutorials/install-nix.html>`_::

    $ nix-env -iA cachix -f https://cachix.org/api/v1/install

Flakes
------

    $ nix profile install --accept-flake-config nixpkgs#cachix

Using Nixpkgs or NixOS
----------------------

Using ``pkgs.cachix`` attribute will install the latest stable version.

