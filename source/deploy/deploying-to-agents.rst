Deploying to agents
===================

Prerequisites
-------------

Start by :ref:`running your agent <running-an-agent>`.


Get Deploy Activate auth token 
------------------------------


1. Click **"Start a Deployment"** `in your workspace <https://app.cachix.org/deploy/>`_ 
2. Write the description of the token, for example "github actions CD"
3. Click **"Generate"**
4. Copy the token


Write Nix 
---------

The following deploys NixOS to the agent named ``virtualbox`` and assumes the agent is running inside Virtualbox.

To understand the JSON specification see :ref:`the reference <deploy-json>`.

.. code-block:: nix 
        
    let
      pkgs = import <nixpkgs> {};
    in pkgs.writeText "cachix-deploy.json" (builtins.toJSON {
      agents = {
        virtualbox = (pkgs.nixos {
          fileSystems."/" = { device = "/dev/disk/by-label/nixos"; };
          boot.loader.grub.devices = ["/dev/sda"];
          boot.loader.grub.enable = true;
          networking.hostName = "virtualbox";
          environment.systemPackages =  [ pkgs.git pkgs.vim ];
          networking.interfaces.enp0s3.useDHCP = true;
          virtualisation.virtualbox.guest.enable = true;
        }).toplevel;
      };
    })


Activate the deployment 
-----------------------

Assuming you've created a binary cache called ``mycache``, you
have a write token to replace ``CACHE-TOKEN`` and 
recently generated token to replace ``ACTIVATE-TOKEN``.

The following snippet will build your machine, push binaries to ``mycache``
and deploy your agent. 

:: 
        
    export CACHIX_ACTIVATE_TOKEN=ACTIVATE-TOKEN
    export CACHIX_AUTH_TOKEN=CACHE-TOKEN

    spec=$(nix-build deploy.nix)
    cachix push mycache $spec
    cachix deploy activate $spec