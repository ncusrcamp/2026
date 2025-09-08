// src/components/NewsSection.jsx
import "./NewsSection.css";

const newsData = [
  { date: "2025-09-01", title: "大學端工人招募開始囉~" },
  { date: "2025-09-01", title: "大學端工人招募開始囉~" },
  { date: "2025-09-01", title: "大學端工人招募開始囉~" },
  { date: "2025-08-31", title: "2025桃園雙語導覽工作坊官方網站上架" },
  { date: "2025-08-18", title: "2025桃園雙語導覽工作坊官方IG帳號登場" }
];

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <h2 className="news-title">最新消息</h2>
      <div className="news-container">
        {newsData.map((news, index) => (
          <div className="news-item" key={index}>
            <div className="news-date">{news.date}</div>
            <div className="news-content">{news.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
