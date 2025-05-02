import * as pdfjsLib from "pdfjs-dist";
// `?url` tells Vite "give me the URL after bundling"
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// -----------
// Utilities
// -----------
/**
 * Convert the first page of a PDF (ArrayBuffer) to a base-64 PNG string
 * @param {ArrayBuffer} pdfData
 * @returns {Promise<string>} base-64 PNG (no data-URL prefix)
 */
export async function convertPDFToImage(pdfData) {
  try {
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 2 }); // better resolution
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport,
    }).promise;

    return canvas.toDataURL("image/png").split(",")[1]; // strip prefix
  } catch (err) {
    console.error("Error converting PDF to image:", err);
    // graceful fallback: placeholder image
    return createPlaceholderImage("PDF preview not available");
  }
}

/**
 * Draw a simple placeholder image if PDF conversion fails
 */
function createPlaceholderImage(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#333";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png").split(",")[1];
}

// Legacy functions remain but are simplified
export async function extractTextFromPDF(pdfData) {
  console.log("PDF extraction skipped - using image conversion instead");
  return "";
}

export function parseForm990Text(text) {
  console.log("Form 990 parsing skipped - using Reagent API instead");
  return null;
}

// Helper functions remain but won't be used
function extractFoundationName(text) {
  return "Unknown Foundation";
}

function extractEIN(text) {
  return "XX-XXXXXXX";
}

function extractTaxYear(text) {
  return "2023";
}

function extractStreetAddress(text) {
  return "Unknown Street";
}

function extractCity(text) {
  return "Unknown City";
}

function extractState(text) {
  return "NY";
}

function extractZIP(text) {
  return "00000";
}

function extractTelephone(text) {
  return "000-000-0000";
}

function extractNumericValue(text, keywords) {
  return Math.floor(Math.random() * 9990000) + 10000;
}
