const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan for imports
  scanDirs: ['app', 'components', 'lib', 'utils'],
  // File extensions to process
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
  // Libraries to optimize
  libraries: [
    {
      name: 'framer-motion',
      imports: ['motion', 'AnimatePresence', 'useAnimation', 'useMotionValue', 'useTransform'],
      template: (importName) => `
// Dynamic import for ${importName} from framer-motion
const [${importName}, set${importName.charAt(0).toUpperCase() + importName.slice(1)}] = useState(null);

useEffect(() => {
  // Import only when component is mounted
  let isMounted = true;
  import('framer-motion').then((mod) => {
    if (isMounted) {
      set${importName.charAt(0).toUpperCase() + importName.slice(1)}(() => mod.${importName});
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);

// Make sure ${importName} is loaded before using it
if (!${importName}) return <div>Loading...</div>;
`
    }
  ]
};

// Function to find files with direct imports
function findFilesWithDirectImports() {
  const filesWithImports = [];
  
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
  
  console.log(`Scanning ${filesToProcess.length} files for direct imports...`);
  
  // Process each file
  for (const file of filesToProcess) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      for (const library of config.libraries) {
        // Check for direct imports of the library
        const importRegex = new RegExp(`import\\s+{\\s*([^}]+)\\s*}\\s+from\\s+['"]${library.name}['"]`, 'g');
        let match;
        
        while ((match = importRegex.exec(content)) !== null) {
          const importedItems = match[1].split(',').map(item => item.trim());
          
          // Check if any of the imported items are in the list of imports to optimize
          const itemsToOptimize = importedItems.filter(item => 
            library.imports.some(libItem => item === libItem || item.startsWith(`${libItem} as`))
          );
          
          if (itemsToOptimize.length > 0) {
            filesWithImports.push({
              file,
              library: library.name,
              importedItems: itemsToOptimize,
              fullMatch: match[0],
              template: library.template
            });
            break; // Only add the file once per library
          }
        }
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }
  
  return filesWithImports;
}

// Function to generate optimization suggestions
function generateOptimizationSuggestions(filesWithImports) {
  const suggestions = [];
  
  for (const fileInfo of filesWithImports) {
    const { file, library, importedItems, fullMatch, template } = fileInfo;
    
    // Generate suggestion for each imported item
    for (const item of importedItems) {
      const cleanItem = item.split(' as ')[0].trim();
      
      suggestions.push({
        file,
        library,
        importedItem: cleanItem,
        currentImport: fullMatch,
        suggestedReplacement: template(cleanItem)
      });
    }
  }
  
  return suggestions;
}

// Function to generate a report
function generateReport(filesWithImports, suggestions) {
  console.log('\nFiles with direct imports:');
  
  const filesByLibrary = {};
  
  for (const fileInfo of filesWithImports) {
    const { file, library, importedItems } = fileInfo;
    
    if (!filesByLibrary[library]) {
      filesByLibrary[library] = [];
    }
    
    filesByLibrary[library].push({
      file,
      importedItems
    });
  }
  
  for (const [library, files] of Object.entries(filesByLibrary)) {
    console.log(`\n${library}:`);
    
    for (const fileInfo of files) {
      console.log(`  ${fileInfo.file}`);
      console.log(`    Imported items: ${fileInfo.importedItems.join(', ')}`);
    }
  }
  
  console.log('\nOptimization suggestions:');
  
  for (const suggestion of suggestions.slice(0, 5)) { // Show only first 5 suggestions
    console.log(`\nFile: ${suggestion.file}`);
    console.log(`Current import: ${suggestion.currentImport}`);
    console.log('Suggested replacement:');
    console.log(suggestion.suggestedReplacement);
  }
  
  if (suggestions.length > 5) {
    console.log(`\n... and ${suggestions.length - 5} more suggestions.`);
  }
  
  // Write full report to file
  const report = {
    filesWithImports,
    suggestions
  };
  
  fs.writeFileSync('framer-motion-optimization.json', JSON.stringify(report, null, 2));
  console.log('\nFull report written to framer-motion-optimization.json');
}

// Main function
function optimizeFramerMotion() {
  console.log('Analyzing framer-motion imports...');
  
  // Find files with direct imports
  const filesWithImports = findFilesWithDirectImports();
  
  // Generate optimization suggestions
  const suggestions = generateOptimizationSuggestions(filesWithImports);
  
  // Generate report
  generateReport(filesWithImports, suggestions);
  
  console.log(`\nFound ${filesWithImports.length} files with direct imports.`);
  console.log(`Generated ${suggestions.length} optimization suggestions.`);
  
  console.log('\nTo optimize your codebase:');
  console.log('1. Review the suggestions in framer-motion-optimization.json');
  console.log('2. For each file, replace the direct imports with dynamic imports');
  console.log('3. Make sure to add the necessary useState and useEffect hooks');
  console.log('4. Test your application thoroughly after making changes');
}

// Run the optimization
optimizeFramerMotion(); 