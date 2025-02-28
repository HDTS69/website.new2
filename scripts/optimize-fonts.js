const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  // Directories to scan
  scanDirs: ['app', 'components', 'pages'],
  // File extensions to process
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
  // Font optimization patterns
  patterns: {
    // Find Google Fonts imports
    googleFonts: {
      regex: /<link\s+[^>]*href=["']https?:\/\/fonts\.googleapis\.com\/[^"']+["'][^>]*>/g,
      replacement: (match) => {
        // Extract font information
        const hrefMatch = match.match(/href=["']([^"']+)["']/);
        if (!hrefMatch) return match;
        
        const href = hrefMatch[1];
        
        // Create preconnect links
        return `
<!-- Optimized Google Fonts with preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${match.replace(/rel=["'][^"']*["']/, 'rel="preload" as="style"')}
<noscript>${match}</noscript>
<script>
  // Optimize font loading
  (function() {
    const fontLink = document.querySelector('link[href="${href}"][rel="preload"]');
    if (fontLink) {
      fontLink.onload = function() {
        fontLink.rel = "stylesheet";
      };
    }
  })();
</script>
`;
      },
    },
    // Find @import font statements in CSS
    importFonts: {
      regex: /@import\s+url\(['"]https?:\/\/fonts\.googleapis\.com\/[^'"]+['"]\);/g,
      replacement: (match) => {
        // Extract URL
        const urlMatch = match.match(/url\(['"]([^'"]+)['"]\)/);
        if (!urlMatch) return match;
        
        const url = urlMatch[1];
        
        // Create optimized version
        return `/* Optimized font loading */
/* Original: ${match} */
@font-face {
  font-family: 'OptimizedGoogleFont';
  font-display: swap;
  src: url('${url}');
}`;
      },
    },
    // Find Next.js Font imports
    nextFonts: {
      regex: /import\s+{\s*([^}]+)\s*}\s+from\s+['"]next\/font\/(google|local)['"]/g,
      replacement: (match, imports, fontType) => {
        // Keep the import but add a comment
        return `// Optimized font loading with next/font/${fontType}
${match}`;
      },
    },
    // Find font-face declarations
    fontFace: {
      regex: /@font-face\s*{[^}]*}/g,
      replacement: (match) => {
        // Add font-display: swap if not present
        if (!match.includes('font-display')) {
          return match.replace(/}/, 'font-display: swap;\n}');
        }
        return match;
      },
    },
  },
  // Font preloading for critical fonts
  criticalFonts: [
    {
      name: 'Main heading font',
      files: [
        // Add paths to your critical font files here
        // Example: '/fonts/main-heading.woff2'
      ],
    },
  ],
};

// Function to find files to process
function findFiles() {
  const filesToProcess = [];
  
  for (const dir of config.scanDirs) {
    if (fs.existsSync(dir)) {
      const files = glob.sync(`${dir}/**/*.*`);
      
      // Filter files by extension and ignore patterns
      const filteredFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
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
      
      filesToProcess.push(...filteredFiles);
    }
  }
  
  return filesToProcess;
}

// Function to find CSS files
function findCssFiles() {
  const cssFiles = [];
  
  for (const dir of config.scanDirs) {
    if (fs.existsSync(dir)) {
      const files = glob.sync(`${dir}/**/*.{css,scss}`);
      
      // Filter files by ignore patterns
      const filteredFiles = files.filter(file => {
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

// Function to optimize a file
function optimizeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let optimizedContent = content;
    let changes = 0;
    
    // Apply each pattern
    for (const [patternName, pattern] of Object.entries(config.patterns)) {
      const { regex, replacement } = pattern;
      
      // Count matches
      const matches = optimizedContent.match(regex) || [];
      
      // Apply replacement
      if (matches.length > 0) {
        optimizedContent = optimizedContent.replace(regex, replacement);
        changes += matches.length;
      }
    }
    
    return {
      file: filePath,
      originalContent: content,
      optimizedContent,
      changes,
    };
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
    return {
      file: filePath,
      error: error.message,
      changes: 0,
    };
  }
}

// Function to create a preload component for critical fonts
function createPreloadComponent() {
  const componentPath = path.join('components', 'FontPreload.js');
  const componentDir = path.dirname(componentPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  const componentContent = `// FontPreload.js - Optimizes font loading
import React from 'react';

export function FontPreload() {
  return (
    <>
      {/* Preconnect to font providers */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical fonts */}
      ${config.criticalFonts.map(font => 
        font.files.map(file => 
          `<link rel="preload" href="${file}" as="font" type="${getTypeFromExtension(file)}" crossOrigin="anonymous" />`
        ).join('\n      ')
      ).join('\n      ')}
    </>
  );
}

export default FontPreload;
`;

  try {
    fs.writeFileSync(componentPath, componentContent);
    console.log(`✅ Created FontPreload component at ${componentPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating FontPreload component:`, error.message);
    return false;
  }
}

// Function to get MIME type from file extension
function getTypeFromExtension(file) {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case '.woff2':
      return 'font/woff2';
    case '.woff':
      return 'font/woff';
    case '.ttf':
      return 'font/ttf';
    case '.otf':
      return 'font/otf';
    case '.eot':
      return 'application/vnd.ms-fontobject';
    default:
      return 'font/woff2';
  }
}

// Function to create a font optimization guide
function createFontOptimizationGuide() {
  const guidePath = 'FONT-OPTIMIZATION.md';
  
  const guideContent = `# Font Optimization Guide

## Best Practices for Font Loading

### 1. Use \`next/font\` for Next.js Applications

Next.js provides built-in font optimization through the \`next/font\` module:

\`\`\`jsx
import { Inter } from 'next/font/google';

// Configure the font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Use in your component
function MyComponent() {
  return (
    <div className={inter.className}>
      This text uses the Inter font
    </div>
  );
}
\`\`\`

### 2. Use Font Display Swap

Always use \`font-display: swap\` to ensure text remains visible during font loading:

\`\`\`css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Critical for performance */
}
\`\`\`

### 3. Preload Critical Fonts

Add preload links for critical fonts in your document head:

\`\`\`html
<link 
  rel="preload" 
  href="/fonts/critical-font.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin="anonymous" 
/>
\`\`\`

### 4. Use the FontPreload Component

Import and use the \`FontPreload\` component in your app's layout or document:

\`\`\`jsx
import FontPreload from '../components/FontPreload';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontPreload />
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### 5. Optimize Google Fonts

When using Google Fonts, add preconnect links:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
\`\`\`

### 6. Self-host Fonts When Possible

Self-hosting fonts eliminates third-party requests:

1. Download the font files (woff2 format is preferred)
2. Place them in your public directory
3. Create @font-face declarations in your CSS
4. Use the font in your styles

### 7. Subset Fonts

Only include the character sets you need:

\`\`\`jsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'], // Only include Latin characters
  weight: ['400', '700'], // Only include regular and bold weights
});
\`\`\`

### 8. Use Variable Fonts

Variable fonts can reduce the number of font files needed:

\`\`\`css
@font-face {
  font-family: 'CustomVariable';
  src: url('/fonts/custom-variable.woff2') format('woff2-variations');
  font-weight: 100 900; /* Supports all weights between 100 and 900 */
  font-style: normal;
  font-display: swap;
}
\`\`\`

### 9. Implement Font Loading Strategies

Consider using the Font Loading API for more control:

\`\`\`js
// Font loading with fallback
const fontFaceSet = document.fonts;
const font = new FontFace('CustomFont', 'url(/fonts/custom.woff2)', {
  display: 'swap',
  weight: '400',
});

font.load().then(() => {
  fontFaceSet.add(font);
  document.documentElement.classList.add('font-loaded');
}).catch(err => {
  console.error('Font loading failed:', err);
});
\`\`\`

### 10. Monitor Font Performance

Use Lighthouse and WebPageTest to monitor font loading performance.
`;

  try {
    fs.writeFileSync(guidePath, guideContent);
    console.log(`✅ Created font optimization guide at ${guidePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating font optimization guide:`, error.message);
    return false;
  }
}

// Function to update _document.js or layout.js to include FontPreload
function updateDocumentOrLayout() {
  // Check for _document.js (Pages Router)
  const documentPath = path.join('pages', '_document.js');
  // Check for layout.js (App Router)
  const layoutPath = path.join('app', 'layout.js');
  const layoutTsPath = path.join('app', 'layout.tsx');
  
  let targetPath = null;
  let isAppRouter = false;
  
  if (fs.existsSync(documentPath)) {
    targetPath = documentPath;
  } else if (fs.existsSync(layoutPath)) {
    targetPath = layoutPath;
    isAppRouter = true;
  } else if (fs.existsSync(layoutTsPath)) {
    targetPath = layoutTsPath;
    isAppRouter = true;
  }
  
  if (!targetPath) {
    console.log('❌ Could not find _document.js or layout.js/tsx to update');
    return false;
  }
  
  try {
    const content = fs.readFileSync(targetPath, 'utf8');
    
    // Create backup
    const backupPath = `${targetPath}.bak`;
    fs.writeFileSync(backupPath, content);
    
    let updatedContent = content;
    
    // Check if FontPreload is already imported
    if (!content.includes('FontPreload')) {
      // Add import
      const importStatement = `import FontPreload from '../components/FontPreload';\n`;
      
      if (isAppRouter) {
        // For App Router
        if (content.includes('export default function')) {
          // Add import at the top
          updatedContent = content.replace(/import\s+/, importStatement + 'import ');
          
          // Add component to head
          if (updatedContent.includes('<head>')) {
            updatedContent = updatedContent.replace(
              /(<head[^>]*>)/,
              '$1\n        <FontPreload />'
            );
          }
        }
      } else {
        // For Pages Router
        if (content.includes('class Document extends')) {
          // Add import at the top
          updatedContent = content.replace(/import\s+/, importStatement + 'import ');
          
          // Add component to Head
          if (updatedContent.includes('<Head>')) {
            updatedContent = updatedContent.replace(
              /(<Head[^>]*>)/,
              '$1\n          <FontPreload />'
            );
          }
        }
      }
    }
    
    // Write updated content
    fs.writeFileSync(targetPath, updatedContent);
    console.log(`✅ Updated ${targetPath} to include FontPreload component`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${targetPath}:`, error.message);
    return false;
  }
}

// Main function to optimize fonts
async function optimizeFonts() {
  console.log('Starting font optimization...');
  
  // Find files to process
  const files = findFiles();
  console.log(`Found ${files.length} files to analyze for font usage.`);
  
  // Find CSS files
  const cssFiles = findCssFiles();
  console.log(`Found ${cssFiles.length} CSS files to analyze for font declarations.`);
  
  // Combine all files
  const allFiles = [...files, ...cssFiles];
  
  // Process each file
  const results = [];
  let totalChanges = 0;
  
  for (const [index, file] of allFiles.entries()) {
    console.log(`Processing file ${index + 1}/${allFiles.length}: ${file}`);
    
    const result = optimizeFile(file);
    results.push(result);
    
    if (!result.error) {
      totalChanges += result.changes;
      
      // Write changes if any were made
      if (result.changes > 0) {
        try {
          // Create backup
          const backupPath = `${file}.bak`;
          fs.writeFileSync(backupPath, result.originalContent);
          
          // Write optimized content
          fs.writeFileSync(file, result.optimizedContent);
          
          console.log(`✅ Optimized ${file} (${result.changes} changes)`);
        } catch (error) {
          console.error(`❌ Error writing to ${file}:`, error.message);
        }
      }
    }
  }
  
  // Create FontPreload component
  createPreloadComponent();
  
  // Update _document.js or layout.js
  updateDocumentOrLayout();
  
  // Create font optimization guide
  createFontOptimizationGuide();
  
  // Print summary
  console.log('\nFont optimization complete!');
  console.log(`Processed ${allFiles.length} files.`);
  console.log(`Made ${totalChanges} optimizations.`);
  console.log('\nNext steps:');
  console.log('1. Review the changes made to your files.');
  console.log('2. Check the FontPreload component and update it with your critical fonts.');
  console.log('3. Read the FONT-OPTIMIZATION.md guide for more best practices.');
  console.log('4. Test your application to ensure fonts load correctly.');
}

// Run the optimization
optimizeFonts().catch(error => {
  console.error('Font optimization failed:', error);
  process.exit(1);
}); 