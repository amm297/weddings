import { promises as fs } from "fs";
import path from "path";

// Path to the timeline images
const TIMELINE_IMAGES_DIR = path.join(
  process.cwd(),
  "wedding_data",
  "images",
  "timeline"
);

async function replaceWithEnhancedImages() {
  try {
    // Get all files in the directory
    const files = await fs.readdir(TIMELINE_IMAGES_DIR);

    // Filter for enhanced image files
    const enhancedFiles = files.filter((file) => file.startsWith("enhanced_"));

    console.log(
      `Found ${enhancedFiles.length} enhanced images to replace originals`
    );

    // Process each enhanced image
    for (const enhancedFile of enhancedFiles) {
      const originalFile = enhancedFile.replace("enhanced_", "");
      const enhancedPath = path.join(TIMELINE_IMAGES_DIR, enhancedFile);
      const originalPath = path.join(TIMELINE_IMAGES_DIR, originalFile);

      console.log(`Replacing ${originalFile} with ${enhancedFile}...`);

      // Replace the original with the enhanced version
      await fs.copyFile(enhancedPath, originalPath);
      console.log(`Replaced ${originalFile} successfully`);

      // Delete the enhanced file as it's no longer needed
      await fs.unlink(enhancedPath);
      console.log(`Deleted ${enhancedFile}`);
    }

    console.log(
      "All original images have been replaced with enhanced versions!"
    );
    console.log(
      'Backups of the original files have been created with "backup_enhanced_" prefix.'
    );
  } catch (error) {
    console.error("Error replacing images:", error);
  }
}

// Run the function
replaceWithEnhancedImages();
