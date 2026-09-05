---
title: "Importing from S3"
description: "Import an existing Nix binary cache from an Amazon S3 bucket into Cachix."
slug: "importing-from-s3.html"
---

<span id="importing-from-s3" class="legacy-anchor"></span>

Added in version 1.7.

## Overview {#overview}

When transitioning to Cachix, it’s common practice to migrate your existing binary caches.

This document outlines the procedure for importing a binary cache from an Amazon S3 bucket into Cachix.

This migration process is beneficial for managing garbage collection, implementing enhanced authentication schemes, and consolidating multiple binary caches.

## Prerequisites {#prerequisites}

- **AWS CLI**: The AWS Command Line Interface should be installed and configured on your system.
- **Cachix**: Ensure that Cachix is installed. For instructions on installing Cachix, refer to the Getting Started with Cachix guide.

## Importing Cache from S3 {#importing-cache-from-s3}

The following steps outline the process of importing a binary cache from an S3 bucket:

### Step 1: Configure AWS Credentials {#step-1-configure-aws-credentials}

Before proceeding, configure your AWS credentials:

```console
$ aws configure
```

Follow the prompts to input your AWS Access Key ID, Secret Access Key, and default region.

### Step 2: Cachix Installation {#step-2-cachix-installation}

For installation instructions and verification, refer to the [Cachix getting started guide](/getting-started.html#getting-started).

### Step 3: Start the Import Process {#step-3-start-the-import-process}

To import the binary cache from your S3 bucket to Cachix, use the following command:

Syntax:

```console
$ cachix import <cache-name> s3://<bucket-name>?endpoint=<uri>&region=<region>
```

Example:

```console
$ cachix import mycache s3://mybucket
```

Replace `<cache-name>` with your Cachix cache name and `<bucket-name>` with your S3 bucket name.

## Important Notes {#important-notes}

- Data Streaming: All contents of the cache will be streamed through the machine executing the command. It is recommended to perform this operation on a machine with a fast network connection.
