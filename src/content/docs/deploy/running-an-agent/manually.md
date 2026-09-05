---
title: "Simple Nix profile"
description: "To run the agent you’ll need previously generated AGENT-TOKEN and pick an AGENT-NAME ."
slug: "deploy/running-an-agent/manually.html"
---

<span id="running-simple-agent" class="legacy-anchor"></span>

<span id="simple-nix-profile" class="legacy-anchor"></span>

To run the agent you’ll need previously generated `AGENT-TOKEN` and pick an `AGENT-NAME`.

`NIX-PROFILE-NAME` is optional and defaults to NixOS.

```console
$ CACHIX_AGENT_TOKEN=AGENT-TOKEN cachix deploy agent AGENT-NAME [NIX-PROFILE-NAME]
```

For example:

```console
$ CACHIX_AGENT_TOKEN=... cachix deploy agent myagentname
```

You should see an agent appear [at your workspace](https://app.cachix.org/deploy/).

Continue by [making your first deployment for your agent](/deploy/deploying-to-agents/index.html#deploying-to-agents).
