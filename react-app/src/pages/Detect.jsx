import React, { useEffect, useRef, useState } from "react";
import "./Detect.css";

const BACKEND_URL = "https://slr-backend.onrender.com";

const Detect = () => {
  const [detectedLetter, setDetectedLetter] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Access the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    const interval = setInterval(() => {
      captureAndSendFrame();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg").split(",")[1]; // base64

      fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      })
        .then((res) => res.json())
        .then((data) => {
          setDetectedLetter(data.label);
        })
        .catch((err) => console.error("Prediction error:", err));
    }
  };

  return (
    <div className="detect-container">
      <header className="App-header">
        <h1 className="title">Real-Time Sign Detection</h1>
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            className="video-feed"
            width="320"
            height="240"
          />
          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width="64"
            height="64"
          />
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
