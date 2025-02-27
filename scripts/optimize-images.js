const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const config = {
  inputDir: 'public',
  outputDir: 'public/optimized',
  quality: 80,
  sizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  formats: ['webp', 'avif'],
  includeOriginalFormat: true,
};

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

  for (const file of imageFiles) {
    const filename = path.basename(file);
    const relativePath = path.relative(config.inputDir, path.dirname(file));
    const outputPath = path.join(config.outputDir, relativePath);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
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
        continue;
      }
      
      // Process image in different formats and sizes
      let formatSuccess = false;
      for (const format of config.formats) {
        for (const width of config.sizes.filter(size => size <= metadata.width)) {
          try {
            const outputFilename = `${path.parse(filename).name}-${width}.${format}`;
            const outputFile = path.join(outputPath, outputFilename);
            
            await sharp(file)
              .resize(width)
              [format]({ quality: config.quality })
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
        
        for (const width of config.sizes.filter(size => size <= metadata.width)) {
          try {
            const outputFilename = `${path.parse(filename).name}-${width}.${originalFormat}`;
            const outputFile = path.join(outputPath, outputFilename);
            
            await sharp(file)
              .resize(width)
              .toFormat(originalFormat, { quality: config.quality })
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
  }

  console.log('\nOptimization complete!');
  console.log(`✅ Successfully optimized: ${successCount} images`);
  console.log(`⚠️ Skipped but copied: ${skippedCount} images`);
  console.log(`❌ Failed to optimize: ${errorCount} images`);
})(); 