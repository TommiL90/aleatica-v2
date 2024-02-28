import { ChangeEvent, useEffect, useId, useState } from 'react'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import Select from 'react-select'

interface GazasProps {
  entronques: any[]
  gazas: any[]
  gazasList: any[]
  errors: any
  onAddGaza: Function
  onDeleteGaza: Function
  onChange: Function
}

export function GazasComponent(props: GazasProps) {
  const [currentEntronqueValue, setCurrentEntronqueValue] = useState(null)
  const [currentSelectValue, setCurrentSelectValue] = useState(null)
  const [currentFechaAlta, setCurrentFechaAlta] = useState('')
  const [currentFechaBaja, setCurrentFechaBaja] = useState('')
  const [currentFechaModificacion, setCurrentFechaModificacion] = useState('')
  const [currentEstado, setCurrentEstado] = useState(false)
  const [items, setItems] = useState(props.gazasList)

  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const handleEntronqueChange = (newValue: any, id: any) => {
    const { value } = newValue
    if (id == 0) {
      setCurrentEntronqueValue(newValue)
    } else {
      props.onChange([
        ...props.gazasList.map((item: any) => ({
          ...item,
          value: item.id === id ? value : item.value,
        })),
      ])
    }
  }

  const handleFechaAltaChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string | number,
  ) => {
    e.preventDefault()
    const { value } = e.target
    if (id == 0) {
      setCurrentFechaAlta(value)
    } else {
      props.onChange([
        ...props.gazasList.map((item: any) => ({
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
        ...props.gazasList.map((item: any) => ({
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
        ...props.gazasList.map((item: any) => ({
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
        ...props.gazasList.map((item: any) => ({
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
        ...props.gazasList.map((item: any) => ({
          ...item,
          estado: item.id === id ? !item.estado : item.estado,
        })),
      ])
    }
  }

  const handleAgregarGazaAEntronque = (e: any, id: any) => {
    if (
      currentFechaAlta == '' ||
      currentSelectValue == null ||
      currentEntronqueValue == null
    ) {
      return
    }

    const elem = {
      id: crypto.randomUUID(),
      entronque: currentEntronqueValue['value'],
      label: currentSelectValue['label'],
      value: parseInt(currentSelectValue['value']),
      fechaAlta: currentFechaAlta,
      fechaBaja: currentFechaBaja,
      fechaModificacion: currentFechaModificacion,
      estado: currentEstado,
    }

    const list: any = [elem, ...props.gazasList]

    // setItems(list)
    setCurrentEntronqueValue(null)
    setCurrentSelectValue(null)
    setCurrentFechaAlta('')
    setCurrentFechaBaja('')
    setCurrentFechaModificacion('')
    setCurrentEstado(false)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }

    if (typeof props.onAddGaza === 'function') {
      props.onAddGaza(elem)
    }
  }

  const handleEliminarGazaAEntronque = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = props.gazasList.filter((item) => item['id'] != id)
    // setItems(list);

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }

    if (typeof props.onDeleteGaza === 'function') {
      props.onDeleteGaza(id)
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
          id="newEntryEntronque"
          instanceId="newEntryEntronque"
          placeholder="Seleccione entronque"
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={props.entronques}
          value={currentEntronqueValue}
          onChange={(newValue) => handleEntronqueChange(newValue, 0)}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </th>
      <th
        scope="row"
        className=" whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        style={{ minWidth: 200 }}
      >
        <Select
          id="newEntry"
          instanceId="newEntry"
          placeholder="Seleccione Gaza"
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={
            props.gazasList !== undefined
              ? props.gazas.filter(
                  (item: any) =>
                    !props.gazasList
                      .filter(
                        (el: any) =>
                          currentEntronqueValue !== null &&
                          currentEntronqueValue['value'] == el.entronque,
                      )
                      .map((i: any) => parseInt(i.value))
                      .includes(parseInt(item.value)),
                )
              : props.gazas
          }
          // props.gazas.filter((item: any) => !props.gazasList.map((i : any) => parseInt(i.value)).includes(parseInt(item.value)))
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
      <td className="px-3 py-4" style={{ minWidth: 4 }}>
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
          onClick={(e) => handleAgregarGazaAEntronque(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaPlus />
        </button>
      </td>
      <td className="px-3 py-4 text-right" style={{ minWidth: 4 }}>
        <button
          type="button"
          onClick={(e) => handleEliminarGazaAEntronque(e, 0)}
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
          <thead className="dark:text-gray-400' bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3" style={{ minWidth: 200 }}>
                Entronque
              </th>
              <th scope="col" className="px-6 py-3" style={{ minWidth: 200 }}>
                Gaza
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
              <th scope="col" className="px-3 py-3" style={{ minWidth: 4 }}>
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className=" px-3 py-3" style={{ minWidth: 4 }}>
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.gazasList.length == 0
              ? EmptyInputs
              : [EmptyInputs].concat(
                  props.gazasList.map((item, index) => (
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
                          options={props.entronques}
                          value={props.entronques.filter(
                            (ent: any) => ent.value === item['entronque'],
                          )}
                          onChange={(newValue) =>
                            handleSelectChange(newValue, item['id'])
                          }
                        />
                      </th>
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
                          disabled={true}
                          type="date"
                          value={item['fechaAlta']}
                          onChange={(e) => handleFechaAltaChange(e, item['id'])}
                          className="block w-full rounded-lg  border border-gray-300 bg-gray-100 p-2.5 text-sm font-semibold text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </td>
                      <td className="px-6 py-4 " style={{ minWidth: 150 }}>
                        <input
                          // key={`codido-${item['id']}`}
                          disabled={true}
                          type="date"
                          value={item['fechaBaja']}
                          onChange={(e) => handleFechaBajaChange(e, item['id'])}
                          className="block w-full rounded-lg border border-gray-300  bg-gray-100 p-2.5 text-sm font-semibold text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </td>
                      <td className="px-6 py-4 " style={{ minWidth: 200 }}>
                        <input
                          // key={`codido-${item['id']}`}
                          disabled={true}
                          type="date"
                          value={item['fechaModificacion']}
                          onChange={(e) =>
                            handleFechaModificacionChange(e, item['id'])
                          }
                          className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm font-semibold text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </td>
                      <td className="px-3 py-4 ">
                        <input
                          // key="fixed-key-for-dont-have-problem-with-focus"
                          type="checkbox"
                          disabled={true}
                          checked={item['estado']}
                          onChange={(e) => handleEstadoChange(e, item['id'])}
                          style={{ maxWidth: 8 }}
                          className="block w-full rounded-lg border  border-blue-500 p-2.5 text-sm font-semibold text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </td>
                      <td
                        className="px-3 py-4 text-right"
                        style={{ maxWidth: 4 }}
                      >
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAgregarGazaAEntronque(e, item['id'])
                          }
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td
                        className="px-3 py-4 text-right"
                        style={{ maxWidth: 4 }}
                      >
                        <button
                          type="button"
                          onClick={(e) =>
                            handleEliminarGazaAEntronque(e, item['id'])
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
