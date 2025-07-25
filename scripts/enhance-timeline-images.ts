import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

// Path to the timeline images
const TIMELINE_IMAGES_DIR = path.join(
  process.cwd(),
  "wedding_data",
  "images",
  "timeline"
);

// Target dimensions for all timeline images
const TARGET_WIDTH = 300;
const TARGET_HEIGHT = 300;

async function enhanceTimelineImages() {
  try {
    // Get all files in the directory
    const files = await fs.readdir(TIMELINE_IMAGES_DIR);

    // Filter for image files (excluding backup files)
    const imageFiles = files.filter(
      (file) =>
        (file.endsWith(".png") ||
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg")) &&
        !file.startsWith("backup_") &&
        !file.startsWith("optimized_")
    );

    console.log(`Found ${imageFiles.length} images to enhance`);

    // Process each image
    for (const file of imageFiles) {
      const filePath = path.join(TIMELINE_IMAGES_DIR, file);
      console.log(`Enhancing ${file}...`);

      // Create a backup if it doesn't exist
      const backupPath = path.join(
        TIMELINE_IMAGES_DIR,
        `backup_enhanced_${file}`
      );
      if (!files.includes(`backup_enhanced_${file}`)) {
        await fs.copyFile(filePath, backupPath);
        console.log(`Created backup: backup_enhanced_${file}`);
      }

      // Process the image to enhance lines and ensure transparent background
      await sharp(filePath)
        // Extract alpha channel if exists, otherwise create one
        .ensureAlpha()
        // Increase contrast to make lines more visible
        .linear(1.5, -0.1) // Increase contrast
        // Threshold to make lines thicker and clearer
        .threshold(150)
        // Resize while maintaining aspect ratio
        .resize({
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        // Save as PNG with transparency
        .png({ quality: 100 })
        .toFile(path.join(TIMELINE_IMAGES_DIR, `enhanced_${file}`));

      console.log(`Enhanced ${file} to enhanced_${file}`);
    }

    console.log("All images enhanced successfully!");
    console.log(
      "You can now review the enhanced images and replace the originals if satisfied."
    );
  } catch (error) {
    console.error("Error enhancing images:", error);
  }
}

// Run the function
enhanceTimelineImages();
