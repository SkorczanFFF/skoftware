/**
 * Generate the static CV PDFs with real, selectable text using Puppeteer.
 *
 * Usage:
 *   1. Start dev server:  npm run dev
 *   2. Run this script:   node scripts/generate-cv-pdf.mjs
 *
 * Outputs (in public/):
 *   Maciej-Skorus-CV-PL.pdf       the designed, two-column page (/cv)
 *   Maciej-Skorus-CV-EN.pdf
 *   Maciej-Skorus-CV-PL-ATS.pdf   the single-column, parser-first page (/cv/ats)
 *   Maciej-Skorus-CV-EN-ATS.pdf
 *
 * Every file is tagged (structure tree from the DOM) and gets Title, Author,
 * Subject and Keywords metadata through pdf-lib — Chromium only writes Title.
 */

import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const FONTS_DIR = resolve(__dirname, '..', 'public', 'fonts');
const OUT_DIR = resolve(__dirname, '..', 'public');

const AUTHOR = 'Maciej Skorus';
const KEYWORDS = [
  'Maciej Skorus',
  'CV',
  'Resume',
  'Fullstack Developer',
  'Frontend Developer',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Python',
  'Three.js',
  'React Native',
];

// Resume container is 794x1123px — convert to mm for PDF page size
const pxToMm = (px) => (px * 25.4) / 96;
const WIDTH_MM = pxToMm(794);
const HEIGHT_MM = pxToMm(1123);

const localeUrl = (locale, path) =>
  locale === 'pl' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;

/** Leaves only `selector` in the body, keeping the font CSS variables alive. */
async function isolate(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`Could not find ${sel}`);

    // Capture font CSS variables before stripping — they live on a wrapper
    // div from _app.tsx, walked up from the element itself.
    const root = document.documentElement;
    const captured = {};
    for (const v of ['--font-grotesk', '--font-unica']) {
      let node = el;
      while (node) {
        const val = getComputedStyle(node).getPropertyValue(v).trim();
        if (val) {
          captured[v] = val;
          break;
        }
        node = node.parentElement;
      }
    }

    document.body.innerHTML = '';
    document.body.appendChild(el);
    for (const [k, v] of Object.entries(captured)) root.style.setProperty(k, v);

    // The font-grotesk utility lived on a stripped ancestor.
    el.style.fontFamily = `var(--font-grotesk), ui-sans-serif, system-ui, sans-serif`;
  }, selector);
}

/** Chromium's PDF renderer doesn't embed woff2 — swap in the TTFs. */
async function embedTtfFonts(page) {
  const g400 = readFileSync(
    resolve(FONTS_DIR, 'SpaceGrotesk-400.ttf'),
  ).toString('base64');
  const g700 = readFileSync(
    resolve(FONTS_DIR, 'SpaceGrotesk-700.ttf'),
  ).toString('base64');

  await page.evaluate(
    ({ g400, g700 }) => {
      for (const sheet of document.styleSheets) {
        try {
          const toDelete = [];
          for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            if (
              rule instanceof CSSFontFaceRule &&
              rule.style.fontFamily === 'spaceGrotesk'
            ) {
              toDelete.push(i);
            }
          }
          for (const idx of toDelete.reverse()) sheet.deleteRule(idx);
        } catch {}
      }

      const style = document.createElement('style');
      style.textContent = `
      @font-face {
        font-family: 'spaceGrotesk';
        src: url(data:font/truetype;base64,${g400}) format('truetype');
        font-weight: 400;
        font-display: swap;
      }
      @font-face {
        font-family: 'spaceGrotesk';
        src: url(data:font/truetype;base64,${g700}) format('truetype');
        font-weight: 700;
        font-display: swap;
      }
    `;
      document.head.appendChild(style);
    },
    { g400, g700 },
  );

  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 300));
}

async function openPage(browser, locale, path, title) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = localeUrl(locale, path);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // The PDF's Title metadata is the document title: name first, so a parser
  // reading metadata does not take the brand for the candidate.
  await page.evaluate((t) => {
    document.title = t;
  }, title);

  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 500));
  return { page, url };
}

/** Title, Author, Subject, Keywords, Language — what Chromium leaves out. */
async function stampMetadata(path, { title, subject, locale }) {
  const doc = await PDFDocument.load(readFileSync(path), {
    updateMetadata: false,
  });
  doc.setTitle(title);
  doc.setAuthor(AUTHOR);
  doc.setSubject(subject);
  doc.setKeywords(KEYWORDS);
  doc.setLanguage(locale);
  doc.setCreator('skoftware.pl (Puppeteer + pdf-lib)');
  // No object streams: a plain xref table is readable by every parser,
  // including the older ones behind some recruitment portals.
  writeFileSync(path, await doc.save({ useObjectStreams: false }));
}

/** The designed page: the 794×1123 container printed 1:1 on one page. */
async function generateDesigned(browser, locale) {
  const L = locale.toUpperCase();
  const title = `${AUTHOR} - CV (${L})`;
  const { page, url } = await openPage(browser, locale, '/cv', title);

  await isolate(page, 'div[class*="overflow-hidden"][class*="w-[794px]"]');
  await embedTtfFonts(page);

  await page.addStyleTag({
    content: `
      @page { size: ${WIDTH_MM}mm ${HEIGHT_MM}mm; margin: 0; }
      html, body {
        margin: 0 !important; padding: 0 !important;
        width: 794px !important; height: 1123px !important;
        overflow: hidden !important; background: none !important;
      }
    `,
  });

  const outPath = resolve(OUT_DIR, `Maciej-Skorus-CV-${L}.pdf`);
  await page.pdf({
    path: outPath,
    width: `${WIDTH_MM}mm`,
    height: `${HEIGHT_MM}mm`,
    printBackground: true,
    // Structure tree from the DOM (h1, h2, ul, address): parsers that read it
    // get the sections in order instead of guessing from the layout.
    tagged: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();

  await stampMetadata(outPath, {
    title,
    subject: `CV - Creative Fullstack Developer (${L})`,
    locale,
  });
  console.log(`  ${locale}: ${url} -> ${outPath}`);
}

/** The parser-first page: A4 with margins, as many pages as the text needs. */
async function generateAts(browser, locale) {
  const L = locale.toUpperCase();
  const title = `${AUTHOR} - CV (${L}, ATS)`;
  const { page, url } = await openPage(browser, locale, '/cv/ats', title);

  await isolate(page, '#ats-resume');
  await embedTtfFonts(page);

  await page.addStyleTag({
    content: `
      @page { size: A4; margin: 14mm 16mm; }
      html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
      #ats-resume { max-width: none !important; padding: 0 !important; color: #000 !important; }
      #ats-resume a { color: #000 !important; text-decoration: none !important; }
    `,
  });

  const outPath = resolve(OUT_DIR, `Maciej-Skorus-CV-${L}-ATS.pdf`);
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: false,
    tagged: true,
    preferCSSPageSize: true,
  });
  await page.close();

  await stampMetadata(outPath, {
    title,
    subject: `CV - Creative Fullstack Developer (${L}, ATS version)`,
    locale,
  });
  console.log(`  ${locale} ATS: ${url} -> ${outPath}`);
}

console.log('Generating CV PDFs...');
console.log(`Using: ${BASE_URL}\n`);

const browser = await puppeteer.launch({ headless: true });
try {
  for (const locale of ['en', 'pl']) {
    await generateDesigned(browser, locale);
    await generateAts(browser, locale);
  }
} finally {
  await browser.close();
}

console.log('\nDone!');
