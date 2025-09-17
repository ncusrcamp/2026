// src/components/PhotosSection.jsx
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import "./PhotosSection.css";
const base = import.meta.env.BASE_URL;

export default function PhotosSection() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  const photosRow1 = [`${base}images/p1.jpg`, `${base}images/p2.jpg`, `${base}images/p3.jpg`, `${base}images/p4.jpg`, `${base}images/p5.jpg`, `${base}images/p6.jpg`,`${base}images/p6.jpg`, `${base}images/p7.jpg`];
  const photosRow2 = [`${base}images/p8.jpg`, `${base}images/p9.jpg`, `${base}images/p10.jpg`, `${base}images/p11.jpg`, `${base}images/p12.jpg`, `${base}images/p13.jpg`,`${base}images/p14.jpg`, `${base}images/p15.jpg`];
  const photosRow3 = [`${base}images/p16.jpg`, `${base}images/p17.jpg`, `${base}images/p18.jpg`, `${base}images/p19.jpg`, `${base}images/p20.jpg`, `${base}images/p21.jpg`,`${base}images/p22.jpg`, `${base}images/p23.jpg`];

  useEffect(() => {
    const createInfiniteScroll = (container, speed, direction = "left") => {
      if (!container) return;
      const content = container.querySelector(".scroll-content");
      if (!content) return;

      const imgs = Array.from(content.querySelectorAll("img"));
      let loaded = 0;
      const onImgLoad = () => {
        loaded++;
        if (loaded === imgs.length) start();
      };
      if (imgs.length === 0) start();
      else imgs.forEach(img => {
        if (img.complete) onImgLoad();
        else img.addEventListener("load", onImgLoad, { once: true });
      });

      let offset;
      let animId;

      function start() {
        const half = content.scrollWidth / 2;
        offset = direction === "right" ? -half : 0;

        const tick = () => {
          if (direction === "left") {
            offset -= speed;
            if (offset <= -half) offset = 0;
          } else {
            offset += speed;
            if (offset >= 0) offset = -half;
          }
          content.style.transform = `translateX(${offset}px)`;
          animId = requestAnimationFrame(tick);
        };
        tick();
      }

      return () => {
        if (animId) cancelAnimationFrame(animId);
      };
    };

    const cleanups = [];
    cleanups.push(createInfiniteScroll(row1Ref.current, 0.5, "left"));
    cleanups.push(createInfiniteScroll(row2Ref.current, 0.5, "right"));
    cleanups.push(createInfiniteScroll(row3Ref.current, 0.5, "left"));

    return () => cleanups.forEach(c => typeof c === "function" && c());
  }, []);

  return (
    <section className="photos-section" id="photos">
      <Reveal as="h2" className="section-title" animation="fade-up" once={true}>
        歷年照片
      </Reveal>

      <Reveal className="reveal-wrap" animation="fade-up" delay={120} once={true}>
        <div className="photo-row" ref={row1Ref}>
          <div className="scroll-content">
            {photosRow1.concat(photosRow1).map((src, i) => (
              <img key={i} src={src} alt={`row1-${i}`} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="reveal-wrap" animation="fade-up" delay={220} once={true}>
        <div className="photo-row" ref={row2Ref}>
          <div className="scroll-content">
            {photosRow2.concat(photosRow2).map((src, i) => (
              <img key={i} src={src} alt={`row2-${i}`} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="reveal-wrap" animation="fade-up" delay={320} once={true}>
        <div className="photo-row" ref={row3Ref}>
          <div className="scroll-content">
            {photosRow3.concat(photosRow3).map((src, i) => (
              <img key={i} src={src} alt={`row3-${i}`} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
