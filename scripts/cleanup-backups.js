const fs = require('fs');
const path = require('path');
const glob = require('glob');
const readline = require('readline');

// Configuration
const config = {
  // Directories to scan
  scanDirs: ['app', 'components', 'scripts', 'styles', 'pages', 'lib'],
  // Backup file extension
  backupExtension: '.bak',
  // Default options
  defaultOptions: {
    interactive: true,
    removeAll: false,
    dryRun: false,
  },
};

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to find backup files
function findBackupFiles() {
  const backupFiles = [];
  
  // Get all files to process
  for (const dir of config.scanDirs) {
    if (fs.existsSync(dir)) {
      const dirFiles = glob.sync(`${dir}/**/*${config.backupExtension}`);
      backupFiles.push(...dirFiles);
    }
  }
  
  return backupFiles;
}

// Function to remove a backup file
function removeBackupFile(file) {
  try {
    if (config.defaultOptions.dryRun) {
      console.log(`Would remove: ${file}`);
      return true;
    }
    
    fs.unlinkSync(file);
    console.log(`✅ Removed: ${file}`);
    return true;
  } catch (error) {
    console.error(`❌ Error removing ${file}:`, error.message);
    return false;
  }
}

// Function to restore from a backup file
function restoreFromBackup(backupFile) {
  try {
    const originalFile = backupFile.replace(config.backupExtension, '');
    
    if (config.defaultOptions.dryRun) {
      console.log(`Would restore: ${backupFile} -> ${originalFile}`);
      return true;
    }
    
    // Read backup content
    const backupContent = fs.readFileSync(backupFile, 'utf8');
    
    // Write to original file
    fs.writeFileSync(originalFile, backupContent);
    
    console.log(`✅ Restored: ${backupFile} -> ${originalFile}`);
    
    // Remove backup file
    fs.unlinkSync(backupFile);
    console.log(`✅ Removed backup: ${backupFile}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error restoring from ${backupFile}:`, error.message);
    return false;
  }
}

// Function to process backup files interactively
function processBackupFilesInteractively(backupFiles) {
  if (backupFiles.length === 0) {
    console.log('No backup files found.');
    rl.close();
    return;
  }
  
  console.log(`\nFound ${backupFiles.length} backup files:`);
  backupFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  
  console.log('\nOptions:');
  console.log('1. Remove all backup files');
  console.log('2. Restore all from backups');
  console.log('3. Process files individually');
  console.log('4. Exit');
  
  rl.question('\nEnter your choice (1-4): ', (answer) => {
    const choice = parseInt(answer.trim());
    
    if (choice === 1) {
      // Remove all backup files
      let successCount = 0;
      let errorCount = 0;
      
      for (const file of backupFiles) {
        const success = removeBackupFile(file);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }
      }
      
      console.log(`\n✅ Successfully removed: ${successCount} files`);
      console.log(`❌ Failed to remove: ${errorCount} files`);
      
      rl.close();
    } else if (choice === 2) {
      // Restore all from backups
      let successCount = 0;
      let errorCount = 0;
      
      for (const file of backupFiles) {
        const success = restoreFromBackup(file);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }
      }
      
      console.log(`\n✅ Successfully restored: ${successCount} files`);
      console.log(`❌ Failed to restore: ${errorCount} files`);
      
      rl.close();
    } else if (choice === 3) {
      // Process files individually
      processFilesIndividually(backupFiles, 0);
    } else {
      console.log('Exiting without changes.');
      rl.close();
    }
  });
}

// Function to process files individually
function processFilesIndividually(backupFiles, index) {
  if (index >= backupFiles.length) {
    console.log('\nAll files processed.');
    rl.close();
    return;
  }
  
  const file = backupFiles[index];
  console.log(`\nProcessing file ${index + 1}/${backupFiles.length}: ${file}`);
  console.log('Options:');
  console.log('1. Remove backup file');
  console.log('2. Restore from backup');
  console.log('3. Skip this file');
  console.log('4. Exit');
  
  rl.question('\nEnter your choice (1-4): ', (answer) => {
    const choice = parseInt(answer.trim());
    
    if (choice === 1) {
      // Remove backup file
      removeBackupFile(file);
      processFilesIndividually(backupFiles, index + 1);
    } else if (choice === 2) {
      // Restore from backup
      restoreFromBackup(file);
      processFilesIndividually(backupFiles, index + 1);
    } else if (choice === 3) {
      // Skip this file
      console.log(`Skipping ${file}`);
      processFilesIndividually(backupFiles, index + 1);
    } else {
      console.log('Exiting.');
      rl.close();
    }
  });
}

// Function to process backup files non-interactively
function processBackupFilesNonInteractively(backupFiles) {
  if (backupFiles.length === 0) {
    console.log('No backup files found.');
    return;
  }
  
  console.log(`Found ${backupFiles.length} backup files.`);
  
  if (config.defaultOptions.removeAll) {
    // Remove all backup files
    let successCount = 0;
    let errorCount = 0;
    
    for (const file of backupFiles) {
      const success = removeBackupFile(file);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
    
    console.log(`✅ Successfully removed: ${successCount} files`);
    console.log(`❌ Failed to remove: ${errorCount} files`);
  } else {
    // Just list the files
    backupFiles.forEach(file => {
      console.log(file);
    });
    
    console.log('\nUse --remove-all to remove all backup files.');
  }
}

// Function to parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = { ...config.defaultOptions };
  
  for (const arg of args) {
    if (arg === '--non-interactive' || arg === '-n') {
      options.interactive = false;
    } else if (arg === '--remove-all' || arg === '-r') {
      options.removeAll = true;
    } else if (arg === '--dry-run' || arg === '-d') {
      options.dryRun = true;
    }
  }
  
  return options;
}

// Main function
function main() {
  // Parse command line arguments
  const options = parseArgs();
  Object.assign(config.defaultOptions, options);
  
  console.log('🧹 Backup File Cleanup Tool 🧹');
  console.log('==============================');
  
  if (config.defaultOptions.dryRun) {
    console.log('Running in dry-run mode. No files will be modified.');
  }
  
  // Find backup files
  const backupFiles = findBackupFiles();
  
  if (options.interactive) {
    // Process files interactively
    processBackupFilesInteractively(backupFiles);
  } else {
    // Process files non-interactively
    processBackupFilesNonInteractively(backupFiles);
    rl.close();
  }
}

// Run the main function
main(); 