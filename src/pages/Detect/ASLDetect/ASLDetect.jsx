import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "./ASLDetect.css";

const API_BASE = "https://viraj1923-slr-backend-hugging.hf.space"; // FastAPI backend

const ASLDetect = () => {
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);
  const [detectedLetter, setDetectedLetter] = useState("");
  const [lastSpoken, setLastSpoken] = useState("");
  const [lastSpokenTime, setLastSpokenTime] = useState(Date.now());
  const [showFeed, setShowFeed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const speak = (text) => {
    speechSynthesis.cancel(); // 🧼 Cancel any pending utterances
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2; // 🔊 Slightly faster speech
    speechSynthesis.speak(utterance);
  };

  const sendFrame = async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) return;

    const byteCharacters = atob(screenshot.split(",")[1]);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const label = data.label;
      setDetectedLetter(label);

      // ✅ Debounced & clean speech output
      if (
        label &&
        label !== "No Detection" &&
        label !== lastSpoken &&
        Date.now() - lastSpokenTime > 1000 // at least 1s between spoken letters
      ) {
        speak(label);
        setLastSpoken(label);
        setLastSpokenTime(Date.now());
      }
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };

  const handleStart = () => {
    setShowFeed(true);
    intervalRef.current = setInterval(sendFrame, 1000); // 🔁 every 1 second
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setShowFeed(false);
    setDetectedLetter("");
    setLastSpoken("");
  };

  return (
    <div className="detect-container">
      <header className="App-header">
        <h1 className="title">Real-Time Sign Detection</h1>

        {showFeed ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user",
            }}
            className="video-feed"
          />
        ) : (
          <p className="video-placeholder">Click Start Detection to begin</p>
        )}

        {showFeed && (
          <div className="output-box">
            <h2>
              Detected Letter: <span className="letter">{detectedLetter}</span>
            </h2>
          </div>
        )}

        <div className="button-group">
          {!showFeed ? (
            <button className="detect-button" onClick={handleStart}>
              Start Detection
            </button>
          ) : (
            <button className="detect-button stop" onClick={handleStop}>
              Stop Detection
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default ASLDetect;
