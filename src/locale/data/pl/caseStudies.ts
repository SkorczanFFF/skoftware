import { SITE_URL } from '@/lib/site';

import type { CaseStudyEntry } from '@/locale/types';

/**
 * Order is the reading order: the home section lists them top to bottom and
 * the prev/next links on an article follow it. Everything but the prose
 * must match `data/en/caseStudies.ts`
 * (`__tests__/locale/caseStudies.test.ts`).
 */
export const caseStudies: CaseStudyEntry[] = [
  {
    slug: 'yawa-volumetric-clouds',
    title: 'Symulacja pogody na podstawie danych z API',
    summary:
      'Tło aplikacji pogodowej miało pokazywać prawdziwe niebo z prognozy, a nie animację. Własny raymarching w GLSL, fizyka chmur z danych Open-Meteo i render, który działa płynnie także na telefonie.',
    kind: 'personal',
    year: '2022–2026',
    role: 'Autor: koncepcja, shadery, fizyka, UI',
    stack: ['React', 'TypeScript', 'Three.js', 'GLSL', 'Sass', 'Open-Meteo'],
    cover: {
      src: '/projects/yawa.jpg',
      width: 1920,
      height: 1080,
      alt: 'Yet Another Weather App: scena 3D z chmurami nad mapą',
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
    title: 'Polonez Autodrive: ewolucja interaktywnej kolorowanki 3D',
    summary:
      'Synthwave’owa kolorowanka z mini-grą miała w pierwszej wersji 16 błędów klasy P0, trzy niezależne zegary i sterowanie zależne od odświeżania monitora. Analiza pierwszej wersji, przeniesienie projektu z czystego JS i HTML na Vite z nowym szkieletem oraz proceduralna scena w miejsce plików FBX.',
    kind: 'personal',
    year: '2024–2026',
    role: 'Autor: modele 3D, kod, UI, wdrożenie',
    stack: ['Three.js', 'Vanilla JS', 'GLSL', '3Ds Max', 'Vite', 'Vitest'],
    cover: {
      src: '/projects/polonez_autodrive.jpg',
      width: 1920,
      height: 1080,
      alt: 'Polonez Autodrive: Polonez jadący ku pasiastemu słońcu w stylu synthwave',
    },
    links: {
      live: 'https://www.polonez-autodrive.skoftware.pl/',
      git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    },
    projectId: 0,
  },
  {
    slug: 'capcam-head-tracking',
    title: 'CapCam: telefon na czapce jako head tracker do gier',
    summary:
      'Śledzenie głowy w symulatorach wyścigowych bez kamery i diod IR. Android czyta żyroskop, składa pozę z pozycją noszenia telefonu i wysyła ją po UDP do opentracka, który podaje się grom za TrackIR.',
    kind: 'personal',
    year: '2026',
    role: 'Autor: aplikacja, protokół, narzędzia pomiarowe',
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
    title: 'Portret z cząsteczek: scena 3D, która nie blokuje oferty',
    summary:
      'Hero tej strony zamienia zdjęcie w pole cząsteczek liczone na GPU i reaguje na kursor, żyroskop i dotyk. Warunek: nagłówek i wezwanie do działania mają być w pierwszym bajcie HTML, a scena ma mieścić się w budżecie telefonu.',
    kind: 'personal',
    year: '2025–2026',
    role: 'Autor: projekt, shadery, animacje, wydajność',
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
      alt: 'Hero strony SKOFTWARE: portret z cząsteczek nad nagłówkiem oferty',
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
    title: 'Derdum Wypłatum: Google Calendar jako baza danych bez serwera',
    summary:
      'Kalkulator wynagrodzenia motorniczego, który czyta grafik z Google Calendar. OAuth w czystym froncie bez backendu, token ważny godzinę, kalendarz jako jedyne źródło prawdy i silnik liczący w groszach.',
    kind: 'personal',
    year: '2026',
    role: 'Autor: architektura, integracja Google, silnik obliczeń',
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
    title: 'Tibia Key Presser: klawisze do gry wciskane w tle',
    summary:
      'Małe narzędzie w Pythonie, które wciska hotkeye w Tibii, gdy okno gry jest zminimalizowane. Dwa lata później, przy kolejnym podejściu do projektu, wyszły pętla bez sleep, wyścig przy Stop → Start i współbieżne wysyłanie klawiszy na jednym oknie.',
    kind: 'personal',
    year: '2024–2026',
    role: 'Autor: aplikacja, build, rozwój',
    stack: ['Python', 'Tkinter', 'pywinauto', 'PyInstaller', 'pytest'],
    links: {
      git: 'https://github.com/SkorczanFFF/tibia-key-presser',
      live: 'https://github.com/SkorczanFFF/tibia-key-presser/releases',
      liveLabel: '.exe',
    },
    projectId: 5,
  },
];
