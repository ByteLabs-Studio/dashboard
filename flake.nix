{
  description = "Flake for Website.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      treefmt-nix,
      self,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        formatters =
          (treefmt-nix.lib.evalModule pkgs (_: {
            projectRootFile = ".git/config";
            programs = {
              nixfmt.enable = true;
              nixf-diagnose.enable = true;
              prettier.enable = true;
            };
          })).config.build;
      in
      {
        devShells.default = pkgs.mkShell {
          meta = {
            license = pkgs.lib.licenses.unlicense;
          };
          buildInputs = with pkgs; [
            bun
            typescript-language-server
          ];

          shellHook = ''
            echo "Bun Version:" $(bun -v | cut -d ' ' -f2)
          '';
        };

        formatter = formatters.wrapper;
        checks.formatting = formatters.check self;

      }
    );
}
