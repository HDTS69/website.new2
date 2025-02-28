const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan
  scanDirs: ['app', 'components', 'styles'],
  // File extensions to process
  extensions: ['.css', '.scss', '.module.css', '.module.scss'],
  // Files to ignore
  ignoreFiles: [
    'node_modules',
    '.next',
    'out',
    'dist',
    '.git',
    '.github',
    '.vscode',
  ],
  // PurgeCSS options
  purgeCSS: {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: [
      /^(h-|w-|mt-|mb-|ml-|mr-|pt-|pb-|pl-|pr-|m-|p-)/,
      /^(flex|grid|block|hidden|inline|table)/,
      /^(bg-|text-|border-|rounded-)/,
      /^(hover:|focus:|active:|disabled:)/,
      /^(sm:|md:|lg:|xl:|2xl:)/,
    ],
  },
};

// Check if required packages are installed
function checkDependencies() {
  const requiredPackages = ['purgecss', 'glob'];
  const missingPackages = [];

  for (const pkg of requiredPackages) {
    try {
      require.resolve(pkg);
    } catch (e) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log(`Installing missing packages: ${missingPackages.join(', ')}...`);
    execSync(`npm install --save-dev ${missingPackages.join(' ')}`, { stdio: 'inherit' });
    console.log('Packages installed successfully.');
  }
}

// Find all CSS files
function findCssFiles() {
  const cssFiles = [];

  for (const dir of config.scanDirs) {
    if (fs.existsSync(dir)) {
      const files = glob.sync(`${dir}/**/*.*`);
      
      // Filter files by extension and ignore patterns
      const filteredFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        if (!config.extensions.includes(ext) && !config.extensions.includes(file.slice(file.indexOf('.')))) {
          return false;
        }
        
        for (const ignorePattern of config.ignoreFiles) {
          if (file.includes(ignorePattern)) {
            return false;
          }
        }
        
        return true;
      });
      
      cssFiles.push(...filteredFiles);
    }
  }

  return cssFiles;
}

// Analyze CSS file for unused selectors
async function analyzeCssFile(filePath) {
  try {
    const { PurgeCSS } = require('purgecss');
    
    const purgeCSSResult = await new PurgeCSS().purge({
      content: config.purgeCSS.content,
      css: [filePath],
      defaultExtractor: config.purgeCSS.defaultExtractor,
      safelist: config.purgeCSS.safelist,
    });
    
    if (purgeCSSResult.length === 0) {
      return {
        file: filePath,
        error: 'No CSS content found',
        unused: [],
        originalSize: 0,
        optimizedSize: 0,
        savings: 0,
      };
    }
    
    const result = purgeCSSResult[0];
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const originalSize = originalContent.length;
    const optimizedSize = result.css.length;
    const savings = originalSize - optimizedSize;
    const savingsPercent = (savings / originalSize) * 100;
    
    return {
      file: filePath,
      originalSize,
      optimizedSize,
      savings,
      savingsPercent,
      css: result.css,
    };
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return {
      file: filePath,
      error: error.message,
      unused: [],
      originalSize: 0,
      optimizedSize: 0,
      savings: 0,
    };
  }
}

// Optimize CSS files
async function optimizeCssFiles() {
  console.log('Finding CSS files to optimize...');
  
  // Check dependencies
  checkDependencies();
  
  // Find CSS files
  const cssFiles = findCssFiles();
  console.log(`Found ${cssFiles.length} CSS files to analyze.`);
  
  // Analyze each file
  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const [index, file] of cssFiles.entries()) {
    console.log(`Analyzing file ${index + 1}/${cssFiles.length}: ${file}`);
    
    const result = await analyzeCssFile(file);
    results.push(result);
    
    if (!result.error) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
    }
  }
  
  // Calculate total savings
  const totalSavings = totalOriginalSize - totalOptimizedSize;
  const totalSavingsPercent = (totalSavings / totalOriginalSize) * 100;
  
  // Print summary
  console.log('\nCSS Analysis complete!');
  console.log(`Analyzed ${results.length} CSS files.`);
  console.log(`Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`Total optimized size: ${formatBytes(totalOptimizedSize)}`);
  console.log(`Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent.toFixed(2)}%)`);
  
  // Ask to apply optimizations
  console.log('\nWould you like to apply these optimizations? (y/n)');
  process.stdin.once('data', async (data) => {
    const answer = data.toString().trim().toLowerCase();
    
    if (answer === 'y' || answer === 'yes') {
      await applyOptimizations(results);
    } else {
      console.log('Optimizations not applied. Exiting...');
      process.exit(0);
    }
  });
}

// Apply optimizations to CSS files
async function applyOptimizations(results) {
  console.log('\nApplying optimizations...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const result of results) {
    if (result.error) {
      console.log(`Skipping ${result.file} due to error: ${result.error}`);
      errorCount++;
      continue;
    }
    
    // Skip if savings are minimal (less than 5%)
    if (result.savingsPercent < 5) {
      console.log(`Skipping ${result.file} (savings only ${result.savingsPercent.toFixed(2)}%)`);
      continue;
    }
    
    try {
      // Create backup
      const backupPath = `${result.file}.bak`;
      fs.copyFileSync(result.file, backupPath);
      
      // Write optimized CSS
      fs.writeFileSync(result.file, result.css);
      
      console.log(`✅ Optimized ${result.file} (saved ${result.savingsPercent.toFixed(2)}%)`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error optimizing ${result.file}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\nOptimization complete!');
  console.log(`✅ Successfully optimized: ${successCount} files`);
  console.log(`❌ Failed to optimize: ${errorCount} files`);
  
  // Generate report
  generateReport(results);
  
  process.exit(0);
}

// Generate HTML report
function generateReport(results) {
  const reportData = {
    timestamp: new Date().toISOString(),
    totalFiles: results.length,
    successfulOptimizations: results.filter(r => !r.error && r.savingsPercent >= 5).length,
    totalOriginalSize: results.reduce((sum, r) => sum + (r.originalSize || 0), 0),
    totalOptimizedSize: results.reduce((sum, r) => sum + (r.optimizedSize || 0), 0),
    results: results.map(r => ({
      file: r.file,
      error: r.error,
      originalSize: r.originalSize,
      optimizedSize: r.optimizedSize,
      savings: r.savings,
      savingsPercent: r.savingsPercent,
    })),
  };
  
  // Calculate total savings
  reportData.totalSavings = reportData.totalOriginalSize - reportData.totalOptimizedSize;
  reportData.totalSavingsPercent = (reportData.totalSavings / reportData.totalOriginalSize) * 100;
  
  // Write JSON report
  fs.writeFileSync('css-optimization-report.json', JSON.stringify(reportData, null, 2));
  console.log('Full report written to css-optimization-report.json');
  
  // Generate HTML report
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Optimization Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2 {
      color: #2c3e50;
    }
    .summary {
      background-color: #f8f9fa;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .summary-item {
      margin-bottom: 10px;
    }
    .summary-item strong {
      font-weight: 600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: 600;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .savings-high {
      color: #2ecc71;
    }
    .savings-medium {
      color: #3498db;
    }
    .savings-low {
      color: #e67e22;
    }
    .error {
      color: #e74c3c;
    }
  </style>
</head>
<body>
  <h1>CSS Optimization Report</h1>
  <p>Generated on ${new Date().toLocaleString()}</p>
  
  <div class="summary">
    <div class="summary-item">
      <strong>Total Files Analyzed:</strong> ${reportData.totalFiles}
    </div>
    <div class="summary-item">
      <strong>Successfully Optimized:</strong> ${reportData.successfulOptimizations}
    </div>
    <div class="summary-item">
      <strong>Total Original Size:</strong> ${formatBytes(reportData.totalOriginalSize)}
    </div>
    <div class="summary-item">
      <strong>Total Optimized Size:</strong> ${formatBytes(reportData.totalOptimizedSize)}
    </div>
    <div class="summary-item">
      <strong>Total Savings:</strong> ${formatBytes(reportData.totalSavings)} (${reportData.totalSavingsPercent.toFixed(2)}%)
    </div>
  </div>
  
  <h2>Detailed Results</h2>
  
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Original Size</th>
        <th>Optimized Size</th>
        <th>Savings</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${reportData.results.map(result => {
        let savingsClass = 'savings-low';
        if (result.savingsPercent > 50) savingsClass = 'savings-high';
        else if (result.savingsPercent > 20) savingsClass = 'savings-medium';
        
        let status = `<span class="${savingsClass}">${result.savingsPercent.toFixed(2)}% reduced</span>`;
        if (result.error) {
          status = `<span class="error">Error: ${result.error}</span>`;
        } else if (result.savingsPercent < 5) {
          status = `<span>Minimal savings (${result.savingsPercent.toFixed(2)}%)</span>`;
        }
        
        return `
          <tr>
            <td>${result.file}</td>
            <td>${formatBytes(result.originalSize)}</td>
            <td>${formatBytes(result.optimizedSize)}</td>
            <td class="${savingsClass}">${formatBytes(result.savings)}</td>
            <td>${status}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>
</body>
</html>
  `;
  
  fs.writeFileSync('css-optimization-report.html', html);
  console.log('HTML report written to css-optimization-report.html');
}

// Format bytes to human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run the optimization
optimizeCssFiles().catch(error => {
  console.error('Optimization failed:', error);
  process.exit(1);
}); 