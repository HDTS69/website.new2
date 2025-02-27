const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  baseUrl: 'https://hdtradeservices.com.au',
  outputPath: 'public/sitemap.xml',
  pagesDir: 'app',
  excludePatterns: [
    '**/node_modules/**',
    '**/api/**',
    '**/layout.tsx',
    '**/loading.tsx',
    '**/error.tsx',
    '**/not-found.tsx',
    '**/page.tsx.bak',
  ],
  defaultChangeFreq: 'weekly',
  defaultPriority: 0.7,
  // Special priorities for specific pages
  priorities: {
    '/': 1.0,
    '/services': 0.9,
    '/contact': 0.8,
    '/blog': 0.8,
  },
  // Special change frequencies for specific pages
  changeFreqs: {
    '/': 'daily',
    '/blog': 'daily',
    '/services': 'weekly',
  },
};

// Get all page files
const pageFiles = glob.sync(`${config.pagesDir}/**/page.tsx`, {
  ignore: config.excludePatterns,
});

console.log(`Found ${pageFiles.length} pages to include in sitemap`);

// Convert file path to URL path
function filePathToUrlPath(filePath) {
  // Remove app/ prefix and page.tsx suffix
  let urlPath = filePath
    .replace(/^app\//, '')
    .replace(/\/page\.tsx$/, '');
  
  // Handle root page
  if (urlPath === '') {
    return '/';
  }
  
  // Handle dynamic routes
  urlPath = urlPath.replace(/\[([^\]]+)\]/g, 'param');
  
  return `/${urlPath}`;
}

// Generate sitemap XML
function generateSitemap(pages) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    const urlPath = filePathToUrlPath(page);
    const priority = config.priorities[urlPath] || config.defaultPriority;
    const changefreq = config.changeFreqs[urlPath] || config.defaultChangeFreq;
    
    xml += '  <url>\n';
    xml += `    <loc>${config.baseUrl}${urlPath}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Write sitemap to file
const sitemap = generateSitemap(pageFiles);
fs.writeFileSync(config.outputPath, sitemap);

console.log(`Sitemap generated at ${config.outputPath}`);

// Generate robots.txt if it doesn't exist
const robotsPath = 'public/robots.txt';
if (!fs.existsSync(robotsPath)) {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${config.baseUrl}/sitemap.xml
`;
  
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log(`Robots.txt generated at ${robotsPath}`);
} 