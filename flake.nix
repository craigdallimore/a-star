{
  description = "A*";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... }:
    let
      # Define the supported systems
      supportedSystems = [ "x86_64-linux" "aarch64-linux"  "aarch64-darwin" ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      # Nixpkgs instantiated for supported system types
      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });
    in
    {
      devShells = forAllSystems (system:
        let pkgs = nixpkgsFor.${system};
        in {
          default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.glow
            ];

            shellHook = ''
              alias ll='ls -alF'
              alias gst='git status'
              alias gdno='git --no-pager diff --name-only'
              alias gco='git checkout'
              alias gd='git diff'
              alias gb='git branch'
              alias b='git --no-pager branch'
              alias gc='git commit'
              :q() {
                exit
              }
            '';
          };
        }
      );
    };
}
