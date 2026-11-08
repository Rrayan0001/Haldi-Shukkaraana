import { wedding } from "@/lib/wedding";
import { EventIcon, PinIcon } from "@/components/Ornaments";

export default function Events() {
  return (
    <section className="wedding-section" id="itinerary-section">
      <div className="section-header">
        <span className="section-subtitle">Celebration Moments</span>
        <div className="section-title-wipe">
          <h2 className="section-title gold-foil">Wedding Itinerary</h2>
        </div>
        <div className="section-divider-wrap">
          <svg viewBox="0 0 200 24" width="100%" height="100%" aria-hidden="true">
            <path className="sec-div-line" d="M100,12 L15,12" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path className="sec-div-line" d="M100,12 L185,12" stroke="url(#goldMetallicGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg className="divider-center-sparkle" viewBox="0 0 24 24" fill="#c9a15b" aria-hidden="true"><use href="#sparkle-star" /></svg>
        </div>
      </div>

      <div className="timeline-container" id="timeline-container">
        <div className="timeline-track-bg" aria-hidden="true"></div>
        <div className="timeline-line-progress" id="timeline-line-progress" aria-hidden="true"></div>
        {wedding.events.map((event, index) => (
          <div className="itinerary-item" data-side={event.side} key={event.kind}>
            <div className="timeline-dot"></div>
            <article className="event-card">
              <div className="event-card-accent"></div>
              <div className="event-icon-wrap">
                <EventIcon kind={event.kind} />
              </div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-datetime">
                {event.datetime}
                <br />
                {event.datetimeSuffix}
                {index === 1 ? (<><br /><span style={{ fontWeight: 400, fontStyle: "italic", fontSize: "15.5px" }}>Lunch thereafter</span></>) : null}
              </p>
              <p className="event-venue-name">{event.venueName}</p>
              <p className="event-venue-address">
                {event.venueAddress.map((line) => (<span key={line}>{line}<br /></span>))}
              </p>
              <div className="event-btn-wrap">
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-directions">
                  <PinIcon />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
