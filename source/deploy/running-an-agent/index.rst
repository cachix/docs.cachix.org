.. _running-an-agent:

Running an agent
================

Prerequisites
-------------

You need to :ref:`install at least version 0.8.0 of cachix command line client <installation>`.


Create a binary cache 
---------------------

The agent requires a binary cache to download the closure it wants to activate.

You can `create a binary cache <https://app.cachix.org/cache/>`_ with Cachix and
the your agents will automatically use it.

Alternatively, you can roll your own binary cache, but some of the features won't be available.


Create a workspace
------------------

.. note :: As part of the public beta, you can create only one workspace.

Workspace is a set of agents you can deploy to. 

Start by `creating a workspace <https://app.cachix.org/deploy/>`_.

.. _generate-agent-token:

Generate agent token
--------------------

Once you have a workspace, you can generate an agent token.

1. Click **"Add an Agent"** `at your workspace <https://app.cachix.org/deploy/>`_ 
2. Write the description of the token, for an example "my homelab agents token"
3. Click **"Generate"**
4. Copy the token and save it


Starting an agent
-----------------

Choose your target Nix profile:

.. toctree::
   :maxdepth: 3
   :glob:

   manually.rst
   nixos.rst
   darwin.rst
   home-manager.rst
