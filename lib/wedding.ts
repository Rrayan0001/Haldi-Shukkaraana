export type EventKind = "haldi" | "nikah" | "valima";

export type WeddingEvent = {
  kind: EventKind;
  title: string;
  side: "left" | "right";
  datetime: string;
  datetimeSuffix?: string;
  venueName: string;
  venueAddress: string[];
  mapUrl: string;
};
export const wedding = {
  bride: { firstName: "Rabiya", fullName: "Dr. Rabiya Sultana" },
  groom: { firstName: "Suhail", fullName: "Dr. Suhail Ahmed" },
  monogram: "RS",
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahTranslation: "In the name of Allah, the most beneficent and the most merciful",
  dateISO: "2026-11-29T11:30:00+05:30",
  cardDates: "26 . 11 . 2026 • 29 . 11 . 2026 • 01 . 12 . 2026",
  mainDate: "Sunday, 29th November 2026",
  mainTimePlace: "11:30 AM • Bangalore Palace, Bengaluru",
  closingMessage:
    "With the grace of Almighty Allah and the blessings of our families, we await your gracious presence to share in our joy.",
  musicPath: "/assets/music.mp3",
  maxPetals: 20,
  introDustCount: 14,
  events: [
    {
      kind: "haldi",
      title: "HALDI & SHUKRANA",
      side: "left",
      datetime: "26th & 27th November 2026",
      datetimeSuffix: "Evening",
      venueName: "At Our Residence",
      venueAddress: ["Moin Manzil, Mujawar Mohalla,", "Mulbagal, Kolar"],
      mapUrl: "https://maps.app.goo.gl/4YfY9fXxzvxM1gfs8?g_st=iw",
    },
  ] satisfies WeddingEvent[],
} as const;
