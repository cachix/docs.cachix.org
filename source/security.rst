Security
========

Login using GitHub
------------------

For private caches, read-only access to GitHub organizations is needed
and due to the way oauth works that's requested at initial login.

Cachix will use organizations access only to read organization/team members
and outside collaborators.

If you'd like to deny access to specific organizations, follow
`the official github documentation <https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/denying-access-to-a-previously-approved-oauth-app-for-your-organization>`_.


Secrets
-------

:term:`signing key` is used to verify the pusher (write access) of the entries to the binary cache.

:term:`access token` is used to authenticate the user to the Cachix HTTP API.

For public caches, :term:`signing key` is needed when pushing to Cachix. Otherwise all read access is public to everyone.

For private caches, on top of the :term:`signing key`, all requests also need :term:`access token` configured.


Binary Caches
-------------

By using a binary cache, you are trusting that the binaries within were built by the user
with write access. 

For that reason the github username of the owner of the binary cache is listed on the public page
so that you can verify their social trust.