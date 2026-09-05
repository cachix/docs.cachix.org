---
title: "Running an agent"
description: "You need to install at least version 0.8.0 of cachix command line client ."
slug: "deploy/running-an-agent/index.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="running-an-agent" class="legacy-anchor"></span>

## Prerequisites {#prerequisites}

You need to [install at least version 0.8.0 of cachix command line client](/installation.html#installation).

## Create a binary cache {#create-a-binary-cache}

The agent requires a binary cache to download the closure it wants to activate.

You can [create a binary cache](https://app.cachix.org/cache/) with Cachix and
the your agents will automatically use it.

Alternatively, you can roll your own binary cache, but some of the features won’t be available.

## Create a workspace {#create-a-workspace}

Workspace is a set of agents you can deploy to.

Start by [creating a workspace](https://app.cachix.org/deploy/).

<span id="id3" class="legacy-anchor"></span>

## Generate agent token {#generate-agent-token}

Once you have a workspace, you can generate an agent token.

1. Click **“Add an Agent”** [at your workspace](https://app.cachix.org/deploy/)
2. Write the description of the token, for an example “my homelab agents token”
3. Click **“Generate”**
4. Copy the token and save it

## Starting an agent {#starting-an-agent}

Choose your target Nix profile:

- [Simple Nix profile](/deploy/running-an-agent/manually.html)
- [NixOS](/deploy/running-an-agent/nixos.html)
- [nix-darwin](/deploy/running-an-agent/darwin.html)
- [Home Manager](/deploy/running-an-agent/home-manager.html)
