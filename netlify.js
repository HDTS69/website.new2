// netlify.js
module.exports = {
  // This file helps Netlify understand the structure of the project
  // and provides additional configuration for the build process.
  
  // The base directory is the root of the repository
  baseDirectory: '/',
  
  // The publish directory is the output of the Next.js build
  publishDirectory: 'out',
  
  // The build command is the custom build script
  buildCommand: './netlify-build.sh',
  
  // Environment variables
  environment: {
    NODE_VERSION: '18',
    NPM_FLAGS: '--legacy-peer-deps',
    NETLIFY_USE_YARN: 'false'
  }
}; 