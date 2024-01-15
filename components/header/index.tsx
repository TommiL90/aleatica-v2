import Image from 'next/image'
import logo from '@/public/images/logo.svg'
import Link from 'next/link'
import { Navbar } from '../navbar'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background  bg-green-400">
      <div className="flex h-16 items-center space-x-4 px-16 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Aleatica logo"
            className="h-11 "
            height={64}
            width={256}
          />
        </Link>
        {/* <MainNav items={siteConfig.mainNav} /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Navbar />
        </div>
      </div>
    </header>
  )
}
