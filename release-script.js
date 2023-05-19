// release-script.js

const fs = require('fs');
const { execSync } = require('child_process');

// Define the root directory where your packages are located
const rootDir = 'dist';

// Get the new version from the semantic-release context
const newVersion = process.env.npm_package_version;

// Get a list of directories under the rootDir
const directories = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Iterate over each directory and perform the release steps
directories.forEach((directory) => {
  const packageJsonPath = `${rootDir}/${directory}/package.json`;

  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Update the version to the new version
  packageJson.version = newVersion;

  // Write the updated package.json back to the file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Perform the release step (e.g., publish to npm)
  execSync(`npm publish ${rootDir}/${directory}`);
});
