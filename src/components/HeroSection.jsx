// src/components/HeroSection.jsx
import { useEffect, useState } from "react";
import "./HeroSection.css";
const base = import.meta.env.BASE_URL;

const images = [
  `${base}images/bg1.jpg`,
  `${base}images/bg2.jpg`,
  `${base}images/bg3.jpg`
];

export default function HeroSection({ scrollY }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroHeight = window.innerHeight;
  const progress = Math.min(scrollY / heroHeight, 1);
  const translateY = progress * 150;
  const opacity = 1 - progress;

  return (
    <section className="hero-section">
      {images.map((img, index) => (
        <div
          key={index}
          className={`bg-image ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="overlay">
        <img
          src={`${base}images/logo.png`}
          alt="Logo"
          className="hero-logo"
          style={{
            transform: `translateY(${translateY}px)`,
            opacity: opacity
          }}
        />
      </div>
    </section>
  );
}
