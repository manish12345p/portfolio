"use client";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const statuses = [
  "STATUS: BUILDING",
  "STATUS: CSE (AI), 2024–2028",
  "CASE FILE: OPEN",
  "STATUS: FAST LEARNING CURVE",
];

export function Terminal() {
  const [time, setTime] = useState("00:00:00");
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    const tickClock = () => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":")
      );
    };
    tickClock();
    const interval = setInterval(tickClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let statusIdx = 0;
    let i = 0;
    let currentText = "";
    let typeInterval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const cycleStatus = () => {
      const targetText = statuses[statusIdx];
      
      const typeChar = () => {
        if (i < targetText.length) {
          currentText += targetText[i];
          setStatusText(currentText);
          i++;
          typeInterval = setTimeout(typeChar, 45);
        } else {
          pauseTimeout = setTimeout(() => {
            statusIdx = (statusIdx + 1) % statuses.length;
            i = 0;
            currentText = "";
            setStatusText("");
            cycleStatus();
          }, 2200);
        }
      };
      
      typeChar();
    };

    cycleStatus();

    return () => {
      clearTimeout(typeInterval);
      clearTimeout(pauseTimeout);
    };
  }, []);

  return (
    <div className={`${styles.terminal} reveal d4`}>
      <div className={styles.terminalHead}>
        <span>CASE FILE // MCM-01</span>
        <span>{time}</span>
      </div>
      <div className={styles.terminalBody}>
        {statusText}
        <span className={styles.terminalCursor} />
      </div>
    </div>
  );
}
