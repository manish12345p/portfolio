'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [, setIsCvPrinting] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isTabPeeking, setIsTabPeeking] = useState<boolean>(false);

  const cvCloseRef = useRef<HTMLButtonElement | null>(null);
  const cvTabRef = useRef<HTMLButtonElement | null>(null);
  const downloadTimerRef = useRef<NodeJS.Timeout | null>(null);
  const printResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tabPeekingDoneRef = useRef<boolean>(false);

  // Background pointer glow tracking
  useEffect(() => {
    const bg = document.querySelector('.bg') as HTMLElement | null;
    const handlePointerMove = (e: PointerEvent) => {
      if (bg) {
        bg.style.setProperty('--mx', e.clientX + 'px');
        bg.style.setProperty('--my', e.clientY + 'px');
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Animated counters on .stat b elements
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || !('IntersectionObserver' in window)) return;

    const stats = document.querySelectorAll<HTMLElement>('.stat b');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const targetNum = Number(el.dataset.n || '0');
          const suffix = el.dataset.s || '';
          const t0 = performance.now();

          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / 1400);
            const v = Math.round(targetNum * (1 - Math.pow(1 - p, 3)));
            el.textContent = v.toLocaleString('en-US') + suffix;
            if (p < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );

    stats.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  // Scroll animations: Progress bar, Navbar scroll state, Parallax, Active section, Tab peek
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progressEl = document.getElementById('scrollProgress');
    const mockEl = document.querySelector<HTMLElement>('.art .mock');
    const phEl = document.querySelector<HTMLElement>('.art .ph');
    const sections = ['work', 'experience', 'skills', 'hackathons', 'contact'];

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

          // 1. Top progress bar scale
          if (progressEl && maxScroll > 0) {
            const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
            progressEl.style.transform = `scaleX(${ratio})`;
          }

          // 2. Sticky header background & shadow state
          setIsScrolled(scrollY > 40);

          // 3. Tab peek trigger once user scrolls past hero
          if (scrollY > 340 && !tabPeekingDoneRef.current && !calm) {
            tabPeekingDoneRef.current = true;
            setIsTabPeeking(true);
            setTimeout(() => setIsTabPeeking(false), 1300);
          }

          // 4. Hero 3D Mockup Parallax depth
          if (!calm && scrollY < 900) {
            if (mockEl) {
              mockEl.style.setProperty('--mock-ty', `${scrollY * 0.08}px`);
            }
            if (phEl) {
              phEl.style.setProperty('--ph-ty', `${scrollY * -0.05}px`);
            }
          }

          // 5. Active section indicator in nav
          const viewportMid = scrollY + window.innerHeight * 0.35;
          let current = '';
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (viewportMid >= top && viewportMid < top + height) {
                current = id;
                break;
              }
            }
          }
          setActiveSection(current);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // IntersectionObserver for Scroll Reveal on sections, cards, and timelines
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll<HTMLElement>('.reveal-item, .tl li');

    if (calm) {
      elements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  // Resume printer interaction functions
  const openCv = () => {
    if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
    if (printResetTimerRef.current) clearTimeout(printResetTimerRef.current);

    document.body.classList.remove('cv-print');
    document.body.classList.add('cv-open');
    setIsCvOpen(true);

    requestAnimationFrame(() => {
      document.body.classList.add('cv-print');
      setIsCvPrinting(true);
      cvCloseRef.current?.focus({ preventScroll: true });
    });

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    downloadTimerRef.current = setTimeout(() => {
      const PDF = 'Manish-Chandra-Maity-Resume.pdf';
      const a = document.createElement('a');
      a.href = `/${PDF}`;
      a.download = PDF;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, calm ? 400 : 3000);
  };

  const closeCv = () => {
    if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
    document.body.classList.remove('cv-open');
    setIsCvOpen(false);

    printResetTimerRef.current = setTimeout(() => {
      document.body.classList.remove('cv-print');
      setIsCvPrinting(false);
    }, 600);

    cvTabRef.current?.focus({ preventScroll: true });
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.body.classList.contains('cv-open')) {
          closeCv();
        }
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at the top of the viewport */}
      <div id="scrollProgress" className="scroll-progress" aria-hidden="true" />

      {/* Background with animated blobs, noise, and radial spot */}
      <div className="bg" aria-hidden="true">
        <i className="b1"></i>
        <i className="b2"></i>
        <i className="b3"></i>
        <i className="b4"></i>
        <b className="grid"></b>
        <b className="spot"></b>
      </div>

      <div className="wrap">
        {/* Navigation Bar */}
        <div className={`bar ${isMenuOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
          <a className="logo" href="#" aria-label="Manish Chandra Maity, back to top">
            <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#E3283F" />
                  <stop offset="1" stopColor="#A30B24" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="60" height="60" rx="17" fill="#B5173F" />
              <rect x="2" y="2" width="60" height="60" rx="17" fill="url(#lg)" />
              <path
                className="m"
                pathLength="100"
                d="M17 47V18L32 34L47 18V47"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="acc"
                d="M24 45L32 53L40 45"
                fill="none"
                stroke="#FF9CA6"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle className="acc" cx="53" cy="11" r="3.5" fill="#FF9CA6" />
            </svg>
            <div>
              <b>Manish Chandra Maity</b>
              <span>Flutter developer</span>
            </div>
          </a>

          <button
            className="burger"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav id="menu" aria-label="Sections">
            <a
              href="#work"
              className={activeSection === 'work' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#experience"
              className={activeSection === 'experience' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#hackathons"
              className={activeSection === 'hackathons' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Hackathons
            </a>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Hero Section */}
        <header className="hero">
          <div>
            <h1 aria-label="Manish Chandra Maity">
              <span className="w" aria-hidden="true">
                <span className="ch" style={{ '--i': 0 } as React.CSSProperties}>M</span>
                <span className="ch" style={{ '--i': 1 } as React.CSSProperties}>a</span>
                <span className="ch" style={{ '--i': 2 } as React.CSSProperties}>n</span>
                <span className="ch" style={{ '--i': 3 } as React.CSSProperties}>i</span>
                <span className="ch" style={{ '--i': 4 } as React.CSSProperties}>s</span>
                <span className="ch" style={{ '--i': 5 } as React.CSSProperties}>h</span>
              </span>{' '}
              <span className="w" aria-hidden="true">
                <span className="ch" style={{ '--i': 6 } as React.CSSProperties}>C</span>
                <span className="ch" style={{ '--i': 7 } as React.CSSProperties}>h</span>
                <span className="ch" style={{ '--i': 8 } as React.CSSProperties}>a</span>
                <span className="ch" style={{ '--i': 9 } as React.CSSProperties}>n</span>
                <span className="ch" style={{ '--i': 10 } as React.CSSProperties}>d</span>
                <span className="ch" style={{ '--i': 11 } as React.CSSProperties}>r</span>
                <span className="ch" style={{ '--i': 12 } as React.CSSProperties}>a</span>
              </span>{' '}
              <span className="w" aria-hidden="true">
                <span className="ch" style={{ '--i': 13 } as React.CSSProperties}>M</span>
                <span className="ch" style={{ '--i': 14 } as React.CSSProperties}>a</span>
                <span className="ch" style={{ '--i': 15 } as React.CSSProperties}>i</span>
                <span className="ch" style={{ '--i': 16 } as React.CSSProperties}>t</span>
                <span className="ch" style={{ '--i': 17 } as React.CSSProperties}>y</span>
              </span>
            </h1>
            <div className="role">Flutter developer and B.Tech CSE (AI) student</div>
            <p>
              I learn by building: Flutter apps with BLoC and clean architecture. Right now I’m looking
              for a Flutter developer internship to build real products.
            </p>
            <div className="btns">
              <a className="btn main" href="#work">
                See my work
              </a>
            </div>
          </div>

          <div
            className="art"
            role="img"
            aria-label="A laptop with Flutter code being typed while a phone beside it builds the app screen live"
          >
            <div className="mock" aria-hidden="true">
              <div className="lap">
                <div className="lid">
                  <i className="cam"></i>
                  <div className="scr">
                    <div className="tb">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>home_page.dart</span>
                      <em className="hr">&#9679; Hot reload</em>
                    </div>
                    <div className="ed">
                      <div className="gut">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                      </div>
                      <div className="code">
                        <div className="cl" style={{ '--n': 36, '--i': 0 } as React.CSSProperties}>
                          <b className="k">class</b> Home <b className="k">extends</b> StatelessWidget &#123;
                        </div>
                        <div className="cl" style={{ '--n': 32, '--i': 1 } as React.CSSProperties}>
                          {'  '}Widget build(BuildContext c) &#123;
                        </div>
                        <div className="cl" style={{ '--n': 20, '--i': 2 } as React.CSSProperties}>
                          {'    '}<b className="k">return</b> Scaffold(
                        </div>
                        <div className="cl" style={{ '--n': 43, '--i': 3 } as React.CSSProperties}>
                          {'      '}appBar: AppBar(title: Text(<b className="q">&apos;Hello&apos;</b>)),
                        </div>
                        <div className="cl" style={{ '--n': 30, '--i': 4 } as React.CSSProperties}>
                          {'      '}body: Column(children: [
                        </div>
                        <div className="cl" style={{ '--n': 22, '--i': 5 } as React.CSSProperties}>
                          {'        '}ProfileCard(),
                        </div>
                        <div className="cl" style={{ '--n': 26, '--i': 6 } as React.CSSProperties}>
                          {'        '}TaskTile(<b className="q">&apos;Build&apos;</b>),
                        </div>
                        <div className="cl" style={{ '--n': 25, '--i': 7 } as React.CSSProperties}>
                          {'        '}TaskTile(<b className="q">&apos;Ship&apos;</b>),
                        </div>
                        <div className="cl" style={{ '--n': 9, '--i': 8 } as React.CSSProperties}>
                          {'      '}]),
                        </div>
                        <i className="cur"></i>
                      </div>
                    </div>
                    <div className="sb">
                      <span>Dart</span>
                      <span>Flutter</span>
                      <span>BLoC</span>
                    </div>
                  </div>
                </div>
                <div className="base"></div>
              </div>
              <div className="ph">
                <div className="pscr">
                  <i className="isl"></i>
                  <div className="ab pp" style={{ '--d': 3.9 } as React.CSSProperties}>
                    Hello
                  </div>
                  <div className="pc pp" style={{ '--d': 5.5 } as React.CSSProperties}>
                    <i></i>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="tt pp" style={{ '--d': 6.3 } as React.CSSProperties}>
                    <i></i>Build
                  </div>
                  <div className="tt pp" style={{ '--d': 7.1 } as React.CSSProperties}>
                    <i></i>Ship
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div className="stats">
          <div className="stat reveal-item stagger-1">
            <b data-n="1500" data-s="+">
              1,500+
            </b>
            <span>service visits logged in the CRM I built for a client</span>
          </div>
          <div className="stat reveal-item stagger-2">
            <b data-n="100" data-s="K+">
              100K+
            </b>
            <span>downloads of the Play Store app I helped restore</span>
          </div>
          <div className="stat reveal-item stagger-3">
            <b data-n="90" data-s="+">
              90+
            </b>
            <span>sample-paper PDFs managed in the admin app I built</span>
          </div>
          <div className="stat reveal-item stagger-4">
            <b data-n="60" data-s="+">
              60+
            </b>
            <span>defects logged while testing a 12-module college ERP</span>
          </div>
        </div>

        {/* About Me Section */}
        <section className="about" id="about">
          <h2 className="reveal-item">About me</h2>
          <p className="reveal-item stagger-1">
            I’m a B.Tech CSE (AI) student at KCC Institute of Technology &amp; Management in Delhi
            NCR. I build Flutter apps with BLoC and clean architecture. So far I’ve shipped screens
            and an admin app for a live exam-prep app, restored another live app on a current
            Flutter version, and tested a college ERP end to end.
          </p>
        </section>

        {/* Work Section */}
        <section id="work">
          <h2 className="reveal-item">Work</h2>

          <article className="feature reveal-item stagger-1">
            <h3>Dashmesh Mechanix CRM</h3>
            <div>Flutter CRM for a service business. Used live by the client.</div>
            <ul className="pts">
              <li>
                Built v1 with the StuckNot team, then rebuilt it solo as v2. It replaced Excel
                sheets with customer records, visit history, a service calendar, payments, EMI
                tracking and estimates.
              </li>
              <li>1,500+ service visits logged, 200+ of them in the last 2 months.</li>
              <li>
                Structured as modular packages with Very Good CLI, using BLoC, Freezed/JSON
                serialization, clean architecture and SOLID.
              </li>
              <li>
                Migrated the backend from Firebase to Supabase by swapping only the data-source
                layer, and moved the existing records across.
              </li>
              <li>
                EMI module covers installments, due dates, overdue and paid status. Payments made
                from the EMI page or the customer profile stay in sync.
              </li>
            </ul>
            <ul className="tags">
              <li>Flutter</li>
              <li>BLoC</li>
              <li>Freezed</li>
              <li>Supabase</li>
            </ul>
            <a
              className="link"
              href="https://github.com/manish12345p/dashmeshro"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the repo
            </a>
          </article>

          <div className="grid">
            <div className="card reveal-item stagger-1">
              <h3>StuckNot Admin App</h3>
              <p>
                A standalone Flutter admin app I built alone, for managing 90+ sample-paper PDFs by
                code, subject, year and semester. It has search, delete and lock/unlock controls.
              </p>
              <ul className="tags">
                <li>Flutter</li>
              </ul>
            </div>
            <div className="card reveal-item stagger-2">
              <h3>QueuelessBharat</h3>
              <p>
                Web platform where emergency patients find nearby hospitals with free beds, check
                whether a doctor is on duty, and book an ambulance. Built for Build With Bharat 4.0.
                I was front-end engineer, in React.js, live on Vercel and still in development.
              </p>
              <ul className="tags">
                <li>React.js</li>
                <li>Vercel</li>
              </ul>
              <a
                href="https://github.com/codedbymuskann/QueueLess_Bharat_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Team repo
              </a>
            </div>
            <div className="card reveal-item stagger-3">
              <h3>Baani.Net restoration</h3>
              <p>
                Helped restore a live Google Play app with 100K+ downloads. I upgraded it from a
                much older Flutter version to a current one and updated the Gradle setup and
                dependencies.
              </p>
              <ul className="tags">
                <li>Flutter</li>
                <li>Gradle</li>
              </ul>
            </div>
            <div className="card reveal-item stagger-4">
              <h3>To-do app</h3>
              <p>Flutter mobile app with a self-written Python FastAPI REST API (CRUD).</p>
              <ul className="tags">
                <li>Flutter</li>
                <li>FastAPI</li>
              </ul>
              <a
                href="https://github.com/manish12345p/todolist"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repo
              </a>
            </div>
            <div className="card reveal-item stagger-5">
              <h3>Telegram AI bot</h3>
              <p>
                Async Python bot built with aiogram that answers messages using an LLM through the
                OpenAI API.
              </p>
              <ul className="tags">
                <li>Python</li>
                <li>aiogram</li>
                <li>OpenAI API</li>
              </ul>
              <a
                href="https://github.com/manish12345p/chatbot"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repo
              </a>
            </div>
            <div className="card reveal-item stagger-6">
              <h3>User Details API</h3>
              <p>
                RESTful FastAPI service with POST, GET, PUT and DELETE endpoints, Pydantic models
                and route versioning.
              </p>
              <ul className="tags">
                <li>Python</li>
                <li>FastAPI</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <h2 className="reveal-item">Experience</h2>
          <ol className="tl">
            <li className="reveal-item stagger-1">
              <h3>StuckNot</h3>
              <div className="when">
                Flutter Developer Intern, Dec 2024 to Feb 2025. Engineer Intern, May to Jul 2025.
                Freelance Developer, 2026 to present.
              </div>
              <p>
                Built core screens for the live StuckNot exam-prep app on Google Play: search with a
                custom delegate, profile and edit profile, transaction history and purchased-subject
                orders. Also built the admin app, the Dashmesh Mechanix CRM, the login and sign-up UI
                for SnackTrack, and the React.js UI for StuckNot Website v2. Contributed to StuckNot
                Studio, a Gemini-powered tool that generates branded multi-slide carousels from a
                user’s logo, colors, fonts and images.
              </p>
            </li>
            <li className="reveal-item stagger-2">
              <h3>QA on CampusMaster, a 12-module college ERP</h3>
              <div className="when">Deployed at Maples College</div>
              <p>
                Tested every module for functionality, flows, validations and alerts. Logged 60+
                defects with module, error details, assigned developer and severity. Most were
                resolved with the senior full-stack developer.
              </p>
            </li>
            <li className="reveal-item stagger-3">
              <h3>KCC Institute of Technology &amp; Management</h3>
              <div className="when">
                B.Tech, Computer Science &amp; Engineering (AI), 2024 to 2028
              </div>
            </li>
          </ol>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2 className="reveal-item">Skills</h2>
          <div className="skills">
            <div className="reveal-item stagger-1">
              <h3>Languages</h3>
              <p>Dart, Python, Java, C, SQL</p>
            </div>
            <div className="reveal-item stagger-2">
              <h3>Flutter</h3>
              <p>
                BLoC, Clean Architecture, SOLID, Freezed and JSON serialization, very_good_cli,
                package-based structure
              </p>
            </div>
            <div className="reveal-item stagger-3">
              <h3>Backend and testing</h3>
              <p>
                Firebase, Supabase, REST APIs, FastAPI, aiogram, manual QA and defect reporting
              </p>
            </div>
            <div className="reveal-item stagger-4">
              <h3>Web and tools</h3>
              <p>
                Familiar with React and Next.js. Git/GitHub, Vercel, FileZilla, prompt engineering
                and AI-assisted development
              </p>
            </div>
          </div>
        </section>

        {/* Hackathons Section */}
        <section id="hackathons">
          <h2 className="reveal-item">Hackathons</h2>
          <ul className="hack">
            <li className="reveal-item stagger-1">
              <strong>Build With Bharat 4.0</strong> (national level, CodeVerse x KCC): PPT round
              with team The Malwares, for QueuelessBharat.
            </li>
            <li className="reveal-item stagger-2">
              <strong>Vivekananda Innovation Hackathon 2026</strong> (DTU and Vivekananda Institute of
              Values, 27 Sep 2026): online screening round.
            </li>
            <li className="reveal-item stagger-3">
              <strong>EY Techathon 6.0:</strong> frontend developer on team Bug Hunters, for MedSure
              AI, an agentic-AI concept for healthcare provider data.
            </li>
            <li className="reveal-item stagger-4">
              <strong>Smart India Hackathon 2025 and 2026:</strong> participated with problem
              statements SIH25032 and SIH26184.
            </li>
            <li className="reveal-item stagger-5">
              <strong>Code Farming</strong> (24-hour code-a-thon on HackerRank, Voyager Coding Club,
              29–30 Apr 2026): participant.
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2 className="reveal-item">Let’s talk</h2>
          <p className="contact reveal-item stagger-1">
            <a href="mailto:manishmaity39@gmail.com">manishmaity39@gmail.com</a>
          </p>
          <div className="btns reveal-item stagger-2" style={{ marginTop: 18 }}>
            <a
              className="btn"
              href="https://www.linkedin.com/in/manish-chandra-maity-106a02321"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn"
              href="https://github.com/manish12345p"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer>Manish Chandra Maity, Delhi NCR</footer>
      </div>

      {/* Floating Resume Tab Button */}
      <button
        ref={cvTabRef}
        className={`cv-tab ${isTabPeeking ? 'tab-peek' : ''}`}
        id="cvTab"
        type="button"
        aria-haspopup="dialog"
        aria-controls="cvPanel"
        aria-label="Open resume"
        onClick={openCv}
      >
        <i aria-hidden="true">&#10033;</i>
        <span>Resume</span>
        <em></em>
        <em></em>
        <em></em>
      </button>

      {/* Resume Modal Scrim Backdrop */}
      <div className="cv-scrim" id="cvScrim" onClick={closeCv}></div>

      {/* Resume Drawer Panel with 3D Printer Animation */}
      <aside
        className="cv-panel"
        id="cvPanel"
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
      >
        <button
          ref={cvCloseRef}
          className="cv-close"
          id="cvClose"
          type="button"
          aria-label="Close resume"
          onClick={closeCv}
        >
          &times;
        </button>

        <div className="cv-stage">
          <div className="cv-printer">
            <div className="cv-slot"></div>
          </div>
          <div className="cv-out">
            <img
              className="cv-paper"
              src="/resume-preview.jpg"
              alt="Preview of Manish’s resume"
              width={520}
              height={735}
            />
          </div>
        </div>

        <p className="cv-msg">
          <strong>Printed. Check your downloads.</strong>{' '}
          <span>
            Nothing there?{' '}
            <a href="/Manish-Chandra-Maity-Resume.pdf" download="Manish-Chandra-Maity-Resume.pdf">
              Grab the PDF
            </a>
          </span>
        </p>
      </aside>
    </>
  );
}
