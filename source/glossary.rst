Glossary
========

.. glossary::

  binary cache
    Nix can fetch a binary result instead of performing the build by looking up
    store hash in binary cache API.

  nar archive
    Deterministic arhive alternative to other archives like tar.
    
    See `specification <https://gist.github.com/jbeda/5c79d2b1434f0018d693>`_.

  narinfo
    Metadata information about :term:`nar archive` used by Nix.
    
  signing key
    Secret used by ``cachix`` command line interface to 
    `sign <https://en.wikipedia.org/wiki/Digital_signature>`_ :term:`narinfo` 
    before it's pushed to a :term:`binary cache`.

  access token
    Secret for accessing Cachix HTTP API authenticated to a user.

  agent 
    Cachix Deploy Agent manages a lifecycle of a Nix profile. The agent connects to Cachix and awaits new deployments.

  store path 
    Example: /nix/store/41zwxsdh0l66zvq2wqxnyx55xa1jn9b9-nixos-system-cherimoya-21.05.3367.fd8a7fd07da