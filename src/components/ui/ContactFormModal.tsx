"use client";

import { useState } from "react";
import styles from "./ContactFormModal.module.css";
import { ContactValidation } from "@/domain/contact/ContactValidation";
import { ContactMessage } from "@/domain/contact/ContactMessage";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<Partial<ContactMessage>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactMessage, string>>>({});
  const [globalError, setGlobalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for field when user types
    if (errors[e.target.name as keyof ContactMessage]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    
    // Client-side validation using Domain rules
    const validation = ContactValidation.validate(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/portfolio/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setGlobalError(result.message || "Something went wrong.");
        }
      } else {
        setIsSuccess(true);
      }
    } catch {
      setGlobalError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form state on close
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setGlobalError("");
    }, 300);
    onClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close modal" data-hoverable="true">
          ✕ CLOSE
        </button>
        
        {isSuccess ? (
          <div className={styles.successMessage}>
            <h3>Transmission Complete</h3>
            <p>Your message has successfully entered the datastream. I will respond shortly.</p>
          </div>
        ) : (
          <>
            <h3 className={styles.title}>Send a Message</h3>
            
            {globalError && <div className={styles.globalError}>{globalError}</div>}
            
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.formGroup}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  data-hoverable="true"
                  placeholder=" "
                />
                <label className={styles.label} htmlFor="name">NAME *</label>
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  data-hoverable="true"
                  placeholder=" "
                />
                <label className={styles.label} htmlFor="email">EMAIL *</label>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={styles.input}
                  value={formData.subject}
                  onChange={handleChange}
                  data-hoverable="true"
                  placeholder=" "
                />
                <label className={styles.label} htmlFor="subject">SUBJECT *</label>
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                  data-hoverable="true"
                  placeholder=" "
                />
                <label className={styles.label} htmlFor="message">MESSAGE *</label>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
                data-hoverable="true"
              >
                {isSubmitting ? "TRANSMITTING..." : "INITIATE TRANSFER"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
