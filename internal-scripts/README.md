# Internal Scripts - PDF Generation

This directory contains scripts for generating PDFs from HTML content, specifically designed for wedding-related documents.

## Scripts Overview

### 1. `generate-pdf.ts` - Basic PDF Generator
A simple command-line tool for converting HTML to PDF with basic options.

### 2. `generate-pdf-advanced.ts` - Advanced PDF Generator
A comprehensive tool with template support, batch processing, and advanced options.

### 3. `pdf-utils.ts` - PDF Utilities
Utility functions and classes for PDF generation, including predefined templates.

## Installation

The PDF generation scripts require Puppeteer, which is already installed in the project:

```bash
bun add puppeteer
bun add -D @types/puppeteer
```

## Basic Usage

### Simple HTML to PDF Conversion

```bash
  # Convert HTML file to PDF (saves to internal-scripts/ folder)
  bun run internal-scripts/generate-pdf.ts input.html

  # Convert with custom output
  bun run internal-scripts/generate-pdf.ts --input input.html --output output.pdf

# Convert URL to PDF
bun run internal-scripts/generate-pdf.ts --input "https://example.com" --output website.pdf

# Convert HTML string to PDF
bun run internal-scripts/generate-pdf.ts --input "<html><body><h1>Hello World</h1></body></html>"
```

### Advanced Options

```bash
# Custom format and orientation
bun run internal-scripts/generate-pdf.ts --input input.html --format A4 --landscape --margin 2cm

# Custom viewport and wait conditions
bun run internal-scripts/generate-pdf.ts --input input.html --viewport-width 1920 --viewport-height 1080 --wait-for-selector ".content-loaded"

# Custom headers and footers
bun run internal-scripts/generate-pdf.ts --input input.html --header "<div>Header Content</div>" --footer "<div>Footer Content</div>"
```

## Template Usage

### Available Templates

The advanced script includes predefined templates for wedding documents:

- `wedding-invitation` - Wedding invitation template
- `wedding-program` - Wedding ceremony program template  
- `thank-you-card` - Thank you card template

### Using Templates

```bash
# List available templates
bun run internal-scripts/generate-pdf-advanced.ts --list-templates

# Show template information
bun run internal-scripts/generate-pdf-advanced.ts --template-info wedding-invitation

# Generate PDF from template
bun run internal-scripts/generate-pdf-advanced.ts --template wedding-invitation --template-data '{"DATE":"2024-12-31","TIME":"6:00 PM","LOCATION":"Venue Name","RSVP_INFO":"RSVP by Nov 30"}'
```

### Template Data Format

Templates use placeholder replacement with square brackets. For example:

```json
{
  "DATE": "December 31, 2024",
  "TIME": "6:00 PM", 
  "LOCATION": "Beautiful Venue, 123 Wedding Lane, City, Country",
  "RSVP_INFO": "Please RSVP by November 30, 2024"
}
```

## Batch Processing

### Batch File Format

Create a JSON file with an array of input configurations:

```json
{
  "inputs": [
    {
      "input": "input1.html",
      "output": "output1.pdf",
      "options": {
        "format": "A4",
        "landscape": false
      }
    },
    {
      "template": "wedding-invitation",
      "templateData": {
        "DATE": "2024-12-31",
        "TIME": "6:00 PM",
        "LOCATION": "Venue Name",
        "RSVP_INFO": "RSVP by Nov 30"
      },
      "output": "invitation.pdf"
    }
  ]
}
```

### Running Batch Processing

```bash
# Process batch file (saves to internal-scripts/output/ folder by default)
bun run internal-scripts/generate-pdf-advanced.ts --batch batch.json --output-dir ./output

# Use sample batch file
bun run internal-scripts/generate-pdf-advanced.ts --batch sample-batch.json --output-dir ./output
```

## PDF Options Reference

### Page Format
- `A4`, `A3`, `A2`, `A1`, `A0` (ISO standards)
- `Letter`, `Legal`, `Tabloid` (US standards)
- `25x10.5` (Custom format: 25 cm × 10.5 cm)
- Custom: `--width "8.5in" --height "11in"`

### Margins
- All margins: `--margin "1cm"`
- Individual margins: `--margin-top "2cm" --margin-right "1cm" --margin-bottom "2cm" --margin-left "1cm"`

### Orientation
- `--landscape` - Landscape orientation
- `--portrait` - Portrait orientation (default)

### Scaling and Quality
- `--scale 0.8` - Scale factor (0.1 to 2.0)
- `--timeout 30000` - Page load timeout in milliseconds

### Viewport Settings
- `--viewport-width 1920` - Viewport width in pixels
- `--viewport-height 1080` - Viewport height in pixels

### Wait Conditions
- `--wait-for-selector ".content-loaded"` - Wait for specific element
- `--wait-for-timeout 5000` - Wait timeout in milliseconds

## Examples

### Wedding Invitation
```bash
bun run internal-scripts/generate-pdf-advanced.ts \
  --template wedding-invitation \
  --template-data '{"DATE":"December 31, 2024","TIME":"6:00 PM","LOCATION":"Beautiful Venue, 123 Wedding Lane","RSVP_INFO":"Please RSVP by November 30, 2024"}' \
  --output invitation.pdf
```

### Wedding Program
```bash
bun run internal-scripts/generate-pdf-advanced.ts \
  --template wedding-program \
  --template-data '{"DATE":"December 31, 2024","TIME":"6:00 PM","LOCATION":"Beautiful Venue"}' \
  --output program.pdf
```

### Custom HTML Document
```bash
bun run internal-scripts/generate-pdf-advanced.ts \
  --input "<html><body><h1>Custom Document</h1><p>This is a custom HTML document.</p></body></html>" \
  --output custom.pdf \
  --format A4 \
  --landscape \
  --margin 2cm
```

### Website to PDF
```bash
bun run internal-scripts/generate-pdf-advanced.ts \
  --input "https://example.com" \
  --output website.pdf \
  --viewport-width 1920 \
  --viewport-height 1080 \
  --wait-for-selector ".main-content"
```

## Programmatic Usage

You can also use the PDF utilities programmatically:

```typescript
import { PDFGenerator, createPDFOptions } from './pdf-utils';

const generator = new PDFGenerator();

// Generate PDF from HTML
const pdfBuffer = await generator.generatePDF({
  input: '<html><body><h1>Hello World</h1></body></html>',
  output: 'output.pdf',
  options: createPDFOptions({
    format: 'A4',
    landscape: false,
    margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
  })
});

// Generate from template
await generator.generateFromTemplate(
  'wedding-invitation',
  { DATE: '2024-12-31', TIME: '6:00 PM', LOCATION: 'Venue Name', RSVP_INFO: 'RSVP by Nov 30' },
  'invitation.pdf'
);

await generator.close();
```

## Troubleshooting

### Common Issues

1. **Browser Launch Errors**: Ensure Puppeteer can launch Chrome/Chromium
2. **Timeout Errors**: Increase timeout with `--timeout` option
3. **Missing Elements**: Use `--wait-for-selector` to wait for specific elements
4. **Layout Issues**: Adjust viewport with `--viewport-width` and `--viewport-height`

### Performance Tips

1. Use `--wait-for-selector` instead of `--wait-for-timeout` when possible
2. Set appropriate viewport dimensions for your content
3. Use batch processing for multiple documents
4. Close browser instances when done (handled automatically in scripts)

## File Structure

```
internal-scripts/
├── generate-pdf.ts              # Basic PDF generator
├── generate-pdf-advanced.ts     # Advanced PDF generator with templates
├── pdf-utils.ts                 # PDF utility functions and templates
├── sample-batch.json           # Sample batch processing file
└── README.md                   # This documentation
```

## Dependencies

- `puppeteer` - PDF generation engine
- `@types/puppeteer` - TypeScript definitions
- `fs` - File system operations
- `path` - Path utilities

## License

This project is part of the wedding application and follows the same license terms.
