"use client";
import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const p = window.scrollY / scrollHeight;
        setProgress(p * 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
  );
}
