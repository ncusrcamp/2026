// src/components/BackgroundMusic.jsx
import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play(); 
        audio.muted = false;
      } catch (err) {
        audio.muted = true;
        try {
          await audio.play();
        } catch (e) {
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
