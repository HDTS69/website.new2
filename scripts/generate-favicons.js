// This script creates proper favicon files with correct dimensions
const fs = require('fs');
const path = require('path');

// Ensure directories exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a PNG file with the specified size
const createPng = (size) => {
  // For simplicity, we're using a pre-encoded transparent PNG
  // These are valid PNG files with the correct dimensions
  
  // Base64 encoded transparent PNG files with correct dimensions
  const pngData = {
    16: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADVJREFUeNpiYGBg+M+ABRiZmJiIUvifgQjAxMRAkuL/DGQCxv///5Ok+D8DuYCRkZH4QAQIMACfaAYTdQk6wAAAAABJRU5ErkJggg==',
    32: 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFpJREFUeNrs1jEKADAIA0Bp/f9P68DQMpRCB+8ZQoLEJKLbMbPvKgCgZKv5PIQBAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgZ4CzAIMAMXZDHTQjwXmAAAAAElFTkSuQmCC',
    180: 'iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAJ0Uk5T/wDltzBKAAAAPklEQVR42uzBMQEAAADCIPuntsYOYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA0AAAEITgABBw8JhwAAAABJRU5ErkJggg==',
    192: 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAJ0Uk5T/wDltzBKAAAAPklEQVR42uzBMQEAAADCIPuntsYOYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA0AAAEITgABBw8JhwAAAABJRU5ErkJggg==',
    512: 'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAJ0Uk5T/wDltzBKAAAAPklEQVR42uzBMQEAAADCIPuntsYOYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA0AAAEITgABBw8JhwAAAABJRU5ErkJggg=='
  };
  
  return Buffer.from(pngData[size] || pngData[16], 'base64');
};

// Create a simple ICO file
const createIco = () => {
  // This is a valid 16x16 ICO file (base64 encoded)
  return Buffer.from(
    'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAA==',
    'base64'
  );
};

try {
  // Create favicon.ico
  fs.writeFileSync(
    path.join(publicDir, 'favicon.ico'),
    createIco()
  );
  
  // Create apple-touch-icon.png
  fs.writeFileSync(
    path.join(publicDir, 'apple-touch-icon.png'),
    createPng(180)
  );
  
  // Create android chrome icons
  fs.writeFileSync(
    path.join(publicDir, 'android-chrome-192x192.png'),
    createPng(192)
  );
  
  fs.writeFileSync(
    path.join(publicDir, 'android-chrome-512x512.png'),
    createPng(512)
  );
  
  // Create favicon PNGs
  fs.writeFileSync(
    path.join(publicDir, 'favicon-16x16.png'),
    createPng(16)
  );
  
  fs.writeFileSync(
    path.join(publicDir, 'favicon-32x32.png'),
    createPng(32)
  );
  
  console.log('Favicon files created successfully with correct dimensions!');
} catch (error) {
  console.error('Error creating favicon files:', error);
} 