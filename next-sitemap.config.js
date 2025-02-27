/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hdtradeservices.com.au',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://hdtradeservices.com.au/sitemap.xml',
    ],
  },
  exclude: [
    '/api/*',
    '/server-sitemap.xml',
    '/admin/*',
  ],
  generateIndexSitemap: false,
  outDir: 'out',
  transform: async (config, path) => {
    // Custom transform function for sitemap entries
    // Customize priority based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/services')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/contact')) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
}; 