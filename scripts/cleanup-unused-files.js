const fs = require('fs');
const path = require('path');

// Files to keep (referenced in the codebase)
const filesToKeep = [
  // Hero images
  'public/images/hayden-hero-1.webp',
  'public/images/hayden-hero-mobile.webp',
  
  // Logo images
  'public/images/icon-logo.png',
  'public/images/text-logo.png',
  
  // Auth background
  'public/images/auth-bg.svg',
  
  // Placeholder service image
  'public/images/placeholder-service.jpg',
  
  // Brand images directory (used in BrandCarousel)
  'public/images/brand-images',
  
  // Instagram data
  'public/data/instagram.json',
  
  // Favicon files
  'public/favicon.ico',
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/site.webmanifest',
  
  // Other necessary files
  'public/robots.txt',
  'public/sitemap.xml',
  'public/google.svg',
  'public/grid.svg'
];

// Files to delete (unused in the codebase)
const filesToDelete = [
  // Van image (large file, only used in one place)
  'public/images/van.png',
  
  // Apple touch icon (no longer needed)
  'public/apple-touch-icon.png',
  
  // Service images (empty files)
  'public/images/services/air-conditioning.jpg',
  'public/images/services/air-conditioning.png',
  'public/images/services/gas-fitting.jpg',
  'public/images/services/gas-fitting.png',
  'public/images/services/plumbing.jpg',
  'public/images/services/plumbing.png',
  'public/images/services/roof-repairs.jpg',
  'public/images/services/roof-repairs.png',
  
  // Optimized cache
  'public/optimized/.cache.json'
];

// Function to check if a file should be kept
function shouldKeepFile(filePath) {
  // Keep directories in the keep list
  for (const keepPath of filesToKeep) {
    if (fs.existsSync(keepPath) && fs.statSync(keepPath).isDirectory()) {
      if (filePath.startsWith(keepPath)) {
        return true;
      }
    }
  }
  
  // Keep specific files
  return filesToKeep.includes(filePath);
}

// Function to delete a file or directory
function deleteFileOrDirectory(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${filePath}`);
      return;
    }
    
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Check if we should keep this directory
      if (filesToKeep.includes(filePath)) {
        console.log(`Keeping directory: ${filePath}`);
        return;
      }
      
      // Delete directory contents
      const files = fs.readdirSync(filePath);
      for (const file of files) {
        const curPath = path.join(filePath, file);
        deleteFileOrDirectory(curPath);
      }
      
      // Delete empty directory
      fs.rmdirSync(filePath);
      console.log(`Deleted directory: ${filePath}`);
    } else {
      // Check if we should keep this file
      if (shouldKeepFile(filePath)) {
        console.log(`Keeping file: ${filePath}`);
        return;
      }
      
      // Delete file
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error deleting ${filePath}:`, err);
  }
}

// Delete specific files
console.log("Deleting unused files...");
for (const filePath of filesToDelete) {
  deleteFileOrDirectory(filePath);
}

console.log("Cleanup completed!"); 