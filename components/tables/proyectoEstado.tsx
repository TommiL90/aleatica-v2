import React, { useEffect, useState } from 'react'

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

const options = [
  { label: 'Proyecto 1', value: 1 },
  { label: 'Proyecto 2', value: 2 },
  { label: 'Proyecto 3', value: 3 },
]

const proyectos = Array.from({ length: 10 }, (item: any, idx: number) => ({
  id: idx + 1,
  tasks: [
    {
      name: 'Pavimentos',
      performance: 'pending',
      responsable: 'Arturo Montoto',
      aprobado: true,
      aprobacion: 'Lemus',
    },
    {
      name: 'Estructuras',
      performance: 'completed',
      responsable: 'Arturo Montoto',
      aprobado: true,
      aprobacion: 'Esther',
    },
    {
      name: 'Safety',
      performance: 'overtime',
      responsable: 'Arturo Montoto',
      aprobacion: 'Rita',
      aprobado: false,
    },
  ],
}))

function ProyectoEstado() {
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
              Estado
            </th>
            <th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
              Responsable
            </th>
            <th scope="col" className="px-6 py-3">
              Aprobado por
            </th>
            <th scope="col" className="px-6 py-3">
              Aprobado
            </th>
          </tr>
        </thead>
        <tbody>
          {proyecto != null
            ? proyectos
                .filter((item) => item.id == proyecto['value'])[0]
                .tasks.map((item: any, index: number) => (
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
                    <td className="bg-gray-50 px-6 py-4 dark:bg-gray-800">
                      {item.responsable}
                    </td>
                    <td className="bg-gray-50 px-6 py-4 dark:bg-gray-800">
                      {item.aprobacion}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center rounded pl-4 dark:border-gray-700">
                        <input
                          id="diferido"
                          type="checkbox"
                          value={item.aprobado}
                          name="bordered-checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        {/* <label htmlFor="diferido" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aprobado</label> */}
                      </div>
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default ProyectoEstado
