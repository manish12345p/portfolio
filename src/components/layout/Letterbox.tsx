"use client";
import { useEffect, useState } from "react";
import styles from "./Letterbox.module.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function LetterboxTop() {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const updateTimecode = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const p = window.scrollY / scrollHeight;
        const totalFrames = Math.floor(p * 24 * 60 * 3);
        const frames = totalFrames % 24;
        const secs = Math.floor(totalFrames / 24) % 60;
        const mins = Math.floor(totalFrames / (24 * 60)) % 60;
        setTimecode(`00:${pad(mins)}:${pad(secs)}:${pad(frames)}`);
      }
    };
    
    window.addEventListener("scroll", updateTimecode, { passive: true });
    updateTimecode();
    return () => window.removeEventListener("scroll", updateTimecode);
  }, []);

  return (
    <div className={`${styles.letterbox} ${styles.top}`}>
      <span>35MM · UNSTABLE CUT</span>
      <span className="mono">{timecode}</span>
    </div>
  );
}

export function LetterboxBottom() {
  return (
    <div className={`${styles.letterbox} ${styles.bottom}`}>
      <span>MANISH CHANDRA MAITY — DREAM BIG</span>
      <span>REEL 01 OF 01</span>
    </div>
  );
}
