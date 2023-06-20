Telemetry
=========

Cachix Server supports exporting telemetry data using the `OpenTelemetry <https://opentelemetry.io/>`_ API.

We currently support the following `signals <https://opentelemetry.io/docs/concepts/signals/>`_:

* ✅ `Traces <https://opentelemetry.io/docs/concepts/signals/traces/>`_
* ❌ `Metrics <https://opentelemetry.io/docs/concepts/signals/metrics/>`_
* ❌ `Logs <https://opentelemetry.io/docs/concepts/signals/logs/>`_

The default service name for the server is ``cachix-server``. Cachix-specific attributes are prefixed with ``cachix``.

Span attributes
------------------------

Below is a selection of useful span attributes that are exported by Cachix Server with every API request.

.. csv-table::
   :header: "Name", "Type", "Description"
   :widths: 20, 10, 30

   "cachix.auth.is_success", "boolean", "Whether the request was authenticated successfully."
   "cachix.auth.token.id", "uuid", "The ID of the token used to authenticate the request."
   "cachix.auth.token.scopes", "string", "The auth scopes of the token used to authenticate the request."
   "http.client_ip", "string", "The remote IP address of the client."

