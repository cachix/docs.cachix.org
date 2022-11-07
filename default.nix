let 
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/1bd5157b2c008c58955af6293f5445e2c5057083.tar.gz") {};
  nix-dev-pyenv = pkgs.poetry2nix.mkPoetryEnv {
    projectDir = ./.;
    python = pkgs.python38;
  };
in pkgs.stdenv.mkDerivation {
    name = "docs.cachix.org";
    src = ./.;
    buildInputs = [ pkgs.ncdu ];
    buildPhase = ''
        make html
    '';
    installPhase = ''
        mkdir -p $out
        cp -R build/html/* $out/
    '';
}
