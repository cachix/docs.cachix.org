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
      }
    }

``agents`` key contains an object of many ``agent-name`` keys and :term:`store path` values to deploy.

``agent-name`` is usually a hostname, but it can be any name, as long as it's unique.
if no such ``agent-name`` is registered with Cachix, HTTP error 400 will be raised.

``top-level-store-path`` can be any store path. The agent will detect NixOS, nix-darwin and home-manager store paths and activate them.