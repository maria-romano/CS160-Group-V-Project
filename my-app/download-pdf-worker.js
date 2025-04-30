import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const nodeModulesPath = path.join(__dirname, 'node_modules');
const publicDir = path.join(__dirname, 'public');
const pdfjsDistPath = path.join(nodeModulesPath, 'pdfjs-dist');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Define the destination path
const workerDestPath = path.join(publicDir, 'pdf.worker.js');

// Possible locations for the legacy worker file
const possibleLegacyPaths = [
  path.join(pdfjsDistPath, 'legacy', 'build', 'pdf.worker.js'),
  path.join(pdfjsDistPath, 'legacy', 'build', 'pdf.worker.min.js'),
  path.join(pdfjsDistPath, 'legacy', 'build', 'pdf.worker.mjs'),
];

// Function to find and copy the PDF worker file
async function copyWorkerFile() {
  // First try the predefined legacy paths
  for (const workerPath of possibleLegacyPaths) {
    if (fs.existsSync(workerPath)) {
      console.log(`Found worker file at: ${workerPath}`);
      fs.copyFileSync(workerPath, workerDestPath);
      console.log(`PDF worker file copied to ${workerDestPath}`);
      return true;
    }
  }

  // If not found in predefined paths, use glob to search for any worker file
  console.log('Looking for worker file in node_modules...');
  try {
    const workerFiles = await glob('**/pdf.worker*.js', { cwd: nodeModulesPath });
    
    if (workerFiles.length > 0) {
      // Prefer files with 'legacy' in the path
      const legacyWorkerFile = workerFiles.find(file => file.includes('legacy'));
      const workerFile = legacyWorkerFile || workerFiles[0];
      
      const workerSourcePath = path.join(nodeModulesPath, workerFile);
      console.log(`Found worker file at: ${workerSourcePath}`);
      fs.copyFileSync(workerSourcePath, workerDestPath);
      console.log(`PDF worker file copied to ${workerDestPath}`);
      return true;
    }
    
    // If no worker file was found, create a simple one
    console.log('No worker file found, creating a minimal worker file.');
    const minimalWorkerContent = `
// This file was created by download-pdf-worker.js
// It's a minimal PDF.js worker stub that will need to be replaced in production
self.onmessage = function(event) {
  console.error('PDF.js worker not properly configured');
  self.postMessage({
    error: true,
    message: 'PDF.js worker not properly configured'
  });
};
`;
    fs.writeFileSync(workerDestPath, minimalWorkerContent);
    console.log(`Created minimal worker stub at ${workerDestPath}`);
    console.warn('Warning: This is a stub file. You may need to manually configure PDF.js worker in your application.');
    return false;
  } catch (error) {
    console.error('Error finding or copying worker file:', error);
    process.exit(1);
  }
}

// Execute the function
copyWorkerFile().then(success => {
  if (!success) {
    console.log('Worker file handling completed, but with fallback to stub file.');
  }
});

