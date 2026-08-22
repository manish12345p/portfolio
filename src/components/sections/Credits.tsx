import styles from "./Credits.module.css";

export function Credits() {
  return (
    <section className={styles.creditsSection} id="stack">
      <div className={`${styles.creditBlock} reveal`}>
        <h2>Technical Cast & Crew</h2>
        <div className={styles.creditList}>
          <div className={styles.creditItem}>
            <span>Core Logic & Automation</span>
            <span>Python, Go, Bash</span>
          </div>
          <div className={styles.creditItem}>
            <span>Mobile & Client Interfaces</span>
            <span>Flutter, Dart, HTML/CSS/JS</span>
          </div>
          <div className={styles.creditItem}>
            <span>Server & Infrastructure</span>
            <span>FastAPI, REST APIs, Git</span>
          </div>
          <div className={styles.creditItem}>
            <span>Data & Persistence</span>
            <span>PostgreSQL, SQLite, Firebase</span>
          </div>
          <div className={styles.creditItem}>
            <span>Hardware & Low-Level</span>
            <span>C, Java, Raspberry Pi, Linux</span>
          </div>
          <div className={styles.creditItem}>
            <span>AI / ML Frameworks</span>
            <span>TensorFlow, Scikit-Learn</span>
          </div>
        </div>
      </div>
    </section>
  );
}
