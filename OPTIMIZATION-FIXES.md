# Optimization Scripts Fixes

This document summarizes the fixes made to the website optimization scripts to ensure they work correctly with the current Node.js environment.

## 1. Node.js Version Update

The project has been updated to use Node.js v20.18.3 (LTS) to ensure full compatibility with all optimization scripts:

- **Previous Version**: Node.js v18.20.5
- **Updated Version**: Node.js v20.18.3 (LTS: Iron)
- **Update Method**: Used nvm (Node Version Manager) to install and switch to the new version
- **Project Configuration**: Added `.nvmrc` file to specify the required Node.js version

This update resolves compatibility warnings with packages that require Node.js v20 or later, including:
- glob@11.0.1
- jackspeak@4.1.0
- lru-cache@11.0.2
- minimatch@10.0.1
- path-scurry@2.0.0

## 2. Critical Path Optimization Script Fixes

The `scripts/optimize-critical-path.js` script was updated to fix ES Module import issues and improve error handling:

- **ES Module Import Fix**: Updated the `generateCriticalCss` function to properly handle dynamic imports for the `critical` module:
  ```javascript
  const criticalModule = await import('critical');
  const critical = criticalModule.default || criticalModule;
  ```

- **Dependency Checking**: Improved the `checkDependencies` function to properly detect installed packages by checking the `node_modules` directory instead of using `require.resolve`:
  ```javascript
  const pkgPath = path.join(process.cwd(), 'node_modules', pkg);
  if (!fs.existsSync(pkgPath)) {
    missingPackages.push(pkg);
  }
  ```

- **Error Handling**: Added robust error handling throughout the script to gracefully handle failures:
  - Added try/catch blocks around viewport-specific critical CSS generation
  - Added proper return values for all functions to indicate success/failure
  - Added checks for component creation and layout file updates

- **Configuration Updates**:
  - Increased timeout values from 30000ms to 60000ms to prevent timeouts during rendering
  - Added explicit Puppeteer configuration options to improve compatibility
  - Simplified viewport configuration for better readability

## 3. Node.js Version Compatibility Fixes

The `scripts/optimize-all.js` script was updated to handle Node.js version compatibility warnings:

- **Version Checking**: Added a `checkNodeVersion` function to detect the Node.js version and provide appropriate warnings:
  ```javascript
  function checkNodeVersion() {
    const nodeVersion = process.version;
    console.log(`Current Node.js version: ${nodeVersion}`);
    
    if (nodeVersion.startsWith('v18') || nodeVersion.startsWith('v16')) {
      console.log('\n⚠️ Warning: Some optimization packages recommend Node.js v20 or later.');
      console.log('You may see compatibility warnings, but most functionality should still work.');
      console.log('For best results, consider updating to Node.js v20 or later.\n');
      
      // Set environment variable to suppress warnings
      process.env.npm_config_force = 'true';
    }
  }
  ```

- **Dependency Installation**: Updated the dependency installation process to suppress warnings and allow installation despite version mismatches:
  ```javascript
  execSync(`npm install --save-dev ${dependencies.join(' ')} --no-fund --no-audit`, {
    stdio: 'inherit',
    env: { ...process.env, npm_config_force: 'true' }
  });
  ```

## 4. Framer-Motion Optimization Improvements

The `scripts/apply-motion-optimizations.js` script was enhanced to improve pattern matching and ensure changes are applied correctly:

- **Pattern Matching**: Added more comprehensive regex patterns to catch various import and usage patterns:
  ```javascript
  { 
    pattern: /import\s+{\s*motion\s*}\s+from\s+['"]framer-motion['"]/g,
    replacement: `import { LazyMotionDiv } from '@/components/ui/motion/LazyMotion'`
  },
  { 
    pattern: /<motion\.div([^>]*)>/g,
    replacement: '<LazyMotionDiv$1>'
  }
  ```

- **Force Option**: Added a `forceOptimize` option to allow optimization even if no patterns match
- **Backup Creation**: Added mechanism to create backup files with `.bak` extension before making changes

## 5. Backup File Management

Created a new script `scripts/cleanup-backups.js` to manage backup files created during optimization:

- **Features**:
  - Find all backup files (`.bak` extension) in specified directories
  - Interactive mode to choose what to do with each backup file
  - Non-interactive mode with options to remove all backups or restore from backups
  - Dry-run option to preview actions without making changes

- **Integration**: Added the backup cleanup script to the master optimization tool menu

## 6. Master Optimization Script Updates

Updated the `scripts/optimize-all.js` script to include all optimization tools:

- **Menu Updates**: Updated the menu to include 7 scripts instead of 6, adding the backup cleanup tool
- **Script Configuration**: Added configuration for the new backup cleanup script:
  ```javascript
  {
    name: 'Cleanup Backup Files',
    description: 'Manages backup files created during optimization',
    path: 'scripts/cleanup-backups.js',
    dependencies: ['glob']
  }
  ```

## Testing Results

All scripts have been tested and are now working correctly:

- ✅ Critical Path Optimization: Successfully generates critical CSS for all URLs
- ✅ Framer-Motion Optimization: Successfully optimizes components using framer-motion
- ✅ Master Optimization Tool: Successfully runs all optimization scripts

## Next Steps

1. Run the master optimization script to apply all optimizations:
   ```bash
   node scripts/optimize-all.js
   ```

2. Review the changes made to your files and test your application thoroughly.

3. Clean up backup files after confirming everything works:
   ```bash
   node scripts/cleanup-backups.js
   ```

4. Run Lighthouse to verify performance improvements. 