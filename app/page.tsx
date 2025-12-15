"use client";

import SpaceBackground from "./components/SpaceBackground";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Globe,
  ExternalLink,
  MapPin,
  GraduationCap,
  Cpu,
  Code2,
  Rocket,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Page() {
  const projectsCarouselRef = useRef<HTMLDivElement | null>(null);
  const carouselResumeTimerRef = useRef<number | null>(null);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const experienceCarouselRef = useRef<HTMLDivElement | null>(null);
  const experienceResumeTimerRef = useRef<number | null>(null);
  const [experiencePaused, setExperiencePaused] = useState(false);
  const [experienceIndex, setExperienceIndex] = useState(0);

  const papersCarouselRef = useRef<HTMLDivElement | null>(null);
  const papersResumeTimerRef = useRef<number | null>(null);
  const [papersPaused, setPapersPaused] = useState(false);
  const [papersIndex, setPapersIndex] = useState(0);

  const [aboutMediaIndex, setAboutMediaIndex] = useState(0);

  function pauseCarouselTemporarily(ms: number) {
    setCarouselPaused(true);
    if (carouselResumeTimerRef.current) {
      window.clearTimeout(carouselResumeTimerRef.current);
    }
    carouselResumeTimerRef.current = window.setTimeout(() => {
      setCarouselPaused(false);
      carouselResumeTimerRef.current = null;
    }, ms);
  }

  function pauseExperienceTemporarily(ms: number) {
    setExperiencePaused(true);
    if (experienceResumeTimerRef.current) {
      window.clearTimeout(experienceResumeTimerRef.current);
    }
    experienceResumeTimerRef.current = window.setTimeout(() => {
      setExperiencePaused(false);
      experienceResumeTimerRef.current = null;
    }, ms);
  }

  function pausePapersTemporarily(ms: number) {
    setPapersPaused(true);
    if (papersResumeTimerRef.current) {
      window.clearTimeout(papersResumeTimerRef.current);
    }
    papersResumeTimerRef.current = window.setTimeout(() => {
      setPapersPaused(false);
      papersResumeTimerRef.current = null;
    }, ms);
  }

  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      return;
    }

    setTheme("light");
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (carouselPaused) {
      return;
    }

    const id = window.setInterval(() => {
      const el = projectsCarouselRef.current;
      if (!el) {
        return;
      }

      const children = Array.from(
        el.querySelectorAll<HTMLElement>("[data-carousel-item]")
      );
      if (children.length === 0) {
        return;
      }

      const next = (carouselIndex + 1) % children.length;
      const target = children[next];
      el.scrollTo({ left: target.offsetLeft - 16, behavior: "smooth" });
      setCarouselIndex(next);
    }, 4800);

    return () => {
      window.clearInterval(id);
    };
  }, [mounted, carouselPaused, carouselIndex]);

  useEffect(() => {
    return () => {
      if (carouselResumeTimerRef.current) {
        window.clearTimeout(carouselResumeTimerRef.current);
      }
      if (experienceResumeTimerRef.current) {
        window.clearTimeout(experienceResumeTimerRef.current);
      }
      if (papersResumeTimerRef.current) {
        window.clearTimeout(papersResumeTimerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (!mounted) {
      return;
    }

    const el = papersCarouselRef.current;
    if (!el) {
      return;
    }

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const items = Array.from(
          el.querySelectorAll<HTMLElement>("[data-paper-item]")
        );
        if (items.length === 0) {
          return;
        }

        if (isAtScrollEnd(el)) {
          const last = items.length - 1;
          if (last !== papersIndex) {
            setPapersIndex(last);
          }
          return;
        }

        const next = getNearestIndexFromScroll(el, "[data-paper-item]", papersIndex);
        if (next !== papersIndex) {
          setPapersIndex(next);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [mounted, papersIndex]);

  function isAtScrollEnd(el: HTMLDivElement, epsilonPx = 2) {
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    return maxScrollLeft <= 0 ? true : el.scrollLeft >= maxScrollLeft - epsilonPx;
  }

  function getNearestIndexFromScroll(
    el: HTMLDivElement,
    itemSelector: string,
    currentIndex: number
  ) {
    const items = Array.from(el.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length === 0) {
      return currentIndex;
    }

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;

    let bestIndex = currentIndex;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(itemCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }

    return bestIndex;
  }
  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (experiencePaused) {
      return;
    }

    const id = window.setInterval(() => {
      const el = experienceCarouselRef.current;
      if (!el) {
        return;
      }

      const children = Array.from(
        el.querySelectorAll<HTMLElement>("[data-experience-item]")
      );
      if (children.length === 0) {
        return;
      }

      const next = (experienceIndex + 1) % children.length;
      const target = children[next];
      el.scrollTo({ left: target.offsetLeft - 16, behavior: "smooth" });
      setExperienceIndex(next);
    }, 5200);

    return () => {
      window.clearInterval(id);
    };
  }, [mounted, experiencePaused, experienceIndex]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const el = projectsCarouselRef.current;
    if (!el) {
      return;
    }

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const items = Array.from(
          el.querySelectorAll<HTMLElement>("[data-carousel-item]")
        );
        if (items.length === 0) {
          return;
        }

        if (isAtScrollEnd(el)) {
          const last = items.length - 1;
          if (last !== carouselIndex) {
            setCarouselIndex(last);
          }
          return;
        }

        const next = getNearestIndexFromScroll(
          el,
          "[data-carousel-item]",
          carouselIndex
        );
        if (next !== carouselIndex) {
          setCarouselIndex(next);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [mounted, carouselIndex]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const el = experienceCarouselRef.current;
    if (!el) {
      return;
    }

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const items = Array.from(
          el.querySelectorAll<HTMLElement>("[data-experience-item]")
        );
        if (items.length === 0) {
          return;
        }

        if (isAtScrollEnd(el)) {
          const last = items.length - 1;
          if (last !== experienceIndex) {
            setExperienceIndex(last);
          }
          return;
        }

        const next = getNearestIndexFromScroll(
          el,
          "[data-experience-item]",
          experienceIndex
        );
        if (next !== experienceIndex) {
          setExperienceIndex(next);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [mounted, experienceIndex]);

  const skills = useMemo(
    () => [
      {
        group: "Languages",
        items: [
          "Python",
          "Java",
          "Swift",
          "C",
          "C++",
          "C#",
          "TypeScript",
          "JavaScript",
          "Kotlin",
          "Racket",
        ],
      },
      {
        group: "Frameworks & Tools",
        items: [
          "React",
          "Tailwind CSS",
          "Node.js",
          "Next.js",
          "Express.js",
          "Android Studio",
          "Xcode",
          "Unity",
          "Unreal",
          "Git/GitHub",
        ],
      },
      {
        group: "Data & Systems",
        items: ["AWS", "GCP", "MySQL", "PostgreSQL", "Redis", "Docker"],
      },
    ],
    []
  );

  const experience = useMemo(
    () => [
      {
        title: "Apple",
        org: "Software Engineering Intern",
        period: "June - September 2025",
        location: "Cupertino, CA",
        bullets: [
          "Created a Drag and Drop application with Swift and SwiftUI to easily design upsell sheets for first-party applications in the App Store",
          "Implemented a type-safe JSON serialization system for components using Swift’s Codable protocols, enabling seamless import and export of sheet designs and reducing designer handoff time by 25%",
          "Engineered a centralized state management system using SwiftUI’s Observable framework and Swift Concurrency, enabling thread-safe and real-time editing across 15+ components and improving responsiveness by 40%",
          "Integrated send to device and decreased final display time by 32% by routing through Apple Media Services JavaScript controllers and presenting the created sheet on the connected device",
        ],
      },
      {
        title: "Capgemini",
        org: "Software Engineering Intern",
        period: "May - August 2024",
        location: "Houston, TX",
        bullets: [
          "Built an automated testing app using JavaScript and React to automate code generation and streamline code reviews for code repositories and APIs",
          "Integrated OpenAI with retrieval-augmented generation (RAG) in Python and Flask, boosting test efficiency by 15% and generating over 500 test cases per use",
          "Automated GitHub API calls to update branches, reduce code versioning errors by 30%, and cut total integration time by 15 hours weekly",
        ],
      },
      {
        title: "Geopogo",
        org: "Software Engineering Intern",
        period: "June - September 2023",
        location: "Berkeley, CA",
        bullets: [
          "Engineered augmented reality simulations in C# and Unity for creating and placing buildings in real locations around the world",
          "Enhanced visualization accuracy in simulations and improved review efficiency for stakeholders by 25% by altering design metrics and customization features for custom-made buildings",
          "Reworked the IOS app in Swift by fixing bugs and improving the user interface, leading to a 20% increase in user retention and a 17% improvement in overall app performance",
          "Created a minimum viable product TAGS for 3D tagging and note features in custom augmented reality creations, increasing designer interaction by 30%",
        ],
      },
      {
        title: "Hack4Impact",
        org: "Software Developer",
        period: "September 2022 — June 2025",
        location: "San Luis Obispo, CA",
        bullets: [
          "Worked with Wilshire Health and Community to create a dynamic donation-tracking website with Full Stack Development, AWS Amplify, and GraphQL to increase tracking capabilities by 35%",
          "Built a web scraper for EcoLogistics using AWS Chalice and Beautiful Soup, reducing manual data entry by 50% and saving 10 hours weekly by automating the scraping of untracked data from SLO county websites",
          "Developed an Event Tracker with LCSLO Octogan Barn to track events and manage form uploads with AWS S3 to reduce management time by 45% and allow for real time",
        ],
      },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        name: "AniSense",
        tagline: "Find your next binge",
        desc: "Anime recommender with GCP and locally trained machine learning models",
        tech: ["GCP", "Cloud SQL", "VPC", "Python", "Kubernetes", "Apache"],
        links: [{ label: "Repo", href: "https://github.com/SilverXer0/AniSense" }],
      },
      {
        name: "Aurora",
        tagline: "High-throughput telemetry backend",
        desc: "C++ backend that ingests real-time telemetry, stores data in cache, and exposes low-latency aggregate queries",
        tech: ["C++", "gRPC", "Protobuf", "RocksDB", "OpenTelemetry"],
        links: [{ label: "Repo", href: "https://github.com/SilverXer0/Aurora" }],
      },
      {
        name: "MoodMuse",
        tagline: "Emotion-aware journaling",
        desc: "Captures images and entries, performs on-device analysis, and surfaces trends privately.",
        tech: ["Swift", "SwiftUI", "VisionKit"],
        links: [{ label: "Repo", href: "https://github.com/SilverXer0/MoodMuse" }],
      },
      {
        name: "Aim Trainer / Sensitivity Finder",
        tagline: "FPS tasks with AI-driven sensitivity suggestions",
        desc: "Procedural drills, crosshair UI, and analytics to estimate optimal sensitivity across maps.",
        tech: ["Unity", "C#"],
        links: [
          {
            label: "Repo",
            href: "https://github.com/SilverXer0/FPS-Aim-Trainer/tree/master",
          },
        ],
      },
      {
        name: "MintMatch",
        tagline: "Win real tokens on the blockchain and save them to your crypto wallet",
        desc: "Blockchain token matching game",
        tech: ["Solidity", "Javascript", "Smart Contracts"],
        links: [{ label: "Repo", href: "https://github.com/SilverXer0/MintMatch" }],
      },
      {
        name: "Chatter",
        tagline: "Talk with simple AI and learn more about it",
        desc: "Self Learning Chatbot",
        tech: ["Python", "NLTK", "NLP"],
        links: [{ label: "Repo", href: "https://github.com/SilverXer0/Chatbot" }],
      },
    ],
    []
  );

  const aboutMediaItems = useMemo(
    () => [
      {
        kind: "video" as const,
        title: "Valorant Montage",
        caption: "Check out this Valorant Montage I edited!",
        src: "https://www.youtube.com/embed/j34JIwGZIKE",
      },
      {
        kind: "video" as const,
        title: "Valorant Montage (New)",
        caption: "Check out this Valorant Montage I edited!",
        src: "https://www.youtube.com/embed/nHwBTzHRkQk",
      },
      {
        kind: "image" as const,
        title: "Cal Poly",
        caption: "A snapshot of Cal Poly.",
        src: "/photos/Cal-Poly-SLO.jpg",
      },
      {
        kind: "image" as const,
        title: "Coding",
        caption: "A snapshot of my VSCode.",
        src: "/photos/code.png",
      },
    ],
    []
  );

  const awards = [
    { title: "Dean's List", org: "Cal Poly, SLO", year: "All Terms Sept 2022 - Dec 2025" },
    { title: "Presidential Award", org: "Cal Poly, SLO", year: "All Years 2022 - 2025" },
    { title: "ACT", org: "36/36", year: "April 2021" },
  ];

  return (
    <div
      className={mounted && theme === "dark" ? "dark" : ""}
      suppressHydrationWarning
    >
      <SpaceBackground />
      <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-black/35">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Cpu className="h-5 w-5" />
              <span>Sharan Krishna</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="hover:opacity-80">About</a>
              <a href="#experience" className="hover:opacity-80">Experience</a>
              <a href="#projects" className="hover:opacity-80">Projects</a>
              <a href="#skills" className="hover:opacity-80">Skills</a>
              <a href="#papers" className="hover:opacity-80">Papers</a>
              <a href="#awards" className="hover:opacity-80">Awards</a>
              <a href="#contact" className="hover:opacity-80">Contact</a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/resume/Sharan_K_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:bg-white/80 hover:-translate-y-0.5 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
                title="Open resume (PDF)"
              >
                <Download className="h-4 w-4" /> Résumé
              </a>

              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:bg-white/80 hover:-translate-y-0.5 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>

        <header className="mx-auto max-w-6xl px-4 pt-24 pb-28 min-h-[100svh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE }}
            className="mx-auto -mt-12 sm:-mt-16 flex max-w-3xl flex-col items-center text-center"
          >
            <h1
              className="mt-0 text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]"
              style={{
                fontFamily:
                  "Snell Roundhand, Apple Chancery, Brush Script MT, cursive",
              }}
            >
              Hi, I'm Sharan.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl">
              I'm a Software Engineer that works across many different tech spaces, such as Distributed Systems,
              Full Stack Development, and Mobile App Development, and Machine Learning. 
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.22)] hover:ring-1 hover:ring-black/10 dark:bg-white dark:text-neutral-900 dark:hover:ring-white/15"
              >
                See Experience <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-0.5 hover:bg-white/75 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
              >
                Get in touch <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: APPLE_EASE }}
            className="mx-auto mt-10 max-w-6xl"
          >
            <MarqueeRow
              ariaLabel="Highlights"
              durationSec={18}
              className="mt-0"
              renderItem={(item) => (
                <div
                  className="h-[220px] w-[320px] flex flex-col justify-center rounded-3xl border border-black/10 bg-white/70 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.45)] transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15"
                >
                  <div className="text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                    {item.label}
                  </div>

                  {item.kind === "edu" ? (
                    <>
                      <div className="mt-3 flex items-center gap-2 text-lg text-neutral-800 dark:text-neutral-200">
                        <GraduationCap className="h-4 w-4" />
                        <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                          {item.primary}
                        </span>
                      </div>
                      <div className="mt-2 text-base leading-snug text-neutral-600 dark:text-neutral-300">
                        {item.secondary}
                      </div>
                    </>
                  ) : item.kind === "gpa" ? (
                    <>
                      <div className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {item.primary}
                      </div>
                      <div className="mt-2 text-base leading-snug text-neutral-600 dark:text-neutral-300">
                        {item.secondary}
                      </div>
                    </>
                  ) : item.kind === "grad" ? (
                    <>
                      <div className="mt-3 flex items-center gap-2 text-lg text-neutral-800 dark:text-neutral-200">
                        <MapPin className="h-4 w-4" />
                        <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                          {item.primary}
                        </span>
                      </div>
                      <div className="mt-2 text-base leading-snug text-neutral-600 dark:text-neutral-300">
                        {item.secondary}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {item.primary}
                      </div>
                      <div className="mt-2 text-base leading-snug text-neutral-600 dark:text-neutral-300">
                        {item.secondary}
                      </div>
                    </>
                  )}
                </div>
              )}
              items={[
                {
                  key: "edu",
                  kind: "edu",
                  label: "Education",
                  primary: "Cal Poly, SLO",
                  secondary: "BS, Computer Science",
                },
                {
                  key: "gpa",
                  kind: "gpa",
                  label: "GPA",
                  primary: "3.95",
                  secondary: "out of 4.0",
                },
                {
                  key: "grad",
                  kind: "grad",
                  label: "Expected grad",
                  primary: "Dec 2025",
                  secondary: "San Luis Obispo, CA",
                },
                {
                  key: "now",
                  kind: "mini",
                  label: "Now",
                  primary: "Full-time SWE search",
                  secondary: "Open to roles",
                },
                {
                  key: "focus",
                  kind: "mini",
                  label: "Focus",
                  primary: "Distributed Systems",
                  secondary: "Reliability + Scalability",
                },
                {
                  key: "recent",
                  kind: "mini",
                  label: "Recent",
                  primary: "Apple",
                  secondary: "Software Engineering Intern",
                },
                {
                  key: "build",
                  kind: "mini",
                  label: "Building",
                  primary: "Research",
                  secondary: "Distributed Systems and Cloud",
                },
              ]}
            />
          </motion.div>
        </header>


        <Section id="about" titleIcon={<Code2 className="h-5 w-5" />} title="About">
          <div className="mt-10 space-y-8">
            <div className="rounded-3xl border border-black/10 bg-white/70 p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.45)] transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-lg sm:text-xl leading-relaxed text-neutral-800 dark:text-neutral-200">
                  I build software with an emphasis on scalability, reliability, and thoughtful product polish, regardless of the tech stack.
                  Lately I have been focused on <strong>distributed systems</strong>, learning from papers and research,
                  and applying those ideas to projects like <strong>Aurora</strong>, a high-throughput telemetry backend.
                </p>
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                  In my most recent internship at Apple, I worked heavily with <strong>Swift Concurrency</strong> to keep real-time editing experiences
                  responsive and correct, along with building out the drag-and-drop application with <strong>SwiftUI</strong>. Outside of work, I have been improving my <strong>AWS</strong> skills 
                  to obtain  multiple certifications and building end-to-end projects that combine performance, observability, and a clean User Interface.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { k: "Seeking", v: "Connections, collaborations, and impactful SWE roles" },
                    { k: "Interests", v: "Software Development, Distributed Systems, Cloud, and Machine Learning" },
                    { k: "Currently", v: "Reading papers on Distributed Systems and Researching" },
                    { k: "Outside", v: "PC Games like Valorant and Counter Strike, Basketball, F1, and PC Tinkering" },
                  ].map((item) => (
                    <div
                      key={item.k}
                      className="h-full rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.45)] transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15"
                    >
                      <div className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                        {item.k}
                      </div>
                      <div className="mt-2 text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
                        {item.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="h-full rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.45)] transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15">
                  <div className="mt-2 flex h-full flex-col gap-4">
                    <div className="relative flex-1 overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-black">
                      <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex items-center justify-between px-3">
                        <button
                          type="button"
                          aria-label="Previous media"
                          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-0.5 hover:bg-white/80 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
                          onClick={() => {
                            setAboutMediaIndex((i) =>
                              (i - 1 + aboutMediaItems.length) % aboutMediaItems.length
                            );
                          }}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          aria-label="Next media"
                          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-0.5 hover:bg-white/80 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
                          onClick={() => {
                            setAboutMediaIndex((i) => (i + 1) % aboutMediaItems.length);
                          }}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>

                      {aboutMediaItems[aboutMediaIndex].kind === "video" ? (
                        <iframe
                          className="h-full w-full"
                          src={aboutMediaItems[aboutMediaIndex].src}
                          title={aboutMediaItems[aboutMediaIndex].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={aboutMediaItems[aboutMediaIndex].src}
                          alt={aboutMediaItems[aboutMediaIndex].title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 text-center">
                      {aboutMediaItems[aboutMediaIndex].caption}
                    </div>

                    <div className="-mt-1 flex items-center justify-center gap-2">
                      {aboutMediaItems.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to media ${i + 1}`}
                          onClick={() => setAboutMediaIndex(i)}
                          className={
                            "h-2.5 w-2.5 rounded-full transition " +
                            (i === aboutMediaIndex
                              ? "bg-neutral-900 dark:bg-white"
                              : "bg-black/15 hover:bg-black/25 dark:bg-white/20 dark:hover:bg-white/30")
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="experience" titleIcon={<Rocket className="h-5 w-5" />} title="Experience">
          <div className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                My past Roles and Work.
              </p>

              <div className="hidden sm:flex items-center gap-2">
                {experience.map((job, i) => (
                  <button
                    key={job.title + String(i)}
                    type="button"
                    aria-label={`Go to experience ${i + 1}`}
                    onClick={() => {
                      const el = experienceCarouselRef.current;
                      if (!el) {
                        return;
                      }
                      const children = Array.from(
                        el.querySelectorAll<HTMLElement>("[data-experience-item]")
                      );
                      const target = children[i];
                      if (!target) {
                        return;
                      }
                      pauseExperienceTemporarily(4500);
                      el.scrollTo({ left: target.offsetLeft - 16, behavior: "smooth" });
                      setExperienceIndex(i);
                    }}
                    className={
                      "h-2.5 w-2.5 rounded-full transition " +
                      (i === experienceIndex
                        ? "bg-neutral-900 dark:bg-white"
                        : "bg-black/15 hover:bg-black/25 dark:bg-white/20 dark:hover:bg-white/30")
                    }
                  />
                ))}
              </div>
            </div>

            <div
              ref={experienceCarouselRef}
              className="no-scrollbar mt-6 flex gap-6 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x mandatory" }}
              onMouseEnter={() => setExperiencePaused(true)}
              onMouseLeave={() => setExperiencePaused(false)}
              onWheel={() => pauseExperienceTemporarily(4500)}
              onTouchStart={() => pauseExperienceTemporarily(4500)}
              onPointerDown={() => pauseExperienceTemporarily(4500)}
            >
              {experience.map((job) => (
                <motion.div
                  key={job.title + job.org}
                  data-experience-item
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: APPLE_EASE }}
                  className="min-w-[92%] sm:min-w-[78%] lg:min-w-[62%] scroll-ml-4 snap-center rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {job.title}
                      </h3>
                      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                        {job.org}
                      </div>
                    </div>

                    <div className="text-xs text-neutral-500 dark:text-neutral-400 text-left sm:text-right">
                      <div>{job.period}</div>
                      <div className="flex items-center gap-1 sm:justify-end mt-1">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </div>
                    </div>
                  </div>

                  {job.bullets?.length ? (
                    <ul className="mt-5 space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              ))}
            </div>

            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
            `}</style>
          </div>
        </Section>

        <Section id="projects" titleIcon={<Code2 className="h-5 w-5" />} title="Projects">
          <div className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                A few things I’ve built recently.
              </p>

              <div className="hidden sm:flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to project ${i + 1}`}
                    onClick={() => {
                      const el = projectsCarouselRef.current;
                      if (!el) {
                        return;
                      }
                      const children = Array.from(
                        el.querySelectorAll<HTMLElement>("[data-carousel-item]")
                      );
                      const target = children[i];
                      if (!target) {
                        return;
                      }
                      pauseCarouselTemporarily(4500);
                      el.scrollTo({ left: target.offsetLeft - 16, behavior: "smooth" });
                      setCarouselIndex(i);
                    }}
                    className={
                      "h-2.5 w-2.5 rounded-full transition " +
                      (i === carouselIndex
                        ? "bg-neutral-900 dark:bg-white"
                        : "bg-black/15 hover:bg-black/25 dark:bg-white/20 dark:hover:bg-white/30")
                    }
                  />
                ))}
              </div>
            </div>

            <div
              ref={projectsCarouselRef}
              className="no-scrollbar mt-6 flex gap-6 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x mandatory" }}
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onWheel={() => pauseCarouselTemporarily(4500)}
              onTouchStart={() => pauseCarouselTemporarily(4500)}
              onPointerDown={() => pauseCarouselTemporarily(4500)}
            >
              {projects.map((p) => (
                <motion.a
                  key={p.name}
                  data-carousel-item
                  href={p.links?.[0]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: APPLE_EASE }}
                  className="min-w-[88%] sm:min-w-[70%] lg:min-w-[56%] scroll-ml-4 snap-center rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {p.name}
                      </h3>
                      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                        {p.tagline}
                      </div>
                    </div>

                    <div className="shrink-0 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-neutral-800 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
                      View repo <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {p.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>

            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
            `}</style>
          </div>
        </Section>

        <Section id="skills" titleIcon={<Code2 className="h-5 w-5" />} title="Skills">
          <div className="mt-8">
            <Card>
              <div className="space-y-6">
                {skills.map((s) => (
                  <div key={s.group} className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-6">
                    <div className="md:col-span-1">
                      <div className="text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                        {s.group}
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <div className="flex flex-wrap gap-2">
                        {s.items.map((i) => (
                          <span
                            key={i}
                            className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-xs text-neutral-800 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        <Section id="papers" titleIcon={<PenIcon />} title="Papers">
          <div className="mt-8">
            {[
              {
                title:
                  "The Evolution of Algorithms and Techniques of Load Balancing in Distributed Systems",
                desc: "Survey Paper on the history of load balancing in Distributed Systems.",
                href: "/papers/load-balancing.pdf",
              },
            ].length ? (
              <>
                <div className="flex items-end justify-between gap-4">
                  <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                    Writing and long-form work. Swipe or scroll horizontally to explore.
                  </p>

                  <div className="hidden sm:flex items-center gap-2">
                    {[{
                      title:
                        "The Evolution of Algorithms and Techniques of Load Balancing in Distributed Systems",
                      desc: "Survey Paper on the history of load balancing in Distributed Systems.",
                      href: "/papers/load-balancing.pdf",
                    }].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to paper ${i + 1}`}
                        onClick={() => {
                          const el = papersCarouselRef.current;
                          if (!el) {
                            return;
                          }
                          const children = Array.from(
                            el.querySelectorAll<HTMLElement>("[data-paper-item]")
                          );
                          const target = children[i];
                          if (!target) {
                            return;
                          }
                          pausePapersTemporarily(4500);
                          el.scrollTo({ left: target.offsetLeft - 16, behavior: "smooth" });
                          setPapersIndex(i);
                        }}
                        className={
                          "h-2.5 w-2.5 rounded-full transition " +
                          (i === papersIndex
                            ? "bg-neutral-900 dark:bg-white"
                            : "bg-black/15 hover:bg-black/25 dark:bg-white/20 dark:hover:bg-white/30")
                        }
                      />
                    ))}
                  </div>
                </div>

                <div
                  ref={papersCarouselRef}
                  className="no-scrollbar mt-6 flex gap-6 overflow-x-auto pb-4"
                  style={{ scrollSnapType: "x mandatory" }}
                  onMouseEnter={() => setPapersPaused(true)}
                  onMouseLeave={() => setPapersPaused(false)}
                  onWheel={() => pausePapersTemporarily(4500)}
                  onTouchStart={() => pausePapersTemporarily(4500)}
                  onPointerDown={() => pausePapersTemporarily(4500)}
                >
                  {[{
                    title:
                      "The Evolution of Algorithms and Techniques of Load Balancing in Distributed Systems",
                    desc: "Survey Paper on the history of Load Balancing in Distributed Systems.",
                    href: "/papers/load-balancing.pdf",
                  }].map((w) => (
                    <motion.a
                      key={w.title}
                      data-paper-item
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, ease: APPLE_EASE }}
                      className="min-w-[88%] sm:min-w-[70%] lg:min-w-[56%] scroll-ml-4 snap-center rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15"
                      style={{ scrollSnapAlign: "center" }}
                    >
                      <div className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                        {w.title}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
                        {w.desc}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-200">
                        Read <ExternalLink className="h-4 w-4" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                <style jsx>{`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .no-scrollbar {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                  }
                `}</style>
              </>
            ) : null}
          </div>
        </Section>

        <Section id="awards" titleIcon={<Trophy className="h-5 w-5" />} title="Awards & Highlights">
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((a) => (
              <Card key={a.title}>
                <div className="font-medium">{a.title}</div>
                <div className="text-neutral-500">{a.org}</div>
                <div className="text-neutral-500 text-xs">{a.year}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="contact" titleIcon={<Mail className="h-5 w-5" />} title="Get in touch">
          <div className="mt-8">
            <Card>
              <p className="text-neutral-700 dark:text-neutral-300">
                I’m always down to chat about job opportunites, research, or fun side projects. Feel
                free to email me or connect with me on LinkedIn!
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:krishna.sharan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.22)] hover:ring-1 hover:ring-black/10 dark:bg-white dark:text-neutral-900 dark:hover:ring-white/15"
                >
                  <Mail className="h-4 w-4" /> Email Me
                </a>

                <a
                  href="https://www.linkedin.com/in/sharankrishna14/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-0.5 hover:bg-white/75 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>

                <a
                  href="https://github.com/SilverXer0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-0.5 hover:bg-white/75 hover:ring-1 hover:ring-black/10 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10 dark:hover:ring-white/15 dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
            </Card>
          </div>

          <footer className="py-10 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Sharan Krishna - built with Next.js & Tailwind.
          </footer>
        </Section>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  titleIcon,
  children,
}: {
  id?: string;
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-20 scroll-mt-28">
      <div className="flex items-center gap-2">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 px-2.5 py-1 text-xs inline-flex items-center gap-1">
          {titleIcon}
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}


function Card({ children, href }: { children: React.ReactNode; href?: string }) {
  const className =
    "rounded-3xl border border-black/10 bg-white/70 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.18)] hover:ring-1 hover:ring-black/10 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)] dark:hover:ring-white/15";

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: APPLE_EASE }}
        className={className + " cursor-pointer"}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: APPLE_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MarqueeRow<T extends { key: string; kind?: string }>({
  ariaLabel,
  items,
  renderItem,
  durationSec = 24,
  className = "",
}: {
  ariaLabel: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  durationSec?: number;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  function pauseTemporarily(ms: number) {
    setPaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, ms);
  }

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      return;
    }

    let rafId = 0;
    let lastTs = 0;

    const tick = (ts: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (paused) {
        lastTs = ts;
        return;
      }

      if (!lastTs) {
        lastTs = ts;
        return;
      }

      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const total = el.scrollWidth;
      const half = total / 2;
      if (half <= 0) {
        return;
      }

      const pxPerSec = half / Math.max(8, durationSec);
      el.scrollLeft += pxPerSec * dt;

      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [paused, durationSec]);

  return (
    <div
      className={"relative " + className}
      aria-label={ariaLabel}
      role="region"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/85 to-transparent dark:from-black/55" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/85 to-transparent dark:from-black/55" />

      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto overflow-y-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onWheel={() => pauseTemporarily(1800)}
        onTouchStart={() => pauseTemporarily(1800)}
        onPointerDown={() => pauseTemporarily(1800)}
      >
        <div className="flex w-max gap-4 py-1 pr-4">
          {items.map((item, idx) => (
            <div key={item.key} className="shrink-0">
              {renderItem(item, idx)}
            </div>
          ))}
          {items.map((item, idx) => (
            <div key={`${item.key}-dup`} className="shrink-0" aria-hidden>
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}

function PenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M16.862 3.487a2.5 2.5 0 0 1 3.535 3.535l-11.2 11.2a4 4 0 0 1-1.702.986l-3.45.985.986-3.45a4 4 0 0 1 .985-1.701l11.2-11.2Z"
        className="stroke-current"
        strokeWidth="1.5"
      />
      <path
        d="M14.75 5.6l3.536 3.536"
        className="stroke-current"
        strokeWidth="1.5"
      />
    </svg>
  );
}