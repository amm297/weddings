#!/usr/bin/env bun

import * as fs from "fs";
import puppeteer, { Browser } from "puppeteer";

function printHelp() {
  console.log(`
PDF Generator - Simple Puppeteer Setup

Usage: bun run internal-scripts/generate-pdf-simple.ts [input] [output]

Arguments:
  input     HTML file path (optional, defaults to menu.html)
  output    Output PDF file path (optional, defaults to menu-simple.pdf)

Options:
  -h, --help    Show this help message

Examples:
  # Use default files
  bun run internal-scripts/generate-pdf-simple.ts

  # Specify input file
  bun run internal-scripts/generate-pdf-simple.ts menu.html

  # Specify both input and output
  bun run internal-scripts/generate-pdf-simple.ts menu.html output.pdf

  # Use with custom paths
  bun run internal-scripts/generate-pdf-simple.ts /path/to/input.html /path/to/output.pdf
`);
}

async function generatePDFSimple(inputPath?: string, outputPath?: string) {
  // Parse command line arguments
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes("-h") || args.includes("--help")) {
    printHelp();
    return;
  }

  const htmlPath =
    inputPath ||
    args[0] ||
    "/Users/alberto/Documents/pruebas/weddings/internal-scripts/paula-fran/menu.html";
  const finalOutputPath =
    outputPath ||
    args[1] ||
    "/Users/alberto/Documents/pruebas/weddings/internal-scripts/paula-fran/menu-simple.pdf";

  // Validate input file exists
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Input file not found: ${htmlPath}`);
    console.error("Use -h or --help for usage information");
    process.exit(1);
  }

  console.log("🚀 Generating PDF with simple Puppeteer setup...");
  console.log(`📄 Input: ${htmlPath}`);
  console.log(`📄 Output: ${finalOutputPath}`);

  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set viewport to exact size (105mm x 250mm at 300 DPI)
    await page.setViewport({
      width: 1240, // 105mm * 300 DPI / 25.4
      height: 2953, // 250mm * 300 DPI / 25.4
    });

    // Load HTML
    const htmlContent = fs.readFileSync(htmlPath, "utf8");
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for background image
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate PDF with zero margins
    const pdfBuffer = await page.pdf({
      width: "105mm",
      height: "250mm",
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      scale: 1,
    });

    // Save PDF
    fs.writeFileSync(finalOutputPath, pdfBuffer);

    console.log(`✅ PDF generated: ${finalOutputPath}`);
    console.log(`📊 File size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePDFSimple().catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  });
}
