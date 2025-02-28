// install-image-deps.js - Script to install dependencies for image optimization
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Dependencies needed for image optimization
const dependencies = [
  'sharp',
  'glob'
];

console.log('Installing dependencies for image optimization...');

try {
  // Check if package.json exists
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found in the current directory.');
    process.exit(1);
  }

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check which dependencies are already installed
  const missingDeps = dependencies.filter(dep => {
    return !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep];
  });

  if (missingDeps.length === 0) {
    console.log('All required dependencies are already installed.');
    process.exit(0);
  }

  // Install missing dependencies
  console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
  execSync(`npm install --save-dev ${missingDeps.join(' ')}`, { stdio: 'inherit' });

  // Add script to package.json if it doesn't exist
  if (!packageJson.scripts?.['optimize-images']) {
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts['optimize-images'] = 'node scripts/optimize-images.js';
    
    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Added "optimize-images" script to package.json');
  }

  console.log('\nSetup complete! You can now run:');
  console.log('npm run optimize-images');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
} 