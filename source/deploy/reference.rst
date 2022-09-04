Reference
=========

.. _deploy-json:

deploy.json
-----------

::

    {
      "agents": { 
        "<agent-name>": "<top-level-store-path>", 
        ... 
      },
      "rollbackScript": {
        "<system>": "<store-path-to-a-rollback-script>",
      }
    }

``agents`` key contains an object of many ``agent-name`` keys and :term:`store path` values to deploy.

``agent-name`` is usually a hostname, but it can be any name, as long as it's unique.
If no ``agent-name`` is registered with Cachix, HTTP error 400 will be raised.

``top-level-store-path`` can be any store path. The agent will detect NixOS, nix-darwin and home-manager store paths and activate them.

``rollbackScript`` is an optional collection of per-system store path scripts that are run after each deployment. 
Use it to perform tests, validate the deployment, and, if necessary, trigger a rollback.

``system`` is a Nix system string, e.g. ``x86_64-linux`` or ``x86_64-darwin``.

``store-path-to-a-rollback-script`` is a :term:`store path` to a script that is run after each deployment. 
If it returns with a non-zero exit code, the deployment is rolled back.