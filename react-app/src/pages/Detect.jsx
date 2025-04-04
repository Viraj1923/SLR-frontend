import React, { useEffect, useState } from "react";
import "./Detect.css";

const BACKEND_URL = "https://slr-backend.onrender.com";

const Detect = () => {
  const [detectedLetter, setDetectedLetter] = useState("");

  useEffect(() => {
    // Fetch detected letter every 2 seconds
    const interval = setInterval(() => {
      fetch(`${BACKEND_URL}/predict`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          setDetectedLetter(data.label);
        })
        .catch((error) => console.error("Error fetching label:", error));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="detect-container">
      <header className="App-header">
        <h1 className="title">Real-Time Sign Detection</h1>
        <div className="video-container">
          <img
            src={`${BACKEND_URL}/video_feed`}
            alt="Video Feed"
            className="video-feed"
          />
        </div>
        <div className="output-box">
          <h2>Detected Letter: <span className="letter">{detectedLetter}</span></h2>
        </div>
      </header>
    </div>
  );
};

export default Detect;
