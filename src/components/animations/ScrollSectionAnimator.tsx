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

      // Small delay to ensure all DOM nodes for the route are fully mounted
      const timer = setTimeout(() => {
        ctx = gsap.context(() => {
          // 1. Editorial Section Headers
          const sectionHeaders = document.querySelectorAll(".gsap-reveal-header");
          sectionHeaders.forEach((header) => {
            gsap.fromTo(
              header,
              { opacity: 0, y: 32 },
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

          // 2. Staggered Grid & List Items (Capabilities, Metrics, SOPs, FAQs)
          const staggerContainers = document.querySelectorAll(".gsap-stagger-container");
          staggerContainers.forEach((container) => {
            const items = container.querySelectorAll(".gsap-stagger-item");
            if (items.length > 0) {
              gsap.fromTo(
                items,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.75,
                  stagger: 0.09,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          });

          // 3. Progressive Architectural Path Lines & Hairline Dividers
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

          // 4. Large Exhibition, Comparison, and Documentation Cards
          const cards = document.querySelectorAll(".gsap-reveal-card, .gsap-doc-reveal");
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 36 },
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

          // 5. Image & Media Clip Expansion
          const imageCards = document.querySelectorAll(".gsap-image-reveal");
          imageCards.forEach((img) => {
            gsap.fromTo(
              img,
              { opacity: 0, scale: 0.97 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: img,
                  start: "top 86%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          // 6. Large Footer Background Wordmark Reveal
          const footerWordmark = document.querySelector(".gsap-footer-wordmark");
          if (footerWordmark) {
            gsap.fromTo(
              footerWordmark,
              { opacity: 0, y: 24 },
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
      }, 80);

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
