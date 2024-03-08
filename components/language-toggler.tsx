'use client'

import * as React from 'react'
import { Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useParams, useSearchParams } from 'next/navigation'
import { Link, usePathname, useRouter } from '@/navigation'

export function LanguageToggle() {
  let pathname = usePathname()
  const router = useRouter()
  // const params = useParams()
  const searchParams = useSearchParams()
  const queryParams = new URLSearchParams(searchParams.toString())

  if (queryParams.size > 0) {
    pathname = pathname + '?' + queryParams.toString()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" text-white hover:text-foreground"
        >
          <Languages className="size-4" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: 'en' })}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(pathname, { locale: 'es' })}
        >
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
