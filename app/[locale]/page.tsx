import { LanguageToggle } from '@/components/language-toggler';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Index')
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
         <LanguageToggle />
      <h1 className="text-2xl">{t('title')}</h1>
      <Link href='/test' >Test page </Link>
    </main>
  );
}
