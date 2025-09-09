// src/components/Reveal.jsx
import { useEffect, useRef, useState } from "react";
import "./reveal.css";

export default function Reveal({
  children,
  as: Tag = "div",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  delay = 0,
  animation = "fade-up",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
