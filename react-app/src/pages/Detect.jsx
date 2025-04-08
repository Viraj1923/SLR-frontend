import React, { useEffect, useRef, useState } from "react";
import "./Detect.css";

const BACKEND_URL = "https://slr-backend.onrender.com";

const Detect = () => {
  const [detectedLetter, setDetectedLetter] = useState("");
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start video stream
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("❌ Webcam access error:", err.message || err);
        setError("Unable to access webcam.");
      });
  }, []);

  // Capture and send frame every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = 96;
      canvas.height = 96;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

      // Check if image is too large
      if (imageBase64.length > 2_000_000) {
        console.warn("⚠️ Skipping frame: base64 image too large.");
        return;
      }

      console.log("📤 Sending image to backend...");
      console.log("Base64 size:", imageBase64.length);

      fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errMsg = await res.text();
            throw new Error(errMsg);
          }
          return res.json();
        })
        .then((data) => {
          console.log("✅ Prediction received:", data);
          if (data.label) setDetectedLetter(data.label);
        })
        .catch((err) => {
          console.error("❌ Prediction error:", err.message || err);
          setError("Prediction failed. Please try again.");
        });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="detect-container">
      <header className="App-header">
        <h1 className="title">Real-Time Sign Detection</h1>

        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline className="video-feed" />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <div className="output-box">
          <h2>
            Detected Letter:{" "}
            <span className="letter">{detectedLetter || "-"}</span>
          </h2>
          {error && <p className="error-msg">⚠️ {error}</p>}
        </div>
      </header>
    </div>
  );
};

export default Detect;
