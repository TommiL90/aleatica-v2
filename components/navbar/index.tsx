import React from 'react'
import Link from 'next/link'


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'

import {
  NavBarFirstSubItem,
  NavBarSecondSubItem,
  navbarList,
} from './navbarList'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

const NavbarSubItem: React.FC<{ subItem: NavBarFirstSubItem }> = ({
  subItem,
}) => {
  const t = useTranslations('NavbarList')
  return (
    <>
    {subItem.href ? (
      <MenubarItem>
        <Link href={subItem.href}>{t(subItem.title)}</Link>
      </MenubarItem>
    ) : (
      <MenubarSub>
        <MenubarSubTrigger>{t(subItem.title)}</MenubarSubTrigger>
        <MenubarSubContent>
          {subItem.secondSubItems &&
            subItem.secondSubItems.map((secondSubItem, idx) => (
              <NavbarSecondSubItem key={idx} subItem={secondSubItem} />
            ))}
        </MenubarSubContent>
      </MenubarSub>
    )}
  </>
  )
}

const NavbarSecondSubItem: React.FC<{ subItem: NavBarSecondSubItem }> = ({
  subItem,
}) => {
  const t = useTranslations('NavbarList')
  return (
    <>
    {subItem.href ? (
      <MenubarItem>
        <Link href={subItem.href}>{t(subItem.title)}</Link>
      </MenubarItem>
    ) : (
      <MenubarSub>
        <MenubarSubTrigger>{t(subItem.title)}</MenubarSubTrigger>
        <MenubarSubContent>
          {subItem.thirdSubItems &&
            subItem.thirdSubItems.map((thirdSubItem, idx) => (
              <MenubarItem key={idx}>
                <Link href={thirdSubItem.href}>{t(thirdSubItem.title)}</Link>
              </MenubarItem>
            ))}
        </MenubarSubContent>
      </MenubarSub>
    )}
  </>
  )
}

export const Navbar = () => {
  const t = useTranslations('NavbarList')
 return (
  <nav>
    <Menubar className="border-none bg-transparent">
      {navbarList.map((item, index) => (
        <MenubarMenu key={index}>
          {item.href ? (
            <MenubarTrigger className="cursor-pointer text-neutral-100">
              
              <Link href={item.href}>{t(item.title)}</Link>
            </MenubarTrigger>
          ) : (
            <MenubarTrigger className="group  text-neutral-100">
              <span>{t(item.title)}</span>
              <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transform transition-transform duration-200 group-hover:rotate-180"
                aria-hidden="true"
              />
            </MenubarTrigger>
          )}

          {item.firstSubItems && (
            <MenubarContent>
              {item.firstSubItems.map((firstSubItem, subIndex) => (
                <NavbarSubItem key={subIndex} subItem={firstSubItem} />
              ))}
            </MenubarContent>
          )}
        </MenubarMenu>
      ))}
    </Menubar>
  </nav>)
}
