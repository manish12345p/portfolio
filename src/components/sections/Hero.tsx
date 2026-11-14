'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import Container from '@/components/ui/Container';
import { site } from '@/config/site';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mouse Move Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax Offsets: Image moves ±10px, Chips move ±22px
  const imageX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const imageY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const chip1X = useTransform(smoothMouseX, [-1, 1], [18, -18]);
  const chip1Y = useTransform(smoothMouseY, [-1, 1], [22, -22]);

  const chip2X = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const chip2Y = useTransform(smoothMouseY, [-1, 1], [-18, 18]);

  const chip3X = useTransform(smoothMouseX, [-1, 1], [14, -14]);
  const chip3Y = useTransform(smoothMouseY, [-1, 1], [-22, 22]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll Parallax for blurred glow circle
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const canDoParallax = !shouldReduceMotion && !isTouchDevice;

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.heroSection}
      aria-label="Introduction and Profile"
    >
      <Container>
        <div className={styles.heroGrid}>
          
          {/* LEFT COLUMN: Narrative & Actions */}
          <div className={styles.leftColumn}>
            
            {/* Status Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              <div className={`chip ${styles.statusPill}`}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span>Open to internships · Delhi NCR</span>
              </div>
            </motion.div>

            {/* H1 Heading with Slide-up Mask Reveal */}
            <h1 className={styles.heading}>
              <span className={styles.titleMask}>
                <motion.span
                  initial={shouldReduceMotion ? { y: 0 } : { y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.nameFirst}
                >
                  Manish
                </motion.span>
              </span>
              <span className={styles.titleMask}>
                <motion.span
                  initial={shouldReduceMotion ? { y: 0 } : { y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.nameLast}
                >
                  Chandra Maity
                </motion.span>
              </span>
            </h1>

            {/* Role Line */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: 'easeOut' }}
              className={styles.roleText}
            >
              {site.role}
            </motion.p>

            {/* Tagline Paragraph */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: 'easeOut' }}
              className={styles.taglineText}
            >
              {site.tagline}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: 'easeOut' }}
              className={styles.buttonGroup}
            >
              <a href="#work" className="btn btn-solid">
                See my projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact me
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: 3D Developer Visual & Floating Chips */}
          <div className={styles.rightColumn}>
            <div className={styles.visualWrapper}>
              
              {/* Soft Blurred Glow Circle with gentle scroll parallax */}
              <motion.div
                style={canDoParallax ? { y: glowY } : undefined}
                className={styles.blurCircle}
                aria-hidden="true"
              />

              {/* Floating Chip 1: Flutter */}
              <motion.div
                style={canDoParallax ? { x: chip1X, y: chip1Y } : undefined}
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 4.2, ease: 'easeInOut' }
                }
                className={`${styles.floatingChip} ${styles.chipFlutter}`}
              >
                <span className={styles.chipDotFlutter} aria-hidden="true" />
                <span>Flutter</span>
              </motion.div>

              {/* Floating Chip 2: Dart */}
              <motion.div
                style={canDoParallax ? { x: chip2X, y: chip2Y } : undefined}
                animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 5.0, ease: 'easeInOut', delay: 0.4 }
                }
                className={`${styles.floatingChip} ${styles.chipDart}`}
              >
                <span className={styles.chipDotDart} aria-hidden="true" />
                <span>Dart</span>
              </motion.div>

              {/* Floating Chip 3: Firebase */}
              <motion.div
                style={canDoParallax ? { x: chip3X, y: chip3Y } : undefined}
                animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 4.6, ease: 'easeInOut', delay: 0.8 }
                }
                className={`${styles.floatingChip} ${styles.chipFirebase}`}
              >
                <span className={styles.chipDotFirebase} aria-hidden="true" />
                <span>Firebase</span>
              </motion.div>

              {/* Main 3D Developer Render Image */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={canDoParallax ? { x: imageX, y: imageY } : undefined}
                className="w-full h-full relative z-10 flex items-center justify-center"
              >
                <Image
                  src="/hero-dev.png"
                  alt="3D render illustration of Manish Chandra Maity coding on a laptop"
                  width={520}
                  height={520}
                  priority
                  className={styles.heroImage}
                />
              </motion.div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export { Hero };
