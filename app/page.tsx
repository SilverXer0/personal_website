"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Aurora from "./components/Aurora";
import BorderGlow from "./components/BorderGlow";
import ShinyText from "./components/ShinyText";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
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
  Music,
  ExternalLink as ExternalLinkIcon,
  Volume2,
  VolumeX,
  User,
} from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SECTION_CHILD: any = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: APPLE_EASE },
  },
};

type TouchSectionCtx = {
  register: (id: string, setActive: (v: boolean) => void, el: HTMLElement) => () => void;
};
const TouchSectionContext = React.createContext<TouchSectionCtx | null>(null);

function TouchSectionProvider({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const registryRef = useRef<Map<string, { setActive: (v: boolean) => void; ratio: number }>>(new Map());

  const getObserver = useCallback(() => {
    if (observerRef.current) return observerRef.current;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.sectionCardId;
          if (id) {
            const card = registryRef.current.get(id);
            if (card) card.ratio = entry.intersectionRatio;
          }
        }
        let bestId: string | null = null;
        let bestRatio = 0.25;
        for (const [id, { ratio }] of registryRef.current) {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        }
        const isMobile = window.matchMedia("(hover: none), (max-width: 768px)").matches;
        for (const [id, { setActive }] of registryRef.current) {
          setActive(isMobile && id === bestId);
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
    );
    return observerRef.current;
  }, []);

  const register = useCallback(
    (id: string, setActive: (v: boolean) => void, el: HTMLElement) => {
      if (typeof window === "undefined") return () => { };

      registryRef.current.set(id, { setActive, ratio: 0 });
      el.dataset.sectionCardId = id;
      getObserver().observe(el);

      return () => {
        registryRef.current.delete(id);
        observerRef.current?.unobserve(el);
      };
    },
    [getObserver]
  );

  useEffect(() => () => { observerRef.current?.disconnect(); }, []);

  return (
    <TouchSectionContext.Provider value={{ register }}>
      {children}
    </TouchSectionContext.Provider>
  );
}

const cardIdCounter = { n: 0 };
function useIntersectionActive<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);
  const context = React.useContext(TouchSectionContext);
  const idRef = useRef(`sc-${cardIdCounter.n++}`);

  useEffect(() => {
    const el = ref.current;
    if (!el || !context) return;
    return context.register(idRef.current, setIsActive, el);
  }, [context]);

  return [ref, isActive];
}

function HobbyCardWithGif({ h }: { h: any }) {
  const [gifSrc, setGifSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, touchActive] = useIntersectionActive<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!touchActive) {
      setIsHovered(false);
      setGifSrc(null);
    } else {
      if (h.hoverImg) setGifSrc(`${h.hoverImg}?t=${Date.now()}`);
      setIsHovered(true);
    }
  }, [touchActive, h.hoverImg]);

  const handleMouseEnter = () => {
    if (h.hoverImg) setGifSrc(`${h.hoverImg}?t=${Date.now()}`);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGifSrc(null);
  };

  const active = isHovered || touchActive;

  useEffect(() => {
    if (videoRef.current) {
      if (active) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [active]);

  return (
    <motion.div variants={SECTION_CHILD} className="h-full">
      <BorderGlow
        className={`group flex flex-col h-full rounded-3xl border bg-white/70 backdrop-blur-2xl transition will-change-transform active:scale-[0.98] dark:bg-white/5
          ${active
            ? "border-black/20 -translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.22)] bg-white/95 ring-2 ring-black/20 dark:border-white/30 dark:bg-white/10 dark:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:ring-white/30"
            : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30"}
        `}
      >
        <div
          ref={cardRef}
          className="flex flex-col h-full p-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {h.name}
        </h3>

        {h.img && (
          <div className="relative mt-5 w-full h-72 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 flex-shrink-0">
            <img
              src={h.img}
              alt={h.name}
              className={`absolute inset-0 h-full w-full transition-[opacity,filter] duration-300 ${active ? "grayscale-0" : "grayscale"} ${h.imgClass || "object-cover"}`}
            />
            {gifSrc && (
              <img
                src={gifSrc}
                alt={h.name + " highlight"}
                className={`absolute inset-0 z-10 h-full w-full transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"} ${h.imgClass || "object-cover"}`}
              />
            )}
            {h.hoverVideo && (
              <video
                ref={videoRef}
                src={h.hoverVideo}
                loop
                muted
                playsInline
                className={`absolute inset-0 z-10 h-full w-full transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"} ${h.imgClass || "object-cover"}`}
              />
            )}
          </div>
        )}

        <p className="mt-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 flex-grow">
          {h.caption}
        </p>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function HobbyCard({ h }: { h: any }) {
  const [cardRef, touchActive] = useIntersectionActive<HTMLDivElement>();
  return (
    <motion.div variants={SECTION_CHILD} className="h-full">
      <BorderGlow
        className={`group flex flex-col h-full rounded-3xl border bg-white/70 backdrop-blur-2xl transition will-change-transform active:scale-[0.98] dark:bg-white/5
          ${touchActive
            ? "border-black/20 -translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.22)] bg-white/95 ring-2 ring-black/20 dark:border-white/30 dark:bg-white/10 dark:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:ring-white/30"
            : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30"}
        `}
      >
        <div
          ref={cardRef}
          className="flex flex-col h-full p-6"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {h.name}
        </h3>

        {h.img && (
          <div className="relative mt-5 w-full h-72 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 flex-shrink-0">
            <img
              src={h.img}
              alt={h.name}
              className={`absolute inset-0 h-full w-full transition-[opacity,filter] duration-300 ${touchActive ? "grayscale-0" : "grayscale group-hover:grayscale-0"} ${(h as any).imgClass || "object-cover"}`}
            />
          </div>
        )}

        <p className="mt-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 flex-grow">
          {h.caption}
        </p>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function ProjectCard({ p }: { p: any }) {
  const [cardRef, touchActive] = useIntersectionActive<HTMLDivElement>();
  return (
    <motion.div variants={SECTION_CHILD} className="h-full">
      <BorderGlow
        className={`group flex flex-col h-full rounded-3xl border bg-white/70 backdrop-blur-2xl transition will-change-transform active:scale-[0.98] dark:bg-white/5
          ${touchActive
            ? "border-black/20 -translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.22)] bg-white/95 ring-2 ring-black/20 dark:border-white/30 dark:bg-white/10 dark:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:ring-white/30"
            : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30"}
        `}
      >
        <div
          ref={cardRef}
          className="flex flex-col h-full p-6"
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
          <a
            href={p.links?.[0]?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-neutral-800 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/20 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
          >
            View repo <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {p.img && (
          <div className="mt-5 w-full h-48 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 flex-shrink-0">
            <img
              src={p.img}
              alt={p.name}
              className={`h-full w-full object-cover transition-[opacity,filter] duration-300 ${touchActive ? "grayscale-0" : "grayscale group-hover:grayscale-0"} ${p.imgClass}`}
            />
          </div>
        )}

        <p className="mt-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 flex-grow">
          {p.desc}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          {p.tech.map((t: string) => (
            <span
              key={t}
              className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              {t}
            </span>
          ))}
        </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function ExperienceCard({ job }: { job: any }) {
  const [cardRef, touchActive] = useIntersectionActive<HTMLDivElement>();
  return (
    <motion.div variants={SECTION_CHILD} className="flex w-full">
      <BorderGlow
        className={`group flex flex-col w-full h-full rounded-3xl border bg-white/70 backdrop-blur-2xl transition will-change-transform active:scale-[0.98] dark:bg-white/5
          ${touchActive
            ? "border-black/20 -translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.22)] bg-white/95 ring-2 ring-black/20 dark:border-white/30 dark:bg-white/10 dark:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:ring-white/30"
            : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30"}
        `}
      >
        <div
          ref={cardRef}
          className="flex flex-col w-full h-full p-6"
        >
          <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              {job.title}
            </h3>
            <div className="mt-1 text-base font-medium text-neutral-800 dark:text-neutral-200">
              {job.org}
            </div>
            <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              <div>{job.period}</div>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" /> {job.location}
              </div>
            </div>
          </div>

          <div className="shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden flex items-center justify-center">
            <img 
              src={job.logo} 
              alt={job.org} 
              className={`h-full w-full object-contain transition-[opacity,filter] duration-300 ${touchActive ? "grayscale-0 opacity-100" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"}`} 
            />
          </div>
        </div>

        {job.bullets?.length ? (
          <ul className="mt-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 list-disc pl-5 space-y-2">
            {job.bullets.map((bullet: string, idx: number) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function PaperCard({ w }: { w: any }) {
  const [cardRef, touchActive] = useIntersectionActive<HTMLDivElement>();
  return (
    <motion.div variants={SECTION_CHILD} className="h-full">
      <BorderGlow
        className={`flex flex-col h-full rounded-3xl border bg-white/70 backdrop-blur-2xl transition will-change-transform active:scale-[0.98] dark:bg-white/5
          ${touchActive
            ? "border-black/20 -translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.22)] bg-white/95 ring-2 ring-black/20 dark:border-white/30 dark:bg-white/10 dark:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:ring-white/30"
            : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30"}
        `}
      >
        <div
          ref={cardRef}
          className="flex flex-col h-full p-6"
        >
          <div className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          {w.title}
        </div>

        {w.href.endsWith(".pdf") && (
          <div className="mt-5 w-full h-96 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            <iframe
              src={`${w.href}#toolbar=0&navpanes=0`}
              title={w.title}
              className="w-full h-full"
            />
          </div>
        )}

        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-5 flex-grow">
          {w.desc}
        </p>

        <div className="mt-6">
          <a
            href={w.externalUrl || w.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm text-neutral-800 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
          >
            Read full paper <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export default function Page() {


  const [aboutMediaIndex, setAboutMediaIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState(0);

  const mediaVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    }),
  };

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(!!mq.matches);
    set();
    if (mq.addEventListener) {
      mq.addEventListener("change", set);
      return () => mq.removeEventListener("change", set);
    }
    mq.addListener(set);
    return () => mq.removeListener(set);
  }, []);

  const heroStagger = useMemo(
    () => ({
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    [],
  );

  const heroItem = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.75, ease: APPLE_EASE },
      },
    }),
    [],
  );


  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const ytPlayers = useRef<{ [key: string]: any }>({});
  const [hasEntered, setHasEntered] = useState(false);
  const hasEnteredRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = hasEntered ? "" : "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, hasEntered]);

  useEffect(() => {
    setMounted(true);

    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const handleVisibilityChange = () => {
      if (!hasEnteredRef.current || !audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => { });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    
    const currentMedia = aboutMediaItems[aboutMediaIndex];
    if (currentMedia.kind !== "video") return;

    const iframeId = `yt-player-${aboutMediaIndex}`;

    const bindPlayer = () => {
      ytPlayers.current[iframeId] = new window.YT.Player(iframeId, {
        events: {
          onStateChange: (event: any) => {
            if (!audioRef.current) return;
            if (event.data === 1) {
              audioRef.current.pause();
            } else if (event.data === 2 || event.data === 0) {
              if (hasEnteredRef.current && !document.hidden) {
                audioRef.current.play().catch(() => { });
              }
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      bindPlayer();
    } else {
      const pollTimer = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(pollTimer);
          bindPlayer();
        }
      }, 500);
      return () => clearInterval(pollTimer);
    }
  }, [aboutMediaIndex, hasEntered]);


  useEffect(() => {
    if (!mounted) {
      return;
    }
  }, [mounted]);


  const hobbies = useMemo(
    () => [
      {
        name: "Competitive FPS",
        img: "/photos/360_static.jpg",
        hoverVideo: "/photos/360.mp4",
        caption: "I'm tough at Valorant, but my CS2 inventory costs too much to not play.",
      },
      {
        name: "PCs and (mostly) peripherals",
        img: "/photos/setup.jpg",
        caption: "My glorious desk setup with hidden cables (lot of work) and my million mice, keyboards, and other expensive stuff.",
      },
      {
        name: "Music",
        img: "/photos/music.jpg",
        caption: "I'm a classically trained pianist (California Certificate of Merit Level 10) and an aspiring singer (I got lucky with the genetics).",
      },
      {
        name: "Formula 1",
        img: "/photos/redbull.jpg",
        caption: "Following the twists and turns of the global F1 calendar. Go Redbull tho, Du Du Du Du.",
      },
      {
        name: "Basketball",
        img: "/photos/basketball.jpg",
        imgClass: "object-cover object-bottom",
        caption: "Watching the NBA and playing pickup games whenever I get the chance. Go Warriors! (They beat the suns in this game).",
      },
      {
        name: "Anime",
        img: "/photos/anime.jpg",
        hoverImg: "/photos/anime.gif",
        imgClass: "object-cover object-[center_30%]",
        caption: "Watching anime (and reading manga). Got a massive collection of the media, but my favorite will always be this scene.",
      },
    ],
    [],
  );

  const experience = useMemo(
    () => [
      {
        title: "Plaid",
        org: "Software Engineer",
        period: "March 2026 - Present",
        location: "San Francisco, CA",
        logo: "/photos/plaid.png",
        bullets: [
          "Building Infrastructure for the Developer Dashboard",
        ],
      },
      {
        title: "Apple",
        org: "Software Engineering Intern",
        period: "June - September 2025",
        location: "Cupertino, CA",
        logo: "/photos/apple.jpg",
        bullets: [
          "Built Drag and Drop Application with Swift and SwiftUi for easily creating upsell sheets for first-party Apple Services",
          "Focused on Swift Codable and Concurrency to support real time component editing and low-latency sheet-to-JSON conversions",
          "Built a Send-to-Device Pipeline to route through Apple Media Services Javascript Controllers and display sheets on connected Devices to visualize component differences across other operating systems"
        ],
      },
      {
        title: "Capgemini",
        org: "Software Engineering Intern",
        period: "May - August 2024",
        location: "Houston, TX",
        logo: "/photos/capgemini.png",
        bullets: [
          "Developed an Automated Testing App using JavaScript and React to automate code generation and streamline code reviews for code repositories and APIs",
          "Integrated a retrieval-augmented generation (RAG) service using Python and Flask to dynamically generate tests, improve coverage, and scale test generation",
          "Automated GitHub workflows and branch management through custom API calls, reducing versioning conflicts and CI throughput"
        ],
      },
      {
        title: "Geopogo",
        org: "Software Engineering Intern",
        period: "June - September 2023",
        location: "Berkeley, CA",
        logo: "/photos/geopogo.png",
        bullets: [
          "Engineered real-time augmented reality simulations in C# and Unity for creating and placing buildings in real locations around the world",
          "Enhanced visualization accuracy and rendering performance in simulations by refining spatial metrics and customization pipelines to increase stakeholder review efficiency",
          "Created a minimum viable product TAGS in the iOS App for 3D tagging and note features in custom augmented reality creations to increase user and designer interactionM"

        ],
      },
      {
        title: "Hack4Impact",
        org: "Software Developer",
        period: "September 2022 — June 2025",
        location: "San Luis Obispo, CA",
        logo: "/photos/hack.png",
        bullets: [
          "Worked with Wilshire Health and Community to create a dynamic donation-tracking website with Full Stack, Development, AWS Amplify, and GraphQL",
          "Built a web scraper for EcoLogistics using AWS Chalice and Beautiful Soup to automate the scraping of untracked data from SLO county websites",
          "Worked with LCSLO Octogan Barn to track events and form uploads with S3 to total reduce management time and event tracking difficulties"
        ],
      },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        name: "Kitsu",
        tagline: "Find Your Next Binge",
        img: "/photos/anisense.jpg",
        imgClass: "object-top",
        desc: "Production-grade anime recommendation platform focused on ML infrastructure, offline data pipelines, caching strategies, and concurrency",
        tech: ["Go", "Python", "TypeScript", "PostgreSQL", "Redis", "Docker"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/Kitsu" },
        ],
      },
      {
        name: "Aether",
        tagline: "High-Performance Compression Utility",
        img: "/photos/aether.jpg",
        imgClass: "",
        desc: "A multithreaded compression tool built to achieve maximum disk-to-disk throughput on modern multi-core processors",
        tech: ["C++", "ZSTD", "Linux", "POSIX", "Docker", "GoogleTest"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/Aether" },
        ],
      },
      {
        name: "Aurora",
        tagline: "High-throughput telemetry backend",
        img: "/photos/aurora.jpg",
        imgClass: "",
        desc: "C++ backend that ingests real-time telemetry, stores data in cache, and exposes low-latency aggregate queries",
        tech: ["C++", "gRPC", "Protobuf", "RocksDB", "OpenTelemetry"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/Aurora" },
        ],
      },
      {
        name: "AniSense",
        tagline: "Personalized MyAnimeList Recommendations",
        img: "/photos/anime2.png",
        imgClass: "object-[center_20%]",
        desc: "Anime recommender with GCP and locally trained machine learning models, based on your own MyAnimeList Account",
        tech: ["GCP", "TypeScript", "Python", "React", "Flask", "Apache", "Kubernetes"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/AniSense" },
        ],
      },
      {
        name: "MoodMuse",
        tagline: "Emotion-aware journaling",
        img: "/photos/moodmuse.jpg",
        imgClass: "",
        desc: "Captures images and entries, performs on-device analysis, and shows music recommendations based on your mood",
        tech: ["Swift", "SwiftUI", "VisionKit", "Spotify Web API"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/MoodMuse" },
        ],
      },
      {
        name: "Aim Trainer / Sensitivity Finder",
        tagline: "FPS tasks with AI-driven sensitivity suggestions",
        img: "/photos/aimtrainer.jpg",
        imgClass: "",
        desc: "Procedural drills, crosshair UI, and analytics to estimate optimal FPS sensitivity",
        tech: ["C#", "Unity"],
        links: [
          {
            label: "Repo",
            href: "https://github.com/SilverXer0/FPS-Aim-Trainer/tree/master",
          },
        ],
      },
    ],
    [],
  );

  const aboutMediaItems = useMemo(
    () => [
      {
        kind: "video" as const,
        title: "Distance (Valorant Highlights)",
        caption: "My first (and best) Valorant Montage",
        src: "https://www.youtube.com/embed/39FokPrcl44?enablejsapi=1",
      },
      {
        kind: "video" as const,
        title: "whyy (Valorant Highlights)",
        caption: "My Second Montage",
        src: "https://www.youtube.com/embed/smKGpHc3RAs?enablejsapi=1",
      },
      {
        kind: "link" as const,
        title: "My YouTube Channel",
        caption: "My Youtube Channel, Check it out for more!",
        src: "/photos/gokublack.jpg",
        gifSrc: "/photos/gokublack.gif",
        href: "https://www.youtube.com/@mythra_aim",
      },
    ],
    [],
  );

  const awards = [
    {
      title: "Summa Cum Laude",
      org: "Cal Poly, SLO",
      year: "Dec 2025",
    },
    {
      title: "Dean's List",
      org: "Cal Poly, SLO",
      year: "All Terms Sept 2022 - Dec 2025",
    },
    {
      title: "Presidential Award",
      org: "Cal Poly, SLO",
      year: "All Years 2022 - 2025",
    },
    { title: "ACT", org: "36/36", year: "April 2021" },
  ];
  return (
    <>
      {!hasEntered && mounted && (
        <div
          className="fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center bg-black/90 text-white backdrop-blur-sm transition-opacity duration-500"
          onClick={() => {
            setHasEntered(true);
            hasEnteredRef.current = true;
            if (audioRef.current) {
              audioRef.current.volume = 0.1;
              audioRef.current.play().catch(() => { });
            }
            setTimeout(() => setShowMusicPopup(true), 500);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <h1 className="text-4xl font-semibold tracking-tight">
              Welcome
            </h1>
            <p className="text-lg font-medium tracking-wide text-neutral-300">
              Click anywhere to enter
            </p>
            <Music className="mt-1 h-8 w-8 animate-pulse text-neutral-400" />
          </motion.div>
        </div>
      )}

      <div
        className={mounted ? "dark" : "dark"}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 z-[-1]">
          <Aurora
            colorStops={["#06B6D4", "#B497CF", "#3B82F6"]}
            blend={0.5}
            amplitude={1.0}
            speed={1.0}
          />
        </div>
        <div className="fixed inset-0 z-[-1] bg-black/5 dark:bg-black/40" />
        <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
          <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-black/35">
            <div className="mx-auto max-w-[80rem] px-4 py-3 flex items-center justify-between">
              <a href="#" className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity">
                <img src="/photos/karina-logo.png" alt="Logo" className="h-6 w-6 rounded-full object-cover" />
                <span>Sharan Krishna</span>
              </a>

              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="#about" className="hover:opacity-80">
                  About
                </a>
                <a href="#experience" className="hover:opacity-80">
                  Experience
                </a>
                <a href="#projects" className="hover:opacity-80">
                  Projects
                </a>
                <a href="#papers" className="hover:opacity-80">
                  Papers
                </a>
                <a href="#hobbies" className="hover:opacity-80">
                  Hobbies
                </a>
                <a href="#awards" className="hover:opacity-80">
                  Awards
                </a>
                <a href="#contact" className="hover:opacity-80">
                  Contact
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="inline-flex items-center justify-center h-[34px] w-[34px] rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/20 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                  aria-label={isMuted ? "Unmute music" : "Mute music"}
                  title={isMuted ? "Unmute music" : "Mute music"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <a
                  href="/resume/Sharan_K_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/20 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                  title="Open resume (PDF)"
                >
                  <Download className="h-4 w-4" /> Résumé
                </a>
              </div>
            </div>
          </nav>

          <header className="mx-auto max-w-[80rem] px-4 pt-24 pb-28 min-h-[calc(100svh-50px)] flex flex-col justify-center">
            <motion.div
              variants={heroStagger}
              initial={reducedMotion ? false : "hidden"}
              animate={hasEntered ? (reducedMotion ? false : "show") : "hidden"}
              className="relative mx-auto -mt-12 sm:-mt-16 flex max-w-6xl flex-col items-center text-center"
            >
              {!reducedMotion ? <PixelRevealOverlay /> : null}
              <motion.h1
                variants={heroItem}
                className="mt-2 text-6xl sm:text-[7.5rem] font-bold tracking-tight font-sans whitespace-nowrap"
              >
                Hi, I'm Sharan.
              </motion.h1>
              <motion.div
                variants={heroItem}
                className="mt-10 flex flex-col items-center text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-neutral-800 dark:text-neutral-300 tracking-tight">
                  Software Engineer
                </div>
                <div className="mt-4 text-lg sm:text-xl font-medium text-neutral-600 dark:text-neutral-400">
                  Distributed Systems, Infrastructure, Machine Learning
                </div>
              </motion.div>
              <motion.div
                variants={heroItem}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <div className="flex gap-3">
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:ring-2 hover:ring-black/20 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:ring-white/30"
                  >
                    My Experience <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                  >
                    Get in touch <Mail className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </header>

          <Section
            id="about"
            titleIcon={<User className="h-5 w-5" />}
            title="About"
          >
            <div className="mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-2 h-full">
                  <BorderGlow className="h-full flex flex-col justify-center rounded-3xl border border-black/10 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.45)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 active:scale-[0.98] dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30">
                    <div className="h-full flex flex-col justify-center p-10 sm:p-14">
                      <div className="w-full text-left">
                      <p className="text-lg sm:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
                        I graduated with a B.S. in Computer Science from <strong>Cal Poly SLO</strong> and am currently {" "}
                        a software engineer at <strong>Plaid</strong>, working on infrastructure for the Developer Dashboard.
                      </p>
                      <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                        I work across multiple domains within technology, which currently covers Distributed Systems and {" "}
                        Infrastructure. This has taken me across different tech stacks, {" "}
                        from Python and Go to Swift and Typescript.
                      </p>
                      <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                        In my personal time, I love watching sports like Basketball and F1, and I enjoy playing competitive first-person shooters {" "}
                        like Valorant and Counter Strike 2. I&apos;ve created some youtube montages of my gameplay, check them out on the right!
                      </p>
                      </div>
                    </div>
                  </BorderGlow>
                </div>

                <div className="lg:col-span-1 h-full">
                  <BorderGlow className="h-full rounded-3xl border border-black/10 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.45)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 active:scale-[0.98] dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30">
                    <div className="h-full flex flex-col justify-center gap-4 p-6">
                      <div className="relative flex-1 overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-black min-h-[250px]" style={{ perspective: 1000 }}>
                        <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex items-center justify-between px-3">
                          <button
                            type="button"
                            aria-label="Previous media"
                            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/20 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                            onClick={() => {
                              setCarouselDirection(-1);
                              setAboutMediaIndex(
                                (i) =>
                                  (i - 1 + aboutMediaItems.length) %
                                  aboutMediaItems.length,
                              );
                              if (hasEnteredRef.current && !document.hidden && audioRef.current) {
                                audioRef.current.play().catch(() => { });
                              }
                            }}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            aria-label="Next media"
                            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:hover:bg-white/20 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                            onClick={() => {
                              setCarouselDirection(1);
                              setAboutMediaIndex(
                                (i) => (i + 1) % aboutMediaItems.length,
                              );
                              if (hasEnteredRef.current && !document.hidden && audioRef.current) {
                                audioRef.current.play().catch(() => { });
                              }
                            }}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>

                        <AnimatePresence initial={false} custom={carouselDirection}>
                          <motion.div
                            key={aboutMediaIndex}
                            custom={carouselDirection}
                            variants={mediaVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                          >
                            {aboutMediaItems[aboutMediaIndex].kind === "video" ? (
                              <iframe
                                id={`yt-player-${aboutMediaIndex}`}
                                className="w-full h-full absolute inset-0"
                                src={aboutMediaItems[aboutMediaIndex].src}
                                title={aboutMediaItems[aboutMediaIndex].title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : aboutMediaItems[aboutMediaIndex].kind === "link" ? (
                              <a
                                href={(aboutMediaItems[aboutMediaIndex] as any).href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-full absolute inset-0 block group"
                              >
                                <img
                                  src={(aboutMediaItems[aboutMediaIndex] as any).gifSrc || aboutMediaItems[aboutMediaIndex].src}
                                  alt={aboutMediaItems[aboutMediaIndex].title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <ExternalLink className="w-12 h-12 text-white" />
                                </div>
                              </a>
                            ) : (
                              <img
                                src={(aboutMediaItems[aboutMediaIndex] as any).src}
                                alt={(aboutMediaItems[aboutMediaIndex] as any).title}
                                className="w-full h-full absolute inset-0 object-cover"
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 text-center shrink-0">
                        {aboutMediaItems[aboutMediaIndex].caption}
                      </div>

                      <div className="-mt-1 flex items-center justify-center gap-2 shrink-0">
                        {aboutMediaItems.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Go to media ${i + 1}`}
                            onClick={() => {
                              setCarouselDirection(i > aboutMediaIndex ? 1 : -1);
                              setAboutMediaIndex(i);
                            }}
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
                  </BorderGlow>
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="experience"
            titleIcon={<Rocket className="h-5 w-5" />}
            title="Experience"
          >
            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                  My roles and professional experience, past and present.
                </p>
              </div>

              <TouchSectionProvider>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {experience.map((job) => (
                    <ExperienceCard key={job.title + job.org} job={job} />
                  ))}
                </div>
              </TouchSectionProvider>
            </div>
          </Section>

          <Section
            id="projects"
            titleIcon={<Code2 className="h-5 w-5" />}
            title="Projects"
          >
            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                  Selected projects and things I’ve built.
                </p>
              </div>

              <TouchSectionProvider>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((p) => (
                    <ProjectCard key={p.name} p={p} />
                  ))}
                </div>
              </TouchSectionProvider>
            </div>
          </Section>

          <Section id="papers" titleIcon={<PenIcon />} title="Papers">
            <div className="mt-8">
              {[
                {
                  title:
                    "Scalable Concurrency Paradigms: A Comparative Analysis of CSP in Go and the Actor Model in Modern C++",
                  desc: "Research on scalable concurrency models, comparing Communicating Sequential Processes (CSP) in Go and the C++ Actor Framework (CAF).",
                  href: "/papers/Scalable_Concurrency_Paradigms.pdf",
                },
                {
                  title:
                    "The Evolution of Algorithms and Techniques of Load Balancing in Distributed Systems",
                  desc: "Survey Paper on the history of load balancing in Distributed Systems",
                  href: "/papers/load-balancing.pdf",
                },
                {
                  title:
                    "Exploring the Role of Compiler Optimizations in Modern Systems",
                  desc: "Senior project paper published through Cal Poly Digital Commons",
                  href: "https://digitalcommons.calpoly.edu/cscsp/182/",
                },
              ].length ? (
                <>
                  <div className="flex items-end justify-between gap-4">
                    <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                      Writing and research papers.
                    </p>
                  </div>

                  <TouchSectionProvider>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title:
                            "Scalable Concurrency Paradigms: A Comparative Analysis of CSP in Go and the Actor Model in Modern C++",
                          desc: "Research on scalable concurrency models, comparing Communicating Sequential Processes (CSP) in Go and the C++ Actor Framework (CAF).",
                          href: "/papers/Scalable_Concurrency_Paradigms.pdf",
                        },
                        {
                          title:
                            "The Evolution of Algorithms and Techniques of Load Balancing in Distributed Systems",
                          desc: "Survey Paper on the history of load balancing in Distributed Systems.",
                          href: "/papers/load-balancing.pdf",
                        },
                        {
                          title:
                            "Integrating Machine Learning with an FPS Aim Trainer for Optimal Sensitivity Finding",
                          desc: "Senior project paper published through Cal Poly Digital Commons.",
                          href: "/papers/Senior Project Final Paper.pdf",
                          externalUrl: "https://digitalcommons.calpoly.edu/cscsp/182/",
                        },
                      ].map((w) => (
                        <PaperCard key={w.title} w={w} />
                      ))}
                    </div>
                  </TouchSectionProvider>
                </>
              ) : null}
            </div>
          </Section>

          <Section id="hobbies" titleIcon={<Globe className="h-5 w-5" />} title="Hobbies">
            <TouchSectionProvider>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {hobbies.map((h) => {
                  if ((h as any).hoverImg || (h as any).hoverVideo) {
                    return <HobbyCardWithGif key={h.name} h={h} />;
                  }
                  return <HobbyCard key={h.name} h={h} />;
                })}
              </div>
            </TouchSectionProvider>
          </Section>

          <Section
            id="awards"
            titleIcon={<Trophy className="h-5 w-5" />}
            title="Awards & Highlights"
          >
            <div className="mt-8">
              <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300 mb-6">
                Awards and academic highlights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {awards.map((a) => (
                  <div key={a.title} className="h-full">
                    <Card>
                      <div className="font-medium">{a.title}</div>
                      <div className="text-neutral-500">{a.org}</div>
                      <div className="text-neutral-500 text-xs">{a.year}</div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="contact"
            titleIcon={<Mail className="h-5 w-5" />}
            title="Get in touch"
          >
            <div className="mt-8">
              <Card>
                <p className="text-neutral-700 dark:text-neutral-300">
                  I’m always down to chat about job opportunites, research, or fun
                  side projects. Feel free to email me or connect with me on
                  LinkedIn!
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href="mailto:krishna.sharan@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:ring-2 hover:ring-black/20 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:ring-white/30"
                    >
                      <Mail className="h-4 w-4" /> Email Me
                    </a>

                    <a
                      href="https://www.linkedin.com/in/sharankrishna14/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>

                    <a
                      href="https://github.com/SilverXer0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-1 hover:bg-white/95 hover:ring-2 hover:ring-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/15 dark:hover:ring-white/30 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)]"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </div>
                </Card>
            </div>

            <footer className="py-10 text-center text-xs text-neutral-500">
              © {new Date().getFullYear()} Sharan Krishna
            </footer>
          </Section>
        </div>

        <audio
          ref={audioRef}
          src="/music/intentions-slow-reverb.mp3"
          loop
          muted={isMuted}
          className="hidden"
        />

        <div
          className={`fixed bottom-6 left-6 z-50 flex items-center gap-4 rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-transform duration-700 ease-in-out dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_70px_rgba(0,0,0,0.55)] ${showMusicPopup ? "translate-x-0" : "-translate-x-[150%]"
            }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
            <Music className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex flex-col pr-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Now Playing
            </span>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mt-0.5">
              Intentions (Slowed + Reverb)
            </span>
            <span className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              Starfall
            </span>
            <a
              href="https://www.youtube.com/watch?v=BmcFbSbcKms"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              Listen on YouTube <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </div>
          <button
            className="absolute right-3 top-3 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            onClick={() => setShowMusicPopup(false)}
            aria-label="Close track info"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
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
    <motion.section
      id={id}
      className="mx-auto max-w-[80rem] px-4 sm:px-6 py-40 scroll-mt-28 min-h-[80vh]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: APPLE_EASE,
            staggerChildren: 0.08,
          },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.65, ease: APPLE_EASE },
          },
        }}
        className="flex items-center gap-2"
      >
        <div className="rounded-2xl border border-black/10 dark:border-white/10 px-2.5 py-1 text-xs inline-flex items-center gap-1">
          {titleIcon}
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          <ShinyText text={title} disabled={false} speed={3} />
        </h2>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: APPLE_EASE },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
function PixelRevealOverlay() {
  const cells = useMemo(() => {
    const cols = 18;
    const rows = 10;
    const out: { key: string; delay: number }[] = [];
    for (let i = 0; i < cols * rows; i++) {
      out.push({ key: String(i), delay: Math.random() * 1.0 });
    }
    out.sort((a, b) => a.delay - b.delay);
    return { cols, rows, out };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cells.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${cells.rows}, minmax(0, 1fr))`,
          gap: "6px",
          padding: "8px",
        }}
        aria-hidden
      >
        {cells.out.map((c) => (
          <motion.span
            key={c.key}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.85, delay: c.delay, ease: APPLE_EASE }}
            className="rounded-md bg-white/65 dark:bg-black/55"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: APPLE_EASE }}
        className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent dark:from-black/40"
        aria-hidden
      />
    </div>
  );
}

function Card({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const className =
    "rounded-3xl border border-black/10 bg-white/70 backdrop-blur-2xl transition will-change-transform hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:bg-white/95 hover:ring-2 hover:ring-black/20 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_38px_rgba(0,0,0,0.55)] dark:hover:bg-white/10 dark:hover:shadow-[0_20px_70px_rgba(0,0,0,0.75)] dark:hover:ring-white/30 h-full w-full block";

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: APPLE_EASE }}
        className="h-full w-full"
      >
        <BorderGlow className={className + " cursor-pointer"}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full w-full block p-5"
          >
            {children}
          </a>
        </BorderGlow>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: APPLE_EASE }}
      className="h-full w-full"
    >
      <BorderGlow className={className}>
        <div className="h-full w-full block p-5">
          {children}
        </div>
      </BorderGlow>
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
  const halfRef = useRef(0);
  const demoTimersRef = useRef<number[]>([]);
  const hoverCooldownRef = useRef(0);
  const userInteractedRef = useRef(false);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    const children = el.children;
    if (!children.length) return;

    const cardWidth = (children[0] as HTMLElement).offsetWidth;
    const gap = 24;
    const delta = cardWidth + gap;

    el.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    });
  };

  const clearDemoTimers = () => {
    if (demoTimersRef.current.length) {
      demoTimersRef.current.forEach((t) => window.clearTimeout(t));
      demoTimersRef.current = [];
    }
  };

  const computeHalf = () => {
    const el = scrollerRef.current;
    if (!el) {
      halfRef.current = 0;
      return 0;
    }
    const total = el.scrollWidth;
    const half = Math.floor(total / 2);
    halfRef.current = half;
    return half;
  };

  const normalize = () => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const half = halfRef.current || computeHalf();
    if (half <= 0) {
      return;
    }
    if (el.scrollLeft >= half) {
      el.scrollLeft = el.scrollLeft - half;
    }
  };

  const safePrepForDirection = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const half = halfRef.current || computeHalf();
    if (half <= 0) {
      return;
    }
    const epsilon = 2;
    if (direction === "left" && el.scrollLeft <= epsilon) {
      el.scrollLeft = el.scrollLeft + half;
    }
    if (direction === "right" && el.scrollLeft >= half - epsilon) {
      el.scrollLeft = el.scrollLeft - half;
    }
  };

  const scrollStep = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    safePrepForDirection(direction);

    const rect = el.getBoundingClientRect();
    const delta = Math.max(260, Math.floor(rect.width * 0.62));
    el.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    });

    const t = window.setTimeout(() => {
      normalize();
    }, 450);
    demoTimersRef.current.push(t);
  };

  const animateTo = (targetLeft: number, durationMs: number) => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    const startLeft = el.scrollLeft;
    const delta = targetLeft - startLeft;
    if (Math.abs(delta) < 1) {
      return;
    }

    const start = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      if (userInteractedRef.current) {
        return;
      }

      const t = Math.min(1, (now - start) / durationMs);
      el.scrollLeft = startLeft + delta * easeOutCubic(t);

      if (t < 1) {
        window.requestAnimationFrame(step);
      } else {
        normalize();
      }
    };

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    computeHalf();

    const ro = new window.ResizeObserver(() => {
      computeHalf();
      normalize();
    });
    ro.observe(el);

    const onScroll = () => {
      normalize();
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    clearDemoTimers();
    userInteractedRef.current = false;

    const kickoff = window.setTimeout(() => {
      if (userInteractedRef.current) {
        return;
      }

      const half = halfRef.current || computeHalf();
      if (half <= 0) {
        return;
      }

      el.scrollLeft = 0;

      const target = Math.max(0, half - 2);
      const fast = 1200;
      animateTo(target, fast);

      const endTimer = window.setTimeout(() => {
        normalize();
      }, fast + 80);

      demoTimersRef.current.push(endTimer);
    }, 450);

    demoTimersRef.current.push(kickoff);

    return () => {
      clearDemoTimers();
    };
  }, [durationSec]);

  const markInteracted = () => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      clearDemoTimers();
    }
  };

  function onWheelHorizontal(e: React.WheelEvent<HTMLDivElement>) {
    markInteracted();
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta < 0) {
      safePrepForDirection("left");
    } else if (delta > 0) {
      safePrepForDirection("right");
    }
    el.scrollLeft += delta;
    normalize();
  }

  function onEdgeHoverMove(e: React.MouseEvent<HTMLDivElement>) {
    markInteracted();

    const el = scrollerRef.current;
    if (!el) {
      return;
    }

    const now = Date.now();
    if (now - hoverCooldownRef.current < 420) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edge = 96;

    if (x <= edge) {
      hoverCooldownRef.current = now;
      scrollStep("left");
      return;
    }

    if (x >= rect.width - edge) {
      hoverCooldownRef.current = now;
      scrollStep("right");
      return;
    }
  }

  function onPointerDown() {
    markInteracted();
  }

  function onTouchStart() {
    markInteracted();
  }

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
        className="no-scrollbar overflow-x-auto overflow-y-hidden touch-pan-x"
        onMouseMove={onEdgeHoverMove}
        onWheel={onWheelHorizontal}
        onPointerDown={onPointerDown}
        onTouchStart={onTouchStart}
        style={{
          overscrollBehaviorX: "contain",
          WebkitOverflowScrolling: "touch",
          willChange: "scroll-position",
        }}
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
