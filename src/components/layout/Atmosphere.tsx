import styles from "./Atmosphere.module.css";

export function Atmosphere() {
  return (
    <>
      <div className={styles.grain} />
      <div className={styles.vignette} />
      <div className={styles.heartbeat} />
      <div className={styles.crackOverlay}>
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M500,0 L470,180 L540,260 L480,400 L520,520 L460,650 L510,780 L490,1000" />
          <path d="M500,300 L300,150 M500,300 L720,200 M480,400 L250,420 M480,400 L740,460 M510,780 L280,830 M510,780 L730,860" />
        </svg>
      </div>
    </>
  );
}
