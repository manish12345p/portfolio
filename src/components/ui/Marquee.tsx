import styles from "./Marquee.module.css";

export function Marquee() {
  const items = ["Python", "Dart", "Java", "C", "SQL", "Flutter", "FastAPI", "Aiogram", "Firebase", "Git"];
  
  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeTrack}>
        {items.map((item, i) => (
          <span key={`first-${i}`}>{item}</span>
        ))}
        {items.map((item, i) => (
          <span key={`second-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
