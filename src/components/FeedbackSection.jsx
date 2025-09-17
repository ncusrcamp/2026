// src/components/FeedbackSection.jsx
import Reveal from "./Reveal";
import "./FeedbackSection.css";
const base = import.meta.env.BASE_URL;

const images = [
  `${base}images/feedback1.jpg`,
  `${base}images/feedback2.jpg`,
  `${base}images/feedback3.jpg`,
  `${base}images/feedback4.jpg`,
  `${base}images/feedback5.jpg`,
  `${base}images/feedback6.jpg`,
];
export default function FeedbackSection() {
  return (
    <section className="feedback-section" id="feedback">
      <Reveal as="h2" className="feedback-title" animation="fade-up" once={true}>
        學員心得
      </Reveal>

      <div className="feedback-grid">
        {images.map((src, i) => (
          <Reveal
            key={i}
            as="figure"
            className="feedback-item"
            animation="fade-up"
            delay={100 + i * 120}
            once={true}
          >
            <img src={src} alt={`學員心得 ${i + 1}`} loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
