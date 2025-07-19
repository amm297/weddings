import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import dotenv from "dotenv";

// Parse command line arguments
const args = process.argv.slice(2);
const sourceImage = args[0];
const outputPath = args[1];
const width = args[2] ? parseInt(args[2], 10) : 0;
const height = args[3] ? parseInt(args[3], 10) : 0;
const quality = args[4] ? parseInt(args[4], 10) : 80;
const format = args[5] || "webp"; // webp is more efficient than jpg/png
const preserveAspectRatio =
  args[6] === "true" || args[6] === undefined || args[6] === "1";

// Load environment variables
dotenv.config();

/**
 * Process an image by resizing and optimizing for Firestore storage
 * @param imagePath Path to the source image
 * @param outputPath Path where the processed image or base64 will be saved
 * @param width Target width (if preserveAspectRatio is true and only one dimension is provided, the other will be calculated)
 * @param height Target height (if preserveAspectRatio is true and only one dimension is provided, the other will be calculated)
 * @param quality Compression quality (1-100)
 * @param format Output format (webp, jpeg, png)
 * @param preserveAspectRatio Whether to preserve the aspect ratio
 * @returns Promise with base64 string of the processed image
 */
async function processImage(
  imagePath: string,
  outputPath: string,
  width: number = 0,
  height: number = 0,
  quality: number = 80,
  format: string = "webp",
  preserveAspectRatio: boolean = true
): Promise<string> {
  try {
    console.log(`Processing image: ${imagePath}`);
    console.log(`Output: ${outputPath}`);

    // Get image metadata to determine dimensions
    const metadata = await sharp(imagePath).metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;
    const originalRatio = originalWidth / originalHeight;

    console.log(
      `Original dimensions: ${originalWidth}x${originalHeight} (ratio: ${originalRatio.toFixed(
        2
      )})`
    );

    // Calculate dimensions based on inputs and aspect ratio
    let targetWidth = width;
    let targetHeight = height;

    if (preserveAspectRatio) {
      if (width > 0 && height === 0) {
        // Only width provided, calculate height
        targetHeight = Math.round(width / originalRatio);
      } else if (height > 0 && width === 0) {
        // Only height provided, calculate width
        targetWidth = Math.round(height * originalRatio);
      } else if (width === 0 && height === 0) {
        // Neither provided, use default of 240 for the smaller dimension
        if (originalWidth > originalHeight) {
          targetHeight = 240;
          targetWidth = Math.round(240 * originalRatio);
        } else {
          targetWidth = 240;
          targetHeight = Math.round(240 / originalRatio);
        }
      }
    } else {
      // If not preserving aspect ratio, use defaults for any missing dimension
      if (width === 0) targetWidth = 240;
      if (height === 0) targetHeight = 240;
    }

    console.log(
      `Target dimensions: ${targetWidth}x${targetHeight}, Quality: ${quality}, Format: ${format}`
    );

    // Ensure the output directory exists if it's not a direct file path
    if (!outputPath.endsWith(".txt") && !outputPath.endsWith(".json")) {
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
    }

    // Configure sharp with the appropriate format and options
    let sharpInstance = sharp(imagePath).resize(targetWidth, targetHeight, {
      fit: preserveAspectRatio ? "inside" : "fill",
      withoutEnlargement: true,
    });

    // Apply format-specific optimizations
    switch (format.toLowerCase()) {
      case "webp":
        sharpInstance = sharpInstance.webp({ quality });
        break;
      case "jpeg":
      case "jpg":
        sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true });
        break;
      case "png":
        sharpInstance = sharpInstance.png({ quality, compressionLevel: 9 });
        break;
      case "avif":
        sharpInstance = sharpInstance.avif({ quality });
        break;
      default:
        sharpInstance = sharpInstance.webp({ quality });
    }

    // Process the image and get buffer
    const processedImageBuffer = await sharpInstance.toBuffer();

    // Get the processed image size in KB
    const imageSizeKB = (processedImageBuffer.length / 1024).toFixed(2);
    console.log(`Processed image size: ${imageSizeKB} KB`);

    // Convert to base64
    const base64Image = `data:image/${format};base64,${processedImageBuffer.toString(
      "base64"
    )}`;

    // If output path is a text file, write the base64 string directly
    if (outputPath.endsWith(".txt")) {
      fs.writeFileSync(outputPath, base64Image);
      console.log(`Base64 data saved to text file: ${outputPath}`);
    }
    // If output path is a JSON file, write as JSON
    else if (outputPath.endsWith(".json")) {
      fs.writeFileSync(
        outputPath,
        JSON.stringify(
          {
            fileName: path.basename(imagePath),
            base64: base64Image,
            width: targetWidth,
            height: targetHeight,
            quality,
            format,
            timestamp: new Date().toISOString(),
          },
          null,
          2
        )
      );
      console.log(`Base64 data saved to JSON file: ${outputPath}`);
    }
    // Otherwise save the processed image file
    else {
      fs.writeFileSync(outputPath, processedImageBuffer);

      // Also save base64 to a companion text file
      const base64OutputPath = `${outputPath}.base64.txt`;
      fs.writeFileSync(base64OutputPath, base64Image);
      console.log(`Image processed and saved to: ${outputPath}`);
      console.log(`Base64 data saved to: ${base64OutputPath}`);
    }

    // Log the base64 string size for reference
    const base64SizeKB = (base64Image.length / 1024).toFixed(2);
    console.log(`Base64 string size: ${base64SizeKB} KB`);

    return base64Image;
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
    throw error;
  }
}

/**
 * Process a directory of images
 * @param sourceDir Directory containing source images
 * @param outputDir Directory where processed images will be saved
 * @param width Target width
 * @param height Target height
 * @param quality Compression quality (1-100)
 * @param format Output format (webp, jpeg, png)
 * @param preserveAspectRatio Whether to preserve the aspect ratio
 * @returns Object mapping filenames to their base64 representations
 */
async function processDirectory(
  sourceDir: string,
  outputDir: string,
  width: number = 0,
  height: number = 0,
  quality: number = 80,
  format: string = "webp",
  preserveAspectRatio: boolean = true
): Promise<Record<string, string>> {
  try {
    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      console.error(`Source directory not found: ${sourceDir}`);
      process.exit(1);
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get all files in the source directory
    const files = fs.readdirSync(sourceDir);

    // Filter for image files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log(`No image files found in ${sourceDir}`);
      return {};
    }

    console.log(`Found ${imageFiles.length} images to process`);

    // Process each image
    const results: Record<string, string> = {};
    const promises = imageFiles.map(async (file) => {
      const sourcePath = path.join(sourceDir, file);
      const fileNameWithoutExt = path.parse(file).name;
      const outputPath = path.join(
        outputDir,
        `${fileNameWithoutExt}.${format}`
      );
      const base64 = await processImage(
        sourcePath,
        outputPath,
        width,
        height,
        quality,
        format,
        preserveAspectRatio
      );
      results[file] = base64;
    });

    await Promise.all(promises);
    console.log(`All images processed successfully`);

    // Save all base64 data to a single JSON file
    const jsonOutputPath = path.join(outputDir, "processed-images.json");
    fs.writeFileSync(
      jsonOutputPath,
      JSON.stringify(
        {
          images: Object.entries(results).map(([fileName, base64]) => ({
            fileName,
            base64,
            width,
            height,
            quality,
            format,
            preserveAspectRatio,
          })),
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )
    );

    console.log(`Base64 data for all images saved to: ${jsonOutputPath}`);

    return results;
  } catch (error) {
    console.error("Error processing directory:", error);
    process.exit(1);
  }
}

async function main() {
  try {
    if (!sourceImage) {
      console.error("Error: No source image or directory specified");
      console.error(
        "Usage: bun run scripts/process-images.ts <source-image-or-dir> [output-path] [width] [height] [quality] [format] [preserveAspectRatio]"
      );
      console.error(
        "Example: bun run scripts/process-images.ts image.jpg output.txt 300 0 80 webp true"
      );
      console.error(
        "Note: Set width or height to 0 to auto-calculate based on aspect ratio"
      );
      process.exit(1);
    }

    // Check if source exists
    if (!fs.existsSync(sourceImage)) {
      console.error(`Error: Source not found: ${sourceImage}`);
      process.exit(1);
    }

    // Check if source is a file or directory
    const stats = fs.statSync(sourceImage);

    if (stats.isFile()) {
      // Process single file
      if (!outputPath) {
        const fileName = path.basename(sourceImage);
        const fileNameWithoutExt = path.parse(fileName).name;
        const defaultOutputPath = path.join(
          "public/images/processed",
          `${fileNameWithoutExt}.${format}`
        );
        await processImage(
          sourceImage,
          defaultOutputPath,
          width,
          height,
          quality,
          format,
          preserveAspectRatio
        );
      } else {
        await processImage(
          sourceImage,
          outputPath,
          width,
          height,
          quality,
          format,
          preserveAspectRatio
        );
      }
    } else if (stats.isDirectory()) {
      // Process directory
      const outputDir = outputPath || "public/images/processed";
      await processDirectory(
        sourceImage,
        outputDir,
        width,
        height,
        quality,
        format,
        preserveAspectRatio
      );
    } else {
      console.error(`Error: ${sourceImage} is neither a file nor a directory`);
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the main function
main();
