Importing from S3
=================

.. versionadded:: 1.7

Overview
--------

When transitioning to Cachix, it's common practice to migrate your existing binary caches. 

This document outlines the procedure for importing a binary cache from an Amazon S3 bucket into Cachix. 

This migration process is beneficial for managing garbage collection, implementing enhanced authentication schemes, and consolidating multiple binary caches.

Prerequisites
-------------

- **AWS CLI**: The AWS Command Line Interface should be installed and configured on your system.
- **Cachix**: Ensure that Cachix is installed. For instructions on installing Cachix, refer to the Getting Started with Cachix guide.

Importing Cache from S3
-----------------------

The following steps outline the process of importing a binary cache from an S3 bucket:

Step 1: Configure AWS Credentials
*********************************

Before proceeding, configure your AWS credentials:

::

    $ aws configure


Follow the prompts to input your AWS Access Key ID, Secret Access Key, and default region.

Step 2: Cachix Installation
**********************************

For installation instructions and verification, refer to the :ref:`Cachix getting started guide <getting-started>`.


Step 3: Start the Import Process
********************************

To import the binary cache from your S3 bucket to Cachix, use the following command:

Syntax::

  $ cachix import <cache-name> s3://<bucket-name>


Example::

  $ cachix import mycache s3://mybucket


Replace `<cache-name>` with your Cachix cache name and `<bucket-name>` with your S3 bucket name.

Important Notes
---------------

- Data Streaming: All contents of the cache will be streamed through the machine executing the command. It is recommended to perform this operation on a machine with a fast network connection.
