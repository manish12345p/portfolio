import Link from "next/link";
import styles from "./Hero.module.css";
import { Terminal } from "./Terminal";
import { SceneFrame } from "./SceneFrame";

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.canvasLayer}>
        <div className={`${styles.field} ${styles.fA}`} style={{ top: "-25%", left: "-15%", width: "65vw", height: "65vw", opacity: 0.5 }}>
          <svg viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="240" fill="url(#gOx)" filter="url(#turbA)" />
          </svg>
        </div>
        <div className={`${styles.field} ${styles.fB}`} style={{ bottom: "-30%", right: "-15%", width: "55vw", height: "55vw", opacity: 0.45 }}>
          <svg viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="230" fill="url(#gWine)" filter="url(#turbB)" />
          </svg>
        </div>
        <div className={`${styles.field} ${styles.fC} ${styles.pulse}`} style={{ top: "15%", right: "0%", width: "28vw", height: "28vw", opacity: 0.4 }}>
          <svg viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="200" fill="url(#gGold)" filter="url(#turbC)" />
          </svg>
        </div>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M-50,200 C200,100 400,350 650,180 C800,90 950,220 1050,150" fill="none" stroke="var(--oxblood-bright)" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
          <path d="M-80,780 C150,900 380,650 620,830 C820,970 980,760 1080,850" fill="none" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" opacity="0.22" />
        </svg>
      </div>

      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className={`${styles.eyebrowRow} credits reveal`}>
            Software Developer · Python, Flutter & Backend Systems
          </div>
          <div className={styles.titleStack}>
            <div className="title-huge reveal d1">
              <span className="glitch grad-text" data-text="Dream Big">Dream Big</span>
            </div>
            <div className="title-huge stroke reveal d2">
              <span className="glitch" data-text="One Commit At A Time.">One Commit At A Time.</span>
            </div>
          </div>
          <p className={`${styles.tagline} reveal d3`}>
            Manish Chandra Maity — CSE (AI) undergraduate and software developer building cross-platform apps, backend APIs, and automation tools with Python, Flutter, and FastAPI.
          </p>
          <div className={`${styles.heroCta} reveal d4`}>
            <Link href="#work" className="btn" data-hoverable="true">Now Showing</Link>
            <Link href="#contact" className="btn ghost" data-hoverable="true">Get In Touch</Link>
          </div>
          <Terminal />
        </div>

        <SceneFrame />
      </div>
    </section>
  );
}
