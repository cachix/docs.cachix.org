.. _running-simple-agent:

Simple Nix profile
******************

To run the agent you'll need previously generated ``AGENT-TOKEN`` and pick an ``AGENT-NAME``.

``NIX-PROFILE-NAME`` is optional and defaults to NixOS.

::

  $ CACHIX_AGENT_TOKEN=AGENT-TOKEN cachix deploy agent AGENT-NAME [NIX-PROFILE-NAME]

For example::

  $ CACHIX_AGENT_TOKEN=... cachix deploy agent myagentname

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.
