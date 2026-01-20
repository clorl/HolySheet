{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };

        env = pkgs.buildFHSEnv {
          name = "dev-shell-fhs";
          targetPkgs = pkgs: with pkgs; [
            bun
            pocketbase
            
            typescript-language-server
            typescript
            svelte-language-server
            emmet-language-server
            
            glibc
            zlib
            openssl
            icu
            stdenv.cc.cc.lib
            libgcc
            libuv
            bashInteractive
          ];
          runScript = "bash";
        };
      in
      {
        devShells.default = env.env;
      });
}
