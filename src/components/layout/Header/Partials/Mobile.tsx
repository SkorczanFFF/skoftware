import React from 'react';

import { useLocale } from '@/locale/LocaleContext';

interface MobileProps {
  isMenuOpen: boolean;
  handleClick: () => void;
}

const Mobile = React.forwardRef<HTMLButtonElement, MobileProps>(
  ({ isMenuOpen, handleClick }, ref) => {
    const { t } = useLocale();
    return (
      <button
        ref={ref}
        onClick={handleClick}
        aria-expanded={isMenuOpen}
        className='relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden'
        aria-label={t.toggleMenu}
      >
        <span
          className={`burger-line h-[2px] w-6 bg-raspberry shadow-[1px_1px_0_white] transition-[translate,rotate,opacity] duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`burger-line h-[2px] w-6 bg-raspberry shadow-[1px_1px_0_white] transition-[translate,rotate,opacity] duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`burger-line h-[2px] w-6 bg-raspberry shadow-[1px_1px_0_white] transition-[translate,rotate,opacity] duration-300 ease-in-out ${
            isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </button>
    );
  },
);

Mobile.displayName = 'Mobile';
export default Mobile;
