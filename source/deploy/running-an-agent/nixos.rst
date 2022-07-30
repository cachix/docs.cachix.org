.. _running-nixos-agent:

NixOS
*****

You'll first need to populate ``/etc/cachix-agent.token`` with the previously 
generated agent token with the contents:``CACHIX_AGENT_TOKEN=XXX``.

Then set the following NixOS options:

::

    services.cachix-agent.enable = true;

    # agent name is inferred from the hostname
    networking.hostName = "myhostname";

And run ``nixos-rebuild switch`` to activate the new configuration that will start the agent.

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.

