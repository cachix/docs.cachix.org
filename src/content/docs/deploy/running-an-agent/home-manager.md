---
title: "Home Manager"
description: "First, you’ll need to have a Nix installation:"
slug: "deploy/running-an-agent/home-manager.html"
---

<span id="running-home-manager-agent" class="legacy-anchor"></span>

<span id="home-manager" class="legacy-anchor"></span>

First, you’ll need to have a Nix installation:

```text
sh <(curl -L https://nixos.org/nix/install) --daemon
```

Then exit your terminal and start it again, so that the Nix environment loads.

Next you need to get access to the `cachix` tool. This can be done using `nix-shell`:

```text
nix-shell -I cachix=https://cachix.org/api/v1/install -p '(import <cachix> {}).cachix'
```

Then with [the previously generated token](/deploy/running-an-agent/index.html#generate-agent-token):

```text
CACHIX_AGENT_TOKEN=... cachix deploy agent myagent
```

You should see an agent appear [at your workspace](https://app.cachix.org/deploy/).

Continue by [making your first deployment for your agent](/deploy/deploying-to-agents/index.html#deploying-to-agents).
