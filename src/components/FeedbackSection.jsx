// src/components/FeedbackSection.jsx
import Reveal from "./Reveal";            // ⬅️ 補上
import "./FeedbackSection.css";

const images = [
  "/images/feedback1.png",
  "/images/feedback2.png",
  "/images/feedback3.png",
  "/images/feedback4.png",
  "/images/feedback5.png",
  "/images/feedback6.png",
];

export default function FeedbackSection() {
  return (
    <section className="feedback-section" id="feedback">
      {/* 標題浮出 */}
      <Reveal as="h2" className="feedback-title" animation="fade-up" once={true}>
        學員心得
      </Reveal>

      {/* 六張圖片依序浮出 */}
      <div className="feedback-grid">
        {images.map((src, i) => (
          <Reveal
            key={i}
            as="figure"
            className="feedback-item"
            animation="fade-up"
            delay={100 + i * 120}   // 每張延遲一點，形成階梯效果
            once={true}
          >
            <img src={src} alt={`學員心得 ${i + 1}`} loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
