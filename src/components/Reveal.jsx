// src/components/Reveal.jsx
import { useEffect, useRef, useState } from "react";
import "./reveal.css";

export default function Reveal({
  children,
  as: Tag = "div",
  threshold = 0.15,         // 進入畫面多少比例觸發
  rootMargin = "0px 0px -10% 0px", // 提前一點觸發
  once = true,              // 只觸發一次
  delay = 0,                // 毫秒延遲
  animation = "fade-up",    // 動畫種類：fade-up / fade / fade-right / fade-left
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 無障礙：使用者偏好減少動態 → 直接顯示
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            if (delay) {
              const t = setTimeout(() => setVisible(true), delay);
              if (!once) {
                return () => clearTimeout(t);
              }
            } else {
              setVisible(true);
            }
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            // 若允許重複觸發：離開視口時隱藏
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${animation} ${visible ? "is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
