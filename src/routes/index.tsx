import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { useReveal } from "@/hooks/use-reveal";
import { DocsModal } from "@/components/docs-modal";

const ASSET_PATH = "/assets/";

const logo = `${ASSET_PATH}thebearlogo.png`;
const bearVideo = `${ASSET_PATH}thebear.mp4`;
const carmen = `${ASSET_PATH}carmen.jpg`;
const sydney = `${ASSET_PATH}sydney.jpg`;
const richie = `${ASSET_PATH}richie.jpg`;
const marcus = `${ASSET_PATH}marcus.jpg`;
const bettina = `${ASSET_PATH}bettina.jpg`;
const natalie = `${ASSET_PATH}natalie.jpg`;

const dish = `${ASSET_PATH}dish.jpg`;
const dish2 = `${ASSET_PATH}dish2.jpg`;
const dish23 = `${ASSET_PATH}dish23.jpg`;
const dishs = `${ASSET_PATH}dishs.jpg`;
const dishhs = `${ASSET_PATH}dishhs.jpeg`;
const carmyBanner = `${ASSET_PATH}carmybanner.jpg`;
const everySecond = `${ASSET_PATH}everysecondcounts.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Bear - Fan Concept Landing Page" },
      {
        name: "description",
        content:
          "A cinematic fan-made restaurant landing page concept developed by José Ferreira/Sick Code.",
      },
      { property: "og:title", content: "The Bear - Fan Concept Landing Page" },
      {
        property: "og:description",
        content:
          "A cinematic fan-made restaurant landing page concept developed by José Ferreira/Sick Code.",
      },
    ],
    links: [
      { rel: "preload", href: logo, as: "image" },
      { rel: "preload", href: carmyBanner, as: "image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Concept", href: "#concept" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Every Second Counts", href: "#every-second" },
  { label: "Team", href: "#team" },
  { label: "At the Pass", href: "#gallery" },
];

const TEAM = [
  {
    name: "Carmen \u201cCarmy\u201d Berzatto",
    role: "Executive Chef & Owner",
    img: carmen,
    bio: "A chef defined by restraint, urgency, and exacting standards. Carmy anchors the kitchen around discipline: the quiet work of making every plate more deliberate than the last.",
  },
  {
    name: "Sydney Adamu",
    role: "Sous Chef",
    img: sydney,
    bio: "A sharp, deeply focused chef who brings order to pressure. Sydney gives the room its forward motion: precise systems, clear language, and a menu built to keep improving.",
  },
  {
    name: "Richard \u201cRichie\u201d Jerimovich",
    role: "Front-of-House Lead",
    img: richie,
    bio: "Richie carries the dining room with a sharper sense of timing, attention, and care. His work turns service into something personal without losing control of the floor.",
  },
  {
    name: "Marcus Brooks",
    role: "Pastry Chef",
    img: marcus,
    bio: "A patient technician with a precise eye for texture, temperature, and finish. Marcus gives the final course its calm after the intensity of the line.",
  },
  {
    name: "Bettina \u201cTina\u201d Marrero",
    role: "Senior Line Cook",
    img: bettina,
    bio: "A steady presence on the line, shaped by repetition and trust. Tina brings the kind of discipline that holds a kitchen together when the room gets loud.",
  },
  {
    name: "Natalie \u201cSugar\u201d Berzatto",
    role: "Co-Owner & Operations Manager",
    img: natalie,
    bio: "The operational center of the restaurant. Natalie keeps the moving parts aligned so the kitchen, the room, and the business can survive the pressure of service.",
  },
];

const STANDARDS = [
  {
    n: "01",
    t: "Precision in Execution",
    d: "Every plate is measured, checked, and sent with purpose. Nothing leaves the pass because it is close enough.",
  },
  {
    n: "02",
    t: "Constant Evolution",
    d: "The menu is treated as a working document: studied, revised, and tightened in service of the guest.",
  },
  {
    n: "03",
    t: "Thoughtful Hospitality",
    d: "Hospitality is calibrated in seconds: a glance, a reset, a course arriving at the exact right moment.",
  },
  {
    n: "04",
    t: "Creativity Under Pressure",
    d: "Pressure is not treated as noise. It is the condition that reveals whether the system is ready.",
  },
  {
    n: "05",
    t: "Teamwork as Discipline",
    d: "The brigade runs on shared language, clean timing, and respect for the person standing beside you.",
  },
  {
    n: "06",
    t: "Chicago, Always",
    d: "Chicago is not decoration here. It is the pressure, weather, memory, and appetite behind the work.",
  },
];

const PROFILE: Array<[string, string]> = [
  ["1", "Shared Standard"],
  ["6", "Core Commitments"],
  ["Every Service", "A New Beginning"],
  ["Chicago", "Illinois"],
];

function Index() {
  useReveal();
  const [navOpen, setNavOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerOffset, setBannerOffset] = useState(0);
  const docsBtnRef = useRef<HTMLButtonElement>(null);
  const footerDocsBtnRef = useRef<HTMLButtonElement>(null);
  const caseStudyBtnRef = useRef<HTMLButtonElement>(null);
  const [docsReturnRef, setDocsReturnRef] =
    useState<React.RefObject<HTMLElement | null>>(docsBtnRef);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll when mobile nav open
  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  // Parallax on Carmy banner (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const onScroll = () => {
      const el = bannerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      setBannerOffset(Math.max(-60, Math.min(60, -progress * 80)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDocs = (ref: React.RefObject<HTMLElement | null>) => {
    setDocsReturnRef(ref);
    setDocsOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 border-b ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-border/60"
            : "bg-transparent border-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="flex min-w-0 shrink-0 items-center gap-3"
            aria-label="The Bear - Home"
          >
            <img
              src={logo}
              alt="The Bear"
              width={198}
              height={162}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-7 w-auto opacity-95 sm:h-8"
            />
          </a>

          <ul className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 text-[0.72rem] xl:text-[0.78rem] uppercase tracking-[0.22em] text-bone/75">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="relative py-1 transition-colors hover:text-bone focus-visible:text-bone after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-brass after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-500"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openDocs(docsBtnRef)}
              ref={docsBtnRef}
              className="hidden md:inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.24em] text-bone border border-bone/30 px-4 py-2.5 hover:bg-bone hover:text-charcoal transition-colors duration-300"
            >
              Documentation
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center text-bone lg:hidden"
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        <div
          className={`lg:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur transition-[max-height,opacity] duration-500 ${
            navOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="px-6 py-6 space-y-4 text-bone/85">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  onClick={() => setNavOpen(false)}
                  className="block py-2 uppercase tracking-[0.24em] text-sm border-b border-border/60"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setNavOpen(false);
                  openDocs(docsBtnRef);
                }}
                className="inline-flex items-center gap-2 mt-2 text-sm uppercase tracking-[0.24em] text-brass"
              >
                Documentation <ArrowUpRight className="h-4 w-4" />
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-charcoal">
        <video
          src={bearVideo}
          poster={carmyBanner}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12 pb-16 sm:pb-24 lg:pb-32 pt-32">
          <div className="grid lg:grid-cols-[1fr_auto] items-end gap-10 lg:gap-16">
            <div className="max-w-3xl">
              <p className="eyebrow reveal">Chicago - Fan-Made Concept</p>
              <h1 className="reveal font-display uppercase text-bone mt-5 text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.86] tracking-tight text-balance">
                The Bear
              </h1>
              <p
                className="reveal font-serif-it text-bone/85 mt-6 text-xl sm:text-2xl lg:text-3xl max-w-2xl leading-snug"
                style={{ ["--reveal-delay" as never]: "120ms" }}
              >
                A dining room shaped by pressure, timing, and restraint.
              </p>
              <p
                className="reveal text-bone/70 mt-6 max-w-xl text-base sm:text-[1.02rem] leading-relaxed text-pretty"
                style={{ ["--reveal-delay" as never]: "220ms" }}
              >
                This fan concept imagines The Bear as an editorial restaurant experience: tense,
                intimate, and built around the discipline required to make service feel effortless.
              </p>

              <div
                className="reveal mt-10 flex flex-wrap gap-3 sm:gap-4"
                style={{ ["--reveal-delay" as never]: "320ms" }}
              >
                <a
                  href="#team"
                  className="group inline-flex items-center gap-3 bg-bone text-charcoal px-6 sm:px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.24em] font-medium hover:bg-brass transition-colors duration-300"
                >
                  View the Team
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#gallery"
                  className="group inline-flex items-center gap-3 border border-bone/40 text-bone px-6 sm:px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.24em] hover:border-bone hover:bg-bone/5 transition-all duration-300"
                >
                  At the Pass
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-3 text-right">
              <p className="eyebrow text-bone/60">EST. Concept</p>
              <p className="font-display text-5xl text-bone">No. 01</p>
              <div className="w-24 h-px bg-brass/60" />
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-bone/55 max-w-[14rem]">
                Chicago, Illinois
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPT */}
      <section id="concept" className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-4 reveal">
              <p className="eyebrow">01 - Concept</p>
              <div className="hairline-brass mt-6 w-24" />
            </div>
            <div className="lg:col-span-8">
              <h2 className="reveal font-display uppercase text-bone text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.92] tracking-tight text-balance">
                A Room Built on Timing
              </h2>
              <div className="mt-10 grid md:grid-cols-2 gap-8 lg:gap-12 text-bone/80 leading-relaxed text-[1.02rem] text-pretty">
                <p className="reveal" style={{ ["--reveal-delay" as never]: "80ms" }}>
                  The Bear is imagined as a Chicago room where rigor is felt before it is announced.
                  The experience is quiet on the surface, but every gesture is timed, rehearsed, and
                  held to a standard the guest can sense.
                </p>
                <p className="reveal" style={{ ["--reveal-delay" as never]: "160ms" }}>
                  The kitchen carries the city with it: cold mornings, short tempers, honest work,
                  and the need to keep moving. That pressure becomes a sharper kind of hospitality,
                  one plate and one second at a time.
                </p>
              </div>

              <div
                className="reveal mt-14 border-t border-border pt-10"
                style={{ ["--reveal-delay" as never]: "260ms" }}
              >
                <p className="eyebrow mb-8">Conceptual Restaurant Profile</p>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
                  {PROFILE.map(([n, l]) => (
                    <div key={l}>
                      <dt className="font-display text-3xl sm:text-4xl text-bone leading-none">
                        {n}
                      </dt>
                      <dd className="mt-2 text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {l}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="relative py-28 sm:py-36 bg-card border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
            <div className="reveal">
              <p className="eyebrow">02 - Philosophy</p>
              <h2 className="font-display uppercase text-bone mt-5 text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.92] tracking-tight">
                The Standard
              </h2>
            </div>
            <p
              className="reveal max-w-md text-bone/70 text-pretty leading-relaxed"
              style={{ ["--reveal-delay" as never]: "120ms" }}
            >
              Six working principles for a room where timing, care, and restraint have to survive
              the pressure of service.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {STANDARDS.map((s, i) => (
              <li
                key={s.n}
                className="reveal bg-card p-8 sm:p-10 group hover:bg-background transition-colors duration-500"
                style={{ ["--reveal-delay" as never]: `${i * 70}ms` }}
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-display text-2xl text-brass">{s.n}</span>
                  <span className="w-10 h-px bg-border group-hover:bg-brass transition-colors duration-500" />
                </div>
                <h3 className="font-display uppercase text-bone text-2xl leading-tight mb-3">
                  {s.t}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{s.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EVERY SECOND COUNTS */}
      <section id="every-second" className="relative py-28 sm:py-40 overflow-hidden bg-background">
        <div
          aria-hidden
          className="reveal pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <p className="font-display uppercase text-bone/[0.035] whitespace-nowrap leading-none tracking-tighter text-[22vw] sm:text-[18vw] lg:text-[15vw]">
            EVERY SECOND COUNTS
          </p>
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Plaque image - smaller, tighter crop, cinematic vignette */}
            <div className="lg:col-span-5 lg:col-start-1 order-1 reveal">
              <figure className="relative mx-auto w-full max-w-[420px] bg-secondary border border-border/70 shadow-[var(--shadow-editorial)] p-4 sm:p-6">
                <div className="img-reveal relative w-full">
                  <img
                    src={everySecond}
                    alt="A small plaque reading Every Second Counts"
                    loading="eager"
                    decoding="async"
                    className="block w-full h-auto object-contain"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between text-bone/70">
                  <span className="text-[0.6rem] uppercase tracking-[0.32em]">No. 02</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.32em]">The Pass</span>
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7 order-2 lg:-ml-12 relative z-10">
              <p className="eyebrow reveal">03 - The Phrase</p>
              <h2
                className="reveal font-display uppercase text-bone mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] tracking-tight text-balance"
                style={{ ["--reveal-delay" as never]: "80ms" }}
              >
                Every Second <span style={{ color: "#67A9D8" }}>Counts</span>
              </h2>
              <div
                className="hairline-brass mt-8 w-24 reveal"
                style={{ ["--reveal-delay" as never]: "140ms" }}
              />

              <div className="mt-8 space-y-5 text-bone/80 leading-relaxed text-[1.02rem] text-pretty">
                <p className="reveal" style={{ ["--reveal-delay" as never]: "200ms" }}>
                  <span className="font-serif-it text-bone">&ldquo;Every Second Counts&rdquo;</span>{" "}
                  is not about rushing. It is about attention. Every second can protect a sauce,
                  save a temperature, reset a table, or change the way a guest remembers the room.
                </p>
                <p className="reveal" style={{ ["--reveal-delay" as never]: "280ms" }}>
                  In the kitchen, time decides texture and consistency. In the dining room, it
                  decides whether hospitality feels mechanical or deeply considered.
                </p>
                <p className="reveal" style={{ ["--reveal-delay" as never]: "360ms" }}>
                  The phrase becomes a shared standard: stay present, move with intention, and treat
                  every small detail as part of the service.
                </p>
              </div>

              <blockquote
                className="reveal mt-10 border-l-2 border-oxblood pl-6 py-2 font-serif-it text-bone text-xl sm:text-2xl leading-snug"
                style={{ ["--reveal-delay" as never]: "440ms" }}
              >
                Time is not counted. It is spent with purpose.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CARMY BANNER */}
      <section
        ref={bannerRef}
        aria-label="The pursuit of better"
        className="relative w-full overflow-hidden bg-charcoal"
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[24/9] overflow-hidden">
          <img
            src={carmyBanner}
            alt="A chef writing on a cardboard sheet in the kitchen of The Bear"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-[115%] w-full object-cover object-center will-change-transform"
            style={{ transform: `translate3d(0, ${bannerOffset}px, 0)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
              <div className="max-w-xl">
                <p className="eyebrow reveal">A Quiet Manifesto</p>
                <h2
                  className="reveal font-display uppercase text-bone mt-4 text-[clamp(2rem,5.5vw,4.75rem)] leading-[0.92] tracking-tight text-balance"
                  style={{ ["--reveal-delay" as never]: "80ms" }}
                >
                  The Pursuit of Better
                </h2>
                <p
                  className="reveal mt-5 text-bone/85 text-[0.95rem] sm:text-base lg:text-lg leading-relaxed text-pretty max-w-md"
                  style={{ ["--reveal-delay" as never]: "180ms" }}
                >
                  Better is not a slogan. It is the next correction, the next cleaner movement, the
                  next plate that leaves the pass with more intent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-24">
            <div className="lg:col-span-4 reveal">
              <p className="eyebrow">04 - The Brigade</p>
              <div className="hairline-brass mt-6 w-24" />
            </div>
            <div className="lg:col-span-8">
              <h2 className="reveal font-display uppercase text-bone text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.92] tracking-tight text-balance">
                The People Behind the Pass
              </h2>
              <p
                className="reveal mt-6 max-w-2xl text-bone/70 leading-relaxed text-pretty"
                style={{ ["--reveal-delay" as never]: "120ms" }}
              >
                A small brigade, each role carrying pressure differently. The room only works when
                every station understands the rhythm of the next one.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-10 lg:gap-y-16">
            {TEAM.map((p, i) => (
              <article
                key={p.name}
                className="reveal group"
                style={{ ["--reveal-delay" as never]: `${(i % 3) * 100}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <div
                    className="img-reveal absolute inset-0"
                    style={{ ["--reveal-delay" as never]: `${(i % 3) * 100 + 100}ms` }}
                  >
                    <img
                      src={p.img}
                      alt={`Portrait of ${p.name}`}
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={i < 3 ? "low" : "auto"}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between">
                    <span className="font-display text-brass text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/70">
                      Chicago
                    </span>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brass mb-2">
                    {p.role}
                  </p>
                  <h3 className="font-display uppercase text-bone text-2xl leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-pretty text-[0.95rem]">
                    {p.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AT THE PASS - dish-only editorial gallery */}
      <section id="gallery" className="relative py-28 sm:py-36 bg-card border-y border-border">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
            <div className="reveal">
              <p className="eyebrow">05 - At the Pass</p>
              <h2 className="font-display uppercase text-bone mt-5 text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.92] tracking-tight">
                At the Pass
              </h2>
            </div>
            <p
              className="reveal max-w-md text-bone/70 leading-relaxed text-pretty"
              style={{ ["--reveal-delay" as never]: "120ms" }}
            >
              Where pressure becomes presentation. Every plate carries the evidence of timing,
              repetition, and the choice to hold back until the detail is right.
            </p>
          </div>

          {/* Row 1: Featured + two stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <FoodFigure
              src={dishs}
              alt="A chef finishes a plated dish with a dark glaze spooned from a copper pan"
              caption="Precision at the Pass"
              className="lg:col-span-8 aspect-[4/3] lg:aspect-[16/10]"
              priority
            />
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              <FoodFigure
                src={dish2}
                alt="Soft cheese topped with caviar served in a floral porcelain bowl"
                caption="Details Matter"
                className="aspect-[4/3] lg:aspect-[5/4]"
                delay={120}
              />
              <FoodFigure
                src={dish23}
                alt="A minimalist plated composition with citrus, herb purees, and quenelle"
                caption="Controlled Creativity"
                className="aspect-[4/3] lg:aspect-[5/4]"
                delay={200}
              />
            </div>
          </div>

          {/* Row 2: portrait + landscape */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <FoodFigure
              src={dishhs}
              alt="A rustic bowl of spaghetti with meatballs, basil, and grated parmesan"
              caption="Built Through Repetition"
              className="lg:col-span-5 aspect-[3/4]"
              delay={80}
            />
            <FoodFigure
              src={dish}
              alt="Small tomato-glazed bread rounds dressed with basil oil on a white plate"
              caption="Ready for Service"
              className="lg:col-span-7 aspect-[4/3] lg:aspect-[16/10]"
              delay={180}
              zoom={1.18}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-28 sm:py-40 bg-background">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px]"
            style={{ background: "var(--oxblood)" }}
          />
        </div>
        <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 text-center">
          <p className="eyebrow reveal">06 - Enter</p>
          <h2
            className="reveal font-display uppercase text-bone mt-6 text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-balance"
            style={{ ["--reveal-delay" as never]: "80ms" }}
          >
            Enter the Pressure of Service
          </h2>
          <p
            className="reveal mt-8 text-bone/75 max-w-xl mx-auto leading-relaxed text-pretty"
            style={{ ["--reveal-delay" as never]: "180ms" }}
          >
            A cinematic fan-made restaurant concept about discipline, hospitality, and the precision
            required to make a hard room feel composed.
          </p>

          <div
            className="reveal mt-12 flex flex-wrap gap-4 justify-center"
            style={{ ["--reveal-delay" as never]: "260ms" }}
          >
            <button
              type="button"
              ref={caseStudyBtnRef}
              onClick={() => openDocs(caseStudyBtnRef)}
              className="group inline-flex items-center gap-3 bg-bone text-charcoal px-7 py-4 text-[0.78rem] uppercase tracking-[0.24em] font-medium hover:bg-brass transition-colors"
            >
              View Case Study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="https://www.sickcode.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start a project with Sick Code (opens in a new tab)"
              className="group inline-flex items-center gap-3 border border-bone/40 text-bone px-7 py-4 text-[0.78rem] uppercase tracking-[0.24em] hover:border-bone hover:bg-bone/5 transition-all"
            >
              Start a Project with Sick Code
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER - minimal */}
      <footer className="relative bg-card py-14 border-t border-border">
        <div className="mx-auto max-w-[900px] px-5 text-center sm:px-8">
          <div className="flex flex-col items-center justify-center gap-7">
            <a href="#top" aria-label="The Bear - back to top" className="shrink-0">
              <img
                src={logo}
                alt="The Bear"
                width={198}
                height={162}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto opacity-95"
              />
            </a>

            <button
              type="button"
              ref={footerDocsBtnRef}
              onClick={() => openDocs(footerDocsBtnRef)}
              className="text-[0.72rem] uppercase tracking-[0.28em] text-bone/85 hover:text-brass focus-visible:text-brass transition-colors"
            >
              Documentation
            </button>

            <p className="text-[0.72rem] uppercase tracking-[0.28em] text-bone/75">
              Developed by{" "}
              <a
                href="https://www.sickcode.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block text-bone font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-brass after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100 after:origin-left after:transition-transform after:duration-500 hover:text-brass transition-colors"
              >
                José Ferreira/Sick Code
              </a>
            </p>
          </div>
        </div>
      </footer>

      <DocsModal
        open={docsOpen}
        onClose={() => setDocsOpen(false)}
        returnFocusRef={docsReturnRef}
      />
    </div>
  );
}

function FoodFigure({
  src,
  alt,
  caption,
  className = "",
  delay = 0,
  priority = false,
  zoom = 1,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  delay?: number;
  priority?: boolean;
  zoom?: number;
}) {
  return (
    <figure
      className={`group relative overflow-hidden bg-secondary img-reveal ${className}`}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.035] group-hover:brightness-110 group-hover:contrast-105"
        style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 pointer-events-none" />
      <figcaption className="absolute left-5 right-5 bottom-4 flex items-center justify-between gap-4 text-bone translate-y-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <span className="text-[0.62rem] uppercase tracking-[0.32em] text-brass">The Pass</span>
        <span className="font-display uppercase text-base sm:text-lg tracking-wide text-right">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
