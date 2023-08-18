.. _troubleshooting:
    
Troubleshooting
===============

Changing agent name
-------------------

Existing agent won't be able to pick up the new name, so you need to bootstrap it again:

```bash
CACHIX_AGENT_TOKEN=XXX cachix deploy agent --bootstrap new-agent-name
```

Once the deployment succeeds, the the daemon will exit.