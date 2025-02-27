#!/bin/bash

# This script updates all SparklesCore components in the codebase to match the settings in BrandCarousel.tsx

echo "Updating SparklesCore components..."

# Find all files containing SparklesCore components
FILES=$(grep -l "SparklesCore" --include="*.tsx" --include="*.jsx" -r . | grep -v "BrandCarousel.tsx" | grep -v "sparkles.tsx" | grep -v "SparklesCore.tsx")

# Loop through each file and update the SparklesCore components
for file in $FILES; do
  echo "Processing $file..."
  
  # Use sed to update the SparklesCore props
  # This is a complex sed operation that tries to match the SparklesCore component and update its props
  # Note: This is a simplified approach and might need manual verification
  sed -i '' -E '/<SparklesCore/,/>/s/background="[^"]*"/background="transparent"/g' "$file"
  sed -i '' -E '/<SparklesCore/,/>/s/minSize=\{[0-9]+\}/minSize={1}/g' "$file"
  sed -i '' -E '/<SparklesCore/,/>/s/maxSize=\{[0-9]+\}/maxSize={2}/g' "$file"
  sed -i '' -E '/<SparklesCore/,/>/s/particleDensity=\{[0-9]+\}/particleDensity={100}/g' "$file"
  sed -i '' -E '/<SparklesCore/,/>/s/particleColor="[^"]*"/particleColor="#1CD4A7"/g' "$file"
  sed -i '' -E '/<SparklesCore/,/>/s/speed=\{[0-9.]+\}/speed={0.3}/g' "$file"
  
  # Add missing props if they don't exist
  if ! grep -q "minSize" "$file"; then
    sed -i '' -E '/<SparklesCore/s/>/ minSize={1}>/g' "$file"
  fi
  
  if ! grep -q "maxSize" "$file"; then
    sed -i '' -E '/<SparklesCore/s/>/ maxSize={2}>/g' "$file"
  fi
  
  if ! grep -q "particleDensity" "$file"; then
    sed -i '' -E '/<SparklesCore/s/>/ particleDensity={100}>/g' "$file"
  fi
  
  if ! grep -q "particleColor" "$file"; then
    sed -i '' -E '/<SparklesCore/s/>/ particleColor="#1CD4A7">/g' "$file"
  fi
  
  if ! grep -q "speed" "$file"; then
    sed -i '' -E '/<SparklesCore/s/>/ speed={0.3}>/g' "$file"
  fi
  
  if ! grep -q "background" "$file"; then
    sed -i '' -E '/<SparklesCore/s/>/ background="transparent">/g' "$file"
  fi
done

echo "SparklesCore components updated successfully!" 