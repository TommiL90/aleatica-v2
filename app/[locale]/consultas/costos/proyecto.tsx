import React, { useEffect, useState } from 'react'

import {
  subCategoriaActuacionIndicadores,
  especialidadActuacionIndicadores,
} from '@/context/indicadores'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'
import Select from 'react-select'
import classNames from 'classnames'
import Breadcrumbs from '@/components/breadcrumbs'

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

const proyectos = Array.from({ length: 30 }, (item: any, idx: number) => ({
  id: idx + 1,
  anno: 2014,
  name: `Proyecto #${idx + 1}`,
  presupuestoPlanificado: Math.floor(Math.random() * 100000),
  presupuestoReal: Math.floor(Math.random() * 100000),
}))

function CostoProyecto() {
  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Costos de proyectos', link: null },
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
                      Presupuesto planificado
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-50 px-6 py-3 dark:bg-gray-800"
                    >
                      Presupuesto Real
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Diff
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((item: any, index: number) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                      >
                        {item.name}
                      </th>
                      <th
                        scope="row"
                        className="whitespace-nowrap bg-gray-50 px-6 py-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                      >
                        {item.anno}
                      </th>
                      <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800">
                        <span suppressHydrationWarning>
                          {' '}
                          {`$ ${item.presupuestoPlanificado}`}
                        </span>
                      </td>
                      <td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800">
                        <span suppressHydrationWarning>
                          {' '}
                          {`$ ${item.presupuestoReal}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {item.presupuestoPlanificado - item.presupuestoReal >
                        0 ? (
                          <span
                            suppressHydrationWarning
                            className="text-green-600"
                          >
                            ${' '}
                            {item.presupuestoPlanificado - item.presupuestoReal}
                          </span>
                        ) : (
                          <span
                            suppressHydrationWarning
                            className="text-red-600"
                          >
                            ${' '}
                            {item.presupuestoPlanificado - item.presupuestoReal}
                          </span>
                        )}
                      </td>
                    </tr>
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

export default CostoProyecto
