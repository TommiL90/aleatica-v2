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

import { useStateCallback } from '@/hooks/useStateCallback'
import ModalDetail from './modalDetail'
import ModalNewItem from './modalEdit'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import SpreadSheetDep from '@/components/tables/spreadSheet'

interface Deterioro {
  idauto: number
  id: number

  tipo: string
  codigo: string

  subCategoria: any
  especialidad: any

  subcategoriaisOpen: boolean
  especialidadisOpen: boolean
  especialidadesFilter: any[]
  newItem: boolean // indica si es elemento nuevo: true, o cagado desde bd: false
}

const getDeterioros = (): Deterioro[] => []

const getColumns = (): Column[] => [
  { columnId: 'id', width: 30, reorderable: true, resizable: true },
  { columnId: 'codigo', width: 200, reorderable: true, resizable: true },
  { columnId: 'tipo', width: 350, reorderable: true, resizable: true },
  { columnId: 'subCategoria', width: 200, reorderable: true, resizable: true },
  { columnId: 'especialidad', width: 200, reorderable: true, resizable: true },

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
      case 'codigo':
        elem = { type: 'header', text: 'Codigo', style: { color: '#666179' } }
        break
      case 'tipo':
        elem = {
          type: 'header',
          text: 'Tipo de deterioro',
          style: { color: '#666179' },
        }
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
  deterioros: Deterioro[],
  columns: Column[],
  subcategories: any[],
): Row<
  DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell
>[] => [
  headerRow(columns),
  ...deterioros.map<
    Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>
  >((item, idx) => ({
    rowId: idx + 1, // item.idauto,
    reorderable: true,
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
        case 'button_save':
          elem = {
            type: 'button',
            text: `Guardar`,
            style: { color: '#666179' },
            enabled:
              item.tipo != '' &&
              item.codigo != '' &&
              item.subCategoria != '' &&
              item.especialidad != '',
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

        case 'tipo':
          elem = {
            type: 'text',
            text: item.tipo,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'codigo':
          elem = {
            type: 'text',
            text: item.codigo,
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

const getEmpty = (id: number = 1): Deterioro => ({
  idauto: id,
  id: 0,
  codigo: '',
  tipo: '',
  subCategoria: null,
  especialidad: null,

  subcategoriaisOpen: false,
  especialidadisOpen: false,
  especialidadesFilter: [],
  newItem: true,
})

const applyChanges = (
  changes: CellChange<
    TextCell | NumberCell | CheckboxCell | DropdownCell | DateCell
  >[],
  prevDetails: Deterioro[],
  especialities: any[],
  getEmptyDataRow: () => Deterioro,
): Deterioro[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number
    const fieldName = change.columnId as keyof Deterioro

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

const moreRows = (deterioros: Deterioro[], exceed: number = 100) => [
  ...deterioros,
  ...Array.from({ length: exceed }, (item, idx) => ({
    ...getEmpty(deterioros.length + 1),
    idauto: deterioros.length + idx + 1,
    // counter: getCounter(unidades.length + idx + 1)
  })),
]

const breadcrumbs = [
  { label: 'Inicio', link: '/' },
  { label: 'Deterioros', link: null },
]

const creator = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string
      code: string
      mtSpecialtyActionId: number
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

export default function CatalogoDeterioros() {
  const [itemId, setItemId] = useState(0)
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const { data: subcatRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )

  const { data: espRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/MtDeteriorationType/Create`,
    creator /* options */,
  )

  const { data, mutate, isLoading } = useSWR(
    `${process.env.API_URL}/MtDeteriorationType/GetAllPaginated?MtSpecialtyActionId=${filtroEspecialidad}`,
    fetcher,
  )
  const [unidades, setDeterioros] = useState<Deterioro[]>([])
  const [columns, setColumns] = useState<Column[]>(getColumns())
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState(0)
  //   const [item, setItem] = useState<Deterioro>(getEmpty);
  const [loading, setLoading] = useState(false)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    try {
      if (data != undefined && data.status == 200) {
        setDeterioros(
          moreRows(
            data.result.results.map((item: any, idx: number) => ({
              idauto: idx + 1,
              id: item.id,
              codigo: item.code,
              tipo: item.name,
              subCategoria: String(item.mtActionSubCategoryId),
              especialidad: String(item.mtSpecialtyActionId),

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
                      .filter((i: any) => i.subcategory == '3')
                  : [],
              newItem: false,
            })),
            1000,
          ),
        )
      } else {
        setDeterioros(moreRows(getDeterioros(), 1000))
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
    //   if(location.columnId.toString() === "modal"){
    //     setModal(!modal);

    //     const idx = location.rowId as number;
    //     const item = unidades.at(idx - 1);

    //     if(item){
    //       setItem(item);
    //     }
    //   }

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
            item.tipo.length > 0 &&
            item.codigo.length > 0 &&
            item.subCategoria != '' &&
            item.especialidad != ''
          ) {
            toastId = toast.loading('Enviando... 🚀')
            // Submit data
            const value: any = {
              name: item.tipo,
              code: item.codigo,
              mtSpecialtyActionId: parseInt(item.especialidad),
            }

            let result: any = null

            if (item.newItem) result = await trigger(value)
            else {
              ;(value['id'] = item.id),
                (result = await fetch(
                  `${process.env.API_URL}/MtDeteriorationType/Update/${item.id}`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      // 'Content-Type': 'application/x-www-form-urlencoded',
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
        <SpreadSheetDep
          titulo="Catalogo de deterioros"
          descripcion="Repositorio de deterioros"
          searchInputPlaceholder="Buscar deterioros"
          filterText="Filtros"
          hideDescripcion={false}
          hideFilterInput={false}
          loading={loading}
          searchInputValue={searchInput}
          onChangeSelect={(newValue: Option[]) => {}}
          onChangeInput={(newValue: string) => {
            setSearchInput(newValue)
          }}
          onSearch={async (values: any) => {
            console.log(values)
            if ('subcategoria' in values && values.subcategoria !== undefined)
              setFiltroSubcategoria(values.subcategoria.value)

            if ('especialidad' in values && values.especialidad !== undefined)
              setFiltroEspecialidad(values.especialidad.value)

            await mutate()
          }}
          onUpdateRow={async (idx: any) => {
            const item = unidades.at(idx - 1)

            console.log(item)
            setItemId((prev) => (item ? item.id : 0))
            setModalNewItem(true, () =>
              setItemId(item !== undefined ? item.id : 0),
            )
          }}
          onShowRow={(idx: any) => {
            const item = unidades.at(idx - 1)
            setModalDetail(true, () =>
              setItemId(item !== undefined ? item.id : 0),
            )
          }}
          options={{
            filtros: {
              subcategorias:
                subcatRes !== undefined && subcatRes.status === 200
                  ? subcatRes.result.map((item: any) => ({
                      label: item.text,
                      value: String(item.value),
                    }))
                  : [],
              especialidades:
                espRes !== undefined && espRes.status === 200
                  ? espRes.result.map((item: any) => ({
                      label: item.name,
                      value: String(item.id),
                      subcategory: String(item.mtSubCategoryActionId),
                    }))
                  : [],
            },
            values: {
              subcategoria: filtroSubcategoria,
              especialidad: filtroEspecialidad,
            },
          }}
          items={unidades}
          rows={getRows(
            unidades,
            columns,
            subcatRes !== undefined && subcatRes.status === 200
              ? subcatRes.result.map((item: any) => ({
                  label: item.text,
                  value: item.value,
                }))
              : [],
          )}
          columns={columns}
          emptyElement={getEmpty(unidades.length + 1)}
          onChangeRows={(items: Deterioro[]) => setDeterioros(items)}
          onChangeColumns={(columns: Column[]) => setColumns(columns)}
          onChange={(changes: CellChange<any>[]) =>
            setDeterioros(
              applyChanges(
                changes,
                unidades,
                espRes !== undefined && espRes.status === 200
                  ? espRes.result.map((item: any) => ({
                      label: item.name,
                      value: String(item.id),
                      subcategory: String(item.mtSubCategoryActionId),
                    }))
                  : [],
                getEmpty,
              ),
            )
          }
          onCellClick={handleLocationClick}
          onImport={(dataImported: any, columnasMapeadas: any) => {
            const sizeData = dataImported.length
            const sizeColumns = columnasMapeadas.length
            const imported = []
            setDeterioros([])
            for (let i = 0; i < sizeData; i++) {
              const unidad: any = getEmpty(i + 1)
              for (let j = 0; j < sizeColumns; j++) {
                const data =
                  dataImported[i][columnasMapeadas[j].columnaMapeada.value]

                switch (typeof unidad[columnasMapeadas[j].columna.value]) {
                  case 'number':
                    unidad[columnasMapeadas[j].columna.value] = Number(data)
                    break
                  case 'boolean':
                    unidad[columnasMapeadas[j].columna.value] =
                      data == 'Si' ||
                      data == 'SI' ||
                      data == 'YES' ||
                      data == 'TRUE' ||
                      data == 'Yes' ||
                      data == 'True' ||
                      data == '1'
                    break
                  default:
                    unidad[columnasMapeadas[j].columna.value] = data
                    break
                }
              }
              imported.push(unidad)
            }

            setDeterioros(imported)
          }}
          onNewItem={() => {
            setModalNewItem(true, () => setItemId((prev) => 0))
          }}
        />
        {modalNewItem ? (
          <ModalNewItem
            isModalOpen={modalNewItem}
            title={itemId === 0 ? 'Nuevo deterioro' : 'Actualizar deterioro'}
            itemSelected={unidades.find(
              (item: Deterioro) => item.id === itemId,
            )}
            subcategorias={
              subcatRes !== undefined && subcatRes.status === 200
                ? subcatRes.result.map((item: any) => ({
                    label: item.text,
                    value: item.value,
                  }))
                : []
            }
            especialidades={
              espRes !== undefined && espRes.status === 200
                ? espRes.result.map((item: any) => ({
                    label: item.name,
                    value: String(item.id),
                    subcategory: item.mtSubCategoryActionId,
                  }))
                : []
            }
            onMutate={async (values: any) => {
              console.log(values)
              // await mutate();
              // if(itemId !== 0){
              //     setModalNewItem(false)
              // }
              let toastId
              try {
                toastId = toast.loading('Enviando... 🚀')
                // Submit data
                const value: any = {
                  id: itemId,
                  name: values.nombreDeterioro,
                  code: values.codigoDeterioro,
                  mtSpecialtyActionId: parseInt(values.especialidad),
                }

                let result: any = null

                if (itemId === 0) result = await trigger(value)
                else {
                  result = await fetch(
                    `${process.env.API_URL}/MtDeteriorationType/Update/${itemId}`,
                    {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      body: JSON.stringify(value),
                    },
                  )
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

                await mutate()
                if (itemId !== 0) {
                  setModalNewItem(false)
                }
              } catch (e) {
                toast.error('No se puede enviar 😱', { id: toastId })
              }
            }}
            onClose={() => setModalNewItem(false)}
          />
        ) : null}
        {modalDetail ? (
          <ModalDetail
            isModalOpen={modalDetail}
            title="Detalles de deterioro"
            itemSelected={unidades.find(
              (item: Deterioro) => item.id === itemId,
            )}
            subcategorias={
              subcatRes !== undefined && subcatRes.status === 200
                ? subcatRes.result.map((item: any) => ({
                    label: item.text,
                    value: item.value,
                  }))
                : []
            }
            especialidades={
              espRes !== undefined && espRes.status === 200
                ? espRes.result.map((item: any) => ({
                    label: item.name,
                    value: String(item.id),
                    subcategory: item.mtSubCategoryActionId,
                  }))
                : []
            }
            onClose={() => setModalDetail(false)}
          />
        ) : null}

        {modalDelete ? (
          <ModalDeleteRow
            titulo={`Eliminar deterorio`}
            mensaje={`¿Estás seguro de que deseas eliminar el deterioro de la lista? Una vez eliminada, no podrás recuperar los datos asociados. `}
            onClose={() => setModalDelete(false)}
            onDelete={async () => {
              let toastId
              try {
                if (deleteItem > 0) {
                  toastId = toast.loading('Eliminando de lista... 🚀')
                  console.log(deleteItem)
                  await fetch(
                    `${process.env.API_URL}/MtDeteriorationType/ChangeDisabledStatus/${deleteItem}`,
                    {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  )

                  toast.success('Eliminado de lista 🙌', { id: toastId })
                  mutate()

                  setModalDelete(false)
                }
              } catch (error) {
                console.log(error)
                toast.error(
                  `No se puede eliminar. Error en el servidor. Consulte a servicios 😱`,
                  { id: toastId },
                )
              }
            }}
          />
        ) : null}
      </section>
    </main>
  )
}
