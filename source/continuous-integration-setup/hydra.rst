Hydra
=====

.. source https://github.com/tbenst/nix-data-hydra/pull/2/files#diff-3367727976c111f36e7d3210944788ba

There are two options for pushing data to cachix after builds: Configure Hydra with a static or dynamic [`RunCommand`](https://github.com/NixOS/hydra/blob/master/doc/manual/src/plugins/RunCommand.md) script, or configure a global `post-build-hook` in Nix.

Either way, you need to create binary cache on https://app.cachix.org and generate a auth token and/or signing key. Then, create a secret file ``/etc/cachix/cachix.dhall`` on all machines with the following contents::

    { authToken = "XXX" -- this one is needed only for private caches
    , binaryCaches =
        [ { name = "mycache"
          , secretKey = "XXX-SIGNING_KEY"
          }
        ]
    }


RunCommand
----------

Add the following to your hydra configuration (assuming Hydra is configured with the NixOS module):

.. code:: nix

    services.hydra.extraConfig = ''
      <runcommand>
        job = home:mybuild:*
        command = ${pkgs.writeShellApplication {
        name = "upload-to-cachix";
        runtimeInputs = [pkgs.jq pkgs.cachix];
        text = ''
          set -xeu
          jq -r '.outputs[].path' "$HYDRA_JSON" | xargs cachix --config ${config.age.secrets.hydra-ci.path} push mycache
        '';
      }}/bin/upload-to-cachix
      </runcommand>
    ''

This script runs after every Hydra build job.

post-build-hook
---------------

You'll need to deploy all build machines with a `post build hook <https://nixos.org/manual/nix/stable/advanced-topics/post-build-hook.html>`_. 

Assuming Hydra is deployed with NixOS, here's a NixOS module to configure Cachix:

.. code:: nix

    { pkgs, config }:

    let
      upload_to_cachix = pkgs.writeScriptBin "upload-to-cachix" ''
        #!/bin/sh
        set -eu
        set -f # disable globbing

        # skip push if the declarative job spec
        OUT_END=$(echo ''${OUT_PATHS: -10})
        if [ "$OUT_END" == "-spec.json" ]; then
        exit 0
        fi

        export HOME=/root
        exec ${pkgs.cachix}/bin/cachix -c /etc/cachix/cachix.dhall push mycache $OUT_PATHS > /tmp/hydra_cachix 2>&1
      '';
    in {
      nix.extraOptions = ''
        builders-use-substitutes = true
        post-build-hook = ${upload_to_cachix}/bin/upload-to-cachix
      '';
    }

