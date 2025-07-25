import { promises as fs } from "fs";
import path from "path";

// Path to the timeline images
const TIMELINE_IMAGES_DIR = path.join(
  process.cwd(),
  "wedding_data",
  "images",
  "timeline"
);

async function replaceTimelineImages() {
  try {
    // Get all files in the directory
    const files = await fs.readdir(TIMELINE_IMAGES_DIR);

    // Filter for optimized image files
    const optimizedFiles = files.filter((file) =>
      file.startsWith("optimized_")
    );

    console.log(
      `Found ${optimizedFiles.length} optimized images to replace originals`
    );

    // Process each optimized image
    for (const optimizedFile of optimizedFiles) {
      const originalFile = optimizedFile.replace("optimized_", "");
      const optimizedPath = path.join(TIMELINE_IMAGES_DIR, optimizedFile);
      const originalPath = path.join(TIMELINE_IMAGES_DIR, originalFile);

      console.log(`Replacing ${originalFile} with ${optimizedFile}...`);

      // Make a backup of the original file
      await fs.copyFile(
        originalPath,
        path.join(TIMELINE_IMAGES_DIR, `backup_${originalFile}`)
      );
      console.log(`Backup created: backup_${originalFile}`);

      // Replace the original with the optimized version
      await fs.copyFile(optimizedPath, originalPath);
      console.log(`Replaced ${originalFile} successfully`);

      // Delete the optimized file as it's no longer needed
      await fs.unlink(optimizedPath);
      console.log(`Deleted ${optimizedFile}`);
    }

    console.log(
      "All original images have been replaced with optimized versions!"
    );
    console.log(
      'Backups of the original files have been created with "backup_" prefix.'
    );
  } catch (error) {
    console.error("Error replacing images:", error);
  }
}

// Run the function
replaceTimelineImages();
