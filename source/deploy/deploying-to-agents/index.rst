.. _deploying-to-agents:

Deploying to agents
===================

Prerequisites
-------------

Start by :ref:`getting your agent running <running-an-agent>`.


Get Deploy Activate Auth Token
------------------------------


1. Click **"Start a Deployment"** `on your workspace <https://app.cachix.org/deploy/>`_ 
2. Write the description of the token, for an example "github actions CD"
3. Click **"Generate"**
4. Copy the token and save it


Write Deploy specification 
--------------------------

Depending on what are you deploying to an agent, here are some examples:

NixOS
*****

The following deploys NixOS to the agent named ``myagent`` in a file named ``flake.nix``:

.. code-block:: nix 

  {

    inputs = {
      nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
      cachix-deploy-flake.url = "github:cachix/cachix-deploy-flake";
      flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = { self, nixpkgs, flake-utils, cachix-deploy-flake }:
      flake-utils.lib.eachDefaultSystem (
        system: {
          defaultPackage = let
            pkgs = import nixpkgs { inherit system; };
            cachix-deploy-lib = cachix-deploy-flake.lib pkgs;
          in
            cachix-deploy-lib.spec {
              agents = {
                myagent = cachix-deploy-lib.nixos {
                  fileSystems."/" = { device = "/dev/disk/by-label/nixos"; };
                  boot.loader.grub.devices = [ "/dev/sda" ];
                  boot.loader.grub.enable = true;
                  networking.hostName = "myagent";
                };
              };
            };
        }
      );
  }


To fully grasp the JSON specification see :ref:`the reference <deploy-json>`.


nix-darwin
**********

The following deploys nix-darwin to the agent named ``myagent`` in a file named ``flake.nix``:

.. code-block:: nix 

  {

    inputs = {
      nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
      flake-utils.url = "github:numtide/flake-utils";
      cachix-deploy-flake.url = "github:cachix/cachix-deploy-flake";
      cachix-deploy-flake.inputs.darwin.follows = "darwin";
      darwin.url = "github:LnL7/nix-darwin";
      darwin.inputs.nixpkgs.follows = "nixpkgs";
    };

    outputs = { self, flake-utils, darwin, nixpkgs, cachix-deploy-flake }:
      flake-utils.lib.eachDefaultSystem (
        system: {
          defaultPackage = let
            pkgs = import nixpkgs { inherit system; };
            cachix-deploy-lib = cachix-deploy-flake.lib pkgs;
          in
            cachix-deploy-lib.spec {
              agents = {
                myagent = cachix-deploy-lib.darwin (
                  { pkgs, ... }:
                    {
                      networking.hostName = "myagent";

                      services.cachix-agent.enable = true;

                      # Auto upgrade nix package and the daemon service.
                      services.nix-daemon.enable = true;
                      nix.package = pkgs.nix;
                    }
                );
              };
            };
        }
      );
  }


Simple Nix Profile
******************


.. code-block:: nix 

  {

    inputs = {
      nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
      flake-utils.url = "github:numtide/flake-utils";
      cachix-deploy-flake.url = "github:cachix/cachix-deploy-flake";
    };

    outputs = { self, flake-utils, nixpkgs, cachix-deploy-flake }:
      flake-utils.lib.eachDefaultSystem (
        system: {
          defaultPackage = let
            pkgs = import nixpkgs { inherit system; };
            cachix-deploy-lib = cachix-deploy-flake.lib pkgs;
          in
            cachix-deploy-lib.spec {
              agents = {
                myagent = pkgs.git;
              };
            };
        }
      );
  }


Home Manager
************

The following deploys a standalone Home Manager to the agent named
``myagent`` in a file named ``flake.nix``:

.. code-block:: nix

  {
    inputs = {
      nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
      flake-utils.url = "github:numtide/flake-utils";
      cachix-deploy-flake.url = "github:cachix/cachix-deploy-flake";
      cachix-deploy-flake.inputs.home-manager.follows = "home-manager";
      home-manager.url = "github:nix-community/home-manager";
      home-manager.inputs.nixpkgs.follows = "nixpkgs";
    };

    outputs = { self, flake-utils, home-manager, nixpkgs, cachix-deploy-flake }:
      flake-utils.lib.eachDefaultSystem (
        system: {
          defaultPackage = let
            pkgs = nixpkgs.legacyPackages."${system}";
            cachix-deploy-lib = cachix-deploy-flake.lib pkgs;
          in
            cachix-deploy-lib.spec {
              agents = {
                myagent = cachix-deploy-lib.homeManager { } (
                  { pkgs, ... }:
                    {
                      home.username = "jdoe";
                      home.homeDirectory = "/home/jdoe";
                      home.stateVersion = "22.05";

                      services.cachix-agent = {
                        enable = true;
                        name = "myagent";
                      };
                    }
                );
              };
            };
        }
      );
  }


Activate the deployment 
-----------------------

Assuming you've created a binary cache called ``mycache``:

- you have a write token to replace ``CACHE-TOKEN`` 
- previously generated token to replace ``ACTIVATE-TOKEN``.

The following snippet will build your machine, push binaries to ``mycache``
and deploy your agent:

:: 
        
    export CACHIX_ACTIVATE_TOKEN=ACTIVATE-TOKEN
    export CACHIX_AUTH_TOKEN=CACHE-TOKEN

    spec=$(nix build --print-out-paths)
    cachix push mycache $spec
    cachix deploy activate $spec
