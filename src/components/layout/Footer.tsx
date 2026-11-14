'use client';

import React from 'react';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--line)] bg-white py-8 text-center text-sm text-[var(--muted)]">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="font-medium text-[var(--ink)]">
          © 2026 Manish Chandra Maity · Delhi NCR, India
        </p>
        <p className="text-xs text-[var(--muted)]">
          Designed with intention · Built with Next.js & Tailwind CSS
        </p>
      </Container>
    </footer>
  );
}

export { Footer };
