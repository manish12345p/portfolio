import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Manish Chandra Maity. All Rights Reserved.</span>
      <span>System V 2.4.1 — Online</span>
    </footer>
  );
}
