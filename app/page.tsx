'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathName = usePathname()

  console.log(pathName)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  )
}
