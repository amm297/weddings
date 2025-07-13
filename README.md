# Firebase Studio

This is a NextJS starter in Firebase Studio.

## Getting Started

To get started, take a look at src/app/page.tsx.

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
