// src/components/PetalRain.jsx
import { useEffect, useRef, useState } from "react";
import "./PetalRain.css";

export default function PetalRain({ targetRef, images = [], density = 0.6 }) {
  const layerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!targetRef?.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 進入至少 40% 視窗高度才啟動
        setActive(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2, 1] }
    );
    io.observe(targetRef.current);
    return () => io.disconnect();
  }, [targetRef]);

  useEffect(() => {
    if (!active || !layerRef.current || images.length === 0) return;

    let rafId;
    let last = performance.now();
    let acc = 0;

    const spawnOne = () => {
      // 外層：div.petal（垂直落下）
      const wrapper = document.createElement("div");
      wrapper.className = "petal";

      // 內層：img.petal-img（左右擺動）
      const img = document.createElement("img");
      img.className = "petal-img";
      img.src = images[Math.floor(Math.random() * images.length)];

      // 隨機參數
      const left = Math.random() * 100;              // 0~100%
      const fall = 6 + Math.random() * 8;            // 6~14s
      const sway = 2.2 + Math.random() * 2.6;        // 2.2~4.8s
      const swayAmp = 18 + Math.random() * 42;       // 18~60px
      const delay = Math.random() * 0.8;             // 0~0.8s
      const size = 15 + Math.random() * 5;          

      wrapper.style.setProperty("--left", `${left}%`);
      wrapper.style.setProperty("--fall", `${fall}s`);
      wrapper.style.setProperty("--delay", `${delay}s`);

      img.style.setProperty("--sway", `${sway}s`);
      img.style.setProperty("--amp", `${swayAmp}px`);
      img.style.setProperty("--delay", `${delay}s`);
      img.style.setProperty("--size", `${size}px`);

      // 動畫結束移除（以外層 fall 為準）
      const onEnd = (e) => {
        if (e.animationName === "petal-fall" && wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      };
      wrapper.addEventListener("animationend", onEnd, { once: true });

      wrapper.appendChild(img);
      layerRef.current.appendChild(wrapper);
    };

    // 依密度生成
    const tick = (now) => {
      const dt = (now - last) / 1000; // 秒
      last = now;
      acc += dt * density;
      while (acc >= 1) {
        spawnOne();
        acc -= 1;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [active, images, density]);

  return <div ref={layerRef} className={`petal-layer ${active ? "on" : ""}`} aria-hidden="true" />;
}
