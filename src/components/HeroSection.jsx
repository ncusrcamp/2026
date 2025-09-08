// src/components/HeroSection.jsx
import { useEffect, useState } from "react";
import "./HeroSection.css";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg"
];

export default function HeroSection({ scrollY }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 背景輪播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5秒切換
    return () => clearInterval(interval);
  }, []);

  // Logo 滑動 & 透明度
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
          src="/images/logo.png"
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
