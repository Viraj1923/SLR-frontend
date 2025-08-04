// UploadPredict.jsx
import React, { useState } from "react";
import axios from "axios";
import "./UploadDetect.css";

const API_BASE = "http://127.0.0.1:8000"; // FastAPI backend

const UploadDetect = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setPrediction(""); // Reset old prediction
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage, selectedImage.name);

    try {
      const response = await axios.post(`${API_BASE}/predict`, formData);
      setPrediction(response.data.label);
    } catch (err) {
      console.error("Prediction error:", err);
      setPrediction("Error");
    }
  };

  return (
    <div className="upload-container">
      <h2>Test Sign Language Model (Manual Image Upload)</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={!selectedImage}>
        Predict
      </button>
      {selectedImage && (
        <div className="preview">
          <p>Preview:</p>
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
        </div>
      )}
      {prediction && (
        <div className="result">
          <p>Predicted Label: <strong>{prediction}</strong></p>
        </div>
      )}
    </div>
  );
};

export default UploadDetect;
