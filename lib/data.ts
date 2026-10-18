/* ------------------------------------------------------------------ */
/*  TasalaHQ — all editable content lives here.                        */
/*  Facts verified Oct 2026 from tasalahq.com, Google/Fresha listings  */
/*  and the salon's Instagram bio.                                     */
/*  PRICES ARE PLACEHOLDERS: the salon's real price list lives on      */
/*  their Fresha page. Replace `price` values with the real ones      */
/*  before this goes live for the client.                              */
/*  TESTIMONIALS are real, with their source noted on each one.        */
/* ------------------------------------------------------------------ */

export const business = {
  name: "TasalaHQ",
  tagline: "Healthy Hair Experts",
  promise: "Healthy hair, grown with intention.",
  sub: "Lagos's natural-hair home — where every appointment starts with the health of your hair, not just the style.",
  rating: 4.6,
  reviewCount: 1089,
  igHandle: "@tasalahq",
  igUrl: "https://www.instagram.com/tasalahq/",
  igFollowers: "174K",
  email: "info@tasalahq.com",
  website: "https://tasalahq.com",
  community: "2,000+",
  foundedBy: "Dupe Talabi",
  founderNote:
    "Founded by Dupe Talabi — NVQ Level 4 in Hairdressing, Beauty Therapy & Salon Management, and a City & Guilds assessor for West Africa. Healthy hair first, style second, always.",
};

export const locations = [
  {
    id: "ikoyi",
    label: "Ikoyi",
    address: "130B Association Road, Dolphin Estate, Ikoyi, Lagos",
    phoneDisplay: "0706 350 9207",
    phoneHref: "tel:+2347063509207",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=TasalaHQ+Hair+and+Beauty+Salon+130B+Association+Road+Dolphin+Estate+Ikoyi+Lagos",
  },
  {
    id: "lekki",
    label: "Lekki Phase 1",
    address: "3A Tokunbo Omisore Street, Lekki Phase 1, Lagos",
    phoneDisplay: "0806 494 0536",
    phoneHref: "tel:+2348064940536",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Tasala+Salon+Lekki+3A+Tokunbo+Omisore+Street+Lekki+Phase+1+Lagos",
  },
];

export const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday – Saturday", time: "9:30 AM – 6:00 PM" },
  { day: "Sunday", time: "12:30 PM – 6:00 PM" },
];

export const whatsappUrl =
  "https://wa.me/2347063509207?text=Hi%20TasalaHQ!%20I%27d%20like%20to%20book%20an%20appointment.";

export type Service = {
  name: string;
  benefit: string;
  duration: string;
  price: string;
  tag?: string;
  image: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1200&auto=format&fit=crop`;

/* Signature services — the six people actually come for. */
export const signatureServices: Service[] = [
  {
    name: "Healthy Hair Treatment",
    benefit:
      "Consultation, deep moisture + protein balance and a scalp reset. The appointment your hair has been asking for.",
    duration: "2 – 3 hrs",
    price: "Confirmed at booking",
    tag: "Most loved",
    image: img("1580618672591-eb180b1a973f"),
  },
  {
    name: "Silk Press & Styling",
    benefit:
      "Glass-smooth, swingy silk press with heat protection and a finish that holds — no breakage, no regret.",
    duration: "2 – 3 hrs",
    price: "Confirmed at booking",
    image: img("1522337660859-02fbefca4702"),
  },
  {
    name: "Colour & Highlights",
    benefit:
      "Rich, dimensional colour mixed for your skin tone and curl pattern — with bond care built into every step.",
    duration: "2 – 4 hrs",
    price: "Confirmed at booking",
    image: img("1519699047748-de8e457a634e"),
  },
  {
    name: "Bridal & Occasion",
    benefit:
      "Updos, buns and waves that photograph beautifully and survive the whole celebration. Trials available.",
    duration: "By consultation",
    price: "Confirmed at booking",
    tag: "Brides",
    image: img("1487412947147-5cebf100ffc2"),
  },
  {
    name: "Custom Wig Making",
    benefit:
      "A wig built for your head, your hairline and your life — natural, secure, and unmistakably you.",
    duration: "By consultation",
    price: "Confirmed at booking",
    image: img("1595476108010-b4d1f102b1b1"),
  },
  {
    name: "Hair Training Academy",
    benefit:
      "Bridal styles, hair management and business growth — taught by a City & Guilds assessor. Learn the craft properly.",
    duration: "Courses vary",
    price: "Confirmed at booking",
    tag: "Academy",
    image: img("1562322140-8baeececf3df"),
  },
];

/* Full salon menu — scannable, every row earns its place. */
export const menu: Service[] = [
  {
    name: "Wash & Deep Condition",
    benefit: "A proper wash, detangle and deep-condition reset.",
    duration: "1 – 1.5 hrs",
    price: "Confirmed at booking",
    image: img("1580618672591-eb180b1a973f"),
  },
  {
    name: "Healthy Hair Treatment",
    benefit: "Consultation, moisture + protein balance, scalp care.",
    duration: "2 – 3 hrs",
    price: "Confirmed at booking",
    image: img("1580618672591-eb180b1a973f"),
  },
  {
    name: "Hair Spa + Massage",
    benefit: "The full wind-down: spa, massage, mani-pedi energy.",
    duration: "2 – 3 hrs",
    price: "Confirmed at booking",
    image: img("1522338242992-e1a54906a8da"),
  },
  {
    name: "Silk Press",
    benefit: "Glass-smooth finish with heat protection.",
    duration: "2 – 3 hrs",
    price: "Confirmed at booking",
    image: img("1522337660859-02fbefca4702"),
  },
  {
    name: "Cut & Shape",
    benefit: "Shape that grows out beautifully, not awkwardly.",
    duration: "1 – 1.5 hrs",
    price: "Confirmed at booking",
    image: img("1560066984-138dadb4c035"),
  },
  {
    name: "Colour — Full & Highlights",
    benefit: "Dimensional colour with bond care built in.",
    duration: "2 – 4 hrs",
    price: "Confirmed at booking",
    image: img("1519699047748-de8e457a634e"),
  },
  {
    name: "Relaxer / Texlax",
    benefit: "For relaxed hair clients — gentle, measured, healthy.",
    duration: "2 – 3 hrs",
    price: "Confirmed at booking",
    image: img("1522337660859-02fbefca4702"),
  },
  {
    name: "Wig Making & Revamp",
    benefit: "Custom builds and revamps that look brand new.",
    duration: "By consultation",
    price: "Confirmed at booking",
    image: img("1595476108010-b4d1f102b1b1"),
  },
  {
    name: "Bridal Updo",
    benefit: "Updos, buns, waves — celebration-proof styling.",
    duration: "By consultation",
    price: "Confirmed at booking",
    image: img("1487412947147-5cebf100ffc2"),
  },
  {
    name: "Kids' Hair Care",
    benefit: "Gentle, patient care for little heads.",
    duration: "1 – 2 hrs",
    price: "Confirmed at booking",
    image: img("1526045478516-99145907023c"),
  },
];

/* The salon's own product line — Truth by Tasala.
   REAL products + prices, verified Oct 18, 2026 from the brand's own
   SumUp store: https://truth-by-tasala.sumupstore.com/
   Prices are in GBP as listed on the store. Check the live store for
   current stock before launch — several lines sell out. */
export const productBrand = "Truth by Tasala";
export const productStore = "https://truth-by-tasala.sumupstore.com/";
export const productAward =
  "Nominated Beauty Brand of the Year (Hair) — BiL Beauty Awards 2024";

export const products = [
  { name: "Full Hair Care Kit", size: "Complete set", price: "£85.00", note: "The whole routine in one box." },
  { name: "Deep Moisture Infusion Mask", size: "500g", price: "£15.00", note: "The thirst-quencher." },
  { name: "Root Stimulating Oil", size: "120ml", price: "£13.00", note: "Wake the scalp up." },
  { name: "Curling Jelly", size: "500g", price: "£12.00", note: "Definition that holds." },
  { name: "6-in-1 Leave-In Conditioner", size: "500ml", price: "£9.50", note: "One bottle, six jobs." },
  { name: "Rinse-Out Conditioner", size: "500ml", price: "£9.50", note: "Slip for easy detangling." },
  { name: "Nourishing Shampoo", size: "500ml", price: "£8.50", note: "Clean without stripping." },
  { name: "Smooth Dark Edge Control", size: "150g", price: "£6.50", note: "Edges, laid." },
];

/* The Growth Journey — the scroll-driven 3D story. */
export const journey = [
  {
    step: "01",
    title: "Consult",
    text: "We start with your hair, not a style chart. Scalp, strands and history — so every decision is made for your head, not someone else's.",
  },
  {
    step: "02",
    title: "Treat",
    text: "Wash, deep moisture, protein where it's needed. This is the part most salons skip. It's the part your hair remembers.",
  },
  {
    step: "03",
    title: "Style",
    text: "Silk press, colour, cut or updo — built on healthy hair, so the style doesn't just look good on day one. It holds.",
  },
  {
    step: "04",
    title: "Grow",
    text: "You leave with a home routine and the right Tasala products. Growth isn't a one-visit miracle — it's a habit we build together.",
  },
];

/* Real testimonials — quoted from public Fresha / Google reviews. */
export const testimonials = [
  {
    quote:
      "My favourite salon in Lagos! So amazing for my natural hair. Thanks for giving my natural curls some life!",
    name: "Fresha customer",
    service: "Natural hair care",
    source: "Fresha review",
  },
  {
    quote:
      "All the staff were amazing. The hair spa, massage, pedicure and manicure definitely put me to sleep. Getting my hair done was incredible too. I will definitely be back.",
    name: "Fresha customer",
    service: "Hair spa day",
    source: "Fresha review",
  },
  {
    quote:
      "I got a same day appointment with my regular stylist who understands my hair. Efficient, friendly service delivered with expertise. I'm happy, thank you!",
    name: "Fresha customer",
    service: "Regular appointment",
    source: "Fresha review",
  },
  {
    quote:
      "I love how intentional Tasala is with client handling — it stops wasting anyone's time. And they still cater to natural hair very well.",
    name: "Google reviewer",
    service: "Client experience",
    source: "Google review",
  },
  {
    quote:
      "Customer service was great right from the front desk. The stylist was patient and paid attention to every little detail.",
    name: "Fresha customer",
    service: "Styling",
    source: "Fresha review",
  },
];

/* Gallery — stock style references; the salon's own portfolio slots in here. */
export const gallery = [
  { src: img("1522337660859-02fbefca4702"), label: "Silk press finish", alt: "Stylist finishing a smooth silk press in a salon" },
  { src: img("1595476108010-b4d1f102b1b1"), label: "Braids & texture", alt: "Detailed braided hairstyle" },
  { src: img("1519699047748-de8e457a634e"), label: "Colour, dimensional", alt: "Portrait showing dimensional hair colour" },
  { src: img("1560066984-138dadb4c035"), label: "In the chair", alt: "Client in a salon chair during a styling session" },
  { src: img("1580618672591-eb180b1a973f"), label: "The wash ritual", alt: "Hair being washed at a salon basin" },
  { src: img("1522338242992-e1a54906a8da"), label: "Styling in motion", alt: "Stylist working on a client's hair" },
];

export const marqueeWords = [
  "Growth",
  "Strength",
  "Moisture",
  "Care",
  "Ikoyi",
  "Lekki",
  "Healthy Hair",
  "Book Today",
];
