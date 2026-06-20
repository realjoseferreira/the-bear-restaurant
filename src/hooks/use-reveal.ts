import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduce) {
      document.documentElement.classList.remove("reveal-ready");
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      document.documentElement.classList.remove("reveal-ready");
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 18% 0px" },
    );

    // Immediately reveal anything already inside the viewport on mount.
    const vh = window.innerHeight || 0;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);
}
