{ pkgs ? import ./nixpkgs.nix { } }:
pkgs.mkShell {
  packages = [ pkgs.nodejs_24 pkgs.lychee ];
  env.ASTRO_TELEMETRY_DISABLED = "1";
}
