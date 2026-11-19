import type { CaseStudyEntry } from '@/locale/types';

/**
 * Order is the reading order: the home section lists them top to bottom and
 * the prev/next links on an article follow it. Everything but the prose
 * must match `data/en/caseStudies.ts`
 * (`__tests__/locale/caseStudies.test.ts`).
 */
export const caseStudies: CaseStudyEntry[] = [
  {
    slug: 'segregator-documents-ai',
    title: 'Segregator: paragony i gwarancje uporządkowane z jednego zdjęcia',
    summary:
      'Aplikacja, w której wystarczy sfotografować paragon, fakturę albo kartę gwarancyjną. Sama wycina dokument z tła i go prostuje, AI odczytuje wystawcę, kwotę i terminy, a użytkownik tylko sprawdza i zapisuje. Działa w chmurze AWS, z kontem demo dostępnym bez rejestracji.',
    kind: 'personal',
    year: '2026',
    role: 'Autor: projekt, aplikacja, chmura AWS, AI',
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
      alt: 'Segregator: lista dokumentów pogrupowanych według miesięcy, z filtrami okresu i rodzaju, kwotami i terminami',
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
    title: 'Yet Another Weather App: niebo policzone z prognozy pogody',
    summary:
      'Tło aplikacji pogodowej pokazuje niebo takie, jakie jest w wybranym miejscu: chmury powstają z liczb z prognozy, a nie z gotowej animacji. Własny silnik chmur 3D, który działa płynnie także na zwykłym telefonie.',
    kind: 'personal',
    year: '2022–2026',
    role: 'Autor: koncepcja, grafika 3D, model pogody, interfejs',
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
      'Scena w klimacie lat 80.: Polonez jedzie nocą ku zachodzącemu słońcu, a kolory całego świata zmienia się na żywo jak w kolorowance. Jak projekt z 2024 roku dostał nowe fundamenty, krajobraz tworzony przez program i mini-grę, która działa tak samo na każdym monitorze.',
    kind: 'personal',
    year: '2024–2026',
    role: 'Autor: modele 3D, kod, interfejs, wdrożenie',
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
    title: 'CapCam: telefon na czapce, który śledzi ruch głowy w grach',
    summary:
      'W symulatorach jazdy można rozglądać się ruchem głowy, ale zwykle wymaga to drogiego sprzętu. CapCam robi taki czujnik ze zwykłego telefonu z Androidem przypiętego do daszka czapki: aplikacja odczytuje obrót telefonu i wysyła go przez Wi-Fi do komputera, a gry widzą to jak profesjonalne urządzenie.',
    kind: 'personal',
    year: '2026',
    role: 'Autor: aplikacja, przesył danych, narzędzia pomiarowe',
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
    title: 'Derdum Wypłatum: wypłata policzona z grafiku w Kalendarzu Google',
    summary:
      'Kalkulator wynagrodzenia dla motorniczego, który sam czyta grafik zmian z Kalendarza Google i liczy pensję brutto i netto, z dodatkami za noce, niedziele, święta i nadgodziny. Bez własnego serwera i bez zakładania kolejnego konta.',
    kind: 'personal',
    year: '2026',
    role: 'Autor: projekt, połączenie z Google, obliczenia płac',
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
