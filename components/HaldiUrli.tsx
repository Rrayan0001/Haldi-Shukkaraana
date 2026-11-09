"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { StarSparkle } from "@/components/Ornaments";

export default function HaldiUrli() {
  const [blessingCount, setBlessingCount] = useState<number>(0);
  const [showDuaCard, setShowDuaCard] = useState<boolean>(false);
  const urliRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load existing count from localStorage if available
    try {
      const stored = localStorage.getItem("haldi_dua_count");
      if (stored) setBlessingCount(parseInt(stored, 10));
    } catch {
      // ignore
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Bobbing animation for floating flowers inside Urli
    const ctx = gsap.context(() => {
      gsap.to(".urli-flower-1", {
        y: -3,
        x: 1.5,
        rotation: 4,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".urli-flower-2", {
        y: 2.5,
        x: -2,
        rotation: -5,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });
      gsap.to(".urli-flower-3", {
        y: -2,
        rotation: 3,
        duration: 1.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      // Shimmering paste glow
      gsap.to(".urli-paste-glow", {
        opacity: 0.85,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, urliRef);

    return () => ctx.revert();
  }, []);

  const handleApplyHaldi = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCount = blessingCount + 1;
    setBlessingCount(newCount);
    setShowDuaCard(true);

    try {
      localStorage.setItem("haldi_dua_count", String(newCount));
    } catch {
      // ignore
    }

    if (navigator.vibrate) {
      navigator.vibrate([25, 40, 25]);
    }

    // Trigger golden petal & turmeric dust burst from button coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;

    window.dispatchEvent(
      new CustomEvent("haldi:blessing-burst", {
        detail: { x: burstX, y: burstY },
      })
    );

    // Golden pulse on the Urli bowl
    gsap.fromTo(
      ".urli-svg-container",
      { scale: 0.96 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" }
    );
    gsap.fromTo(
      ".urli-ripple-ring",
      { r: 12, opacity: 0.9, strokeWidth: 2 },
      { r: 42, opacity: 0, strokeWidth: 0.5, duration: 1.0, ease: "power1.out" }
    );
  };

  return (
    <div ref={urliRef} className="haldi-urli-section">
      {/* Decorative Traditional Brass Urli Vessel */}
      <div className="urli-svg-container">
        <svg
          viewBox="0 0 160 100"
          className="urli-svg"
          aria-label="Traditional Brass Haldi Bowl"
        >
          {/* Subtle glow underneath */}
          <ellipse
            cx="80"
            cy="75"
            rx="56"
            ry="10"
            fill="rgba(198, 81, 2, 0.25)"
            filter="blur(5px)"
          />

          {/* Brass Handles */}
          <path
            d="M 22,48 C 10,48 8,36 18,34 C 22,34 24,38 26,42"
            fill="none"
            stroke="url(#brassUrliGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 138,48 C 150,48 152,36 142,34 C 138,34 136,38 134,42"
            fill="none"
            stroke="url(#brassUrliGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Urli Brass Body Base */}
          <ellipse cx="80" cy="72" rx="42" ry="7" fill="#5c4318" />

          {/* Urli Brass Outer Bowl */}
          <path
            d="M 22,44 C 22,76 46,82 80,82 C 114,82 138,76 138,44 C 138,38 114,34 80,34 C 46,34 22,38 22,44 Z"
            fill="url(#brassUrliGrad)"
            stroke="#8c6d33"
            strokeWidth="1.2"
          />

          {/* Golden Turmeric Paste / Water Pool */}
          <ellipse
            cx="80"
            cy="44"
            rx="52"
            ry="12"
            fill="url(#haldiPasteGrad)"
          />

          {/* Shimmer / Glow highlight */}
          <ellipse
            className="urli-paste-glow"
            cx="76"
            cy="42"
            rx="38"
            ry="8"
            fill="#fff9c4"
            opacity="0.45"
          />

          {/* Expanding Ripple Ring (animates on click) */}
          <circle
            className="urli-ripple-ring"
            cx="80"
            cy="44"
            r="12"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            opacity="0"
          />

          {/* Floating Flowers in the Turmeric Water */}
          {/* 1. Center Marigold */}
          <g className="urli-flower-1" transform="translate(80, 44)">
            <circle cx="0" cy="0" r="8" fill="url(#marigoldGrad)" />
            <circle cx="0" cy="0" r="4.5" fill="url(#marigoldCenterGrad)" />
            <circle cx="0" cy="0" r="1.8" fill="#ffe082" />
          </g>

          {/* 2. Left Mogra (Jasmine) */}
          <g className="urli-flower-2" transform="translate(54, 42)">
            <ellipse cx="0" cy="0" rx="5" ry="3.5" fill="url(#mograWhiteGrad)" />
            <circle cx="0" cy="0" r="1.4" fill="#ffd54f" />
          </g>

          {/* 3. Right Marigold mini */}
          <g className="urli-flower-3" transform="translate(104, 43)">
            <circle cx="0" cy="0" r="6" fill="url(#marigoldGrad)" />
            <circle cx="0" cy="0" r="2.8" fill="url(#marigoldCenterGrad)" />
          </g>

          {/* Urli Front Rim Accent */}
          <path
            d="M 22,44 C 36,54 124,54 138,44"
            fill="none"
            stroke="url(#goldMetallicGrad)"
            strokeWidth="1.8"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Interactive Ceremony Blessing Action */}
      <div className="urli-action-wrap">
        <button
          type="button"
          onClick={handleApplyHaldi}
          className="btn-haldi-bless"
          aria-label="Send Haldi & Dua Blessings"
        >
          <span className="btn-haldi-shimmer" aria-hidden="true" />
          <StarSparkle />
          <span>Apply Haldi &amp; Duas 💛</span>
          <StarSparkle delay />
        </button>

        {blessingCount > 0 && (
          <p className="blessing-count-tag">
            ✨ {blessingCount} {blessingCount === 1 ? "blessing" : "blessings"} showered by family &amp; friends
          </p>
        )}
      </div>

      {/* Heartfelt Islamic Dua Card displayed upon blessing */}
      {showDuaCard && (
        <div className="haldi-dua-card animate-fade-in">
          <p className="dua-arabic" lang="ar">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="dua-meaning">
            &ldquo;May Allah bless you both, shower His blessings upon you, and unite you in goodness.&rdquo;
          </p>
          <div className="dua-badge">
            <span>Dua &amp; Barakah Offered for Rabiya &amp; Suhail آمين</span>
          </div>
        </div>
      )}
    </div>
  );
}

