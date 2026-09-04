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

      // Small delay to ensure all DOM nodes for the route are fully mounted
      const timer = setTimeout(() => {
        ctx = gsap.context(() => {
          // =========================================================================
          // 1. UNIFIED SCROLL-LINKED SECTION DEPTH TRANSITIONS (Non-Hero Only)
          // =========================================================================
          const spatialSections = document.querySelectorAll(".spatial-section");

          spatialSections.forEach((section) => {
            const el = section as HTMLElement;
            const vh = window.innerHeight || 800;
            const h = el.offsetHeight || 600;
            const totalDistance = h + vh;

            // Dynamic progress ratios based on section height:
            // Entrance completes as section top settles into upper viewport (~20% from top)
            // Exit begins as section bottom approaches upper viewport (~20% from top)
            const enterRatio = Math.max(0.12, Math.min(0.35, (vh * 0.75) / totalDistance));
            const exitRatio = Math.max(0.12, Math.min(0.35, (vh * 0.75) / totalDistance));
            const plateauRatio = Math.max(0.01, 1 - enterRatio - exitRatio);

            // Single unified timeline per section (avoids property overwrite conflicts)
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            });

            // Stage 1: Entrance — Section gracefully emerges and rises into position
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

            // Stage 2: Active Focus Plateau — Full scale, full opacity, rock solid in view
            tl.to(el, {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: "none",
              duration: plateauRatio,
            });

            // Stage 3: Exit — Section gently recedes, scaling down and moving slightly up
            tl.to(el, {
              scale: exitScale,
              opacity: exitOpacity,
              y: exitY,
              ease: "power1.in",
              duration: exitRatio,
            });
          });

          // =========================================================================
          // 2. EDITORIAL HEADERS REVEAL
          // =========================================================================
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

          // =========================================================================
          // 3. STAGGERED GRID & LIST ITEMS (Guarantees, SOPs, FAQs, Testimonials)
          // =========================================================================
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

          // =========================================================================
          // 4. PROGRESSIVE ARCHITECTURAL PATH LINES
          // =========================================================================
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

          // =========================================================================
          // 5. LARGE EXHIBITION, COMPARISON, & DOCUMENTATION CARDS
          // =========================================================================
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

          // =========================================================================
          // 6. FOOTER GROUNDED REVEAL
          // =========================================================================
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

          // Refresh ScrollTrigger to ensure accurate trigger coordinates
          ScrollTrigger.refresh();
        });
      }, 100);

      return () => clearTimeout(timer);
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
