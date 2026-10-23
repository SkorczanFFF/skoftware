import { SITE_URL } from '@/lib/site';

import type { ProjectEntry } from '@/locale/types';

export const projects: ProjectEntry[] = [
  {
    id: 0,
    pic: '/projects/polonez_autodrive.jpg',
    pic2: '/projects/polonez_autodrive_2.jpg',
    title: 'POLONEZ AUTODRIVE',
    technos: 'JavaScript • Three.js • 3D Studio Max',
    description:
      'An 80s/synthwave-style 3D animation in the form of a coloring book, with real-time customization of colors and models in the scene via a built-in GUI. The Polonez and palm tree models were made in 3D Studio Max, the rest of the scene is generated procedurally. Includes an arcade mini-game.',
    live: 'https://www.polonez-autodrive.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    inResume: true,
  },
  {
    id: 1,
    pic: '/projects/yawa.jpg',
    pic2: '/projects/yawa_2.jpg',
    title: 'Yet Another Weather App',
    technos:
      'React • React Three Fiber/Three.js • TypeScript • Sass • Open-Meteo API',
    description:
      'Weather apps are a dime a dozen, but this one is built differently. The background is a 3D scene with volumetric clouds that simulates the weather in real time from Open-Meteo data. The forecast is shown for a city selected via map, geolocation or entered city name.',
    live: 'https://www.yet-another-weather-app.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    inResume: true,
  },
  {
    id: 2,
    pic: '/projects/pokedex.jpg',
    pic2: '/projects/pokedex_2.jpg',
    title: 'Pokédex',
    technos:
      'React • TypeScript • Vite • TailwindCSS • TanStack Query • i18next • PokéAPI',
    description:
      "A PokéAPI-powered Pokédex with a retro mode, move lists, evolution chains and a preview of sprites from every game version on each Pokémon's page. Interface in Polish and English. Started as a recruitment task, developed further as a hobby.",
    live: 'https://www.pokedex.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/pokedex',
  },
  {
    id: 3,
    pic: '/projects/skoftware.jpg',
    pic2: '/projects/skoftware2.jpg',
    title: 'SKOFTWARE - my portfolio',
    technos:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • GSAP • i18n',
    description:
      'My portfolio website — a playground for web experiments. Features a 3D scene built in React Three Fiber, transitions and animations in GSAP, and i18n for multilingual support. Also includes a built-in web version of my resume in Polish and English. A project in constant evolution, probably never leaving "WIP" status.',
    live: SITE_URL,
    git: 'https://github.com/SkorczanFFF/mskorus-remaster',
    inResume: true,
  },
  {
    id: 4,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'See prices excluding VAT when you hover over them on any website. Automatically detects prices and displays the net amount in a tooltip on hover. Supports 120+ countries with preconfigured currencies and VAT rates, and allows custom VAT rate and currency. Features a built-in VAT calculator (GROSS/NET). Available on the Chrome Web Store.',
    live: 'https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl',
    git: 'https://github.com/SkorczanFFF/VAT-OFF',
    liveLabel: 'Chrome Web Store',
    inResume: true,
  },
  {
    id: 5,
    pic: '/projects/tba.jpg',
    title: '★ Tibia Key Presser',
    technos: 'Python • Tkinter • pywinauto',
    description:
      'A lightweight Python automation tool for Tibia (MMORPG), supporting up to eight configurable key-delay pairs. Auto-detects the game window, runs silently in the background without interrupting other activities or games.',
    live: '',
    git: 'https://github.com/SkorczanFFF/tibia-key-presser',
    inResume: true,
    resumeOnly: true,
  },
];
