import React, { useEffect, useState } from "react";
import "./Detect.css";

// ✅ Change this to your Render FastAPI backend URL when deployed
const API_BASE = "https://slr-backend.onrender.com"; // <- replace with your actual deployed backend URL

const Detect = () => {
  const [detectedLetter, setDetectedLetter] = useState("");
  const [lastSpoken, setLastSpoken] = useState("");

  useEffect(() => {
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    };

    const interval = setInterval(() => {
      fetch(`${API_BASE}/get_label`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          const label = data.label;
          setDetectedLetter(label);

          if (label && label !== "No Detection" && label !== lastSpoken) {
            speak(label);
            setLastSpoken(label);
          }
        })
        .catch((error) => console.error("Error fetching label:", error));
    }, 2000);

    return () => clearInterval(interval);
  }, [lastSpoken]);

  return (
    <div className="detect-container">
      <header className="App-header">
        <h1 className="title">Real-Time Sign Detection</h1>
        <div className="video-container">
          <img
            src={`${API_BASE}/video_feed`}
            alt="Video Feed"
            className="video-feed"
          />
        </div>
        <div className="output-box">
          <h2>
            Detected Letter:{" "}
            <span className="letter">{detectedLetter}</span>
          </h2>
        </div>
      </header>
    </div>
  );
};

export default Detect;
