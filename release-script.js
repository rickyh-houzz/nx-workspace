// release-script.js

const fs = require('fs');
const { execSync } = require('child_process');
const getRepoInfo = require('git-repo-info');

const repoInfo = getRepoInfo();
// Define the root directory where your packages are located
const rootDir = 'dist';

const newVersion = process.argv[2];

// Get a list of directories under the rootDir
const directories = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Iterate over each directory and perform the release steps
directories.forEach((directory, index) => {
  const packageJsonPath = `${rootDir}/${directory}/package.json`;

  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Update the version to the new version
  packageJson.version = newVersion;

  console.log('####:', {
    package: {
      name: packageJson.name,
      version: NEXT_VERSION,
    },
    git: {
      tag: repoInfo.tag,
      hash: repoInfo.sha,
    },
  });
  // Write the updated package.json back to the file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Perform the release step (e.g., publish to npm)
  execSync(`npm publish ${rootDir}/${directory}`);
});
