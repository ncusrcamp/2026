import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  // 捲動：下滑隱藏、上滑顯示
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y <= 0) {
            setShow(true);
          } else {
            if (y - lastY > 5) setShow(false);
            if (lastY - y > 5) setShow(true);
          }
          setLastY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <nav className={`navbar ${show ? "navbar-visible" : "navbar-hidden"}`}>
      <ul>
        {/*<li><a href="#news">最新消息</a></li>*/}
        <li className="dropdown">
          <a href="#intro" className="dropdown-trigger">
            介紹
            <span className="caret" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
              </svg>
            </span>
          </a>
          <ul className="dropdown-menu">
            <li><a href="#camp">營隊介紹</a></li>
            <li><a href="#hakka">桃園客家文化介紹</a></li>
            <li><a href="#longtan">龍潭地區特色介紹</a></li>
          </ul>
        </li>

        <li><a href="#value">核心價值</a></li>
        <li><a href="#photos">歷年照片</a></li>
        <li><a href="#results">歷年成果</a></li>
        <li><a href="#feedback">學員心得</a></li>
        <li><a href="#faq">常見問題</a></li>
      </ul>
    </nav>
  );
}
