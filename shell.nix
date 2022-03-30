let
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-21.11.tar.gz") {};
in pkgs.stdenv.mkDerivation {
    name = "a-star";
    buildInputs = [
      pkgs.yarn        #coc.vim
      pkgs.nodejs-14_x #coc.vim
    ];
    shellHook = ''
      alias gst='git status'
      alias gd='git diff'
      alias gc='git commit'
      :q() {
        exit
      }
    '';
  }
