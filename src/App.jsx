import { useEffect, useState } from "react";
import BackgroundMusic from "./components/BackgroundMusic";
import FloatingControls from "./components/FloatingControls";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NewsSection from "./components/NewsSection";
import IntroSection from "./components/IntroSection";
import CoreValues from "./components/CoreValues";
import PhotosSection from "./components/PhotosSection";
import ResultsSection from "./components/ResultsSection";
import FeedbackSection from "./components/FeedbackSection";
import FAQSection from "./components/FAQSection";
import "./App.css";

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="content-section">
      <HeroSection scrollY={scrollY} />
      <div className="spacer"></div>
      <BackgroundMusic />
      <FloatingControls />
      <Navbar />
      <IntroSection />
      <CoreValues />
      <PhotosSection />
      <ResultsSection />
      <FeedbackSection />
      <FAQSection />
    </div>
  );
}
