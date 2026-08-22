"use client";
import { useEffect, useState } from "react";
import styles from "./ChaosWrapper.module.css";

export function ChaosWrapper({ children }: { children: React.ReactNode }) {
  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timeoutId: NodeJS.Timeout;

    const triggerBreak = () => {
      setIsBroken(true);
      setTimeout(() => {
        setIsBroken(false);
      }, 520);

      const next = 7000 + Math.random() * 9000;
      timeoutId = setTimeout(triggerBreak, next);
    };

    timeoutId = setTimeout(triggerBreak, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className={`${styles.tearFlash} ${isBroken ? styles.active : ""}`} />
      <div className={`${styles.chaosWrap} ${isBroken ? styles.breakEvent : ""}`}>
        {children}
      </div>
    </>
  );
}
