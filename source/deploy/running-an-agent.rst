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

  $ CACHIX_AGENT_TOKEN=... cachix deploy agent virtualbox

You should see an agent appear `at your workspace <https://app.cachix.org/deploy/>`_


NixOS
*****

This section will be added before Xmas.


nix-darwin 
**********

Support for nix-darwin will be added until Xmas.


home-manager
************

Support for nix-darwin will be added until Xmas.