{
  description = "Mini CMS";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-parts.url = "github:hercules-ci/flake-parts";
  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      perSystem =
        { pkgs, system, ... }:
        let
          pkgs = import nixpkgs {
            inherit system;
          };
        in
        {
          formatter = pkgs.nixfmt-rfc-style;
          devShells = {
            default = pkgs.mkShell {
              name = "prosemirror Workspace";
              buildInputs = with pkgs; [
                git
                curl
                unzip
                pnpm
                biome
              ];
            };
          };
        };
    };
}
