// src/components/CoreValues.jsx
import { useRef } from "react";
import "./CoreValues.css";
import Reveal from "./Reveal";
import PetalRain from "./PetalRain";
import { FaHandHoldingHeart, FaGlobe, FaLeaf, FaLanguage } from "react-icons/fa";

export default function CoreValues() {
  const sectionRef = useRef(null);

  return (
    <section className="core-values-section" id="value" ref={sectionRef}>
      <PetalRain
        targetRef={sectionRef}
        images={[
          "/images/petal1.png",
          "/images/petal2.png",
          "/images/petal3.png",
        ]}
        density={0.8}
      />

      <Reveal as="h2" className="core-title" animation="fade-up" once={true}>
        核心價值
      </Reveal>

      <div className="core-values">
        <Reveal className="core-row" animation="fade-up" delay={120} once={true}>
          <div className="core-row">
            <FaHandHoldingHeart className="icon" />
            <div className="dashed-line"></div>
            <div className="core-text">
              <h3>在地關懷</h3>
              <p>從在地需求出發，並透過人文關懷協助解決區域問題。</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="core-row" animation="fade-up" delay={240} once={true}>
          <div className="core-row">
            <div className="core-text">
              <h3>國際交流</h3>
              <p>去接近、認識和理解國際事務文化。</p>
            </div>
            <div className="dashed-line"></div>
            <FaGlobe className="icon" />
          </div>
        </Reveal>

        <Reveal className="core-row" animation="fade-up" delay={360} once={true}>
          <div className="core-row">
            <FaLeaf className="icon" />
            <div className="dashed-line"></div>
            <div className="core-text">
              <h3>永續發展</h3>
              <p>努力實現環境保護、經濟和永續發展目標。</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="core-row" animation="fade-up" delay={480} once={true}>
          <div className="core-row">
            <div className="core-text">
              <h3>雙語表達</h3>
              <p>經由語言的媒介擴大視野、走入世界。</p>
            </div>
            <div className="dashed-line"></div>
            <FaLanguage className="icon" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
