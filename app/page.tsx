"use client";

import SpaceBackground from "./components/SpaceBackground";
import ActivityCard from "./components/ActivityCard";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
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
  ChevronRight,
  Trophy,
} from "lucide-react";


export default function Page() {

  const skills = useMemo(
    () => [
      {
        group: "Languages",
        items: [
          "TypeScript",
          "JavaScript",
          "Java",
          "Swift",
          "Python",
          "C",
          "C++",
          "C#",
          "Kotlin",
          "Racket",
        ],
      },
      {
        group: "Frameworks & Tools",
        items: [
          "React/Next.js",
          "Tailwind CSS",
          "Node.js",
          "Express",
          "Android Studio",
          "Xcode",
          "Unity",
          "Unreal",
          "Git/GitHub",
        ],
      },
      {
        group: "Data & Systems",
        items: ["PostgreSQL", "MySQL", "Redis", "Docker", "GCP", "AWS"],
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
          "Engineered a centralized state management architecture using SwiftUI’s Observable framework, synchronizing real-time property editing across 15+ component types and improving editor responsiveness by 40%",
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
          "Working with LCSLO Octogan Barn to track events and form uploads with S3 to reduce management time by 45%",
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
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/AniSense" },
        ],
      },
      {
        name: "Aurora",
        tagline: "High-throughput telemetry backend",
        desc: "C++ backend that ingests real-time telemetry via gRPC, stores data in a hot in-memory cache and RocksDB, and exposes low-latency aggregate queries with OpenTelemetry-style tracing.",
        tech: ["C++", "gRPC", "Protobuf", "RocksDB", "OpenTelemetry"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/Aurora" },
        ],
      },
      {
        name: "MoodMuse",
        tagline: "Emotion-aware journaling",
        desc: "Captures images and entries, performs on-device analysis, and surfaces trends privately.",
        tech: ["Swift", "SwiftUI", "VisionKit"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/MoodMuse" },
        ],
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
        tagline:
          "Win real tokens on the blockchain and save them to your crypto wallet",
        desc: "Blockchain token matching game",
        tech: ["Solidity", "Javascript", "Smart Contracts"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/MintMatch" },
        ],
      },
      {
        name: "Chatter",
        tagline: "Talk with simple AI and learn more about it",
        desc: "Self Learning Chatbot",
        tech: ["Python", "NLTK", "NLP"],
        links: [
          { label: "Repo", href: "https://github.com/SilverXer0/Chatbot" },
        ],
      },
    ],
    []
  );

  const awards = [
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
    <div className="dark">
      <SpaceBackground />
      <ActivityCard />
      <div className="min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30 bg-white/60 dark:bg-black/40 border-b border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <Cpu className="h-5 w-5" />
              <span>Sharan</span>
            </div>
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
              <a href="#skills" className="hover:opacity-80">
                Skills
              </a>
              <a href="#papers" className="hover:opacity-80">
                Papers
              </a>
              <a href="#contact" className="hover:opacity-80">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/resume/Sharan_K_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:shadow-sm"
                title="Open resume (PDF)"
              >
                <Download className="h-4 w-4" /> Résumé
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-6xl px-4 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] shadow-xl">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-950 text-white text-xl font-semibold">
                    SK
                  </div>
                </div>
                <div className="inline-flex flex-col text-xs text-neutral-300">
                  <span className="uppercase tracking-wide text-emerald-300/90">Sharan Krishna</span>
                  <span>CS @ Cal Poly · SWE · ML · Distributed Systems</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] mb-4 bg-black/40">
                <Globe className="h-3.5 w-3.5" /> Based in Bay Area, California · Open to full-time opportunites & collabs
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Hi, I'm Sharan.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl">
                I work across many different tech spaces, such as Distributed Systems, Full Stack Development, and Mobile App Development.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-neutral-100 text-neutral-900 dark:bg-white dark:text-neutral-900 px-4 py-2 font-medium shadow hover:shadow-md"
                >
                  See projects <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 font-medium hover:shadow-sm"
                >
                  Get in touch <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div className="text-sm text-neutral-200">
                    <div className="font-semibold">BS, Computer Science</div>
                    <div className="flex items-center gap-1 mt-1">
                      <GraduationCap className="h-4 w-4" /> Cal Poly, SLO
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" /> San Luis Obispo, CA
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs bg-black/40">
                    <Trophy className="h-3.5 w-3.5" /> GPA 3.95 / 4.0
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Expected grad", value: "Dec 2025" },
                    { label: "Focus", value: "SWE / Distributed Systems" },
                    { label: "Current", value: "Reading Papers" },
                    { label: "Side", value: "Sharpening AWS Skills" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-2xl border border-white/10 p-3"
                    >
                      <div className="text-neutral-400">{card.label}</div>
                      <div className="font-medium text-neutral-50">{card.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <Section
          id="about"
          titleIcon={<Code2 className="h-5 w-5" />}
          title="About"
        >
          <div className="mt-4 max-w-3xl">
            <p className="text-neutral-200 leading-relaxed">
              I am an engineer that focuses on building the best software possible regardless of the details, learning everything I can to do the greatest job possible. 
              I have had a focus on <strong> distributed systems </strong> with an emphasis on scalability and reliability. I have dug into
              <strong> load balancing and service design</strong>, including a survey paper on the evolution of load balancing algorithms 
              in distributed systems, and have recently worked at Apple where I dealth with <strong> concurrency in Swift </strong> and built a <strong> high 
              throughput telemetry backend </strong> (Aurora) that ingests real time data with gRPC and tiered storage on RocksDB.  
              I am also actively studying <strong> AWS </strong> to get multiple certifications and applying cloud design patterns like managed 
              databases and observability in my own projects.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5" /> Seeking: connections, collaborations, and impactful SWE roles.
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5" /> Interests: Software Development, Distributed Systems & Cloud, and Machine Learning.
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5" /> Currently: Reading Papers on Distributed Systems and Researching.
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5" /> Outside fun: Valorant, basketball, and tinkering with PC builds.
              </li>
            </ul>
          </div>

          {/* Media strip under About */}
          <div className="mt-8 relative">
            <div className="absolute -top-6 -left-4 h-24 w-24 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute -bottom-4 right-8 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-stretch md:justify-center gap-4">
              {[
                {
                  type: "video" as const,
                  label: "Valorant & aim training",
                  rotation: "-rotate-1",
                },
                {
                  type: "image" as const,
                  label: "Cal Poly · SLO",
                  rotation: "rotate-3",
                  src: "/photos/Cal-Poly-SLO.jpg",
                },
                {
                  type: "image" as const,
                  label: "Nightly coding sessions",
                  rotation: "-rotate-2",
                  src: "/photos/code.png",
                },
              ].map((p) => (
                <div
                  key={p.label}
                  className={`group flex-1 max-w-md rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm backdrop-blur-md ${p.rotation}`}
                >
                  {p.type === "video" ? (
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
                      <iframe
                        className="h-full w-full"
                        src="https://www.youtube.com/embed/j34JIwGZIKE"
                        title="Valorant Aim Training"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900">
                      <img
                        src={p.src}
                        alt={p.label}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="experience"
          titleIcon={<Rocket className="h-5 w-5" />}
          title="Experience"
        >
          <div className="mt-6 space-y-4">
            {experience.map((job) => (
              <Card key={job.title}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg leading-snug">
                      {job.org}
                    </h3>
                    <p className="text-neutral-300 text-sm mt-0.5">
                      {job.title}
                    </p>
                  </div>
                  <div className="text-xs text-neutral-400 text-left sm:text-right">
                    <div>{job.period}</div>
                    <div className="flex items-center gap-1 sm:justify-end mt-1">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          titleIcon={<Code2 className="h-5 w-5" />}
          title="Projects"
        >
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.name}
              href={p.links && p.links.length > 0 ? p.links[0].href : undefined}
              >
                <h3 className="font-semibold text-lg leading-snug">{p.name}</h3>
                <div className="text-neutral-500 text-sm mt-1">{p.tagline}</div>
                <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                  {p.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 dark:border-white/10 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 px-3 py-1 text-xs hover:shadow-sm"
                      >
                        {l.label} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400"></p>
        </Section>

        <Section
          id="skills"
          titleIcon={<Code2 className="h-5 w-5" />}
          title="Skills"
        >
          <div className="mt-6">
            <Card>
              <div className="grid md:grid-cols-3 gap-6">
                {skills.map((s) => (
                  <div key={s.group}>
                    <div className="font-semibold mb-2">{s.group}</div>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((i) => (
                        <span
                          key={i}
                          className="rounded-full border border-black/10 dark:border-white/10 px-2 py-1 text-sm"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        <Section id="papers" titleIcon={<PenIcon />} title="Papers">
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {
                title:
                  "The Evolution of Algorithms and Techniques of Load Balancing in Distributed Systems",
                desc: "Survey Paper on the history of load balancing in Distributed Systems.",
                href: "/papers/load-balancing.pdf",
              },
            ].map((w) => (
              <a
                key={w.title}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 shadow-sm transition-shadow hover:shadow-[0_0_25px_6px_rgba(80,140,255,0.6)]"
              >
                <div className="font-semibold">{w.title}</div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  {w.desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-200">
                  Read <ExternalLink className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="awards"
          titleIcon={<Trophy className="h-5 w-5" />}
          title="Awards & Highlights"
        >
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((a) => (
              <Card key={a.title}>
                <div className="font-medium">{a.title}</div>
                <div className="text-neutral-500">{a.org}</div>
                <div className="text-neutral-500 text-xs">{a.year}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          titleIcon={<Mail className="h-5 w-5" />}
          title="Get in touch"
        >
          <div className="mt-6">
            <Card>
              <p className="text-neutral-700 dark:text-neutral-300">
                I’m always down to chat about job opportunites, research, or fun
                side projects. Feel free to email me or ping me on LinkedIn!
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:krishna.sharan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 font-medium shadow hover:shadow-md"
                >
                  <Mail className="h-4 w-4" /> Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/sharankrishna14/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 px-4 py-2 font-medium hover:shadow-sm"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href="https://github.com/SilverXer0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 px-4 py-2 font-medium hover:shadow-sm"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400"></p>
            </Card>
          </div>
          <footer className="py-8 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Sharan Krishna - built with Next.js &
            Tailwind.
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
    <section id={id} className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center gap-2">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 px-2.5 py-1 text-xs inline-flex items-center gap-1">
          {titleIcon}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
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
    "rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 shadow-sm transition-shadow hover:shadow-[0_0_25px_6px_rgba(80,140,255,0.6)]";

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
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
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
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
