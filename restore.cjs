const { execSync } = require('child_process');
try {
  execSync('git checkout src/App.tsx');
  console.log('Restored');
} catch (e) {
  console.error(e.toString());
}
