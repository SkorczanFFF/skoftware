import { SITE_URL } from '@/lib/site';

import type { CaseStudyEntry } from '@/locale/types';

/**
 * Order is the reading order: the home section lists them top to bottom and
 * the prev/next links on an article follow it. Everything but the prose
 * must match `data/pl/caseStudies.ts`
 * (`__tests__/locale/caseStudies.test.ts`).
 */
export const caseStudies: CaseStudyEntry[] = [
  {
    slug: 'yawa-volumetric-clouds',
    title: 'A weather simulation driven by API data',
    summary:
      'The background of a weather app had to show the real sky from the forecast, not an animation. A custom GLSL raymarcher, cloud physics derived from Open-Meteo data and rendering that stays smooth on a phone.',
    kind: 'personal',
    year: '2022–2026',
    role: 'Author: concept, shaders, physics, UI',
    stack: ['React', 'TypeScript', 'Three.js', 'GLSL', 'Sass', 'Open-Meteo'],
    cover: {
      src: '/projects/yawa.jpg',
      width: 1920,
      height: 1080,
      alt: 'Yet Another Weather App: 3D scene with clouds over a map',
    },
    links: {
      live: 'https://www.yet-another-weather-app.skoftware.pl/',
      git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    },
    projectId: 1,
    serviceSlug: '3d-webgl',
  },
  {
    slug: 'polonez-autodrive-rewrite',
    title:
      'Polonez Autodrive: the evolution of an interactive 3D colouring book',
    summary:
      'The first version of this synthwave colouring book with a mini-game had 16 P0 bugs, three independent clocks and controls tied to the monitor refresh rate. An analysis of the first version, the move from plain JS and HTML to Vite on a new skeleton, and a procedural scene in place of FBX files.',
    kind: 'personal',
    year: '2024–2026',
    role: 'Author: 3D models, code, UI, deployment',
    stack: ['Three.js', 'Vanilla JS', 'GLSL', '3Ds Max', 'Vite', 'Vitest'],
    cover: {
      src: '/projects/polonez_autodrive.jpg',
      width: 1920,
      height: 1080,
      alt: 'Polonez Autodrive: a Polonez driving towards a striped synthwave sun',
    },
    links: {
      live: 'https://www.polonez-autodrive.skoftware.pl/',
      git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    },
    projectId: 0,
  },
  {
    slug: 'capcam-head-tracking',
    title: 'CapCam: a phone on a cap as a head tracker for games',
    summary:
      'Head tracking in racing simulators without a camera or IR LEDs. Android reads the gyroscope, combines the pose with how the phone is worn and sends it over UDP to opentrack, which presents itself to games as TrackIR.',
    kind: 'personal',
    year: '2026',
    role: 'Author: app, protocol, measurement tools',
    stack: ['Kotlin', 'Jetpack Compose', 'Android', 'UDP', 'opentrack'],
    links: {
      git: 'https://github.com/SkorczanFFF/capcam',
      live: 'https://github.com/SkorczanFFF/capcam/releases/latest',
      liveLabel: 'APK',
    },
    serviceSlug: 'aplikacje-mobilne',
  },
  {
    slug: 'skoftware-hero-particles',
    title:
      'A portrait made of particles: a 3D scene that never blocks the offer',
    summary:
      'The hero of this site turns a photo into a GPU-driven particle field that reacts to the cursor, the gyroscope and touch. The condition: the headline and call to action must be in the first byte of HTML, and the scene must fit a phone’s budget.',
    kind: 'personal',
    year: '2025–2026',
    role: 'Author: design, shaders, motion, performance',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Three.js',
      'GLSL',
      'GSAP',
      'TailwindCSS',
    ],
    cover: {
      src: '/projects/skoftware.jpg',
      width: 1920,
      height: 1080,
      alt: 'SKOFTWARE hero: a particle portrait above the offer headline',
    },
    links: {
      live: SITE_URL,
      git: 'https://github.com/SkorczanFFF/skoftware',
    },
    projectId: 3,
    serviceSlug: 'strony-internetowe',
  },
  {
    slug: 'derdum-wyplatum-google-calendar',
    title: 'Derdum Wypłatum: Google Calendar as a database with no server',
    summary:
      'A pay calculator for a tram driver that reads the shift roster from Google Calendar. OAuth in a pure front end with no backend, a token valid for an hour, the calendar as the single source of truth and an engine that counts in grosz.',
    kind: 'personal',
    year: '2026',
    role: 'Author: architecture, Google integration, calculation engine',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Google Calendar API',
      'Vitest',
      'PWA',
    ],
    links: {
      git: 'https://github.com/SkorczanFFF/derdum-wyplatum',
      live: 'https://grafik-wyplata.vercel.app',
    },
    serviceSlug: 'aplikacje-webowe',
    draft: true,
  },
  {
    slug: 'tibia-key-presser-background-input',
    title: 'Tibia Key Presser: game hotkeys pressed in the background',
    summary:
      'A small Python tool that presses hotkeys in Tibia while the game window is minimised. Two years later, on the next pass over the project, out came a loop with no sleep, a Stop → Start race and concurrent key sending on one window.',
    kind: 'personal',
    year: '2024–2026',
    role: 'Author: app, build, ongoing development',
    stack: ['Python', 'Tkinter', 'pywinauto', 'PyInstaller', 'pytest'],
    links: {
      git: 'https://github.com/SkorczanFFF/tibia-key-presser',
      live: 'https://github.com/SkorczanFFF/tibia-key-presser/releases',
      liveLabel: '.exe',
    },
    projectId: 5,
  },
];
