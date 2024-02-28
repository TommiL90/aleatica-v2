import { cn } from '@/lib/utils'
import { ChangeEvent, useEffect, useId, useState } from 'react'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import Select from 'react-select'

interface EntronquesProps {
  tramoId: number
  entronques: any[]
  entronquesTramo: any[]
  entronquesxTramo: any[]
  gazas: any[]
  errors: any
  onChange: Function
}

interface EntronquesProps {
  tramoId: number
  entronques: any[]
  entronquesTramo: any[]
  entronquesxTramo: any[]
  gazas: any[]
  errors: any
  onChange: Function
}

export function EntronquesComponent(props: EntronquesProps) {
  const [currentSelectValue, setCurrentSelectValue] = useState(null)
  const [currentFechaAlta, setCurrentFechaAlta] = useState('')
  const [currentFechaBaja, setCurrentFechaBaja] = useState('')
  const [currentFechaModificacion, setCurrentFechaModificacion] = useState('')
  const [currentEstado, setCurrentEstado] = useState(false)
  const [items, setItems] = useState(props.entronquesTramo)

  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const handleFechaAltaChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number | string,
  ) => {
    e.preventDefault()
    const { value } = e.target
    if (id == 0) {
      setCurrentFechaAlta(value)
    } else {
      props.onChange([
        ...props.entronquesTramo.map((item: any) => ({
          ...item,
          fechaAlta: item.id === id ? value : item.fechaAlta,
        })),
      ])
    }
  }

  const handleFechaBajaChange = (e: ChangeEvent<HTMLInputElement>, id: any) => {
    e.preventDefault()
    const { value } = e.target
    if (id == 0) {
      setCurrentFechaBaja(value)
    } else {
      props.onChange([
        ...props.entronquesTramo.map((item: any) => ({
          ...item,
          fechaBaja: item.id === id ? value : item.fechaBaja,
        })),
      ])
    }
  }

  const handleFechaModificacionChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: any,
  ) => {
    e.preventDefault()
    const { value } = e.target
    if (id == 0) {
      setCurrentFechaModificacion(value)
    } else {
      props.onChange([
        ...props.entronquesTramo.map((item: any) => ({
          ...item,
          fechaModificacion: item.id === id ? value : item.fechaModificacion,
        })),
      ])
    }
  }

  const handleSelectChange = (newValue: any, id: any) => {
    const { value } = newValue
    if (id == 0) {
      setCurrentSelectValue(newValue)
    } else {
      props.onChange([
        ...props.entronquesTramo.map((item: any) => ({
          ...item,
          value: item.id === id ? value : item.value,
        })),
      ])
    }
  }

  const handleEstadoChange = (newValue: any, id: any) => {
    const { value } = newValue
    if (id == 0) {
      setCurrentEstado(!currentEstado)
    } else {
      props.onChange([
        ...props.entronquesTramo.map((item: any) => ({
          ...item,
          estado: item.id === id ? !item.estado : item.estado,
        })),
      ])
    }
  }

  const handleAgregarEntronque = (e: any, id: any) => {
    if (
      currentFechaAlta == '' ||
      currentFechaBaja == '' ||
      currentFechaModificacion == '' ||
      currentSelectValue == null
    ) {
      return
    }

    const entronquesxTramoItems = props.entronquesxTramo.filter(
      (item: any) =>
        item.mtRoadSectionId == props.tramoId &&
        item.mtHighwayIntersectionId == parseInt(currentSelectValue['value']),
    )
    const list: any = [
      {
        id:
          props.tramoId == 0 || entronquesxTramoItems.length == 0
            ? crypto.randomUUID()
            : entronquesxTramoItems[0].id,
        label: currentSelectValue['label'],
        value: parseInt(currentSelectValue['value']),
        fechaAlta: currentFechaAlta,
        fechaBaja: currentFechaBaja,
        fechaModificacion: currentFechaModificacion,
        estado: currentEstado,
        gazas: [],
      },
      ...props.entronquesTramo,
    ]

    // setItems(list)
    setCurrentSelectValue(null)
    setCurrentFechaAlta('')
    setCurrentFechaBaja('')
    setCurrentFechaModificacion('')
    setCurrentEstado(false)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarEntronque = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = props.entronquesTramo.filter((item) => item['id'] != id)
    // setItems(list);

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const EmptyInputs = (
    <tr
      key="fixed-key-for-dont-have-problem-with-focus-1"
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className=" whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        style={{ minWidth: 200 }}
      >
        <Select
          id="newEntry"
          instanceId="newEntry"
          placeholder="Entronque"
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={props.entronques.filter(
            (item: any) =>
              !props.entronquesTramo
                .map((i: any) => parseInt(i.value))
                .includes(parseInt(item.value)),
          )}
          value={currentSelectValue}
          onChange={(newValue) => handleSelectChange(newValue, 0)}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </th>
      <td className=" px-6 py-4 " style={{ minWidth: 150 }}>
        <input
          // key="fixed-key-for-dont-have-problem-with-focus"
          type="date"
          value={currentFechaAlta}
          onChange={(e) => handleFechaAltaChange(e, 0)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4 " style={{ minWidth: 150 }}>
        <input
          // key="fixed-key-for-dont-have-problem-with-focus"
          type="date"
          value={currentFechaBaja}
          onChange={(e) => handleFechaBajaChange(e, 0)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4 " style={{ minWidth: 150 }}>
        <input
          // key="fixed-key-for-dont-have-problem-with-focus"
          type="date"
          value={currentFechaModificacion}
          onChange={(e) => handleFechaModificacionChange(e, 0)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </td>
      <td className="px-3 py-4 ">
        <input
          // key="fixed-key-for-dont-have-problem-with-focus"
          type="checkbox"
          checked={currentEstado}
          onChange={(e) => handleEstadoChange(e, 0)}
          style={{ maxWidth: 8 }}
          className="block w-full rounded-lg border border-blue-500 p-2.5 text-sm text-blue-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </td>

      <td className="px-3 py-4 text-right" style={{ minWidth: 4 }}>
        <button
          type="button"
          onClick={(e) => handleAgregarEntronque(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaPlus />
        </button>
      </td>
      <td className="px-3 py-4 text-right" style={{ minWidth: 4 }}>
        <button
          type="button"
          onClick={(e) => handleEliminarEntronque(e, 0)}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  )

  return (
    <div className="mb-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            className={cn(
              'text-xs uppercase text-gray-700',
              props.errors.subEspecialidades
                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
            )}
          >
            <tr>
              <th scope="col" className="px-6 py-3" style={{ minWidth: 200 }}>
                Entronque
              </th>
              <th scope="col" className="px-6 py-3" style={{ minWidth: 150 }}>
                Fecha Alta
              </th>
              <th scope="col" className="px-6 py-3" style={{ minWidth: 150 }}>
                Fecha Baja
              </th>
              <th scope="col" className="px-6 py-3" style={{ minWidth: 150 }}>
                Fecha Modificacion
              </th>
              <th scope="col" className="px-3 py-3">
                Estado
              </th>
              {/* <th scope="col" className="px-3 py-3" >
                Gazas
              </th> */}
              <th scope="col" className="px-3 py-3" style={{ minWidth: 4 }}>
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className=" px-3 py-3" style={{ minWidth: 4 }}>
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.entronquesTramo.length == 0
              ? EmptyInputs
              : [EmptyInputs].concat(
                  props.entronquesTramo.map((item, index) => (
                    <tr
                      key={crypto.randomUUID()}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        style={{ minWidth: 200 }}
                      >
                        <Select
                          // key={`esp-${item['id']}`}
                          isDisabled={true}
                          id={item['id']}
                          instanceId={item['id']}
                          placeholder="Entronque"
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={[]}
                          value={item}
                          onChange={(newValue) =>
                            handleSelectChange(newValue, item['id'])
                          }
                        />
                      </th>
                      <td className=" px-6 py-4 " style={{ minWidth: 150 }}>
                        <input
                          // key={`codido-${item['id']}`}
                          // disabled={true}
                          type="date"
                          value={item['fechaAlta']}
                          onChange={(e) => handleFechaAltaChange(e, item['id'])}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 " style={{ minWidth: 150 }}>
                        <input
                          // key={`codido-${item['id']}`}
                          // disabled={true}
                          type="date"
                          value={item['fechaBaja']}
                          onChange={(e) => handleFechaBajaChange(e, item['id'])}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 " style={{ minWidth: 200 }}>
                        <input
                          // key={`codido-${item['id']}`}
                          // disabled={true}
                          type="date"
                          value={item['fechaModificacion']}
                          onChange={(e) =>
                            handleFechaModificacionChange(e, item['id'])
                          }
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-4 ">
                        <input
                          // key="fixed-key-for-dont-have-problem-with-focus"
                          type="checkbox"
                          checked={item['estado']}
                          onChange={(e) => handleEstadoChange(e, item['id'])}
                          style={{ maxWidth: 8 }}
                          className="block w-full rounded-lg border border-blue-500 p-2.5 text-sm text-blue-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </td>

                      <td
                        className="px-3 py-4 text-right"
                        style={{ minWidth: 4 }}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleAgregarEntronque(e, item['id'])}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td
                        className="px-3 py-4 text-right"
                        style={{ minWidth: 4 }}
                      >
                        <button
                          type="button"
                          onClick={(e) =>
                            handleEliminarEntronque(e, item['id'])
                          }
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  )),
                )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
