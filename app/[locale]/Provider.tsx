'use client'

import { AppProvider } from '@/context/appContext'

interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  return <AppProvider>{children}</AppProvider>
}

export default Provider
