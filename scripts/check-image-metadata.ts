import sharp from "sharp";
import path from "path";

// Get the image path from command line arguments
const imagePath = process.argv[2];

if (!imagePath) {
  console.error("Please provide an image path as an argument");
  process.exit(1);
}

async function checkImageMetadata(imagePath: string) {
  try {
    console.log(`Checking metadata for: ${imagePath}`);

    const metadata = await sharp(imagePath).metadata();

    console.log("Image Metadata:");
    console.log("--------------------------------------------------");
    console.log(`Width: ${metadata.width}px`);
    console.log(`Height: ${metadata.height}px`);
    console.log(`Format: ${metadata.format}`);
    console.log(`DPI/Density: ${metadata.density || "Not specified"}`);
    console.log(`Color space: ${metadata.space || "Not specified"}`);
    console.log(`Channels: ${metadata.channels}`);
    console.log(`Has alpha channel: ${metadata.hasAlpha ? "Yes" : "No"}`);
    console.log(`Bit depth: ${metadata.depth}`);

    if (metadata.exif) {
      console.log("Has EXIF data: Yes");
    } else {
      console.log("Has EXIF data: No");
    }

    if (metadata.icc) {
      console.log("Has ICC profile: Yes");
    } else {
      console.log("Has ICC profile: No");
    }

    console.log("--------------------------------------------------");
  } catch (error) {
    console.error(`Error reading image metadata: ${error}`);
    process.exit(1);
  }
}

// Run the function
checkImageMetadata(imagePath);
