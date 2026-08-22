"use client";
import { useState } from "react";
import styles from "./Contact.module.css";
import Link from "next/link";
import { ContactFormModal } from "@/components/ui/ContactFormModal";

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={styles.contact} id="contact">
        <div className={`${styles.contactHead} reveal`}>End of Transmission</div>
        <h2 className={`${styles.contactTitle} reveal d1`}>Establish Connection</h2>
        
        <div className={`${styles.contactAction} reveal d2`} style={{ marginBottom: "3rem" }}>
          <button 
            className="btn" 
            onClick={() => setIsModalOpen(true)}
            data-hoverable="true"
          >
            CONTACT ME
          </button>
        </div>

        <div className={`${styles.contactLinks} reveal d3`}>
          <Link href="mailto:manishmaity@gmail.com" className={styles.contactLink} data-hoverable="true">Email</Link>
          <Link href="https://github.com/manish12345p" className={styles.contactLink} data-hoverable="true" target="_blank" rel="noopener noreferrer">GitHub</Link>
          <Link href="https://www.linkedin.com/in/manish-chandra-maity-106a02321/" className={styles.contactLink} data-hoverable="true" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
        </div>
      </section>

      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
