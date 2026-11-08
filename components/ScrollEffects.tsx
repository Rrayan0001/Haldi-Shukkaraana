"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function prepareSvgStroke(element: Element | null) {
  if (!element || typeof (element as SVGPathElement).getTotalLength !== "function") return 0;
  const length = (element as SVGPathElement).getTotalLength();
  gsap.set(element, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

function splitTextIntoWords(element: HTMLElement | null) {
  if (!element) return [] as HTMLElement[];
  const words = element.textContent!.trim().split(/\s+/);
  element.innerHTML = "";
  const spans: HTMLElement[] = [];
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "closing-word";
    span.textContent = word;
    element.appendChild(span);
    spans.push(span);
    if (index < words.length - 1) element.appendChild(document.createTextNode(" "));
  });
  return spans;
}

export default function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const quoteWords = splitTextIntoWords(document.getElementById("closing-quote"));
      if (reduced) {
        gsap.set(".section-title-wipe", { clipPath: "inset(0 0% 0 0)" });
        gsap.set(quoteWords, { opacity: 1, y: 0 });
        gsap.set(".event-btn-wrap", { opacity: 1, y: 0 });
        gsap.set("#palace-fills", { opacity: 1 });
        return;
      }
      gsap.to(["#hero-floral-tl", "#hero-floral-br"], {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: "#hero-section", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("#hero-arch-wrapper", {
        y: 25, ease: "none",
        scrollTrigger: { trigger: "#hero-section", start: "top top", end: "bottom top", scrub: true },
      });
      document.querySelectorAll(".wedding-section").forEach((section) => {
        const titleWipe = section.querySelector(".section-title-wipe");
        const divLines = section.querySelectorAll(".sec-div-line");
        const centerSparkle = section.querySelector(".divider-center-sparkle");
        divLines.forEach((el) => prepareSvgStroke(el));
        const headerTl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 82%", once: true } });
        headerTl.to(titleWipe, { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power2.inOut" }, 0);
        headerTl.to(divLines, { strokeDashoffset: 0, duration: 0.65, ease: "power2.out" }, 0.25);
        headerTl.to(centerSparkle, { scale: 1, rotation: 90, duration: 0.45, ease: "back.out(2.4)" }, 0.45);
      });
      gsap.to("#timeline-line-progress", {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: "#timeline-container", start: "top 70%", end: "bottom 70%", scrub: true },
      });
      document.querySelectorAll(".itinerary-item").forEach((item) => {
        const side = item.getAttribute("data-side");
        const startX = side === "left" ? -36 : 36;
        const startRot = side === "left" ? -2 : 2;
        const card = item.querySelector(".event-card");
        const dot = item.querySelector(".timeline-dot");
        const accent = item.querySelector(".event-card-accent");
        const iconWrap = item.querySelector(".event-icon-wrap");
        const iconStrokes = item.querySelectorAll(".icon-stroke");
        const btnWrap = item.querySelector(".event-btn-wrap");
        iconStrokes.forEach((el) => prepareSvgStroke(el));
        const itemTl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 82%", once: true, onEnter: () => dot?.classList.add("active") },
        });
        itemTl.from(card, { x: startX, rotation: startRot, opacity: 0, duration: 0.85, ease: "power3.out" }, 0);
        itemTl.to(accent, { scaleX: 1, duration: 0.65, ease: "power2.inOut" }, 0.2);
        itemTl.to(iconStrokes, { strokeDashoffset: 0, duration: 0.75, ease: "power2.out" }, 0.3);
        itemTl.from(iconWrap, { scale: 0.75, duration: 0.5, ease: "back.out(2)" }, 0.3);
        itemTl.to(btnWrap, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.52);
      });
      const palaceStrokes = document.querySelectorAll("#palace-strokes path, #palace-strokes line, #palace-strokes rect, #palace-strokes circle");
      palaceStrokes.forEach((el) => prepareSvgStroke(el));
      const palaceTl = gsap.timeline({ scrollTrigger: { trigger: "#palace-stage", start: "top 80%", once: true } });
      palaceTl.to(palaceStrokes, { strokeDashoffset: 0, duration: 1.5, stagger: 0.02, ease: "power2.inOut" }, 0);
      palaceTl.to("#palace-fills", { opacity: 1, duration: 0.8, ease: "power1.out" }, 0.9);
      palaceTl.fromTo("#palace-birds-flock", { x: -60, y: 12, opacity: 0 }, { x: 260, y: -18, opacity: 0.85, duration: 4.5, ease: "power1.out" }, 0.2);
      gsap.to(quoteWords, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.045, ease: "power2.out",
        scrollTrigger: { trigger: "#closing-quote", start: "top 85%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
