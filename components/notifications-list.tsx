// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay } from 'swiper'
// import 'swiper/css'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
  notificaciones: any[]
}

export default function NotificacionesList(props: Props) {
  useEffect(() => {}, [])

  const statusColor = (status: string) => {
    switch (status) {
      case 'danger':
        return {
          textBold: 'Alerta!',
          background: 'bg-red-100',
          border: 'border-red-400',
          textColor: 'text-red-700',
          iconCloseColor: 'text-red-500',
        }

      case 'pending':
        return {
          textBold: 'Atento!',
          background: 'bg-orange-100',
          border: 'border-orange-500',
          textColor: 'text-orange-700',
          iconCloseColor: 'text-orange-500',
        }

      case 'success':
        return {
          textBold: 'Completado!',
          background: 'bg-green-100',
          border: 'border-green-500',
          textColor: 'text-green-700',
          iconCloseColor: 'text-green-500',
        }
    }
  }

  return (
    <div className="rounded-sm bg-white py-4">
      <h2 className="bg-gray-50 text-xs font-bold uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        Alertas
      </h2>
      {props.notificaciones.map((item: any, index: number) => {
        const status: any = statusColor(item.estado)
        return (
          <div
            key={index}
            className={cn(
              'relative my-1 rounded px-4 py-3',
              status.background,
              status.border,
              status.textColor,
            )}
            role="alert"
          >
            <strong className="font-bold">{status.textBold} </strong>
            <span className="block sm:inline">{item.nombre}</span>
            <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
              <svg
                className={cn('h-6 w-6 fill-current', status.iconCloseColor)}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )
      })}
    </div>
  )
}
