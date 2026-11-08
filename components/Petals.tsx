"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { wedding } from "@/lib/wedding";

function createPetalElement(sizeClass: string) {
  const div = document.createElement("div");
  div.className = `rose-petal-item ${sizeClass}`;
  div.innerHTML = `<svg viewBox="0 0 24 30" width="100%" height="100%"><path d="M12,1 C19,7 23,15 21,23 C19,28 15,30 12,29 C9,30 5,28 3,23 C1,15 5,7 12,1 Z" fill="url(#petalRoseGrad)" /><path d="M12,4 Q14,15 11,26" fill="none" stroke="#ead8d0" stroke-width="0.7" stroke-opacity="0.45" /></svg>`;
  return div;
}

export default function Petals() {
  const tweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const startContinuousFall = (petal: HTMLElement, currentX: number, currentY: number, viewW: number, viewH: number, firstPass: boolean) => {
      const startX = firstPass ? currentX : gsap.utils.random(10, viewW - 30);
      const startY = firstPass ? currentY : gsap.utils.random(-80, -20);
      const fallDuration = gsap.utils.random(7, 12);
      gsap.set(petal, { x: startX, y: startY });
      const fallTween = gsap.to(petal, { y: viewH + 50, duration: fallDuration, ease: "none", onComplete: () => startContinuousFall(petal, 0, 0, viewW, viewH, false) });
      const swayTween = gsap.to(petal, { x: startX + gsap.utils.random(-50, 50), rotationX: gsap.utils.random(120, 260), rotationY: gsap.utils.random(120, 260), rotationZ: "+=" + gsap.utils.random(60, 140), duration: gsap.utils.random(2.2, 3.6), repeat: Math.ceil(fallDuration / 2.5), yoyo: true, ease: "sine.inOut" });
      tweens.current.push(fallTween, swayTween);
    };

    const burst = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stage = document.getElementById("petal-stage");
      if (!stage) return;
      stage.innerHTML = "";
      const sizes = ["small", "medium", "large"];
      const viewW = Math.min(window.innerWidth, 480);
      const viewH = window.innerHeight;
      for (let i = 0; i < wedding.maxPetals; i++) {
        const sizeClass = sizes[i % sizes.length];
        const petal = createPetalElement(sizeClass);
        stage.appendChild(petal);
        const startX = viewW / 2;
        const startY = viewH / 2;
        const burstX = startX + gsap.utils.random(-viewW * 0.45, viewW * 0.45);
        const burstY = startY + gsap.utils.random(-viewH * 0.4, viewH * 0.15);
        gsap.set(petal, { x: startX, y: startY, scale: 0.2, opacity: 0 });
        gsap.to(petal, { x: burstX, y: burstY, scale: 1, opacity: sizeClass === "small" ? 0.55 : 0.9, rotationZ: gsap.utils.random(-120, 120), rotationX: gsap.utils.random(-60, 60), duration: gsap.utils.random(0.85, 1.25), ease: "power3.out", onComplete: () => startContinuousFall(petal, burstX, burstY, viewW, viewH, true) });
      }
    };

    const onVis = () => {
      if (document.hidden) tweens.current.forEach((t) => t.pause());
      else tweens.current.forEach((t) => t.resume());
    };
    window.addEventListener("petals:burst", burst);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("petals:burst", burst);
      document.removeEventListener("visibilitychange", onVis);
      tweens.current.forEach((t) => t.kill());
    };
  }, []);

  return <div id="petal-stage" aria-hidden="true"></div>;
}
