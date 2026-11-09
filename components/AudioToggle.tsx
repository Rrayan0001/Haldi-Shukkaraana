"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { wedding } from "@/lib/wedding";

export default function AudioToggle() {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = new Audio(wedding.musicPath);
    el.preload = "auto";
    el.loop = true;
    el.volume = 0;
    el.load();
    audio.current = el;
    const start = () => {
      if (!audio.current) return;
      if (!audio.current.paused) {
        setVisible(true);
        return;
      }
      audio.current.play().then(() => {
        setVisible(true);
        gsap.fromTo(el, { volume: 0.15 }, { volume: 0.4, duration: 1.0, ease: "power1.out" });
      }).catch(() => {
        setVisible(true);
        gsap.to(el, { volume: 0.4, duration: 1.0, ease: "power1.out" });
      });
    };
    window.addEventListener("music:start", start);
    return () => {
      window.removeEventListener("music:start", start);
      gsap.killTweensOf(el);
      el.pause();
      el.src = "";
      audio.current = null;
    };
  }, []);

  return (
    <button type="button" id="audio-toggle-btn" className={visible ? "visible" : ""} aria-label="Toggle background music" onClick={() => {
      if (!audio.current) return;
      if (audio.current.paused) {
        audio.current.muted = false;
        setMuted(false);
        audio.current.play().catch(() => {});
        return;
      }
      const next = !muted;
      audio.current.muted = next;
      setMuted(next);
    }}>
      <svg id="audio-icon-on" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: muted ? "none" : "block" }}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
      <svg id="audio-icon-off" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: muted ? "block" : "none" }}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    </button>
  );
}
