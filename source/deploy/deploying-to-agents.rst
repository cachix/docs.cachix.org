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

NixOS
*****

The following deploys NixOS to the agent named ``myagent`` in a file named ``deploy.nix``:

.. code-block:: nix 
        
    let
      pkgs = import <nixpkgs> {};
    in pkgs.writeText "cachix-deploy.json" (builtins.toJSON {
      agents = {
        myagent = (pkgs.nixos {
          fileSystems."/" = { device = "/dev/disk/by-label/nixos"; };
          boot.loader.grub.devices = ["/dev/sda"];
          boot.loader.grub.enable = true;
          networking.hostName = "myagent";
        }).toplevel;
      };
    })

To fully grasp the JSON specification see :ref:`the reference <deploy-json>`.


nix-darwin
**********

The following deploys nix-darwin to the agent named ``myagent`` in a file named ``flake.nix``:

.. code-block:: nix 

  {

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-21.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/master";
    darwin.url = "github:LnL7/nix-darwin";
    darwin.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, darwin, nixpkgs, nixpkgs-unstable }:
    let
      pkgs = import nixpkgs { system = "aarch64-darwin"; };
      unstable-pkgs = import nixpkgs-unstable { system = "aarch64-darwin"; };
      systems = nixpkgs.lib.platforms.darwin;
    in {
      defaultPackage = forAllSystems (system: 
        pkgs.writeText "cachix-agents.json" (builtins.toJSON {
          agents = {
            myagent = (darwin.lib.darwinSystem {
              system = "aarch64-darwin";
              modules = [ 
                (darwin + "/pkgs/darwin-installer/installer.nix") 
                ({ pkgs, ... }:

                  {
                    environment.systemPackages = [ 
                      pkgs.vim
                    ];

                    networking.hostName = "myagent";
                    
                    services.cachix-agent.enable = true;
                    # needed until 21.11 has cachix 0.7.0
                    services.cachix-agent.package = unstable-pkgs.cachix;

                    # Auto upgrade nix package and the daemon service.
                    services.nix-daemon.enable = true;
                    nix.package = pkgs.nix;
                  })
              ];
            }).system;
          };
        })
      );
    };
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

    spec=$(nix-build deploy.nix)
    cachix push mycache $spec
    cachix deploy activate $spec