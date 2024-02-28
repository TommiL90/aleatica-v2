import React, { useEffect, useState } from 'react'

import {
  subCategoriaActuacionIndicadores,
  especialidadActuacionIndicadores,
} from '@/context/indicadores'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'

import Breadcrumbs from '@/components/breadcrumbs'
import Header from '@/components/header'

const performanceStyle = (value: string) => {
  switch (value) {
    case 'pending':
      return (
        <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          En proceso
        </span>
      )
    case 'completed':
      return (
        <span className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Completado
        </span>
      )
    case 'overtime':
      return (
        <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
          Incumplimiento
        </span>
      )
  }
}

const proyectos = Array.from({ length: 10 }, (item: any, idx: number) => ({
  id: idx + 1,
  anno: 2023,
  name: `Proyecto #${idx + 1}`,
  subcategoria: subCategoriaActuacionIndicadores.map((item) => ({
    name: item.nombre,
    tasks: [
      {
        name: 'Catalogo de Unidades simples',
        tiempoPlanificado: Math.floor(Math.random() * 365),
        tiempoReal: Math.floor(Math.random() * 365),
      },
      {
        name: 'Catalogo de Unidades compuestas',
        tiempoPlanificado: Math.floor(Math.random() * 365),
        tiempoReal: Math.floor(Math.random() * 365),
      },
      {
        name: 'Catalogo de actuaciones ',
        tiempoPlanificado: Math.floor(Math.random() * 365),
        tiempoReal: Math.floor(Math.random() * 365),
      },
    ],
  })),
}))

function CostoTareas() {
  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Costos de tareas', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="bg-gray-50 px-6 py-3 dark:bg-gray-800"
                    >
                      Proyectos
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-50 px-6 py-3 dark:bg-gray-800"
                    >
                      Anno
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tiempo Planificado (dias)
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-50 px-6 py-3 dark:bg-gray-800"
                    >
                      Tiempo Real (dias)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Diff
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((item: any, index: number) => (
                    <>
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                        >
                          <span className="mr-2  rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            {item.name}
                          </span>
                        </th>
                        <th
                          scope="row"
                          className="whitespace-nowrap bg-gray-50 px-6 py-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                        >
                          {item.anno}
                        </th>
                        <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800"></td>
                        <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800"></td>
                        <td className="px-6 py-4 font-medium"></td>
                      </tr>
                      {item.subcategoria.map((subcat: any, index: number) => (
                        <>
                          <tr
                            key={crypto.randomUUID()}
                            className="border-b border-gray-200 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="whitespace-nowrap bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                            >
                              <span className="mr-2  rounded bg-yellow-100 px-4 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">{`- ${subcat.name}`}</span>
                            </th>
                            <th
                              scope="row"
                              className="whitespace-nowrap bg-gray-50 px-6 py-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                            ></th>
                            <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800"></td>
                            <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800"></td>
                            <td className="px-6 py-4 font-medium"></td>
                          </tr>

                          {subcat.tasks.map((item: any) => (
                            <tr
                              key={crypto.randomUUID()}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="whitespace-nowrap bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                              >
                                {item.tiempoPlanificado - item.tiempoReal >
                                0 ? (
                                  <span
                                    suppressHydrationWarning
                                    className="mr-2 rounded bg-green-100 px-5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                                  >{`- ${item.name}`}</span>
                                ) : (
                                  <span
                                    suppressHydrationWarning
                                    className="mr-2 rounded bg-red-100 px-5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                                  >{`- ${item.name}`}</span>
                                )}
                              </th>
                              <th
                                scope="row"
                                className="whitespace-nowrap bg-gray-50 px-6 py-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                              ></th>
                              <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800">
                                <span suppressHydrationWarning>
                                  {' '}
                                  {` ${item.tiempoPlanificado}`}
                                </span>
                              </td>
                              <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800">
                                <span suppressHydrationWarning>
                                  {' '}
                                  {` ${item.tiempoReal}`}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {item.tiempoPlanificado - item.tiempoReal >
                                0 ? (
                                  <span
                                    suppressHydrationWarning
                                    className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                                  >
                                    {item.tiempoPlanificado - item.tiempoReal}
                                  </span>
                                ) : (
                                  <span
                                    suppressHydrationWarning
                                    className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                                  >
                                    {item.tiempoPlanificado - item.tiempoReal}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CostoTareas
