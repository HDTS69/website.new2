const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan for imports
  scanDirs: ['app', 'components'],
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
  // Files that have already been optimized
  optimizedFiles: [
    'app/loading.tsx',
    'app/services/page.tsx',
    'components/ui/Testimonials.tsx',
    'components/ui/LazySparklesCore.tsx',
    'components/ui/motion/LazyMotion.tsx',
  ],
  // Force optimization even if no patterns match
  forceOptimize: false,
  // Patterns to replace
  replacements: [
    // Framer-motion import patterns - more comprehensive
    {
      pattern: /import\s+{\s*motion\s*}\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { LazyMotionDiv } from '@/components/ui/motion/LazyMotion'`
    },
    {
      pattern: /import\s+{\s*motion\s*,\s*AnimatePresence\s*}\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { LazyMotionDiv, LazyAnimatePresence } from '@/components/ui/motion/LazyMotion'`
    },
    {
      pattern: /import\s+{\s*AnimatePresence\s*,\s*motion\s*}\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { LazyAnimatePresence, LazyMotionDiv } from '@/components/ui/motion/LazyMotion'`
    },
    {
      pattern: /import\s+{\s*motion\s*,\s*useAnimation\s*}\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { LazyMotionDiv, useMotion } from '@/components/ui/motion/LazyMotion'`
    },
    {
      pattern: /import\s+{\s*useAnimation\s*,\s*motion\s*}\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { useMotion, LazyMotionDiv } from '@/components/ui/motion/LazyMotion'`
    },
    {
      pattern: /import\s+{\s*useAnimation\s*}\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { useMotion } from '@/components/ui/motion/LazyMotion'`
    },
    {
      pattern: /import\s+motion\s+from\s+['"]framer-motion['"]/g,
      replacement: `import { LazyMotionDiv } from '@/components/ui/motion/LazyMotion'`
    },
    // SparklesCore import patterns
    {
      pattern: /import\s+{\s*SparklesCore\s*}\s+from\s+['"]@\/components\/ui\/SparklesCore['"]/g,
      replacement: `import { LazySparklesCore } from '@/components/ui/LazySparklesCore'`
    },
    {
      pattern: /import\s+{\s*SparklesCore\s*}\s+from\s+['"]@\/components\/ui\/sparkles['"]/g,
      replacement: `import { LazySparklesCore } from '@/components/ui/LazySparklesCore'`
    },
    {
      pattern: /import\s+{\s*SparklesCore\s*}\s+from\s+['"]\.\.\/ui\/SparklesCore['"]/g,
      replacement: `import { LazySparklesCore } from '../ui/LazySparklesCore'`
    },
    {
      pattern: /import\s+{\s*SparklesCore\s*}\s+from\s+['"]\.\/SparklesCore['"]/g,
      replacement: `import { LazySparklesCore } from './LazySparklesCore'`
    },
    {
      pattern: /import\s+SparklesCore\s+from\s+['"]@\/components\/ui\/SparklesCore['"]/g,
      replacement: `import { LazySparklesCore } from '@/components/ui/LazySparklesCore'`
    },
    // Component usage patterns
    {
      pattern: /<SparklesCore/g,
      replacement: `<LazySparklesCore`
    },
    {
      pattern: /<motion\.div/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.div>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.section/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.section>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.span/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.span>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.header/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.header>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.footer/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.footer>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.nav/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.nav>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.ul/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.ul>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.li/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.li>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.button/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.button>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<motion\.a/g,
      replacement: `<LazyMotionDiv`
    },
    {
      pattern: /<\/motion\.a>/g,
      replacement: `</LazyMotionDiv>`
    },
    {
      pattern: /<AnimatePresence/g,
      replacement: `<LazyAnimatePresence`
    },
    {
      pattern: /<\/AnimatePresence>/g,
      replacement: `</LazyAnimatePresence>`
    },
    // Variable usage patterns
    {
      pattern: /const\s+(\w+)\s*=\s*useAnimation\(\)/g,
      replacement: `const { useAnimation } = useMotion();\n  const $1 = useAnimation ? useAnimation() : null`
    }
  ]
};

// Function to find files with framer-motion imports
function findFilesToOptimize() {
  const filesToOptimize = [];
  
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
    
    // Skip already optimized files
    if (config.optimizedFiles.includes(file)) {
      return false;
    }
    
    return true;
  });
  
  console.log(`Scanning ${filesToProcess.length} files for framer-motion imports...`);
  
  // Process each file
  for (const file of filesToProcess) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for framer-motion imports or SparklesCore
      if (
        content.includes('framer-motion') || 
        content.includes('SparklesCore') || 
        content.includes('motion.') || 
        content.includes('<motion') ||
        content.includes('AnimatePresence') ||
        content.includes('useAnimation')
      ) {
        filesToOptimize.push(file);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }
  
  return filesToOptimize;
}

// Function to optimize a file
function optimizeFile(file) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let modified = false;
    
    // Apply replacements
    for (const { pattern, replacement } of config.replacements) {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }
    
    // Check if useAnimation is used but not properly replaced
    if (content.includes('useAnimation(') && !content.includes('useMotion')) {
      // Add useState and useEffect imports if not already present
      if (!content.includes('useState')) {
        if (content.includes('import React')) {
          content = content.replace(/import React(.*?)from ['"]react['"]/g, "import React$1, { useState, useEffect } from 'react'");
        } else if (content.includes('import {')) {
          content = content.replace(/import {(.*?)} from ['"]react['"]/g, "import { $1, useState, useEffect } from 'react'");
        } else if (content.includes('from \'react\'')) {
          content = content.replace(/import (.*?) from ['"]react['"]/g, "import $1, { useState, useEffect } from 'react'");
        } else {
          // If still not added, add it at the top
          content = "import { useState, useEffect } from 'react';\n" + content;
        }
      }
      
      // Add useMotion import if not already present
      if (!content.includes('useMotion')) {
        content = content.replace(/import {(.*?)} from ['"]framer-motion['"]/g, 
          "import { useMotion } from '@/components/ui/motion/LazyMotion';\n// Original framer-motion import replaced\n// import {$1} from 'framer-motion'");
      }
      
      // Replace useAnimation with useMotion hook
      content = content.replace(/const\s+(\w+)\s*=\s*useAnimation\(\)/g, 
        `const { useAnimation } = useMotion();\n  const $1 = useAnimation ? useAnimation() : null`);
      
      modified = true;
    }
    
    // Force optimization if needed
    if (config.forceOptimize && !modified && (
      content.includes('framer-motion') || 
      content.includes('motion.') || 
      content.includes('<motion') ||
      content.includes('AnimatePresence')
    )) {
      // Add a comment to indicate manual review is needed
      content = `// TODO: This file contains framer-motion code that couldn't be automatically optimized
// Please manually update to use LazyMotion components
${content}`;
      modified = true;
    }
    
    if (modified) {
      // Create backup of original file
      fs.writeFileSync(`${file}.bak`, originalContent);
      
      // Write optimized content
      fs.writeFileSync(file, content);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error optimizing file ${file}:`, error.message);
    return false;
  }
}

// Function to parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  
  for (const arg of args) {
    if (arg === '--force' || arg === '-f') {
      config.forceOptimize = true;
    }
  }
}

// Main function
function applyMotionOptimizations() {
  console.log('Finding files to optimize...');
  
  // Parse command line arguments
  parseArgs();
  
  // Find files to optimize
  const filesToOptimize = findFilesToOptimize();
  
  console.log(`Found ${filesToOptimize.length} files to optimize.`);
  
  // Optimize each file
  let optimizedCount = 0;
  for (const file of filesToOptimize) {
    console.log(`Optimizing ${file}...`);
    
    const optimized = optimizeFile(file);
    
    if (optimized) {
      optimizedCount++;
      console.log(`✅ Optimized ${file}`);
    } else {
      console.log(`⚠️ No changes made to ${file}`);
    }
  }
  
  console.log(`\nOptimized ${optimizedCount} out of ${filesToOptimize.length} files.`);
  console.log('Backup files created with .bak extension.');
  console.log('Please review the changes and test your application thoroughly.');
}

// Run the optimization
applyMotionOptimizations(); 