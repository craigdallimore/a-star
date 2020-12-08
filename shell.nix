let
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-20.09.tar.gz") {};
in pkgs.stdenv.mkDerivation {
    name = "a-star";
    buildInputs = [
      pkgs.yarn        #coc.vim
      pkgs.nodejs-14_x #coc.vim
      pkgs.flow
    ];
  }
