import IntroScreen from "@/components/IntroScreen";
import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import Events from "@/components/Events";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import ScrollProgress from "@/components/ScrollProgress";
import Petals from "@/components/Petals";
import AudioToggle from "@/components/AudioToggle";
import { SharedSvgDefs } from "@/components/Ornaments";

export default function Home() {
  return (
    <>
      <div className="desktop-backdrop" aria-hidden="true"></div>
      <ScrollProgress />
      <svg className="paper-grain" aria-hidden="true">
        <filter id="paperNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperNoiseFilter)" />
      </svg>
      <SharedSvgDefs />
      <Petals />
      <IntroScreen />

      <main className="phone-viewport" id="main-invitation">
        <Hero />
        <SaveTheDate />
        <Events />
        <Closing />
        <Footer />
      </main>

      <AudioToggle />
      <ScrollEffects />
    </>
  );
}
