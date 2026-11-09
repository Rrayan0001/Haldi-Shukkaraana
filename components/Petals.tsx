"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { wedding } from "@/lib/wedding";

type PetalKind = "marigold" | "mogra" | "dust";

function createFlowerElement(sizeClass: string, kind: PetalKind) {
  const div = document.createElement("div");
  div.className = `rose-petal-item ${sizeClass} petal-${kind}`;

  if (kind === "marigold") {
    // Rich ruffled marigold petal
    div.innerHTML = `
      <svg viewBox="0 0 26 32" width="100%" height="100%" aria-hidden="true">
        <path d="M13,1 C20,5 25,13 23,23 C21,29 16,31 13,30 C10,31 5,29 3,23 C1,13 6,5 13,1 Z" fill="url(#marigoldGrad)" />
        <path d="M13,4 C17,10 19,18 16,26" fill="none" stroke="#ffe082" stroke-width="0.8" stroke-opacity="0.6" />
        <path d="M13,4 C9,10 7,18 10,26" fill="none" stroke="#d84315" stroke-width="0.5" stroke-opacity="0.4" />
      </svg>
    `;
  } else if (kind === "mogra") {
    // Elegant fragrant white Jasmine / Mogra petal
    div.innerHTML = `
      <svg viewBox="0 0 20 28" width="100%" height="100%" aria-hidden="true">
        <path d="M10,1 C16,6 19,14 18,21 C17,26 13,27 10,27 C7,27 3,26 2,21 C1,14 4,6 10,1 Z" fill="url(#mograWhiteGrad)" />
        <path d="M10,3 Q11,14 10,24" fill="none" stroke="#c9a15b" stroke-width="0.6" stroke-opacity="0.45" />
      </svg>
    `;
  } else {
    // Floating golden turmeric pollen mote
    div.innerHTML = `
      <svg viewBox="0 0 16 16" width="100%" height="100%" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="#ffd54f" />
        <circle cx="8" cy="8" r="3.5" fill="#fff9c4" />
      </svg>
    `;
  }

  return div;
}

export default function Petals() {
  const tweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const startContinuousFall = (
      petal: HTMLElement,
      currentX: number,
      currentY: number,
      viewW: number,
      viewH: number,
      firstPass: boolean
    ) => {
      const startX = firstPass ? currentX : gsap.utils.random(10, viewW - 30);
      const startY = firstPass ? currentY : gsap.utils.random(-80, -20);
      const fallDuration = gsap.utils.random(7, 12);
      gsap.set(petal, { x: startX, y: startY });

      const fallTween = gsap.to(petal, {
        y: viewH + 50,
        duration: fallDuration,
        ease: "none",
        onComplete: () => startContinuousFall(petal, 0, 0, viewW, viewH, false),
      });

      const swayTween = gsap.to(petal, {
        x: startX + gsap.utils.random(-55, 55),
        rotationX: gsap.utils.random(120, 280),
        rotationY: gsap.utils.random(120, 280),
        rotationZ: "+=" + gsap.utils.random(60, 160),
        duration: gsap.utils.random(2.2, 3.8),
        repeat: Math.ceil(fallDuration / 2.5),
        yoyo: true,
        ease: "sine.inOut",
      });

      tweens.current.push(fallTween, swayTween);
    };

    const burst = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stage = document.getElementById("petal-stage");
      if (!stage) return;
      stage.innerHTML = "";
      const sizes = ["small", "medium", "large"];
      const kinds: PetalKind[] = ["marigold", "mogra", "marigold", "dust"];
      const viewW = Math.min(window.innerWidth, 480);
      const viewH = window.innerHeight;

      for (let i = 0; i < wedding.maxPetals; i++) {
        const sizeClass = sizes[i % sizes.length];
        const kind = kinds[i % kinds.length];
        const petal = createFlowerElement(sizeClass, kind);
        stage.appendChild(petal);
        const startX = viewW / 2;
        const startY = viewH / 2;
        const burstX = startX + gsap.utils.random(-viewW * 0.45, viewW * 0.45);
        const burstY = startY + gsap.utils.random(-viewH * 0.4, viewH * 0.15);

        gsap.set(petal, { x: startX, y: startY, scale: 0.2, opacity: 0 });
        gsap.to(petal, {
          x: burstX,
          y: burstY,
          scale: kind === "dust" ? gsap.utils.random(0.4, 0.8) : 1,
          opacity: sizeClass === "small" ? 0.6 : 0.95,
          rotationZ: gsap.utils.random(-140, 140),
          rotationX: gsap.utils.random(-70, 70),
          duration: gsap.utils.random(0.85, 1.3),
          ease: "power3.out",
          onComplete: () => startContinuousFall(petal, burstX, burstY, viewW, viewH, true),
        });
      }
    };

    // Special celebratory burst from the Haldi blessing button
    const handleBlessingBurst = (e: Event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stage = document.getElementById("petal-stage");
      if (!stage) return;

      const detail = (e as CustomEvent)?.detail;
      const viewW = Math.min(window.innerWidth, 480);
      const startX = detail?.x ? Math.max(20, Math.min(viewW - 20, detail.x)) : viewW / 2;
      const startY = detail?.y ? Math.max(50, detail.y) : window.innerHeight * 0.6;

      const count = 18;
      const kinds: PetalKind[] = ["marigold", "mogra", "dust"];
      const sizes = ["small", "medium", "large"];

      for (let i = 0; i < count; i++) {
        const petal = createFlowerElement(sizes[i % sizes.length], kinds[i % kinds.length]);
        stage.appendChild(petal);

        const angle = gsap.utils.random(0, Math.PI * 2);
        const distance = gsap.utils.random(60, 200);
        const targetX = startX + Math.cos(angle) * distance;
        const targetY = startY + Math.sin(angle) * distance - gsap.utils.random(30, 80);

        gsap.set(petal, { x: startX, y: startY, scale: 0.15, opacity: 1, zIndex: 60 });
        gsap.to(petal, {
          x: targetX,
          y: targetY,
          scale: gsap.utils.random(0.8, 1.2),
          rotationZ: gsap.utils.random(-180, 180),
          rotationX: gsap.utils.random(-120, 120),
          duration: gsap.utils.random(0.7, 1.1),
          ease: "power2.out",
          onComplete: () => {
            gsap.to(petal, {
              y: window.innerHeight + 40,
              opacity: 0,
              duration: gsap.utils.random(3.5, 5.5),
              ease: "power1.in",
              onComplete: () => petal.remove(),
            });
          },
        });
      }
    };

    const onVis = () => {
      if (document.hidden) tweens.current.forEach((t) => t.pause());
      else tweens.current.forEach((t) => t.resume());
    };

    window.addEventListener("petals:burst", burst);
    window.addEventListener("haldi:blessing-burst", handleBlessingBurst);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("petals:burst", burst);
      window.removeEventListener("haldi:blessing-burst", handleBlessingBurst);
      document.removeEventListener("visibilitychange", onVis);
      tweens.current.forEach((t) => t.kill());
    };
  }, []);

  return <div id="petal-stage" aria-hidden="true"></div>;
}
