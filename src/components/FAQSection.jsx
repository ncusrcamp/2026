// src/components/FAQSection.jsx
import { useState } from "react";
import Reveal from "./Reveal";
import "./FAQSection.css";

const faqItems = [
  { question: "Q1：報名資格？", answer: "只要是桃園高中生皆可報名，若超過預期人數會進行篩選。" },
  { question: "Q2：如何報名？", answer: "高中端會收到中央大學寄送的公文，歡迎有興趣的高中生向師長詢問報名。" },
  { question: "Q3：參與費用？", answer: "本營隊全程免費且附餐，只需要你帶著一份真誠的心。" },
  { question: "Q4：報名期限？", answer: "報名期間為2026/1/10 ~ 2026/2/1。" }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <Reveal as="h2" className="faq-title" animation="fade-up" once>
        常見問題
      </Reveal>

      <Reveal className="faq-container" animation="fade-up" delay={120} once>
        {faqItems.map((item, idx) => {
          const isOpen = idx === openIndex;
          return (
            <div
              key={idx}
              className={`faq-item ${isOpen ? "open" : ""}`}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <button className="faq-question" aria-expanded={isOpen}>
                {item.question}
                <span className="arrow">{isOpen ? "−" : "+"}</span>
              </button>

              {/* 用 grid 高度動畫：0fr ⇄ 1fr */}
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
