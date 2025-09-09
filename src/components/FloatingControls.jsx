// src/components/FloatingControls.jsx
import { useEffect, useState, useCallback } from "react";
import "./FloatingControls.css";

export default function FloatingControls() {
  const [audioReady, setAudioReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  const getAudio = () => document.getElementById("bg-audio");

  const syncState = useCallback(() => {
    const a = getAudio();
    if (!a) return;
    setAudioReady(true);
    setMuted(a.muted);
    setPlaying(!a.paused);
  }, []);

  useEffect(() => {
    const a = getAudio();
    if (!a) return;
    syncState();
    const onPlay = () => syncState();
    const onPause = () => syncState();
    const onVolume = () => syncState();
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("volumechange", onVolume);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("volumechange", onVolume);
    };
  }, [syncState]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMute = async () => {
    const a = getAudio();
    if (!a) return;
    if (a.muted) {
      a.muted = false;
      try {
        if (a.paused) await a.play();
      } catch (e) {
        a.muted = true;
      }
    } else {
      a.muted = true;
    }
    syncState();
  };

  const togglePlay = async () => {
    const a = getAudio();
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch (e) {
        a.muted = true;
        await a.play().catch(() => {});
      }
    } else {
      a.pause();
    }
    syncState();
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fab-container" aria-live="polite">
      <button
        className="fab"
        type="button"
        title={muted ? "點擊開聲音" : "點擊靜音"}
        aria-label={muted ? "開啟音樂聲音" : "關閉音樂聲音"}
        onClick={toggleMute}
        onContextMenu={(e) => { e.preventDefault(); togglePlay(); }}
        disabled={!audioReady}
      >
        {muted || !playing ? "🔇" : "🔊"}
      </button>

      <button
        className={`fab ${showBackTop ? "fab-show" : "fab-hide"}`}
        type="button"
        title="回到頂端"
        aria-label="回到頂端"
        onClick={scrollToTop}
      >
        ⬆
      </button>
    </div>
  );
}
