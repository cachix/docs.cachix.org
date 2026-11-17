---
title: "Cachix CLI"
slug: "cli.html"
---

## Commands

## Configuration and environment variables

## Daemon {#daemon}

[Automatic uploads](/pushing.html#automatic-uploads)

### Start and stop the daemon

### Submit paths

### Wait for uploads

## First step for any problem: run `cachix doctor` {#first-step-for-any-problem-run-cachix-doctor}

Run `cachix doctor` (available since version 1.10).
It inspects your installation, configuration, and authentication, and reports the most common
misconfigurations along with a suggested fix:

```console
$ cachix doctor
```

## How do I supply a custom CA certificate? {#how-do-i-supply-a-custom-ca-certificate}

By default, Cachix loads trusted certificates from the system store
(`/etc/ssl/certs` on Linux, the keychain on macOS, the system store on Windows).

If you are behind a TLS intercepting corporate proxy or use your own certificate authority,
point Cachix at your certificate bundle using one of the following environment variables:

<dl class="simple">
<dt><code><span>SSL_CERT_FILE</span></code></dt><dd><p>Path to a PEM bundle containing one or more trusted certificates.</p>
</dd>
<dt><code><span>SSL_CERT_DIR</span></code></dt><dd><p>Path to a directory of PEM certificates (each file must contain a single certificate).</p>
</dd>
</dl>

Example:

```console
$ export SSL_CERT_FILE=/path/to/corporate-ca-bundle.pem
$ cachix push mycache ./result
```

Note that `cachix` does not currently read `NIX_SSL_CERT_FILE`.
If you have configured Nix with `NIX_SSL_CERT_FILE`, set `SSL_CERT_FILE`
to the same path so that `cachix` uses the same trust store.
