import Link from 'next/link';

import Wordmark from '@/components/ui/Wordmark';

import { useLocale } from '@/locale/LocaleContext';

export default function Logo() {
  const { t } = useLocale();
  return (
    <Link href='/' className='relative' aria-label={t.backToHome}>
      <Wordmark />
    </Link>
  );
}
