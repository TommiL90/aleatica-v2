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
  NavbarItem as NavBarType,
  navbarList,
} from './navbarList'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const NavbarSubItem: React.FC<{ subItem: NavBarFirstSubItem }> = ({
  subItem,
}) => (
  <>
    {subItem.href ? (
      <MenubarItem>
        <Link href={subItem.href}>{subItem.title}</Link>
      </MenubarItem>
    ) : (
      <MenubarSub>
        <MenubarSubTrigger>{subItem.title}</MenubarSubTrigger>
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

const NavbarSecondSubItem: React.FC<{ subItem: NavBarSecondSubItem }> = ({
  subItem,
}) => (
  <>
    {subItem.href ? (
      <MenubarItem>
        <Link href={subItem.href}>{subItem.title}</Link>
      </MenubarItem>
    ) : (
      <MenubarSub>
        <MenubarSubTrigger>{subItem.title}</MenubarSubTrigger>
        <MenubarSubContent>
          {subItem.thirdSubItems &&
            subItem.thirdSubItems.map((thirdSubItem, idx) => (
              <MenubarItem key={idx}>
                <Link href={thirdSubItem.href}>{thirdSubItem.title}</Link>
              </MenubarItem>
            ))}
        </MenubarSubContent>
      </MenubarSub>
    )}
  </>
)

export const Navbar = () => (
  <nav>
    <Menubar>
      {navbarList.map((item, index) => (
        <NavbarItem key={index} item={item} />
      ))}
    </Menubar>
  </nav>
)

const NavbarItem: React.FC<{ item: NavBarType }> = ({ item }) => (
  <>
    {item.href ? (
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Link href={item.href}>{item.title}</Link>
        </MenubarTrigger>
      </MenubarMenu>
    ) : (
      <MenubarMenu>
        <MenubarTrigger className="group">
          <span>{item.title}</span>
          <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transform transition-transform duration-200 group-hover:rotate-180"
            aria-hidden="true"
          />
        </MenubarTrigger>
        <MenubarContent>
          {item.firstSubItems &&
            item.firstSubItems.map((firstSubItem, index) => (
              <NavbarSubItem key={index} subItem={firstSubItem} />
            ))}
        </MenubarContent>
      </MenubarMenu>
    )}
  </>
)
