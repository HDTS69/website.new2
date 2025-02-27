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
      const metadata = await sharp(file).metadata();
      
      // Process image in different formats and sizes
      for (const format of config.formats) {
        for (const width of config.sizes.filter(size => size <= metadata.width)) {
          const outputFilename = `${path.parse(filename).name}-${width}.${format}`;
          const outputFile = path.join(outputPath, outputFilename);
          
          await sharp(file)
            .resize(width)
            [format]({ quality: config.quality })
            .toFile(outputFile);
        }
      }
      
      // Also save in original format if configured
      if (config.includeOriginalFormat) {
        const originalFormat = metadata.format;
        for (const width of config.sizes.filter(size => size <= metadata.width)) {
          const outputFilename = `${path.parse(filename).name}-${width}.${originalFormat}`;
          const outputFile = path.join(outputPath, outputFilename);
          
          await sharp(file)
            .resize(width)
            .toFormat(originalFormat, { quality: config.quality })
            .toFile(outputFile);
        }
      }
      
      successCount++;
      console.log(`✅ Optimized: ${file}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('\nOptimization complete!');
  console.log(`✅ Successfully optimized: ${successCount} images`);
  console.log(`❌ Failed to optimize: ${errorCount} images`);
})(); 