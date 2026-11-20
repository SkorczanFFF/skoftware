import type { CaseStudyEntry } from '@/locale/types';

/**
 * Order is the reading order: the home section lists them top to bottom and
 * the prev/next links on an article follow it. Everything but the prose
 * must match `data/pl/caseStudies.ts`
 * (`__tests__/locale/caseStudies.test.ts`).
 */
export const caseStudies: CaseStudyEntry[] = [
  {
    slug: 'segregator-documents-ai',
    title: 'Segregator: receipts and warranties sorted from a single photo',
    summary:
      'An app where a photo of a receipt, an invoice or a warranty card is enough. It cuts the document out and straightens it, AI reads the issuer, amount and deadlines, and the user only checks and saves. Runs on AWS, with a demo that needs no sign-up.',
    kind: 'personal',
    year: '2026',
    role: 'Author: design, app, AWS cloud, AI',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'AWS Lambda',
      'DynamoDB',
      'Python',
      'OpenCV',
      'Amazon Bedrock',
    ],
    cover: {
      src: '/projects/segregator.jpg',
      width: 1920,
      height: 1080,
      alt: 'Segregator: a list of documents grouped by month, with filters by period and type, amounts and deadlines',
    },
    links: {
      live: 'https://segregator.skoftware.pl/',
      git: 'https://github.com/SkorczanFFF/segregator',
    },
    projectId: 6,
    serviceSlug: 'integracja-ai',
  },
  {
    slug: 'yawa-volumetric-clouds',
    title: 'Yet Another Weather App: a sky computed from the forecast',
    summary:
      'The background of a weather app shows the sky as it really is over the chosen place: the clouds are built from the forecast numbers, not from a ready-made animation. A custom 3D cloud engine that runs smoothly on an ordinary phone too.',
    kind: 'personal',
    year: '2022–2026',
    role: 'Author: concept, 3D graphics, weather model, interface',
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
      'An 80s-style scene: a Polonez drives through the night towards the setting sun, and the colours of the whole world change live, like in a colouring book. How a project from 2024 got new foundations, a landscape drawn by code and a mini-game that plays the same on every monitor.',
    kind: 'personal',
    year: '2024–2026',
    role: 'Author: 3D models, code, interface, deployment',
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
    title: 'CapCam: a phone on a cap that tracks your head in games',
    summary:
      'In driving simulators you can look around by turning your head, but it usually takes expensive hardware. CapCam turns an ordinary Android phone clipped to the peak of a cap into that sensor: the app reads how the phone turns and sends it over Wi-Fi to the computer, and games see it as a professional device.',
    kind: 'personal',
    year: '2026',
    role: 'Author: app, data transfer, measurement tools',
    stack: ['Kotlin', 'Jetpack Compose', 'Android', 'UDP', 'opentrack'],
    links: {
      git: 'https://github.com/SkorczanFFF/capcam',
      live: 'https://github.com/SkorczanFFF/capcam/releases/latest',
      liveLabel: 'APK',
    },
    serviceSlug: 'aplikacje-mobilne',
  },
  {
    slug: 'derdum-wyplatum-google-calendar',
    title: 'Derdum Wypłatum: pay worked out from a Google Calendar roster',
    summary:
      'A pay calculator for a tram driver that reads the shift roster from Google Calendar by itself and works out gross and net pay, with the extras for nights, Sundays, public holidays and overtime. No server of its own and no new account to create.',
    kind: 'personal',
    year: '2026',
    role: 'Author: design, Google connection, pay calculations',
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
];
