Getting Started
===============

Creating the cache
------------------

With :ref:`Nix and Cachix installed <installation>`
you can cache any Nix build result.

After logging into `Cachix <https://app.cachix.org>`_
you'll be able to create a new binary cache.

It's recommended to setup new binary caches **per trust model**,
depending on who are the users that will have write access and
the same for read access.

Most teams will have one private and one public cache.

Public caches have read access open to everyone.

If you'd like to keep your **binaries protected from public access**,
make sure to create a private cache. 


Authenticating
--------------

There are two kinds of auth tokens:

a) Personal

    These allow full access to your account and can be generated `here <https://app.cachix.org/personal-auth-tokens>`_.

b) Per-cache

    These allow write and/or read access to only a specific binary cache. 
    On `dashboard <https://app.cachix.org>`_ you can
    click on your newly generated binary cache `Settings` and
    generate new term:`access token`.

    You can set auth token either with:

    a) ``$ cachix authtoken XXX``

    b) ``$ export CACHIX_AUTH_TOKEN=XXX``


Signing key (optional)
----------------------

.. note:: `All binary caches created until 2020-11-09 are using self-generated signing key. <https://blog.cachix.org/posts/2020-11-09-write-access-control-for-binary-caches/>`

When creating a binary cache you can opt-in to handle the :term:`signing key` yourself.
In case you picked to manage your binary cache with auth tokens only, you can skip this step.

Using an auth token you can generate a :term:`signing key`::

    $ cachix generate-keypair mycache

:term:`Signing key <signing key>` is saved locally on your computer and printed
to stdout, make sure to make a backup.

Using the recently written signing key (or by exporting it via environment variable ``$CACHIX_SIGNING_KEY``) 


Pushing binaries with Cachix
----------------------------

Assuming you have a project with ``default.nix`` you can start pushing::

    $ nix-build | cachix push mycache

It's recommended to set up :ref:`Continuous Integration to push <getting-started-ci>` for every branch of every project.

See :ref:`all differents ways of pushing <pushing>`.





Using binaries with Nix
-----------------------

.. note:: 
  
  For read access to private caches you'll also need to run ``cachix authtoken XXX`` or export `$CACHIX_AUTH_TOKEN`
  before invoking ``cachix use`` in order to configure :term:`access token`,
  to be used for authenticating using netrc file.

With :ref:`Nix and Cachix installed <installation>` invoke::

    $ cachix use mycache

to configure Nix to use your binary cache.

There are different ways to configure Nix so Cachix will
pick :ref:`the most appropriate one <cachix-use-effects>` for your setup.
