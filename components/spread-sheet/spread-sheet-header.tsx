'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { textVariants, titleVariants } from '../typography'

interface Props {
  children: React.ReactNode
  title: string
  description: string
}
const SpreadSheetHeader = ({ title, description, children }: Props) => {
  return (
    <div className="justify-between pt-4 text-left">
      <div>
        <h2 className={cn(titleVariants({ variant: 'h4' }))}>{title}</h2>
        <p className={cn(textVariants({ variant: 'muted' }))}>{description}</p>
      </div>
      <div className="flex items-center justify-between">{children}</div>
    </div>
  )
}

export default SpreadSheetHeader
