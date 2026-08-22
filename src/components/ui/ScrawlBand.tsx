import styles from "./ScrawlBand.module.css";

export function ScrawlBand() {
  return (
    <div className={styles.scrawlBand}>
      <div className={styles.scrawlWord} style={{ top: "8%", left: "2%", fontSize: "2.2rem", color: "rgba(198,48,74,0.35)", "--r": "-4deg" } as React.CSSProperties}>SHIP IT</div>
      <div className={styles.scrawlWord} style={{ top: "40%", left: "20%", fontSize: "1.2rem", color: "rgba(240,234,217,0.15)", "--r": "3deg" } as React.CSSProperties}>AGAIN</div>
      <div className={styles.scrawlWord} style={{ top: "15%", left: "36%", fontSize: "3rem", color: "rgba(201,162,39,0.3)", "--r": "-2deg" } as React.CSSProperties}>NOT DONE</div>
      <div className={styles.scrawlWord} style={{ top: "60%", left: "5%", fontSize: "1.5rem", color: "rgba(198,48,74,0.25)", "--r": "6deg" } as React.CSSProperties}>FIX IT</div>
      <div className={styles.scrawlWord} style={{ top: "55%", left: "55%", fontSize: "2.6rem", color: "rgba(240,234,217,0.12)", "--r": "-3deg" } as React.CSSProperties}>REBUILD</div>
      <div className={styles.scrawlWord} style={{ top: "10%", left: "66%", fontSize: "1.3rem", color: "rgba(201,162,39,0.22)", "--r": "5deg" } as React.CSSProperties}>AGAIN</div>
      <div className={styles.scrawlWord} style={{ top: "70%", left: "78%", fontSize: "1.8rem", color: "rgba(198,48,74,0.3)", "--r": "-6deg" } as React.CSSProperties}>STILL BROKEN</div>
      <div className={styles.scrawlWord} style={{ top: "30%", left: "85%", fontSize: "1.1rem", color: "rgba(240,234,217,0.14)", "--r": "2deg" } as React.CSSProperties}>SHIP IT</div>
      <div className={styles.scrawlWord} style={{ top: "5%", left: "48%", fontSize: "1rem", color: "rgba(201,162,39,0.18)", "--r": "-8deg" } as React.CSSProperties}>ONE MORE COMMIT</div>
      <div className={styles.scrawlWord} style={{ top: "75%", left: "32%", fontSize: "2rem", color: "rgba(198,48,74,0.2)", "--r": "4deg" } as React.CSSProperties}>NEVER ENOUGH</div>
    </div>
  );
}
