---
title: "Cachix Deploy"
description: "Cachix Deploy provides continuous deployments to a Nix profile (like NixOS , nix-darwin or Home Manager ) using a pull model."
slug: "deploy/index.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="cachix-deploy" class="legacy-anchor"></span>

[Cachix Deploy](https://app.cachix.org/deploy/) provides continuous deployments to a Nix profile
(like [NixOS](https://nixos.org), [nix-darwin](https://github.com/LnL7/nix-darwin) or [Home Manager](https://github.com/nix-community/home-manager)) using a pull model.

It consists of running a simple daemon process `cachix deploy agent myagent` that connects to our backend using websockets and
waits for a new deployment. There’s no Nix evaluation or building done on the agent. The
agent pulls all binaries from your binary cache and activates the new deployment.

To start new deployments you run `cachix deploy activate <deploy.json>` with a specification
of what each agent should deploy.

See [an example of how we deploy our self-managed CI workers](https://github.com/cachix/cachix-ci-agents).

- [Running an agent](/deploy/running-an-agent/index.html)
  - [Prerequisites](/deploy/running-an-agent/index.html#prerequisites)
  - [Create a binary cache](/deploy/running-an-agent/index.html#create-a-binary-cache)
  - [Create a workspace](/deploy/running-an-agent/index.html#create-a-workspace)
  - [Generate agent token](/deploy/running-an-agent/index.html#generate-agent-token)
  - [Starting an agent](/deploy/running-an-agent/index.html#starting-an-agent)
- [Deploying to agents](/deploy/deploying-to-agents/index.html)
  - [Prerequisites](/deploy/deploying-to-agents/index.html#prerequisites)
  - [Get Deploy Activate Auth Token](/deploy/deploying-to-agents/index.html#get-deploy-activate-auth-token)
  - [Write Deploy specification](/deploy/deploying-to-agents/index.html#write-deploy-specification)
  - [Activate the deployment](/deploy/deploying-to-agents/index.html#activate-the-deployment)
- [Troubleshooting](/deploy/troubleshooting.html)
  - [Changing agent name](/deploy/troubleshooting.html#changing-agent-name)
- [Reference](/deploy/reference.html)
  - [deploy.json](/deploy/reference.html#deploy-json)
