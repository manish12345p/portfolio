"use client";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["work", "stack", "about", "contact"].map(id => document.getElementById(id));
    
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => s && navIo.observe(s));
    
    return () => {
      navIo.disconnect();
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.navMark} credits`}>M. MAITY</div>
      <div className={`${styles.navLinks} credits`}>
        <Link href="#work" className={activeSection === "work" ? styles.active : ""} data-hoverable="true">Work</Link>
        <Link href="#stack" className={activeSection === "stack" ? styles.active : ""} data-hoverable="true">Credits</Link>
        <Link href="#about" className={activeSection === "about" ? styles.active : ""} data-hoverable="true">About</Link>
        <Link href="#contact" className={activeSection === "contact" ? styles.active : ""} data-hoverable="true">Contact</Link>
      </div>
    </nav>
  );
}
