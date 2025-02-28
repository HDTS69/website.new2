const fs = require('fs');
const path = require('path');

// Directories to check for emptiness
const directoriesToCheck = [
  'public/images/services',
  'public/optimized/images',
  'public/optimized'
];

// Function to check if a directory is empty
function isDirectoryEmpty(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory does not exist: ${dirPath}`);
      return false;
    }
    
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
  } catch (err) {
    console.error(`Error checking if directory is empty: ${dirPath}`, err);
    return false;
  }
}

// Function to remove a directory
function removeDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory does not exist: ${dirPath}`);
      return;
    }
    
    if (!isDirectoryEmpty(dirPath)) {
      console.log(`Directory is not empty: ${dirPath}`);
      return;
    }
    
    fs.rmdirSync(dirPath);
    console.log(`Removed empty directory: ${dirPath}`);
  } catch (err) {
    console.error(`Error removing directory: ${dirPath}`, err);
  }
}

// Check and remove empty directories
console.log("Checking for empty directories...");
for (const dirPath of directoriesToCheck) {
  if (isDirectoryEmpty(dirPath)) {
    removeDirectory(dirPath);
  } else {
    console.log(`Directory is not empty or doesn't exist: ${dirPath}`);
  }
}

console.log("Empty directory cleanup completed!"); 