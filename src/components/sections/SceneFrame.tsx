"use client";
import { useRef } from "react";
import styles from "./Hero.module.css";

export function SceneFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!frameRef.current || !sceneRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    sceneRef.current.style.transform = `rotateY(${px * 4}deg) rotateX(${-py * 3}deg)`;
  };

  const handleMouseLeave = () => {
    if (sceneRef.current) {
      sceneRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  return (
    <div 
      className={`${styles.sceneFrame} reveal d2`}
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.frameCorner} ${styles.tl}`} />
      <div className={`${styles.frameCorner} ${styles.br}`} />
      <div className={`${styles.flourish} ${styles.tl}`}>
        <svg viewBox="0 0 34 34">
          <path d="M2,20 C2,8 8,2 20,2 M2,20 L2,12 M20,2 L12,2" />
          <circle cx="4" cy="22" r="2" />
        </svg>
      </div>
      <div className={`${styles.flourish} ${styles.br}`}>
        <svg viewBox="0 0 34 34">
          <path d="M2,20 C2,8 8,2 20,2 M2,20 L2,12 M20,2 L12,2" />
          <circle cx="4" cy="22" r="2" />
        </svg>
      </div>
      <div className={styles.sceneWrap}>
        <svg className={styles.scene} ref={sceneRef} viewBox="0 0 700 760" aria-hidden="true">
          <defs>
            <radialGradient id="tableSpot" cx="30%" cy="0%" r="80%">
              <stop offset="0%" stopColor="rgba(198,48,74,0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="spot" cx="55%" cy="30%" r="65%">
              <stop offset="0%" stopColor="rgba(198,48,74,0.22)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="portalG" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="85%" stopColor="rgba(111,227,171,0.35)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e35270" />
              <stop offset="35%" stopColor="#6e1220" />
              <stop offset="55%" stopColor="#2a060c" />
              <stop offset="80%" stopColor="#c6304a" />
              <stop offset="100%" stopColor="#e35270" />
            </linearGradient>
            <radialGradient id="glass" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#2b2422" />
              <stop offset="70%" stopColor="#181110" />
              <stop offset="100%" stopColor="#0e0908" />
            </radialGradient>
            <linearGradient id="ivory" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3ecd9" />
              <stop offset="55%" stopColor="#d8cba6" />
              <stop offset="100%" stopColor="#9c8c66" />
            </linearGradient>
            <linearGradient id="ivoryDim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cfc6ae" />
              <stop offset="60%" stopColor="#9e937a" />
              <stop offset="100%" stopColor="#5a5344" />
            </linearGradient>
            <linearGradient id="wood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38201a" />
              <stop offset="100%" stopColor="#180e0b" />
            </linearGradient>
            <symbol id="rune" viewBox="0 0 40 40">
              <path d="M20,4 L20,36 M8,12 L32,28 M32,12 L8,28" stroke="var(--eden-glow)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <circle cx="20" cy="20" r="3" fill="var(--eden-glow)" />
            </symbol>
          </defs>

          <rect x="0" y="0" width="700" height="760" fill="var(--void)" />
          <rect x="0" y="0" width="700" height="760" fill="url(#spot)" />
          <rect x="0" y="600" width="700" height="160" fill="url(#wood)" />
          <rect x="0" y="600" width="700" height="160" fill="url(#tableSpot)" />
          <g stroke="rgba(0,0,0,0.4)" strokeWidth="1">
            <line x1="0" y1="628" x2="700" y2="622" />
            <line x1="0" y1="662" x2="700" y2="656" />
            <line x1="0" y1="700" x2="700" y2="694" />
          </g>
          <line x1="0" y1="600" x2="700" y2="600" stroke="rgba(198,48,74,0.3)" strokeWidth="1.5" />
          <circle cx="430" cy="380" r="260" fill="url(#portalG)" className={styles.portalGlow} />
          <circle cx="430" cy="380" r="230" fill="url(#rim)" />
          <circle cx="430" cy="380" r="212" fill="url(#glass)" />
          <circle cx="430" cy="380" r="248" fill="none" stroke="var(--eden-glow)" strokeWidth="0.75" opacity="0.5" strokeDasharray="2 6" />
          
          <g className={styles.runeRing}>
            <use href="#rune" x="415" y="112" width="24" height="24" />
            <use href="#rune" x="600" y="200" width="24" height="24" />
            <use href="#rune" x="600" y="530" width="24" height="24" />
            <use href="#rune" x="415" y="618" width="24" height="24" />
            <use href="#rune" x="240" y="530" width="24" height="24" />
            <use href="#rune" x="240" y="200" width="24" height="24" />
          </g>

          <g className={styles.glint}>
            <line x1="270" y1="200" x2="330" y2="580" stroke="rgba(227,82,112,0.4)" strokeWidth="6" />
          </g>
          <path d="M235,290 A210,210 0 0 1 430 172" fill="none" stroke="rgba(227,82,112,0.55)" strokeWidth="3" opacity="0.6" />
          
          <g transform="translate(430,470) scale(1.65)">
            <ellipse cx="0" cy="55" rx="46" ry="10" fill="rgba(0,0,0,0.5)" />
            <path fill="url(#ivory)" d="M-30,55 L30,55 C30,45 20,40 20,40 C34,32 30,14 14,8 L20,3 C24,-6 18,-14 6,-16 C10,-22 6,-30 -2,-31 C-8,-30 -12,-22 -8,-16 C-20,-14 -26,-6 -22,3 L-16,8 C-32,14 -36,32 -22,40 C-22,40 -30,45 -30,55 Z" />
            <circle cx="-2" cy="-42" r="7" fill="url(#ivory)" />
            <rect x="-2.5" y="-58" width="5" height="16" fill="url(#ivory)" />
            <rect x="-8" y="-53" width="16" height="4.5" fill="url(#ivory)" />
            <circle className={styles.kingEye} cx="-2" cy="-42" r="7" fill="none" stroke="var(--oxblood-glow)" strokeWidth="1.4" opacity="0" />
          </g>
          
          <g transform="translate(150,600)">
            <ellipse cx="0" cy="26" rx="34" ry="9" fill="rgba(0,0,0,0.55)" />
            <path fill="url(#ivoryDim)" d="M-22,26 L22,26 C22,17 13,13 13,13 C24,7 21,-8 8,-12 L12,-16 C15,-24 9,-31 0,-32 C-9,-31 -15,-24 -12,-16 L-8,-12 C-21,-8 -24,7 -13,13 C-13,13 -22,17 -22,26 Z" />
            <circle cx="0" cy="-40" r="9" fill="url(#ivoryDim)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
