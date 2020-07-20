Getting Started
===============

Creating the cache
------------------

After logging into `Cachix <https://app.cachix.org>`_
you'll be able to create a new cache.

It's recommended to setup a binary cache per trust model,
depending on who are the users that will have write access and
the same for read access.

Most teams will have one private and one public cache.

If you'd like to keep the **binaries protected with a token
make sure to create a private cache**. 

Public caches have read access open to everyone.


Pushing binaries
----------------

With :ref:`Nix and Cachix installed <installation>`
you can cache any Nix build.

On `dashboard <https://app.cachix.org>`_ you can
click on your newly generated binary cache and
in step three, generate new personal term:`access token`.

Using the access token you can generate a :term:`signing key`::

    $ cachix authtoken XXX
    $ cachix generate-keypair mycache

:term:`Signing key <signing key>` is saved locally on your computer and printed
to stdout, make sure to make a backup.

Using the recently written signing key (or by exporting it via environment variable ``$CACHIX_SIGNING_KEY``) you can start pushing::

    $ nix-build | cachix push mycache

It's recommended to use Continuous Integration to push for every branch of every project.
See :ref:`getting-started-ci`.


Using binaries
--------------

.. note:: 
  
  For private caches you'll also need to run ``cachix authtoken XXX``
  before invoking ``cachix use`` in order to configure :term:`access token`,
  to be used for authenticating using netrc file.

With :ref:`Nix and Cachix installed <installation>` invoke::

    $ cachix use mycache

to configure Nix to use your binary cache.

There are different ways to configure Nix so Cachix will
pick the most appropriate one for your setup.

