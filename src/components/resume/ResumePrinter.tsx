'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ResumePrinter.module.css';

interface ResumePrinterProps {
  resumePdfUrl?: string;
  resumeFileName?: string;
}

type PrintPhase = 'idle' | 'waiting' | 'printing' | 'printed';

export function ResumePrinter({
  resumePdfUrl = '/Manish-Chandra-Maity-CV.pdf',
  resumeFileName = 'Manish-Chandra-Maity-CV.pdf',
}: ResumePrinterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<PrintPhase>('idle');

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  // Clear timers on close or unmount
  const clearAllTimers = useCallback(() => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  }, []);

  // Trigger automatic download
  const triggerDownload = useCallback(() => {
    try {
      const link = document.createElement('a');
      link.href = resumePdfUrl;
      link.download = resumeFileName;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Failed to trigger download:', e);
    }
  }, [resumePdfUrl, resumeFileName]);

  // Open the Resume printer panel and run printing sequence
  const handleOpen = useCallback(() => {
    clearAllTimers();
    setIsOpen(true);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setPhase('printed');
      triggerDownload();
      return;
    }

    setPhase('waiting');

    // 0.7s delay before printing starts
    const t1 = setTimeout(() => {
      setPhase('printing');

      // 2.6s stepped printing animation
      const t2 = setTimeout(() => {
        setPhase('printed');
        triggerDownload();
      }, 2600);

      timerRefs.current.push(t2);
    }, 700);

    timerRefs.current.push(t1);
  }, [clearAllTimers, triggerDownload]);

  // Close the Resume printer panel
  const handleClose = useCallback(() => {
    clearAllTimers();
    setIsOpen(false);
    setPhase('idle');
    setTimeout(() => {
      triggerButtonRef.current?.focus({ preventScroll: true });
    }, 50);
  }, [clearAllTimers]);

  // Esc key, focus management, and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    if (isOpen) {
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');
      window.addEventListener('keydown', handleKeyDown);

      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 80);
    } else {
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  return (
    <div className={styles.root}>
      {/* 1. Floating Paper Resume Tab */}
      <button
        ref={triggerButtonRef}
        type="button"
        className={styles.floatingTab}
        onClick={handleOpen}
        aria-label="Open Resume"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={styles.tabMark} aria-hidden="true">
          ✦
        </span>
        <span className={styles.tabLabel}>Resume</span>
      </button>

      {/* 2. Backdrop Overlay */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* 3. Slide-in Side Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Printer"
          className={styles.panel}
        >
          {/* Header Close Button */}
          <div className={styles.panelHeader}>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close Resume printer"
            >
              ×
            </button>
          </div>

          <div className={styles.frameDivider} />

          {/* 4. Printing Stage */}
          <div className={styles.stage}>
            
            {/* Metallic Chrome Printer Unit */}
            <div
              className={`${styles.printerUnit} ${
                phase === 'printing' ? styles.printerVibrating : ''
              }`}
            >
              <div className={styles.printerDotLeft} title="Printer Online" />

              <div className={styles.printerGroove} />

              <div
                className={`${styles.printerLedRight} ${
                  phase === 'printing'
                    ? styles.printerLedBlinking
                    : phase === 'printed'
                    ? styles.printerLedSolidSuccess
                    : ''
                }`}
                title={
                  phase === 'printing'
                    ? 'Printing...'
                    : phase === 'printed'
                    ? 'Print Completed'
                    : 'Standby'
                }
              />

              <div className={styles.printerSlot} />
            </div>

            {/* Paper Chute (Clipping Container) */}
            <div className={styles.paperChute}>
              <div
                className={`${styles.paperSheet} ${
                  phase === 'idle' || phase === 'waiting'
                    ? styles.paperHidden
                    : phase === 'printing'
                    ? styles.paperPrinting
                    : styles.paperSettled
                }`}
              >
                {/* Header */}
                <div className={styles.paperHeader}>
                  <h3 className={styles.paperName}>MANISH CHANDRA MAITY</h3>
                  <div className={styles.paperRole}>
                    Flutter Developer • B.Tech CSE (AI) Student
                  </div>
                  <div className={styles.paperContact}>
                    Delhi NCR • 1,500+ CRM visits • 100K+ Play Store users
                  </div>
                </div>

                {/* 3 Project Blocks */}
                <div className={styles.paperProjects}>
                  <div className={`${styles.projectThumb} ${styles.thumbRed}`}>
                    <span className={styles.thumbTitle}>Field CRM</span>
                    <span className={styles.thumbTag}>1,500+ Visits</span>
                  </div>
                  <div className={`${styles.projectThumb} ${styles.thumbOrange}`}>
                    <span className={styles.thumbTitle}>App Recovery</span>
                    <span className={styles.thumbTag}>100K+ Users</span>
                  </div>
                  <div className={`${styles.projectThumb} ${styles.thumbBurgundy}`}>
                    <span className={styles.thumbTitle}>ERP QA</span>
                    <span className={styles.thumbTag}>60+ Defects</span>
                  </div>
                </div>

                {/* Experience & Stack */}
                <div className={styles.paperColumns}>
                  <div>
                    <div className={styles.columnHeading}>Experience</div>
                    <div>StuckNot (Dec 2024–Now)</div>
                    <div>• Flutter, BLoC, Freezed</div>
                    <div>• Client CRM & Admin</div>
                  </div>

                  <div>
                    <div className={styles.columnHeading}>Core Stack</div>
                    <div>• Flutter, Dart, Firebase</div>
                    <div>• FastAPI, REST APIs, Git</div>
                    <div>• State Management</div>
                  </div>
                </div>

                {/* Dark Maroon Footer Strip */}
                <div className={styles.paperFooterStrip}>
                  <span className={styles.trailerLine}>
                    Paper is the trailer.
                  </span>
                  <span className={styles.filmLine}>
                    The film is on my portfolio.
                  </span>
                </div>

                {/* Curled Corner on Bottom Right */}
                <div className={styles.curledCorner} aria-hidden="true" />
              </div>
            </div>

          </div>

          <div className={styles.frameDivider} />

          {/* 5. Status Line at Bottom */}
          <div
            className={`${styles.statusContainer} ${
              phase === 'printed' ? styles.statusVisible : ''
            }`}
          >
            <p className={styles.statusText}>
              Printed. Check your downloads. Nothing there?
            </p>
            <a
              href={resumePdfUrl}
              download={resumeFileName}
              className={styles.statusTextLink}
            >
              Grab the PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePrinter;

