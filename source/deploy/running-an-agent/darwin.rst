.. _running-darwin-agent:

nix-darwin
**********

You'll need to first install Nix::

  curl -L https://nixos.org/nix/install | sh

Then exit your terminal and start it again, so that the Nix environment loads.

Next you need to install Cachix::

  nix-env -iA cachix -f https://cachix.org/api/v1/install

Then with :ref:`the previously generated token <generate-agent-token>`::

  CACHIX_AGENT_TOKEN=... cachix deploy agent myagent

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.

