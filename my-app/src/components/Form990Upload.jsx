import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, FileCode, AlertCircle, Check } from "lucide-react";
import { extractTextFromPDF, parseForm990Text } from "../utils/pdfUtils";
import "./Form990Upload.css";

export default function Form990Upload({ onComplete }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Check file type
    const fileType = selectedFile.type;
    if (fileType !== "application/pdf") {
      setError("Please upload a PDF file for best results.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadStatus("Uploading your file...");

    try {
      // Read the file content
      const fileContent = await readFileAsArrayBuffer(file);

      // Store the raw PDF data for later use
      const rawPdfData = await readFileAsBinaryString(file);
      localStorage.setItem("form990RawData", rawPdfData);
      localStorage.setItem("form990FileName", file.name);

      // Extract text from PDF
      setUploadStatus("Extracting data from PDF...");
      let extractedText = "";
      try {
        extractedText = await extractTextFromPDF(fileContent);
      } catch (pdfError) {
        console.error("PDF extraction error:", pdfError);
        // Continue with the process even if text extraction fails
        extractedText = "PDF text extraction failed";
      }

      // Parse the extracted text into structured data if possible
      setUploadStatus("Parsing form data...");
      let structuredData = null;
      if (extractedText && extractedText.length > 100) {
        structuredData = parseForm990Text(extractedText);
      }

      // Store the structured data if we have it
      if (structuredData) {
        localStorage.setItem(
          "form990StructuredData",
          JSON.stringify(structuredData)
        );
      }

      // Even if PDF extraction fails, we can still navigate to the dashboard
      // and use fallback data
      setUploadStatus("Success! Preparing your dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Upload error:", error);
      setError("An error occurred during upload. Please try again.");
      setIsUploading(false);
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const readFileAsBinaryString = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const skipUpload = () => {
    if (onComplete) {
      onComplete(null);
    }
    navigate("/dashboard");
  };

  return (
    <div className="form990-page">
      <header className="form990-header">
        <div className="form990-logo">
          <img src="/Logo.png" alt="Donor Loop Logo" className="logo-image" />
          <span className="logo-text">Donor Loop</span>
        </div>
      </header>

      <div className="form990-container">
        <h1 className="form990-title">Upload Your 990 Form</h1>
        <p className="form990-subtitle">
          Upload your organization's 990 form to generate personalized analytics
          and insights. Please upload a PDF version of your form for best
          results.
        </p>

        {!isUploading ? (
          <>
            <div className="upload-area">
              <input
                type="file"
                id="form990-upload"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="form990-upload" className="upload-label">
                <div className="upload-icon-container">
                  <Upload size={40} />
                </div>
                <span className="upload-text">
                  {file ? file.name : "Drag and drop or click to upload"}
                </span>
                <span className="upload-formats">
                  <FileText size={16} /> PDF files only
                </span>
              </label>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="form990-buttons">
              <button className="skip-button" onClick={skipUpload}>
                Skip for now
              </button>
              <button
                className={`upload-button ${!file ? "disabled" : ""}`}
                onClick={handleUpload}
                disabled={!file}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <div className="upload-status">
            <div className="status-indicator">
              {uploadStatus === "Success! Preparing your dashboard..." ? (
                <Check size={40} className="success-icon" />
              ) : (
                <div className="loading-spinner"></div>
              )}
            </div>
            <p className="status-text">{uploadStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
}
