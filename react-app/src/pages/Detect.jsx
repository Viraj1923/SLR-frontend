import React, { useEffect, useRef, useState } from "react";
import "./Detect.css";

const BACKEND_URL = "https://slr-backend.onrender.com";

const Detect = () => {
  const [detectedLetter, setDetectedLetter] = useState("");
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start webcam
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("❌ Webcam access error:", err.message);
        setError("Unable to access webcam.");
      });
  }, []);

  // Continuous prediction loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current || isSending) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = 96;
      canvas.height = 96;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

      if (imageBase64.length > 2_000_000) return;

      setIsSending(true);
      fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
          return res.json();
        })
        .then((data) => {
          if (data.label) setDetectedLetter(data.label);
          setError(null);
        })
        .catch((err) => {
          console.error("❌ Prediction error:", err.message);
          setError("Prediction failed.");
        })
        .finally(() => {
          setIsSending(false);
        });
    }, 200); // ~5 FPS

    return () => clearInterval(interval);
  }, [isSending]);

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
