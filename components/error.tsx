'use client'
import { Link } from '@/navigation'
import React from 'react'
import Image from 'next/image'

interface Props {
  label: string
  description: String
}
export default function ErrorComponent(props: Props) {
  return (
    <div className="flex w-full items-center text-center">
      <div role="status mx-auto bg-red-100 " style={{ margin: '0 auto' }}>
        <div role="alert">
          <div className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
            {props.label}
          </div>
          <div className="border border-b-0 border-t-0 border-red-400  bg-red-100 px-4 py-3 text-red-700">
            <p>{props.description}</p>
          </div>
        </div>
        <Image
          src={'/images/failure.jpg'}
          className="border  border-red-400"
          alt="Picture of the author"
          width={500}
          height={500}
          priority
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </div>
    </div>
  )
}
