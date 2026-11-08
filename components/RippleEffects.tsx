"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function RippleEffects() {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>(".btn-gold, .btn-directions");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "touch-ripple";
      ripple.style.left = event.clientX - rect.left + "px";
      ripple.style.top = event.clientY - rect.top + "px";
      btn.appendChild(ripple);
      gsap.to(ripple, { scale: 2.6, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
