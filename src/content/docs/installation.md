---
title: "Installation"
description: "Install the Cachix CLI to upload builds and configure Nix to use Cachix binary caches."
slug: "installation.html"
---

<span id="id1" class="legacy-anchor"></span>

<span id="installation" class="legacy-anchor"></span>

The Cachix CLI is the command-line client for the Cachix binary cache service.
Use it to upload Nix build results, manage pins, and configure Nix to download builds from Cachix caches.

## Before you start

Install [Nix](https://nix.dev/install-nix) if you haven't already.
Then choose one of the installation methods below.

## Install with Nix {#recommended}

Run the following command to install the Cachix CLI in your user environment:

```console
$ nix-env -iA cachix -f https://cachix.org/api/v1/install
```

## Install with flakes {#flakes}

If you use flakes, install the CLI from Nixpkgs:

```console
$ nix profile install --accept-flake-config nixpkgs#cachix
```

## Declarative installation {#using-nixpkgs-or-nixos}

The CLI is available as `pkgs.cachix` in Nixpkgs.
Add it to the packages managed by your Nix configuration.
For example, on NixOS:

```nix
{ pkgs, ... }: {
  environment.systemPackages = [ pkgs.cachix ];
}
```

Apply the change with `sudo nixos-rebuild switch`.
For Home Manager, add `pkgs.cachix` to `home.packages` and run `home-manager switch`.
The CLI version comes from the Nixpkgs revision your configuration uses.

## Verify the installation

Check that the `cachix` command is available:

```console
$ cachix --version
$ cachix --help
```

## Next steps

- [Use an existing cache](/using-a-cache.html) to configure Nix to download its builds.
- [Make your first push](/getting-started.html) to create a cache, authenticate, and upload a build.
- [Set up CI](/continuous-integration-setup/index.html) to upload builds from your CI workflow.
