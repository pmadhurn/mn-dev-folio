/**
 * Image registry.
 *
 * Every image ships in public/media as pre-sized WebP (`<base>-<width>.webp`),
 * so `srcset` lets the browser pick the smallest file that fills the slot.
 * Intrinsic width/height are recorded so the layout reserves space before the
 * file arrives — no layout shift.
 *
 * `kind: 'photo'` is atmospheric stock photography (Unsplash licence) used for
 * mood, never presented as Madhur's own hardware. `kind: 'screenshot'` is a
 * capture of the live application it illustrates.
 */
export interface MediaAsset {
  base: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
  kind: 'photo' | 'screenshot';
}

const PHOTO = [768, 1280, 1920];
const SHOT = [768, 1440];

export const media = {
  hero: {
    base: 'hero-earth',
    widths: PHOTO,
    width: 1920,
    height: 1278,
    alt: 'City lights across a continent at night, seen from orbit',
    kind: 'photo',
  },
  board: {
    base: 'overview-board',
    widths: PHOTO,
    width: 1920,
    height: 1280,
    alt: 'Macro view of a populated circuit board',
    kind: 'photo',
  },
  racks: {
    base: 'racks',
    widths: PHOTO,
    width: 1920,
    height: 1077,
    alt: 'Rows of server racks with status lights in a dark data hall',
    kind: 'photo',
  },
  workbench: {
    base: 'workbench',
    widths: PHOTO,
    width: 1920,
    height: 1280,
    alt: 'Electronics workbench with a breadboard prototype and a multimeter',
    kind: 'photo',
  },
  laptop: {
    base: 'laptop',
    widths: PHOTO,
    width: 1920,
    height: 1359,
    alt: 'A laptop opening in a dark room, its screen casting light',
    kind: 'photo',
  },
  patch: {
    base: 'patch',
    widths: PHOTO,
    width: 1920,
    height: 1280,
    alt: 'Network patch panel with numbered ports and cables',
    kind: 'photo',
  },
  pcb: {
    base: 'pcb',
    widths: PHOTO,
    width: 1920,
    height: 1281,
    alt: 'Illuminated printed circuit board traces',
    kind: 'photo',
  },
  switch: {
    base: 'switch',
    widths: PHOTO,
    width: 1920,
    height: 1277,
    alt: 'Rack-mounted network switch with fibre and copper patch cables',
    kind: 'photo',
  },
  drive: {
    base: 'drive',
    widths: PHOTO,
    width: 1920,
    height: 1280,
    alt: 'Opened hard disk drive showing the platter and actuator arm',
    kind: 'photo',
  },
  tunnel: {
    base: 'tunnel',
    widths: PHOTO,
    width: 1920,
    height: 1282,
    alt: 'Long corridor of light streaks converging on a bright point',
    kind: 'photo',
  },
  solder: {
    base: 'solder',
    widths: PHOTO,
    width: 1920,
    height: 1280,
    alt: 'Hands working on a circuit board with a screwdriver',
    kind: 'photo',
  },
  library: {
    base: 'library',
    widths: PHOTO,
    width: 1920,
    height: 1280,
    alt: 'A hand reaching for a book on a crowded shelf',
    kind: 'photo',
  },
  shotHealth: {
    base: 'shot-health',
    widths: SHOT,
    width: 1440,
    height: 900,
    alt: 'PulseBoard public status page listing every hosted service with latency and 24-hour uptime bars',
    kind: 'screenshot',
  },
  shotLink: {
    base: 'shot-link',
    widths: SHOT,
    width: 1440,
    height: 900,
    alt: 'FileDrop upload screen with a drag-and-drop area, optional password and download limit',
    kind: 'screenshot',
  },
  shotMeetings: {
    base: 'shot-meetings',
    widths: SHOT,
    width: 1440,
    height: 900,
    alt: 'SpeakInsights landing screen reading "Own your dialog" with buttons to start or join a meeting',
    kind: 'screenshot',
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

/** Imagery for projects that have it. Projects not listed render text-only. */
export const projectMedia: Partial<Record<string, MediaKey>> = {
  'self-hosted-infrastructure': 'racks',
  'gps-guided-tracking-system': 'pcb',
  speakinsights: 'shotMeetings',
  'learn-ai-tutor': 'laptop',
  'read-family-library': 'library',
  navdashboard: 'patch',
  'esp32-drone-controller': 'solder',
  pulseboard: 'shotHealth',
  filedrop: 'shotLink',
};
