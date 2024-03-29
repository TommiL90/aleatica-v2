'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import fetcher from '@/services/fetcher'
import {
  CompositeCatalog,
  SimpleCatalog,
  SpecialtyAction,
  SubCategory,
  Subspeciality,
  UnitOfMeasurement,
} from '@/services/useGetRepositories'
import { CellChange, CellLocation, Column } from '@silevis/reactgrid'
import { BiSearch } from 'react-icons/bi'
import { toast } from 'sonner'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { DataResponse } from '@/types/data-response'
import { Button } from '@/components/ui/button'
import ModalDescriptionCell from '@/components/common-modals/modal-cell-description'
import { ModalDelete } from '@/components/common-modals/modal-delete'
import { SpreadSheet } from '@/components/spread-sheet'

import {
  composGetEmpty,
  composGetRows,
  composMoreRows,
  composUdCreator,
  composeApplyChanges,
  getComposColumns,
  getUnidadesCompuestas,
} from './functions'
import ModalDetail from './modal-detail'
import ModalSimplesParaSpreadsheet from './modal-simples'
import Breadcrumbs from '@/components/breadcrumbs'
import { useStateCallback } from '@/hooks/useStateCallback'
import ModalNewItem from './modal-edit'
import { FaPlus } from 'react-icons/fa'
import SearchInput from '@/components/inputs/searchInput'

interface ComposCatalogTableProps {
  subEsp: Subspeciality[]
  esp: SpecialtyAction[]
  subCat: SubCategory[]
  unitMeasurement: UnitOfMeasurement[]
  simpleCatalog: SimpleCatalog[]
}

export interface ComposCatalogPaginated {
  currentPage: number
  pageCount: number
  pageSize: number
  recordCount: number
  results: CompositeCatalog[]
}

export interface UnidadCompuesta {
  idauto: number
  id: number
  idUnidad: string
  codigoCompuesta: string
  nombreUnidadCompuesta: string
  descripcionUnidadCompuesta: string
  counter: string
  subCategoria: any
  especialidad: any
  unidadObra: any
  sap: string
  unidadesSimples: any[]
  unidadObraisOpen: boolean
  subcategoriaisOpen: boolean
  especialidadisOpen: boolean
  especialidadesFilter: any[]
  newItem: boolean // indica si es elemento nuevo: true, o cagado desde bd: false
}

const breadcrumbs = [
  { label: 'Inicio', link: '/' },
  { label: 'Repositorio', link: null },
  { label: 'Catálogo de unidades compuestas', link: null },
]

const ComposCatalogTable = ({
  subEsp,
  subCat,
  esp,
  unitMeasurement,
  simpleCatalog,
}: ComposCatalogTableProps) => {
  const [searchInput, setSearchInput] = useState('')
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const [itemId, setItemId] = useState(0)
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/CompositeCatalog/Create`,
    composUdCreator /* options */,
  )
  const { data, mutate, isLoading, error } = useSWR<
    DataResponse<ComposCatalogPaginated>
  >(
    `${process.env.API_URL}/CompositeCatalog/GetAllPaginated?MtSpecialtyActionId=${filtroEspecialidad}&SearchByProp=compositeUdName&SearchCriteria=${searchInput}&PageSize=2147483647`,
    fetcher,
  )
  const [unidades, setUnidadesCompuestas] = useState<UnidadCompuesta[]>([])
  const [columns, setColumns] = useState<Column[]>(getComposColumns())
  const [showModalDetails, setShowModalDetails] = useState(false)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [showModalSimpleUd, setShowModalSimpleUd] = useState(false)
  const [showModaldelete, setShowModalDelete] = useState(false)
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [indexOfDescription, setIndexOfDescription] = useState(0)
  const [item, setItem] = useState<UnidadCompuesta>(composGetEmpty)

  const rows = useMemo(
    () =>
      composGetRows(
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
      ),
    [columns, esp, subCat, unidades, unitMeasurement],
  )

  const processUnidad = useCallback(
    (item: CompositeCatalog, idx: number): UnidadCompuesta => {
      const {
        id,
        compositeUdId,
        code,
        description,
        compositeUdName,
        count,
        mtSubCategoryActionId,
        mtSpecialtyActionId,
        mtUnitOfMeasurementId,
        sapId,
      } = item

      const unidadesSimples = simpleCatalog.map((item) => ({
        label: item.simpleUdName,
        value: item.id,
      }))

      const especialidadesFilter = esp
        .map((el) => ({
          label: el.name,
          value: String(el.id),
          subcategory: String(el.mtSubCategoryActionId),
        }))
        .filter((i) => i.subcategory == mtSubCategoryActionId)

      return {
        idauto: idx + 1,
        id,
        idUnidad: compositeUdId,
        codigoCompuesta: code,
        nombreUnidadCompuesta: compositeUdName,
        descripcionUnidadCompuesta: description,
        counter: String(count),
        subCategoria: mtSubCategoryActionId,
        especialidad: String(mtSpecialtyActionId),
        unidadObra: String(mtUnitOfMeasurementId),
        sap: sapId,
        unidadesSimples,
        especialidadesFilter,
        subcategoriaisOpen: false,
        especialidadisOpen: false,
        unidadObraisOpen: false,
        newItem: false,
      }
    },
    [esp, simpleCatalog],
  )

  const handleChange = useCallback(
    (changes: CellChange<any>[]) => {
      setUnidadesCompuestas((prevUnidades) =>
        composeApplyChanges(
          changes,
          prevUnidades,
          esp.map((item: any) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          })),
          composGetEmpty,
        ),
      )
    },
    [esp],
  )

  const handleLocationClick = useCallback(
    async (location: CellLocation) => {
      if (location.columnId.toString() === 'modal') {
        mutate()
        const idx = location.rowId as number
        const item = unidades.at(idx - 1)

        if (item) {
          setItem(item)
          setShowModalSimpleUd(true)
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
              item.nombreUnidadCompuesta.length > 0 &&
              item.descripcionUnidadCompuesta.length > 0 &&
              // item.counter.length > 0 &&
              // item.sap.length > 0 &&
              item.subCategoria != '' &&
              item.especialidad != '' &&
              item.unidadObra != '' &&
              item.unidadesSimples.length > 0
            ) {
              toastId = toast.loading('Enviando... 🚀')

              // Submit data
              const value: any = {
                compositeUdName: item.nombreUnidadCompuesta,
                description: item.descripcionUnidadCompuesta,
                mtSpecialtyActionId: parseInt(item.especialidad),
                mtUnitOfMeasurementId: parseInt(item.unidadObra),
                count: item.counter,
                sapId: item.sap,
                code: item.codigoCompuesta,
                simpleCatalogsIds: item.unidadesSimples.map(
                  (item: any) => item.value,
                ),
              }

              let result: any = null

              if (item.newItem) {
                result = await trigger(value)
              } else {
                ;(value['id'] = item.id),
                  (result = await fetch(
                    `${process.env.API_URL}/CompositeCatalog/Update/${item.id}`,
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
                toast.error(`No se puede enviar. ${result.errorMessage}😱`, {
                  id: toastId,
                })
              }
            }
          }
        } catch (e) {
          toast.error(
            `No se puede enviar. Error en el servidor. Consulte a servicios 😱`,
            { id: toastId },
          )
        }
      }

      if (location.columnId.toString() === 'descripcionUnidadCompuesta') {
        const idx = location.rowId as number
        const item = unidades.at(idx - 1)

        if (item) {
          setIndexOfDescription(idx - 1)
          setItem(item)
          setShowDescriptionModal(true)
        }
      }
    },
    [mutate, trigger, unidades],
  )

  const handleNewItem = useCallback(() => {
    setItemId((prev) => 0)
    setModalNewItem(true, () => setItemId((prev) => 0))
  }, [setModalNewItem])

  // pasar dentro de modal para optimizar componente
  const handleSetDescription = useCallback(
    (value: string) => {
      const updatedItem: UnidadCompuesta = {
        ...item,
        descripcionUnidadCompuesta: value,
      }

      setUnidadesCompuestas((prev) => {
        prev[indexOfDescription] = updatedItem

        return [...prev]
      })

      setShowDescriptionModal(false)
    },
    [item, indexOfDescription],
  )

  useEffect(() => {
    try {
      if (data) {
        const updatedUnidadesCompuestas = composMoreRows(
          data.result.results.map(processUnidad),
          25,
        )
        setUnidadesCompuestas(updatedUnidadesCompuestas)
      } else {
        setUnidadesCompuestas(composMoreRows(getUnidadesCompuestas(), 25))
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
            title="Catálogo de unidades compuestas"
            description="Repositório de unidades compuestas"
          >
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
                onChangeSelect={(newValue: any[]) => {}}
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
            emptyElement={composGetEmpty(unidades.length + 1)}
            onChangeRows={(items: UnidadCompuesta[]) =>
              setUnidadesCompuestas(items)
            }
            onChangeColumns={(columns: Column[]) => setColumns(columns)}
            onChange={(changes: CellChange<any>[]) => handleChange(changes)}
            onCellClick={handleLocationClick}
            onShowRow={(idx: any) => {
              const item = unidades.at(idx - 1)
              setItemId(item ? item.id : 0)
              setShowModalDetails(true)
            }}
            onUpdateRow={() => {}}
          />
        </SpreadSheet.Root>
      </div>
      {showModalDetails ? (
        <ModalDetail
          isModalOpen={showModalDetails}
          title="Detalles de unidad"
          itemSelected={unidades.find(
            (item: UnidadCompuesta) => item.id === itemId,
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
          onClose={() => setShowModalDetails(!showModalDetails)}
        />
      ) : null}
      {showDescriptionModal && (
        <ModalDescriptionCell
          title={'Descripción'}
          buttonText="Adicionar a Celda"
          defaultValue={item.descripcionUnidadCompuesta}
          onClose={() => setShowDescriptionModal(false)}
          onSave={(value: string) => handleSetDescription(value)}
        />
      )}
      {showModalSimpleUd ? (
        <ModalSimplesParaSpreadsheet
          title="Unidades simples"
          especialidad={parseInt(item.especialidad)}
          options={simpleCatalog.map((item) => ({
            id: item.simpleUdId,
            label: item.simpleUdName,
            value: item.id,
            global: item.global,
            subcategoryId: item.mtSubCategoryActionId,
            especialityId: item.mtSpecialtyActionId,
            especialityName: item.mtSpecialtyAction,
            description: item.description,
          }))}
          simples={item.unidadesSimples}
          onChange={(values: any[]) =>
            setUnidadesCompuestas(
              unidades.map((unidad: UnidadCompuesta) => ({
                ...unidad,
                unidadesSimples:
                  unidad.idauto === item.idauto
                    ? values
                    : unidad.unidadesSimples,
              })),
            )
          }
          onClose={() => setShowModalSimpleUd(!showModalSimpleUd)}
          isModalOpen={showModalSimpleUd}
        />
      ) : null}
      {modalNewItem ? (
        <ModalNewItem
          isModalOpen={modalNewItem}
          title={itemId === 0 ? 'Nueva unidad' : 'Actualizar unidad'}
          itemSelected={unidades.find(
            (item: UnidadCompuesta) => item.id === itemId,
          )}
          simples={simpleCatalog.map((item) => ({
            id: item.simpleUdId,
            label: item.simpleUdName,
            value: item.id,
            global: item.global,
            subcategoryId: item.mtSubCategoryActionId,
            especialityId: item.mtSpecialtyActionId,
            especialityName: item.mtSpecialtyAction,
            description: item.description,
          }))}
          unidadesObra={unitMeasurement.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          subcategorias={subCat.map((item) => ({
            label: item.text,
            value: item.value,
          }))}
          especialidades={esp.map((item) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          }))}
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
                compositeUdName: values.nombreUnidadCompuesta,
                description: values.descripcionUnidadCompuesta,
                mtSpecialtyActionId: parseInt(values.especialidadActuacion),
                mtUnitOfMeasurementId: parseInt(values.udObra),
                count: 0,
                sapId: values.codigoSAP,
                code: values.codigoCompuesto,
                simpleCatalogsIds: values.unidadesSimples.map(
                  (item: any) => item.value,
                ),
              }

              let result: any = null

              if (itemId === 0) result = await trigger(value)
              else {
                result = await fetch(
                  `${process.env.API_URL}/CompositeCatalog/Update/${itemId}`,
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
              console.log(e)
              toast.error('No se puede enviar 😱', { id: toastId })
            }
          }}
          onClose={() => setModalNewItem(false)}
        />
      ) : null}
      <ModalDelete
        title="Eliminar Unidad Compuesta"
        description="¿Está seguro que desea eliminar esta unidad?"
        open={showModaldelete}
        onOpenChange={setShowModalDelete}
        urlRoute={`${process.env.API_URL}/CompositeCatalog/ChangeDisabledStatus/${item.id}`}
        mutate={mutate}
      />
    </section>
  )
}

export default ComposCatalogTable
