{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    maven
    openjdk11
    jdk11
    idea.idea-community
  ];
}
