/* Attempt to set executable permission on node_modules/.bin/vite for Unix CI environments.
   This script uses CommonJS so it runs under projects with "type": "module".
*/
const fs = require('fs');
const path = require('path');

function tryChmod(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.chmodSync(filePath, 0o755);
      console.log(`Set executable permissions on ${filePath}`);
    } else {
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

process.exit(0);
