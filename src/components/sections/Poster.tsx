"use client";
import { useState } from "react";
import styles from "./Work.module.css";
import Link from "next/link";

interface PosterProps {
  num: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  link: string;
}

export function Poster({ num, tag, title, description, stack, link }: PosterProps) {
  const [stamped, setStamped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Only stamp if not clicking a link directly
    const target = e.target as HTMLElement;
    if (!target.closest('a')) {
      setStamped(true);
      setTimeout(() => setStamped(false), 2400);
    }
  };

  return (
    <div className={`${styles.poster} reveal`} onClick={handleClick} data-hoverable="true">
      <div className={styles.posterNum}>{num}</div>
      
      <div className={styles.flourish}>
        <svg viewBox="0 0 34 34">
          <path d="M2,20 C2,8 8,2 20,2 M2,20 L2,12 M20,2 L12,2" />
          <circle cx="4" cy="22" r="2" />
        </svg>
      </div>

      <span className={styles.posterTag}>{tag}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.posterStack}>
        {stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      
      <Link href={link} className={styles.posterLink} data-hoverable="true" target="_blank" rel="noopener noreferrer">
        Open Case File <span className={styles.arrow}>→</span>
      </Link>
      
      <div className={`${styles.stampWrap} ${stamped ? styles.stamped : ""}`}>
        <div className={styles.stamp}>Approved</div>
      </div>
    </div>
  );
}
