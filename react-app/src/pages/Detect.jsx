import React, { useEffect, useRef, useState } from "react";
import "./Detect.css";

const BACKEND_URL = "https://slr-backend.onrender.com";

const Detect = () => {
  const [detectedLetter, setDetectedLetter] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to video size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get base64 image from canvas
      const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

      // Send to backend
      fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Prediction:", data);
          if (data.label) {
            setDetectedLetter(data.label);
          }
        })
        .catch((err) => console.error("Prediction error:", err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="detect-container">
      <header className="App-header">
        <h1 className="title">Real-Time Sign Detection</h1>

        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video-feed"
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <div className="output-box">
          <h2>
            Detected Letter: <span className="letter">{detectedLetter}</span>
          </h2>
        </div>
      </header>
    </div>
  );
};

export default Detect;
