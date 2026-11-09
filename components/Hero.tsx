import { wedding } from "@/lib/wedding";
import { StarSparkle } from "@/components/Ornaments";

export default function Hero() {
  return (
    <section id="hero-section">
      <svg className="floral-corner floral-top-left" id="hero-floral-tl" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="none" stroke="#8c6d33" strokeWidth="1.2" strokeLinecap="round">
          <path d="M-5,-5 C35,25 75,40 135,28" /><path d="M25,18 C45,55 55,95 42,145" /><path d="M55,28 C85,55 110,75 150,72" /><path d="M38,75 C65,92 85,115 95,145" />
        </g>
        <g fill="#c9a15b" opacity="0.55">
          <path d="M60,24 Q72,14 82,24 Q70,32 60,24 Z" /><path d="M35,55 Q20,65 26,78 Q40,68 35,55 Z" /><path d="M90,52 Q105,44 114,54 Q100,62 90,52 Z" /><path d="M55,92 Q70,88 76,100 Q62,104 55,92 Z" />
        </g>
        <g>
          <circle cx="28" cy="24" r="14" fill="#e8a020" opacity="0.85" /><circle cx="28" cy="24" r="8" fill="#ead8d0" /><circle cx="28" cy="24" r="3.5" fill="#c9a15b" />
          <circle cx="72" cy="48" r="11" fill="#a87a00" opacity="0.8" /><circle cx="72" cy="48" r="6" fill="#f4ecdf" /><circle cx="72" cy="48" r="2.5" fill="#c9a15b" />
          <circle cx="115" cy="28" r="4.5" fill="#ffffff" stroke="#c9a15b" strokeWidth="0.6" /><circle cx="132" cy="34" r="3.5" fill="#ead8d0" stroke="#c9a15b" strokeWidth="0.6" />
          <circle cx="124" cy="18" r="3.5" fill="#ffffff" stroke="#c9a15b" strokeWidth="0.6" /><circle cx="145" cy="68" r="4" fill="#ffffff" stroke="#c9a15b" strokeWidth="0.6" />
          <circle cx="44" cy="128" r="4.5" fill="#ffffff" stroke="#c9a15b" strokeWidth="0.6" /><circle cx="88" cy="135" r="4" fill="#ffffff" stroke="#c9a15b" strokeWidth="0.6" />
        </g>
      </svg>

      <svg className="floral-corner floral-bottom-right" id="hero-floral-br" viewBox="0 0 200 200" aria-hidden="true">
        <g transform="rotate(180 100 100)">
          <g fill="none" stroke="#8c6d33" strokeWidth="1.2" strokeLinecap="round">
            <path d="M-5,-5 C35,25 75,40 135,28" /><path d="M25,18 C45,55 55,95 42,145" /><path d="M55,28 C85,55 110,75 150,72" />
          </g>
          <g fill="#c9a15b" opacity="0.55">
            <path d="M60,24 Q72,14 82,24 Q70,32 60,24 Z" /><path d="M35,55 Q20,65 26,78 Q40,68 35,55 Z" /><path d="M90,52 Q105,44 114,54 Q100,62 90,52 Z" />
          </g>
          <circle cx="28" cy="24" r="14" fill="#e8a020" opacity="0.85" /><circle cx="28" cy="24" r="8" fill="#ead8d0" /><circle cx="28" cy="24" r="3.5" fill="#c9a15b" />
          <circle cx="72" cy="48" r="11" fill="#a87a00" opacity="0.8" /><circle cx="72" cy="48" r="6" fill="#f4ecdf" /><circle cx="115" cy="28" r="4.5" fill="#ffffff" stroke="#c9a15b" strokeWidth="0.6" />
        </g>
      </svg>

      <svg className="lantern-wrap lantern-left" id="lantern-left" viewBox="0 0 64 195" aria-hidden="true">
        <line x1="32" y1="0" x2="32" y2="78" stroke="url(#goldMetallicGrad)" strokeWidth="1.4" />
        <circle className="lantern-halo" cx="32" cy="128" r="32" />
        <circle cx="32" cy="82" r="4" fill="none" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" />
        <path d="M20,98 Q32,82 44,98 Z" fill="url(#goldMetallicGrad)" />
        <polygon points="18,98 46,98 50,148 14,148" fill="#5c3d00" stroke="url(#goldMetallicGrad)" strokeWidth="1.6" />
        <path className="lantern-flame" d="M22,144 L22,116 Q32,103 42,116 L42,144 Z" fill="#f3e5ab" opacity="0.9" />
        <line x1="32" y1="98" x2="32" y2="148" stroke="#c9a15b" strokeWidth="0.9" />
        <line x1="16" y1="123" x2="48" y2="123" stroke="#c9a15b" strokeWidth="0.9" />
        <polygon points="14,148 50,148 40,158 24,158" fill="url(#goldMetallicGrad)" />
        <path d="M32,158 L35,166 L32,172 L29,166 Z" fill="#c9a15b" />
      </svg>

      <svg className="lantern-wrap lantern-right" id="lantern-right" viewBox="0 0 64 195" aria-hidden="true">
        <line x1="32" y1="0" x2="32" y2="62" stroke="url(#goldMetallicGrad)" strokeWidth="1.4" />
        <circle className="lantern-halo" cx="32" cy="112" r="32" />
        <circle cx="32" cy="66" r="4" fill="none" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" />
        <path d="M20,82 Q32,66 44,82 Z" fill="url(#goldMetallicGrad)" />
        <polygon points="18,82 46,82 50,132 14,132" fill="#5c3d00" stroke="url(#goldMetallicGrad)" strokeWidth="1.6" />
        <path className="lantern-flame" d="M22,128 L22,100 Q32,87 42,100 L42,128 Z" fill="#f3e5ab" opacity="0.9" />
        <line x1="32" y1="82" x2="32" y2="132" stroke="#c9a15b" strokeWidth="0.9" />
        <line x1="16" y1="107" x2="48" y2="107" stroke="#c9a15b" strokeWidth="0.9" />
        <polygon points="14,132 50,132 40,142 24,142" fill="url(#goldMetallicGrad)" />
        <path d="M32,142 L35,150 L32,156 L29,150 Z" fill="#c9a15b" />
      </svg>

      <div className="hero-arch-wrapper" id="hero-arch-wrapper">
        <svg className="hero-arch-svg" viewBox="0 0 380 660" preserveAspectRatio="none" aria-hidden="true">
          <path id="arch-fill-path" d="M 14,646 L 14,210 C 14,105 135,58 190,16 C 245,58 366,105 366,210 L 366,646 Z" fill="#f4ecdf" fillOpacity="0" />
          <path id="arch-outer-stroke" d="M 14,646 L 14,210 C 14,105 135,58 190,16 C 245,58 366,105 366,210 L 366,646 L 14,646" fill="none" stroke="url(#goldMetallicGrad)" strokeWidth="2.4" strokeLinecap="round" />
          <path id="arch-inner-stroke" d="M 22,638 L 22,212 C 22,114 138,68 190,28 C 242,68 358,114 358,212 L 358,638 L 22,638" fill="none" stroke="#c9a15b" strokeWidth="1" strokeOpacity="0.75" />
          <g id="arch-peak-ornament" opacity="0">
            <circle cx="190" cy="10" r="4" fill="#c9a15b" />
            <path d="M184,18 Q190,4 196,18" fill="none" stroke="#8c6d33" strokeWidth="1.2" />
          </g>
        </svg>

        <div className="hero-content">
          <div className="bismillah-box" id="bismillah-box">
            <div className="bismillah-arabic" lang="ar">{wedding.bismillah}</div>
            <div className="bismillah-english">{wedding.bismillahTranslation}</div>
          </div>

          <div className="invite-lines-group">
            <p className="invite-line">WITH THE GRACE OF ALMIGHTY ALLAH</p>
            <p className="invite-line">AND THE BLESSINGS OF OUR FAMILIES,</p>
            <p className="invite-line">WE ARE DELIGHTED TO INVITE YOU TO</p>
            <p className="invite-line">THE HALDI &amp; SHUKRANA CELEBRATIONS OF</p>
          </div>

          <div className="couple-names-block">
            <div className="hero-name-wipe" id="bride-name-wipe">
              <h1 className="couple-name gold-foil">{wedding.bride.fullName}</h1>
            </div>
            <div className="couple-ampersand" id="hero-ampersand">&amp;</div>
            <div className="hero-name-wipe" id="groom-name-wipe">
              <h2 className="couple-name gold-foil">{wedding.groom.fullName}</h2>
            </div>
          </div>

          <svg className="ornamental-divider" viewBox="0 0 220 26" aria-hidden="true">
            <path className="hero-div-stroke" d="M110,13 L15,13" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path className="hero-div-stroke" d="M110,13 L205,13" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path className="hero-div-stroke" d="M110,4 L119,13 L110,22 L101,13 Z" fill="#f4ecdf" stroke="#c9a15b" strokeWidth="1.4" />
            <circle cx="110" cy="13" r="2.5" fill="#7a5200" />
            <circle cx="65" cy="13" r="2" fill="#c9a15b" />
            <circle cx="155" cy="13" r="2" fill="#c9a15b" />
          </svg>

          <div className="hero-cta-box" id="hero-cta-box">
            <a href="#itinerary-section" className="btn-gold" id="explore-btn">
              <StarSparkle />
              <span>EXPLORE DETAILS</span>
              <StarSparkle delay />
            </a>
            <svg className="scroll-chevron" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
