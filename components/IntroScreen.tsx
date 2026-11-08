"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { wedding } from "@/lib/wedding";

/* ─── SVG helpers ───────────────────────────────────────────── */
function FloralDivider() {
  return (
    <svg viewBox="0 0 200 16" className="i-floral" aria-hidden="true">
      <line x1="0" y1="8" x2="72" y2="8" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5" />
      <circle cx="80" cy="8" r="1.8" fill="currentColor" fillOpacity="0.5" />
      <path d="M94,8 Q97,4 100,8 Q103,12 106,8" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="100" cy="8" r="1.2" fill="currentColor" fillOpacity="0.9" />
      <circle cx="120" cy="8" r="1.8" fill="currentColor" fillOpacity="0.5" />
      <line x1="128" y1="8" x2="200" y2="8" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5" />
    </svg>
  );
}

export default function IntroScreen() {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const busy   = useRef(false);
  const timers = useRef<number[]>([]);
  const tlRef  = useRef<gsap.core.Timeline | null>(null);
  const handedOff = useRef(false);

  /* ── hero helpers (unchanged from original) ── */
  const startHeroIdleLoops = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo("#lantern-left",  { rotation: -2.5 }, { rotation:  2.5, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.fromTo("#lantern-right", { rotation:  2.2 }, { rotation: -2.2, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".lantern-flame,.lantern-halo", { opacity: () => gsap.utils.random(0.7, 1), duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  const finish = useCallback(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) intro.style.display = "none";
    gsap.set(["#arch-outer-stroke","#arch-inner-stroke",".hero-div-stroke"], { strokeDashoffset: 0 });
    gsap.set("#arch-fill-path",   { fillOpacity: 0.85 });
    gsap.set(["#arch-peak-ornament","#bismillah-box","#hero-cta-box"], { opacity: 1 });
    gsap.set(".invite-line",      { opacity: 1, y: 0 });
    gsap.set(["#bride-name-wipe","#groom-name-wipe"], { clipPath: "inset(0 0% 0 0)" });
    gsap.set("#hero-ampersand",   { opacity: 1, scale: 1 });
    gsap.set(["#lantern-left","#lantern-right"], { y: 0, opacity: 1 });
    document.body.classList.remove("locked");
    window.dispatchEvent(new Event("music:start"));
    window.dispatchEvent(new Event("intro:done"));
    startHeroIdleLoops();
    setPhase("done");
  }, [startHeroIdleLoops]);

  const handoff = useCallback(() => {
    if (handedOff.current) return;
    handedOff.current = true;
    window.dispatchEvent(new Event("petals:burst"));
    const intro = document.getElementById("intro-screen");
    if (intro) gsap.to(intro, { opacity: 0, duration: 0.8, ease: "power1.out", delay: 0.15 });
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(["#arch-outer-stroke","#arch-inner-stroke"], { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0);
    tl.to("#arch-fill-path",    { fillOpacity: 0.85, duration: 0.7, ease: "power1.out" }, 0.5);
    tl.to("#arch-peak-ornament",{ opacity: 1, duration: 0.5 }, 0.7);
    tl.to(["#lantern-left","#lantern-right"], { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "elastic.out(1,0.5)" }, 0.6);
    tl.to("#bismillah-box",     { opacity: 1, duration: 0.45, ease: "power2.out" }, 0.8);
    tl.to(".invite-line",       { opacity: 1, y: 0, duration: 0.42, stagger: 0.12, ease: "power2.out" }, 0.9);
    tl.to("#bride-name-wipe",   { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" }, 1.35);
    tl.to("#hero-ampersand",    { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)" }, 1.65);
    tl.to("#groom-name-wipe",   { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" }, 1.8);
    tl.to(".hero-div-stroke",   { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }, 2.0);
    tl.to("#hero-cta-box",      { opacity: 1, duration: 0.55, ease: "power2.out" }, 2.05);
  }, [finish]);

  const openInvitation = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    if (navigator.vibrate) navigator.vibrate(18);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }

    /* prepare hero SVG strokes before transition */
    const prep = (el: Element | null) => {
      if (!el || typeof (el as SVGPathElement).getTotalLength !== "function") return;
      const len = (el as SVGPathElement).getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    };
    prep(document.getElementById("arch-outer-stroke"));
    prep(document.getElementById("arch-inner-stroke"));
    document.querySelectorAll(".hero-div-stroke").forEach(prep);
    gsap.set(["#lantern-left","#lantern-right"], { y: -200, opacity: 0 });

    /* show skip after 1 s */
    const skipBtn = document.getElementById("skip-intro-btn");
    if (skipBtn) gsap.to(skipBtn, { opacity: 0.9, duration: 0.4, delay: 1.0, onStart: () => { skipBtn.style.pointerEvents = "auto"; } });

    /* kill idle animations */
    tlRef.current?.kill();
    gsap.killTweensOf(".i-shine, .i-bow");

    setPhase("opening");
    window.dispatchEvent(new Event("music:start"));
    timers.current.push(window.setTimeout(handoff, 1200));
  }, [finish, handoff]);

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.classList.add("locked");
    window.scrollTo(0, 0);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.classList.remove("locked");
    };
  }, []);

  /* ── Idle GSAP animations: floating card + shimmer ── */
  useEffect(() => {
    if (phase !== "idle") return;

    const card = document.getElementById("i-card");
    if (!card) return;

    /* gentle float */
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(card, { y: -10, rotation: 0.4, duration: 3.5, ease: "sine.inOut" });
    tlRef.current = tl;

    /* repeating shimmer sweep */
    const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
    shimmerTl.fromTo(".i-shine",
      { x: "-100%", opacity: 0 },
      { x: "180%",  opacity: 1, duration: 1.0, ease: "power2.inOut", delay: 1.5 }
    );

    /* bow pulse glow */
    gsap.to(".i-bow", {
      filter: "drop-shadow(0 0 8px rgba(243,229,171,0.9))",
      duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut"
    });

    return () => { tl.kill(); shimmerTl.kill(); gsap.killTweensOf(".i-bow"); };
  }, [phase]);

  if (phase === "done") return null;

  const isOpening = phase === "opening";

  return (
    <section
      id="intro-screen"
      className={`i-wrap ${phase}`}
      aria-label="Wedding invitation – tap to open"
    >
      {/* damask bg */}
      <div className="intro-damask" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />

      {/* ── top label ── */}
      <p className={`i-label ${isOpening ? "i-label--fade" : ""}`}>
        You are cordially invited
      </p>

      {/* ── Invitation card ── */}
      <div
        id="i-card"
        className={`i-card ${isOpening ? "i-card--open" : ""}`}
        onClick={openInvitation}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openInvitation(); }}
        aria-label="Open wedding invitation"
      >
        {/* shine sweep */}
        <div className="i-shine" aria-hidden="true" />

        {/* double-border frame */}
        <div className="i-frame" aria-hidden="true" />

        {/* corner ornaments */}
        <svg className="i-corner i-corner--tl" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M2,2 Q2,16 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M2,2 Q16,2 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <circle cx="2" cy="2" r="2" fill="currentColor" fillOpacity="0.8" />
        </svg>
        <svg className="i-corner i-corner--tr" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M30,2 Q30,16 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M30,2 Q16,2 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <circle cx="30" cy="2" r="2" fill="currentColor" fillOpacity="0.8" />
        </svg>
        <svg className="i-corner i-corner--bl" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M2,30 Q2,16 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M2,30 Q16,30 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <circle cx="2" cy="30" r="2" fill="currentColor" fillOpacity="0.8" />
        </svg>
        <svg className="i-corner i-corner--br" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M30,30 Q30,16 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <path d="M30,30 Q16,30 16,16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
          <circle cx="30" cy="30" r="2" fill="currentColor" fillOpacity="0.8" />
        </svg>

        {/* ── card body ── */}
        <div className="i-body">

          {/* bow / ribbon */}
          <div className={`i-bow-wrap ${isOpening ? "i-bow-wrap--gone" : ""}`} aria-hidden="true">
            <svg viewBox="0 0 70 32" className="i-bow">
              {/* left wing */}
              <path d="M33,16 C26,8 12,5 7,10 C2,15 9,22 18,19 C24,17 29,16 33,16Z"
                fill="rgba(201,161,91,0.18)" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              {/* right wing */}
              <path d="M37,16 C44,8 58,5 63,10 C68,15 61,22 52,19 C46,17 41,16 37,16Z"
                fill="rgba(201,161,91,0.18)" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              {/* tails */}
              <path d="M33,16 L23,25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              <path d="M37,16 L47,25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              {/* knot */}
              <ellipse cx="35" cy="16" rx="4" ry="3.2"
                fill="currentColor" fillOpacity="0.85"
                stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>

          {/* supertitle */}
          <p className="i-super">With the Grace of Allah</p>

          {/* bismillah */}
          <p className="i-bismillah" lang="ar">{wedding.bismillah}</p>

          {/* divider */}
          <div className="i-floral-wrap"><FloralDivider /></div>

          {/* monogram medallion */}
          <div className="i-medallion" aria-hidden="true">
            <span>{wedding.monogram}</span>
          </div>

          {/* divider */}
          <div className="i-floral-wrap"><FloralDivider /></div>

          {/* subtitle */}
          <p className="i-sub">Together with their families</p>

          {/* names */}
          <div className="i-names">
            <span className="i-name">{wedding.bride.fullName}</span>
            <span className="i-amp">&amp;</span>
            <span className="i-name">{wedding.groom.fullName}</span>
          </div>

          {/* tap CTA */}
          <div className={`i-cta ${isOpening ? "i-cta--gone" : ""}`}>
            <span className="i-cta-dot" />
            <span className="i-cta-text">Tap to Open</span>
          </div>
        </div>
      </div>

      {/* ── curtain panels (decorative framing, slide out on open) ── */}
      <div className={`i-curtain i-curtain--left  ${isOpening ? "i-curtain--open" : ""}`} aria-hidden="true">
        <div className="i-curt-fold" style={{ right: "0" }} />
        <div className="i-curt-fold" style={{ right: "30%", opacity: 0.3, width: "1px" }} />
        <div className="i-curt-tassel" />
      </div>
      <div className={`i-curtain i-curtain--right ${isOpening ? "i-curtain--open" : ""}`} aria-hidden="true">
        <div className="i-curt-fold" style={{ left: "0" }} />
        <div className="i-curt-fold" style={{ left: "30%", opacity: 0.3, width: "1px" }} />
        <div className="i-curt-tassel" />
      </div>

      {/* skip */}
      <button
        type="button"
        id="skip-intro-btn"
        aria-label="Skip intro"
        onClick={() => {
          timers.current.forEach(clearTimeout);
          busy.current = true;
          tlRef.current?.kill();
          handoff();
        }}
      >
        Skip &raquo;
      </button>
    </section>
  );
}
