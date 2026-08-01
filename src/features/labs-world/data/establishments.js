// The world's fixed layout. Six plots on a ring of radius 4 around the hub —
// five occupied, one held for the content apps so the ring never has to be
// re-composed when they ship.
//
// `url` is the app's public landing page — clicking a building goes there.
// These are the real domains, not the Vercel preview URLs the old tile grid
// used. This file is the single source of truth for where a building sends
// you, so the world and the card-grid fallback can never diverge.

const ASSET = '/labs-world';

// The hub reuses the existing brand mark rather than a new asset.
export const HUB = { gx: 0, gy: 0, art: '/pentridge-p.png' };
export const AGENT_HOME = { gx: 0, gy: 1.35 };

export const ESTABLISHMENTS = [
  {
    id: 'pm',
    name: 'AlignoPM',
    subtitle: 'Project Management',
    gx: 0,
    gy: -4,
    art: `${ASSET}/pm.webp`,
    url: 'https://alignopm.com',
    signal: 'projects',
    // its cyan glass is by far the brightest surface in the world; pull it
    // back so it sits in the ring instead of dominating it
    baseTint: 0xa9a2cc,
  },
  {
    id: 'crm',
    name: 'AlignoCRM',
    subtitle: 'Customer Relationship Management',
    gx: 4,
    gy: -2,
    art: `${ASSET}/crm.webp`,
    artDormant: `${ASSET}/crm-dormant.webp`,
    url: 'https://alignocrm.com',
    signal: 'deals',
  },
  {
    id: 'voiyce',
    name: 'Voiyce',
    subtitle: 'Write at the Speed of Thought',
    gx: 4,
    gy: 2,
    art: `${ASSET}/voiyce.webp`,
    url: 'https://voiyce.us/',
    signal: 'online',
  },
  {
    id: 'content',
    name: 'Content House',
    subtitle: 'Thought Social · Post Social',
    gx: 0,
    gy: 4,
    art: `${ASSET}/content.webp`,
    url: null, // not shipped — stays at the neutral active baseline
    signal: null,
  },
  {
    id: 'dropcard',
    name: 'Drop Card',
    subtitle: 'Your Networking. Upgraded.',
    gx: -4,
    gy: 2,
    art: `${ASSET}/dropcard.webp`,
    url: 'https://dropcard.app',
    signal: 'connections',
  },
  {
    id: 'reserved',
    name: 'Reserved',
    subtitle: 'More Labs products are coming',
    gx: -4,
    gy: -2,
    art: `${ASSET}/reserved.webp`,
    url: null,
    reserved: true, // never interactive, never "locked" — just held
    scale: 1.5,     // low + dark, so it needs help to read at camera distance
    gyNudge: 0.4,   // pulled a little toward the plaza for the same reason
  },
];

export const SELECTABLE = ESTABLISHMENTS.filter((e) => !e.reserved);

// Open-air leisure installations. Deliberately NOT establishments: the agent
// walks to these and does something, but they never navigate anywhere. Their
// silhouette (no walls, no roof, no door) is what tells the user that.
export const INSTALLATIONS = [
  { id: 'deck', art: `${ASSET}/deck.webp`, gx: 2.2, gy: 3.2, pose: 'meditate', poseDy: -30 },
  { id: 'rig', art: `${ASSET}/rig.webp`, gx: 2.6, gy: 4.2, pose: 'pullup', poseDy: -62 },
  { id: 'zen', art: `${ASSET}/zen.webp`, gx: 3.4, gy: 3.0 },
  { id: 'pool', art: `${ASSET}/pool.webp`, gx: 1.3, gy: 3.9 },
];

// Scenery. Never hit-tested, never focusable.
export const PROPS = [
  ...[
    [-7, -1], [-6, -3], [-3, -6], [1, -7], [5, -6], [7, -3], [7, 1], [6, 4],
    [2, 7], [-2, 7], [-5, 6], [-7, 2], [-6, 0], [4, -6], [7, -1], [5, 5],
  ].map(([gx, gy], i) => ({ art: `prop-${i % 2 ? 'tree' : 'cypress'}`, gx, gy })),
  { art: 'prop-kiosk', gx: -2.4, gy: -3.1 },
  { art: 'prop-vending', gx: 2.6, gy: -2.8 },
  { art: 'prop-pillar', gx: 3.1, gy: -1.2 },
  { art: 'prop-pylon', gx: -2.8, gy: -0.5 },
  { art: 'prop-pylon', gx: 2.8, gy: 0.5 },
  { art: 'prop-bench', gx: -1.6, gy: 1.0 },
  { art: 'prop-bench', gx: 1.6, gy: -1.0 },
  { art: 'prop-bench', gx: 3.5, gy: 4.0 },
  { art: 'prop-cafe', gx: -1.8, gy: -1.5 },
  { art: 'prop-planter', gx: 0, gy: -1.9 },
  { art: 'prop-hedge', gx: -3.8, gy: -1.1 },
  { art: 'prop-shrub', gx: -3.1, gy: 1.3 },
  { art: 'prop-crates', gx: 1.2, gy: -3.6 },
  { art: 'prop-grass', gx: -5, gy: -4 },
  { art: 'prop-grass', gx: 5, gy: -4 },
  { art: 'prop-tree', gx: 4.2, gy: 3.6 },
  { art: 'prop-cypress', gx: 0.9, gy: 4.6 },
  // lamps along each conduit
  ...SELECTABLE.flatMap((e) =>
    [0.44, 0.8].flatMap((t) => [
      { art: 'prop-lamp', gx: e.gx * t + 0.6, gy: e.gy * t - 0.6 },
      { art: 'prop-bollard', gx: e.gx * t - 0.6, gy: e.gy * t + 0.6 },
    ]),
  ),
];

export const NPC_SPOTS = [
  [-2.3, 1.1], [2.1, -1.3], [1.0, 2.5], [-1.0, -2.4], [3.1, 1.2], [-3.2, 0.7],
  [1.7, 1.8], [-1.8, -1.1], [2.7, -2.3], [-2.7, 2.3], [0.5, 3.2], [-0.6, -3.3],
];
