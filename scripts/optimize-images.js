const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');
const sharp = require('sharp');

// Configuration
const config = {
  // Source directories to scan for images
  sourceDirs: ['public/images'],
  // Output formats to generate
  formats: ['webp', 'avif'],
  // Quality settings (0-100)
  quality: {
    webp: 80,
    avif: 65,
    jpeg: 85,
  },
  // Resize large images
  maxWidth: 1920,
  // Skip already processed images
  skipExisting: true,
};

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Sharp is not installed. Installing now...');
  execSync('npm install sharp --save-dev', { stdio: 'inherit' });
  console.log('Sharp installed successfully.');
}

// Function to find all images in the project
function findImages() {
  const images = [];
  
  // Get all files to process
  for (const dir of config.sourceDirs) {
    if (fs.existsSync(dir)) {
      const dirFiles = glob.sync(`${dir}/**/*.*`);
      
      // Filter files by extension and ignore patterns
      const imageFiles = dirFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        if (!config.formats.includes(ext)) {
          return false;
        }
        
        return true;
      });
      
      images.push(...imageFiles);
    }
  }
  
  return images;
}

// Function to get image dimensions
async function getImageDimensions(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    };
  } catch (error) {
    console.error(`Error getting dimensions for ${imagePath}:`, error.message);
    return null;
  }
}

// Function to optimize a single image
async function optimizeImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    const supportedExts = ['.jpg', '.jpeg', '.png'];
    
    // Skip unsupported formats
    if (!supportedExts.includes(ext)) {
      console.log(`Skipping unsupported format: ${imagePath}`);
        return;
      }

    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    
    // Skip if image is already optimized
    if (metadata.width <= config.maxWidth) {
      console.log(`Image already optimized: ${imagePath}`);
        return;
      }

    // Base image processing
    let pipeline = sharp(imagePath);
    
    // Resize if needed
    if (metadata.width > config.maxWidth) {
      pipeline = pipeline.resize(config.maxWidth);
    }
    
    // Generate optimized versions
    for (const format of config.formats) {
      const outputPath = imagePath.replace(ext, `.${format}`);
      
      // Skip if file exists and skipExisting is true
      if (config.skipExisting && fs.existsSync(outputPath)) {
        console.log(`Skipping existing file: ${outputPath}`);
        continue;
      }
      
      // Process based on format
      if (format === 'webp') {
        await pipeline.webp({ quality: config.quality.webp }).toFile(outputPath);
      } else if (format === 'avif') {
        await pipeline.avif({ quality: config.quality.avif }).toFile(outputPath);
      }
      
      console.log(`Generated: ${outputPath}`);
    }
    
    // Also optimize the original JPEG/PNG if needed
    if (ext === '.jpg' || ext === '.jpeg') {
      const optimizedPath = imagePath.replace(ext, '.opt.jpg');
      await pipeline.jpeg({ quality: config.quality.jpeg }).toFile(optimizedPath);
      
      // Replace original with optimized version
      fs.renameSync(optimizedPath, imagePath);
      console.log(`Optimized original: ${imagePath}`);
    } else if (ext === '.png') {
      const optimizedPath = imagePath.replace(ext, '.opt.png');
      await pipeline.png({ quality: config.quality.jpeg }).toFile(optimizedPath);
      
      // Replace original with optimized version
      fs.renameSync(optimizedPath, imagePath);
      console.log(`Optimized original: ${imagePath}`);
    }
            } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
  }
}

// Function to optimize all images
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Process each source directory
  for (const sourceDir of config.sourceDirs) {
    // Find all images
    const images = glob.sync(`${sourceDir}/**/*.{jpg,jpeg,png}`, { nocase: true });
    console.log(`Found ${images.length} images in ${sourceDir}`);
    
    // Process each image
    for (const image of images) {
      await optimizeImage(image);
    }
  }
  
  console.log('Image optimization complete!');
}

// Function to format bytes to a human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Function to generate HTML report
function generateHtmlReport(report) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Optimization Report</title>
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
  </style>
</head>
<body>
  <h1>Image Optimization Report</h1>
  
  <div class="summary">
    <div class="summary-item">
      <strong>Total Images:</strong> ${report.totalImages}
    </div>
    <div class="summary-item">
      <strong>Optimized Images:</strong> ${report.optimizedImages}
    </div>
    <div class="summary-item">
      <strong>Total Savings:</strong> ${formatBytes(report.totalSavings)} (${report.totalSavingsPercent.toFixed(2)}%)
    </div>
  </div>
  
  <h2>Detailed Results</h2>
  
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Dimensions</th>
        <th>Format</th>
        <th>Original Size</th>
        <th>New Size</th>
        <th>Savings</th>
      </tr>
    </thead>
    <tbody>
      ${report.results.map(result => {
        return result.results.map(formatResult => {
          const savingsClass = formatResult.savingsPercent > 50 ? 'savings-high' : 
                              formatResult.savingsPercent > 20 ? 'savings-medium' : 'savings-low';
          
          return `
            <tr>
              <td>${result.path}</td>
              <td>${result.dimensions.width}x${result.dimensions.height}</td>
              <td>${formatResult.format}</td>
              <td>${formatBytes(formatResult.originalSize)}</td>
              <td>${formatBytes(formatResult.newSize)}</td>
              <td class="${savingsClass}">${formatBytes(formatResult.savings)} (${formatResult.savingsPercent.toFixed(2)}%)</td>
            </tr>
          `;
        }).join('');
      }).join('')}
    </tbody>
  </table>
</body>
</html>
  `;
  
  fs.writeFileSync('image-optimization-report.html', html);
  console.log('HTML report written to image-optimization-report.html');
}

// Run the optimization
optimizeImages().catch(error => {
  console.error('Error during image optimization:', error);
  process.exit(1);
}); 