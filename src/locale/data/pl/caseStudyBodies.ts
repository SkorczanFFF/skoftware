import type { CaseStudyBody } from '@/locale/types';

/**
 * Article bodies, keyed by slug. Kept out of the dictionary on purpose: the
 * dictionary ships in every page's bundle, while a body is only ever needed
 * on its own page, where `getStaticProps` hands it over as a prop. Slugs
 * must match `./caseStudies.ts` (`__tests__/locale/caseStudies.test.ts`).
 */
export const caseStudyBodies: Record<string, CaseStudyBody> = {
  'segregator-documents-ai': {
    facts: [
      { value: '7', label: 'rodzajów dokumentów, od paragonu po umowę' },
      {
        value: '3',
        label:
          'kroki dodania dokumentu: zdjęcie, odczyt przez AI i sprawdzenie',
      },
      {
        value: '100',
        label: 'odczytów AI na konto miesięcznie, więc koszt jest znany z góry',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Paragony, faktury, gwarancje i polisy zwykle lądują w szufladzie albo w galerii telefonu, między zdjęciami z wakacji. Kiedy trzeba oddać sprzęt na gwarancję albo sprawdzić, do kiedy jest ważna polisa, zaczyna się szukanie. Chciałem aplikacji, w której wystarczy zrobić zdjęcie dokumentu, a resztę zrobi ona: wytnie kartkę z tła, odczyta najważniejsze dane i odłoży dokument na właściwe miejsce, z terminem na wierzchu.',
      },
      {
        type: 'p',
        text: 'Zdjęcia z telefonu rzadko są idealne: kartka leży krzywo, na wzorzystym obrusie albo w świetle padającym z boku. Sztuczna inteligencja potrafi odczytać dokument, ale bywa, że się pomyli, a każdy odczyt kosztuje. Do tego to prywatne dokumenty z kwotami, adresami i numerami, więc muszą być dobrze chronione.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Dodawanie dokumentu podzieliłem na trzy kroki, które użytkownik widzi jeden po drugim. Najpierw zdjęcie: osobny program w Pythonie szuka na nim kartki, wycina ją z tła i prostuje tak, jakby była zeskanowana. Potem odczyt: AI wypełnia rodzaj dokumentu, wystawcę, kwotę i daty. Na końcu sprawdzenie: każde pole wypełnione przez AI jest oznaczone, można je poprawić, a nic nie zapisuje się bez kliknięcia „Zapisz”.',
      },
      {
        type: 'p',
        text: 'Aplikacja działa w chmurze Amazona (AWS) w modelu, w którym płaci się za faktyczne użycie, a nie za serwer włączony przez całą dobę. Cała konfiguracja chmury jest zapisana w kodzie, więc da się ją odtworzyć od zera jednym poleceniem. Każda zmiana trafia najpierw na wersję testową, a na produkcję dopiero po moim zatwierdzeniu.',
      },
      {
        type: 'image',
        src: '/case-studies/segregator/before-after.jpg',
        width: 1800,
        height: 800,
        alt: 'Sześć fikcyjnych dokumentów: u góry krzywe zdjęcia na stole, u dołu te same kartki wycięte z tła i wyprostowane',
        caption:
          'U góry zdjęcia z telefonu, u dołu to samo po automatycznej obróbce. Dokumenty są fikcyjne, wygenerowane do konta demo.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Prostowanie zdjęć: program szuka kartki na kilka sposobów (po jasności, po bieli papieru i po krawędziach) i wybiera najwyraźniejszy wynik, więc radzi sobie na drewnianym stole, na obrusie w kropki czy w kratkę i przy świetle z boku. Oryginał zostaje obok, a użytkownik wybiera, którą wersję zachować.',
          'Odczyt przez AI: model Amazon Nova zwraca dane w ściśle określonej formie, a aplikacja sprawdza je regułami danego rodzaju dokumentu. Paragon nie dostanie terminu płatności, a podkategoria spoza listy przepada. Odczyt trwa kilka sekund.',
          'Koszty pod kontrolą: każde konto ma 100 odczytów AI miesięcznie i 500 MB na pliki, a cała aplikacja ma wspólny limit odczytów, którego nie przekroczy. Pliki starsze niż 90 dni przechodzą do tańszego magazynu, za mniej więcej jedną piątą ceny, i dalej otwierają się od razu.',
          'Prywatność: zdjęcie jest zmniejszane jeszcze w telefonie, co przy okazji usuwa zapisaną w nim lokalizację. Pliki leżą w prywatnym, zaszyfrowanym magazynie, a link do pliku działa 5 minut i tylko dla właściciela konta. Konto można usunąć razem ze wszystkimi dokumentami.',
          'Porządek jak w segregatorze: dokumenty są pogrupowane według miesięcy jak przekładki, każdy rodzaj ma swój kolor i ikonę, a termin nazywa się tak jak na dokumencie: „zapłać do” na fakturze, „gwarancja do” na karcie gwarancyjnej, „ważna do” na polisie. Ten sam plik dodany drugi raz, nawet z innego urządzenia, zostanie rozpoznany.',
          'Wygoda: logowanie e-mailem albo przez Google, wersja polska i angielska, tryb jasny i ciemny. Na telefonie zdjęcie robi się prosto z aplikacji, a menu jest na dole ekranu, pod kciukiem.',
          'Demo bez rejestracji: konto tylko do podglądu z fikcyjnymi dokumentami. Wygenerowałem je jako zdjęcia „z telefonu” i przepuściłem przez tę samą obróbkę co prawdziwe pliki, więc demo pokazuje dokładnie to, co dzieje się z dokumentem użytkownika.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Segregator działa pod adresem segregator.skoftware.pl, a konto demo otwiera się jednym kliknięciem, bez rejestracji. Od zdjęcia do zapisanego dokumentu prowadzi kilka kroków: dodać zdjęcie, zatwierdzić wyprostowaną wersję, odczytać dane przez AI, sprawdzić i zapisać. Następny etap to przypomnienia e-mailem o zbliżających się terminach, np. o końcu gwarancji.',
      },
    ],
    lessons: [
      'AI najlepiej sprawdza się jako podpowiedź, a nie decyzja. Oznaczone pola i sprawdzenie przed zapisem sprawiają, że pomyłka modelu kosztuje jedno kliknięcie, a nie zły wpis w archiwum.',
      'Limity ustawione od pierwszego dnia sprawiają, że koszt chmury i AI jest znany z góry, zanim pojawi się pierwszy użytkownik.',
      'Demo zbudowane z tych samych elementów co prawdziwa aplikacja mówi więcej niż zrzuty ekranu i nie trzeba w nim niczego udawać.',
    ],
  },
  'yawa-volumetric-clouds': {
    facts: [
      {
        value: '4 032',
        label:
          'godzin prawdziwej pogody z 42 miejsc, użytych do sprawdzenia zachmurzenia',
      },
      {
        value: '1/4',
        label:
          'punktów obrazu chmur liczonych w każdej klatce, resztę uzupełniają poprzednie',
      },
      {
        value: '4',
        label: 'poziomy jakości, od mocnego komputera po słaby telefon',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Yet Another Weather App zaczęła się w 2022 roku jako zwykła aplikacja pogodowa. Chciałem, żeby jej tło nie było ozdobnikiem, tylko pokazywało niebo, które naprawdę jest nad wybranym miejscem. Jeśli prognoza mówi o niskich, gęstych chmurach i burzy, na ekranie ma być ciężkie, szare niebo z błyskawicami, a nie ładna animacja słoneczka.',
      },
      {
        type: 'p',
        text: 'Wyzwania były dwa. Realistyczne chmury 3D mocno obciążają sprzęt, a gotowe rozwiązania, które przetestowałem, albo wyglądały płasko, albo nie nadążały na telefonach. Do tego prognoza to suche liczby: procent zachmurzenia na kilku wysokościach, wilgotność, energia burzowa, wiatr. Trzeba je było przełożyć na wygląd nieba tak, żeby obraz zgadzał się z opisem pogody obok.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Napisałem własny silnik chmur, wzorowany na technice znanej z gry Horizon Zero Dawn. Dla każdego punktu ekranu program wysyła w niebo promień i sprawdza, ile chmury napotyka po drodze i jak przechodzi przez nią światło słońca. Dzięki temu chmury mają objętość, prześwitują na brzegach, a przy pełnym zachmurzeniu niebo jest szare, a nie czarne.',
      },
      {
        type: 'p',
        text: 'Żeby to działało na telefonie, w każdej klatce liczony jest tylko co czwarty punkt obrazu chmur, a resztę uzupełniają poprzednie klatki. Promień robi duże kroki przez puste powietrze i drobne dopiero w chmurze. Aplikacja wybiera jeden z czterech poziomów jakości i sama schodzi niżej, gdy urządzenie przestaje nadążać.',
      },
      {
        type: 'p',
        text: 'Liczby z prognozy (darmowe dane z Open-Meteo) przechodzą przez moduł, który zamienia je na kształt nieba. Z temperatury i punktu rosy liczy, na jakiej wysokości zaczynają się chmury, z energii burzowej, jak wysoko urosną, a z wiatru na różnych wysokościach, w którą stronę i jak szybko płyną.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Zachmurzenie, które się zgadza: sprawdziłem prognozy z 4 032 godzin w 42 miejscach i dopasowałem obraz tak, żeby „80 procent zachmurzenia” zakrywało 80 procent nieba. Do tego reguła, że żadna warstwa chmur nie może być gęstsza niż zachmurzenie ogółem, więc „przeważnie bezchmurnie” nigdy nie pokazuje nieba zasnutego chmurami.',
          'Rodzaje chmur: płaskie warstwy, kłębiaste cumulusy i burzowe cumulonimbusy mają własne kształty, a światło słońca przenika je i rozprasza się w nich jak w prawdziwych chmurach.',
          'Chmury płyną z wiatrem: niskie z wiatrem z wysokości około półtora kilometra, a wysokie, pierzaste z wiatrem z około dziewięciu kilometrów.',
          'Cztery poziomy jakości: na komputerze chmury są liczone dokładniej i w lepszej rozdzielczości, na słabszym telefonie prościej, a na najsłabszych urządzeniach scena przechodzi w płaską warstwę chmur.',
          'Porządek w kodzie: silnik chmur jest podzielony na niezależne części (kształt, światło, składanie klatek), a wspólne ustawienia mają jedno źródło dla całej aplikacji, więc kolejne zmiany nie rozjeżdżają się między częściami.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Tło aplikacji pokazuje niebo policzone z tej samej prognozy, którą widzi użytkownik, i działa płynnie od mocnego komputera po zwykły telefon, bez płatnego dostępu do danych. Pogodę można sprawdzić dla miasta wskazanego na mapie, wpisanego z nazwy albo z lokalizacji telefonu. Po podziale silnika na części obraz wyszedł identyczny jak wcześniej, co sprawdziłem automatycznie na 20 000 losowych ustawieniach, a aplikacja zmniejszyła się o 197 kB.',
      },
    ],
    lessons: [
      'Najpierw zmierzyć, potem zmieniać: zasada zachmurzenia weszła dopiero po sprawdzeniu tysięcy prawdziwych godzin, a nie na podstawie jednego zrzutu ekranu.',
      'Efektowna grafika 3D w przeglądarce działa też na telefonie, jeśli od początku zakłada się, że różne urządzenia dostaną różną jakość.',
    ],
  },
  'bolones-autodrive-rewrite': {
    facts: [
      {
        value: '255',
        label: 'testów automatycznych uruchamianych przy każdej zmianie',
      },
      {
        value: '175',
        label: 'wież miasta na horyzoncie, ustawionych przez program',
      },
      {
        value: '−29%',
        label: 'poleceń rysowania na klatkę dzięki cieniom tylko wokół auta',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Bolones Autodrive to animowana scena w stylu synthwave: Bolones jedzie nocą między palmami i górami ku pasiastemu słońcu. Wszystko da się przemalować na żywo z panelu kolorów, jak w kolorowance, a obok swobodnej jazdy są trzy tryby gry. Na drodze jeżdżą auta z czasów PRL, uproszczone na potrzeby gry: Ramses (dostawczy Żuk), Kredens (Fiat 125p) i Polakito (Fiat 126p). W Dodge lawiruje się między autami jadącymi z naprzeciwka, a każde minięte to punkt. W Crash w auta wjeżdża się celowo: im większa kraksa, tym więcej punktów. W Overtake wyprzedza się wolne auta jadące w tę samą stronę, zjeżdżając na przeciwny pas, i każde wyprzedzone to punkt. Bolones, palmy i skały powstały w 3ds Max, a auta z ruchu są budowane w kodzie na podstawie rysunków technicznych.',
      },
      {
        type: 'p',
        text: 'Pierwsza wersja powstała w 2024 roku na bibliotekach, które od tamtej pory mocno się zmieniły. Chciałem rozwinąć projekt o krajobraz tworzony przez program, losowe palety barw i obsługę dotyku, a mini-grę dopracować tak, żeby miała to samo tempo na każdym monitorze, niezależnie od tego, jak szybko odświeża obraz.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Zamiast łatać stary kod, przeniosłem projekt na nowoczesne narzędzia (Vite i aktualny Three.js) i zbudowałem go od nowa na nowym szkielecie. Pierwsza wersja posłużyła za wzór: zachowałem ją w historii projektu, zrobiłem zrzuty ekranu do porównań i w siedmiu etapach odtworzyłem wszystkie jej funkcje, a dopiero potem dokładałem nowe.',
      },
      {
        type: 'p',
        text: 'Nowy szkielet opiera się na kilku prostych zasadach. Cała scena chodzi na jednym zegarze, więc animacja i sterowanie mają to samo tempo na każdym ekranie, a po powrocie do karty przeglądarki nic nie przeskakuje. Gra przechodzi przez jasno określone etapy: menu, wybór trybu, swobodna jazda, odliczanie, rozgrywka, koniec. Kolory, ustawienia rozgrywki i teksty są w jednym pliku konfiguracji, a pasek ładowania pokazuje prawdziwy postęp wczytywania.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Krajobraz tworzony przez program: wzgórza powstają z matematycznego szumu i układają się w grzbiety, wyrastają przed autem i zapadają się za nim jak na taśmociągu. Pasmo gór rozstępuje się przed słońcem, robiąc miejsce na drogę, a na horyzoncie stoi miasto ze 175 wież we własnej mgle.',
          'Kolorowanka na żywo: panel kolorów buduje się sam z listy elementów sceny. Losowanie tworzy paletę z klasycznych zestawień barw (kolory dopełniające, triada, kolory sąsiednie) i pilnuje, żeby linie zawsze odcinały się od wypełnienia. Nowe kolory przechodzą płynnie w ciągu sekundy, a napisy na ekranie i panel przejmują odcień sceny.',
          'Charakterystyczna siatka linii: kontury mają stałą grubość w świecie gry i wygaszają się na drobnych elementach, więc palmy w oddali nie zlewają się w plamę. Słońce i siatkę podłoża rysuje na bieżąco karta graficzna zamiast gotowych obrazków, a poświata obejmuje tylko wybrane elementy.',
          'Modele z 3ds Max wczytują się w komplecie, tak jak zostały wymodelowane, a koła są ustawiane na środku osi, więc obracają się równo.',
          'Tryby gry: obszar kolizji jest dopasowany do rozmiaru każdego modelu, a ruch na drodze pojawia się i znika płynnie, bez przycięć.',
          'Kraksy na fizyce: zderzenia liczy silnik fizyki Rapier, karoserie się wgniatają, części odpadają, a wrakiem można jechać dalej, aż zgaśnie silnik. Po kraksie kamera przeskakuje między autami, żeby obejrzeć zniszczenia.',
          'Telefon i tablet: kamerę obraca się palcem i przybliża dwoma, scenę przemalowuje się z panelu bocznego, w swobodnej jeździe i w grach sterują przyciski na ekranie, a gry włączają się poziomo, na pełnym ekranie. W pionowym kadrze widok jest poszerzony, a kamera przesuwa się bokiem za autem.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Nowa wersja ma 255 testów automatycznych, które przy każdej zmianie w kodzie sprawdzają działanie i budowanie projektu. Cienie ograniczone do otoczenia auta zmniejszyły liczbę trójkątów w klatce o 18 procent, a poleceń rysowania o 29 procent. Z projektu zniknęło około 1,9 MB zbędnych plików, w tym obrazki słońca i siatki, które teraz rysuje karta graficzna.',
      },
    ],
    lessons: [
      'Jeden zegar i jedno miejsce na ustawienia upraszczają cały projekt: wszystko dzieje się w tym samym rytmie, a zmiana koloru czy parametru gry to jedna linijka w konfiguracji.',
      'Gdy aktualizacja i tak dotyka każdego pliku, zbudowanie projektu od nowa na nowym szkielecie bywa szybsze niż poprawki w miejscu. Warunek: stara wersja zostaje jako wzór, ze zrzutami ekranu do porównań.',
    ],
  },
  'capcam-head-tracking': {
    facts: [
      {
        value: '200 Hz',
        label: 'czyli do 200 odczytów pozycji głowy na sekundę',
      },
      {
        value: '12',
        label: 'sposobów zamocowania telefonu opisanych jednym modelem',
      },
      { value: '4', label: 'gry, w których działanie zostało potwierdzone' },
    ],
    problem: [
      {
        type: 'p',
        text: 'W grach takich jak BeamNG czy Assetto Corsa można rozglądać się po kokpicie ruchem głowy: lekki obrót głowy obraca widok w grze mocniej, więc oczy cały czas widzą monitor. Służą do tego specjalne urządzenia, jak drogi TrackIR, albo rozwiązania z kamerą, które potrzebują dobrego światła i diod. Tymczasem telefon ma w środku czujniki ruchu i Wi-Fi, a przypięty do daszka czapki porusza się razem z głową.',
      },
      {
        type: 'p',
        text: 'Do rozwiązania było kilka rzeczy naraz. Czujniki telefonu z czasem „odpływają” w poziomie, bo bez kompasu nie wiedzą, gdzie jest przód. Telefon można przypiąć na różne sposoby: płasko na daszku, pionowo na czole albo bokiem na kasku. Świecący ekran tuż nad oczami przeszkadza w grze. A połączenie z komputerem musi zadziałać od razu, bez grzebania w ustawieniach sieci.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Po stronie komputera wykorzystałem darmowy program opentrack, który przyjmuje dane przez sieć i przekazuje je grom tak, jakby pochodziły z TrackIR. Brakowało aplikacji na telefon, więc ją napisałem.',
      },
      {
        type: 'p',
        text: 'Zamiast walczyć z „odpływaniem”, postawiłem na to, żeby ustawienie przodu było natychmiastowe i zawsze pod ręką: jeden przycisk albo klawisz głośności, także z telefonem na głowie. Pochylenie i przechylenie głowy opierają się na grawitacji, więc nie odpływają wcale. Przez pierwsze pół sekundy po starcie aplikacja czeka, aż czujniki się ustabilizują.',
      },
      {
        type: 'p',
        text: 'Różne sposoby zamocowania opisałem jednym prostym modelem: w którą stronę patrzy ekran i która krawędź telefonu jest na górze. Z tych dwóch informacji wychodzi 12 możliwych ustawień. W aplikacji zostały trzy gotowe do wyboru, przełącznik „telefon obrócony o 180°” i ustawienie własne.',
      },
      {
        type: 'image',
        src: '/case-studies/capcam/opentrack_settings.png',
        width: 659,
        height: 568,
        alt: 'Główne okno opentracka: wejście UDP over network, wyjście freetrack 2.0 Enhanced, filtr Accela',
        caption:
          'Po stronie komputera wystarczy darmowy opentrack ustawiony na odbiór danych z sieci.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Szybki i równy przesył: do 200 odczytów na sekundę przez Wi-Fi w trybie niskich opóźnień, z opcjami 60 i 100 na sekundę, które oszczędzają baterię. Aplikacja trzyma stały rytm wysyłki i ostrzega, gdy telefon nie nadąża za wybraną częstotliwością.',
          'Tryb czarnego ekranu: ekran gaśnie prawie do zera i nie przeszkadza, telefon nie usypia, a klawisze głośności ustawiają przód. Dotknięcie ekranu pokazuje interfejs na 10 sekund. Wibracja potwierdza ustawienie przodu, także gdy w systemie wyłączone są wibracje przy dotyku.',
          'Pomoc przy połączeniu: aplikacja wykrywa włączony VPN i sprawdza, czy wpisany adres komputera jest w tej samej sieci domowej co telefon. Komunikat mówi wprost, od czego powinien zaczynać się adres.',
          'Czułość osobno dla każdego kierunku, od 0,5 do 3 razy, i wzmocnienie na bokach: przy małych ruchach widok jest spokojny, a im mocniej odwracasz głowę, tym dalej obraca się kamera, więc monitor nie znika z oczu.',
          'Dla twórców modyfikacji do gier: drugi, dokładniejszy strumień danych z numerem i czasem każdego odczytu.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Działanie potwierdziłem w BeamNG.drive, Assetto Corsa, American Truck Simulator i Richard Burns Rally. Aplikacja waży około 1,2 MB, działa na Androidzie 8.0 i nowszym, a plik instalacyjny można pobrać z GitHuba. Do sprawdzania płynności przesyłu napisałem osobne narzędzie, które mierzy odstępy między odczytami docierającymi do komputera.',
      },
    ],
    lessons: [
      'Android traktuje żądaną częstotliwość czujników jako sugestię, więc aplikacja musi sobie radzić z odczytami, które przychodzą szybciej albo nierówno.',
      'Dobrze dobrany model (12 zamocowań z dwóch prostych informacji) zastępuje listę wyjątków, która rosłaby z każdym nowym sposobem noszenia telefonu.',
    ],
  },
  'derdum-wyplatum-google-calendar': {
    facts: [
      {
        value: '197',
        label: 'testów automatycznych obliczeń i połączenia z Google',
      },
      {
        value: '0',
        label: 'własnych serwerów: aplikacja rozmawia tylko z Google',
      },
      {
        value: '21',
        label: 'miesięcy, na których sprawdziłem wymiar czasu pracy',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Motorniczy trzyma grafik zmian w Kalendarzu Google, z wpisami w rodzaju „21/7” albo „22/7 + 22/6” (linia i brygada), pomiędzy sprawami prywatnymi. Chciał wiedzieć z góry, ile zarobi w danym miesiącu: z dodatkami za pracę w nocy, w niedziele i święta, z nadgodzinami ponad wymiar z Kodeksu pracy, a potem po odjęciu ZUS, podatku i PPK.',
      },
      {
        type: 'p',
        text: 'Aplikacja miała działać na telefonie jak zwykła apka, bez logowania do niczego poza Google i bez serwera, który trzeba utrzymywać i opłacać. To oznaczało, że całe połączenie z Google odbywa się w przeglądarce, a dostęp, który Google daje na około godzinę, ma się odnawiać bez męczenia użytkownika okienkami.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Kalendarz Google jest jedyną bazą danych: aplikacja czyta z niego grafik i zapisuje zmiany prosto do niego. Po każdym zapisie pobiera miesiąc od nowa, więc zawsze pokazuje to samo co Kalendarz Google. Bez internetu korzysta z ostatniej zapisanej kopii, a po powrocie do aplikacji odświeża dane starsze niż 2 minuty.',
      },
      {
        type: 'p',
        text: 'Logowanie odbywa się przez Google. Okienko zgody otwiera się tylko po kliknięciu przycisku, bo przeglądarki blokują okienka otwierane samoczynnie, a po pierwszej zgodzie kolejne odnowienia dostępu przechodzą bez pytań.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Edycja grafiku: zmiany można dodawać, poprawiać i usuwać w aplikacji, a zapisują się prosto w Kalendarzu Google. Przy kalendarzu udostępnionym tylko do odczytu aplikacja to mówi i daje link, który otwiera gotowy wpis w Kalendarzu Google.',
          'Obliczenia co do grosza: kwoty są liczone w całych groszach i zaokrąglane raz na składnik pensji, a nie przy każdej zmianie osobno.',
          'Noce i zmiana czasu: dodatek nocny liczy się poprawnie także w noce zmiany czasu, gdy noc od 22 do 6 trwa 7 albo 9 godzin.',
          'Święta i wymiar pracy: święta ruchome, liczone od daty Wielkanocy, aplikacja wylicza sama, a wymiar czasu pracy według Kodeksu pracy sprawdziłem na 21 miesiącach.',
          'Kolizje: nachodzące na siebie zmiany i urlopy są wykrywane i pokazywane, ale nie zmieniają kwot.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Aplikacja działa na telefonie jako aplikacja instalowana z przeglądarki (PWA), bez żadnego własnego serwera. Obliczenia i połączenie z Google sprawdza 197 testów automatycznych, a testowy kalendarz ma 101 wydarzeń na 2026 rok.',
      },
    ],
    lessons: [
      'Okienko logowania Google otwiera się tylko po kliknięciu, więc każda droga odnowienia dostępu musi kończyć się przyciskiem, a nie wyskakującym okienkiem.',
      'Zewnętrzna usługa jako jedyne źródło danych upraszcza aplikację, pod warunkiem że po każdym zapisie dane są pobierane od nowa.',
    ],
  },
};
