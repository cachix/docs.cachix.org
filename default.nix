{ pkgs ? import ./nixpkgs.nix { } }:

pkgs.buildNpmPackage {
  pname = "docs.cachix.org";
  version = "1.0.0";
  src = pkgs.lib.cleanSourceWith {
    src = ./.;
    filter = path: type:
      let name = baseNameOf path;
      in !(builtins.elem name [
        ".git" ".astro" ".devenv" ".venv" ".vscode"
        "node_modules" "dist" "build" "result" "TODO"
        "test-results" "playwright-report" ".wrangler"
      ]);
  };
  nodejs = pkgs.nodejs_24;
  npmDepsHash = "sha256-ntc6AJpB10sd7bHrV+rHe42DpOdiyXDxwL9uc5A0E08=";
  nativeBuildInputs = [ pkgs.lychee ];
  env.ASTRO_TELEMETRY_DISABLED = "1";
  env.SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
  doCheck = true;
  checkPhase = ''
    runHook preCheck
    npm run check
    npm run check:links
    npm run check:legacy
    runHook postCheck
  '';
  installPhase = ''
    runHook preInstall
    mkdir -p "$out"
    cp -R dist/. "$out/"
    runHook postInstall
  '';
}
