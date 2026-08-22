import styles from "./Contact.module.css";
import Link from "next/link";

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={`${styles.contactHead} reveal`}>End of Transmission</div>
      <h2 className={`${styles.contactTitle} reveal d1`}>Establish Connection</h2>
      <div className={`${styles.contactLinks} reveal d2`}>
        <Link href="mailto:manishmaity@gmail.com" className={styles.contactLink} data-hoverable="true">Email</Link>
        <Link href="https://github.com/manish12345p" className={styles.contactLink} data-hoverable="true" target="_blank" rel="noopener noreferrer">GitHub</Link>
        <Link href="https://www.linkedin.com/in/manish-chandra-maity-106a02321/" className={styles.contactLink} data-hoverable="true" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
      </div>
    </section>
  );
}
