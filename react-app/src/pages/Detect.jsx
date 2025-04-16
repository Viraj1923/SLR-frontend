import React, { useEffect, useRef, useState } from "react";
import "./Detect.css";

const API_BASE = "https://slr-backend.onrender.com"; // ✅ Your deployed FastAPI backend

const Detect = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedLetter, setDetectedLetter] = useState("");
  const [lastSpoken, setLastSpoken] = useState("");

  useEffect(() => {
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const sendFrame = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = 224;
      canvas.height = 224;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL("image/jpeg");

      try {
        const res = await fetch(`${API_BASE}/video_feed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await res.json();
        const label = data.label;
        setDetectedLetter(label);

        if (label && label !== "No Detection" && label !== lastSpoken) {
          speak(label);
          setLastSpoken(label);
        }
      } catch (error) {
        console.error("Prediction error:", error);
      }
    };

    startVideo();
    const interval = setInterval(sendFrame, 2000);

    return () => {
      clearInterval(interval);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [lastSpoken]);

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
            Detected Letter: <span className="letter">{detectedLetter}</span>
          </h2>
        </div>
      </header>
    </div>
  );
};

export default Detect;
