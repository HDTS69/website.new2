const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan for imports
  scanDirs: ['app', 'components', 'lib', 'utils', 'pages'],
  // File extensions to process
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  // Dependencies to never remove (core dependencies)
  coreDependencies: [
    'react',
    'react-dom',
    'next',
    '@types/react',
    '@types/react-dom',
    '@types/node',
    'typescript',
    'eslint',
    'eslint-config-next',
  ],
  // Files to ignore
  ignoreFiles: [
    'node_modules',
    '.next',
    'public',
    'out',
    'dist',
    '.git',
    '.github',
    '.vscode',
  ],
};

// Function to get all dependencies from package.json
function getDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};
    
    return {
      dependencies,
      devDependencies,
      allDependencies: { ...dependencies, ...devDependencies },
    };
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    return { dependencies: {}, devDependencies: {}, allDependencies: {} };
  }
}

// Function to find all imports in the codebase
function findAllImports() {
  const imports = new Set();
  
  // Get all files to process
  const files = [];
  for (const dir of config.scanDirs) {
    if (fs.existsSync(dir)) {
      const dirFiles = glob.sync(`${dir}/**/*.*`);
      files.push(...dirFiles);
    }
  }
  
  // Filter files by extension and ignore patterns
  const filesToProcess = files.filter(file => {
    const ext = path.extname(file);
    if (!config.extensions.includes(ext)) {
      return false;
    }
    
    for (const ignorePattern of config.ignoreFiles) {
      if (file.includes(ignorePattern)) {
        return false;
      }
    }
    
    return true;
  });
  
  console.log(`Scanning ${filesToProcess.length} files for imports...`);
  
  // Process each file
  for (const file of filesToProcess) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Find all import statements
      const importRegex = /import\s+(?:.+\s+from\s+)?['"]([^'"]+)['"]/g;
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        
        // Skip relative imports
        if (importPath.startsWith('.') || importPath.startsWith('/')) {
          continue;
        }
        
        // Extract the package name (handle scoped packages and subpaths)
        let packageName = importPath;
        
        // Handle scoped packages
        if (packageName.startsWith('@')) {
          // Extract the scope and the package name (e.g., @scope/package)
          const parts = packageName.split('/');
          if (parts.length >= 2) {
            packageName = `${parts[0]}/${parts[1]}`;
          }
        } else {
          // Extract just the package name (e.g., package/subpath -> package)
          packageName = packageName.split('/')[0];
        }
        
        imports.add(packageName);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }
  
  return Array.from(imports);
}

// Function to find unused dependencies
function findUnusedDependencies() {
  // Get all dependencies from package.json
  const { dependencies, devDependencies, allDependencies } = getDependencies();
  
  // Find all imports in the codebase
  const imports = findAllImports();
  
  console.log(`Found ${imports.length} unique package imports in the codebase.`);
  
  // Find unused dependencies
  const unusedDependencies = [];
  const unusedDevDependencies = [];
  
  for (const dep in dependencies) {
    // Skip core dependencies
    if (config.coreDependencies.includes(dep)) {
      continue;
    }
    
    if (!imports.includes(dep)) {
      unusedDependencies.push(dep);
    }
  }
  
  for (const dep in devDependencies) {
    // Skip core dependencies
    if (config.coreDependencies.includes(dep)) {
      continue;
    }
    
    if (!imports.includes(dep)) {
      unusedDevDependencies.push(dep);
    }
  }
  
  return {
    unusedDependencies,
    unusedDevDependencies,
  };
}

// Function to check for duplicate dependencies
function findDuplicateDependencies() {
  try {
    // Run npm ls to find duplicate dependencies
    const output = execSync('npm ls --json --depth=0', { encoding: 'utf8' });
    const npmLsResult = JSON.parse(output);
    
    const duplicates = [];
    
    // Check for dependencies with multiple versions
    if (npmLsResult.dependencies) {
      for (const [name, info] of Object.entries(npmLsResult.dependencies)) {
        if (info.problems) {
          const versionProblems = info.problems.filter(problem => 
            problem.includes('multiple versions') || problem.includes('extraneous')
          );
          
          if (versionProblems.length > 0) {
            duplicates.push({
              name,
              problems: versionProblems,
            });
          }
        }
      }
    }
    
    return duplicates;
  } catch (error) {
    // npm ls might exit with non-zero code if there are problems
    try {
      const output = error.stdout.toString();
      const npmLsResult = JSON.parse(output);
      
      const duplicates = [];
      
      // Check for dependencies with multiple versions
      if (npmLsResult.dependencies) {
        for (const [name, info] of Object.entries(npmLsResult.dependencies)) {
          if (info.problems) {
            const versionProblems = info.problems.filter(problem => 
              problem.includes('multiple versions') || problem.includes('extraneous')
            );
            
            if (versionProblems.length > 0) {
              duplicates.push({
                name,
                problems: versionProblems,
              });
            }
          }
        }
      }
      
      return duplicates;
    } catch (parseError) {
      console.error('Error parsing npm ls output:', parseError.message);
      return [];
    }
  }
}

// Function to find large dependencies
function findLargeDependencies() {
  try {
    // Run npm list to get dependency sizes
    const output = execSync('du -sh ./node_modules/* ./node_modules/@*/* | sort -hr', { encoding: 'utf8' });
    
    // Parse the output
    const lines = output.trim().split('\n');
    const dependencies = [];
    
    for (const line of lines) {
      const [size, path] = line.trim().split(/\s+/);
      
      // Extract package name from path
      let packageName = path.replace('./node_modules/', '');
      
      // Skip non-package entries
      if (!packageName || packageName.includes('.')) {
        continue;
      }
      
      dependencies.push({
        name: packageName,
        size,
      });
    }
    
    return dependencies.slice(0, 20); // Return top 20 largest dependencies
  } catch (error) {
    console.error('Error finding large dependencies:', error.message);
    return [];
  }
}

// Main function to analyze dependencies
function analyzeDependencies() {
  console.log('Analyzing dependencies...');
  
  // Find unused dependencies
  const { unusedDependencies, unusedDevDependencies } = findUnusedDependencies();
  
  console.log('\nUnused dependencies:');
  if (unusedDependencies.length === 0) {
    console.log('  None found');
  } else {
    unusedDependencies.forEach(dep => console.log(`  - ${dep}`));
  }
  
  console.log('\nUnused dev dependencies:');
  if (unusedDevDependencies.length === 0) {
    console.log('  None found');
  } else {
    unusedDevDependencies.forEach(dep => console.log(`  - ${dep}`));
  }
  
  // Find duplicate dependencies
  const duplicates = findDuplicateDependencies();
  
  console.log('\nDuplicate dependencies:');
  if (duplicates.length === 0) {
    console.log('  None found');
  } else {
    duplicates.forEach(dup => {
      console.log(`  - ${dup.name}:`);
      dup.problems.forEach(problem => console.log(`    - ${problem}`));
    });
  }
  
  // Find large dependencies
  const largeDependencies = findLargeDependencies();
  
  console.log('\nLargest dependencies:');
  largeDependencies.forEach((dep, index) => {
    console.log(`  ${index + 1}. ${dep.name} (${dep.size})`);
  });
  
  // Generate recommendations
  console.log('\nRecommendations:');
  
  if (unusedDependencies.length > 0 || unusedDevDependencies.length > 0) {
    console.log('1. Remove unused dependencies:');
    
    if (unusedDependencies.length > 0) {
      console.log(`   npm uninstall ${unusedDependencies.join(' ')}`);
    }
    
    if (unusedDevDependencies.length > 0) {
      console.log(`   npm uninstall --save-dev ${unusedDevDependencies.join(' ')}`);
    }
  }
  
  if (duplicates.length > 0) {
    console.log('2. Fix duplicate dependencies:');
    console.log('   npm dedupe');
    console.log('   npm prune');
  }
  
  console.log('3. Consider alternatives for large dependencies:');
  largeDependencies.slice(0, 5).forEach(dep => {
    console.log(`   - ${dep.name} (${dep.size})`);
  });
  
  // Write report to file
  const report = {
    unusedDependencies,
    unusedDevDependencies,
    duplicates,
    largeDependencies,
  };
  
  fs.writeFileSync('dependency-analysis.json', JSON.stringify(report, null, 2));
  console.log('\nFull report written to dependency-analysis.json');
}

// Run the analysis
analyzeDependencies(); 