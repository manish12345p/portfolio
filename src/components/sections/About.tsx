import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutGrid}>
        <div className={`${styles.dossier} reveal d1`}>
          <h2>Subject Background</h2>
          <p>
            I am currently pursuing a B.Tech in Computer Science and Engineering (AI) (2024–2028). 
            My focus lies in building robust backends, intelligent tools, and seamless client applications.
          </p>
          <p>
            I thrive in environments that require connecting disparate systems—whether that&apos;s linking a Flutter interface to a high-speed Go daemon, or integrating AI logic into a local desktop environment.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Primary Directive</span>
              <span className={styles.statValue}>SYSTEM EFFICIENCY</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Current Status</span>
              <span className={styles.statValue}>DEPLOYING</span>
            </div>
          </div>
        </div>
        
        <div className={`${styles.portraitWrap} reveal d2`}>
          <div className={styles.photoFrame} />
          <div className={`${styles.photoCorner} ${styles.tl}`} />
          <div className={`${styles.photoCorner} ${styles.br}`} />
          <div className={styles.portrait} />
        </div>
      </div>
    </section>
  );
}
