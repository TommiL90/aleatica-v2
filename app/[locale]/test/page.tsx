'use client'

import { LanguageToggle } from '@/components/language-toggler'
import { useTranslations } from 'next-intl'

const IndexPage = () => {
  const t = useTranslations('Index')
  return (
    <div>
      <LanguageToggle />
      <h1 className="text-2xl">{t('title')}</h1>
    </div>
  )
}

export default IndexPage
