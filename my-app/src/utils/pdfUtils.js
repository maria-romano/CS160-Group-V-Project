import * as pdfjsLib from "pdfjs-dist";

// Set the worker source to use the public worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// Simplified version that just returns empty text
export async function extractTextFromPDF(pdfData) {
  console.log("PDF extraction skipped");
  return "";
}

// Parse extracted text into structured data - returns null to use fallback
export function parseForm990Text(text) {
  console.log("Form 990 parsing skipped");
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
