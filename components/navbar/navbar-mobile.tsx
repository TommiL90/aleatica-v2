import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BiMenu } from 'react-icons/bi'
import { Button } from '../ui/button'
import { navbarList } from './navbarList'
import Link from 'next/link'

export function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-transparent"
        >
          <BiMenu size={24} className="text-muted hover:text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menú de Navegación</SheetTitle>
          <SheetDescription>
            Un menú de navegación para el sitio web.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {navbarList.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              {item.href ? (
                <AccordionItem value={item.title}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <SheetClose asChild>
                      <Link href={item.href}>Ir a {item.title}</Link>
                    </SheetClose>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <AccordionItem value={item.title}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    {item.firstSubItems && (
                      <>
                        {item.firstSubItems.map((firstSubItem, subIdx) => (
                          <Accordion
                            key={subIdx}
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {firstSubItem.href ? (
                              <AccordionItem
                                key={subIdx}
                                value={firstSubItem.title}
                              >
                                <AccordionTrigger>
                                  {firstSubItem.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <SheetClose asChild>
                                    <Link href={firstSubItem.href}>
                                      Ir a {firstSubItem.title}
                                    </Link>
                                  </SheetClose>
                                </AccordionContent>
                              </AccordionItem>
                            ) : (
                              <AccordionItem
                                key={subIdx}
                                value={firstSubItem.title}
                              >
                                <AccordionTrigger>
                                  {firstSubItem.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  {firstSubItem.secondSubItems && (
                                    <>
                                      {firstSubItem.secondSubItems.map(
                                        (secondSubItem, secondSubIndex) => (
                                          <Accordion
                                            key={secondSubIndex}
                                            type="single"
                                            collapsible
                                            className="w-full"
                                          >
                                            {secondSubItem.href ? (
                                              <AccordionItem
                                                key={secondSubIndex}
                                                value={secondSubItem.title}
                                              >
                                                <AccordionTrigger>
                                                  {secondSubItem.title}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                  <SheetClose asChild>
                                                    <Link
                                                      href={secondSubItem.href}
                                                    >
                                                      Ir a {secondSubItem.title}
                                                    </Link>
                                                  </SheetClose>
                                                </AccordionContent>
                                              </AccordionItem>
                                            ) : (
                                              <AccordionItem
                                                key={secondSubIndex}
                                                value={secondSubItem.title}
                                              >
                                                <AccordionTrigger>
                                                  {secondSubItem.title}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                  {secondSubItem.thirdSubItems && (
                                                    <ul className="flex flex-col gap-4">
                                                      {secondSubItem.thirdSubItems.map(
                                                        (
                                                          thirdSubItem,
                                                          thirdSubIndex,
                                                        ) => (
                                                          <li
                                                            key={thirdSubIndex}
                                                          >
                                                            <Link
                                                              href={
                                                                thirdSubItem.href
                                                              }
                                                            >
                                                              Ir a{' '}
                                                              {
                                                                thirdSubItem.title
                                                              }
                                                            </Link>
                                                          </li>
                                                        ),
                                                      )}
                                                    </ul>
                                                  )}
                                                </AccordionContent>
                                              </AccordionItem>
                                            )}
                                          </Accordion>
                                        ),
                                      )}
                                    </>
                                  )}
                                </AccordionContent>
                              </AccordionItem>
                            )}
                          </Accordion>
                        ))}
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
