// src/components/ResultsSection.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import Reveal from "./Reveal";               // ⬅️ 新增
import "./ResultsSection.css";

const PHOTOS = [
  // 第一屆 (4)
  { id: "1-1", cohort: "第一屆", src: "/images/r1.jpg" },
  { id: "1-2", cohort: "第一屆", src: "/images/r2.jpg" },
  { id: "1-3", cohort: "第一屆", src: "/images/r3.jpg" },
  { id: "1-4", cohort: "第一屆", src: "/images/r4.jpg" },
  // 第二屆 (4)
  { id: "2-1", cohort: "第二屆", src: "/images/r5.jpg" },
  { id: "2-2", cohort: "第二屆", src: "/images/r6.jpg" },
  { id: "2-3", cohort: "第二屆", src: "/images/r7.jpg" },
  { id: "2-4", cohort: "第二屆", src: "/images/r8.jpg" },
  // 第三屆 (4)
  { id: "3-1", cohort: "第三屆", src: "/images/r9.jpg" },
  { id: "3-2", cohort: "第三屆", src: "/images/r10.jpg" },
  { id: "3-3", cohort: "第三屆", src: "/images/r11.jpg" },
  { id: "3-4", cohort: "第三屆", src: "/images/r12.jpg" },
];

// 固定的「隨機」順序
const FIXED_RANDOM_ORDER = [
  "3-2", "1-3", "2-4", "1-1",
  "2-1", "3-1", "1-2", "2-3",
  "3-4", "3-3", "2-2", "1-4",
];

const TABS = [
  { key: "*", label: "全部" },
  { key: ".filter-first", label: "第一屆" },
  { key: ".filter-second", label: "第二屆" },
  { key: ".filter-third", label: "第三屆" },
];

function clsForCohort(cohort) {
  if (cohort === "第一屆") return "filter-first";
  if (cohort === "第二屆") return "filter-second";
  return "filter-third";
}

export default function ResultsSection() {
  const [active, setActive] = useState("*");
  const gridRef = useRef(null);
  const isoRef = useRef(null);

  // 用固定順序排序出「全部」清單；各屆過濾後也依此順序
  const orderedPhotos = useMemo(() => {
    const map = new Map(PHOTOS.map(p => [p.id, p]));
    return FIXED_RANDOM_ORDER.map(id => map.get(id)).filter(Boolean);
  }, []);

  const listToRender = useMemo(() => {
    if (active === "*") return orderedPhotos;
    const wanted =
      active === ".filter-first" ? "第一屆" :
      active === ".filter-second" ? "第二屆" : "第三屆";
    return orderedPhotos.filter(p => p.cohort === wanted);
  }, [active, orderedPhotos]);

  // 初始化 Isotope（masonry；等待圖片載入完成）
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const imgLoad = imagesLoaded(el);
    imgLoad.on("always", () => {
      isoRef.current = new Isotope(el, {
        itemSelector: ".portfolio-item",
        layoutMode: "masonry",
        masonry: {
          columnWidth: ".grid-sizer",
          gutter: 0
        },
        transitionDuration: "0.4s",
      });
    });
    return () => { isoRef.current?.destroy(); };
  }, []);

  // 切換篩選
  useEffect(() => {
    if (!isoRef.current) return;
    isoRef.current.arrange({ filter: active });
  }, [active]);

  return (
    <section className="portfolio section-bg" id="results">
      <div className="container">
        {/* 標題：只觸發一次的 fade-up */}
        <Reveal as="h2" className="section-title" animation="fade-up" once={true}>
          歷年成果
        </Reveal>

        {/* 切換選項：只觸發一次的 fade-up */}
        <Reveal
          as="ul"
          className="portfolio-flters"
          id="portfolio-flters"
          animation="fade-up"
          delay={120}
          once={true}
        >
          {TABS.map(t => (
            <li
              key={t.key}
              className={active === t.key ? "filter-active" : ""}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </li>
          ))}
        </Reveal>

        {/* 整個圖片容器視為一體：只觸發一次的 fade-up */}
        <Reveal animation="fade-up" delay={180} once={true}>
          <div className="portfolio-container" ref={gridRef}>
            {/* Masonry 用的 column sizer */}
            <div className="grid-sizer" />
            {/* 永遠渲染全部 orderedPhotos，並帶上對應的 filter 類別 */}
            {orderedPhotos.map(p => (
              <div key={p.id} className={`portfolio-item ${clsForCohort(p.cohort)}`}>
                <div className="portfolio-wrap">
                  <img src={p.src} className="img-fluid" alt={p.cohort} />
                  <div className="portfolio-info">
                    <h4>{p.cohort}</h4>
                    <p>成果照片</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
