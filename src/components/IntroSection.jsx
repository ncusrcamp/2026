// src/components/IntroSection.jsx
import Reveal from "./Reveal";
import "./IntroSection.css";

export default function IntroSection() {
  return (
    <section className="intro-section" id="intro">
      {/* Row 1 */}
      <Reveal as="div" className="r1-left-img" animation="fade-up" delay={0} once={true}>
        <img
          src="/images/side-img2.png"
          alt="插入圖片2"
          className="art"
          style={{ "--dx": "-8px", "--dy": "100px", "--rot": "-2deg" }}
        />
      </Reveal>

      <Reveal as="div" className="r1-text" animation="fade-up" delay={120} once={true} id="camp">
        <div className="intro-text">
          <h2>營隊介紹</h2>
          <p>
            中央大學USR計畫「 桃園雙語導覽工作坊 」連結校內單位和桃園在地高中生，以多元形式培育人才投入社會實踐，
            營造自主創新的學習平台，在計畫過程中培訓高中生以雙語向外籍生導覽桃園在地文化，讓台灣被世界看見。
          </p>
        </div>
      </Reveal>

      <Reveal as="div" className="r1-right-img" animation="fade-up" delay={220} once={true}>
        <img
          src="/images/side-img1.png"
          alt="插入圖片1"
          className="art"
          style={{ "--dx": "12px", "--dy": "-30px", "--rot": "4deg" }}
        />
      </Reveal>

      {/* Row 2 */}
      <Reveal as="div" className="r2-text" animation="fade-up" delay={340} once={true} id="hakka">
        <div className="intro-text">
          <h2>桃園客家文化介紹</h2>
          <p>
            台灣客家文化展現獨特的語言、音樂和美食，象徵勤奮與節儉精神。您可以體驗傳統客家山歌、擂茶與粄條等特色料理，
            並參觀客家聚落，了解客家人如何融合開墾歷史與強烈的家族精神。
          </p>
        </div>
      </Reveal>

      <Reveal as="div" className="r2-right-img" animation="fade-up" delay={460} once={true}>
        <img
          src="/images/side-img3.png"
          alt="插入圖片3"
          className="art"
          style={{ "--dx": "0px", "--dy": "-40px", "--rot": "-2deg" }}
        />
      </Reveal>

      {/* Row 3 */}
      <Reveal as="div" className="r3-left-img" animation="fade-up" delay={580} once={true}>
        <img
          src="/images/side-img4.png"
          alt="插入圖片4"
          className="art"
          style={{ "--dx": "-100px", "--dy": "-150px", "--rot": "0deg" }}
        />
      </Reveal>

      <Reveal as="div" className="r3-text" animation="fade-up" delay={700} once={true} id="longtan">
        <div className="intro-text">
          <h2>龍潭地區特色介紹</h2>
          <p>
            龍潭第一街--三坑老街，除了有粄條、牛汶水及湯圓等最道地的客家美食，也彌漫著古色古香的味道。
            位於入口處的黑白洗為早期洗滌衣物的據點，挑擔古道已有百年歷史，也保有清代時期步廊式（亭仔腳）街屋建築，
            為北臺灣保存較完整的傳統客家聚落。興建於乾隆年間的永福宮，是三坑老街聚落的核心，更是當地居民的信仰中心。
          </p>
        </div>
      </Reveal>

      <Reveal as="div" className="r3-right-img" animation="fade-up" delay={820} once={true}>
        <img
          src="/images/side-img5.png"
          alt="插入圖片5"
          className="art"
          style={{ "--dx": "0px", "--dy": "250px", "--rot": "0deg" }}
        />
      </Reveal>
    </section>
  );
}
