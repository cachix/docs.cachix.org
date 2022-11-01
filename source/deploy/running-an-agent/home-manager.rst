.. _running-home-manager-agent:

Home Manager
************

First, you'll need to have a Nix installation::

  sh <(curl -L https://nixos.org/nix/install) --daemon

Then exit your terminal and start it again, so that the Nix environment loads.

Next you need to get access to the ``cachix`` tool. This can be done using ``nix-shell``::

  nix-shell -I cachix=https://cachix.org/api/v1/install -p '(import <cachix> {}).cachix'

Then with :ref:`the previously generated token <generate-agent-token>`::

  CACHIX_AGENT_TOKEN=... cachix deploy agent myagent

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.
