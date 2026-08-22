"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ringX = mx;
    let ringY = my;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };

    const cursorLoop = () => {
      ringX += (mx - ringX) * 0.18;
      ringY += (my - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top = ringY + "px";
      }
      animationFrameId = requestAnimationFrame(cursorLoop);
    };

    window.addEventListener("mousemove", onMouseMove);
    cursorLoop();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hoverable]")) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hoverable]")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={`${styles.cursorRing} ${isHovering ? styles.hover : ""}`} />
      <div ref={dotRef} className={styles.cursorDot} />
    </>
  );
}
