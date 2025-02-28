const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan for code optimization
  scanDirs: ['app', 'components', 'lib', 'utils'],
  // File extensions to process
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  // Patterns to identify unused code
  patterns: {
    // Find unused imports
    unusedImports: /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g,
    // Find unused variables
    unusedVariables: /const\s+([a-zA-Z0-9_$]+)\s*=\s*[^;]+;\s*(?!\s*\1)/g,
    // Find commented code blocks
    commentedCode: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
  },
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
  // Patterns to ignore
  ignorePatterns: [
    /import\s+.*\s+from\s+['"]react['"]/,  // Don't touch React imports
    /import\s+.*\s+from\s+['"]next\/.+['"]/,  // Don't touch Next.js imports
  ],
};

// Function to check if a file should be processed
function shouldProcessFile(filePath) {
  // Check if file extension is in the list
  const ext = path.extname(filePath);
  if (!config.extensions.includes(ext)) {
    return false;
  }
  
  // Check if file is in ignore list
  for (const ignorePattern of config.ignoreFiles) {
    if (filePath.includes(ignorePattern)) {
      return false;
    }
  }
  
  return true;
}

// Function to find unused imports in a file
function findUnusedImports(content, filePath) {
  const unusedImports = [];
  const importMatches = [...content.matchAll(config.patterns.unusedImports)];
  
  for (const match of importMatches) {
    // Skip if this import should be ignored
    let shouldIgnore = false;
    for (const ignorePattern of config.ignorePatterns) {
      if (ignorePattern.test(match[0])) {
        shouldIgnore = true;
        break;
      }
    }
    
    if (shouldIgnore) {
      continue;
    }
    
    const importedItems = match[1].split(',').map(item => item.trim());
    const importSource = match[2];
    
    for (const item of importedItems) {
      // Skip empty items
      if (!item) continue;
      
      // Extract the actual variable name (handling aliases)
      const variableName = item.includes(' as ') 
        ? item.split(' as ')[1].trim() 
        : item.trim();
      
      // Check if the variable is used elsewhere in the file
      const variableUsageRegex = new RegExp(`[^a-zA-Z0-9_$]${variableName}[^a-zA-Z0-9_$]`, 'g');
      const usageMatches = content.match(variableUsageRegex);
      
      // If there's only one match (the import itself) or no matches, it's unused
      if (!usageMatches || usageMatches.length <= 1) {
        unusedImports.push({
          item,
          source: importSource,
          match: match[0],
        });
      }
    }
  }
  
  return unusedImports;
}

// Function to find unused variables in a file
function findUnusedVariables(content, filePath) {
  const unusedVariables = [];
  const variableMatches = [...content.matchAll(config.patterns.unusedVariables)];
  
  for (const match of variableMatches) {
    const variableName = match[1];
    
    // Check if the variable is used elsewhere in the file
    const variableUsageRegex = new RegExp(`[^a-zA-Z0-9_$]${variableName}[^a-zA-Z0-9_$]`, 'g');
    const usageMatches = content.match(variableUsageRegex);
    
    // If there's only one match (the declaration itself) or no matches, it's unused
    if (!usageMatches || usageMatches.length <= 1) {
      unusedVariables.push({
        name: variableName,
        match: match[0],
      });
    }
  }
  
  return unusedVariables;
}

// Function to find commented code blocks
function findCommentedCode(content, filePath) {
  const commentedBlocks = [];
  const commentMatches = [...content.matchAll(config.patterns.commentedCode)];
  
  for (const match of commentMatches) {
    // Skip short comments (likely not code blocks)
    if (match[0].length < 20) continue;
    
    // Check if the comment contains code-like patterns
    const isCodeLike = /function|const|let|var|if|for|while|return|import|export|class/.test(match[0]);
    
    if (isCodeLike) {
      commentedBlocks.push({
        comment: match[0],
        match: match[0],
      });
    }
  }
  
  return commentedBlocks;
}

// Function to optimize a single file
function optimizeFile(filePath) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find issues
    const unusedImports = findUnusedImports(content, filePath);
    const unusedVariables = findUnusedVariables(content, filePath);
    const commentedCode = findCommentedCode(content, filePath);
    
    // If no issues found, return
    if (unusedImports.length === 0 && unusedVariables.length === 0 && commentedCode.length === 0) {
      return null;
    }
    
    // Create optimization report
    return {
      filePath,
      unusedImports,
      unusedVariables,
      commentedCode,
      totalIssues: unusedImports.length + unusedVariables.length + commentedCode.length,
    };
  } catch (error) {
    console.error(`Error optimizing file ${filePath}:`, error.message);
    return null;
  }
}

// Function to optimize all files in the project
function optimizeProject() {
  console.log('Scanning project for optimization opportunities...');
  
  // Get all files to process
  const files = [];
  for (const dir of config.scanDirs) {
    const dirFiles = glob.sync(`${dir}/**/*.*`);
    files.push(...dirFiles);
  }
  
  console.log(`Found ${files.length} files to scan.`);
  
  // Filter files that should be processed
  const filesToProcess = files.filter(shouldProcessFile);
  console.log(`Processing ${filesToProcess.length} files...`);
  
  // Optimize each file
  const optimizationReports = [];
  for (const file of filesToProcess) {
    const report = optimizeFile(file);
    if (report) {
      optimizationReports.push(report);
    }
  }
  
  // Sort reports by number of issues (most issues first)
  optimizationReports.sort((a, b) => b.totalIssues - a.totalIssues);
  
  // Print summary
  console.log('\nOptimization scan complete!');
  console.log(`Found ${optimizationReports.length} files with potential optimizations.`);
  
  // Print detailed report for top files
  console.log('\nTop files with optimization opportunities:');
  optimizationReports.slice(0, 10).forEach((report, index) => {
    console.log(`\n${index + 1}. ${report.filePath} (${report.totalIssues} issues)`);
    
    if (report.unusedImports.length > 0) {
      console.log(`  Unused imports (${report.unusedImports.length}):`);
      report.unusedImports.slice(0, 5).forEach(imp => {
        console.log(`    - ${imp.item} from '${imp.source}'`);
      });
      if (report.unusedImports.length > 5) {
        console.log(`    ... and ${report.unusedImports.length - 5} more`);
      }
    }
    
    if (report.unusedVariables.length > 0) {
      console.log(`  Unused variables (${report.unusedVariables.length}):`);
      report.unusedVariables.slice(0, 5).forEach(variable => {
        console.log(`    - ${variable.name}`);
      });
      if (report.unusedVariables.length > 5) {
        console.log(`    ... and ${report.unusedVariables.length - 5} more`);
      }
    }
    
    if (report.commentedCode.length > 0) {
      console.log(`  Commented code blocks (${report.commentedCode.length})`);
    }
  });
  
  // Write full report to file
  fs.writeFileSync('code-optimization-report.json', JSON.stringify(optimizationReports, null, 2));
  console.log('\nFull report written to code-optimization-report.json');
  
  // Provide recommendations
  console.log('\nRecommendations:');
  console.log('1. Remove unused imports to reduce bundle size');
  console.log('2. Remove unused variables to improve code clarity');
  console.log('3. Remove commented code blocks to reduce file size');
  console.log('4. Consider using tree shaking for large dependencies');
  console.log('5. Use dynamic imports for components not needed on initial load');
}

// Run the optimization
optimizeProject(); 