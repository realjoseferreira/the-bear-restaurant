import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface DocsModalProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  title?: string;
}

export function DocsModal({
  open,
  onClose,
  returnFocusRef,
  title = "Design & Development Case Study",
}: DocsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const returnFocusEl = returnFocusRef?.current;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    setTimeout(() => closeBtnRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = Array.from(focusable());
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusEl?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-title"
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close documentation"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-card border border-border sm:rounded-sm shadow-[var(--shadow-editorial)] animate-scale-in"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 sm:px-10 py-5 bg-card/95 backdrop-blur border-b border-border">
          <div className="min-w-0">
            <p className="eyebrow">José Ferreira/Sick Code</p>
            <h2
              id="docs-title"
              className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-bone"
            >
              {title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 grid place-items-center h-11 w-11 rounded-sm border border-border text-bone/80 hover:text-bone hover:border-brass transition-colors"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="px-6 sm:px-10 py-8 space-y-10 text-pretty">
          <p className="text-bone/85 leading-relaxed text-[1.02rem]">
            A fan-made restaurant concept shaped as a cinematic editorial experience. This case
            study outlines the visual system, interaction design, and frontend decisions behind the
            project, developed by José Ferreira/Sick Code as a portfolio demonstration.
          </p>

          <section>
            <p className="eyebrow mb-3">01 - Concept</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Project Concept</h3>
            <p className="text-bone/80 leading-relaxed">
              A conceptual restaurant brand built around pressure, discipline, and the precise
              choreography of service. The landing page presents the room as a focused single-page
              experience where timing and hospitality carry the story.
            </p>
          </section>

          <section>
            <p className="eyebrow mb-3">02 - Visual Direction</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Visual Direction</h3>
            <p className="text-bone/80 leading-relaxed">
              Dark editorial palette built on blackened navy, bone, steel, and controlled blue
              highlights. Display typography delivers the pressure; body type stays quiet. The
              layout uses negative space, hairline rules, asymmetric grids, and restrained motion.
            </p>
          </section>

          <section>
            <p className="eyebrow mb-3">03 - Technology</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Technology Stack</h3>
            <ul className="space-y-2.5 text-bone/80">
              {[
                ["React + TypeScript", "component-based, type-safe UI"],
                ["TanStack Start & Router", "file-based routing and SSR framework"],
                ["Tailwind CSS", "design tokens, responsive layout, utility styling"],
                ["Vite", "fast development and optimized production builds"],
                ["Lucide Icons", "lightweight interface icons"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-3 border-b border-border/60 pb-2.5">
                  <span className="font-medium text-bone w-44 shrink-0">{k}</span>
                  <span className="text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="eyebrow mb-3">04 - Responsive Development</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Responsive Experience</h3>
            <p className="text-bone/80 leading-relaxed">
              The interface adapts across desktop, tablet, and mobile. Typography, spacing,
              navigation, imagery, and content grids reorganize naturally according to the available
              screen size, preserving the editorial rhythm at every breakpoint.
            </p>
          </section>

          <section>
            <p className="eyebrow mb-3">05 - Motion & Interaction</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Motion Design</h3>
            <p className="text-bone/80 leading-relaxed">
              Scroll-triggered reveals, image entrances, and restrained hover states add cinematic
              rhythm without hiding content from users. Motion is progressive-enhancement only and
              respects the user&rsquo;s reduced-motion preference.
            </p>
          </section>

          <section>
            <p className="eyebrow mb-3">06 - Media & Performance</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">
              Image & Video Optimization
            </h3>
            <p className="text-bone/80 leading-relaxed">
              Photography is organized as local media and lazy-loaded below the first viewport. The
              hero video uses muted, looped, inline playback with a local poster image and
              metadata-only preload for a smoother first load.
            </p>
          </section>

          <section>
            <p className="eyebrow mb-3">07 - Accessibility</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Accessibility</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-bone/80 list-disc pl-5">
              <li>Semantic HTML structure</li>
              <li>Descriptive image alternative text</li>
              <li>Keyboard-accessible modal with focus trap</li>
              <li>Visible focus states</li>
              <li>Reduced-motion support</li>
              <li>Sufficient text contrast</li>
            </ul>
          </section>

          <section>
            <p className="eyebrow mb-3">08 - Purpose</p>
            <h3 className="font-display text-xl uppercase text-bone mb-4">Project Purpose</h3>
            <p className="text-bone/80 leading-relaxed">
              Created by José Ferreira/Sick Code as a portfolio demonstration of a cinematic
              restaurant landing page. The structure can be adapted to other editorial, hospitality,
              or entertainment concepts without depending on external media hosts.
            </p>
          </section>
        </div>

        <footer className="px-6 sm:px-10 py-5 border-t border-border text-xs uppercase tracking-[0.24em] text-muted-foreground">
          José Ferreira/Sick Code - Portfolio Concept
        </footer>
      </div>
    </div>
  );
}
