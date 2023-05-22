.. _pins:

Pins
====

Overview
--------

Pins are a feature in Cachix that let you assign a persistent name to a store path.

Pinned paths are immune from :ref:`garbage collection <garbage-collection>` by default and their retention can be individually controlled.

Pins are useful for:

* Protecting important store paths, like releases and long-lived dependencies, from :ref:`garbage collection <garbage-collection>`.
* Exposing files from within a store path.
* Controlling the retention of certain store paths.

How to Create a Pin
-------------------

1. **Choose a name for your pin** - This could be anything, but we recommend choosing something meaningful, like the tool's name, version, git revision, or some combination of them all. For example, `v1.7`.

2. **Pin a store path in a cache** - Use the `cachix pin` command followed by the name of your cache, your chosen pin name, and the store path you want to pin.

.. code-block:: bash

   $ cachix pin mycache v1.0 /nix/store/xxx-name-1.0

Current Pins can be viewed and managed from your cache's dashboard at `mycache.cachix.org <https://cachix.cachix.org>`_.

Controlling Retention with Pins
-------------------------------

Pins maintain a history of revisions for each pin name. A new revision is created every time a store path is pinned with the same name.
All revisions are kept indefinitely by default. You can choose to keep just the revisions added in the last X days with `--keep-days`, or just the last X revisions with `--keep-revisions`.

.. code-block:: bash

   $ cachix pin mycache v1.0 /nix/store/xxx-name-1.0 --keep-days 3

Exposing Files with Artifacts
-----------------------------

Pins allow you to expose and serve certain files from within a store path. Multiple artifacts can be added with the `--artifact` option when creating a new pin.

.. code-block:: bash

   $ cachix pin mycache v1.0 /nix/store/xxx-name-1.0 --artifact etc/nginx.conf --artifact bin/name

Examples
--------

In the following commmands, we pin the `go-1.7` and `go-1.8` store paths:

.. code-block:: bash

   $ cachix pin mycache go-1.7 /nix/store/nd3ssg3hiqj6ivvkv2n5q7ppdwh0wqcf-go-1.7
   $ cachix pin mycache go-1.8 /nix/store/canq1nwdhxk4d2yj8pgywz7lqhkpyq2d-go-1.8

To use the `cachix pin` command, ensure that you have upgraded to :ref:`Cachix 1.5 <installation>`.
