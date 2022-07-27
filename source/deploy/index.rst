.. _cachix-deploy:
    
Cachix Deploy 
=============

.. note:: 
   
   Cachix Deploy is in public beta. This means you won't be charged for usage
   and the design might change, but with a documented migration path.
        

`Cachix Deploy <https://app.cachix.org/deploy/>`_ provides continuous deployments to a Nix profile 
(like NixOS, nix-darwin or home-manager) using a binary cache.

It consists of running a simple agent process ``cachix deploy agent`` that listens for a new deployment
and executes them. There's no Nix evaluation or building done on the agent. The
agent pulls all dependencies from your binary cache and activates the new profile. 

To start new deployments you run ``cachix deploy activate`` with a specification
of what each agent should deploy.


.. toctree::
   :maxdepth: 2
   :glob:

   running-an-agent/index.rst
   deploying-to-agents/index.rst
   reference.rst
