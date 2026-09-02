/**
 * One place for everything that changes: prices, links, handles, copy that
 * gets reused. Edit this file (or ask Claude to). Nothing else needs to change.
 */
export const site = {
  name: 'Your Style Archetype',
  short: 'YSA',
  tagline: 'Style consulting based on who you are, not trends.',
  url: 'https://yourstylearchetype.com',
  description:
    'Personalized style consulting and style guides based on you, not trends. Online Kibbe body type analysis, color season analysis, and Kitchener style essences, combined into Your Style Archetype.',
  instagram: 'yourstylearchetype',
  email: 'yourstylearchetype@gmail.com',
  /** Where consult bookings go. A Tally form with photo upload + Stripe payment works well. */
  bookingUrl: 'https://tally.so/r/REPLACE_ME',
  /** The coined term, used everywhere as a definition. */
  definition:
    'Your Style Archetype is the trio of your Kibbe body type, your Kitchener style essences, and your color season, read together.',
};

export type Service = {
  slug: string;
  name: string;
  /** Keyword-rich <title> for the service page. */
  seoTitle: string;
  price: number | null;
  priceLabel?: string;
  short: string;
  long: string;
  includes: string[];
  popular?: boolean;
  bookingUrl?: string;
};

export const services: Service[] = [
  {
    slug: 'your-style-archetype',
    name: 'Your Style Archetype',
    seoTitle: 'Your Style Archetype: Kibbe body type, style essences & color season in one consult',
    price: 200,
    popular: true,
    short: 'All three: body type, style essences, and color season, woven into one archetype you can dress from.',
    long:
      'This is the one we named the company after. We type you for all three systems in a single consult and then do the part nobody else does: we put them together. You get your Kibbe body type, your Kitchener style essences, and your color season, each explained, and then one written archetype that tells you how they play together on you specifically.',
    includes: [
      'Full Kibbe body type analysis',
      'Full Kitchener style essences analysis',
      'Full color season analysis',
      'Your combined Style Archetype, written as one guide with outfit formulas',
    ],
  },
  {
    slug: 'kibbe-body-type-analysis',
    name: 'Kibbe Body Type Analysis',
    seoTitle: 'Online Kibbe Body Type Analysis',
    price: 75,
    short: 'Your Kibbe ID and the silhouettes that honor your lines.',
    long:
      'The Kibbe system sorts bodies by how much they lean toward yang (long, sharp) or yin (soft, rounded), and how those blend. It has nothing to do with size and everything to do with which silhouettes fall into place on you. We type you from your photos and explain the reasoning, so it sticks.',
    includes: [
      'How the Kibbe system works, in plain language',
      'Your body type and why (with the reasoning, not just the verdict)',
      'Silhouettes, fits, and fabrics that work for your lines',
      'What tends to fight your lines, and what to do instead',
      'Celebrities who share your type, for reference',
    ],
  },
  {
    slug: 'color-season-analysis',
    name: 'Color Season Analysis',
    seoTitle: 'Online Color Analysis: find your color season',
    price: 50,
    short: 'Which colors make you look rested, awake, and like yourself.',
    long:
      'Online color analysis from your daylight photos. We look at the undertone, depth, and clarity of your skin, eyes, and hair and place you in one of the seasons, then give you a palette you can actually use: neutrals, accents, metals, and the colors to keep away from your face.',
    includes: [
      'Your seasonal color palette, with the reasoning',
      'Best neutrals, accents, and metals',
      'Colors to keep away from your face',
      'A palette image for your phone',
    ],
  },
  {
    slug: 'style-essence-analysis',
    name: 'Style Essence Analysis',
    seoTitle: 'Kitchener Style Essence Analysis',
    price: 100,
    short: 'The personality layer: the moods and details that feel like you.',
    long:
      'Two people with the same body type and palette can dress completely differently, because one carries a romantic essence and the other a dramatic one. The seven Kitchener style essences give you the vocabulary for that. We identify your primary and secondary essences and show you the details, textures, and accents that express them.',
    includes: [
      'Your primary and secondary essences',
      'Details, textures, and accents that express them',
      'How your essences interact with your body type',
      'A short vocabulary for describing your style',
    ],
  },
  {
    slug: 'just-typing-trio',
    name: 'Just Typing: Trio',
    seoTitle: 'Kibbe type, color season & style essence: just the answers',
    price: 75,
    short: 'Body type, color season, and essences. Just the answers, no deep dive.',
    long:
      'For the person who wants the verdicts and will do the reading themselves. We type you for all three and give you a paragraph on each. Pairs well with the style guides.',
    includes: ['Your Kibbe type', 'Your color season', 'Your style essences', 'One paragraph on each'],
  },
  {
    slug: 'wardrobe-review',
    name: 'Wardrobe Review',
    seoTitle: 'Online Wardrobe Review & Recommendations',
    price: 100,
    short: 'Send us your closet and your questions. Get honest, specific answers.',
    long:
      'Photograph the pieces you reach for and the ones you avoid, tell us what is not working, and we will tell you why, what to keep, what to let go of, and what would fill the gaps. Best after you know your archetype; also fine on its own.',
    includes: [
      'Review of up to 15 outfit or garment photos',
      'What is working and why',
      'Specific swaps, edits, and additions',
      'Written recommendations you can shop from',
    ],
  },
  {
    slug: 'personal-shopping',
    name: 'Personal Shopping',
    seoTitle: 'Online Personal Shopping & Image Consulting',
    price: null,
    priceLabel: 'ask us',
    short: 'A curated shopping list built around your archetype, your budget, and your actual life.',
    long:
      'Once we know your archetype, we shop for you: a curated list of specific pieces, with links, sized to your budget and the life you actually lead. Priced per project, so tell us what you need.',
    includes: ['Curated, linked shopping list', 'Built around your archetype and budget', 'One round of swaps'],
  },
  {
    slug: 'full-package',
    name: 'The Full Style Archetype Package',
    seoTitle: 'Full Style Archetype Package: typing plus wardrobe review',
    price: 275,
    short: 'Your Style Archetype plus a review of your current closet.',
    long:
      'Everything in Your Style Archetype, then we turn around and apply it to the closet you already own. The most complete thing we offer short of shopping for you.',
    includes: ['Everything in Your Style Archetype', 'Wardrobe Review & Recommendations', 'Priority turnaround'],
  },
];

export const formatPrice = (s: Pick<Service, 'price' | 'priceLabel'>) =>
  s.price === null ? (s.priceLabel ?? 'ask us') : `$${s.price}`;

/**
 * The full rosters. Guides that exist link to their page; the rest show as
 * "in the works" so people know the series is coming.
 * `slug` must match the filename in content/guides/.
 */
export const rosters = {
  kibbe: {
    label: 'Kibbe body types',
    blurb: 'One guide per type. Silhouettes, fabrics, necklines, outfit formulas, and a shopping checklist for your phone.',
    types: [
      { name: 'Dramatic', slug: 'dramatic' },
      { name: 'Soft Dramatic', slug: 'soft-dramatic' },
      { name: 'Flamboyant Natural', slug: 'flamboyant-natural' },
      { name: 'Natural', slug: 'natural' },
      { name: 'Soft Natural', slug: 'soft-natural' },
      { name: 'Dramatic Classic', slug: 'dramatic-classic' },
      { name: 'Soft Classic', slug: 'soft-classic' },
      { name: 'Flamboyant Gamine', slug: 'flamboyant-gamine' },
      { name: 'Soft Gamine', slug: 'soft-gamine' },
      { name: 'Romantic', slug: 'romantic' },
    ],
  },
  essence: {
    label: 'Style essences',
    blurb: 'The seven Kitchener essences, one guide each: what the essence is, how to wear it, how to mix it.',
    types: [
      { name: 'Dramatic', slug: 'dramatic-essence' },
      { name: 'Natural', slug: 'natural-essence' },
      { name: 'Classic', slug: 'classic-essence' },
      { name: 'Romantic', slug: 'romantic-essence' },
      { name: 'Gamine', slug: 'gamine-essence' },
      { name: 'Ingenue', slug: 'ingenue-essence' },
      { name: 'Ethereal', slug: 'ethereal-essence' },
    ],
  },
  season: {
    label: 'Color seasons',
    blurb: 'One guide per season, with the palette, the neutrals, the metals, and how to shop it.',
    types: [
      { name: 'Spring', slug: 'spring' },
      { name: 'Summer', slug: 'summer' },
      { name: 'Autumn', slug: 'autumn' },
      { name: 'Winter', slug: 'winter' },
    ],
  },
} as const;

export type Category = keyof typeof rosters;

/**
 * Before & afters. Leave empty until you have them; the section hides itself.
 * Put images in public/before-after/ and reference them here.
 */
export const beforeAfters: { name: string; archetype: string; before: string; after: string; note?: string }[] = [];

/** Real client reviews, from the pinned "Client Reviews" post on Instagram (April). */
export const testimonials = [
  {
    quote:
      'You should book this! The team was so great at breaking down the typing systems and explaining why I am the types I am. I loved it! It was so informative and easy to incorporate. I did a closet cleanout and now I\u2019m excited to shop again. Thanks ladies!',
    name: 'Client',
    detail: 'Your Style Archetype',
  },
  {
    quote:
      'This was so fun to read! I\u2019m gonna go read it five more times and then start going through my closet and sell or give away all the things that I just couldn\u2019t figure out why they didn\u2019t work. Now I know. I\u2019m going to tell everyone I know about this.',
    name: 'Client',
    detail: 'style analysis',
  },
  {
    quote:
      'I\u2019m so grateful to have found your IG page and that I impulsively purchased your services. It\u2019s exactly what I needed. My analysis gives me so much room to try new things and lean into my essences. I think I\u2019ve tried to play it small for a long time. I can\u2019t thank you and your team enough!',
    name: 'Client',
    detail: 'style essences',
  },
  {
    quote: 'This was such an amazing package! So fun to go through. You really created a cool business that is so helpful. Thank you so much!',
    name: 'Client',
    detail: 'consult package',
  },
];
