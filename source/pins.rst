.. _pins:

Pins
====

Overview
--------

Pins are a feature in Cachix that allows users to assign a name to a store path. 

This ensures that the named path is immune from the garbage collection process. The Pins feature is primarily used for safeguarding releases and other important binaries that need to be retained indefinitely.

How to Create a Pin
-------------------

1. **Choose a name for your pin** - This could be anything, but it is recommended to use something meaningful like the name of the tool, tool's version or a git revision. For example, `v1.0`.

2. **Provide a store path and cache name** - Use the `cachix pin` command followed by your cache name, the pin name, and the store path, as shown below:

.. code-block:: bash

   $ cachix pin mycache v1.0 /nix/store/xxx-name-1.0

Controlling Retention with Pins
-------------------------------

By default, Pins maintain a comprehensive history of revisions under the same name. However, you can also choose to only keep the last X revisions or the last X days by using the `--keep-revisions` or `--keep-days` option, as demonstrated below:

.. code-block:: bash

   $ cachix pin mycache v1.0 /nix/store/xxx-name-1.0 --keep-days 3

Exposing Files with Artifacts
-----------------------------

Pins allow you to expose certain files within a store path. If you want to expose a file, use the `--artifact` flag in your pin command, like this:

.. code-block:: bash

   $ cachix pin mycache v1.0 /nix/store/xxx-name-1.0 --artifact etc/nginx.conf 

Examples
--------

If you want to pin the `go-1.7` and `go-1.8` store paths, you would use the following commands:

.. code-block:: bash

   $ cachix pin mycache 1.7 /nix/store/nd3ssg3hiqj6ivvkv2n5q7ppdwh0wqcf-go-1.7
   $ cachix pin mycache 1.8 /nix/store/canq1nwdhxk4d2yj8pgywz7lqhkpyq2d-go-1.8

Once the pins have been created, they can be viewed by visiting your cache page, for example, `mycache.cachix.org <https://cachix.cachix.org>`_.

To use the `cachix pin` command, ensure that you have upgraded to :ref:`Cachix 1.5 <installation>`.
