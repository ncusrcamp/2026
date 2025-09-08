// src/components/BackgroundMusic.jsx
import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play(); // 嘗試有聲自動播放
        audio.muted = false;
      } catch (err) {
        // 被瀏覽器阻擋 → 靜音播放
        audio.muted = true;
        try {
          await audio.play();
        } catch (e) {
          // 如果靜音播放也失敗，通常是檔案或路徑問題
          console.warn("背景音樂播放失敗", e);
        }
      }
    };

    tryPlay();
  }, []);

  return (
    <audio id="bg-audio" ref={audioRef} loop>
      <source src="/music/bg.mp3" type="audio/mpeg" />
      您的瀏覽器不支援音樂播放
    </audio>
  );
}
