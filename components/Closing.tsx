import { wedding } from "@/lib/wedding";

export default function Closing() {
  return (
    <section className="wedding-section" id="closing-section">
      <div className="section-header">
        <span className="section-subtitle">With Blessings &amp; Duas</span>
        <div className="section-title-wipe">
          <h2 className="section-title gold-foil">Awaiting Your Presence</h2>
        </div>
        <div className="section-divider-wrap">
          <svg viewBox="0 0 200 24" width="100%" height="100%" aria-hidden="true">
            <path className="sec-div-line" d="M100,12 L15,12" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path className="sec-div-line" d="M100,12 L185,12" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg className="divider-center-sparkle" viewBox="0 0 24 24" fill="#c9a15b" aria-hidden="true"><use href="#sparkle-star" /></svg>
        </div>
      </div>

      <div className="palace-stage" id="palace-stage">
        <div className="palace-sunset-glow" aria-hidden="true"></div>
        <svg className="palace-svg" viewBox="0 0 400 220" aria-hidden="true">
          <g id="palace-fills" opacity="0">
            <path d="M70,195 L70,110 L110,110 L110,95 L155,95 L155,75 L245,75 L245,95 L290,95 L290,110 L330,110 L330,195 Z" fill="#ead8d0" />
            <path d="M168,75 C168,42 200,28 200,20 C200,28 232,42 232,75 Z" fill="#f3e5ab" opacity="0.55" />
            <path d="M78,110 C78,88 94,78 94,72 C94,78 110,88 110,110 Z" fill="#f3e5ab" opacity="0.45" />
            <path d="M290,110 C290,88 306,78 306,72 C306,78 322,88 322,110 Z" fill="#f3e5ab" opacity="0.45" />
            <path d="M178,195 L178,142 C178,128 200,120 200,115 C200,120 222,128 222,142 L222,195 Z" fill="#7a5200" opacity="0.18" />
          </g>
          <g id="palace-strokes" fill="none" stroke="#8c6d33" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
            <line x1="15" y1="195" x2="385" y2="195" strokeWidth="1.8" />
            <line x1="35" y1="201" x2="365" y2="201" stroke="#c9a15b" strokeWidth="1" />
            <path d="M168,75 C168,42 200,28 200,20 C200,28 232,42 232,75" /><line x1="200" y1="20" x2="200" y2="9" /><circle cx="200" cy="14" r="2" />
            <path d="M78,110 C78,88 94,78 94,72 C94,78 110,88 110,110" /><line x1="94" y1="72" x2="94" y2="63" />
            <path d="M290,110 C290,88 306,78 306,72 C306,78 322,88 322,110" /><line x1="306" y1="72" x2="306" y2="63" />
            <rect x="155" y="75" width="90" height="120" /><rect x="110" y="95" width="45" height="100" /><rect x="245" y="95" width="45" height="100" /><rect x="70" y="110" width="40" height="85" /><rect x="290" y="110" width="40" height="85" />
          </g>
          <g id="palace-birds-flock" fill="none" stroke="#7a5200" strokeWidth="1.3" strokeLinecap="round">
            <path d="M20,48 Q25,42 30,48 Q35,42 40,48" /><path d="M38,36 Q42,31 46,36 Q50,31 54,36" /><path d="M52,50 Q56,45 60,50 Q64,45 68,50" />
          </g>
        </svg>
      </div>

      <p className="closing-message-box" id="closing-quote">{wedding.closingMessage}</p>

      <div className="compliments-box">
        <div className="compliments-label">Best Compliments From</div>
        <div className="compliments-names">Family &amp; Relatives</div>
      </div>
    </section>
  );
}
