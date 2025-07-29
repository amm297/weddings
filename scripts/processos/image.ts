import sharp from "sharp";
import { promises as fs, existsSync, mkdirSync, writeFileSync } from "fs";
import * as path from "path";

export interface ProcessImageOptions {
  outputPath?: string | null;
  height?: number;
  width?: number;
  quality?: number;
  format?: string;
  preserveAspectRatio?: boolean;
  preserveResolution?: boolean;
}

/**
 * Process an image by resizing and optimizing for Firestore storage
 */
export default async function processImage(
  imagePath: string,
  options: ProcessImageOptions = {}
): Promise<string> {
  try {
    // Set defaults
    const {
      outputPath = null,
      width = 0,
      height = 0,
      quality = 90,
      format = "webp",
      preserveAspectRatio = true,
      preserveResolution = false,
    } = options;

    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;
    const originalDensity = metadata.density || 72;

    // Calculate dimensions
    const { targetWidth, targetHeight } = calculateDimensions(
      originalWidth,
      originalHeight,
      width,
      height,
      preserveAspectRatio,
      preserveResolution
    );

    // Create output directory if needed
    if (
      outputPath &&
      !outputPath.endsWith(".txt") &&
      !outputPath.endsWith(".json")
    ) {
      const outputDir = path.dirname(outputPath);
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }
    }

    // Process the image
    const processedImageBuffer = await processImageBuffer(
      imagePath,
      targetWidth,
      targetHeight,
      preserveAspectRatio,
      preserveResolution,
      originalDensity,
      format,
      quality
    );

    // Create base64 representation
    const base64Image = `data:image/${format};base64,${processedImageBuffer.toString(
      "base64"
    )}`;

    // Handle different output types
    if (outputPath) {
      if (outputPath.endsWith(".txt")) {
        writeFileSync(outputPath, base64Image);
        return base64Image;
      }

      if (outputPath.endsWith(".json")) {
        const jsonData = {
          fileName: path.basename(imagePath),
          base64: base64Image,
          width: targetWidth,
          height: targetHeight,
          quality,
          format,
          dpi: Math.max(originalDensity, 300),
          timestamp: new Date().toISOString(),
        };
        writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
        return base64Image;
      }

      // Regular image file output
      const finalOutputPath = ensureCorrectExtension(outputPath, format);
      writeFileSync(finalOutputPath, processedImageBuffer);

      // Extract URL path if applicable
      const urlPath = finalOutputPath.split("/public")[1];
      return urlPath || finalOutputPath;
    }

    return base64Image;
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
    throw error;
  }
}

/**
 * Calculate target dimensions based on inputs and constraints
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  width: number,
  height: number,
  preserveAspectRatio: boolean,
  preserveResolution: boolean
): { targetWidth: number; targetHeight: number } {
  if (preserveResolution) {
    return { targetWidth: originalWidth, targetHeight: originalHeight };
  }

  const originalRatio = originalWidth / originalHeight;
  let targetWidth = width;
  let targetHeight = height;

  if (preserveAspectRatio) {
    if (width > 0 && height === 0) {
      targetHeight = Math.round(width / originalRatio);
    } else if (height > 0 && width === 0) {
      targetWidth = Math.round(height * originalRatio);
    } else if (width === 0 && height === 0) {
      targetWidth = originalWidth;
      targetHeight = originalHeight;
    }
  } else {
    if (width === 0) targetWidth = originalWidth;
    if (height === 0) targetHeight = originalHeight;
  }

  return { targetWidth, targetHeight };
}

/**
 * Process image and return buffer
 */
async function processImageBuffer(
  imagePath: string,
  targetWidth: number,
  targetHeight: number,
  preserveAspectRatio: boolean,
  preserveResolution: boolean,
  originalDensity: number,
  format: string,
  quality: number
): Promise<Buffer> {
  let sharpInstance = sharp(imagePath);

  // Resize if needed
  const shouldResize = !preserveResolution;
  if (shouldResize) {
    sharpInstance = sharpInstance.resize(targetWidth, targetHeight, {
      fit: preserveAspectRatio ? "inside" : "fill",
      withoutEnlargement: true,
    });
  }

  // Set metadata with higher DPI (minimum 600 DPI for better print quality)
  sharpInstance = sharpInstance.withMetadata({
    density: Math.max(originalDensity, 600),
  });

  // Apply format-specific settings
  const formatLower = format.toLowerCase();
  switch (formatLower) {
    case "webp":
      sharpInstance = sharpInstance.webp({
        quality,
        lossless: quality >= 95,
      });
      break;
    case "jpeg":
    case "jpg":
      sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true });
      break;
    case "png":
      sharpInstance = sharpInstance.png({
        quality,
        compressionLevel: 9,
        palette: quality < 95,
      });
      break;
    case "avif":
      sharpInstance = sharpInstance.avif({ quality });
      break;
    default:
      sharpInstance = sharpInstance.webp({
        quality,
        lossless: quality >= 95,
      });
  }

  return sharpInstance.toBuffer();
}

/**
 * Ensure output path has correct extension for format
 */
function ensureCorrectExtension(outputPath: string, format: string): string {
  const currentExt = path.extname(outputPath).toLowerCase().substring(1);
  if (currentExt !== format.toLowerCase()) {
    return `${outputPath.replace(/\.[^/.]+$/, "")}.${format}`;
  }
  return outputPath;
}
