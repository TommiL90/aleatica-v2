'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import fetcher from '@/services/fetcher'
import {
  SimpleCatalog,
  SpecialtyAction,
  SubCategory,
  Subspeciality,
  UnitOfMeasurement,
} from '@/services/useGetRepositories'
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
import { BiSearch } from 'react-icons/bi'
import { toast } from 'sonner'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SpreadSheet } from '@/components/spread-sheet'

import {
  applyChanges,
  creator,
  getColumns,
  getEmpty,
  getRows,
  getUnidadesSimples,
  headerRow,
  moreRows,
} from './functions'
import ModalDescriptionCell from '@/components/common-modals/modal-cell-description'
import ModalDetail from './modal-details'
import ModalEspecialidadesParaSpreadsheet from './modalEspecialidadesParaSpreadsheet'
import { ModalDelete } from '@/components/common-modals/modal-delete'
import { useStateCallback } from '@/hooks/useStateCallback'
import ModalNewItem from './modal-edit'
import { FaPlus } from 'react-icons/fa'
import SearchInput from '@/components/inputs/searchInput'
import Breadcrumbs from '@/components/breadcrumbs'

interface DataResponse<T> {
  status: number
  result: T
  errorMessage?: any
}
export interface SimpleCatalogPaginated {
  currentPage: number
  pageCount: number
  pageSize: number
  recordCount: number
  results: SimpleCatalog[]
}
// export interface SimpleCatalog {
//   simpleUdId: string
//   count: number
//   mtUnitOfMeasurement: string
//   mtSpecialtyAction: string
//   mtSubCategoryAction: string
//   mtSubspecialityName: string
//   mtSubspecialityRoute?: any
//   mtSubCategoryActionId: string
//   code: string
//   simpleUdName: string
//   description?: any
//   mtUnitOfMeasurementId: number
//   mtSpecialtyActionId: number
//   mtSubspecialityId: number
//   accountantConcept?: any
//   sapId: string
//   global: boolean
//   id: number
//   [key: string]: any
// }

export interface UnidadSimple {
  idauto: number
  id: number
  idUnidad: string
  nombreUnidadSimple: string
  descripcionUnidadSimple: string
  counter: string
  // global: boolean
  unidadObra: any
  subCategoria: any
  especialidad: any
  sap: string
  subEspecialidad: any
  unidadObraisOpen: boolean
  subcategoriaisOpen: boolean
  especialidadisOpen: boolean
  especialidadesFilter: any[]
  newItem: boolean
  [key: string]: any
}
interface Option {
  label: string
  value: string
  checked: boolean
}

const breadcrumbs = [
  { label: 'Inicio', link: '/' },
  { label: 'Repositorio', link: null },
  { label: 'Catálogo de unidades simples', link: null },
]

export interface SimpleCatalogProps {
  subEsp: Subspeciality[]
  esp: SpecialtyAction[]
  subCat: SubCategory[]
  unitMeasurement: UnitOfMeasurement[]
}

export default function SimpleCatalogPage({
  esp,
  subEsp,
  subCat,
  unitMeasurement,
}: SimpleCatalogProps) {
  const [itemId, setItemId] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/SimpleCatalog/Create`,
    creator /* options */,
  )

  const { data, mutate, isLoading, error } = useSWR<
    DataResponse<SimpleCatalogPaginated>
  >(
    `${process.env.API_URL}/SimpleCatalog/GetAllPaginated?MtSpecialtyActionId=${filtroEspecialidad}&SearchByProp=simpleUdName&SearchCriteria=${searchInput}&PageSize=2147483647`,
    fetcher,
  )

  // const { data, mutate, isLoading } = useSWR<DataResponse<ResponseSimpleUN>>(`${process.env.API_URL}/SimpleCatalog/GetAll`, fetcher)

  const [unidades, setUnidadesSimples] = useState<UnidadSimple[]>([])
  const [columns, setColumns] = useState<Column[]>(getColumns())
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [showModalSpecialty, setShowModalSpecialty] = useState(false)
  const [showModaldelete, setShowModalDelete] = useState(false)
  const [indexOfDescription, setIndexOfDescription] = useState(0)
  const [item, setItem] = useState<UnidadSimple>(getEmpty)
  const [modalDetail, setModalDetail] = useState(false)
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  // const rows = useMemo(() => getRows(people), [people])

  const handleLocationClick = useCallback(
    async (location: CellLocation) => {
      if (location.columnId.toString() === 'descripcionUnidadSimple') {
        const idx = location.rowId as number
        const item = unidades.at(idx - 1)

        if (item) {
          setIndexOfDescription(idx - 1)
          setItem(item)
          setShowDescriptionModal(true)
        }
      }

      if (location.columnId.toString() === 'modal') {
        mutate()
        const idx = location.rowId as number
        const item = unidades.at(idx - 1)

        if (item) {
          setItem(item)
          setShowModalSpecialty(true)
        }
      }

      if (location.columnId.toString() === 'button_delete') {
        const idx = location.rowId as number
        const item = unidades.at(idx - 1)

        if (item != undefined) {
          setItem(item)
          setShowModalDelete(true)
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
              item.subCategoria != '' &&
              item.especialidad != '' &&
              item.unidadObra != '' &&
              item.subEspecialidad !== null
            ) {
              toastId = toast.loading('Enviando... 🚀')
              const value: any = {
                simpleUdName: item.nombreUnidadSimple,
                description: item.descripcionUnidadSimple,
                mtUnitOfMeasurementId: parseInt(item.unidadObra),
                mtSpecialtyActionId: parseInt(item.especialidad),
                accountantConcept: item.counter,
                sapId: item.sap,
                global: item.global,
                status: 0,
                mtSubspecialityId:
                  item.subEspecialidad !== null
                    ? item.subEspecialidad.value
                    : null,
              }

              let result: any = null

              if (itemId === 0) {
                result = await trigger(value)
              } else {
                result = await fetch(
                  `${process.env.API_URL}/SimpleCatalog/Update/${itemId}`,
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
                result !== undefined &&
                (result.status === 200 || result.status === 201)
              ) {
                mutate()
                toast.success('Enviado con éxito 🙌', { id: toastId })
              }
              if (result != undefined && result.status >= 400) {
                mutate()
                toast.error('No se puede enviar 😱', { id: toastId })
              }
            }
          }
        } catch (e) {
          toast.error('No se puede enviar 😱', { id: toastId })
        }
      }

      console.log(location)
    },
    [itemId, mutate, trigger, unidades],
  )

  const rows = useMemo(
    () =>
      getRows(
        unidades,
        columns,
        subCat.map((item: any) => ({ label: item.text, value: item.value })),
        esp.map((item: any) => ({
          label: item.name,
          value: String(item.id),
          subcategory: item.mtSubCategoryActionId,
        })),
        unitMeasurement.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        subEsp.map((item: any) => ({
          label: item.name,
          value: item.id,
          subcategoryId: item.mtSubCategoryActionId,
          especialityId: item.mtSpecialtyActionId,
        })),
      ),
    [columns, esp, subCat, subEsp, unidades, unitMeasurement],
  )

  const processUnidad = useCallback(
    (item: SimpleCatalog, idx: number): UnidadSimple => {
      const {
        id,
        simpleUdId,
        simpleUdName,
        description,
        accountantConcept,
        mtSubCategoryActionId,
        mtSpecialtyActionId,
        mtUnitOfMeasurementId,
        sapId,
        global,
        mtSubspecialityId,
        mtSubspecialityName,
      } = item

      const subEspecialidad =
        mtSubspecialityId !== null
          ? { label: mtSubspecialityName, value: mtSubspecialityId }
          : null
      const especialidadesFilter = esp
        .filter(
          (el) => el.mtSubCategoryActionId.toString() === mtSubCategoryActionId,
        )
        .map((el) => ({
          label: el.name,
          value: String(el.id),
          subcategory: String(el.mtSubCategoryActionId),
        }))

      return {
        idauto: idx + 1,
        id,
        idUnidad: simpleUdId,
        nombreUnidadSimple: simpleUdName,
        descripcionUnidadSimple: description || '',
        counter: accountantConcept,
        subCategoria: mtSubCategoryActionId,
        especialidad: String(mtSpecialtyActionId),
        unidadObra: String(mtUnitOfMeasurementId),
        sap: sapId,
        global,
        subEspecialidad,
        subcategoriaisOpen: false,
        especialidadisOpen: false,
        unidadObraisOpen: false,
        especialidadesFilter,
        newItem: false,
      }
    },
    [esp],
  )

  const handleChange = useCallback(
    (changes: CellChange<any>[]) => {
      setUnidadesSimples((prevUnidades) =>
        applyChanges(
          changes,
          prevUnidades,
          esp.map((item: any) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          })),
          getEmpty,
        ),
      )
    },
    [esp, setUnidadesSimples],
  )

  const handleNewItem = useCallback(() => {
    setItemId((prev) => 0)
    setModalNewItem(true, () => setItemId((prev) => 0))
  }, [setModalNewItem])

  const handleSetDescription = useCallback(
    (value: string) => {
      const updatedItem: UnidadSimple = {
        ...item,
        descripcionUnidadSimple: value,
      }

      setUnidadesSimples((prev) => {
        prev[indexOfDescription] = updatedItem

        return [...prev]
      })

      setShowDescriptionModal(false)
    },
    [item, indexOfDescription, setUnidadesSimples],
  )

  useEffect(() => {
    try {
      if (data) {
        const updatedUnidadesSimples = moreRows(
          data.result.results.map(processUnidad),
          25,
        )
        setUnidadesSimples(updatedUnidadesSimples)
      } else {
        setUnidadesSimples(moreRows(getUnidadesSimples(), 25))
      }
    } finally {
    }
  }, [data, processUnidad])

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <section>
      <Breadcrumbs items={breadcrumbs} />
      <div style={{ margin: '0 20px' }}>
        <SpreadSheet.Root>
          <SpreadSheet.Header
            title="Catálogo de unidades simples"
            description="Repositório de unidades de obra simples"
          >
            {' '}
            <form className="py-4">
              <SearchInput
                label=""
                hideLabel={true}
                selectValue={null}
                hideFilter={false}
                selectPlaceholder="Subcategorias"
                inputPlaceholder="Buscar de unidades simples"
                options={{
                  filtros: {
                    subcategorias: subCat.map((item: any) => ({
                      label: item.text,
                      value: String(item.value),
                    })),
                    especialidades: esp.map((item: any) => ({
                      label: item.name,
                      value: String(item.id),
                      subcategory: String(item.mtSubCategoryActionId),
                    })),
                  },
                  values: {
                    subcategoria: filtroSubcategoria,
                    especialidad: filtroEspecialidad,
                  },
                }}
                searchInputValue={searchInput}
                onChangeInput={(newValue: any) => setSearchInput(newValue)}
                onChangeSelect={(newValue: Option[]) => {}}
                onSearch={async (values: any) => {
                  console.log(values)
                  if (
                    'subcategoria' in values &&
                    values.subcategoria !== undefined
                  )
                    setFiltroSubcategoria(values.subcategoria.value)

                  if (
                    'especialidad' in values &&
                    values.especialidad !== undefined
                  )
                    setFiltroEspecialidad(values.especialidad.value)

                  await mutate()
                }}
              />
            </form>
            <Button variant="default" onClick={handleNewItem}>
              <FaPlus className="mr-2" size={14} />
              Nuevo
            </Button>
          </SpreadSheet.Header>
          <SpreadSheet.Body
            loading={isLoading}
            items={unidades}
            rows={rows}
            columns={columns}
            emptyElement={getEmpty(unidades.length + 1)}
            onChangeRows={(items: UnidadSimple[]) => setUnidadesSimples(items)}
            onChangeColumns={(columns: Column[]) => setColumns(columns)}
            onChange={(changes: CellChange<any>[]) => handleChange(changes)}
            onCellClick={handleLocationClick}
            onShowRow={(idx: any) => {
              const item = unidades.at(idx - 1)
              setItemId(item ? item.id : 0)
              setModalDetail(true)
            }}
            onUpdateRow={() => {}}
          />
        </SpreadSheet.Root>
      </div>

      {showDescriptionModal && (
        <ModalDescriptionCell
          title={'Descripción'}
          buttonText="Adicionar a Celda"
          defaultValue={item.descripcionUnidadSimple}
          onClose={() => setShowDescriptionModal(false)}
          onSave={(value: string) => handleSetDescription(value)}
        />
      )}
      {showModalSpecialty ? (
        <ModalEspecialidadesParaSpreadsheet
          title="Subespecialidades"
          especialidad={parseInt(item.especialidad)}
          options={subEsp.map((item: any) => ({
            label: item.name,
            value: item.id,
            subcategoryId: item.mtSubCategoryActionId,
            especialityId: item.mtSpecialtyActionId,
            especialityName: item.mtSpecialtyAction,
            code: item.code,
            route: item.route,
          }))}
          // subespecialidaddes={item.subEspecialidades}
          onChange={(value: any) => {
            console.log(value)
            setUnidadesSimples([
              ...unidades.map((unidad: UnidadSimple) => ({
                ...unidad,
                subEspecialidad:
                  unidad.idauto === item.idauto
                    ? value
                    : unidad.subEspecialidad,
              })),
            ])
          }}
          onClose={() => setShowModalSpecialty(!showModalSpecialty)}
          isModalOpen={showModalSpecialty}
        />
      ) : null}

      <ModalDelete
        title="Eliminar Unidad Simple"
        description="¿Está seguro que desea eliminar esta unidad?"
        open={showModaldelete}
        onOpenChange={setShowModalDelete}
        urlRoute={`${process.env.API_URL}/SimpleCatalog/ChangeDisabledStatus/${item.id}`}
        mutate={mutate}
      />

      {modalDetail ? (
        <ModalDetail
          isModalOpen={modalDetail}
          title="Detalles de unidad"
          itemSelected={unidades.find(
            (item: UnidadSimple) => item.id === itemId,
          )}
          unidadesObra={unitMeasurement.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          subcategorias={subCat.map((item: any) => ({
            label: item.text,
            value: item.value,
          }))}
          especialidades={esp.map((item: any) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          }))}
          onClose={() => setModalDetail(false)}
        />
      ) : null}
      {modalNewItem ? (
        <ModalNewItem
          isModalOpen={modalNewItem}
          title={itemId === 0 ? 'Nueva unidad' : 'Actualizar unidad'}
          itemSelected={unidades.find(
            (item: UnidadSimple) => item.id === itemId,
          )}
          subespecialidaddes={subEsp.map((item) => ({
            label: item.name,
            value: item.id,
            subcategoryId: item.mtSubCategoryActionId,
            especialityId: item.mtSpecialtyActionId,
            especialityName: item.mtSpecialtyAction,
            code: item.code,
            route: item.route,
          }))}
          unidadesObra={unitMeasurement.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          subcategorias={subCat.map((item) => ({
            label: item.text,
            value: item.value,
          }))}
          especialidades={esp.map((item: any) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          }))}
          onMutate={async (values: any) => {
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
                simpleUdName: values.nombreUnidadSimple,
                description: values.descripcionUnidadSimple,
                mtUnitOfMeasurementId: parseInt(values.udObra),
                mtSpecialtyActionId: parseInt(values.especialidadActuacion),
                accountantConcept: '',
                global: values.global,
                sapId: values.sap,
                status: 0,
                mtSubspecialityId:
                  values.subEspecialidad !== null
                    ? values.subEspecialidad.value
                    : null,
              }

              let result: any = null

              if (itemId === 0) result = await trigger(value)
              else {
                result = await fetch(
                  `${process.env.API_URL}/SimpleCatalog/Update/${itemId}`,
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
                console.log(result)

                toast.error(`No se puede enviar. ${result.errorMessage}😱`, {
                  id: toastId,
                })
              }

              await mutate()
              if (itemId !== 0) {
                setModalNewItem(false)
              }
            } catch (e) {
              console.log(e)
              toast.error(
                `No se puede enviar. Error en el servidor. Consulte a servicios 😱`,
                { id: toastId },
              )
            }
          }}
          onClose={() => setModalNewItem(false)}
        />
      ) : null}
    </section>
  )
}
