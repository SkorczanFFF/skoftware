import type { CaseStudyBody } from '@/locale/types';

/**
 * Article bodies, keyed by slug. Kept out of the dictionary on purpose: the
 * dictionary ships in every page's bundle, while a body is only ever needed
 * on its own page, where `getStaticProps` hands it over as a prop. Slugs
 * must match `./caseStudies.ts` (`__tests__/locale/caseStudies.test.ts`).
 */
export const caseStudyBodies: Record<string, CaseStudyBody> = {
  'yawa-volumetric-clouds': {
    facts: [
      { value: '4 032', label: 'miejsco-godzin w kalibracji pokrycia' },
      { value: '4', label: 'poziomy jakości od desktopu po „potato”' },
      { value: '5–9', label: 'draw calli na klatkę, bez postprocessingu' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Yet Another Weather App zaczęła się w 2022 roku jako zwykła aplikacja pogodowa. Chciałem, żeby tło nie było ilustracją, tylko niebem policzonym z tej samej prognozy, którą widzi użytkownik: jeśli Open-Meteo mówi o niskim zachmurzeniu 80 procent i burzy, scena ma wyglądać jak zamknięty szary deck z gromem, a nie jak ładna animacja z biblioteki.',
      },
      {
        type: 'p',
        text: 'Gotowe rozwiązania odpadły po testach. Biblioteka chmur wolumetrycznych dla Three.js liczyła w pełnej rozdzielczości i zabijała średnie telefony, sprite’owe chmury z drei wyglądały płasko i topiły GPU overdrawem, a postprocessing dokładał kolejny pełnoekranowy pass. Do tego dochodził drugi problem: jak uczciwie przełożyć liczby z prognozy (pokrycie w warstwach, CAPE, wysokość warstwy granicznej, wiatr na poziomach ciśnienia) na parametry sceny, żeby model nie przeczył etykiecie „przeważnie bezchmurnie”.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Napisałem własny raymarcher w stylu Nubis (technika znana z Horizon Zero Dawn): promień idzie przez sferyczną powłokę nad zakrzywioną Ziemią, w metrach. Gęstość to szum Perlin-Worley kształtujący bryłę, gradient wysokości osobny dla stratusów, cumulusów i cumulonimbusów, remap polem pokrycia i erozja detalu szumem Worleya. Oświetlenie składa się z prawa Beera, efektu „powder”, trójlobowej funkcji fazowej Henyeya-Greensteina i trzech oktaw rozpraszania, a dwustrumieniowe „diffuse floor” pilnuje, żeby pełne zachmurzenie było szare, nie czarne.',
      },
      {
        type: 'p',
        text: 'Koszt na telefonach zbiłem czterema passami na ułamku canvasu. March rysuje jeden piksel z każdego bloku 2×2 na klatkę, a temporalny resolve reprojektuje historię po kierunku widoku i tnie ją do średniej ± 1,5σ z sąsiednich świeżych tekseli, więc duchy znikają bez rozmycia. Sam march jest adaptacyjny: tanie kroki przez puste powietrze, cofnięcie po trafieniu w chmurę, drobne kroki rzędu 2 procent dystansu. Cztery poziomy jakości dobierają DPR, liczbę kroków, rozmiar szumu 3D i zasięg; drei PerformanceMonitor schodzi poziom niżej, gdy klatki spadają poniżej 75 procent limitu.',
      },
      {
        type: 'p',
        text: 'Dane z prognozy przechodzą przez własny moduł fizyki chmur: podstawa z poziomu kondensacji (około 125 m na każdy stopień różnicy temperatury i punktu rosy), wierzchołek z warstwy granicznej i CAPE, wysokości warstw z poziomów ciśnienia, a grubość optyczna z grubości warstwy zmieszana z wartością odwróconą z indeksu klarowności. Pokrycie skalibrowałem tak, by liczba z API oznaczała dokładnie taki udział nieba, a nie „jakiś” próg szumu.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Shader rozbity na moduły: march, density, lighting, resolve. Stałe współdzielone między TypeScriptem a GLSL z jednego eksportu, więc nie rozjeżdżają się przy kolejnych zmianach.',
          'Dryf chmur w przestrzeni szumu z wiatru na 850 hPa (niskie) i 300 hPa (cirrusy), owinięty okresami kafli, bo float32 po dobie kwantował szum co 520 metrów.',
          'Bug sterownika ANGLE/D3D11 na Windows: texture() z niejawnymi pochodnymi w pętli zależnej od danych zwracał pusty promień i chmury w pobliżu kamery znikały. Poprawka to textureLod z poziomem 0.',
          'Model przeczył etykiecie: dla Jēkabpils API podawało „przeważnie bezchmurnie, 26 procent”, a warstwa niska 78 procent. Zmierzyłem to na 4 032 realnych miejsco-godzinach z 42 miejsc i wprowadziłem regułę: żadna warstwa nie przekracza totalu. Zamknięte decki pod totalem poniżej 50 procent spadły z 12 do 0, a korekta objęła 2,4 procent godzin.',
          'Klatki wydawane przez FrameRateGate co N-tą klatkę rAF zamiast bramki czasowej, która gubiła klatki losowo.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Scena działa bez postprocessingu i bez klucza API, w 5–9 draw callach na klatkę. Na desktopie cel chmur to połowa canvasu przy 64 oświetlonych krokach i szumie 128³, na najniższym poziomie jedna trzecia canvasu, 32 kroki i szum 64³, a na „potato” płaski deck. Przebudowa shadera na moduły zamknęła się bit-identycznym wynikiem na 760 000 porównań z 20 000 losowych wejść i o 197 kB mniejszym bundlem.',
      },
    ],
    lessons: [
      'Mierzyć, nie zgadywać: zmiana reguły pokrycia weszła dopiero po statystyce na tysiącach realnych godzin, a nie po jednym zrzucie ekranu.',
      'Czysta logika poza pętlą klatek i jedno źródło stałych dla TS i GLSL to warunek, żeby dało się rozwijać shader bez strachu.',
      'Premultiplied alpha z sRGB daje białe obwódki, uniformy float32 rosną w czasie, a renderer.info resetuje się w useFrame. Każde z tych kosztowało wieczór.',
    ],
  },
  'polonez-autodrive-rewrite': {
    facts: [
      { value: '16', label: 'błędów P0 znalezionych w wersji 1' },
      { value: '121', label: 'testów jednostkowych w wersji 2' },
      { value: '−29%', label: 'draw calli na klatkę po ograniczeniu cieni' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Pierwsza wersja z 2024 roku działała, ale źle się starzała: Three.js r116, czysty JavaScript bez bundlera, GUI na 600 linii kopiowanego kodu. Analiza pierwszej wersji, którą zrobiłem w październiku 2026, wypisała 16 błędów klasy P0. Trzy niezależne zegary (pętla gry, osobny requestAnimationFrame na obiekt i setTimeout) sprawiały, że na monitorze 144 Hz auto sterowało się 2,4 raza szybciej niż na 60 Hz. Pasek ładowania był fikcją z timerów od 2 do 8 sekund i przy gzipie pokazywał „Infinity%”. Do tego wycieki GPU bez dispose, hitbox większy od modelu, wireframe jako osobny klon synchronizowany ręcznie i ten sam plik FBX ładowany dwa razy.',
      },
      {
        type: 'p',
        text: 'Drugi problem pojawił się przy aktualizacji bibliotek: nowy FBXLoader triangulował niepłaskie czworokąty wzgórz algorytmem earcut i gubił 37 z 252 trójkątów. Modele z 3ds Max wracały z kamerami w hierarchii i kołami o osi poza środkiem, przez co opona biła przy obrocie.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Zamiast poprawiać stary kod w miejscu, przeniosłem projekt z czystego JS i HTML na Vite i nowy szkielet: skoro aktualizacja bibliotek zmieniała każdy plik, stary kod był więcej wart jako specyfikacja niż jako baza. Oznaczyłem wersję 1 tagiem, zrobiłem zrzuty referencyjne i w siedmiu fazach doszedłem do parytetu funkcji na Three.js r186 z Vite, a potem dokładałem nowe rzeczy.',
      },
      {
        type: 'p',
        text: 'Szkielet wersji 2 to jedna pętla na THREE.Timer z obcięciem delty do 0,1 s i podpięciem pod document, żeby ukryta karta nie skakała po powrocie; czysta maszyna stanów gry (idle, free, countdown, playing, gameover); ładowanie przez LoadingManager i Promise.all z prawdziwym postępem; jeden plik konfiguracji jako źródło palety, warstw, parametrów rozgrywki i tekstów.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Własny FanFBXLoader podmienia triangulację na wachlarz, tak jak robił to r116, więc wzgórza wracają w komplecie. Funkcja czyszcząca usuwa kamery z eksportu, a koła są centrowane na osi po wczytaniu.',
          'Scena proceduralna zamiast plików: seedowany szum simplex z ridged fBm, siatka wysokości dzielona wzdłuż przekątnej o mniejszej różnicy wysokości (grzbiety zamiast wzoru), chunki wzgórz jako taśmociąg wyrastający przed autem i zapadający się za nim, pasmo gór rozstąpione przed słońcem na drogę, miasto ze 175 wież z własną mgłą.',
          'Kolory w czasie rzeczywistym: lil-gui budowane w pętli z konfiguracji warstw, losowe palety ze schematów barw (komplementarne, triada, split, analogiczne) z pilnowanym kontrastem linii do wypełnienia co najmniej 3:1, przejście tweenem w sekundę, a HUD i panel przejmują odcień sceny.',
          'Wireframe liczony w shaderze z atrybutem odległości do krawędzi: szerokość w jednostkach świata i zanik małych trójkątów, bo linie GL mają 1 piksel i palmy w oddali zlewały się w plamę. Selektywny bloom na osobnej warstwie.',
          'Mini-gra: hitbox policzony raz na model, bounds auta raz na klatkę, pula sklonowanych materiałów do fade’ów, bo dispose przy spawnie dawał 40–70 ms przycięcia.',
          'Dotyk: przyciski ekranowe z setPointerCapture, minimalne 70° FOV w poziomie w pionowym kadrze i kamera przesuwająca się bokiem za autem.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Wersja 2 to około 5,6 tys. linii JavaScriptu z typowaniem w JSDoc, 121 testów jednostkowych w 23 plikach i CI, które przy każdym pushu sprawdza typy, testy i build. Cienie ograniczone do otoczenia auta zdjęły 18 procent trójkątów i 29 procent draw calli na klatkę. Z repozytorium zniknęło około 1,9 MB martwych plików, w tym 820 kB PNG słońca i siatki, które teraz liczą shadery.',
      },
    ],
    lessons: [
      'Jedna pętla i jedno źródło danych usuwają całe klasy błędów, nie pojedyncze bugi.',
      'Przeniesienie projektu na nowy szkielet bywa tańsze niż poprawianie go w miejscu, gdy aktualizacja i tak dotyka każdego pliku. Warunek: stary kod zostaje jako specyfikacja, z tagiem i zrzutami referencyjnymi.',
    ],
  },
  'capcam-head-tracking': {
    facts: [
      { value: '200 Hz', label: 'maksymalna częstotliwość wysyłki' },
      { value: '48 B', label: 'pakiet opentracka: sześć liczb f64' },
      { value: '12', label: 'sposobów zamocowania telefonu w jednym modelu' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Chciałem w BeamNG i Assetto Corsa rozglądać się ruchem głowy, ale TrackIR to drogi sprzęt, a rozwiązania na kamerę potrzebują światła i diod. Telefon ma żyroskop, Wi-Fi i da się go przyczepić do daszka czapki. Opentrack przyjmuje dane po UDP i podaje je grom przez protokół TrackIR, więc brakowało tylko aplikacji po stronie telefonu.',
      },
      {
        type: 'p',
        text: 'Problemy wyszły szybko. Żyroskop dryfuje w osi yaw, bo fuzja bez magnetometru nie ma odniesienia do północy. Pierwsze próbki po starcie sensora są nieświeże. Telefon może leżeć płasko na daszku, stać pionowo na czole albo bokiem na kasku, a każda pozycja zamienia osie. Android traktuje żądaną częstotliwość sensora jako podpowiedź, nie gwarancję. Ekran świecący pod daszkiem przeszkadza, a bez niego nie ma jak wcisnąć „recenter”. I wreszcie: użytkownicy wpisują adres z „whatismyip” albo mają włączony VPN, i pakiety nie docierają.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Dryf uznałem za cechę, nie błąd do kompensowania: zamiast walczyć z fizyką, recentrowanie jest tanie i zawsze pod ręką. Źródłem orientacji jest TYPE_GAME_ROTATION_VECTOR (żyroskop plus akcelerometr), więc pitch i roll trzymają się grawitacji, a yaw zeruje się offsetem kwaternionowym wokół osi Z. Tracker przez pierwsze 500 ms zwraca tożsamość i nie ustawia „przodu”, dopóki fuzja się nie ustabilizuje.',
      },
      {
        type: 'p',
        text: 'Pozycję noszenia opisałem jednym modelem zamiast ręcznych zamian osi: kierunek, w który patrzy ekran, razy krawędź, która jest „górą”, daje 12 montaży. Macierz głowa→urządzenie powstaje z iloczynu wektorowego, kwaternion metodą Shepperda, a orientacja głowy to złożenie obrotu urządzenia w świecie z obrotem głowy względem urządzenia. W interfejsie zostały trzy presety, przełącznik „telefon obrócony o 180°” i pozycja własna.',
      },
      {
        type: 'image',
        src: '/case-studies/capcam/opentrack_settings.png',
        width: 659,
        height: 568,
        alt: 'Główne okno opentracka: wejście UDP over network, wyjście freetrack 2.0 Enhanced, filtr Accela',
        caption:
          'Po stronie PC wystarczy opentrack z wejściem UDP na porcie 4242.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Protokół: 48-bajtowy pakiet opentracka (sześć f64 little-endian: x, y, z, yaw, pitch, roll) na port 4242 oraz własny 36-bajtowy format z kwaternionem, sekwencją i znacznikiem czasu na port 4243 dla modów. Jeden DatagramPacket reużywany, cały potok sensor→tracker→UDP na jednym HandlerThread z priorytetem wyświetlania i WifiLock w trybie low latency.',
          'Limiter częstotliwości trzyma harmonogram „kiedy należy wysłać” zamiast odstępu od ostatniej wysyłki: sensor na 101 Hz przy limicie 100 nie traci co drugiej próbki. Luz ćwierć interwału, bez nadrabiania po przerwie. Panel ostrzega, gdy realna częstotliwość spada poniżej 80 procent wybranej.',
          'Znaki osi dopasowane do opentracka (yaw dodatni to w prawo) przez dekompozycję R = Rz(−yaw)·Rx(pitch)·Ry(roll), z testem na ciągłość przy przejściu przez ±180°.',
          'Tryb czarnego ekranu: nakładka zakrywa wszystko z paskami systemowymi, jasność 0,01, FLAG_KEEP_SCREEN_ON, a przyciski głośności przechwycone w onKeyDown robią recenter z telefonem na głowie. Tap odsłania interfejs na 10 sekund.',
          'Wibracja potwierdzająca nie docierała, gdy użytkownik wyłączył haptykę dotyku: atrybuty wibracji zmienione na USAGE_HARDWARE_FEEDBACK.',
          'Wykrywanie sieci: ConnectivityManager z NetworkCapabilities rozpoznaje VPN i porównuje podsieć wpisanego adresu z adresem telefonu, odświeżając co 3 sekundy. Komunikat mówi wprost, od czego ma się zaczynać adres PC.',
          'Czułość per oś 0,5–3× i „side boost”: za progiem (domyślnie 20°) czułość rośnie gładko kwadratowo, więc środek jest spokojny, a skrajne spojrzenie obraca kamerę dalej, niż da się skręcić głowę bez utraty ekranu z oczu.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Potwierdzone w BeamNG.drive, Assetto Corsa, American Truck Simulator i Richard Burns Rally. Wysyłka do około 200 Hz z opcjami 60 i 100 Hz dla baterii, APK około 1,2 MB po R8, Android 8.0 wzwyż. Do mierzenia jittera i strat napisałem monitor UDP w Node, który liczy p50 i p99 odstępów między pakietami.',
      },
    ],
    lessons: [
      'Parametr częstotliwości sensora w Androidzie to podpowiedź; limiter musi zakładać, że próbki przyjdą szybciej i nierówno.',
      'Domyślna wibracja „dotykowa” jest wyciszana ustawieniem użytkownika. Sygnał potwierdzenia potrzebuje innego kanału.',
      'Dobrze dobrany model (12 montaży z dwóch wektorów) zastąpił rosnącą listę przypadków szczególnych.',
    ],
  },
  'skoftware-hero-particles': {
    facts: [
      { value: '8 000', label: 'cząsteczek tekstu bio po krzywych Béziera' },
      { value: '4', label: 'własne shadery GLSL' },
      { value: '1', label: 'zegar dla scrolla i animacji' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Strona ofertowa jednoosobowego software house’u ma sprzedawać usługi, więc nagłówek i przyciski muszą być w HTML z serwera, zanim załaduje się jakikolwiek JavaScript. Jednocześnie chciałem, żeby hero pokazywało, co umiem w 3D: portret rozsypany na cząsteczki, tekst bio płynący w stronę twarzy, reakcję na kursor i tapnięcia. Te dwa cele łatwo się gryzą: ciężki canvas opóźnia treść, a pole cząsteczek liczone na CPU tnie klatki na telefonach.',
      },
      {
        type: 'p',
        text: 'Drugi problem wyszedł po dodaniu płynnego przewijania: Lenis i ScrollTrigger miały osobne zegary, więc animacje sterowane scrollem lądowały klatkę za pozycją strony. Trzeci: po zmianie trasy ScrollTrigger przywracał pozycję przewijania poprzedniej strony, a kurtyna przejścia odsłaniała nową stronę w połowie.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Treść i scena są rozdzielone na poziomie Reacta: hero renderuje nagłówek, pitch i CTA po stronie serwera, a scena to chunk ładowany dynamicznie bez SSR, który „nigdy nie może blokować oferty”. Jeśli WebGL zawiedzie, ErrorBoundary pokazuje tekst zamiast pustki.',
      },
      {
        type: 'p',
        text: 'Portret jest zamieniany na cząsteczki w przeglądarce: obraz trafia na offscreen canvas zeskalowany do 220 pikseli szerokości, a pikselem-cząsteczką zostaje tylko ten, który ma alfa powyżej progu i luminancję poniżej progu. Wynik to InstancedBufferGeometry z jednym quadem i atrybutami instancji, rysowana w trybie multiply nad zwykłą płaszczyzną z teksturą. Tekst bio to 8 000 cząsteczek, z których każda ma punkt startu, dwa punkty kontrolne i koniec; krzywą i obrót liczy vertex shader, a CPU aktualizuje tylko czas.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Shockwave po tapnięciu: pointerdown na canvasie dodaje puls (współrzędne NDC plus czas) do pierścienia o pojemności dwóch, uruchamia navigator.vibrate(12) i ripple w CSS. Obwiednia pulsu (attack smoothstep do 0,08, release od 0,5 do 1) istnieje w jednej wersji w JS i w GLSL, więc kamera, portret i strumień oddychają w tym samym rytmie.',
          'Pozycja tapnięcia jest zapisywana w przestrzeni lokalnej obiektu, nie w NDC, bo przy dryfie kamery fala przesuwała się razem z nią. Sentinel poza ekranem zapobiega „fantomowemu” odpychaniu przed pierwszym tapnięciem.',
          'Kamera: na desktopie tłumiony ruch za kursorem (maath damp3), na telefonie wejście z żyroskopu z neutralnym pochyleniem 45° i zakresem 45°, z prośbą o uprawnienie na iOS przy pierwszym dotknięciu. Odmowa zostawia kamerę w centrum.',
          'Budżet renderu: dpr obcięty do 1, bez antialiasingu, frustum culling wyłączony na obu systemach cząsteczek, a pętla renderowania zatrzymywana przez IntersectionObserver, gdy hero wyjdzie z ekranu.',
          'Jeden zegar: Lenis tickowany z gsap.ticker i raportujący scroll do ScrollTrigger, z lagSmoothing(0). Scrubowane tweeny lądują w tej samej klatce co pozycja przewijania.',
          'Kurtyna przejść: po zmianie trasy czyszczenie pamięci scrolla ScrollTriggera, refresh i natychmiastowe scrollTo, a scroll blokowany przez wheel/touchmove zamiast overflow:hidden, bo znikający pasek przesuwał stronę w bok. Awaryjne odsłonięcie po 10 sekundach.',
          'prefers-reduced-motion wyłącza Lenis, prędkość scrolla, kurtynę i haptykę, a tweeny ScrollTriggera przyspiesza pięciokrotnie.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Oferta jest w pierwszym bajcie HTML, scena dojeżdża po niej i wygasza się, gdy nie jest widoczna. Cząsteczki portretu i tekstu liczy GPU, a wszystkie efekty (fala, kamera, scroll) chodzą na jednym zegarze. Strona jest poligonem: każdy nowy efekt motion najpierw trafia tutaj.',
      },
    ],
    lessons: [
      'Falę uderzeniową trzeba kotwiczyć w świecie, nie w ekranie. Każdy efekt zależny od kamery, który nie ma własnego układu odniesienia, będzie pływał.',
      'Dwa źródła czasu to zawsze klatka opóźnienia gdzieś w systemie. Lenis, GSAP i ScrollTrigger muszą tykać z jednego miejsca.',
    ],
  },
  'derdum-wyplatum-google-calendar': {
    facts: [
      { value: '197', label: 'testów silnika i adaptera' },
      { value: '0', label: 'serwerów: aplikacja rozmawia tylko z Google' },
      { value: '1 h', label: 'ważności tokenu bez refresh tokena' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Motorniczy trzyma grafik jako wydarzenia w Google Calendar, z tytułami w rodzaju „21/7” albo „22/7 + 22/6” (linia/brygada), pomiędzy wpisami prywatnymi. Chciał wiedzieć, ile wyjdzie brutto i netto w miesiącu: dodatki nocne, niedziele i święta, nadgodziny ponad wymiar z art. 130 Kodeksu pracy, potem ZUS, PIT i PPK. Aplikacja miała być PWA na telefon, bez logowania do niczego poza Google i bez serwera, który trzeba utrzymywać.',
      },
      {
        type: 'p',
        text: 'Bez backendu nie ma gdzie schować sekretu klienta ani refresh tokena. Prywatny link ICS odpadł: brak CORS i link działa jak hasło. Zostaje OAuth w przeglądarce z tokenem ważnym około godziny, a użytkownik nie może co godzinę klikać w okienka.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Google Identity Services w trybie implicit: initTokenClient bez client secret, Client ID jawnie w bundlu, projekt GCP w trybie Testing z listą test users. Token z czasem wygaśnięcia i zakresami trafia do localStorage z marginesem 60 sekund, a stan „zalogowany” ma jedno źródło prawdy: ważność tokenu, obserwowaną przez useSyncExternalStore.',
      },
      {
        type: 'p',
        text: 'Kalendarz jest jedyną bazą danych. Każdy zapis (insert, patch, delete) kończy się ponownym pobraniem miesiąca, a przeniesienie zmiany do innego miesiąca kasuje jego cache. Offline działa z kopii w localStorage per kalendarz i miesiąc, a po powrocie do karty aplikacja odświeża dane starsze niż 2 minuty.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Pobieranie tokenu nigdy nie otwiera okienka samo z siebie, bo przeglądarka blokuje popup bez gestu użytkownika. Okienko otwiera tylko kliknięcie, równoległe prośby dzielą jedną obietnicę, a po pierwszej zgodzie prompt jest pusty, więc kolejne odświeżenia przechodzą bez pytań.',
          'Zakres rozszerzony z odczytu do edycji wydarzeń w jednej, jednorazowej migracji klucza tokenu. Zapisane zakresy z odpowiedzi i accessRole z listy kalendarzy decydują, czy przyciski edycji są aktywne; kalendarz tylko do odczytu dostaje baner i link „otwórz w Kalendarzu Google” z wypełnionym wydarzeniem jako drogę bez API.',
          'Klient API: pętla po nextPageToken, singleEvents z sortowaniem po starcie, strefa Europe/Warsaw, odrzucanie wydarzeń anulowanych i innych niż domyślne, idempotentne usuwanie (410 traktowane jak sukces). fetch i pobieranie tokenu wstrzyknięte, więc adapter ma własne testy na fixture z dwiema stronami wyników.',
          'Silnik liczy w całkowitych groszach, zaokrągla raz na składnik i okres stawek z sumy minut (3 × 1 minuta to 185 groszy, nie 186). Okna dobowe iterują po dobach lokalnych na Temporal.Instant i mają testy na zmianę czasu: noc 22–6 przez marcową zmianę to 7 godzin, przez październikową 9.',
          'Święta liczone z Wielkanocy metodą Meeusa, wymiar z art. 130 sprawdzony na 21 miesiącach, kolizje zmian i urlopów wykrywane i pokazywane, ale nie zmieniają kwot.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Aplikacja działa jako PWA na Vercelu bez żadnego własnego serwera, z 197 testami na silniku i adapterze. Druga lektura kodu wyłapała błędy w kwotach (podwójnie liczone nieobecności, zaokrąglanie per zmiana) i wstrzyknięcie formuł w eksporcie CSV. Realny kalendarz testowy ma 101 wydarzeń na 2026 rok.',
      },
    ],
    lessons: [
      'Popup OAuth otwiera się tylko z gestu użytkownika. Każda ścieżka „odśwież token w tle” musi kończyć się przyciskiem, nie okienkiem.',
      'Zewnętrzny system jako jedyne źródło prawdy upraszcza aplikację, ale każdy zapis musi kończyć się ponownym odczytem.',
    ],
  },
  'tibia-key-presser-background-input': {
    facts: [
      { value: '8', label: 'klawiszy, każdy z własnym opóźnieniem' },
      { value: '100 ms', label: 'maksymalny czas reakcji na Stop' },
      { value: '780', label: 'linii Pythona w wersji wyjściowej' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Tibia ma powtarzalne akcje pod hotkeyami: leczenie, mana, runy. Chciałem, żeby program wciskał je sam w stałym rytmie, także gdy okno gry jest zminimalizowane, a ja robię coś innego. Symulowana klawiatura idzie do aktywnego okna, więc trzeba trafić w konkretne okno gry, a nie w to, które akurat ma fokus.',
      },
      {
        type: 'p',
        text: 'Pierwsza wersja z września 2024 działała, ale miała błędy, które zobaczyłem dopiero po powrocie do projektu w październiku 2026. Tkinter zgłasza nazwy klawiszy (Return, space, comma), których pywinauto nie zna; nieznany klawisz rzucał wyjątek, kod traktował go jak utratę okna, łączył się ponownie i próbował znowu. Pętla bez żadnego sleep, z tracebackiem co iterację i bez sygnału w interfejsie. Stop i Start w odstępie poniżej 100 ms wskrzeszały stare wątki, bo zdarzenie stop było jedno na cały czas życia aplikacji. Kolory, limity i ścieżki żyły w trzech miejscach naraz.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Wysyłka idzie przez pywinauto do uchwytu okna znalezionego po tytule „<klient> - <postać>” (wyrażenie regularne, opcjonalny clients.txt dla innych serwerów), a nie do aktywnego okna. Każdy klawisz ma własny wątek z absolutnym terminem następnego wciśnięcia, więc narzut wyszukiwania okna i wysyłki nie kumuluje się w dryf. Sen jest cięty na odcinki po 100 ms, żeby Stop reagował natychmiast, a uchwyt okna jest sprawdzany co 5 sekund.',
      },
      {
        type: 'p',
        text: 'Zanim ruszyłem z kodem, spisałem analizę: błędy z wagą, duplikacje, martwy kod, plan zmian etapami i pytania do decyzji. Zachowanie pywinauto sprawdziłem w źródłach wersji 0.6.9 zamiast zakładać, co robi.',
      },
      {
        type: 'image',
        src: '/case-studies/tibia-key-presser/tkp_off.png',
        width: 430,
        height: 179,
        alt: 'Tibia Key Presser w stanie spoczynku: wiersze klawisz i opóźnienie, przycisk Start',
        caption:
          'Stan spoczynku: białe pole czeka na kliknięcie i klawisz do powiązania.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Moduł keys.py: czysta funkcja tłumacząca nazwy klawiszy tkintera na kody pywinauto (Return na ENTER, Prior na PGUP, interpunkcja na znaki, cały numpad), a same modyfikatory nie wiążą się, więc Shift+F1 wiąże F1. Walidacja w chwili bindowania: nieobsługiwany klawisz to czerwone pole i komunikat, bez możliwości startu. Sześć testów w pytest.',
          'Pętla wysyłki odczekuje interwał po nieudanej wysyłce, więc trwały błąd nie zamienia się w busy loop.',
          'Jedno źródło prawdy: theme.py dla kolorów, fontów i stylów ttk, paths.py dla ścieżek w trybie źródłowym i w pliku .exe, więc ikona przestała zależeć od bieżącego katalogu.',
          'Narzędzia: pyproject z uv, ruff i pytest, build do pojedynczego .exe przez PyInstaller, clients.txt dla serwerów OTS.',
          'Zaplanowane, jeszcze nie wdrożone: jeden wątek-scheduler zamiast wątku na klawisz. W źródłach pywinauto wysyłka to SetKeyboardState i AttachThreadInput na współdzielonej kolejce wejścia, bez żadnej blokady, więc dwa wątki z pokrywającymi się terminami mogą sobie nadpisać stan klawiatury. Zserializowane wątki mają tę samą przepustowość co jeden scheduler, a Stop staje się set i join.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Do ośmiu klawiszy z niezależnymi opóźnieniami, działa przy zminimalizowanej grze, zatrzymuje się w około 100 ms i pokazuje nazwę postaci w tytule okna. Jeden plik .exe bez instalacji.',
      },
      {
        type: 'image',
        src: '/case-studies/tibia-key-presser/tkp_on.png',
        width: 430,
        height: 179,
        alt: 'Tibia Key Presser w trakcie pracy: zielone pola klawiszy i przycisk Stop',
        caption:
          'W trakcie pracy: zielony błysk pola oznacza klawisz właśnie wysłany do gry.',
      },
    ],
    lessons: [
      'Wyjątek łapany jako coś innego (nieznany klawisz jako utrata okna) tworzy pętle, których interfejs nie widzi. Każda gałąź błędu potrzebuje własnej reakcji i własnego odczekania.',
      'Powrót do własnego kodu po dwóch latach zaczyna się od spisanej analizy z wagami i planem. Zmiany robione przy okazji kosztują więcej.',
    ],
  },
};
