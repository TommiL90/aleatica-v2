'use client'
import { useStateCallback } from '@/hooks/useStateCallback'
import fetcher from '@/services/fetcher'
import {
  ActionCategory,
  CompositeCatalog,
  MtRoadSection,
  PerformanceIndicator,
  ProjectCategory,
  ScopeOfAction,
  SpecialtyAction,
  SubCategory,
  Tca,
  UnitOfMeasurement,
} from '@/services/useGetRepositories'
import {
  CellChange,
  CellLocation,
  Column,
  DateCell,
  DefaultCellTypes,
  DropdownCell,
  Row,
} from '@silevis/reactgrid'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {
  applyActionsChanges,
  getActionsColumns,
  getActionsEmpty,
  getActionsRows,
  getActuaciones,
  moreActionsRows,
} from './functions'
import { SpreadSheet } from '@/components/spread-sheet'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { DataResponse } from '@/types/data-response'
import ModalNewItem from './modal-edit'
import CompositeModalForSpreadsheet from './composite-modal'
import ModalDetail from './modal-details'
import { ModalDelete } from '@/components/common-modals/modal-delete'
import { FaPlus } from 'react-icons/fa'
import SearchInput from '@/components/inputs/searchInput'
import { creator } from '@/app/[locale]/catalogos/udsimples/functions'

interface ActionsTableProps {
  uoc: CompositeCatalog[]
  tca: Tca[]
  subCat: SubCategory[]
  esp: SpecialtyAction[]
  projectCategory: ProjectCategory[]
  actionCategory: ActionCategory[]
  roadSection: MtRoadSection[]
  unitMeasurement: UnitOfMeasurement[]
  scopeAction: ScopeOfAction[]
  mRPerformance: PerformanceIndicator[]
}

export interface PerformanceCatalog {
  fileNumberId: string
  performanceId: string
  projectTask: string
  mtProjectCategory: string
  mtActionCategory: string
  mtSubCategoryAction: string
  mtRoadSection: string
  mtUnitOfMeasurement: string
  measurementTab: any
  mtScopeOfAction: string
  deferred: boolean
  mrPerformanceIndicator: string
  mtSpecialtyAction: string
  compositeCatalogs: CompositeCatalog[]
  mtAccidentRoadSections: any[]
  projectTaskId: number
  mtProjectCategoryId: number
  mtActionCategoryId: number
  fileNumber: string
  performanceNumber: string
  performanceName: string
  sapId: string
  mtRoadSectionId: number
  sustainability: boolean
  pra: boolean
  mtUnitOfMeasurementId: number
  measurementTabId: any
  mtScopeOfActionId: number
  mrPerformanceIndicatorId: number
  status: number
  mtSpecialtyActionId: number
  id: number
  disabled: boolean
  blackSpot: any
}

export interface Actuacion {
  idauto: number
  id: number

  idActuacion: string
  idExpediente: string
  // fecha: string;
  // codigoActuacion: string;
  expediente: string
  categoriaProyecto: string
  categoriaActuacion: string

  categoriaProyectoName: string
  categoriaActuacionName: string
  ambitoActuacionName: string

  subcategoriaActuacion: string
  especialidadActuacion: string
  unidadObra: string
  // anno: string,
  nombreActuacion: string
  diferido: boolean
  sostenibilidad: boolean
  PRA: boolean
  noActuacion: string
  puntosNegrosTCA: string
  codigoSAP: string
  ambitoActuacion: string
  MRAsociado: string
  faseTramo: string
  unidadesCompuestas: any[]
  categoriaProyectoisOpen: boolean
  categoriaActuacionisOpen: boolean
  puntosNegrosTCAisOpen: boolean
  // subcategoriaActuacionisOpen: boolean;
  // especialidadActuacionisOpen: boolean;
  unidadObraisOpen: boolean
  ambitoActuacionisOpen: boolean
  MRAsociadoisOpen: boolean
  faseTramoisOpen: boolean
  // especialidadesFilter: any[];
  unidadNegocioisOpen: boolean
  newItem: boolean
}

interface Option {
  label: string
  value: string
  checked: boolean
}

const ActionsTable = ({
  uoc,
  tca,
  subCat,
  esp,
  projectCategory,
  actionCategory,
  roadSection,
  unitMeasurement,
  scopeAction,
  mRPerformance,
}: ActionsTableProps) => {
  const params = useParams<{ taskId: string }>()
  const taskId = params && params.taskId ? params.taskId : '0'

  const searchParams = useSearchParams()
  const espId = searchParams ? searchParams.get('esp') : '0'

  const [itemId, setItemId] = useState(0)
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const [filtroCategoriaProyecto, setFiltroCategoriaProyecto] = useState('')
  const [filtroCategoriaActuacion, setFiltroCategoriaActuacion] = useState('')
  const [filtroTramo, setFiltroTramo] = useState('')
  const [filtroUnidadMedida, setFiltroUnidadMedida] = useState('')
  const [filtroAmbitoActuacion, setFiltroAmbitoActuacion] = useState('')
  const [filtroIndicadorEjecucion, setFiltroIndicadorEjecucion] = useState('')

  const { trigger, error: createError } = useSWRMutation(
    `${process.env.API_URL}/PerformanceCatalog/Create`,
    creator /* options */,
  )

  const { data, error, mutate, isLoading } = useSWR<
    DataResponse<PerformanceCatalog[]>
  >(
    `${process.env.API_URL}/ProjectTask/GetPerformanceCatalogs?projectTaskId=${taskId}&MtSpecialtyActionId=${filtroEspecialidad}&MtProjectCategoryId=${filtroCategoriaProyecto}&MtActionCategoryId=${filtroCategoriaActuacion}&MtRoadSectionId=${filtroTramo}&MtUnitOfMeasurementId=${filtroUnidadMedida}&MtScopeOfActionId=${filtroAmbitoActuacion}&MRPerformanceIndicatorId=${filtroIndicadorEjecucion}`,
    fetcher,
  )

  const [actuaciones, setActuaciones] = useState<Actuacion[]>(
    moreActionsRows(getActuaciones(), 20),
  )
  const [columns, setColumns] = useState<Column[]>(getActionsColumns())
  const [modal, setModal] = useState(false)
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<Actuacion>(getActionsEmpty)

  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Pavimentos', value: 'P', checked: true },
    { label: 'Estructuras', value: 'E', checked: false },
    { label: 'Safety', value: 'S', checked: false },
  ])

  const rows = useMemo(
    () =>
      getActionsRows(
        actuaciones,
        columns,
        subCat.map((item) => ({
          label: item.text,
          value: item.value,
        })),

        esp.map((item) => ({
          label: item.name,
          value: String(item.id),
          subcategory: item.mtSubCategoryActionId,
        })),
        projectCategory.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        actionCategory.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        roadSection.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        unitMeasurement.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        scopeAction.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        mRPerformance.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        tca.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
      ),
    [
      actionCategory,
      actuaciones,
      columns,
      esp,
      mRPerformance,
      projectCategory,
      roadSection,
      scopeAction,
      subCat,
      tca,
      unitMeasurement,
    ],
  )

  const processUnidad = useCallback(
    (item: PerformanceCatalog, idx: number): Actuacion => {
      const {
        id,
        performanceId,
        fileNumberId,
        performanceNumber,
        mtProjectCategory,
        mtActionCategory,
        mtScopeOfAction,
        fileNumber,
        mtProjectCategoryId,
        mtActionCategoryId,
        mtSubCategoryAction,
        mtSpecialtyAction,
        mtUnitOfMeasurementId,
        performanceName,
        deferred,
        sustainability,
        pra,
        blackSpot,
        sapId,
        mtScopeOfActionId,
        mrPerformanceIndicatorId,
        mtRoadSectionId,
        compositeCatalogs,
      } = item

      return {
        idauto: idx + 1,
        id,
        idActuacion: performanceId,
        idExpediente: fileNumberId,
        noActuacion: performanceNumber,
        categoriaProyectoName: mtProjectCategory,
        categoriaActuacionName: mtActionCategory,
        ambitoActuacionName: mtScopeOfAction,
        expediente: fileNumber,
        categoriaProyecto: String(mtProjectCategoryId),
        categoriaActuacion: String(mtActionCategoryId),
        subcategoriaActuacion: mtSubCategoryAction,
        especialidadActuacion: mtSpecialtyAction,
        unidadObra: String(mtUnitOfMeasurementId),
        nombreActuacion: performanceName,
        diferido: deferred,
        sostenibilidad: sustainability,
        PRA: pra,
        puntosNegrosTCA: blackSpot,
        codigoSAP: sapId,
        ambitoActuacion: String(mtScopeOfActionId),
        MRAsociado: String(mrPerformanceIndicatorId),
        faseTramo: String(mtRoadSectionId),
        unidadesCompuestas: compositeCatalogs.map((uc) => ({
          label: uc.compositeUdName,
          value: uc.id,
        })),
        categoriaProyectoisOpen: false,
        unidadNegocioisOpen: false,
        categoriaActuacionisOpen: false,

        unidadObraisOpen: false,
        ambitoActuacionisOpen: false,
        MRAsociadoisOpen: false,
        faseTramoisOpen: false,

        puntosNegrosTCAisOpen: false,
        newItem: false,
      }
    },
    [],
  )

  const handleChange = useCallback(
    (changes: CellChange<any>[]) => {
      setActuaciones((prevUnidades) =>
        applyActionsChanges(
          changes,
          prevUnidades,
          esp.map((item: any) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          })),
          getActionsEmpty,
        ),
      )
    },
    [esp],
  )

  const handleLocationClick = useCallback(
    async (location: CellLocation) => {
      if (location.columnId.toString() === 'modal') {
        const idx = location.rowId as number
        const item = actuaciones.at(idx - 1)

        if (item) {
          setItem(item)
          setModal(true)
        }
      }

      if (location.columnId.toString() === 'button_delete') {
        const idx = location.rowId as number
        const item = actuaciones.at(idx - 1)

        if (item && item.id > 0) {
          setItem(item)
          setModalDelete(true)
        }
      }

      if (location.columnId.toString() === 'button_save') {
        const idx = location.rowId as number
        const item = actuaciones.at(idx - 1)

        let toastId
        try {
          if (item != undefined) {
            if (
              // item.codigoActuacion != "" &&
              // item.expediente != "" &&
              item.categoriaProyecto != '' &&
              item.categoriaActuacion != '' &&
              // item.subcategoriaActuacion != "" &&
              // item.especialidadActuacion != "" &&
              item.unidadObra != '' &&
              // item.anno != "" &&
              item.nombreActuacion != '' &&
              item.puntosNegrosTCA != '' &&
              // item.codigoSAP != "" &&
              // item. ambitoActuacion != "" &&
              // item.MRAsociado != "" &&
              item.faseTramo != '' &&
              item.unidadesCompuestas.length > 0
            ) {
              toastId = toast.loading('Enviando... 🚀')
              // Submit data
              const value: any = {
                projectTaskId: parseInt(taskId),
                mtProjectCategoryId: parseInt(item.categoriaProyecto),
                mtActionCategoryId: parseInt(item.categoriaActuacion),
                fileNumber: item.expediente,
                performanceNumber: item.noActuacion,
                deferred: item.diferido,
                performanceName: item.nombreActuacion,
                sapId: item.codigoSAP,
                mtRoadSectionId: parseInt(item.faseTramo),
                sustainability: item.sostenibilidad,
                pra: item.PRA,
                blackSpot: item.puntosNegrosTCA,
                mtUnitOfMeasurementId: parseInt(item.unidadObra),
                measurementTabId: 1, // este campo no debe estar aqui
                mtScopeOfActionId: parseInt(item.ambitoActuacion),
                mrPerformanceIndicatorId: parseInt(item.MRAsociado),
                status: 0,
                mtSpecialtyActionId: espId ? parseInt(espId) : 0,
                compositeCatalogIds: item.unidadesCompuestas.map((item) =>
                  parseInt(item.value),
                ),
              }

              let result: any = null

              if (item.newItem) result = await trigger(value)
              else {
                value['id'] = item.id

                result = await fetch(
                  `${process.env.API_URL}/PerformanceCatalog/Update/${item.id}`,
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
                mutate()
              }
              if (result != undefined && result.status >= 300) {
                toast.error(`No se puede enviar ${result.errorMessage} 😱`, {
                  id: toastId,
                })
              }
            }
          }
        } catch (e) {
          toast.error('No se puede enviar 😱', { id: toastId })
        }
      }
    },
    [actuaciones, espId, mutate, taskId, trigger],
  )

  const handleNewItem = useCallback(() => {
    setItemId((prev) => 0)
    setModalNewItem(true, () => setItemId((prev) => 0))
  }, [setModalNewItem])

  useEffect(() => {
    try {
      if (data) {
        const updatedActions = moreActionsRows(
          data.result.map(processUnidad),
          25,
        )
        setActuaciones(updatedActions)
      } else {
        setActuaciones(moreActionsRows(getActuaciones(), 25))
      }
    } finally {
    }
  }, [data, processUnidad])

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <section>
      <div style={{ margin: '0 20px' }}>
        <SpreadSheet.Root>
          <SpreadSheet.Header
            title="Catálogo de actuaciones de tarea de proyecto"
            description="Repositorio de tarea de proyecto"
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
                    categoriaProyectos: projectCategory.map((item) => ({
                      label: item.name,
                      value: String(item.id),
                    })),

                    categoriaActuacion: actionCategory.map((item) => ({
                      label: item.name,
                      value: String(item.id),
                    })),

                    tramos: roadSection.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })),
                    unidadMedida: unitMeasurement.map((item) => ({
                      label: item.name,
                      value: String(item.id),
                    })),
                    ambitoActuacion: scopeAction.map((item) => ({
                      label: item.name,
                      value: String(item.id),
                    })),
                    MRAsociado: mRPerformance.map((item) => ({
                      label: item.name,
                      value: String(item.id),
                    })),
                    subcategorias: subCat.map((item) => ({
                      label: item.text,
                      value: String(item.value),
                    })),

                    especialidades: esp.map((item) => ({
                      label: item.name,
                      value: String(item.id),
                      subcategory: String(item.mtSubCategoryActionId),
                    })),
                  },
                  values: {
                    subcategoria: filtroSubcategoria,
                    especialidad: filtroEspecialidad,
                    categoriaProyecto: filtroCategoriaProyecto,
                    categoriaActuacion: filtroCategoriaActuacion,
                    tramo: filtroTramo,
                    unidadMedida: filtroUnidadMedida,
                    ambitoActuacion: filtroAmbitoActuacion,
                    MRAsociado: filtroIndicadorEjecucion,
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

                  if ('tramo' in values && values.tramo !== undefined)
                    setFiltroTramo(values.tramo.value)

                  if (
                    'categoriaProyecto' in values &&
                    values.categoriaProyecto !== undefined
                  )
                    setFiltroCategoriaProyecto(values.categoriaProyecto.value)

                  if (
                    'categoriaActuacion' in values &&
                    values.categoriaActuacion !== undefined
                  )
                    setFiltroCategoriaActuacion(values.categoriaActuacion.value)

                  if (
                    'unidadMedida' in values &&
                    values.unidadMedida !== undefined
                  )
                    setFiltroUnidadMedida(values.unidadMedida.value)

                  if (
                    'ambitoActuacion' in values &&
                    values.ambitoActuacion !== undefined
                  )
                    setFiltroAmbitoActuacion(values.ambitoActuacion.value)

                  if ('MRAsociado' in values && values.MRAsociado !== undefined)
                    setFiltroIndicadorEjecucion(values.MRAsociado.value)

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
            items={actuaciones}
            rows={rows}
            columns={columns}
            emptyElement={getActionsEmpty(actuaciones.length + 1)}
            onChangeRows={(items: Actuacion[]) => setActuaciones(items)}
            onChangeColumns={(columns: Column[]) => setColumns(columns)}
            onChange={(changes: CellChange<any>[]) => handleChange(changes)}
            onCellClick={handleLocationClick}
            onShowRow={(idx: any) => {
              const item = actuaciones.at(idx - 1)
              setItemId(item ? item.id : 0)
              setModalDetail(true)
            }}
            onUpdateRow={() => {}}
          />
        </SpreadSheet.Root>
      </div>
      {modalNewItem ? (
        <ModalNewItem
          isModalOpen={modalNewItem}
          title={itemId === 0 ? 'Nueva actuacion' : 'Actualizar actuacion'}
          itemSelected={actuaciones.find(
            (item: Actuacion) => item.id === itemId,
          )}
          // tareaId={ typeof(router.query.id) === "string"  ? parseInt(router.query.id): 0}

          especialidad={typeof espId === 'string' ? parseInt(espId) : 0}
          compositeList={uoc.map((item) => ({
            label: item.compositeUdName,
            value: item.id,
            especialityId: Number(item.mtSpecialtyActionId),
            especialityName: item.mtSpecialtyAction,
            subcategoryName: item.mtSubCategoryAction,
            description: item.description,
            id: item.compositeUdId,
          }))}
          compositeSelected={item.unidadesCompuestas}
          tca={tca.map((item) => ({
            label: item.name,
            value: item.id,
            tramo: item.mtRoadSectionId,
          }))}
          categoriaProyecto={projectCategory.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          categoriaActuacion={actionCategory.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          tramo={roadSection.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          unidadMedida={unitMeasurement.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          ambitoActuacion={scopeAction.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          MRAsociado={mRPerformance.map((item) => ({
            label: item.name,
            value: String(item.id),
          }))}
          onMutate={async (values: any) => {
            console.log(values)
            let toastId
            try {
              toastId = toast.loading('Enviando... 🚀')
              // Submit data
              const value: any = {
                id: itemId,
                projectTaskId: parseInt(taskId), // debe venir desde antes
                mtProjectCategoryId: parseInt(values.categoriaProyecto),
                mtActionCategoryId: parseInt(values.categoriaActuacion),
                fileNumber: values.expediente,
                deferred: values.diferido,
                performanceName: values.nombreActuacion,
                sapId: values.codigoSAP,
                mtRoadSectionId: parseInt(values.faseTramo),
                sustainability: values.sostenibilidad,
                pra: values.PRA,
                blackSpot: String(values.tca),
                mtUnitOfMeasurementId: parseInt(values.udObra),
                measurementTabId: 1, // este campo no debe estar aqui
                mtScopeOfActionId: parseInt(values.ambitoActuacion),
                mrPerformanceIndicatorId: parseInt(values.MRAsociado),
                performanceNumber: String(values.noActuacion),
                status: 0,
                mtSpecialtyActionId:
                  typeof espId === 'string' ? parseInt(espId) : 0,
                compositeCatalogIds: values.unidadesCompuestas.map(
                  (item: any) => parseInt(item.value),
                ),
              }

              let result: any = null

              if (itemId === 0) result = await trigger(value)
              else {
                result = await fetch(
                  `${process.env.API_URL}/PerformanceCatalog/Update/${itemId}`,
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
                toast.error(`No se puede enviar ${result.errorMessage} 😱`, {
                  id: toastId,
                })
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
          subcategorias={subCat.map((item) => ({
            label: item.text,
            value: item.value,
          }))}
          especialidades={esp.map((item) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          }))}
        />
      ) : null}
      {modalDetail ? (
        <ModalDetail
          isModalOpen={modalDetail}
          title="Detalles de actuacion"
          itemSelected={actuaciones.find(
            (item: Actuacion) => item.id === itemId,
          )}
          // subcategorias={
          //   subcatRes !== undefined && subcatRes.status === 200 ?
          //     subcatRes.result.map((item: any) => ({ label: item.text, value: item.value }))
          //     : []
          // }

          especialidades={esp.map((item) => ({
            label: item.name,
            value: String(item.id),
            subcategory: item.mtSubCategoryActionId,
          }))}
          unidadMedida={unitMeasurement.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          onClose={() => setModalDetail(false)}
        />
      ) : null}
      {modal ? (
        <CompositeModalForSpreadsheet
          title="Unidades compuestas"
          isModalOpen={modal}
          especialidad={typeof espId === 'string' ? parseInt(espId) : 0}
          compositeList={uoc.map((item: any) => ({
            label: item.compositeUdName,
            value: item.id,
            especialityId: Number(item.mtSpecialtyActionId),
            especialityName: item.mtSpecialtyAction,
            subcategoryName: item.mtSubCategoryAction,
            description: item.description,
            id: item.compositeUdId,
          }))}
          compositeSelected={item.unidadesCompuestas}
          onChange={(values: any[]) =>
            setActuaciones(
              actuaciones.map((actuacion: Actuacion) => ({
                ...actuacion,
                unidadesCompuestas:
                  actuacion.idauto === item.idauto
                    ? values
                    : actuacion.unidadesCompuestas,
              })),
            )
          }
          onClose={() => setModal(!modal)}
        />
      ) : null}
      {modalDelete && (
        <ModalDelete
          title="Eliminar actuación"
          description="Confirme que desea eliminar la actuación"
          mutate={mutate}
          open={modalDelete}
          onOpenChange={setModalDelete}
          urlRoute={`${process.env.API_URL}/PerformanceCatalog/ChangeDisabledStatus/${item!.id}`}
        />
      )}
    </section>
  )
}

export default ActionsTable
