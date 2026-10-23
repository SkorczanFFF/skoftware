import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { CASE_STUDIES_PATH, CASE_STUDIES_SECTION_ID } from '@/lib/caseStudies';
import { ScrollTrigger } from '@/lib/gsap';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';

import Desktop from '@/components/layout/Header/Partials/Desktop';
import Logo from '@/components/layout/Header/Partials/Logo';
import Mobile from '@/components/layout/Header/Partials/Mobile';
import { sectionIdOf } from '@/components/layout/Header/sectionId';

import { useLocale } from '@/locale/LocaleContext';

function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'pl' : 'en')}
      aria-label={t.switchLanguage}
      className={`font-unica flex items-center gap-1 text-xl md:text-md tracking-wider text-white transition-colors mt-1 ${className ?? ''}`}
    >
      <span
        className={`relative duration-200 ${locale === 'en' ? 'font-semibold text-orange' : 'text-white/60'}`}
      >
        <span
          className={`absolute right-[-1px] bottom-[-1px] pointer-events-none ${locale === 'en' ? 'text-white' : 'text-primary-blue'}`}
          aria-hidden='true'
        >
          EN
        </span>
        <span className='relative'>EN</span>
      </span>
      <span className='text-white/70'>|</span>
      <span
        className={`relative duration-200 ${locale === 'pl' ? 'font-semibold text-orange' : 'text-white/60'}`}
      >
        <span
          className={`absolute right-[-1px] bottom-[-1px] pointer-events-none ${locale === 'pl' ? 'text-white' : 'text-primary-blue'}`}
          aria-hidden='true'
        >
          PL
        </span>
        <span className='relative'>PL</span>
      </span>
    </button>
  );
}

const SECTION_IDS = [
  'services',
  CASE_STUDIES_SECTION_ID,
  'portfolio',
  'contact',
];

function useActiveSection() {
  const [active, setActive] = useState<string>('home');
  const { pathname } = useRouter();

  // Rebuilt per page: the header never unmounts, so triggers made on one
  // page would keep pointing at elements the next page has detached.
  useEffect(() => {
    // An article has none of the home sections; it belongs to its own link.
    if (pathname.startsWith(CASE_STUDIES_PATH)) {
      setActive(CASE_STUDIES_SECTION_ID);
      return;
    }
    setActive('home');
    const triggers: ScrollTrigger[] = [];
    const contact = document.getElementById('contact');

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const isServices = id === 'services';
      const isContact = id === 'contact';
      const isPortfolio = id === 'portfolio';

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: isContact ? 'bottom bottom' : 'bottom center',
          // Portfolio is pinned during horizontal scroll — its physical height
          // doesn't reflect the actual scroll range. Use contact as the end marker
          // so portfolio stays active until contact enters the viewport.
          ...(isPortfolio &&
            contact && {
              endTrigger: contact,
              end: 'top center',
            }),
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
          ...(isServices && {
            onLeaveBack: () => setActive('home'),
          }),
        }),
      );
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [pathname]);

  return active;
}

export default function Header(): React.JSX.Element {
  const { t } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const activeSection = useActiveSection();

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useHeaderScroll(headerRef, progressRef);

  const links = [
    { href: '/#home', label: t.navHome },
    { href: '/#services', label: t.navServices },
    { href: `/#${CASE_STUDIES_SECTION_ID}`, label: t.navCaseStudies },
    { href: '/#portfolio', label: t.navPortfolio },
    { href: '/#contact', label: t.navContact },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isMenuOpen]);

  // Focus management: move focus into menu on open, return to hamburger on close
  useEffect(() => {
    if (isMenuOpen) {
      wasOpen.current = true;
      const timer = setTimeout(() => {
        const firstLink = menuRef.current?.querySelector<HTMLElement>('a');
        firstLink?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else if (wasOpen.current) {
      wasOpen.current = false;
      hamburgerRef.current?.focus();
    }
  }, [isMenuOpen]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleClick = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* `data-scrolled` comes from useHeaderScroll. Scrolled, the bar
          flattens by a quarter and takes a light tint — the nav text keeps
          its offset duplicate for contrast, so the tint only has to settle
          busy backgrounds, not carry the legibility. The bar never hides:
          the CV and the case studies are long reads with no in-page nav. */}
      <header
        ref={headerRef}
        className='font-grotesk fixed top-2 left-2 right-2 z-50 flex h-[46px] items-center justify-between opacity-95 backdrop-blur-[10px] border-2 border-[#80183433] rounded-[3px] transition-[height,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-scrolled:h-[34px] data-scrolled:bg-primary-blue/35 data-scrolled:border-raspberry/40'
      >
        {/* Reading progress, drawn over the bottom border: the frame spans the
            border box and clips to the same radius, so the line bends round
            the corners like the border it fills instead of poking past them.
            Bright tints rather than the brand gradient, which shares the
            border's colours and would vanish into it. Scaled by
            useHeaderScroll; the inline value is for the server render. */}
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -inset-[2px] overflow-hidden rounded-[3px]'
        >
          <span
            ref={progressRef}
            className='absolute inset-x-0 bottom-0 h-[2px] origin-left bg-linear-to-r from-orange-bright to-raspberry-bright'
            style={{ transform: 'scaleX(0)' }}
          />
        </span>
        <div className='flex h-full w-full items-center justify-between'>
          <div className='flex h-full items-center gap-3'>
            <div className='ml-3 flex items-center'>
              <Logo />
            </div>
            <LocaleToggle className='hidden lg:flex items-center' />
          </div>
          <div className='flex h-full items-center gap-3'>
            <Mobile
              ref={hamburgerRef}
              isMenuOpen={isMenuOpen}
              handleClick={handleClick}
            />
            <Desktop links={links} activeSection={activeSection} />
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-hidden lg:hidden ${isMenuOpen ? '' : 'pointer-events-none'}`}
      >
        <div
          ref={menuRef}
          role='dialog'
          aria-modal={isMenuOpen}
          aria-label={t.navMenuLabel}
          inert={!isMenuOpen || undefined}
          className={`bg-[#00000024] flex min-h-full w-full items-center justify-center border-b border-primary-blue backdrop-blur-[10px] transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav
            aria-label={t.navMenuLabel}
            className='flex h-full w-full flex-col items-center justify-center'
          >
            <ul className='flex flex-col items-center space-y-8'>
              {links.map(({ href, label }) => {
                const isActive = sectionIdOf(href) === activeSection;
                return (
                  <li key={`${href}${label}`} className='text-center'>
                    <Link
                      href={href}
                      scroll={false}
                      className={`relative text-3xl font-light uppercase tracking-widest transition-all duration-300 hover:tracking-[0.2em] ${isActive ? 'text-real-white tracking-[0.2em]' : 'text-real-white/60'}`}
                      onClick={handleClick}
                    >
                      <span
                        className='absolute right-[-1px] bottom-[-2px] text-primary-blue pointer-events-none'
                        aria-hidden='true'
                      >
                        {label}
                      </span>
                      <span className='relative'>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className='mt-10'>
              <LocaleToggle className='text-xl' />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
