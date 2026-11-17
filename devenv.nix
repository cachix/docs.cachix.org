{ pkgs, ... }:

{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  packages = [ pkgs.lychee ];

  env.ASTRO_TELEMETRY_DISABLED = "1";

  processes.docs.exec = "npm run dev -- --host 127.0.0.1";
}
