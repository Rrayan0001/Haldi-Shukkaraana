"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/lib/wedding";

function prepareSvgStroke(element: Element | null) {
  if (!element || typeof (element as SVGRectElement).getTotalLength !== "function") return 0;
  const length = (element as SVGRectElement).getTotalLength();
  gsap.set(element, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

function splitTextIntoChars(element: HTMLElement | null) {
  if (!element) return [] as HTMLElement[];
  const words = element.textContent!.trim().split(/\s+/);
  element.innerHTML = "";
  const chars: HTMLElement[] = [];
  words.forEach((word, wIdx) => {
    const wordWrap = document.createElement("span");
    wordWrap.style.display = "inline-block";
    wordWrap.style.whiteSpace = "nowrap";
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement("span");
      span.className = "date-char";
      span.textContent = word[i];
      wordWrap.appendChild(span);
      chars.push(span);
    }
    element.appendChild(wordWrap);
    if (wIdx < words.length - 1) element.appendChild(document.createTextNode(" "));
  });
  return chars;
}

function getRemainingTimeParts() {
  const target = new Date(wedding.dateISO).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    mins: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0"),
    secs: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
  };
}

export default function SaveTheDate() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let interval = 0;
    const ctx = gsap.context(() => {
      const saveDateRect = document.getElementById("save-date-rect-stroke");
      const dateChars = splitTextIntoChars(document.getElementById("stagger-date-text"));
      let countdownValues = getRemainingTimeParts();
      const setVals = (v: typeof countdownValues) => {
        const d = document.getElementById("cd-days"); if (d) d.textContent = v.days;
        const h = document.getElementById("cd-hours"); if (h) h.textContent = v.hours;
        const m = document.getElementById("cd-mins"); if (m) m.textContent = v.mins;
        const s = document.getElementById("cd-secs"); if (s) s.textContent = v.secs;
      };
      const rollDigit = (id: string, next: string) => {
        const el = document.getElementById(id);
        if (!el || el.textContent === next) return;
        if (reduced) { el.textContent = next; return; }
        gsap.to(el, { y: -20, opacity: 0, duration: 0.2, ease: "power2.in", onComplete: () => { el.textContent = next; gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: "back.out(1.6)" }); } });
      };
      const animateFirstView = () => {
        const real = getRemainingTimeParts();
        const proxy = { d: 0, h: 0, m: 0, s: 0 };
        gsap.to(proxy, { d: parseInt(real.days, 10), h: parseInt(real.hours, 10), m: parseInt(real.mins, 10), s: parseInt(real.secs, 10), duration: 1.2, ease: "power2.out", onUpdate: () => {
          const d = document.getElementById("cd-days"); if (d) d.textContent = String(Math.round(proxy.d)).padStart(2, "0");
          const h = document.getElementById("cd-hours"); if (h) h.textContent = String(Math.round(proxy.h)).padStart(2, "0");
          const m = document.getElementById("cd-mins"); if (m) m.textContent = String(Math.round(proxy.m)).padStart(2, "0");
          const s = document.getElementById("cd-secs"); if (s) s.textContent = String(Math.round(proxy.s)).padStart(2, "0");
        }, onComplete: () => { countdownValues = real; } });
      };
      setVals(countdownValues);
      interval = window.setInterval(() => {
        if (document.hidden) return;
        const next = getRemainingTimeParts();
        if (next.days !== countdownValues.days) rollDigit("cd-days", next.days);
        if (next.hours !== countdownValues.hours) rollDigit("cd-hours", next.hours);
        if (next.mins !== countdownValues.mins) rollDigit("cd-mins", next.mins);
        if (next.secs !== countdownValues.secs) {
          rollDigit("cd-secs", next.secs);
          if (!reduced) gsap.fromTo("#cd-secs-box", { boxShadow: "0 6px 18px rgba(74, 51, 0, 0.07), 0 0 14px rgba(201, 161, 91, 0.55)" }, { boxShadow: "0 6px 18px rgba(74, 51, 0, 0.07), 0 0 0px rgba(201, 161, 91, 0)", duration: 0.65 });
        }
        countdownValues = next;
      }, 1000);

      if (reduced) {
        gsap.set(dateChars, { opacity: 1, y: 0 });
        return;
      }
      prepareSvgStroke(saveDateRect);
      const saveDateTl = gsap.timeline({ scrollTrigger: { trigger: "#save-date-card", start: "top 84%", once: true } });
      saveDateTl.from("#save-date-card", { y: 28, opacity: 0, duration: 0.7, ease: "power2.out" }, 0);
      saveDateTl.to(saveDateRect, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.15);
      saveDateTl.to(dateChars, { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out" }, 0.35);
      ScrollTrigger.create({ trigger: "#countdown-grid", start: "top 86%", once: true, onEnter: () => animateFirstView() });
    });
    return () => {
      window.clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section className="wedding-section" id="save-the-date">
      <div className="section-header">
        <span className="section-subtitle">Mark Your Calendar</span>
        <div className="section-title-wipe">
          <h2 className="section-title gold-foil">Save The Date</h2>
        </div>
        <div className="section-divider-wrap">
          <svg viewBox="0 0 200 24" width="100%" height="100%" aria-hidden="true">
            <path className="sec-div-line" d="M100,12 L15,12" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path className="sec-div-line" d="M100,12 L185,12" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg className="divider-center-sparkle" viewBox="0 0 24 24" fill="#c9a15b" aria-hidden="true"><use href="#sparkle-star" /></svg>
        </div>
      </div>

      <div className="save-date-card" id="save-date-card">
        <svg className="save-date-border-svg" viewBox="0 0 370 180" preserveAspectRatio="none" aria-hidden="true">
          <rect id="save-date-rect-stroke" x="3" y="3" width="364" height="174" rx="12" ry="12" fill="none" stroke="url(#goldMetallicGrad)" strokeWidth="2.2" />
          <rect x="9" y="9" width="352" height="162" rx="8" ry="8" fill="none" stroke="#c9a15b" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>
        <p className="islamic-date-line">Haldi &amp; Shukrana &bull; Main Event</p>
        <div className="main-wedding-date" id="stagger-date-text" aria-label={wedding.mainDate}>{wedding.mainDate}</div>
        <p className="wedding-city-tag">{wedding.mainTimePlace}</p>
      </div>

      <div className="countdown-grid" id="countdown-grid" aria-label="Countdown to wedding">
        <div className="countdown-box"><div className="digit-roller-window"><span className="digit-value" id="cd-days">00</span></div><div className="countdown-label">Days</div></div>
        <div className="countdown-box"><div className="digit-roller-window"><span className="digit-value" id="cd-hours">00</span></div><div className="countdown-label">Hours</div></div>
        <div className="countdown-box"><div className="digit-roller-window"><span className="digit-value" id="cd-mins">00</span></div><div className="countdown-label">Minutes</div></div>
        <div className="countdown-box" id="cd-secs-box"><div className="digit-roller-window"><span className="digit-value" id="cd-secs">00</span></div><div className="countdown-label">Seconds</div></div>
      </div>
    </section>
  );
}
