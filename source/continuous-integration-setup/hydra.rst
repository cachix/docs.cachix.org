Hydra
=====

.. source https://github.com/tbenst/nix-data-hydra/pull/2/files#diff-3367727976c111f36e7d3210944788ba

You'll need to deploy all build machines with a `post build hook <https://nixos.org/nix/manual/#chap-post-build-hook>`_. 

1. Create new binary cache on https://app.cachix.org and generate a signing key

2. Assuming Hydra is deployed with NixOS, here's a NixOS module to configure Cachix:

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

3. Make sure to create a secret file ``/etc/cachix/cachix.dhall`` on all machines with the following contents::

    { authToken = "XXX" -- this one is needed only for private caches
    , binaryCaches =
        [ { name = "mycache"
          , secretKey = "XXX-SIGNING_KEY"
          }
        ]
    }

4. Replace ``mycache`` in above files with name of your new binary cache