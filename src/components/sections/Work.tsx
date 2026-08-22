import styles from "./Work.module.css";
import { Poster } from "./Poster";

const projects = [
  {
    num: "01",
    tag: "Desktop Application / Python",
    title: "Insight — The AI Desktop Assistant",
    description: "Built Insight, an intelligent desktop assistant in Python with PySide6. Integrated natural language processing, file system management, and real-time task automation. Focused on system efficiency and cross-platform reliability.",
    stack: ["Python", "PySide6", "OpenAI API", "SQLite", "OS Automation"],
    link: "https://github.com/manishmaity/insight"
  },
  {
    num: "02",
    tag: "Full-Stack System / Rust & FastAPI",
    title: "Aura — Smart Ambient Lighting",
    description: "Developed Aura, a system combining hardware control and software scheduling to adjust ambient lighting based on time, weather, and system events. Emphasized low-latency execution and fail-safe hardware interactions.",
    stack: ["Rust", "FastAPI", "React", "Raspberry Pi", "IoT Protocols"],
    link: "https://github.com/manishmaity/aura"
  },
  {
    num: "03",
    tag: "Mobile App / Flutter & Firebase",
    title: "Vanguard — Personal Finance Engine",
    description: "Created Vanguard, a cross-platform Flutter application for personal finance tracking. Implemented secure cloud synchronization, offline caching, and real-time charting to visualize spending habits and predict future trends.",
    stack: ["Flutter", "Dart", "Firebase", "SQLite", "Data Visualization"],
    link: "https://github.com/manishmaity/vanguard"
  },
  {
    num: "04",
    tag: "Automation Tool / Go",
    title: "Chronos — Backup & Sync Daemon",
    description: "Engineered Chronos, a lightweight, highly concurrent background daemon in Go for continuous file synchronization and versioned backups. Achieved significant performance gains over standard tools by utilizing goroutines.",
    stack: ["Go", "Concurrency", "File System Events", "Cryptography"],
    link: "https://github.com/manishmaity/chronos"
  }
];

export function Work() {
  return (
    <section className={styles.work} id="work">
      <div className={styles.sectionHead}>
        <div className={`${styles.eyebrowRow} credits reveal`}>TVA ARCHIVES</div>
        <h2 className="reveal d1">Classified Case Files</h2>
      </div>

      <div className={styles.posterGrid}>
        {projects.map((project, i) => (
          <Poster key={i} {...project} />
        ))}
      </div>
    </section>
  );
}
