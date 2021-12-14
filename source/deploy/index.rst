.. _cachix-deploy:
    
Cachix Deploy 
=============

`Cachix Deploy <https://app.cachix.org/deploy/>`_ uses pull architecture to do continuous binary deployments.

It has first-class support for NixOS, nix-darwin and home-manager. 

- ``cachix deploy agent`` manages a lifecycle of any Nix profile.

- ``cachix deploy activate`` declaratively specifies what to deploy to a workspace, a group of agents.

.. toctree::
   :maxdepth: 3
   :glob:

   running-an-agent.rst 
   deploying-to-agents.rst 
   reference.rst
