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
      { value: '7', label: 'document types, from a receipt to a contract' },
      {
        value: '3',
        label:
          'steps to add a document: the photo, the AI reading and the check',
      },
      {
        value: '100',
        label:
          'AI readings per account a month, so the cost is known in advance',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Receipts, invoices, warranties and insurance policies usually end up in a drawer or in the phone’s gallery, between holiday photos. When a device has to go back under warranty, or you need to know when a policy runs out, the search begins. I wanted an app where taking a photo of a document is enough and the app does the rest: cuts the sheet out of the background, reads the key details and files the document in the right place, with its deadline in plain sight.',
      },
      {
        type: 'p',
        text: 'Phone photos are rarely perfect: the sheet lies askew, on a patterned tablecloth or in light from one side. AI can read a document, but it sometimes gets things wrong, and every reading costs money. And these are private documents with amounts, addresses and numbers, so they need proper protection.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'I split adding a document into three steps the user sees one after another. First the photo: a separate Python program finds the sheet on it, cuts it out of the background and straightens it as if it had been scanned. Then the reading: AI fills in the document type, the issuer, the amount and the dates. Last, the check: every field AI filled in is marked and can be corrected, and nothing is saved until you click “Save”.',
      },
      {
        type: 'p',
        text: 'The app runs in Amazon’s cloud (AWS) on a pay-for-what-you-use model, not on a server switched on around the clock. The whole cloud setup is written as code, so it can be rebuilt from scratch with one command. Every change goes to a test version first and reaches production only after I approve it.',
      },
      {
        type: 'image',
        src: '/case-studies/segregator/before-after.jpg',
        width: 1800,
        height: 800,
        alt: 'Six made-up documents: crooked photos on a table at the top, the same sheets cut out and straightened below',
        caption:
          'Top: photos from a phone. Bottom: the same after automatic processing. The documents are made up, generated for the demo account.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Straightening photos: the program looks for the sheet in several ways (by brightness, by the whiteness of paper and by its edges) and picks the clearest result, so it copes with a wooden table, a dotted or checked tablecloth and light from one side. The original stays alongside, and the user chooses which version to keep.',
          'Reading with AI: the Amazon Nova model returns the data in a strictly defined form, and the app checks it against the rules of that document type. A receipt never gets a payment deadline, and a subcategory outside the list is dropped. A reading takes a few seconds.',
          'Costs under control: each account has 100 AI readings a month and 500 MB for files, and the whole app has a shared reading limit it cannot exceed. Files older than 90 days move to cheaper storage at about a fifth of the price and still open at once.',
          'Privacy: the photo is shrunk on the phone before it is sent, which also removes the location stored in it. Files sit in private, encrypted storage, and a link to a file works for 5 minutes and only for the account’s owner. An account can be deleted together with all its documents.',
          'Order, as in a binder: documents are grouped by month like dividers, each type has its own colour and icon, and the deadline is named the way the document puts it: “pay by” on an invoice, “warranty until” on a warranty card, “valid until” on a policy. The same file added a second time, even from another device, is recognised.',
          'Convenience: sign-in by email or with Google, Polish and English, light and dark mode. On a phone the photo is taken straight from the app, and the menu sits at the bottom of the screen, under the thumb.',
          'A demo without signing up: a view-only account with made-up documents. I generated them as photos “from a phone” and ran them through the same processing as real files, so the demo shows exactly what happens to a user’s document.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Segregator is live at segregator.skoftware.pl, and the demo account opens with one click, without signing up. A few steps lead from a photo to a saved document: add the photo, approve the straightened version, read the details with AI, check them and save. The next stage is email reminders of upcoming deadlines, such as the end of a warranty.',
      },
    ],
    lessons: [
      'AI works best as a suggestion, not a decision. Marked fields and a check before saving mean a model’s mistake costs one click, not a wrong entry in the archive.',
      'Limits set from day one mean the cost of the cloud and of AI is known in advance, before the first user turns up.',
      'A demo built from the same parts as the real app says more than screenshots, and nothing in it has to be faked.',
    ],
  },
  'yawa-volumetric-clouds': {
    facts: [
      {
        value: '4 032',
        label:
          'hours of real weather from 42 places, used to check the cloud cover',
      },
      {
        value: '1/4',
        label:
          'of the cloud image computed in each frame, the rest filled in from earlier ones',
      },
      {
        value: '4',
        label: 'quality tiers, from a powerful computer to a weak phone',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Yet Another Weather App started in 2022 as an ordinary weather app. I wanted its background to be more than decoration: it should show the sky that is really over the chosen place. If the forecast says low, thick cloud and a thunderstorm, the screen should show a heavy grey sky with lightning, not a pretty animation of a sun.',
      },
      {
        type: 'p',
        text: 'There were two challenges. Realistic 3D clouds are heavy on hardware, and the ready-made options I tested either looked flat or could not keep up on phones. On top of that, a forecast is dry numbers: cloud cover in percent at several heights, humidity, storm energy, wind. They had to be turned into the look of the sky so that the picture matches the weather description next to it.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'I wrote my own cloud engine, modelled on a technique known from the game Horizon Zero Dawn. For every point on the screen the program sends a ray into the sky and checks how much cloud it meets on the way and how sunlight passes through it. That gives the clouds volume, lets light through at their edges and keeps an overcast sky grey rather than black.',
      },
      {
        type: 'p',
        text: 'To make it work on a phone, only every fourth point of the cloud image is computed in each frame, and earlier frames fill in the rest. The ray takes big steps through empty air and small ones only inside a cloud. The app picks one of four quality tiers and drops a tier by itself when the device cannot keep up.',
      },
      {
        type: 'p',
        text: 'The forecast numbers (free data from Open-Meteo) go through a module that turns them into the shape of the sky. From temperature and dew point it works out the height where clouds begin, from storm energy how tall they grow, and from the wind at different heights which way and how fast they drift.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Cloud cover that adds up: I checked forecasts from 4 032 hours in 42 places and tuned the picture so that “80 percent cloud cover” covers 80 percent of the sky. On top of that, a rule that no cloud layer may be thicker than the total cover, so “mainly clear” never shows a sky covered in cloud.',
          'Types of cloud: flat layers, puffy cumulus and stormy cumulonimbus have shapes of their own, and sunlight passes through and scatters inside them as in real clouds.',
          'Clouds drift with the wind: low ones with the wind at about one and a half kilometres up, high, wispy ones with the wind at about nine kilometres.',
          'Four quality tiers: on a computer the clouds are computed in more detail and at a higher resolution, on a weaker phone more simply, and on the weakest devices the scene turns into a flat layer of cloud.',
          'Tidy code: the cloud engine is split into independent parts (shape, light, assembling frames), and shared settings come from one source for the whole app, so later changes do not drift apart between the parts.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'The app’s background shows a sky computed from the same forecast the user reads, and runs smoothly from a powerful computer to an ordinary phone, with no paid access to data. The weather can be checked for a city picked on the map, typed by name or taken from the phone’s location. After the engine was split into parts, the picture came out identical to before, which I checked automatically on 20 000 random settings, and the app got 197 kB smaller.',
      },
    ],
    lessons: [
      'Measure first, then change: the cloud cover rule came in only after checking thousands of real hours, not on the strength of one screenshot.',
      'Striking 3D graphics in the browser work on a phone too, as long as you assume from the start that different devices get different quality.',
    ],
  },
  'polonez-autodrive-rewrite': {
    facts: [
      { value: '121', label: 'automated tests run on every change' },
      {
        value: '175',
        label: 'towers of the city on the horizon, placed by code',
      },
      {
        value: '−29%',
        label: 'draw commands per frame with shadows only around the car',
      },
    ],
    problem: [
      {
        type: 'p',
        text: 'Polonez Autodrive is an animated synthwave scene: the cult Polonez drives at night between palms and mountains towards a striped sun. Everything can be repainted live from a colour panel, like a colouring book, and from free ride you can switch to a mini-game of dodging oncoming communist-era Fiat 126p and Škoda 120 cars. The Polonez, the palms and the rocks were modelled in 3ds Max.',
      },
      {
        type: 'p',
        text: 'The first version was made in 2024 on libraries that have changed a lot since. I wanted to extend the project with a landscape drawn by code, random colour palettes and touch support, and to polish the mini-game so it runs at the same pace on every monitor, however fast it refreshes.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Rather than patch the old code, I moved the project to modern tools (Vite and the current Three.js) and rebuilt it from scratch on a new skeleton. The first version served as the model: I kept it in the project’s history, took screenshots to compare against and recreated all its features in seven stages before adding new ones.',
      },
      {
        type: 'p',
        text: 'The new skeleton rests on a few simple rules. The whole scene runs on one clock, so animation and steering keep the same pace on every screen, and nothing jumps when you come back to the browser tab. The game moves through clearly defined stages: free ride, countdown, play, game over. Colours, gameplay settings and texts live in one configuration file, and the loading bar shows the real progress of loading.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'A landscape drawn by code: hills grow out of mathematical noise and form ridges, rising ahead of the car and sinking behind it like a conveyor belt. The mountain range parts in front of the sun to make room for the road, and on the horizon stands a city of 175 towers in its own mist.',
          'A live colouring book: the colour panel builds itself from the list of scene elements. Shuffling creates a palette from classic colour combinations (complementary, triad, analogous) and makes sure lines always stand out from the fill. New colours fade in over a second, and the on-screen display and the panel take on the scene’s hue.',
          'The signature wireframe: outlines keep a constant thickness in the game world and fade out on small details, so distant palms do not blur into a smudge. The sun and the ground grid are drawn live by the graphics card instead of from ready-made images, and the glow covers only selected elements.',
          'Models from 3ds Max load complete, exactly as they were modelled, and the wheels are centred on their axle, so they turn evenly.',
          'Mini-game: the collision area fits the size of each model, and oncoming cars appear and disappear smoothly, without stutters.',
          'Phone and tablet: one finger turns the camera and two zoom, the side panel repaints the scene, and in free ride on-screen buttons steer. In portrait the view is widened and the camera slides sideways behind the car.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'The new version is about 5.6k lines of code and 121 automated tests that check how the project works and builds on every change to the code. Shadows limited to the car’s surroundings cut the triangles per frame by 18 percent and the draw commands by 29 percent. About 1.9 MB of unneeded files left the project, including the images of the sun and the grid, which the graphics card now draws.',
      },
    ],
    lessons: [
      'One clock and one place for settings simplify the whole project: everything happens to the same rhythm, and changing a colour or a game parameter is one line in the configuration.',
      'When an upgrade touches every file anyway, rebuilding the project on a new skeleton can be quicker than fixing it in place. The condition: the old version stays as the model, with screenshots to compare against.',
    ],
  },
  'capcam-head-tracking': {
    facts: [
      {
        value: '200 Hz',
        label: 'that is, up to 200 head-position readings a second',
      },
      {
        value: '12',
        label: 'ways of mounting the phone described by one model',
      },
      { value: '4', label: 'games where it is confirmed to work' },
    ],
    problem: [
      {
        type: 'p',
        text: 'In games like BeamNG or Assetto Corsa you can look around the cockpit by moving your head: a slight turn of the head turns the in-game view further, so your eyes stay on the monitor. That takes dedicated devices, like the expensive TrackIR, or camera-based setups that need good light and LEDs. Meanwhile a phone has motion sensors and Wi-Fi inside, and clipped to the peak of a cap it moves with your head.',
      },
      {
        type: 'p',
        text: 'Several things had to be solved at once. Phone sensors slowly “drift” sideways, because without a compass they do not know where forward is. A phone can be mounted in different ways: flat on the peak, upright on the forehead or sideways on a helmet. A glowing screen right above your eyes gets in the way of the game. And the connection to the computer has to work straight away, without digging through network settings.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'On the computer side I used the free opentrack program, which takes data over the network and passes it to games as if it came from TrackIR. What was missing was the phone app, so I wrote it.',
      },
      {
        type: 'p',
        text: 'Instead of fighting the drift, I made resetting forward instant and always at hand: one button or a volume key, even with the phone on your head. Tilting and leaning the head rely on gravity, so they do not drift at all. For the first half second after starting, the app waits for the sensors to settle.',
      },
      {
        type: 'p',
        text: 'I described the different mountings with one simple model: which way the screen faces and which edge of the phone is on top. Those two facts give 12 possible setups. The app offers three ready presets, a “phone turned 180°” switch and a custom setup.',
      },
      {
        type: 'image',
        src: '/case-studies/capcam/opentrack_settings.png',
        width: 659,
        height: 568,
        alt: 'The main opentrack window: UDP over network input, freetrack 2.0 Enhanced output, Accela filter',
        caption:
          'On the computer, the free opentrack set to receive data from the network is all it takes.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Fast, even transfer: up to 200 readings a second over Wi-Fi in low-latency mode, with 60 and 100 a second as battery-saving options. The app keeps a steady sending rhythm and warns when the phone cannot keep up with the chosen rate.',
          'Black screen mode: the screen dims almost to nothing and stays out of the way, the phone does not go to sleep, and the volume keys reset forward. A tap shows the interface for 10 seconds. A vibration confirms the reset, even when touch vibration is turned off in the system.',
          'Help with connecting: the app detects a VPN that is switched on and checks whether the computer address typed in is on the same home network as the phone. The message says plainly what the address should start with.',
          'Sensitivity set separately for each direction, from 0.5 to 3 times, plus a boost at the sides: small movements keep the view calm, and the further you turn your head, the further the camera turns, so the monitor never leaves your sight.',
          'For game modders: a second, more detailed data stream with a number and a time on every reading.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'I confirmed it works in BeamNG.drive, Assetto Corsa, American Truck Simulator and Richard Burns Rally. The app weighs about 1.2 MB, runs on Android 8.0 and newer, and the installer can be downloaded from GitHub. To check how smooth the transfer is, I wrote a separate tool that measures the gaps between readings reaching the computer.',
      },
    ],
    lessons: [
      'Android treats the requested sensor rate as a suggestion, so the app has to cope with readings that come faster or unevenly.',
      'A well-chosen model (12 mountings from two simple facts) replaces a list of special cases that would grow with every new way of wearing the phone.',
    ],
  },
  'derdum-wyplatum-google-calendar': {
    facts: [
      {
        value: '197',
        label: 'automated tests of the calculations and the Google connection',
      },
      { value: '0', label: 'servers of its own: the app talks only to Google' },
      { value: '21', label: 'months on which I checked the working-time norm' },
    ],
    problem: [
      {
        type: 'p',
        text: 'A tram driver keeps the shift roster in Google Calendar, with entries such as “21/7” or “22/7 + 22/6” (line and duty), among private events. The goal was to know in advance what a month would bring: with the extras for night work, Sundays and public holidays, with overtime beyond the norm in the Labour Code, and then after social security, tax and the PPK pension scheme.',
      },
      {
        type: 'p',
        text: 'The app was to work on a phone like any other app, with no sign-in to anything but Google and no server to maintain and pay for. That meant the whole connection to Google happens in the browser, and the access Google grants for about an hour has to renew without pestering the user with pop-ups.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Google Calendar is the only database: the app reads the roster from it and writes changes straight back to it. After every save it fetches the month again, so it always shows the same as Google Calendar. Offline it uses the last saved copy, and on returning to the app it refreshes data older than 2 minutes.',
      },
      {
        type: 'p',
        text: 'Sign-in goes through Google. The consent window opens only after a button click, because browsers block windows that open on their own, and after the first consent later renewals go through without questions.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Editing the roster: shifts can be added, changed and deleted in the app and are saved straight to Google Calendar. With a calendar shared as read-only, the app says so and offers a link that opens a ready entry in Google Calendar.',
          'Accurate to the grosz: amounts are counted in whole grosz and rounded once per pay component, not separately for every shift.',
          'Nights and clock changes: the night extra is counted correctly on the nights the clocks change too, when the night from 22:00 to 6:00 lasts 7 or 9 hours.',
          'Holidays and the working-time norm: the app works out the movable holidays, counted from the date of Easter, by itself, and I checked the working-time norm from the Labour Code on 21 months.',
          'Clashes: overlapping shifts and leave are detected and shown, but do not change the amounts.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'The app runs on a phone as an app installed from the browser (PWA), with no server of its own. 197 automated tests check the calculations and the Google connection, and the test calendar holds 101 events for 2026.',
      },
    ],
    lessons: [
      'The Google sign-in window opens only after a click, so every path to renewing access has to end in a button, not a pop-up.',
      'An external service as the only source of data keeps the app simple, as long as the data is fetched again after every save.',
    ],
  },
};
