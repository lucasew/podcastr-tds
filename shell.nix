{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    maven
    openjdk11
    idea.idea-community
  ];
}
