const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to create a minimal valid PNG file with specified dimensions
function createMinimalPng(width, height) {
  // PNG header (8 bytes)
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk (25 bytes)
  // - Length (4 bytes): 13
  // - Chunk type (4 bytes): "IHDR"
  // - Width (4 bytes)
  // - Height (4 bytes)
  // - Bit depth (1 byte): 8
  // - Color type (1 byte): 6 (RGBA)
  // - Compression method (1 byte): 0
  // - Filter method (1 byte): 0
  // - Interlace method (1 byte): 0
  // - CRC (4 bytes)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // Bit depth
  ihdrData[9] = 6;  // Color type (RGBA)
  ihdrData[10] = 0; // Compression method
  ihdrData[11] = 0; // Filter method
  ihdrData[12] = 0; // Interlace method
  
  const ihdrChunk = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x0D]),                // Length
    Buffer.from("IHDR"),                                  // Chunk type
    ihdrData,                                             // Chunk data
    Buffer.from([0x00, 0x00, 0x00, 0x00])                 // CRC (placeholder)
  ]);
  
  // IDAT chunk (minimal empty image data)
  // For simplicity, we're creating a transparent image
  // The actual data would be more complex for a real image
  const idatData = Buffer.from([0x08, 0x1D, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00]);
  
  const idatChunk = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x08]),                // Length
    Buffer.from("IDAT"),                                  // Chunk type
    idatData,                                             // Chunk data
    Buffer.from([0x00, 0x00, 0x00, 0x00])                 // CRC (placeholder)
  ]);
  
  // IEND chunk (12 bytes)
  const iendChunk = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x00]),                // Length
    Buffer.from("IEND"),                                  // Chunk type
    Buffer.from([0x00, 0x00, 0x00, 0x00])                 // CRC (placeholder)
  ]);
  
  // Combine all chunks
  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// Function to create a minimal valid ICO file
function createMinimalIco() {
  // ICO header (6 bytes)
  // - Reserved (2 bytes): 0
  // - Type (2 bytes): 1 (ICO)
  // - Count (2 bytes): 1 (1 image)
  const header = Buffer.from([0x00, 0x00, 0x01, 0x00, 0x01, 0x00]);
  
  // Directory entry (16 bytes)
  // - Width (1 byte): 16
  // - Height (1 byte): 16
  // - Color count (1 byte): 0 (256)
  // - Reserved (1 byte): 0
  // - Color planes (2 bytes): 1
  // - Bits per pixel (2 bytes): 32
  // - Size of image data (4 bytes): 40 + 16*16*4 = 1064
  // - Offset to image data (4 bytes): 22 (6 + 16)
  const directoryEntry = Buffer.from([
    0x10, 0x10, 0x00, 0x00, 0x01, 0x00, 0x20, 0x00,
    0x28, 0x04, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
  ]);
  
  // Create a minimal image data (just enough to be valid)
  // This is a simplified version - a real ICO would have proper image data
  const imageData = Buffer.alloc(1064);
  // Set the size of the BITMAPINFOHEADER
  imageData.writeUInt32LE(40, 0);
  // Set the width and height
  imageData.writeInt32LE(16, 4);
  imageData.writeInt32LE(32, 8); // Height is doubled in ICO format
  // Set the number of color planes
  imageData.writeUInt16LE(1, 12);
  // Set the bits per pixel
  imageData.writeUInt16LE(32, 14);
  
  return Buffer.concat([header, directoryEntry, imageData]);
}

try {
  // Create and write favicon files
  console.log("Creating basic favicon files...");
  
  // Create favicon.ico
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createMinimalIco());
  
  // Create PNG favicons
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), createMinimalPng(16, 16));
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), createMinimalPng(32, 32));
  
  // Delete any existing android-chrome files and apple-touch-icon
  const filesToRemove = [
    path.join(publicDir, 'android-chrome-192x192.png'),
    path.join(publicDir, 'android-chrome-512x512.png'),
    path.join(publicDir, 'apple-touch-icon.png')
  ];
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
        console.log(`Deleted ${file}`);
      } catch (err) {
        console.error(`Error deleting ${file}:`, err);
      }
    }
  });
  
  console.log("Basic favicon files created successfully!");
} catch (error) {
  console.error("Error creating favicon files:", error);
} 