import React, { useEffect, useState } from 'react'

import {
  subCategoriaActuacionIndicadores,
  especialidadActuacionIndicadores,
} from '@/context/indicadores'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'
import Select from 'react-select'

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

const performanceStyle = (value: number) => {
  if (value > 20 && value < 100)
    return (
      <span
        suppressHydrationWarning
        className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      >
        En proceso
      </span>
    )
  if (value <= 20)
    return (
      <span
        suppressHydrationWarning
        className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
      >
        Incumplimiento
      </span>
    )

  return (
    <span
      suppressHydrationWarning
      className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
    >
      Completado
    </span>
  )
}

const options = [
  { label: 'Proyecto 1', value: 1 },
  { label: 'Proyecto 2', value: 2 },
  { label: 'Proyecto 3', value: 3 },
]

const proyectos = Array.from({ length: 10 }, (item: any, idx: number) => ({
  id: idx + 1,
  subcategoria: [
    {
      name: 'Catalogo de unidades simples',
      performance: Math.floor(Math.random() * 100),
    },
    {
      name: 'Catalogo de unidades compuestas',
      performance: Math.floor(Math.random() * 100),
    },
    {
      name: 'Catalogo de unidades actuaciones',
      performance: Math.floor(Math.random() * 100),
    },
  ],
}))

function ProyectoSubcategoriaEstado() {
  const [_document, set_document] = useState<Document>()
  const [proyecto, setProyecto] = useState(options[0])
  useEffect(() => {
    set_document(document)
  }, [])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
              <Select
                id="newEntry"
                instanceId="newEntry"
                placeholder="Proyectos"
                className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                options={options}
                value={proyecto}
                onChange={(newValue: any) => setProyecto(newValue)}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menuList: (base) => ({ ...base, color: 'black' }),
                }}
                menuPortalTarget={_document?.body}
                menuPlacement="auto"
              />
            </th>
            <th scope="col" className="px-6 py-3">
              Rendimiento
            </th>
          </tr>
        </thead>
        <tbody>
          {proyecto != null
            ? proyectos
                .filter((item) => item.id == proyecto['value'])[0]
                .subcategoria.map((item: any, index: number) => (
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
                    <td className="px-6 py-4">
                      {performanceStyle(item.performance)}
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default ProyectoSubcategoriaEstado
