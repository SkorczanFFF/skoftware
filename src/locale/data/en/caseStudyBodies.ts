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
      { value: '4 032', label: 'place-hours used to calibrate coverage' },
      { value: '4', label: 'quality tiers from desktop down to “potato”' },
      { value: '5–9', label: 'draw calls per frame, no post-processing' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Yet Another Weather App started in 2022 as an ordinary weather app. I wanted the background to be not an illustration but a sky computed from the same forecast the user reads: if Open-Meteo reports 80 percent low cloud and a thunderstorm, the scene should look like a closed grey deck with lightning, not a pretty library animation.',
      },
      {
        type: 'p',
        text: 'Off-the-shelf options failed in testing. A volumetric cloud library for Three.js rendered at full resolution and killed mid-range phones, drei’s sprite clouds looked flat and drowned the GPU in overdraw, and post-processing added yet another full-screen pass. A second problem sat behind the first: how to translate forecast numbers honestly (layered coverage, CAPE, boundary-layer height, winds at pressure levels) into scene parameters so the model does not contradict a “mainly clear” label.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'I wrote a Nubis-style raymarcher (the technique known from Horizon Zero Dawn): the ray travels through a spherical shell above a curved Earth, in metres. Density is Perlin-Worley noise shaping the body, a separate height gradient for stratus, cumulus and cumulonimbus, a remap by the coverage field and Worley detail erosion. Lighting combines Beer’s law, the powder effect, a three-lobe Henyey-Greenstein phase function and three octaves of scattering, while a two-stream “diffuse floor” keeps overcast skies grey instead of black.',
      },
      {
        type: 'p',
        text: 'I cut the cost on phones with four passes on a fraction of the canvas. The march draws one pixel of every 2×2 block per frame, and a temporal resolve reprojects the history along the view direction and clamps it to the mean ± 1.5σ of the neighbouring fresh texels, so ghosting disappears without blur. The march itself is adaptive: cheap steps through empty air, a step back on hitting cloud, fine steps of about 2 percent of the distance. Four quality tiers pick the DPR, step count, 3D noise size and range; drei’s PerformanceMonitor drops a tier when frames fall below 75 percent of the cap.',
      },
      {
        type: 'p',
        text: 'Forecast data runs through a custom cloud-physics module: the base from the lifting condensation level (about 125 m per degree of temperature-dewpoint spread), the top from the boundary layer and CAPE, layer heights from pressure levels, and optical depth from layer thickness blended with a value inverted from the clearness index. Coverage is calibrated so that the API number means exactly that share of the sky, not “some” noise threshold.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'The shader split into modules: march, density, lighting, resolve. Constants shared between TypeScript and GLSL come from one export, so they cannot drift apart as the code evolves.',
          'Cloud drift in noise space from the 850 hPa wind (low clouds) and 300 hPa wind (cirrus), wrapped by tile periods, because after a day float32 quantised the noise every 520 metres.',
          'An ANGLE/D3D11 driver bug on Windows: texture() with implicit derivatives inside a data-dependent loop returned an empty ray and clouds near the camera vanished. The fix was textureLod at level 0.',
          'The model contradicted the label: for Jēkabpils the API said “mainly clear, 26 percent” while the low layer read 78 percent. I measured it on 4 032 real place-hours from 42 locations and introduced one rule: no layer exceeds the total. Closed decks under a total below 50 percent went from 12 to 0, and the correction touched 2.4 percent of hours.',
          'Frames issued by a FrameRateGate every Nth rAF frame instead of a time-based gate, which dropped frames at random.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'The scene runs without post-processing and without an API key, in 5–9 draw calls per frame. On desktop the cloud target is half the canvas at 64 lit steps and 128³ noise; on the lowest tier a third of the canvas, 32 steps and 64³ noise; on “potato” a flat deck. Rebuilding the shader into modules closed with bit-identical output across 760 000 comparisons on 20 000 random inputs and a bundle 197 kB smaller.',
      },
    ],
    lessons: [
      'Measure, do not guess: the coverage rule changed only after statistics on thousands of real hours, not after one screenshot.',
      'Pure logic outside the frame loop and one source of constants for TS and GLSL are what make it possible to keep developing a shader without fear.',
      'Premultiplied alpha with sRGB gives white fringes, float32 uniforms grow over time, and renderer.info resets inside useFrame. Each of those cost an evening.',
    ],
  },
  'polonez-autodrive-rewrite': {
    facts: [
      { value: '16', label: 'P0 bugs found in version 1' },
      { value: '121', label: 'unit tests in version 2' },
      { value: '−29%', label: 'draw calls per frame after limiting shadows' },
    ],
    problem: [
      {
        type: 'p',
        text: 'The first version from 2024 worked but aged badly: Three.js r116, plain JavaScript without a bundler, a 600-line GUI of copy-pasted code. The analysis of the first version I did in October 2026 listed 16 P0 bugs. Three independent clocks (the game loop, a separate requestAnimationFrame per object and setTimeout) made the car steer 2.4 times faster on a 144 Hz monitor than on 60 Hz. The loading bar was a fiction of 2 to 8 second timers and showed “Infinity%” under gzip. Add GPU leaks without dispose, a hitbox larger than the model, a wireframe kept as a separate clone synchronised by hand, and the same FBX file loaded twice.',
      },
      {
        type: 'p',
        text: 'A second problem surfaced with the library upgrade: the new FBXLoader triangulated the non-planar quads of the hills with earcut and lost 37 of 252 triangles. Models from 3ds Max came back with cameras in the hierarchy and wheels with an off-centre axle, so the tyre wobbled as it turned.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Rather than patch the old code in place, I moved the project from plain JS and HTML to Vite on a new skeleton: since the library upgrade touched every file, the old code was worth more as a specification than as a base. I tagged version 1, took reference screenshots and reached feature parity on Three.js r186 with Vite in seven phases, then added new things.',
      },
      {
        type: 'p',
        text: 'The skeleton of version 2 is one loop on THREE.Timer with the delta clamped to 0.1 s and connected to the document so a hidden tab does not jump on return; a pure game state machine (idle, free, countdown, playing, gameover); loading through LoadingManager and Promise.all with real progress; one config file as the source of the palette, layers, gameplay parameters and copy.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'A custom FanFBXLoader swaps the triangulation for a fan, the way r116 did, so the hills come back complete. A pruning function removes cameras from the export and wheels are centred on their axle after loading.',
          'A procedural scene instead of files: seeded simplex noise with ridged fBm, a height grid split along the diagonal with the smaller height difference (ridges instead of a pattern), hill chunks as a conveyor belt growing ahead of the car and sinking behind it, a mountain range parted in front of the sun for the road, a city of 175 towers with its own fog.',
          'Real-time colours: lil-gui built in a loop from the layer config, random palettes from colour schemes (complementary, triad, split, analogous) with the line-to-fill contrast kept at 3:1 or better, a one-second tween, and the HUD and panel taking the scene’s hue.',
          'Wireframe computed in a shader with an edge-distance attribute: width in world units and fading of small triangles, because GL lines are 1 pixel wide and distant palms blurred into a blob. Selective bloom on its own layer.',
          'Mini-game: hitbox computed once per model, car bounds once per frame, a pool of cloned materials for fades, because dispose on spawn caused a 40–70 ms hitch.',
          'Touch: on-screen buttons with setPointerCapture, a minimum 70° horizontal FOV in portrait and a camera that slides sideways with the car.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Version 2 is about 5.6k lines of JavaScript typed with JSDoc, 121 unit tests in 23 files and CI that checks types, tests and the build on every push. Shadows limited to the car’s surroundings removed 18 percent of triangles and 29 percent of draw calls per frame. About 1.9 MB of dead files left the repository, including 820 kB of sun and grid PNGs that shaders now compute.',
      },
    ],
    lessons: [
      'One loop and one source of data remove whole classes of bugs, not single ones.',
      'Moving a project onto a new skeleton can be cheaper than patching it in place when the upgrade touches every file anyway. The condition: the old code stays as the specification, with a tag and reference screenshots.',
    ],
  },
  'capcam-head-tracking': {
    facts: [
      { value: '200 Hz', label: 'maximum send rate' },
      { value: '48 B', label: 'opentrack packet: six f64 numbers' },
      { value: '12', label: 'phone mountings in one model' },
    ],
    problem: [
      {
        type: 'p',
        text: 'I wanted to look around in BeamNG and Assetto Corsa by moving my head, but TrackIR is expensive hardware and camera-based solutions need light and LEDs. A phone has a gyroscope, Wi-Fi and can be strapped to the brim of a cap. Opentrack accepts data over UDP and feeds it to games through the TrackIR protocol, so only the phone side was missing.',
      },
      {
        type: 'p',
        text: 'Problems came quickly. The gyroscope drifts in yaw, because fusion without a magnetometer has no reference to north. The first samples after the sensor starts are stale. The phone can lie flat on the brim, stand upright on the forehead or sit sideways on a helmet, and every position swaps the axes. Android treats the requested sensor rate as a hint, not a guarantee. A screen glowing under the brim is a nuisance, but without it there is no way to press “recenter”. And finally: users type in an address from “whatismyip” or have a VPN on, and the packets never arrive.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'I treated drift as a property, not a bug to compensate: rather than fighting physics, recentering is cheap and always at hand. The orientation source is TYPE_GAME_ROTATION_VECTOR (gyroscope plus accelerometer), so pitch and roll stay tied to gravity, and yaw is zeroed with a quaternion offset about the Z axis. For the first 500 ms the tracker returns identity and does not set “forward” until the fusion settles.',
      },
      {
        type: 'p',
        text: 'I described the wearing position with one model instead of manual axis swaps: the direction the screen faces times the edge that is “up” gives 12 mountings. The head-to-device matrix comes from a cross product, the quaternion from Shepperd’s method, and head orientation is the device’s rotation in the world composed with the head’s rotation relative to the device. The UI keeps three presets, a “phone turned 180°” switch and a custom position.',
      },
      {
        type: 'image',
        src: '/case-studies/capcam/opentrack_settings.png',
        width: 659,
        height: 568,
        alt: 'Opentrack main window: input UDP over network, output freetrack 2.0 Enhanced, Accela filter',
        caption:
          'On the PC side all it takes is opentrack with UDP input on port 4242.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Protocol: the 48-byte opentrack packet (six little-endian f64: x, y, z, yaw, pitch, roll) to port 4242, plus a custom 36-byte format with a quaternion, sequence number and timestamp to port 4243 for mods. One DatagramPacket reused, the whole sensor→tracker→UDP pipeline on a single HandlerThread at display priority with a low-latency WifiLock.',
          'The rate limiter keeps a schedule of “due times” rather than the gap since the last send: a sensor at 101 Hz under a 100 Hz limit does not lose every second sample. A quarter-interval slack, no catching up after a pause. The panel warns when the real rate falls below 80 percent of the chosen one.',
          'Axis signs matched to opentrack (positive yaw is right) through the decomposition R = Rz(−yaw)·Rx(pitch)·Ry(roll), with a test for continuity across ±180°.',
          'Black-screen mode: an overlay covers everything including the system bars, brightness 0.01, FLAG_KEEP_SCREEN_ON, and the volume buttons intercepted in onKeyDown recenter with the phone on your head. A tap reveals the UI for 10 seconds.',
          'The confirmation vibration did not arrive when the user had touch haptics off: vibration attributes switched to USAGE_HARDWARE_FEEDBACK.',
          'Network detection: ConnectivityManager with NetworkCapabilities recognises a VPN and compares the subnet of the typed address with the phone’s, refreshing every 3 seconds. The message says outright what the PC address should start with.',
          'Per-axis sensitivity 0.5–3× and a “side boost”: past a threshold (20° by default) the sensitivity rises smoothly and quadratically, so the centre stays calm while a far glance turns the camera further than you can turn your head without losing sight of the screen.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Confirmed in BeamNG.drive, Assetto Corsa, American Truck Simulator and Richard Burns Rally. Sending at up to about 200 Hz with 60 and 100 Hz options for battery, an APK of about 1.2 MB after R8, Android 8.0 and up. To measure jitter and loss I wrote a UDP monitor in Node that reports p50 and p99 inter-packet gaps.',
      },
    ],
    lessons: [
      'The sensor rate parameter on Android is a hint; the limiter has to assume samples arrive faster and unevenly.',
      'The default “touch” vibration is silenced by a user setting. A confirmation signal needs a different channel.',
      'A well-chosen model (12 mountings from two vectors) replaced a growing list of special cases.',
    ],
  },
  'skoftware-hero-particles': {
    facts: [
      { value: '8 000', label: 'bio text particles along Bézier curves' },
      { value: '4', label: 'custom GLSL shaders' },
      { value: '1', label: 'clock for scroll and animation' },
    ],
    problem: [
      {
        type: 'p',
        text: 'The site of a one-person software house has to sell services, so the headline and buttons must be in server-rendered HTML before any JavaScript loads. At the same time I wanted the hero to show what I can do in 3D: a portrait scattered into particles, bio text flowing towards the face, a reaction to the cursor and taps. The two goals clash easily: a heavy canvas delays the content, and a particle field computed on the CPU drops frames on phones.',
      },
      {
        type: 'p',
        text: 'A second problem appeared after adding smooth scrolling: Lenis and ScrollTrigger had separate clocks, so scroll-driven animations landed one frame behind the page position. A third: after a route change ScrollTrigger restored the previous page’s scroll position, and the transition curtain revealed the new page halfway down.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Content and scene are separated at the React level: the hero renders the headline, pitch and CTAs on the server, and the scene is a dynamically loaded chunk without SSR that “must never gate the offer copy”. If WebGL fails, an ErrorBoundary shows text instead of a void.',
      },
      {
        type: 'p',
        text: 'The portrait becomes particles in the browser: the image lands on an offscreen canvas scaled to 220 pixels wide, and only a pixel with alpha above a threshold and luminance below a threshold becomes a particle. The result is an InstancedBufferGeometry with one quad and per-instance attributes, drawn in multiply mode over a plain textured plane. The bio text is 8 000 particles, each with a start point, two control points and an end; the vertex shader computes the curve and rotation, and the CPU only updates time.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Tap shockwave: pointerdown on the canvas pushes a pulse (NDC coordinates plus time) into a ring of two, fires navigator.vibrate(12) and a CSS ripple. The pulse envelope (attack smoothstep to 0.08, release from 0.5 to 1) exists in one version in JS and in GLSL, so the camera, portrait and stream breathe in the same rhythm.',
          'The tap position is stored in the object’s local space, not in NDC, because as the camera drifted the wave slid along with it. An off-screen sentinel prevents “phantom” repulsion before the first tap.',
          'Camera: damped cursor following on desktop (maath damp3), gyroscope input on phones with a neutral tilt of 45° and a 45° range, asking for the iOS permission on the first touch. A refusal leaves the camera centred.',
          'Render budget: dpr capped at 1, no antialiasing, frustum culling off on both particle systems, and the render loop stopped through an IntersectionObserver once the hero leaves the screen.',
          'One clock: Lenis ticked from gsap.ticker and reporting scroll to ScrollTrigger, with lagSmoothing(0). Scrubbed tweens land in the same frame as the scroll position.',
          'Transition curtain: after a route change, ScrollTrigger’s scroll memory is cleared, refreshed and followed by an instant scrollTo, and scrolling is blocked through wheel/touchmove instead of overflow:hidden, because the vanishing scrollbar shifted the page sideways. An emergency reveal after 10 seconds.',
          'prefers-reduced-motion switches off Lenis, scroll velocity, the curtain and haptics, and speeds ScrollTrigger tweens up five times.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'The offer is in the first byte of HTML, the scene arrives after it and goes quiet when out of view. The GPU computes the portrait and text particles, and every effect (wave, camera, scroll) runs on one clock. The site is a proving ground: every new motion effect lands here first.',
      },
    ],
    lessons: [
      'A shockwave has to be anchored in the world, not on the screen. Any camera-dependent effect without its own frame of reference will float.',
      'Two sources of time always mean a one-frame lag somewhere in the system. Lenis, GSAP and ScrollTrigger must tick from one place.',
    ],
  },
  'derdum-wyplatum-google-calendar': {
    facts: [
      { value: '197', label: 'tests on the engine and adapter' },
      { value: '0', label: 'servers: the app talks only to Google' },
      { value: '1 h', label: 'token validity without a refresh token' },
    ],
    problem: [
      {
        type: 'p',
        text: 'A tram driver keeps the roster as Google Calendar events titled “21/7” or “22/7 + 22/6” (line/duty), mixed in with private entries. He wanted to know the gross and net pay for the month: night supplements, Sundays and holidays, overtime beyond the statutory monthly hours, then social security, income tax and the pension plan. The app had to be a PWA for the phone, with no login to anything but Google and no server to maintain.',
      },
      {
        type: 'p',
        text: 'Without a backend there is nowhere to hide a client secret or a refresh token. A private ICS link was out: no CORS, and the link works like a password. What remains is OAuth in the browser with a token valid for about an hour, and the user cannot click through pop-ups every hour.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Google Identity Services in implicit mode: initTokenClient without a client secret, the Client ID openly in the bundle, a GCP project in Testing mode with a list of test users. The token with its expiry and scopes goes to localStorage with a 60-second margin, and the “signed in” state has one source of truth: token validity, observed through useSyncExternalStore.',
      },
      {
        type: 'p',
        text: 'The calendar is the only database. Every write (insert, patch, delete) ends with the month being fetched again, and moving a shift to another month drops that month’s cache. Offline works from a copy in localStorage per calendar and month, and on returning to the tab the app refreshes data older than 2 minutes.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'Getting a token never opens a pop-up by itself, because the browser blocks pop-ups without a user gesture. Only a click opens one, concurrent requests share a single promise, and after the first consent the prompt is empty, so later refreshes pass without questions.',
          'The scope widened from reading to editing events in one, one-off migration of the token key. The scopes saved from the response and the accessRole from the calendar list decide whether the edit buttons are active; a read-only calendar gets a banner and an “open in Google Calendar” link with a pre-filled event as the route without the API.',
          'API client: a loop over nextPageToken, singleEvents sorted by start, the Europe/Warsaw time zone, rejection of cancelled and non-default events, idempotent deletion (410 treated as success). fetch and token retrieval are injected, so the adapter has its own tests on a fixture with two pages of results.',
          'The engine counts in whole grosz, rounds once per component and rate period from the sum of minutes (3 × 1 minute is 185 grosz, not 186). Daily windows iterate over local days on Temporal.Instant and have DST tests: the 22–6 night across the March change is 7 hours, across the October one 9.',
          'Holidays computed from Easter with Meeus’s method, the statutory monthly hours checked across 21 months, overlapping shifts and leave detected and shown, but they never change the amounts.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'The app runs as a PWA on Vercel with no server of its own, with 197 tests on the engine and adapter. A second read of the code caught errors in the amounts (absences counted twice, rounding per shift) and formula injection in the CSV export. The real test calendar holds 101 events for 2026.',
      },
    ],
    lessons: [
      'An OAuth pop-up opens only from a user gesture. Every “refresh the token in the background” path must end in a button, not a window.',
      'An external system as the single source of truth simplifies the app, but every write has to end with a fresh read.',
    ],
  },
  'tibia-key-presser-background-input': {
    facts: [
      { value: '8', label: 'keys, each with its own delay' },
      { value: '100 ms', label: 'maximum reaction time to Stop' },
      { value: '780', label: 'lines of Python in the starting version' },
    ],
    problem: [
      {
        type: 'p',
        text: 'Tibia has repetitive actions behind hotkeys: healing, mana, runes. I wanted a program to press them for me at a steady rhythm, also while the game window is minimised and I am doing something else. Simulated keyboard input goes to the active window, so the tool has to target the specific game window, not whatever has focus.',
      },
      {
        type: 'p',
        text: 'The first version from September 2024 worked but had bugs I only saw on returning to the project in October 2026. Tkinter reports key names (Return, space, comma) that pywinauto does not know; an unknown key threw an exception, the code treated it as a lost window, reconnected and tried again. A loop with no sleep at all, a traceback every iteration and no signal in the UI. Stop and Start less than 100 ms apart resurrected old threads, because there was one stop event for the app’s whole lifetime. Colours, limits and paths lived in three places at once.',
      },
    ],
    approach: [
      {
        type: 'p',
        text: 'Keys go through pywinauto to a window handle found by title, “<client> - <character>” (a regular expression, with an optional clients.txt for other servers), not to the active window. Every key has its own thread with an absolute time for the next press, so the overhead of window lookup and sending never accumulates into drift. Sleep is cut into 100 ms slices so Stop reacts at once, and the window handle is re-validated every 5 seconds.',
      },
      {
        type: 'p',
        text: 'Before touching the code I wrote the analysis down: bugs with severity, duplication, dead code, a staged plan of changes and open decisions. I checked pywinauto’s behaviour in the sources of version 0.6.9 instead of assuming what it does.',
      },
      {
        type: 'image',
        src: '/case-studies/tibia-key-presser/tkp_off.png',
        width: 430,
        height: 179,
        alt: 'Tibia Key Presser idle: key and delay rows, a Start button',
        caption: 'Idle: a white field waits for a click and a key to bind.',
      },
    ],
    solution: [
      {
        type: 'list',
        items: [
          'A keys.py module: a pure function translating tkinter key names into pywinauto codes (Return to ENTER, Prior to PGUP, punctuation to characters, the whole numpad), while modifiers alone do not bind, so Shift+F1 binds F1. Validation at bind time: an unsupported key is a red field and a message, with no way to start. Six pytest tests.',
          'The send loop waits an interval after a failed send, so a persistent error never becomes a busy loop.',
          'One source of truth: theme.py for colours, fonts and ttk styles, paths.py for paths in source mode and inside the .exe, so the icon no longer depends on the current directory.',
          'Tooling: pyproject with uv, ruff and pytest, a single-file .exe build through PyInstaller, clients.txt for OTS servers.',
          'Planned, not yet done: one scheduler thread instead of a thread per key. In pywinauto’s sources a send is SetKeyboardState and AttachThreadInput on the shared input queue, with no lock, so two threads with overlapping due times can overwrite each other’s keyboard state. Serialised threads have the same throughput as one scheduler, and Stop becomes set and join.',
        ],
      },
    ],
    outcome: [
      {
        type: 'p',
        text: 'Up to eight keys with independent delays, works with the game minimised, stops within about 100 ms and shows the character name in the window title. One .exe, no installation.',
      },
      {
        type: 'image',
        src: '/case-studies/tibia-key-presser/tkp_on.png',
        width: 430,
        height: 179,
        alt: 'Tibia Key Presser running: green key fields and a Stop button',
        caption:
          'Running: a green flash on a field means that key was just sent to the game.',
      },
    ],
    lessons: [
      'An exception caught as something else (an unknown key as a lost window) creates loops the UI never sees. Every error branch needs its own reaction and its own wait.',
      'Returning to your own code two years later starts with a written analysis, with severities and a plan. Changes made on the side cost more.',
    ],
  },
};
