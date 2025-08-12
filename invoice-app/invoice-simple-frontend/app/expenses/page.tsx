"use client";
import Navbar from "../components/navbar";
import { useState, useCallback } from "react";

export default function Expenses() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Allowed file types
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  // Handle file validation
  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setUploadError(`File type not supported: ${file.type}`);
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError("File size exceeds 5MB limit");
      return false;
    }
    return true;
  };

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError(null);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);

    if (validFiles.length !== droppedFiles.length) {
      setUploadError("Some files were not accepted. Only JPG, JPEG, PNG, WEBP allowed.");
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      simulateUpload(validFiles);
    }
  }, []);

  // Handle file input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(validateFile);

      if (validFiles.length !== selectedFiles.length) {
        setUploadError("Some files were not accepted. Only JPG, JPEG, PNG, WEBP allowed.");
      }

      if (validFiles.length > 0) {
        setFiles(prev => [...prev, ...validFiles]);
        simulateUpload(validFiles);
      }
    }
  };

  // Simulate file upload (replace with actual API call)
  const simulateUpload = (filesToUpload: File[]) => {
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    // In a real app, you would use something like:
    // const formData = new FormData();
    // filesToUpload.forEach(file => formData.append('receipts', file));
    // axios.post('/api/expenses/upload', formData, {
    //   onUploadProgress: progressEvent => {
    //     const progress = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     setUploadProgress(progress);
    //   }
    // })
  };

  // Remove file from list
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "32px",
          fontFamily: "sans-serif",
          backgroundColor: "#F9F9F9",
          minHeight: "100vh",
        }}
      >
        {/* Upload Receipt Section */}
        <div
          style={{
            backgroundColor: isDragging ? "#D6F7ED" : "#E6FCF6",
            border: `2px dashed ${isDragging ? "#1DB48D" : "#2ED4A7"}`,
            borderRadius: "8px",
            padding: "32px",
            textAlign: "center",
            color: "#2ED4A7",
            fontWeight: "bold",
            marginBottom: "24px",
            transition: "all 0.2s ease",
            position: "relative",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="receipt-upload"
            accept=".jpg,.jpeg,.png,.webp"
            multiple
            onChange={handleFileInput}
            style={{ display: "none" }}
          />
          <label
            htmlFor="receipt-upload"
            style={{
              cursor: "pointer",
              display: "block",
              padding: "20px",
            }}
          >
            {isDragging ? "Drop your receipts here" : "Drag or upload your receipt (jpg/jpeg/png/webp)"}
          </label>
          
          {uploadProgress !== null && (
            <div style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              height: "4px",
              backgroundColor: "#E6FCF6",
              borderRadius: "0 0 8px 8px",
              overflow: "hidden",
            }}>
              <div
                style={{
                  height: "100%",
                  width: `${uploadProgress}%`,
                  backgroundColor: "#2ED4A7",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          )}
        </div>

        {uploadError && (
          <div style={{
            color: "#E74C3C",
            backgroundColor: "#FDEDED",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "16px",
            fontSize: "14px",
          }}>
            {uploadError}
          </div>
        )}

        {/* Uploaded Files Preview */}
        {files.length > 0 && (
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}>
            <h3 style={{ marginBottom: "12px", color: "#555" }}>Uploaded Receipts</h3>
            <div style={{ display: "grid", gap: "8px" }}>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "4px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#2ED4A7" }}>
                      {file.type.split('/')[1].toUpperCase()}
                    </span>
                    <span>{file.name}</span>
                    <span style={{ color: "#777", fontSize: "12px" }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#E74C3C",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <button
            style={{
              backgroundColor: "#fff",
              color: "#2ED4A7",
              border: "1px solid #2ED4A7",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Export
          </button>
          <button
            style={{
              backgroundColor: "#2ED4A7",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            New Expense
          </button>
        </div>

        {/* Table Headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr 2fr 1fr",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            fontWeight: "bold",
            color: "#555",
            marginBottom: "32px",
          }}
        >
          <div>Merchant</div>
          <div>Description</div>
          <div>Date</div>
          <div>Total</div>
        </div>

        {/* Empty State */}
        {files.length === 0 && (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "48px",
              textAlign: "center",
              color: "#555",
            }}
          >
            <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
              Easy Expense Tracker
            </h2>
            <p style={{ marginBottom: "24px", fontSize: "14px" }}>
              Scan any receipt and Invoice Simple captures the key info automatically
            </p>
            <label
              htmlFor="receipt-upload"
              style={{
                backgroundColor: "#2ED4A7",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              + Upload your receipt
            </label>
          </div>
        )}
      </div>
    </>
  );
}