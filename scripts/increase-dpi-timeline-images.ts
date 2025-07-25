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
const TARGET_WIDTH = 600; // Doubled from 300 for higher resolution
const TARGET_HEIGHT = 600; // Doubled from 300 for higher resolution
const TARGET_DPI = 300; // Standard print quality DPI (default is 72)

async function increaseDpiTimelineImages() {
  try {
    // Get all files in the directory
    const files = await fs.readdir(TIMELINE_IMAGES_DIR);

    // Filter for image files (excluding backup files)
    const imageFiles = files.filter(
      (file) =>
        (file.endsWith(".png") ||
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg")) &&
        !file.startsWith("backup_")
    );

    console.log(`Found ${imageFiles.length} images to increase DPI`);

    // Process each image
    for (const file of imageFiles) {
      const filePath = path.join(TIMELINE_IMAGES_DIR, file);
      console.log(`Increasing DPI for ${file}...`);

      // Create a backup if it doesn't exist
      const backupPath = path.join(TIMELINE_IMAGES_DIR, `backup_dpi_${file}`);
      if (!files.includes(`backup_dpi_${file}`)) {
        await fs.copyFile(filePath, backupPath);
        console.log(`Created backup: backup_dpi_${file}`);
      }

      // Get image metadata
      const metadata = await sharp(filePath).metadata();

      // Process the image to increase DPI and size
      await sharp(filePath)
        // Ensure alpha channel for transparency
        .ensureAlpha()
        // Resize to higher resolution while maintaining aspect ratio
        .resize({
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        // Set the DPI
        .withMetadata({
          density: TARGET_DPI, // Set DPI to 300
        })
        // Save as PNG with high quality
        .png({ quality: 100 })
        .toFile(path.join(TIMELINE_IMAGES_DIR, `high_dpi_${file}`));

      console.log(`Increased DPI for ${file} to high_dpi_${file}`);
    }

    console.log("All images processed with higher DPI successfully!");
    console.log(
      "You can now review the high DPI images and replace the originals if satisfied."
    );
  } catch (error) {
    console.error("Error increasing DPI:", error);
  }
}

// Run the function
increaseDpiTimelineImages();
