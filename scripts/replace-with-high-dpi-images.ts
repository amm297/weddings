import { promises as fs } from "fs";
import path from "path";

// Path to the timeline images
const TIMELINE_IMAGES_DIR = path.join(
  process.cwd(),
  "wedding_data",
  "images",
  "timeline"
);

async function replaceWithHighDpiImages() {
  try {
    // Get all files in the directory
    const files = await fs.readdir(TIMELINE_IMAGES_DIR);

    // Filter for high DPI image files
    const highDpiFiles = files.filter((file) => file.startsWith("high_dpi_"));

    console.log(
      `Found ${highDpiFiles.length} high DPI images to replace originals`
    );

    // Process each high DPI image
    for (const highDpiFile of highDpiFiles) {
      const originalFile = highDpiFile.replace("high_dpi_", "");
      const highDpiPath = path.join(TIMELINE_IMAGES_DIR, highDpiFile);
      const originalPath = path.join(TIMELINE_IMAGES_DIR, originalFile);

      console.log(`Replacing ${originalFile} with ${highDpiFile}...`);

      // Replace the original with the high DPI version
      await fs.copyFile(highDpiPath, originalPath);
      console.log(`Replaced ${originalFile} successfully`);

      // Delete the high DPI file as it's no longer needed
      await fs.unlink(highDpiPath);
      console.log(`Deleted ${highDpiFile}`);
    }

    console.log(
      "All original images have been replaced with high DPI versions!"
    );
    console.log(
      'Backups of the original files have been created with "backup_dpi_" prefix.'
    );
  } catch (error) {
    console.error("Error replacing images:", error);
  }
}

// Run the function
replaceWithHighDpiImages();
