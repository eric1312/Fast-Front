/* Attempt to set executable permission on node_modules/.bin/vite for Unix CI environments.
   This script is safe on Windows and will quietly exit if it can't change permissions.
*/
const fs = require('fs');
const path = require('path');

function tryChmod(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.chmodSync(filePath, 0o755);
      console.log(`Set executable permissions on ${filePath}`);
    } else {
      // try without .bin folder (some setups link differently)
      console.log(`${filePath} not found`);
    }
  } catch (err) {
    console.log(`Could not set permissions on ${filePath}: ${err.message}`);
  }
}

const candidates = [
  path.join('node_modules', '.bin', 'vite'),
  path.join('node_modules', 'vite', 'bin', 'vite.js'),
];

candidates.forEach(tryChmod);

// exit normally
process.exit(0);
