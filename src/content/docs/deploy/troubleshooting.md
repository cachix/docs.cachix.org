---
title: "Troubleshooting"
description: "Existing agent won’t be able to pick up the new name, so you need to bootstrap it again:"
slug: "deploy/troubleshooting.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="troubleshooting" class="legacy-anchor"></span>

## Changing agent name {#changing-agent-name}

Existing agent won’t be able to pick up the new name, so you need to bootstrap it again:

```text
CACHIX_AGENT_TOKEN=XXX cachix deploy agent --bootstrap new-agent-name
```

Once the deployment succeeds, the daemon will exit.
