// A simple script to create basic favicon files
const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a minimal valid PNG with the specified dimensions
function createMinimalPng(width, height) {
  // PNG header
  const header = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
    0x49, 0x48, 0x44, 0x52  // "IHDR"
  ]);

  // Width (4 bytes)
  const widthBuf = Buffer.alloc(4);
  widthBuf.writeUInt32BE(width);

  // Height (4 bytes)
  const heightBuf = Buffer.alloc(4);
  heightBuf.writeUInt32BE(height);

  // Rest of IHDR
  const ihdrRest = Buffer.from([
    0x08,                   // bit depth
    0x06,                   // color type (RGBA)
    0x00,                   // compression method
    0x00,                   // filter method
    0x00                    // interlace method
  ]);

  // IHDR CRC (precomputed)
  const ihdrCrc = Buffer.from([0x00, 0x00, 0x00, 0x00]);

  // Empty IDAT chunk
  const idat = Buffer.from([
    0x00, 0x00, 0x00, 0x00, // length
    0x49, 0x44, 0x41, 0x54, // "IDAT"
    // No data
    0x00, 0x00, 0x00, 0x00  // CRC
  ]);

  // IEND chunk
  const iend = Buffer.from([
    0x00, 0x00, 0x00, 0x00, // length
    0x49, 0x45, 0x4E, 0x44, // "IEND"
    0xAE, 0x42, 0x60, 0x82  // CRC
  ]);

  return Buffer.concat([header, widthBuf, heightBuf, ihdrRest, ihdrCrc, idat, iend]);
}

// Create a minimal ICO file
function createMinimalIco() {
  // ICO header
  const header = Buffer.from([
    0x00, 0x00,             // Reserved
    0x01, 0x00,             // Type: 1 = ICO
    0x01, 0x00              // Number of images: 1
  ]);

  // Directory entry
  const dir = Buffer.from([
    0x10,                   // Width: 16px
    0x10,                   // Height: 16px
    0x00,                   // Color palette: 0
    0x00,                   // Reserved
    0x01, 0x00,             // Color planes: 1
    0x20, 0x00,             // Bits per pixel: 32
    0x30, 0x00, 0x00, 0x00, // Size of image data: 48 bytes
    0x16, 0x00, 0x00, 0x00  // Offset to image data: 22 bytes
  ]);

  // Minimal image data (48 bytes of zeros)
  const imageData = Buffer.alloc(48);

  return Buffer.concat([header, dir, imageData]);
}

try {
  // Create favicon.ico
  fs.writeFileSync(
    path.join(publicDir, 'favicon.ico'),
    createMinimalIco()
  );
  
  // Create PNG favicons
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512
  };
  
  for (const [filename, size] of Object.entries(sizes)) {
    fs.writeFileSync(
      path.join(publicDir, filename),
      createMinimalPng(size, size)
    );
  }
  
  console.log('Basic favicon files created successfully!');
} catch (error) {
  console.error('Error creating favicon files:', error);
} 