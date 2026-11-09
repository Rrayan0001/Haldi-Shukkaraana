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
  dateISO: "2026-11-26T18:00:00+05:30",
  cardDates: "26 . 11 . 2026 • 27 . 11 . 2026",
  mainDate: "26th & 27th November 2026",
  mainTimePlace: "Evening • Moin Manzil, Mulbagal, Kolar",
  closingMessage:
    "With the grace of Almighty Allah and the blessings of our families, we warmly invite you to join our Haldi & Shukrana ceremony — an evening of turmeric, duas and togetherness.",
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
