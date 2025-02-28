// create-placeholder.js - Script to generate a placeholder image
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  width: 400,
  height: 300,
  outputPath: 'public/images/placeholder.webp',
  backgroundColor: '#f3f4f6', // Light gray
  textColor: '#6b7280',       // Medium gray
  text: 'Image not available',
  fontSize: 24
};

async function createPlaceholder() {
  try {
    console.log('Creating placeholder image...');
    
    // Create a blank SVG with text
    const svg = `
      <svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${config.backgroundColor}"/>
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="${config.fontSize}" 
          fill="${config.textColor}" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${config.text}
        </text>
      </svg>
    `;
    
    // Create directory if it doesn't exist
    const dir = path.dirname(config.outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Convert SVG to WebP
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(config.outputPath);
    
    console.log(`Placeholder image created at: ${config.outputPath}`);
  } catch (error) {
    console.error('Error creating placeholder image:', error.message);
    process.exit(1);
  }
}

// Run the function
createPlaceholder(); 