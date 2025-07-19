# Wedding Scripts

This directory contains utility scripts for managing wedding data and assets.

## Import Wedding Data Script

The `import-wedding-data.ts` script imports wedding data from a JSON file into Firestore.

### Usage

1. Create a `.wedding-data.json` file in the project root with your wedding data (see example below)
2. Run the script:

```bash
# Normal import
bun run scripts/import-wedding-data.ts

# Dry run (uses .env.production and doesn't write to database)
bun run scripts/import-wedding-data.ts --dry-run

# Use local emulator
bun run scripts/import-wedding-data.ts --use-emulator
```

### Example Wedding Data File

Create a `.wedding-data.json` file in the project root with the following structure:

```json
{
  "slug": "your-wedding-slug",
  "title": "Your Wedding Title",
  "date": "2024-12-31T18:00:00.000Z",
  "location": {
    "name": "Wedding Venue Name",
    "address": "123 Wedding Lane, City, Country",
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  },
  "couple": {
    "person1": {
      "name": "Person 1 Name",
      "description": "About person 1"
    },
    "person2": {
      "name": "Person 2 Name",
      "description": "About person 2"
    }
  },
  "events": [
    {
      "title": "Ceremony",
      "time": "2024-12-31T18:00:00.000Z",
      "description": "Wedding ceremony description"
    },
    {
      "title": "Reception",
      "time": "2024-12-31T19:00:00.000Z",
      "description": "Reception description"
    }
  ],
  "rsvpDeadline": "2024-11-30T23:59:59.000Z",
  "accommodations": [
    {
      "name": "Hotel Name",
      "address": "123 Hotel Street, City, Country",
      "description": "Hotel description",
      "bookingUrl": "https://hotel-booking-url.com"
    }
  ]
}
```

Note: The script will automatically convert date strings to Firestore timestamps. 

## Image Processing Script

The `process-images.ts` script processes images by resizing and optimizing them for Firestore upload, converting them to compressed base64 format. It now supports aspect ratio preservation.

### Usage

```bash
# Process a single image
bun run scripts/process-images.ts path/to/image.jpg [output-path] [width] [height] [quality] [format] [preserveAspectRatio]

# Process all images in a directory
bun run scripts/process-images.ts path/to/images/directory [output-directory] [width] [height] [quality] [format] [preserveAspectRatio]

# Example with all parameters
bun run scripts/process-images.ts image.jpg output.txt 300 0 80 webp true
```

Parameters:
- `source-image-or-dir`: Path to the image or directory to process (required)
- `output-path`: Path where to save the output (defaults to public/images/processed)
- `width`: Target width in pixels (set to 0 to auto-calculate based on height and aspect ratio)
- `height`: Target height in pixels (set to 0 to auto-calculate based on width and aspect ratio)
- `quality`: Compression quality from 1-100 (defaults to 80)
- `format`: Output format - webp, jpeg, png, avif (defaults to webp)
- `preserveAspectRatio`: Whether to preserve aspect ratio (true/false, defaults to true)

### Features

- Resizes images to specified size with center cropping (default 240x240)
- Optimizes images with format-specific compression settings
- Converts images to base64 format with data URL prefix for direct use in HTML/CSS
- Supports various output formats (WebP, JPEG, PNG, AVIF) with WebP as default for best compression
- Flexible output options based on file extension:
  - `.txt` files: Writes base64 string directly
  - `.json` files: Writes JSON with metadata and base64
  - Other files: Saves processed image with companion base64 text file
- Displays base64 string size in KB for reference
- Can process a single image or an entire directory
- Creates output directories if they don't exist

### Output

For a single image with `.txt` output:
- A text file containing the base64 data URL string

For a single image with `.json` output:
- A JSON file with the base64 data and metadata

For a single image with image output:
- The processed image file
- A companion `.base64.txt` file with the base64 data

For a directory of images:
- All processed image files
- A companion `.base64.txt` file for each image
- A single `processed-images.json` file containing base64 data for all images