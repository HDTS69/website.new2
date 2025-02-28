const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  // Directories to analyze
  analyzeDirs: ['app', 'components', 'lib', 'utils'],
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
  // Optimization patterns to look for
  patterns: {
    // Large libraries that could be dynamically imported
    largeLibraries: [
      'framer-motion',
      'lucide-react',
      'date-fns',
      '@tsparticles',
      'aos',
      'three',
      'chart.js',
      'react-chartjs-2',
      'react-table',
      'react-query',
    ],
    // Components that should be lazy loaded
    componentsToLazyLoad: [
      'Hero',
      'Footer',
      'SparklesCore',
      'InstagramFeed',
      'BannerCTA',
      'Testimonials',
      'Features',
      'FeaturesBlocks',
      'Pricing',
    ],
  },
};

// Function to get Next.js build stats
function getBuildStats() {
  try {
    // Check if .next/build-manifest.json exists
    const buildManifestPath = path.join('.next', 'build-manifest.json');
    if (!fs.existsSync(buildManifestPath)) {
      console.log('No build stats found. Run "npm run build" first.');
      return null;
    }

    // Get page sizes from .next/analyze/client.html if it exists
    let pageSizes = [];
    try {
      // Try to run next build with bundle analyzer if not already done
      execSync('ANALYZE=true npm run build', { stdio: 'ignore' });
    } catch (error) {
      console.log('Could not run build with analyzer. Using existing stats if available.');
    }

    // Parse build stats from .next/server/pages-manifest.json
    const pagesManifestPath = path.join('.next', 'server', 'pages-manifest.json');
    if (fs.existsSync(pagesManifestPath)) {
      const pagesManifest = JSON.parse(fs.readFileSync(pagesManifestPath, 'utf8'));
      
      // Get list of pages
      const pages = Object.keys(pagesManifest);
      
      // Get page sizes if possible
      for (const page of pages) {
        try {
          const pagePath = path.join('.next', 'server', pagesManifest[page]);
          if (fs.existsSync(pagePath)) {
            const stats = fs.statSync(pagePath);
            pageSizes.push({
              page,
              size: (stats.size / 1024).toFixed(2) + ' KB',
              sizeBytes: stats.size,
            });
          }
        } catch (error) {
          // Skip if can't get size
        }
      }
      
      // Sort by size
      pageSizes.sort((a, b) => b.sizeBytes - a.sizeBytes);
    }

    return {
      pageSizes,
    };
  } catch (error) {
    console.error('Error getting build stats:', error.message);
    return null;
  }
}

// Function to find large components
function findLargeComponents() {
  const components = [];
  
  // Get all files to process
  for (const dir of config.analyzeDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir, { recursive: true });
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        
        // Skip directories and ignored files
        if (fs.statSync(filePath).isDirectory()) {
          continue;
        }
        
        const ext = path.extname(filePath);
        if (!config.extensions.includes(ext)) {
          continue;
        }
        
        let shouldIgnore = false;
        for (const ignorePattern of config.ignoreFiles) {
          if (filePath.includes(ignorePattern)) {
            shouldIgnore = true;
            break;
          }
        }
        
        if (shouldIgnore) {
          continue;
        }
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const size = content.length;
          
          // Check if this is a component file
          const isComponent = (
            content.includes('export default') || 
            content.includes('export function') ||
            content.includes('export const') ||
            content.includes('React.') ||
            content.includes('from "react"') ||
            content.includes('from \'react\'')
          );
          
          if (isComponent) {
            // Count imports
            const importLines = content.match(/import .+ from .+/g) || [];
            const importCount = importLines.length;
            
            // Check for large library imports
            const largeLibraryImports = [];
            for (const lib of config.patterns.largeLibraries) {
              if (content.includes(`from '${lib}'`) || content.includes(`from "${lib}"`)) {
                largeLibraryImports.push(lib);
              }
            }
            
            // Check if component should be lazy loaded
            const componentName = path.basename(filePath, ext);
            const shouldBeLazyLoaded = config.patterns.componentsToLazyLoad.includes(componentName);
            
            // Check if already lazy loaded
            const isLazyLoaded = content.includes('React.lazy') || content.includes('lazy(');
            
            // Check for image optimization
            const hasImages = content.includes('<img') || content.includes('<Image');
            const usesNextImage = content.includes('next/image');
            
            // Check for event handlers
            const hasEventHandlers = (
              content.includes('onClick') || 
              content.includes('onChange') || 
              content.includes('onSubmit') ||
              content.includes('addEventListener')
            );
            
            // Check for useEffect with dependencies
            const hasEffects = content.includes('useEffect');
            const effectsWithDeps = (content.match(/useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?}\s*,\s*\[(.*?)\]\s*\)/g) || []).length;
            
            components.push({
              file: filePath,
              name: componentName,
              size,
              sizeKB: (size / 1024).toFixed(2) + ' KB',
              importCount,
              largeLibraryImports,
              shouldBeLazyLoaded,
              isLazyLoaded,
              hasImages,
              usesNextImage,
              hasEventHandlers,
              hasEffects,
              effectsWithDeps,
            });
          }
        } catch (error) {
          console.error(`Error processing file ${filePath}:`, error.message);
        }
      }
    }
  }
  
  // Sort by size
  components.sort((a, b) => b.size - a.size);
  
  return components.slice(0, 20); // Return top 20 largest components
}

// Function to check for optimization opportunities
function findOptimizationOpportunities(components) {
  const opportunities = [];
  
  for (const component of components) {
    const componentOpportunities = [];
    
    // Check if component should be lazy loaded
    if (component.shouldBeLazyLoaded && !component.isLazyLoaded) {
      componentOpportunities.push({
        type: 'lazy-loading',
        description: `Component ${component.name} should be lazy loaded`,
        priority: 'high',
      });
    }
    
    // Check for large library imports
    if (component.largeLibraryImports.length > 0) {
      componentOpportunities.push({
        type: 'dynamic-import',
        description: `Consider dynamic imports for: ${component.largeLibraryImports.join(', ')}`,
        priority: 'medium',
      });
    }
    
    // Check for image optimization
    if (component.hasImages && !component.usesNextImage) {
      componentOpportunities.push({
        type: 'image-optimization',
        description: 'Use Next.js Image component for better image optimization',
        priority: 'high',
      });
    }
    
    // Check for effect optimizations
    if (component.hasEffects && component.effectsWithDeps === 0) {
      componentOpportunities.push({
        type: 'effect-optimization',
        description: 'useEffect hooks should have proper dependency arrays',
        priority: 'medium',
      });
    }
    
    if (componentOpportunities.length > 0) {
      opportunities.push({
        component: component.name,
        file: component.file,
        size: component.sizeKB,
        opportunities: componentOpportunities,
      });
    }
  }
  
  return opportunities;
}

// Function to generate optimization recommendations
function generateRecommendations(buildStats, largeComponents, opportunities) {
  const recommendations = [];
  
  // Recommend lazy loading for large components
  const componentsToLazyLoad = opportunities
    .filter(opp => opp.opportunities.some(o => o.type === 'lazy-loading'))
    .map(opp => opp.component);
  
  if (componentsToLazyLoad.length > 0) {
    recommendations.push({
      title: 'Implement lazy loading for large components',
      description: `The following components should be lazy loaded: ${componentsToLazyLoad.join(', ')}`,
      code: `
// Before
import LargeComponent from '@/components/LargeComponent'

// After
import dynamic from 'next/dynamic'
const LargeComponent = dynamic(() => import('@/components/LargeComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Set to true if server-side rendering is needed
})
      `,
      priority: 'high',
    });
  }
  
  // Recommend dynamic imports for large libraries
  const librariesToDynamicImport = new Set();
  opportunities.forEach(opp => {
    opp.opportunities
      .filter(o => o.type === 'dynamic-import')
      .forEach(o => {
        const libs = o.description.split(':')[1].trim().split(', ');
        libs.forEach(lib => librariesToDynamicImport.add(lib));
      });
  });
  
  if (librariesToDynamicImport.size > 0) {
    recommendations.push({
      title: 'Use dynamic imports for large libraries',
      description: `Consider using dynamic imports for: ${Array.from(librariesToDynamicImport).join(', ')}`,
      code: `
// Before
import { motion } from 'framer-motion'

// After
import { useEffect, useState } from 'react'

function MyComponent() {
  const [Motion, setMotion] = useState(null)
  
  useEffect(() => {
    // Import only when component is mounted
    import('framer-motion').then((mod) => {
      setMotion(() => mod.motion)
    })
  }, [])
  
  if (!Motion) return <div>Loading...</div>
  
  return <Motion.div>Animated content</Motion.div>
}
      `,
      priority: 'medium',
    });
  }
  
  // Recommend image optimization
  const componentsNeedingImageOpt = opportunities
    .filter(opp => opp.opportunities.some(o => o.type === 'image-optimization'))
    .map(opp => opp.component);
  
  if (componentsNeedingImageOpt.length > 0) {
    recommendations.push({
      title: 'Optimize images with Next.js Image component',
      description: `Use Next.js Image component in: ${componentsNeedingImageOpt.join(', ')}`,
      code: `
// Before
<img src="/image.jpg" alt="Description" />

// After
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
  loading="lazy"
/>
      `,
      priority: 'high',
    });
  }
  
  // Recommend effect optimizations
  const componentsNeedingEffectOpt = opportunities
    .filter(opp => opp.opportunities.some(o => o.type === 'effect-optimization'))
    .map(opp => opp.component);
  
  if (componentsNeedingEffectOpt.length > 0) {
    recommendations.push({
      title: 'Optimize useEffect hooks',
      description: `Add proper dependency arrays to useEffect in: ${componentsNeedingEffectOpt.join(', ')}`,
      code: `
// Before - runs on every render
useEffect(() => {
  // effect code
})

// After - runs only when dependencies change
useEffect(() => {
  // effect code
}, [dependency1, dependency2])

// For one-time initialization
useEffect(() => {
  // effect code
}, [])
      `,
      priority: 'medium',
    });
  }
  
  return recommendations;
}

// Main function to analyze bundle
function analyzeBundleSize() {
  console.log('Analyzing bundle size...');
  
  // Get build stats
  const buildStats = getBuildStats();
  
  // Find large components
  const largeComponents = findLargeComponents();
  
  // Find optimization opportunities
  const opportunities = findOptimizationOpportunities(largeComponents);
  
  // Generate recommendations
  const recommendations = generateRecommendations(buildStats, largeComponents, opportunities);
  
  // Print results
  console.log('\nLargest components:');
  largeComponents.forEach((component, index) => {
    console.log(`${index + 1}. ${component.name} (${component.sizeKB}) - ${component.file}`);
    if (component.largeLibraryImports.length > 0) {
      console.log(`   Uses large libraries: ${component.largeLibraryImports.join(', ')}`);
    }
  });
  
  if (buildStats && buildStats.pageSizes.length > 0) {
    console.log('\nLargest pages:');
    buildStats.pageSizes.slice(0, 10).forEach((page, index) => {
      console.log(`${index + 1}. ${page.page} (${page.size})`);
    });
  }
  
  console.log('\nOptimization opportunities:');
  if (opportunities.length === 0) {
    console.log('  None found');
  } else {
    opportunities.forEach((opp, index) => {
      console.log(`${index + 1}. ${opp.component} (${opp.size}) - ${opp.file}`);
      opp.opportunities.forEach(o => {
        console.log(`   - [${o.priority}] ${o.description}`);
      });
    });
  }
  
  console.log('\nRecommendations:');
  if (recommendations.length === 0) {
    console.log('  None found');
  } else {
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority}] ${rec.title}`);
      console.log(`   ${rec.description}`);
      console.log('   Example:');
      console.log(rec.code);
      console.log();
    });
  }
  
  // Write report to file
  const report = {
    largeComponents,
    pageSizes: buildStats ? buildStats.pageSizes : [],
    opportunities,
    recommendations,
  };
  
  fs.writeFileSync('bundle-analysis.json', JSON.stringify(report, null, 2));
  console.log('Full report written to bundle-analysis.json');
}

// Run the analysis
analyzeBundleSize(); 