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

An :term:`access token` is used to authenticate the user with the Cachix HTTP API.

Public caches can be read by anyone on the internet. An :term:`access token` is required to push to the cache.

For private caches, both read or write access requires an :term:`access token`.

A :term:`signing key` is used to verify the pusher of the entries to the binary cache.

For managed caches (the default), the :term:`signing key` is created and managed by Cachix. Cachix will sign the store paths with this key once they're pushed to the cache.

For self-signed caches, you create and manage your own :term:`signing key` locally. Signing happens on the machine pushing the store paths.


Binary Caches
-------------

By using a binary cache, you are trusting that the binaries within were built by the user
with write access.

For that reason, the GitHub username of the owner of the binary cache is listed on the public page
so that you can verify their social trust.
