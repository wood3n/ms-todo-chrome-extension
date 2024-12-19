/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["master", "next", { name: "beta", prerelease: true }, { name: "alpha", prerelease: true }],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: ["extension.zip"],
      },
    ],
    "@semantic-release/git",
  ],
};
