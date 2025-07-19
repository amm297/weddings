# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To get started, take a look at src/app/page.tsx.

## Slug-Based Routing

This application supports slug-based routing for wedding websites. Each wedding has a unique slug that is used to access its dedicated page.

### How It Works

- Access a wedding site at: `http://localhost:9002/{wedding-slug}`
- RSVP page is available at: `http://localhost:9002/{wedding-slug}/rsvp`
- The root URL (`/`) redirects to a default wedding

### Seeding Test Data

To populate the database with test wedding data:

```bash
# Create the scripts directory if it doesn't exist
mkdir -p scripts

# Run the seed script
bun run seed
```

This will create two example weddings:
- `default-wedding` - Accessible at `/default-wedding`
- `maria-juan` - Accessible at `/maria-juan`

## Using Bun

This project uses [Bun](https://bun.sh/) as the JavaScript runtime and package manager.

### Installation

If you don't have Bun installed, you can install it with:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Development

```bash
# Install dependencies
bun install

# Run the development server (uses Node.js for compatibility)
bun run dev

# Run the development server with Bun (without Turbopack)
bun run bun:dev

# Build for production
bun run build

# Start production server
bun run start
```

### Note on Compatibility

Due to compatibility issues between Bun and Next.js with Turbopack, the default `dev` script uses Node.js. If you want to use Bun for development, you can use the `bun:dev` script, but it won't use Turbopack.

## Firebase Emulators

This project includes Firebase emulators for local development.

### Running Emulators

```bash
# Start Firebase emulators
bun run firebase:emulators

# Start Firebase emulators and Next.js development server
bun run dev:firebase
```

### Data Persistence

Firebase emulators are configured to persist data between sessions. Data is automatically saved to the `.firebase-data` directory when the emulators stop, and loaded when they start.

```bash
# Start Firebase emulators with data import and Next.js development server
bun run dev:firebase:persist
```

This ensures that your development data (Firestore documents, authentication users, storage files) is preserved even when you stop and restart the emulators.

## Image Processing

This project includes a script to process images for Firestore upload by resizing, optimizing, and converting them to compressed base64 format.

### Processing Images

```bash
# Process a single image
bun run process:images path/to/image.jpg [output-path] [width] [height] [quality] [format] [preserveAspectRatio]

# Process all images in a directory
bun run process:images path/to/images/directory [output-directory] [width] [height] [quality] [format] [preserveAspectRatio]

# Example with all parameters (optimal for Firestore)
bun run process:images image.jpg output.txt 300 0 80 webp true
```

Parameters:
- `source-image-or-dir`: Path to the image or directory to process (required)
- `output-path`: Path where to save the output (defaults to public/images/processed)
- `width`: Target width in pixels (set to 0 to auto-calculate based on height and aspect ratio)
- `height`: Target height in pixels (set to 0 to auto-calculate based on width and aspect ratio)
- `quality`: Compression quality from 1-100 (defaults to 80)
- `format`: Output format - webp, jpeg, png, avif (defaults to webp)
- `preserveAspectRatio`: Whether to preserve aspect ratio (true/false, defaults to true)

The script optimizes images for Firestore storage by using WebP format and appropriate compression. It can output directly to text files for easy copying into Firestore string fields.
