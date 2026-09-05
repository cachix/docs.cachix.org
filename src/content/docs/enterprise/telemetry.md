---
title: "Telemetry"
description: "Cachix Server supports exporting telemetry data using the OpenTelemetry API."
slug: "enterprise/telemetry.html"
---

<span id="telemetry" class="legacy-anchor"></span>

Cachix Server supports exporting telemetry data using the [OpenTelemetry](https://opentelemetry.io/) API.

We currently support the following [signals](https://opentelemetry.io/docs/concepts/signals/):

- ✅ [Traces](https://opentelemetry.io/docs/concepts/signals/traces/)
- ❌ [Metrics](https://opentelemetry.io/docs/concepts/signals/metrics/)
- ❌ [Logs](https://opentelemetry.io/docs/concepts/signals/logs/)

The default service name for the server is `cachix-server`. Cachix-specific attributes are prefixed with `cachix`.

## Span attributes {#span-attributes}

Below is a selection of useful span attributes that are exported by Cachix Server with every API request.

| Name | Type | Description |
| --- | --- | --- |
| cachix.auth.is_success | boolean | Whether the request was authenticated successfully. |
| cachix.auth.token.id | uuid | The ID of the token used to authenticate the request. |
| cachix.auth.token.scopes | string | The auth scopes of the token used to authenticate the request. |
| client.address | string | The remote IP address of the client. |
