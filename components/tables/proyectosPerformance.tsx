// import 'swiper/css';
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'

interface Props {
  proyectos: any[]
}

export default function ProyectoPerformance(props: Props) {
  useEffect(() => {}, [])

  const performanceTextColor = (value: number) => {
    let color = 'text-blue-700'

    if (value <= 35) {
      color = 'text-red-500'
    }

    if (value > 35 && value < 85) {
      color = 'text-yellow-400'
    }

    if (value >= 85) {
      color = 'text-green-500'
    }

    return color
  }

  const performanceBgColor = (value: number) => {
    let color = 'bg-blue-700'

    if (value <= 35) {
      color = 'bg-red-500'
    }

    if (value > 35 && value < 85) {
      color = 'bg-yellow-400'
    }

    if (value >= 85) {
      color = 'bg-green-500'
    }

    return color
  }

  return (
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="w-11/12 px-6 py-3">
            Proyectos
          </th>
          <th scope="col" className="w-1/12 px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.proyectos.map((item: any, index: number) => (
          <tr
            key={crypto.randomUUID()}
            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="w-11/12 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              <div className="mb-1 flex justify-between">
                <span
                  className={cn(
                    'text-base font-medium dark:text-white',
                    performanceTextColor(item.ejecucion),
                  )}
                >
                  {item.nombre}
                </span>
                <span
                  className={cn(
                    'text-sm font-medium dark:text-white',
                    performanceTextColor(item.ejecucion),
                  )}
                >
                  {item.ejecucion}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={cn(
                    'h-2.5 rounded-full',
                    performanceBgColor(item.ejecucion),
                  )}
                  style={{ width: `${item.ejecucion}%` }}
                ></div>
              </div>
            </th>

            <td className="w-1/12 px-6 py-4 text-right">
              <Link
                href="/dashboard/detalles"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                <FaArrowAltCircleRight />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
