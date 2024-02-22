'use client'
import React from 'react'

interface Props {
  children: React.ReactNode
}
const SpreadSheetRoot = ({ children }:Props) => {
  return (
    <section className='lg:w-12/12 max-h-screen w-full lg:m-auto'>{children}</section>
  )
}

export default SpreadSheetRoot