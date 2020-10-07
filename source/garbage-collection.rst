Garbage Collection
==================

When pushing Nix store paths to Cachix,
they **are first checked for existance** in `upstream NixOS cache <https://cache.nixos.org>`_
(to avoid wasting storage) and if not, 
they are **compressed and uploaded**.

You can `switch between different storage plans <https://cachix.org/#pricing>`_
to avoid reaching the storage limits.

Once you reach **85% of your storage limit**, you will receive **a warning email**
and another email **when you reach the limit**.

You can always check `Garbage Collection page <https://app.cachix.org/garbage-collection>`_
to see which store paths would be deleted first in case the limit is reached.

Deletion algorithm
------------------

The following statistics are collected for each binary cache:

- **creation date** of a pushed :term:`narinfo`

- **last accessed date** of :term:`narinfo` and :term:`nar archive` files

Garbage collection algorithm sorts all store paths 
**by their last accessed date or creation date if the path was never accessed**.
It deletes **the oldest entries** up until your storage limit.

Due to a `known Nix bug <https://github.com/NixOS/nix/issues/3534>`_,
we will never serve a :term:`narinfo` that does not contain full closure
(all dependencies).
