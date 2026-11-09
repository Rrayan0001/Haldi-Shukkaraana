import type { EventKind } from "@/lib/wedding";

export function SharedSvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
      <defs>
        <linearGradient id="goldMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8c6d33" />
          <stop offset="30%" stopColor="#f3e5ab" />
          <stop offset="55%" stopColor="#c9a15b" />
          <stop offset="80%" stopColor="#f3e5ab" />
          <stop offset="100%" stopColor="#8c6d33" />
        </linearGradient>
        <radialGradient id="waxGoldSealGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f3e5ab" />
          <stop offset="45%" stopColor="#c9a15b" />
          <stop offset="85%" stopColor="#8c6d33" />
          <stop offset="100%" stopColor="#5c4318" />
        </radialGradient>
        <radialGradient id="lanternHaloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3e5ab" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#c9a15b" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c9a15b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="petalRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0b429" />
          <stop offset="55%" stopColor="#a87a00" />
          <stop offset="100%" stopColor="#5c3d00" />
        </linearGradient>
        <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe082" />
          <stop offset="45%" stopColor="#ffb300" />
          <stop offset="80%" stopColor="#f57c00" />
          <stop offset="100%" stopColor="#d84315" />
        </linearGradient>
        <radialGradient id="marigoldCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="60%" stopColor="#ff8f00" />
          <stop offset="100%" stopColor="#bf360c" />
        </radialGradient>
        <linearGradient id="mograWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#fdf8ed" />
          <stop offset="100%" stopColor="#ebd9c5" />
        </linearGradient>
        <radialGradient id="haldiPasteGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fff59d" />
          <stop offset="35%" stopColor="#fbc02d" />
          <stop offset="75%" stopColor="#f57f17" />
          <stop offset="100%" stopColor="#c65102" />
        </radialGradient>
        <linearGradient id="brassUrliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cf9e46" />
          <stop offset="25%" stopColor="#ffd875" />
          <stop offset="50%" stopColor="#8c6d33" />
          <stop offset="75%" stopColor="#ffd875" />
          <stop offset="100%" stopColor="#5c4318" />
        </linearGradient>
        <symbol id="sparkle-star" viewBox="0 0 24 24">
          <path d="M12 0 C13.5 8.5 15.5 10.5 24 12 C15.5 13.5 13.5 15.5 12 24 C10.5 15.5 8.5 13.5 0 12 C8.5 10.5 10.5 8.5 12 0 Z" />
        </symbol>
        <g id="wax-seal-graphic">
          <circle cx="34" cy="34" r="31" fill="url(#waxGoldSealGrad)" stroke="#8c6d33" strokeWidth="1.2" />
          <circle cx="34" cy="34" r="26" fill="none" stroke="#f3e5ab" strokeWidth="0.9" strokeDasharray="2 2" />
          <circle cx="34" cy="34" r="23" fill="none" stroke="#6e5220" strokeWidth="1" />
          <text x="34" y="40" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="18" fill="#4a3000" fontWeight="700" letterSpacing="1">RS</text>
        </g>
      </defs>
    </svg>
  );
}

export function StarSparkle({ delay = false }: { delay?: boolean }) {
  return (
    <svg className={`star-sparkle${delay ? " delay" : ""}`} aria-hidden="true">
      <use href="#sparkle-star" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg className="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

export function EventIcon({ kind }: { kind: EventKind }) {
  if (kind === "haldi") {
    return (
      <svg className="event-icon-svg" viewBox="0 0 36 36" aria-hidden="true">
        <path className="icon-stroke" d="M6,14 L30,14 C30,22 24,28 18,28 C12,28 6,22 6,14 Z" />
        <path className="icon-stroke" d="M11,10 L25,4" />
      </svg>
    );
  }
  if (kind === "nikah") {
    return (
      <svg className="event-icon-svg" viewBox="0 0 36 36" aria-hidden="true">
        <circle className="icon-stroke" cx="14" cy="21" r="7.5" />
        <circle className="icon-stroke" cx="22" cy="21" r="7.5" />
        <path className="icon-stroke" d="M14,13.5 L11.5,9.5 L14,7.5 L16.5,9.5 Z" />
      </svg>
    );
  }
  return (
    <svg className="event-icon-svg" viewBox="0 0 36 36" aria-hidden="true">
      <path className="icon-stroke" d="M6,24 C6,15 11,11 18,11 C25,11 30,15 30,24 Z" />
      <circle className="icon-stroke" cx="18" cy="8.5" r="2" />
      <path className="icon-stroke" d="M3,24 L33,24" />
      <path className="icon-stroke" d="M8,27.5 L28,27.5" />
    </svg>
  );
}
