---
title: "NixOS"
description: "You’ll first need to populate /etc/cachix-agent.token with the previously generated agent token with the contents: CACHIX_AGENT_TOKEN=XXX ."
slug: "deploy/running-an-agent/nixos.html"
---

<span id="running-nixos-agent" class="legacy-anchor"></span>

<span id="nixos" class="legacy-anchor"></span>

You’ll first need to populate `/etc/cachix-agent.token` with the previously
generated agent token with the contents:`CACHIX_AGENT_TOKEN=XXX`.

Then set the following NixOS options:

```text
services.cachix-agent.enable = true;

# agent name is inferred from the hostname
networking.hostName = "myhostname";
```

And run `nixos-rebuild switch` to activate the new configuration that will start the agent.

You should see an agent appear [at your workspace](https://app.cachix.org/deploy/).

Continue by [making your first deployment for your agent](/deploy/deploying-to-agents/index.html#deploying-to-agents).
