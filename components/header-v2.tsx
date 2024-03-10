import Image from 'next/image'
import { Link } from '@/navigation'
import logo from '@/public/images/logo.svg'

import { Navbar } from './navbar'
import { NavbarMobile } from './navbar/navbar-mobile'
import { LanguageToggle } from './language-toggler'

export function HeaderV2() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-primary">
      <div className="flex h-16 items-center space-x-4 px-16 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Aleatica logo"
            className="h-11 "
            height={64}
            width={256}
            priority
          />
        </Link>
        {/* <MainNav items={siteConfig.mainNav} /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="lg:hidden">
            {' '}
            <NavbarMobile /> <LanguageToggle />
          </div>{' '}
          <div className="hidden lg:inline-flex">
            {' '}
            <Navbar />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
