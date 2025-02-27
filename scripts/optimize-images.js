const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Enhanced Configuration
const config = {
  inputDir: 'public',
  outputDir: 'public/optimized',
  quality: {
    webp: 75,
    avif: 65,
    jpeg: 80,
    png: 80
  },
  // Responsive sizes for different device types
  sizes: [320, 640, 768, 1024, 1366, 1600, 1920],
  formats: ['webp', 'avif'],
  includeOriginalFormat: true,
  // Compression options
  compressionOptions: {
    webp: {
      effort: 6,  // Higher effort = better compression but slower (0-6)
      lossless: false,
      nearLossless: false,
    },
    avif: {
      effort: 7,  // Higher effort = better compression but slower (0-9)
      lossless: false,
    },
    jpeg: {
      progressive: true,
      optimizeCoding: true,
      mozjpeg: true,
    },
    png: {
      compressionLevel: 9,  // Maximum compression (0-9)
      palette: true,  // Use palette-based quantization for small images
      quality: 80,
      effort: 10,     // Maximum effort (1-10)
    }
  },
  // Skip optimization for images smaller than this size (in bytes)
  skipSizeThreshold: 10 * 1024, // 10KB
  // Cache optimization results to avoid reprocessing
  cacheFile: 'public/optimized/.cache.json',
};

// Load cache if exists
let cache = {};
try {
  if (fs.existsSync(config.cacheFile)) {
    cache = JSON.parse(fs.readFileSync(config.cacheFile, 'utf8'));
    console.log(`Loaded cache with ${Object.keys(cache).length} entries`);
  }
} catch (error) {
  console.warn(`Could not load cache: ${error.message}`);
  cache = {};
}

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all image files
const imageFiles = glob.sync(`${config.inputDir}/**/*.{jpg,jpeg,png,gif}`, {
  ignore: [`${config.outputDir}/**/*`],
});

console.log(`Found ${imageFiles.length} images to optimize`);

// Process each image
(async () => {
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  let cachedCount = 0;

  // Process images in batches to avoid memory issues
  const BATCH_SIZE = 5;
  
  for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
    const batch = imageFiles.slice(i, i + BATCH_SIZE);
    
    await Promise.all(batch.map(async (file) => {
      const filename = path.basename(file);
      const relativePath = path.relative(config.inputDir, path.dirname(file));
      const outputPath = path.join(config.outputDir, relativePath);
      
      // Create output directory if it doesn't exist
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      // Check if file has been modified since last optimization
      const stats = fs.statSync(file);
      const fileKey = `${file}:${stats.size}:${stats.mtime.getTime()}`;
      
      if (cache[fileKey]) {
        cachedCount++;
        console.log(`🔄 Using cached version: ${file}`);
        return;
      }

      // Skip small files if they're under the threshold
      if (stats.size < config.skipSizeThreshold) {
        const outputFile = path.join(outputPath, filename);
        fs.copyFileSync(file, outputFile);
        console.log(`⏩ Skipped small file: ${file} (${Math.round(stats.size / 1024)}KB)`);
        skippedCount++;
        cache[fileKey] = true;
        return;
      }

      try {
        // Get image metadata
        let metadata;
        try {
          metadata = await sharp(file).metadata();
        } catch (error) {
          console.warn(`⚠️ Skipping ${file}: ${error.message}`);
          skippedCount++;
          
          // Copy the original file instead
          const outputFile = path.join(outputPath, filename);
          fs.copyFileSync(file, outputFile);
          console.log(`📋 Copied original: ${file}`);
          cache[fileKey] = true;
          return;
        }
        
        // Process image in different formats and sizes
        let formatSuccess = false;
        
        // Only generate sizes that make sense (don't upscale)
        const appropriateSizes = config.sizes.filter(size => size <= metadata.width);
        
        // If the image is already small, just use its original size
        if (appropriateSizes.length === 0) {
          appropriateSizes.push(metadata.width);
        }
        
        for (const format of config.formats) {
          for (const width of appropriateSizes) {
            try {
              const outputFilename = `${path.parse(filename).name}-${width}.${format}`;
              const outputFile = path.join(outputPath, outputFilename);
              
              // Get format-specific options
              const formatOptions = {
                ...config.compressionOptions[format],
                quality: config.quality[format]
              };
              
              await sharp(file)
                .resize({
                  width,
                  fit: 'inside',
                  withoutEnlargement: true
                })
                [format](formatOptions)
                .toFile(outputFile);
              
              formatSuccess = true;
            } catch (error) {
              console.warn(`⚠️ Could not convert ${file} to ${format}: ${error.message}`);
            }
          }
        }
        
        // Also save in original format if configured
        if (config.includeOriginalFormat) {
          const originalFormat = metadata.format;
          let originalFormatSuccess = false;
          
          // Map original format to one we have compression options for
          const formatKey = originalFormat === 'jpeg' || originalFormat === 'jpg' ? 'jpeg' : 
                           originalFormat === 'png' ? 'png' : 'jpeg';
          
          for (const width of appropriateSizes) {
            try {
              const outputFilename = `${path.parse(filename).name}-${width}.${originalFormat}`;
              const outputFile = path.join(outputPath, outputFilename);
              
              // Get format-specific options
              const formatOptions = {
                ...config.compressionOptions[formatKey],
                quality: config.quality[formatKey]
              };
              
              await sharp(file)
                .resize({
                  width,
                  fit: 'inside',
                  withoutEnlargement: true
                })
                .toFormat(originalFormat, formatOptions)
                .toFile(outputFile);
              
              originalFormatSuccess = true;
            } catch (error) {
              console.warn(`⚠️ Could not resize ${file} to ${width}px: ${error.message}`);
            }
          }
          
          // If we couldn't process the image at all, copy the original
          if (!formatSuccess && !originalFormatSuccess) {
            const outputFile = path.join(outputPath, filename);
            fs.copyFileSync(file, outputFile);
            console.log(`📋 Copied original: ${file}`);
          }
        }
        
        successCount++;
        console.log(`✅ Optimized: ${file}`);
        cache[fileKey] = true;
      } catch (error) {
        errorCount++;
        console.error(`❌ Error optimizing ${file}:`, error.message);
        
        // Copy the original file as fallback
        try {
          const outputFile = path.join(outputPath, filename);
          fs.copyFileSync(file, outputFile);
          console.log(`📋 Copied original as fallback: ${file}`);
        } catch (copyError) {
          console.error(`❌ Could not copy original file: ${copyError.message}`);
        }
      }
    }));
    
    // Save cache after each batch
    try {
      fs.writeFileSync(config.cacheFile, JSON.stringify(cache));
    } catch (error) {
      console.warn(`Could not save cache: ${error.message}`);
    }
    
    // Log progress
    console.log(`Processed ${Math.min((i + BATCH_SIZE), imageFiles.length)}/${imageFiles.length} images`);
  }

  console.log('\nOptimization complete!');
  console.log(`✅ Successfully optimized: ${successCount} images`);
  console.log(`🔄 Used cached versions: ${cachedCount} images`);
  console.log(`⚠️ Skipped but copied: ${skippedCount} images`);
  console.log(`❌ Failed to optimize: ${errorCount} images`);
})(); 