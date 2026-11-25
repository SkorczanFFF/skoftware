import { SITE_URL } from '@/lib/site';

import type { ProjectEntry } from '@/locale/types';

export const projects: ProjectEntry[] = [
  {
    id: 6,
    pic: '/projects/segregator.jpg',
    pic2: '/projects/segregator_2.jpg',
    title: 'Segregator',
    technos:
      'TypeScript • React • Node.js • AWS (Lambda, DynamoDB, CDK) • Python • OpenCV',
    description:
      'Archiwum paragonów, faktur i gwarancji. Zdjęcie trafia przez kolejkę do Pythona z OpenCV, który wycina dokument z tła i prostuje perspektywę, a AI (Amazon Bedrock) podpowiada wystawcę, kwotę i daty. Serverless na AWS, infrastruktura w CDK, wdrożenia przez CodePipeline z zatwierdzeniem przed produkcją. Demo bez zakładania konta.',
    live: 'https://segregator.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/segregator',
  },
  {
    id: 0,
    pic: '/projects/bolones_autodrive.jpg',
    pic2: '/projects/bolones_autodrive_2.jpg',
    title: 'BOLONES AUTODRIVE',
    technos: 'JavaScript • Three.js • Rapier • 3D Studio Max',
    description:
      'Animacja 3D w stylu lat 80./synthwave w formie kolorowanki z personalizacją kolorów i modeli na scenie w czasie rzeczywistym za pomocą wbudowanego GUI. Bolones (FSO Polonez) i palmy powstały w 3D Studio Max, reszta sceny jest generowana proceduralnie. Trzy tryby gry i pełna obsługa dotyku.',
    live: 'https://www.bolones-autodrive.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/Bolones-Autodrive',
  },
  {
    id: 1,
    pic: '/projects/yawa.jpg',
    pic2: '/projects/yawa_2.jpg',
    title: 'Yet Another Weather App',
    navTitle: 'YAWA',
    technos:
      'React • React Three Fiber/Three.js • TypeScript • Sass • Open-Meteo API',
    description:
      'Kolejna aplikacja pogodowa, ale ta jest zgoła inna. Tło aplikacji to trójwymiarowa scena z wolumetrycznymi chmurami, symulująca pogodę w czasie rzeczywistym na podstawie danych z Open-Meteo. Prognoza pogody jest wyświetlana dla wybranego miasta przez mapę, geolokalizację lub wpisaną nazwę.',
    live: 'https://www.yet-another-weather-app.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
  },
  {
    id: 4,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'Ceny bez VAT widoczne po najechaniu na nie na dowolnej stronie. Automatycznie wykrywa ceny i wyświetla kwotę netto w dymku. Obsługuje ponad 120 krajów z wstępnie skonfigurowanymi walutami i stawkami VAT, umożliwia ustawienie własnej stawki i waluty. Zawiera wbudowany kalkulator VAT (brutto/netto). Dostępne w Chrome Web Store.',
    live: 'https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl',
    git: 'https://github.com/SkorczanFFF/VAT-OFF',
    liveLabel: 'Chrome Web Store',
  },
  {
    id: 2,
    pic: '/projects/pokedex.jpg',
    pic2: '/projects/pokedex_2.jpg',
    title: 'Pokédex',
    technos:
      'React • TypeScript • Vite • TailwindCSS • TanStack Query • i18next • PokéAPI',
    description:
      "Pokédex na PokéAPI (PL/EN). Versus liczy obrażenia i trafienia do nokautu, tabela typów notuje zmiany między generacjami; do tego umiejętności, ewolucje, lokacje, okrzyki i opisy czytane na głos. Do wyboru dwie ery, a w Retro świat z czasów Gen II: 251 Pokémonów, ówczesne typy i statystyki, ruchy i sprite'y z Crystala oraz puchary Pokémon Stadium.",
    cvDescription:
      'Pokédex na PokéAPI (PL/EN). Versus liczy obrażenia i trafienia do nokautu, tabela typów notuje zmiany między generacjami; do tego umiejętności, ewolucje, lokacje, okrzyki i opisy czytane na głos. Do wyboru dwie ery, w tym Retro z czasów Gen II.',
    live: 'https://www.pokedex.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/pokedex',
  },
  {
    id: 3,
    pic: '/projects/skoftware.jpg',
    pic2: '/projects/skoftware2.jpg',
    title: 'SKOFTWARE - moje portfolio',
    navTitle: 'SKOFTWARE',
    technos:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • GSAP • i18n',
    description:
      'Moja strona portfolio — poligon do eksperymentów webowych. Zawiera scenę 3D stworzoną w React Three Fiber, przejścia i animacje w GSAP oraz i18n do obsługi wielojęzyczności. Wyposażona w webową wersję CV (HTML i CSS) w języku polskim i angielskim. Projekt nieustannie ewoluujący, prawdopodobnie nigdy nie wyjdzie z fazy "WIP".',
    live: SITE_URL,
    git: 'https://github.com/SkorczanFFF/skoftware',
  },
];
