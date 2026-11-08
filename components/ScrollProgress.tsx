"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to("#scroll-progress", {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: "#main-invitation", start: "top top", end: "bottom bottom", scrub: 0.2 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return <div className="scroll-progress-bar" id="scroll-progress" aria-hidden="true"></div>;
}
