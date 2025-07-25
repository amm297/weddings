import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

// Target dimensions for all timeline images
const TARGET_WIDTH = 300; // You can adjust this value as needed
const TARGET_HEIGHT = 300; // You can adjust this value as needed

// Path to the timeline images
const TIMELINE_IMAGES_DIR = path.join(
  process.cwd(),
  "wedding_data",
  "images",
  "timeline"
);

async function optimizeTimelineImages() {
  try {
    // Get all files in the directory
    const files = await fs.readdir(TIMELINE_IMAGES_DIR);

    // Filter for image files (assuming png format based on your directory listing)
    const imageFiles = files.filter(
      (file) =>
        file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")
    );

    console.log(`Found ${imageFiles.length} images to optimize`);

    // Process each image
    for (const file of imageFiles) {
      const filePath = path.join(TIMELINE_IMAGES_DIR, file);
      console.log(`Processing ${file}...`);

      // Resize the image while maintaining aspect ratio and using contain mode
      await sharp(filePath)
        .resize({
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .png({ quality: 90 })
        .toFile(path.join(TIMELINE_IMAGES_DIR, `optimized_${file}`));

      console.log(`Optimized ${file} to optimized_${file}`);
    }

    console.log("All images optimized successfully!");
    console.log(
      "You can now replace the original files with the optimized versions if satisfied with the results."
    );
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

// Run the function
optimizeTimelineImages();
