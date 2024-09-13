Frequently Asked Questions
==========================

What Nix versions are supported?
--------------------------------

Cachix supports Nix 2.0.2 or higher. Nix 2.3.5 or higher is recommended.


Does pushing a store path override an existing entry?
-----------------------------------------------------

No. The existing entry first needs to be deleted.


Are entries immediately available after they are pushed?
--------------------------------------------------------

Yes. See the next questions what might happen to seem otherwise.


Why is Nix not picking up on any of the pre-built artifacts?
------------------------------------------------------------

For example, given that ``/nix/store/spznih45c56kfwygx8qyq1skd1rs4zv1-myproject-1.0.0`` is missing,
check if store path exists in the binary cache::

   $ curl https://mycache.cachix.org/spznih45c56kfwygx8qyq1skd1rs4zv1.narinfo

If the entry exists:

    1. It is possible that you need to restart ``nix-daemon`` to pick up ``nix.conf`` changes. Run ``sudo pkill nix-daemon``.

    2. If you ran ``nix-build`` before binary cache has been populated,
       Nix will maintain a negative cache for the entry.

       `See a workaround to remove negative caching <https://nix.dev/guides/troubleshooting.html#how-to-force-nix-to-re-check-if-something-exists-in-the-binary-cache>`_.

    3. Substitution could be disabled for that derivation via ``allowSubstitutes = false;`` attribute.

    4. On NixOS, it's `a known limitation <https://github.com/cachix/cachix/issues/323>`_
       that you first need to add cachix configuration and run ``nixos-rebuild switch`` and only after the
       next run of ``nixos-rebuild switch`` binary caches would be used.

If the entry does not exists:

    1. Check if the entry that you expected has a different hash.
     
       You can compare the difference between two derivations via ``nix-shell -p nix-diff --run "nix-diff drv1 drv"``.

       In order to have both derivations available locally you can run ``nix-instantiate default.nix | cachix push mycache``
       to push the dervation into Cachix and then run ``nix-store -r /nix/store/hash.drv`` to retrieve it on another machine.

       Common reason for derivation hash differences are `described in language anti-patterns <https://nix.dev/recipes/best-practices#reproducible-source-paths>`_.

    2. Maybe ``cachix push`` got interrupted and the whole dependency tree is not available from Cachix.
       In that case push again retry to make sure everything is uploaded.
       
    3. If the same store hash is available in https://cache.nixos.org it will count as existing upstream and won't be present in cachix


Is there a way to cache ``nix-shell``?
--------------------------------------

Many of CI integrations will push everything that was built during the CI run. 
Otherwise you can do the following.

Make sure shell dependencies are built:

.. code:: shell-session

    $ nix-shell --run "echo OK"

Push to cachix:

.. code:: shell-session

    $ nix-store --query --references $(nix-instantiate shell.nix) | xargs nix-store --realise | xargs nix-store --query --requisites | cachix push mycache


How to disable binary caches when working offline?
--------------------------------------------------

Pass ``--option substitute false`` to Nix commands.

.. _cachix-use-effects:

What happens when I run `cachix use` (both immediately and any stateful effects for the future)?
------------------------------------------------------------------------------------------------

It will modify ``nix.conf`` and append substituters and trusted-public-keys.
If you're using NixOS, it will write NixOS configuration.
If you're a trusted-user it will append to ``~/.config/nix/nix.conf``.

Otherwise it will either fail in case configuration cannot be written or it will append to ``/etc/nix/nix.conf``.


I get ``InvalidPath`` error from Nix when invoking Cachix
---------------------------------------------------------

There are two cases under which the error is raised:

- Garbage Collection kicks in while Cachix is trying to push a path. 
  To confirm if that's the case, check if GC timestamps correlate with when the error was raised

- Store paths weren't built yet. Some Nix commands return store paths that would exist if Nix has built them.


warning: 'https://mycache.cachix.org' does not appear to be a binary cache
--------------------------------------------------------------------------

Two causes:

a) You have mistyped the binary cache name 

b) You didn't set correct auth token via ``netrc`` for a private binary cache. See https://mycache.cachix.org for instructions.


How can I check if my auth token works?
---------------------------------------

.. code:: shell-session

    $ curl -v -H "Authorization: Bearer <token>" https://app.cachix.org/api/v1/user
