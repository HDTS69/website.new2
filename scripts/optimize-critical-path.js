const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
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
    'public',
    'out',
    'dist',
    '.git',
    '.github',
    '.vscode',
  ],
  // Critical CSS options
  criticalCss: {
    // Viewport sizes for generating critical CSS
    viewports: [
      {
        name: 'mobile',
        width: 375,
        height: 667,
      },
      {
        name: 'desktop',
        width: 1280,
        height: 800,
      },
    ],
    // Maximum critical CSS size (in KB)
    maxCssSize: 20,
    // Timeout for rendering (in ms)
    timeout: 60000, // Increased from 30000 to 60000
    // User agent string for rendering
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    // Puppeteer launch options
    puppeteerOptions: {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      // Only use if puppeteer is installed
      ...(isPuppeteerInstalled() ? {} : { executablePath: 'chrome' })
    }
  },
  // URLs to generate critical CSS for
  urls: [
    '/',
    '/services',
    '/about',
    '/contact',
  ],
};

// Function to check for required dependencies
function checkDependencies() {
  const requiredPackages = ['critical', 'glob'];
  if (isPuppeteerInstalled()) {
    requiredPackages.push('puppeteer');
  }
  const missingPackages = [];
  
  for (const pkg of requiredPackages) {
    try {
      // For ES modules, we can't use require.resolve directly
      // Instead, check if the package directory exists in node_modules
      const pkgPath = path.join(process.cwd(), 'node_modules', pkg);
      if (!fs.existsSync(pkgPath)) {
        missingPackages.push(pkg);
      }
    } catch (error) {
      missingPackages.push(pkg);
    }
  }
  
  if (missingPackages.length > 0) {
    console.log(`Missing dependencies: ${missingPackages.join(', ')}`);
    console.log('Installing missing dependencies...');
    
    try {
      execSync(`npm install --save-dev ${missingPackages.join(' ')}`, { stdio: 'inherit' });
      console.log('Dependencies installed successfully.');
      return true;
    } catch (error) {
      console.error('Failed to install dependencies:', error.message);
      return false;
    }
  }
  
  return true;
}

// Function to find layout files
function findLayoutFiles() {
  const layoutFiles = [];
  
  // Check for _document.js (Pages Router)
  const documentPath = path.join('pages', '_document.js');
  if (fs.existsSync(documentPath)) {
    layoutFiles.push(documentPath);
  }
  
  // Check for layout.js/tsx (App Router)
  const layoutPath = path.join('app', 'layout.js');
  if (fs.existsSync(layoutPath)) {
    layoutFiles.push(layoutPath);
  }
  
  const layoutTsPath = path.join('app', 'layout.tsx');
  if (fs.existsSync(layoutTsPath)) {
    layoutFiles.push(layoutTsPath);
  }
  
  return layoutFiles;
}

// Function to create a critical CSS component
function createCriticalCssComponent() {
  const componentPath = path.join('components', 'CriticalCSS.js');
  const componentDir = path.dirname(componentPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  const componentContent = `// CriticalCSS.js - Inlines critical CSS for better LCP
import React from 'react';

export function CriticalCSS({ css, isMobile }) {
  // Skip if no CSS
  if (!css) return null;
  
  // Use the appropriate CSS based on viewport
  const criticalCss = isMobile ? css.mobile : css.desktop;
  
  return (
    <style 
      id="critical-css" 
      dangerouslySetInnerHTML={{ 
        __html: criticalCss 
      }} 
    />
  );
}

// Client-side component to detect viewport and load appropriate CSS
export function CriticalCSSWithViewportDetection({ css }) {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return <CriticalCSS css={css} isMobile={isMobile} />;
}

export default CriticalCSS;
`;

  try {
    fs.writeFileSync(componentPath, componentContent);
    console.log(`✅ Created CriticalCSS component at ${componentPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating CriticalCSS component:`, error.message);
    return false;
  }
}

// Function to generate critical CSS for a URL
async function generateCriticalCss(url, baseUrl = 'http://localhost:3000') {
  try {
    // Use dynamic import for ES modules
    const criticalModule = await import('critical');
    const critical = criticalModule.default || criticalModule;
    
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    const urlPath = url === '/' ? 'home' : url.replace(/^\//, '').replace(/\//g, '-');
    
    console.log(`Generating critical CSS for ${fullUrl}...`);
    
    const results = {};
    
    // Generate critical CSS for each viewport
    for (const viewport of config.criticalCss.viewports) {
      const { width, height, name } = viewport;
      
      console.log(`  Viewport: ${name} (${width}x${height})`);
      
      try {
        const result = await critical.generate({
          src: fullUrl,
          width,
          height,
          inline: false,
          extract: false,
          penthouse: {
            timeout: config.criticalCss.timeout,
            renderWaitTime: 1000,
            puppeteer: {
              ...config.criticalCss.puppeteerOptions,
              // Skip if puppeteer is not installed
              ...(isPuppeteerInstalled() ? {} : { ignore: true })
            }
          },
          user: config.criticalCss.userAgent,
          dimensions: [
            {
              width,
              height,
            },
          ],
        });
        
        results[name] = result.css;
        
        // Write to file for reference
        const outputDir = path.join('public', 'critical-css');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputFile = path.join(outputDir, `${urlPath}-${name}.css`);
        fs.writeFileSync(outputFile, result.css);
        
        console.log(`  Wrote ${outputFile} (${result.css.length} bytes)`);
      } catch (viewportError) {
        console.error(`  Error generating critical CSS for ${url} at ${name} viewport:`, viewportError.message);
        // Continue with next viewport instead of failing completely
        results[name] = '';
      }
    }
    
    return Object.keys(results).length > 0 ? results : null;
  } catch (error) {
    console.error(`Error generating critical CSS for ${url}:`, error.message);
    return null;
  }
}

// Function to create a critical CSS data file
function createCriticalCssDataFile(criticalCssData) {
  const dataPath = path.join('lib', 'criticalCssData.js');
  const dataDir = path.dirname(dataPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const dataContent = `// Generated critical CSS data
export const criticalCssData = ${JSON.stringify(criticalCssData, null, 2)};

export default criticalCssData;
`;

  try {
    fs.writeFileSync(dataPath, dataContent);
    console.log(`✅ Created critical CSS data file at ${dataPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating critical CSS data file:`, error.message);
    return false;
  }
}

// Function to check if development server is running
async function checkDevServer() {
  try {
    execSync('curl -s http://localhost:3000 > /dev/null');
    return true;
  } catch (error) {
    return false;
  }
}

// Function to update layout files to include critical CSS
function updateLayoutFile(layoutFile) {
  try {
    const content = fs.readFileSync(layoutFile, 'utf8');
    
    // Create backup
    const backupPath = `${layoutFile}.bak`;
    fs.writeFileSync(backupPath, content);
    
    let updatedContent = content;
    
    // Check if CriticalCSS is already imported
    if (!content.includes('CriticalCSS')) {
      // Add import
      const importStatement = `import { CriticalCSS } from '../components/CriticalCSS';\nimport criticalCssData from '../lib/criticalCssData';\n`;
      
      // Add import at the top
      updatedContent = updatedContent.replace(/import\s+/, importStatement + 'import ');
      
      // Add component to head
      if (updatedContent.includes('<head>')) {
        // For App Router
        updatedContent = updatedContent.replace(
          /(<head[^>]*>)/,
          '$1\n        <CriticalCSS css={criticalCssData["/"]} isMobile={false} />'
        );
      } else if (updatedContent.includes('<Head>')) {
        // For Pages Router
        updatedContent = updatedContent.replace(
          /(<Head[^>]*>)/,
          '$1\n          <CriticalCSS css={criticalCssData["/"]} isMobile={false} />'
        );
      }
    }
    
    // Write updated content
    fs.writeFileSync(layoutFile, updatedContent);
    console.log(`✅ Updated ${layoutFile} to include CriticalCSS component`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${layoutFile}:`, error.message);
    return false;
  }
}

// Function to create a page-specific critical CSS component
function createPageCriticalCssComponent() {
  const componentPath = path.join('components', 'PageCriticalCSS.js');
  
  const componentContent = `// PageCriticalCSS.js - Page-specific critical CSS
import React from 'react';
import { useRouter } from 'next/router';
import { CriticalCSS } from './CriticalCSS';
import criticalCssData from '../lib/criticalCssData';

export function PageCriticalCSS() {
  const router = useRouter();
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get the current path
  const path = router.pathname || '/';
  
  // Get CSS for current path, fallback to home
  const css = criticalCssData[path] || criticalCssData['/'];
  
  return <CriticalCSS css={css} isMobile={isMobile} />;
}

export default PageCriticalCSS;
`;

  try {
    fs.writeFileSync(componentPath, componentContent);
    console.log(`✅ Created PageCriticalCSS component at ${componentPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating PageCriticalCSS component:`, error.message);
    return false;
  }
}

// Function to create a critical CSS optimization guide
function createCriticalCssGuide() {
  const guidePath = 'CRITICAL-CSS-GUIDE.md';
  
  const guideContent = `# Critical CSS Optimization Guide

## What is Critical CSS?

Critical CSS is the minimal CSS required to render the visible portion of a webpage (above the fold content). By inlining this CSS in the \`<head>\` of your HTML, you can significantly improve the Largest Contentful Paint (LCP) metric and overall page load performance.

## How to Use the Critical CSS Components

### Basic Usage

The \`CriticalCSS\` component inlines the critical CSS for a specific page:

\`\`\`jsx
import { CriticalCSS } from '../components/CriticalCSS';
import criticalCssData from '../lib/criticalCssData';

// In your layout component
<head>
  <CriticalCSS css={criticalCssData["/"]} isMobile={false} />
</head>
\`\`\`

### Dynamic Usage Based on Page

The \`PageCriticalCSS\` component automatically selects the appropriate critical CSS based on the current route:

\`\`\`jsx
import { PageCriticalCSS } from '../components/PageCriticalCSS';

// In your layout component
<head>
  <PageCriticalCSS />
</head>
\`\`\`

### Responsive Critical CSS

The \`CriticalCSSWithViewportDetection\` component loads the appropriate CSS based on the viewport size:

\`\`\`jsx
import { CriticalCSSWithViewportDetection } from '../components/CriticalCSS';
import criticalCssData from '../lib/criticalCssData';

// In your layout component
<head>
  <CriticalCSSWithViewportDetection css={criticalCssData["/"]} />
</head>
\`\`\`

## Regenerating Critical CSS

When you make significant changes to your site's design, you should regenerate the critical CSS:

1. Start your development server: \`npm run dev\`
2. Run the critical CSS script: \`node scripts/optimize-critical-path.js\`

## Best Practices

1. **Keep Critical CSS Small**: Aim for less than 14KB of critical CSS to fit within the initial TCP window.

2. **Focus on Above-the-Fold Content**: Only include styles for content visible without scrolling.

3. **Defer Non-Critical CSS**: Load non-critical CSS asynchronously:

   \`\`\`html
   <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="/styles.css"></noscript>
   \`\`\`

4. **Update Regularly**: Regenerate critical CSS when making significant UI changes.

5. **Test on Multiple Devices**: Ensure your critical CSS works well across different screen sizes.

6. **Monitor Performance**: Use Lighthouse and WebPageTest to verify improvements.

## Troubleshooting

- **Flash of Unstyled Content (FOUC)**: If you see a FOUC, your critical CSS might be missing important styles. Review and regenerate.

- **Oversized Critical CSS**: If your critical CSS is too large, focus on reducing it by:
  - Removing unused styles
  - Focusing only on above-the-fold content
  - Simplifying your above-the-fold design

- **Layout Shifts**: If you experience layout shifts after the full CSS loads, ensure your critical CSS includes proper sizing for all above-the-fold elements.
`;

  try {
    fs.writeFileSync(guidePath, guideContent);
    console.log(`✅ Created critical CSS guide at ${guidePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating critical CSS guide:`, error.message);
    return false;
  }
}

// Main function to optimize critical path
async function optimizeCriticalPath() {
  console.log('Starting critical path optimization...');
  
  // Check for required dependencies
  if (!checkDependencies()) {
    console.error('❌ Missing required dependencies. Please install them and try again.');
    return;
  }
  
  // Create critical CSS component
  const componentCreated = createCriticalCssComponent();
  const pageComponentCreated = createPageCriticalCssComponent();
  
  if (!componentCreated || !pageComponentCreated) {
    console.error('❌ Failed to create critical CSS components.');
    return;
  }
  
  // Find layout files
  const layoutFiles = findLayoutFiles();
  console.log(`Found ${layoutFiles.length} layout files to update.\n`);
  
  if (layoutFiles.length === 0) {
    console.error('❌ No layout files found. Please check your project structure.');
    return;
  }
  
  // Check if development server is running
  console.log('Checking if development server is running...');
  const isServerRunning = await checkDevServer();
  
  if (!isServerRunning) {
    console.log('Development server is not running. Starting server...');
    // You could start the server here if needed
    console.log('Please start the development server with `npm run dev` and try again.');
    return;
  } else {
    console.log('Development server is running.');
  }
  
  // Generate critical CSS for each URL
  const criticalCssData = {};
  let successCount = 0;
  
  for (const url of config.urls) {
    try {
      const cssData = await generateCriticalCss(url);
      
      if (cssData) {
        criticalCssData[url] = cssData;
        successCount++;
      }
    } catch (error) {
      console.error(`Failed to generate critical CSS for ${url}:`, error.message);
      // Continue with next URL
    }
  }
  
  // Create critical CSS data file
  const dataFileCreated = createCriticalCssDataFile(criticalCssData);
  
  if (!dataFileCreated) {
    console.error('❌ Failed to create critical CSS data file.');
    return;
  }
  
  // Update layout files
  let updatedCount = 0;
  
  for (const layoutFile of layoutFiles) {
    const updated = updateLayoutFile(layoutFile);
    
    if (updated) {
      updatedCount++;
    }
  }
  
  // Create guide
  const guideCreated = createCriticalCssGuide();
  
  if (!guideCreated) {
    console.warn('⚠️ Failed to create critical CSS guide.');
  }
  
  console.log('\nCritical path optimization complete!');
  console.log(`Generated critical CSS for ${successCount} URLs.`);
  console.log(`Updated ${updatedCount} layout files.`);
  
  console.log('\nNext steps:');
  console.log('1. Review the changes made to your layout files.');
  console.log('2. Test your application to ensure critical CSS works correctly.');
  console.log('3. Read the CRITICAL-CSS-GUIDE.md for more best practices.');
  console.log('4. Run Lighthouse to verify LCP improvements.');
}

// Run the optimization
optimizeCriticalPath().catch(error => {
  console.error('Critical path optimization failed:', error);
  process.exit(1);
});

// Check if puppeteer is installed
const isPuppeteerInstalled = () => {
  try {
    require.resolve('puppeteer');
    return true;
  } catch (e) {
    return false;
  }
}; 