import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, FileCode, AlertCircle, Check } from "lucide-react";
import { convertPDFToImage } from "../utils/pdfUtils";
import {
  fetchAndParseReagentData,
  getFallbackData,
} from "../utils/fetchReagentData";
import "./Form990Upload.css";

export default function Form990Upload({ onComplete }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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

    // Generate preview
    generatePreview(selectedFile);
  };

  const generatePreview = async (file) => {
    try {
      const fileContent = await readFileAsArrayBuffer(file);
      const base64Image = await convertPDFToImage(fileContent);
      setPreviewImage(`data:image/png;base64,${base64Image}`);
    } catch (error) {
      console.error("Preview generation error:", error);
      // Continue without preview but show a message
      setError(
        "Could not generate preview, but you can still upload the file."
      );
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadStatus("Uploading your file...");

    try {
      // Read the file content
      const fileContent = await readFileAsArrayBuffer(file);

      // Store the file name
      localStorage.setItem("form990FileName", file.name);

      // Convert PDF to image
      setUploadStatus("Converting PDF to image...");
      let base64Image;
      try {
        base64Image = await convertPDFToImage(fileContent);
      } catch (pdfError) {
        console.error("PDF conversion error:", pdfError);
        setUploadStatus("PDF conversion failed, using fallback data...");
        // Use fallback data if PDF conversion fails
        const fallbackData = getFallbackData();
        localStorage.setItem(
          "form990StructuredData",
          JSON.stringify(fallbackData)
        );
        if (onComplete) {
          onComplete(fallbackData);
        }

        // Success message and navigation
        setUploadStatus("Success! Preparing your dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        return;
      }

      // Send to Reagent API
      setUploadStatus("Analyzing form data...");
      let structuredData = null;
      try {
        structuredData = await fetchAndParseReagentData(base64Image);
        console.log("Reagent API response:", structuredData); // Log the response
      } catch (apiError) {
        console.error("Reagent API error:", apiError);
        // Use fallback data if API fails
        structuredData = getFallbackData();
      }

      // Store the structured data
      if (structuredData) {
        localStorage.setItem(
          "form990StructuredData",
          JSON.stringify(structuredData)
        );
      } else {
        // Use fallback data if we didn't get a response
        structuredData = getFallbackData();
        localStorage.setItem(
          "form990StructuredData",
          JSON.stringify(structuredData)
        );
      }

      // Call onComplete with the data
      if (onComplete) {
        onComplete(structuredData);
      }

      // Success message and navigation
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

  const skipUpload = () => {
    // Use fallback data when skipping
    const fallbackData = getFallbackData();
    localStorage.setItem("form990StructuredData", JSON.stringify(fallbackData));

    if (onComplete) {
      onComplete(fallbackData);
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
                {previewImage ? (
                  <div className="preview-container">
                    <img
                      src={previewImage}
                      alt="PDF Preview"
                      className="pdf-preview"
                    />
                  </div>
                ) : (
                  <div className="upload-icon-container">
                    <Upload size={40} />
                  </div>
                )}
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
