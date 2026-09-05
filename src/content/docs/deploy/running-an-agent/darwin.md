---
title: "nix-darwin"
description: "You’ll need to first install Nix:"
slug: "deploy/running-an-agent/darwin.html"
---

<span id="running-darwin-agent" class="legacy-anchor"></span>

<span id="nix-darwin" class="legacy-anchor"></span>

You’ll need to first install Nix:

```text
curl -L https://nixos.org/nix/install | sh
```

Then exit your terminal and start it again, so that the Nix environment loads.

Next you need to install Cachix:

```text
nix-env -iA cachix -f https://cachix.org/api/v1/install
```

Then with [the previously generated token](/deploy/running-an-agent/index.html#generate-agent-token):

```text
sudo -H CACHIX_AGENT_TOKEN=... cachix deploy agent --bootstrap myagent
```

You should see an agent appear [at your workspace](https://app.cachix.org/deploy/).

Continue by [making your first deployment for your agent](/deploy/deploying-to-agents/index.html#deploying-to-agents).

If you need to troubleshoot:

- If the agent doesn’t start, check `tail -f /var/log/cachix-agent.log`.
- If you want to restart the agent, run `sudo launchctl kickstart -k system/org.nixos.cachix-agent`.
