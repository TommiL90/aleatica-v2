'use client'
import {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useId,
  useState,
} from 'react'

import {
  CellChange,
  CellLocation,
  CheckboxCell,
  Column,
  DateCell,
  DefaultCellTypes,
  DropdownCell,
  NumberCell,
  Row,
  TextCell,
} from '@silevis/reactgrid'
import { FlagCell } from '@/components/cells/flag'
import { ButtonCell } from '@/components/cells/button'
import Breadcrumbs from '@/components/breadcrumbs'
import Select, { InputActionMeta } from 'react-select'
import { FaPlus, FaRegFile, FaRegTrashAlt } from 'react-icons/fa'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import Loading from '@/components/loading'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface UnidadSimple {
  idauto: number
  id: number
  idUnidad: string
  nombreUnidadSimple: string
  descripcionUnidadSimple: string
  counter: string
  subCategoria: any
  especialidad: any
  sap: string
  subEspecialidades: any[]
  // unidadObraisOpen: boolean;
  subcategoriaisOpen: boolean
  especialidadisOpen: boolean
  especialidadesFilter: any[]
  newItem: boolean // indica si es elemento nuevo: true, o cagado desde bd: false
}

const getUnidadesSimples = (): UnidadSimple[] => []

const getColumns = (): Column[] => [
  { columnId: 'id', width: 30, reorderable: true, resizable: true },
  {
    columnId: 'nombreUnidadSimple',
    width: 200,
    reorderable: true,
    resizable: true,
  },
  {
    columnId: 'descripcionUnidadSimple',
    width: 350,
    reorderable: true,
    resizable: true,
  },
  { columnId: 'counter', width: 200, reorderable: true, resizable: true },
  { columnId: 'subCategoria', width: 200, reorderable: true, resizable: true },
  { columnId: 'especialidad', width: 200, reorderable: true, resizable: true },
  { columnId: 'sap', width: 200, reorderable: true, resizable: true },
  { columnId: 'idUnidad', width: 200, reorderable: true, resizable: true },
  { columnId: 'modal', width: 150, reorderable: true },
  { columnId: 'button_save', width: 150, reorderable: true },
  { columnId: 'button_delete', width: 150, reorderable: true },
]

const headerRow = (columns: Column[]): Row => ({
  rowId: 'header',
  height: 35,
  cells: columns.map((col) => {
    let elem: DefaultCellTypes = {
      type: 'header',
      text: '',
      style: { color: '' },
    }
    switch (col.columnId) {
      case 'id':
        elem = { type: 'header', text: 'No', style: { color: '#666179' } }
        break
      case 'nombreUnidadSimple':
        elem = { type: 'header', text: 'Nombre', style: { color: '#666179' } }
        break
      case 'descripcionUnidadSimple':
        elem = {
          type: 'header',
          text: 'Descripcion',
          style: { color: '#666179' },
        }
        break
      case 'counter':
        elem = { type: 'header', text: 'Contador', style: { color: '#666179' } }
        break
      case 'subCategoria':
        elem = {
          type: 'header',
          text: 'Subcategoria',
          style: { color: '#666179' },
        }
        break
      case 'especialidad':
        elem = {
          type: 'header',
          text: 'Especialidad',
          style: { color: '#666179' },
        }
        break
      case 'sap':
        elem = { type: 'header', text: 'SAP', style: { color: '#666179' } }
        break
      case 'idUnidad':
        elem = {
          type: 'header',
          text: 'ID Unidad',
          style: { color: '#666179' },
        }
        break
      case 'modal':
        elem = {
          type: 'header',
          text: 'Subespecialidades',
          style: { color: '#666179' },
        }
        break
      case 'button_save':
        elem = { type: 'header', text: '', style: { color: '#666179' } }
        break
      case 'button_delete':
        elem = { type: 'header', text: '', style: { color: '#666179' } }
        break
    }

    return elem
  }),
})

const getRows = (
  unidades: UnidadSimple[],
  columns: Column[],
  subcategories: any[],
  especialities: any[],
): Row<
  DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell
>[] => [
  headerRow(columns),
  ...unidades.map<
    Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>
  >((item, idx) => ({
    rowId: idx + 1, // item.idauto,
    reorderable: false,
    height: 35,
    cells: columns.map((col) => {
      let elem:
        | DefaultCellTypes
        | FlagCell
        | ButtonCell
        | DateCell
        | DropdownCell = { type: 'header', text: '', style: { color: '' } }
      switch (col.columnId) {
        case 'id':
          elem = {
            type: 'header',
            text: `${item.idauto}`,
            style: { color: '#666179' },
          }
          break
        case 'idUnidad':
          elem = {
            type: 'header',
            text: `${item.idUnidad}`,
            style: { color: '#666179' },
          }
          break
        case 'modal':
          elem = {
            type: 'button',
            text: `Editar`,
            style: { color: '#666179' },
            enabled: true,
            size: item.subEspecialidades.length,
            id: item.id,
            onClick: () => alert('modal'),
          }
          break
        case 'button_save':
          elem = {
            type: 'button',
            text: `Guardar`,
            style: { color: '#666179' },
            enabled:
              item.nombreUnidadSimple != '' &&
              item.descripcionUnidadSimple != '' &&
              item.counter != '' &&
              item.sap != '' &&
              item.subCategoria != '' &&
              item.especialidad != '' &&
              item.subEspecialidades.length > 0,
            size: -1,
            id: item.id,
            onClick: () => {},
          }
          break
        case 'button_delete':
          elem = {
            type: 'button',
            text: `Eliminar`,
            style: { color: '#666179' },
            enabled: item.id > 0,
            size: -1,
            id: item.id,
            onClick: () => {},
          }
          break
        case 'sap':
          elem = {
            type: 'text',
            text: item.sap,
            className: 'text-sm block w-full text-gray-800',
          }
          break

        case 'nombreUnidadSimple':
          elem = {
            type: 'text',
            text: item.nombreUnidadSimple,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'descripcionUnidadSimple':
          elem = {
            type: 'text',
            text: item.descripcionUnidadSimple,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'counter':
          elem = {
            type: 'text',
            text: item.counter,
            className: 'text-sm block w-full text-gray-800',
          }
          break

        case 'subCategoria':
          elem = {
            type: 'dropdown',
            selectedValue: item.subCategoria,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.subcategoriaisOpen,
            values: subcategories,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'especialidad':
          elem = {
            type: 'dropdown',
            selectedValue: item.especialidad,
            // inputValue: item.especialidadActuacion,
            isOpen: item.especialidadisOpen,
            values: item.especialidadesFilter,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
      }

      return elem
    }),
  })),
]

const getEmpty = (id: number = 1): UnidadSimple => ({
  idauto: id,
  id: 0,
  idUnidad: '',
  nombreUnidadSimple: ``,
  descripcionUnidadSimple: ``,
  counter: '',
  subCategoria: null,
  especialidad: null,
  sap: ``,
  subEspecialidades: [],
  // unidadObraisOpen: false,
  subcategoriaisOpen: false,
  especialidadisOpen: false,
  especialidadesFilter: [],
  newItem: true,
})

const applyChanges = (
  changes: CellChange<
    TextCell | NumberCell | CheckboxCell | DropdownCell | DateCell
  >[],
  prevDetails: UnidadSimple[],
  especialities: any[],
  getEmptyDataRow: () => UnidadSimple,
): UnidadSimple[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number
    const fieldName = change.columnId as keyof UnidadSimple

    let dataRow = prevDetails.find((d) => d.idauto === dataRowId)

    if (!dataRow) {
      dataRow = getEmptyDataRow()
      prevDetails.push(dataRow)

      // return;
    }
    if (change.type === 'text' && typeof dataRow[fieldName] === 'string') {
      dataRow[fieldName] = change.newCell.text as never
    } else if (
      change.type === 'number' &&
      typeof dataRow[fieldName] === 'number'
    ) {
      dataRow[fieldName] = change.newCell.value as never
    } else if (
      change.type === 'checkbox' &&
      typeof dataRow[fieldName] === 'boolean'
    ) {
      dataRow[fieldName] = change.newCell.checked as never
    } else if (change.type === 'dropdown') {
      /**
       * Checking for an opening/closing of a dropdown list
       */

      if (change.previousCell.isOpen !== change.newCell.isOpen) {
        switch (fieldName) {
          case 'subCategoria':
            dataRow.subcategoriaisOpen = change.newCell.isOpen as never
            dataRow.especialidadesFilter = [
              ...especialities.filter(
                (el: any) => dataRow?.subCategoria == el.subcategory,
              ),
            ]
            break

          case 'especialidad':
            dataRow.especialidadisOpen = change.newCell.isOpen as never
            break
          // case 'unidadObra' : dataRow.unidadObraisOpen = change.newCell.isOpen as never; break;
        }
      }

      if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
        dataRow[fieldName] = change.newCell.selectedValue as never
      }
    }
  })

  return [...prevDetails]
}

interface Option {
  label: string
  value: string
  checked: boolean
}

const moreRows = (unidades: UnidadSimple[], exceed: number = 100) => [
  ...unidades,
  ...Array.from({ length: exceed }, (item, idx) => ({
    ...getEmpty(unidades.length + 1),
    idauto: unidades.length + idx + 1,
    // counter: getCounter(unidades.length + idx + 1)
  })),
]

const breadcrumbs = [
  { label: 'Inicio', link: '/' },
  { label: 'Repositorio', link: null },
  { label: 'Catálogo de unidades simples', link: null },
]

const creator = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      simpleUdName: string
      description: string
      mtSpecialtyActionId: number
      accountantConcept: string
      sapId: string
      status: number
      mtSubspecialities: number[]
    }
  },
) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export default function CatalogoActuaciones() {
  const { data: subEspRes } = useSWR(
    `${process.env.API_URL}/MtSubspeciality/GetAll`,
    fetcher,
  )
  const { data: subcatRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: espRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/SimpleCatalog/Create`,
    creator /* options */,
  )

  const { data, isLoading } = useSWR(
    `${process.env.API_URL}/SimpleCatalog/GetAll`,
    fetcher,
  )
  const [unidades, setUnidadesSimples] = useState<UnidadSimple[]>([])
  const [columns, setColumns] = useState<Column[]>(getColumns())
  const [modal, setModal] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<UnidadSimple>(getEmpty)
  const [loading, setLoading] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Pavimentos', value: 'P', checked: true },
    { label: 'Estructuras', value: 'E', checked: false },
    { label: 'Safety', value: 'S', checked: false },
  ])

  console.log(data)

  useEffect(() => {
    try {
      if (data != undefined && data.status == 200) {
        setUnidadesSimples(
          moreRows(
            data.result.map((item: any, idx: number) => ({
              idauto: idx + 1,
              id: item.id,
              idUnidad: item.code,
              nombreUnidadSimple: item.simpleUdName,
              descripcionUnidadSimple: item.description,
              counter: item.accountantConcept,
              subCategoria: item.mtSubCategoryActionId,
              especialidad: String(item.mtSpecialtyActionId),
              sap: item.sapId,

              subEspecialidades: item.simpleCatalogMtSubspecialities.map(
                (sub: any) => ({
                  label: sub.mtSubspecialityName,
                  value: sub.mtSubspecialityId,
                }),
              ),
              subcategoriaisOpen: false,
              especialidadisOpen: false,
              especialidadesFilter:
                espRes !== undefined && espRes.status === 200
                  ? espRes.result
                      .map((el: any) => ({
                        label: el.name,
                        value: String(el.id),
                        subcategory: String(el.mtSubCategoryActionId),
                      }))
                      .filter(
                        (i: any) => i.subcategory == item.mtSubCategoryActionId,
                      )
                  : [],
              newItem: false,
            })),
            1000,
          ),
        )
      } else {
        setUnidadesSimples(moreRows(getUnidadesSimples(), 1000))
      }
    } finally {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [data])

  const handleSearchinput = (value: string) => {
    setSearchInput(value)
  }

  const handleLocationClick = async (location: CellLocation) => {
    if (location.columnId.toString() === 'modal') {
      setModal(!modal)

      const idx = location.rowId as number
      const item = unidades.at(idx - 1)

      if (item) {
        setItem(item)
        console.log(item)
      }
    }

    if (location.columnId.toString() === 'button_delete') {
      const idx = location.rowId as number
      const item = unidades.at(idx - 1)

      if (item != undefined) {
        setDeleteItem(item.id)
        setModalDelete(true)
      }
    }

    if (location.columnId.toString() === 'button_save') {
      const idx = location.rowId as number
      const item = unidades.at(idx - 1)

      let toastId
      try {
        if (item != undefined) {
          if (
            item.nombreUnidadSimple.length > 0 &&
            item.descripcionUnidadSimple.length > 0 &&
            item.counter.length > 0 &&
            item.sap.length > 0 &&
            item.subCategoria != '' &&
            item.especialidad != '' &&
            item.subEspecialidades.length > 0
          ) {
            toastId = toast.loading('Enviando... 🚀')
            // Submit data
            const value: any = {
              simpleUdName: item.nombreUnidadSimple,
              description: item.descripcionUnidadSimple,
              mtSpecialtyActionId: parseInt(item.especialidad),
              accountantConcept: item.counter,
              sapId: item.sap,
              status: 0,
              mtSubspecialities: item.subEspecialidades.map(
                (item: any) => item.value,
              ),
            }

            let result: any = null

            if (item.newItem) result = await trigger(value)
            else {
              ;(value['id'] = item.id),
                (result = await fetch(
                  `${process.env.API_URL}/SimpleCatalog/Update/${item.id}`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(value),
                  },
                ))
            }

            if (
              result != undefined &&
              (result.status === 200 || result.status === 201)
            ) {
              toast.success('Enviado con éxito 🙌', { id: toastId })
            }
            if (result != undefined && result.status >= 400) {
              toast.error('No se puede enviar 😱', { id: toastId })
            }
          }
        }
      } catch (e) {
        toast.error('No se puede enviar 😱', { id: toastId })
      }
    }
  }

  return (
    <main>
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        {/* <SpreadSheet
                    titulo="Catalogo de unidades simples"
                    descripcion="Repositorio de unidades de obra simples."
                    searchInputPlaceholder="Buscar de unidades simples"
                    filterText="Subcategorias"
                    hideDescripcion={false}
                    hideFilterInput={true}
                    loading={loading}
                    searchInputValue={searchInput}
                    onChangeSelect={(newValue: Option[]) => { setFiltros(newValue); } }
                    onChangeInput={(newValue: string) => { setSearchInput(newValue); } }
                    onSearch={handleSearchinput}
                    options={filtros}
                    items={unidades}
                    rows={getRows(
                      unidades,
                      columns,
                      subcatRes !== undefined && subcatRes.status === 200 ?
                        subcatRes.result.map((item: any) => ({ label: item.text, value: item.value }))
                        : [],
                      espRes !== undefined && espRes.status === 200 ?
                        espRes.result.map((item: any) => ({ label: item.name, value: item.id, subcategory: item.mtSubCategoryActionId }))
                        : []
                    )}
                    columns={columns}
                    emptyElement={getEmpty(unidades.length + 1)}
                    onChangeRows={(items: UnidadSimple[]) => setUnidadesSimples(items)}
                    onChangeColumns={(columns: Column[]) => setColumns(columns)}
                    onChange={(changes: CellChange<any>[]) => setUnidadesSimples(applyChanges(
                      changes,
                      unidades,
                      espRes !== undefined && espRes.status === 200 ?
                        espRes.result.map((item: any) => ({ label: item.name, value: String(item.id), subcategory: item.mtSubCategoryActionId }))
                        : [],
                      getEmpty))}
                    onCellClick={handleLocationClick}
                    onImport={(dataImported: any, columnasMapeadas: any) => {
                      const sizeData = dataImported.length;
                      const sizeColumns = columnasMapeadas.length;
                      let imported = [];
                      setUnidadesSimples([]);
                      for (let i = 0; i < sizeData; i++) {
                        let unidad: any = getEmpty(i + 1);
                        for (let j = 0; j < sizeColumns; j++) {

                          const data = dataImported[i][columnasMapeadas[j].columnaMapeada.value];

                          switch (typeof unidad[columnasMapeadas[j].columna.value]) {

                            case "number": unidad[columnasMapeadas[j].columna.value] = Number(data); break;
                            case "boolean": unidad[columnasMapeadas[j].columna.value] = (data == "Si" || data == "SI" || data == "YES" || data == "TRUE" || data == "Yes" || data == "True" || data == "1"); break;
                            default: unidad[columnasMapeadas[j].columna.value] = data; break;
                          }

                        }
                        imported.push(unidad);
                      }

                      setUnidadesSimples(imported);

                    } } 
                    onNewItem={()=>{}}                
                /> */}
        {modal ? (
          <Modal
            especialidad={parseInt(item.especialidad)}
            options={
              subEspRes !== undefined && subEspRes.status === 200
                ? subEspRes.result.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                    especiality: item.mtSpecialtyActionId,
                  }))
                : []
            }
            subespecialidades={item.subEspecialidades}
            onChange={(values: any[]) =>
              setUnidadesSimples(
                unidades.map((unidad: UnidadSimple) => ({
                  ...unidad,
                  subEspecialidades:
                    unidad.idauto === item.idauto
                      ? values
                      : unidad.subEspecialidades,
                })),
              )
            }
            onClose={() => setModal(!modal)}
          />
        ) : null}
        {modalDelete ? (
          <ModalDeleteRow
            titulo={`Eliminar unidad`}
            mensaje={`¿Estás seguro de que deseas eliminar esta unidad simple } de la lista? Una vez eliminada, no podrás recuperar los datos asociados. `}
            onClose={() => setModalDelete(false)}
            onDelete={async () => {
              if (deleteItem > 0) {
                const res = await fetch(
                  `${process.env.API_URL}/SimpleCatalog/Delete/${deleteItem}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )

                setModalDelete(false)
              }
            }}
          />
        ) : null}
      </section>
    </main>
  )
}

interface Props {
  especialidad: number
  options: any[]
  subespecialidades: any[]
  onClose: MouseEventHandler<HTMLButtonElement>
  onChange: Function
}

function Modal(props: Props) {
  return (
    <>
      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 flex w-full items-center overflow-y-auto overflow-x-hidden p-4  md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Subespecialidades
              </h3>
              <button
                type="button"
                onClick={props.onClose}
                className="ml-auto inline-flex h-8 w-8  items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              <SubEspecialidades
                options={props.options}
                especialidad={props.especialidad}
                subespecialidades={props.subespecialidades}
                onChange={(value: any) => props.onChange(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}

interface SubEspecialidadesProps {
  options: any[]
  especialidad: number
  subespecialidades: any[]
  onChange: Function
}

const ids: string[] = []

export function SubEspecialidades(props: SubEspecialidadesProps) {
  const [currentSelectValue, setCurrentSelectValue] = useState(null)
  const [currentCodeValue, setCurrentCodeValue] = useState('')
  const [items, setItems] = useState(props.subespecialidades)

  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const newId = useId()

  for (let i = 0; i < props.subespecialidades.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: any) => {
  //   e.preventDefault();
  //   const { value } = e.target;
  //   if(id == 0){
  //     setCurrentCodeValue(value);
  //   }
  // };

  const handleSelectChange = (newValue: any, id: any) => {
    const { value } = newValue
    if (id == 0) {
      setCurrentSelectValue(newValue)
    }
  }

  const handleAgregarEspecialidad = (e: any, id: any) => {
    // if(currentCodeValue == '' || currentSelectValue == null){
    if (currentSelectValue == null) {
      return
    }
    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        label: currentSelectValue['label'],
        value: currentSelectValue['value'],
        // code: currentCodeValue
      },
    ]

    setItems(list)
    setCurrentSelectValue(null)
    setCurrentCodeValue('')

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarEspecialidad = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = items.filter((item) => item['id'] != id)
    setItems(list)

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
        className="w-5/12 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        style={{ minWidth: 208 }}
      >
        <Select
          id="newEntry"
          instanceId={newId}
          placeholder="Inserte subespecialidad"
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          // options={props.options.filter((item: any) => item.especiality == props.especialidad)}
          options={props.options.filter(
            (item: any) =>
              !items
                .map((i: any) => parseInt(i.value))
                .includes(parseInt(item.value)) &&
              item.especiality == props.especialidad,
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
      {/* <td className="w-5/12 px-6 py-4 " style={{minWidth: 208}}>
        <input 
          //key="fixed-key-for-dont-have-problem-with-focus"
          type="text" 
          value={currentCodeValue} 
          onChange={(e) => handleInputChange(e, 0)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        
      </td> */}
      <td className="w-1/12 px-6 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleAgregarEspecialidad(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaPlus />
        </button>
      </td>
      <td className="w-1/12 px-6 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleEliminarEspecialidad(e, 0)}
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
              'bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
            )}
          >
            <tr>
              <th
                scope="col"
                className="w-5/12 px-6 py-3"
                style={{ minWidth: 208 }}
              >
                Subespecialidad
              </th>
              {/* <th scope="col" className="w-5/12 px-6 py-3" style={{minWidth: 208}}>
                Codigo
              </th> */}
              <th scope="col" className="w-1/12 px-6 py-3">
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className="w-1/12 px-6 py-3">
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length == 0
              ? EmptyInputs
              : items
                  .map((item, index) => (
                    <tr
                      key={crypto.randomUUID()}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="w-5/12 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          // key={`esp-${item['id']}`}
                          isDisabled={true}
                          id={item['id']}
                          instanceId={item['id']}
                          placeholder="Inserte subespecialidad"
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={props.options.filter(
                            (item: any) =>
                              item.especiality == props.especialidad,
                          )}
                          value={item}
                          onChange={(newValue) =>
                            handleSelectChange(newValue, item['id'])
                          }
                        />
                      </th>
                      {/* <td className="w-5/12 px-6 py-4 " style={{minWidth: 208}}>
                      <input
                        //key={`codido-${item['id']}`}
                        disabled={true}
                        type="text" 
                        value={item['code']} 
                        onChange={(e) => handleInputChange(e, item['id'])}
                        className="border bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </td> */}
                      <td className="w-1/12 px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAgregarEspecialidad(e, item['id'])
                          }
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td className="w-1/12 px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleEliminarEspecialidad(e, item['id'])
                          }
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                  .concat(EmptyInputs)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
