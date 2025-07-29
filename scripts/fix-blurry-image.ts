import * as fs from "fs";
import sharp from "sharp";
import * as path from "path";

async function fixBlurryImage() {
  const sourceImage = "public/images/paula-francisco/bienvenida-cc287c12.webp";
  const outputPath = "public/images/paula-francisco/bienvenida-fixed.webp";

  console.log(`Fixing blurry image: ${sourceImage}`);

  try {
    // Get original metadata
    const metadata = await sharp(sourceImage).metadata();
    console.log("Original image metadata:", {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      density: metadata.density,
      hasAlpha: metadata.hasAlpha,
      size: fs.statSync(sourceImage).size / 1024 + "KB",
    });

    // The image is very small (100x100), so we need to upscale it significantly
    // Use a 4x upscale for small images
    const targetWidth = metadata.width ? metadata.width * 4 : 400;
    const targetHeight = metadata.height ? metadata.height * 4 : 400;

    // Process with specialized settings for small images
    const sharpInstance = sharp(sourceImage)
      // Use lanczos3 for high-quality upscaling
      .resize(targetWidth, targetHeight, {
        kernel: "lanczos3",
        fit: "fill",
        withoutEnlargement: false, // Allow upscaling
      })
      // Increase sharpness to compensate for upscaling blur
      .sharpen({
        sigma: 1.2,
        m1: 1.5,
        m2: 1.5,
        x1: 2,
        y2: 5,
        y3: 5,
      })
      // Set high quality
      .webp({
        quality: 100,
        lossless: true,
      });

    // Save the enhanced image
    await sharpInstance.toFile(outputPath);

    // Check the new file
    const newMetadata = await sharp(outputPath).metadata();
    console.log("New image metadata:", {
      width: newMetadata.width,
      height: newMetadata.height,
      format: newMetadata.format,
      density: newMetadata.density,
      hasAlpha: newMetadata.hasAlpha,
      size: fs.statSync(outputPath).size / 1024 + "KB",
    });

    console.log(`Image has been optimized and saved to: ${outputPath}`);
    console.log(`You can replace the original with this command:`);
    console.log(`mv ${outputPath} ${sourceImage}`);
  } catch (error) {
    console.error("Error fixing image:", error);
  }
}

fixBlurryImage();
