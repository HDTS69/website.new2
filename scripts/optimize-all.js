const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Available optimization scripts
  scripts: [
    {
      name: 'Optimize Images',
      description: 'Compresses and optimizes images to improve LCP',
      path: 'scripts/optimize-images.js',
      dependencies: ['sharp'],
    },
    {
      name: 'Optimize Next.js Config',
      description: 'Enhances Next.js configuration for better performance',
      path: 'scripts/optimize-nextjs-config.js',
      dependencies: ['webpack-bundle-analyzer', 'css-minimizer-webpack-plugin'],
    },
    {
      name: 'Optimize CSS',
      description: 'Removes unused CSS to reduce stylesheet size',
      path: 'scripts/optimize-css.js',
      dependencies: ['purgecss', 'glob'],
    },
    {
      name: 'Optimize Fonts',
      description: 'Improves font loading for better LCP',
      path: 'scripts/optimize-fonts.js',
      dependencies: ['glob'],
    },
    {
      name: 'Optimize Critical Path',
      description: 'Extracts and inlines critical CSS for faster rendering',
      path: 'scripts/optimize-critical-path.js',
      dependencies: ['critical', 'glob', 'puppeteer'],
    },
    {
      name: 'Optimize Framer Motion',
      description: 'Optimizes framer-motion imports for better performance',
      path: 'scripts/apply-motion-optimizations.js',
      dependencies: ['glob'],
    },
    {
      name: 'Cleanup Backup Files',
      description: 'Manages backup files created during optimization',
      path: 'scripts/cleanup-backups.js',
      dependencies: ['glob'],
    },
  ],
  // Default options
  defaultOptions: {
    runAll: false,
    interactive: true,
    verbose: true,
  },
  // Node.js version compatibility
  nodeVersionCompatibility: {
    // Packages that have Node.js version warnings but can still work
    packagesWithWarnings: ['glob', 'jackspeak', 'lru-cache', 'minimatch', 'path-scurry'],
  },
};

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to check Node.js version compatibility
function checkNodeVersion() {
  const nodeVersion = process.version;
  console.log(`Current Node.js version: ${nodeVersion}`);
  
  // Extract major version number
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
  
  if (majorVersion < 20) {
    console.log('\n⚠️ Warning: Some optimization packages recommend Node.js v20 or later.');
    console.log('You may see compatibility warnings, but most functionality should still work.');
    console.log('For best results, consider updating to Node.js v20 or later.\n');
    
    // Set environment variable to suppress warnings for specific packages
    process.env.npm_config_force = 'true';
    return false;
  }
  
  return true;
}

// Function to check if a script exists
function scriptExists(scriptPath) {
  return fs.existsSync(scriptPath);
}

// Function to check and install dependencies
function checkAndInstallDependencies(dependencies) {
  if (!dependencies || dependencies.length === 0) {
    return true;
  }
  
  const missingDeps = [];
  
  for (const dep of dependencies) {
    try {
      require.resolve(dep);
    } catch (e) {
      missingDeps.push(dep);
    }
  }
  
  if (missingDeps.length > 0) {
    console.log(`\nInstalling missing dependencies: ${missingDeps.join(', ')}...`);
    try {
      // Use --no-fund to suppress funding messages
      // Use --no-audit to suppress audit messages
      // Use --loglevel=error to show only errors
      execSync(`npm install --save-dev --no-fund --no-audit --loglevel=error ${missingDeps.join(' ')}`, { 
        stdio: 'inherit',
        env: { ...process.env, npm_config_force: 'true' } // Force install even with warnings
      });
      console.log('Dependencies installed successfully.');
      return true;
    } catch (error) {
      console.error(`Error installing dependencies: ${error.message}`);
      return false;
    }
  }
  
  return true;
}

// Function to run a script
function runScript(script) {
  console.log(`\n🚀 Running ${script.name}...`);
  
  if (!scriptExists(script.path)) {
    console.error(`❌ Script not found: ${script.path}`);
    return false;
  }
  
  // Check and install dependencies
  if (!checkAndInstallDependencies(script.dependencies)) {
    console.error(`❌ Failed to install dependencies for ${script.name}`);
    return false;
  }
  
  try {
    execSync(`node ${script.path}`, { 
      stdio: 'inherit',
      env: { ...process.env, npm_config_force: 'true' } // Force run even with warnings
    });
    console.log(`✅ ${script.name} completed successfully.`);
    return true;
  } catch (error) {
    console.error(`❌ ${script.name} failed: ${error.message}`);
    return false;
  }
}

// Function to display the menu
function displayMenu() {
  console.log('\n📋 Available Optimization Scripts:');
  console.log('--------------------------------');
  
  config.scripts.forEach((script, index) => {
    const exists = scriptExists(script.path);
    const status = exists ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${script.name} - ${script.description}`);
  });
  
  console.log('\nA. Run all available scripts');
  console.log('Q. Quit');
  
  rl.question('\nEnter your choice (1-7, A, Q): ', (answer) => {
    processMenuChoice(answer);
  });
}

// Function to process menu choice
function processMenuChoice(choice) {
  choice = choice.trim().toUpperCase();
  
  if (choice === 'Q') {
    console.log('\nExiting optimization tool. Goodbye!');
    rl.close();
    return;
  }
  
  if (choice === 'A') {
    runAllScripts();
    return;
  }
  
  const scriptIndex = parseInt(choice) - 1;
  
  if (isNaN(scriptIndex) || scriptIndex < 0 || scriptIndex >= config.scripts.length) {
    console.log('\n❌ Invalid choice. Please try again.');
    displayMenu();
    return;
  }
  
  const script = config.scripts[scriptIndex];
  
  if (!scriptExists(script.path)) {
    console.log(`\n❌ Script not found: ${script.path}`);
    displayMenu();
    return;
  }
  
  runScript(script);
  
  // Ask if the user wants to run another script
  rl.question('\nDo you want to run another optimization script? (y/n): ', (answer) => {
    if (answer.trim().toLowerCase() === 'y') {
      displayMenu();
    } else {
      console.log('\nExiting optimization tool. Goodbye!');
      rl.close();
    }
  });
}

// Function to run all scripts
function runAllScripts() {
  console.log('\n🚀 Running all available optimization scripts...');
  
  const results = [];
  
  for (const script of config.scripts) {
    if (scriptExists(script.path)) {
      const success = runScript(script);
      results.push({
        name: script.name,
        success,
      });
    } else {
      console.log(`⚠️ Skipping ${script.name} (script not found)`);
      results.push({
        name: script.name,
        success: false,
        reason: 'Script not found',
      });
    }
  }
  
  // Print summary
  console.log('\n📊 Optimization Summary:');
  console.log('---------------------');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const result of results) {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\nSuccessful: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  
  console.log('\nOptimization complete! Your website should now have improved performance.');
  console.log('Run Lighthouse or PageSpeed Insights to measure the improvements.');
  
  rl.close();
}

// Function to parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = { ...config.defaultOptions };
  
  for (const arg of args) {
    if (arg === '--all' || arg === '-a') {
      options.runAll = true;
    } else if (arg === '--non-interactive' || arg === '-n') {
      options.interactive = false;
    } else if (arg === '--quiet' || arg === '-q') {
      options.verbose = false;
    }
  }
  
  return options;
}

// Main function
function main() {
  const options = parseArgs();
  
  console.log('🚀 Website Performance Optimization Tool 🚀');
  console.log('==========================================');
  console.log('This tool will help you optimize your website for better performance,');
  console.log('focusing on improving Largest Contentful Paint (LCP) and other Core Web Vitals.');
  
  // Check Node.js version compatibility
  checkNodeVersion();
  
  if (options.runAll) {
    runAllScripts();
  } else if (options.interactive) {
    displayMenu();
  } else {
    console.log('\nPlease specify what to optimize. Use --all to run all optimizations.');
    rl.close();
  }
}

// Run the main function
main(); 