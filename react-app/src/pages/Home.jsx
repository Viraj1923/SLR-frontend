import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const elementsRef = useRef([]);
  const [visibleElements, setVisibleElements] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const newVisibleElements = elementsRef.current.map((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.75;
        }
        return false;
      });
      setVisibleElements(newVisibleElements);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-container text-center p-10 back">
      <div className="imgs">
        <img 
          ref={(el) => (elementsRef.current[0] = el)}
          src="./assets/SignHand 1.svg" 
          alt="logo" 
          className={`scroll-element ${visibleElements[0] ? "visible" : ""}`} 
        />
        <img 
          ref={(el) => (elementsRef.current[1] = el)}
          src="/public/home-text.svg" 
          alt="hometxt" 
          className={`scroll-element ${visibleElements[1] ? "visible" : ""}`} 
        />
      </div>
      <img 
        ref={(el) => (elementsRef.current[2] = el)}
        className={`about scroll-element ${visibleElements[2] ? "visible" : ""}`} 
        src="/public/about.svg" 
        alt="about" 
      />
      <img 
        ref={(el) => (elementsRef.current[3] = el)}
        className={`about scroll-element ${visibleElements[3] ? "visible" : ""}`} 
        src="/public/ourTeam.svg" 
        alt="team" 
      />
    </div>
  );
};

export default Home;
