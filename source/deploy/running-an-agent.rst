.. _running-an-agent:

Running an agent
================


Prerequisites
-------------

.. You need to :ref:`install at least version 0.7.0 of cachix command line client <installation>`.

For the beta you install Cachix client from the ``master`` branch::

    $ nix-env -if https://github.com/cachix/cachix/tarball/master --substituters 'https://cache.nixos.org https://cachix.cachix.org' --trusted-public-keys 'cachix.cachix.org-1:eWNHQldwUO7G2VkjpnjDbWwy4KQ/HNxht7H4SSoMckM= cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY='


Create a binary cache 
---------------------

The agent requires a binary cache to download the closure it wants to activate.

You can `create a binary cache <https://app.cachix.org/cache/>`_ with Cachix and
the your agents will automatically use it.

Alternatively, you can roll your own binary cache.


Create a workspace
------------------

.. note :: As part of the beta, you can create only one workspace.

Workspace is a set of agents you can deploy to. 

Start by `creating a workspace <https://app.cachix.org/deploy/>`_.


Generate agent token
--------------------

Once you have a workspace, you can generate an agent token.

1. Click **"Add an Agent"** `at your workspace <https://app.cachix.org/deploy/>`_ 
2. Write the description of the token, for an example "my homelab agents token"
3. Click **"Generate"**
4. Copy the token and save it


Starting an agent
-----------------

Manually
********

To run the agent you'll need previously generated ``AGENT-TOKEN`` and pick an ``AGENT-NAME``.

``NIX-PROFILE-NAME`` is optional and defaults to NixOS.

::

  $ CACHIX_AGENT_TOKEN=AGENT-TOKEN cachix deploy agent AGENT-NAME [NIX-PROFILE-NAME]

For example::

  $ CACHIX_AGENT_TOKEN=... cachix deploy agent myagentname

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.

NixOS
*****

You'll first need to populate ``/etc/cachix-agent.token`` with the previously 
generated agent token in the form of ``CACHIX_AGENT_TOKEN=XXX``.

Then set the following NixOS options:

::

    cachix-agent.enable = true;
    networking.hostName = "myhostname";

And run ``nixos-rebuild switch`` to activate the new configuration that will start the agent.

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.

.. _nix-darwin-run-agent:

nix-darwin
**********

You'll need to first install Nix::

  curl -L https://nixos.org/nix/install | sh

Then exit your terminal and start it again, so that the Nix environment loads.

Next you need to install Cachix::

  nix-env -iA cachix -f https://cachix.org/api/v1/install

Then with :ref:`the previously generated token <nix-darwin-run-agent>`::

  CACHIX_AGENT_TOKEN=... cachix deploy agent myagent

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_.

Continue by :ref:`making your first deployment for your agent <deploying-to-agents>`.


home-manager
************

Please leave a comment on `this issue <https://github.com/cachix/cachix/issues/TODO>`_
if you'd like home-manager support.