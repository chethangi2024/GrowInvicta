"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollSectionAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    let ctx: any = null;

    Promise.all([
      import("gsap"),
      import("gsap/dist/ScrollTrigger")
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      // Respect prefers-reduced-motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const isMobile = window.innerWidth < 768;

      // Subtle, cinematic depth values adhering to interaction guidelines
      const enterScale = isMobile ? 0.995 : 0.985;
      const enterOpacity = isMobile ? 0.92 : 0.85;
      const enterY = isMobile ? 8 : 20;

      const exitScale = isMobile ? 0.99 : 0.96;
      const exitOpacity = isMobile ? 0.92 : 0.85;
      const exitY = isMobile ? -8 : -20;

      // Defer initialization to idle time or first user scroll to prevent blocking the initial paint & hydration
      const initAnimator = () => {
        if (ctx) return;
        ctx = gsap.context(() => {
          // =========================================================================
          // 1. UNIFIED SCROLL-LINKED SECTION DEPTH TRANSITIONS (Non-Hero Only)
          // =========================================================================
          const spatialSections = Array.from(document.querySelectorAll(".spatial-section")) as HTMLElement[];
          const vh = window.innerHeight || 800;

          // Batch read DOM measurements first to eliminate layout thrashing
          const sectionHeights = spatialSections.map((el) => el.offsetHeight || 600);

          // Chunk 1: Spatial Section Depth Transitions
          const initSections = () => {
            spatialSections.forEach((el, index) => {
              const h = sectionHeights[index];
              const totalDistance = h + vh;

              const enterRatio = Math.max(0.12, Math.min(0.35, (vh * 0.75) / totalDistance));
              const exitRatio = Math.max(0.12, Math.min(0.35, (vh * 0.75) / totalDistance));
              const plateauRatio = Math.max(0.01, 1 - enterRatio - exitRatio);

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              });

              tl.fromTo(
                el,
                {
                  scale: enterScale,
                  opacity: enterOpacity,
                  y: enterY,
                  transformOrigin: "50% 25%",
                },
                {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  ease: "power1.out",
                  duration: enterRatio,
                }
              );

              tl.to(el, {
                scale: 1,
                opacity: 1,
                y: 0,
                ease: "none",
                duration: plateauRatio,
              });

              tl.to(el, {
                scale: exitScale,
                opacity: exitOpacity,
                y: exitY,
                ease: "power1.in",
                duration: exitRatio,
              });
            });

            // Schedule Chunk 2 in next animation frame
            requestAnimationFrame(initHeadersAndPaths);
          };

          // Chunk 2: Editorial Headers & Architectural Path Lines
          const initHeadersAndPaths = () => {
            const sectionHeaders = document.querySelectorAll(".gsap-reveal-header");
            sectionHeaders.forEach((header) => {
              gsap.fromTo(
                header,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: header,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            });

            const pathLines = document.querySelectorAll(".gsap-path-line, .gsap-line-draw");
            pathLines.forEach((line) => {
              gsap.fromTo(
                line,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 1.1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: line,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            });

            // Schedule Chunk 3 in next animation frame
            requestAnimationFrame(initCardsAndStaggers);
          };

          // Chunk 3: Staggers, Cards, and Footer Wordmark
          const initCardsAndStaggers = () => {
            const staggerContainers = document.querySelectorAll(".gsap-stagger-container");
            staggerContainers.forEach((container) => {
              const items = container.querySelectorAll(".gsap-stagger-item");
              if (items.length > 0) {
                gsap.fromTo(
                  items,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: container,
                      start: "top 86%",
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }
            });

            const cards = document.querySelectorAll(".gsap-reveal-card, .gsap-doc-reveal");
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 28 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            });

            const footerWordmark = document.querySelector(".gsap-footer-wordmark");
            if (footerWordmark) {
              gsap.fromTo(
                footerWordmark,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: footerWordmark,
                    start: "top 95%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          };

          initSections();

        });
      };

      let idleId: any = null;
      let timerId: any = null;

      const triggerEarlyOnScroll = () => {
        if (!ctx) {
          if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
            (window as any).cancelIdleCallback(idleId);
          }
          if (timerId) clearTimeout(timerId);
          initAnimator();
        }
        window.removeEventListener("scroll", triggerEarlyOnScroll);
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        idleId = (window as any).requestIdleCallback(initAnimator, { timeout: 2000 });
        window.addEventListener("scroll", triggerEarlyOnScroll, { passive: true, once: true });
      } else {
        timerId = setTimeout(initAnimator, 1200);
      }

      return () => {
        if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
          (window as any).cancelIdleCallback(idleId);
        }
        if (timerId) clearTimeout(timerId);
        window.removeEventListener("scroll", triggerEarlyOnScroll);
      };
    }).catch((err) => {
      console.warn("GSAP ScrollSectionAnimator initialization fallback:", err);
    });

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [pathname]);

  return null;
}
