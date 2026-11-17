---
title: "Cachix CLI"
slug: "cli.html"
---

## Commands

Replace `MY_CACHE` with your cache name in the examples on this page.

| Task | Command |
| --- | --- |
| Configure Nix to download from a cache | `cachix use MY_CACHE` |
| Upload a build and its runtime closure | `cachix push MY_CACHE ./result` |
| Protect an uploaded release | `cachix pin MY_CACHE release ./result` |
| Inspect the latest revision | `cachix pins get MY_CACHE release` |

Run `cachix --help` to list commands or `cachix push --help` for options specific to a command.

## Configuration and environment variables

`cachix authtoken` stores your access token in the Cachix configuration file, normally `~/.config/cachix/cachix.dhall`.
Use the global `--config` option to select another file.
In CI, supply the token through `CACHIX_AUTH_TOKEN`.
If your cache uses a self-generated signing key, supply it through `CACHIX_SIGNING_KEY` when pushing.
See [Configuring a cache](/configuring-a-cache.html#authenticating).

## Daemon {#daemon}

Use the daemon when several commands need to submit paths to the same cache.
It accepts upload requests over a local Unix socket.

### Start and stop the daemon

Start the daemon in one terminal with `cachix daemon run MY_CACHE`.
Leave it running while you submit paths from another terminal.
When you have submitted the last path, run `cachix daemon stop` to finish queued uploads and shut down.

### Submit paths

After building your project, run `cachix daemon push ./result`.
The daemon uses the cache you selected at startup.

### Wait for uploads

Run `cachix daemon push --wait ./result` when the next command requires that upload to have finished, for example before creating a pin.
The daemon stays available for further requests.

## `cachix doctor` {#first-step-for-any-problem-run-cachix-doctor}

`cachix doctor` inspects your installation, configuration, and authentication, and reports the most common misconfigurations along with a suggested fix:

```console
$ cachix doctor
```

## How do I supply a custom CA certificate? {#how-do-i-supply-a-custom-ca-certificate}

By default, Cachix loads trusted certificates from the system store (`/etc/ssl/certs` on Linux, the keychain on macOS, the system store on Windows).

If you are behind a TLS intercepting corporate proxy or use your own certificate authority, point Cachix at your certificate bundle using one of the following environment variables:

<dl class="simple">
<dt><code><span>SSL_CERT_FILE</span></code></dt><dd><p>Path to a PEM bundle containing one or more trusted certificates.</p>
</dd>
<dt><code><span>SSL_CERT_DIR</span></code></dt><dd><p>Path to a directory of PEM certificates (each file must contain a single certificate).</p>
</dd>
</dl>

Example:

```console
$ export SSL_CERT_FILE=/path/to/corporate-ca-bundle.pem
$ cachix push MY_CACHE ./result
```

Note that `cachix` does not currently read `NIX_SSL_CERT_FILE`.
If you have configured Nix with `NIX_SSL_CERT_FILE`, set `SSL_CERT_FILE` to the same path so that `cachix` uses the same trust store.
