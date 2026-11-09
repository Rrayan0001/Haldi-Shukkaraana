"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HaldiGarland() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Gentle pendulum sway for each hanging flower strand
      const strands = [
        "#garland-strand-1",
        "#garland-strand-2",
        "#garland-strand-3",
        "#garland-strand-4",
        "#garland-strand-5",
      ];

      strands.forEach((id, index) => {
        const strand = document.querySelector(id);
        if (!strand) return;

        const maxAngle = 2.2 + (index % 2) * 0.8;
        const duration = 2.8 + index * 0.35;
        const delay = index * 0.22;

        gsap.fromTo(
          strand,
          { rotation: -maxAngle },
          {
            rotation: maxAngle,
            duration,
            delay,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "top center",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive flutter when tapped or hovered
  const flutter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const strands = containerRef.current?.querySelectorAll(".garland-strand");
    if (!strands) return;
    strands.forEach((strand, i) => {
      gsap.to(strand, {
        rotation: (i % 2 === 0 ? 1 : -1) * (5 + Math.random() * 3),
        duration: 0.35,
        ease: "power2.out",
        yoyo: true,
        repeat: 3,
        transformOrigin: "top center",
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="haldi-garland-wrap"
      aria-hidden="true"
      onMouseEnter={flutter}
      onTouchStart={flutter}
    >
      <svg
        viewBox="0 0 380 90"
        className="haldi-garland-svg"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          {/* Marigold Flower Symbol */}
          <g id="flower-marigold">
            <circle cx="0" cy="0" r="8" fill="url(#marigoldGrad)" />
            {/* Ruffled petals */}
            <path
              d="M-7,-4 Q0,-10 7,-4 Q10,0 7,4 Q0,10 -7,4 Q-10,0 -7,-4 Z"
              fill="#ffa000"
              opacity="0.85"
            />
            <circle cx="0" cy="0" r="4.5" fill="url(#marigoldCenterGrad)" />
            <circle cx="0" cy="0" r="2" fill="#ffd54f" />
          </g>

          {/* White Mogra (Jasmine) Symbol */}
          <g id="flower-mogra">
            <path
              d="M0,7 C-4,4 -5,0 -3,-5 C-1,-7 1,-7 3,-5 C5,0 4,4 0,7 Z"
              fill="url(#mograWhiteGrad)"
              stroke="#e8d9b8"
              strokeWidth="0.5"
            />
            <path
              d="M-3,3 Q0,-4 3,3"
              fill="none"
              stroke="#f3e5ab"
              strokeWidth="0.6"
            />
            <circle cx="0" cy="7" r="1.5" fill="#7cb342" />
          </g>

          {/* Golden Bell / Ghungroo Drop */}
          <g id="flower-bell">
            <line x1="0" y1="0" x2="0" y2="4" stroke="#c9a15b" strokeWidth="1" />
            <path
              d="M-3,4 Q0,2 3,4 L4,8 Q0,10 -4,8 Z"
              fill="url(#goldMetallicGrad)"
              stroke="#8c6d33"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="8.5" r="1.2" fill="#ffd54f" />
          </g>
        </defs>

        {/* Top Connecting Swag (Draped Garland Rope) */}
        <path
          d="M 10,12 Q 95,28 190,14 Q 285,28 370,12"
          fill="none"
          stroke="#5c3d00"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.5"
        />

        {/* Small marigolds along the top curve */}
        {[30, 75, 120, 160, 200, 240, 285, 330].map((x, i) => {
          const y = 12 + Math.sin((i / 7) * Math.PI) * 8;
          return (
            <use
              key={`top-g-${x}`}
              href="#flower-marigold"
              x={x}
              y={y}
              transform={`scale(0.65) translate(${(x * 0.35)}, ${(y * 0.35)})`}
            />
          );
        })}

        {/* Hanging Strand 1 (Left) */}
        <g id="garland-strand-1" className="garland-strand" style={{ transformOrigin: "45px 14px" }}>
          <line x1="45" y1="14" x2="45" y2="62" stroke="#c9a15b" strokeWidth="0.8" strokeDasharray="1 3" />
          <use href="#flower-marigold" x="45" y="24" transform="scale(0.7) translate(19, 10)" />
          <use href="#flower-mogra" x="45" y="38" transform="scale(0.85) translate(8, 7)" />
          <use href="#flower-marigold" x="45" y="52" transform="scale(0.7) translate(19, 22)" />
          <use href="#flower-bell" x="45" y="62" />
        </g>

        {/* Hanging Strand 2 (Mid-Left) */}
        <g id="garland-strand-2" className="garland-strand" style={{ transformOrigin: "115px 22px" }}>
          <line x1="115" y1="22" x2="115" y2="82" stroke="#c9a15b" strokeWidth="0.8" strokeDasharray="1 3" />
          <use href="#flower-mogra" x="115" y="32" transform="scale(0.85) translate(20, 6)" />
          <use href="#flower-marigold" x="115" y="47" transform="scale(0.75) translate(38, 16)" />
          <use href="#flower-mogra" x="115" y="62" transform="scale(0.85) translate(20, 11)" />
          <use href="#flower-marigold" x="115" y="74" transform="scale(0.7) translate(49, 32)" />
          <use href="#flower-bell" x="115" y="82" />
        </g>

        {/* Hanging Strand 3 (Center Anchor - Longest) */}
        <g id="garland-strand-3" className="garland-strand" style={{ transformOrigin: "190px 14px" }}>
          <line x1="190" y1="14" x2="190" y2="86" stroke="#c9a15b" strokeWidth="0.9" strokeDasharray="1 3" />
          <use href="#flower-marigold" x="190" y="26" transform="scale(0.85) translate(33, 5)" />
          <use href="#flower-mogra" x="190" y="42" transform="scale(0.9) translate(21, 5)" />
          <use href="#flower-marigold" x="190" y="58" transform="scale(0.8) translate(47, 15)" />
          <use href="#flower-mogra" x="190" y="73" transform="scale(0.9) translate(21, 8)" />
          <use href="#flower-bell" x="190" y="85" />
        </g>

        {/* Hanging Strand 4 (Mid-Right) */}
        <g id="garland-strand-4" className="garland-strand" style={{ transformOrigin: "265px 22px" }}>
          <line x1="265" y1="22" x2="265" y2="82" stroke="#c9a15b" strokeWidth="0.8" strokeDasharray="1 3" />
          <use href="#flower-mogra" x="265" y="32" transform="scale(0.85) translate(47, 6)" />
          <use href="#flower-marigold" x="265" y="47" transform="scale(0.75) translate(88, 16)" />
          <use href="#flower-mogra" x="265" y="62" transform="scale(0.85) translate(47, 11)" />
          <use href="#flower-marigold" x="265" y="74" transform="scale(0.7) translate(114, 32)" />
          <use href="#flower-bell" x="265" y="82" />
        </g>

        {/* Hanging Strand 5 (Right) */}
        <g id="garland-strand-5" className="garland-strand" style={{ transformOrigin: "335px 14px" }}>
          <line x1="335" y1="14" x2="335" y2="62" stroke="#c9a15b" strokeWidth="0.8" strokeDasharray="1 3" />
          <use href="#flower-marigold" x="335" y="24" transform="scale(0.7) translate(143, 10)" />
          <use href="#flower-mogra" x="335" y="38" transform="scale(0.85) translate(59, 7)" />
          <use href="#flower-marigold" x="335" y="52" transform="scale(0.7) translate(143, 22)" />
          <use href="#flower-bell" x="335" y="62" />
        </g>
      </svg>
    </div>
  );
}

