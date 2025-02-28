const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to format bytes to a human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Function to analyze a directory and its files
function analyzeDirectory(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return { size: 0, files: [] };
  
  let totalSize = 0;
  let files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        const subDir = analyzeDirectory(itemPath, depth + 1, maxDepth);
        totalSize += subDir.size;
        files = files.concat(subDir.files);
      } else {
        const size = stats.size;
        totalSize += size;
        
        // Only include files larger than 50KB to reduce noise
        if (size > 50 * 1024) {
          files.push({
            path: itemPath,
            size: size,
            formattedSize: formatBytes(size)
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error analyzing directory ${dir}:`, error.message);
  }
  
  return { size: totalSize, files };
}

// Function to find duplicate files based on content hash
function findDuplicateFiles(files) {
  const fileHashes = {};
  const duplicates = [];
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file.path);
      const hash = require('crypto').createHash('md5').update(content).digest('hex');
      
      if (fileHashes[hash]) {
        fileHashes[hash].push(file);
        duplicates.push(file);
      } else {
        fileHashes[hash] = [file];
      }
    } catch (error) {
      console.error(`Error reading file ${file.path}:`, error.message);
    }
  }
  
  return Object.values(fileHashes).filter(group => group.length > 1);
}

// Function to analyze JavaScript files for unused exports
function analyzeJsFiles(files) {
  const jsFiles = files.filter(file => file.path.endsWith('.js') || file.path.endsWith('.jsx'));
  const results = [];
  
  for (const file of jsFiles) {
    try {
      const content = fs.readFileSync(file.path, 'utf8');
      
      // Simple regex to find export declarations
      const exportMatches = content.match(/export\s+(const|let|var|function|class|default)\s+([a-zA-Z0-9_$]+)/g) || [];
      
      // Count how many exports are in the file
      if (exportMatches.length > 0) {
        results.push({
          path: file.path,
          size: file.size,
          formattedSize: file.formattedSize,
          exports: exportMatches.length
        });
      }
    } catch (error) {
      console.error(`Error analyzing JS file ${file.path}:`, error.message);
    }
  }
  
  return results;
}

// Main function to run the analysis
async function runAnalysis() {
  console.log('Analyzing Next.js bundle...');
  
  // Check if .next directory exists
  if (!fs.existsSync('.next')) {
    console.log('Building Next.js application first...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to build Next.js application:', error.message);
      return;
    }
  }
  
  // Analyze static chunks
  console.log('\nAnalyzing static chunks...');
  const staticChunksDir = path.join('.next', 'static', 'chunks');
  const staticChunksResult = analyzeDirectory(staticChunksDir);
  
  // Sort files by size (largest first)
  staticChunksResult.files.sort((a, b) => b.size - a.size);
  
  console.log(`\nTotal size of static chunks: ${formatBytes(staticChunksResult.size)}`);
  console.log('\nLargest chunks:');
  staticChunksResult.files.slice(0, 20).forEach((file, index) => {
    console.log(`${index + 1}. ${file.path} (${file.formattedSize})`);
  });
  
  // Find duplicate files
  console.log('\nLooking for duplicate files...');
  const duplicateGroups = findDuplicateFiles(staticChunksResult.files);
  
  if (duplicateGroups.length > 0) {
    console.log(`Found ${duplicateGroups.length} groups of duplicate files:`);
    duplicateGroups.forEach((group, index) => {
      console.log(`\nDuplicate group ${index + 1} (${formatBytes(group[0].size)}):`);
      group.forEach(file => console.log(`- ${file.path}`));
    });
  } else {
    console.log('No duplicate files found.');
  }
  
  // Analyze JS files for unused exports
  console.log('\nAnalyzing JavaScript files for potential dead code...');
  const jsAnalysisResults = analyzeJsFiles(staticChunksResult.files);
  
  // Sort by size
  jsAnalysisResults.sort((a, b) => b.size - a.size);
  
  console.log('\nLargest JavaScript files with exports:');
  jsAnalysisResults.slice(0, 20).forEach((result, index) => {
    console.log(`${index + 1}. ${result.path} (${result.formattedSize}, ${result.exports} exports)`);
  });
  
  // Generate recommendations
  console.log('\nRecommendations for optimization:');
  console.log('1. Consider code splitting for large chunks');
  console.log('2. Check for unused dependencies in package.json');
  console.log('3. Use dynamic imports for components not needed on initial load');
  console.log('4. Implement tree shaking for large libraries');
  console.log('5. Optimize images and other static assets');
  
  // Write analysis to file
  const analysisOutput = {
    totalSize: staticChunksResult.size,
    largestChunks: staticChunksResult.files.slice(0, 50),
    duplicateGroups,
    jsAnalysis: jsAnalysisResults.slice(0, 50)
  };
  
  fs.writeFileSync('bundle-analysis.json', JSON.stringify(analysisOutput, null, 2));
  console.log('\nDetailed analysis written to bundle-analysis.json');
}

// Run the analysis
runAnalysis().catch(error => {
  console.error('Analysis failed:', error);
  process.exit(1);
}); 