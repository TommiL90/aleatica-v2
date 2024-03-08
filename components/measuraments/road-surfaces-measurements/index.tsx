'use client'

import fetcher from '@/services/fetcher'
import {
  CompositeCatalogByEsp,
  MtDeteriorationTypeByEsp,
  MtHighwayIntersection,
  MtHighwayLane,
  MtPriority,
  MtSlipLaneRoad,
  PerformanceCatalogByEsp,
  SubcategoryActionsGetDropdownItems,
} from '@/services/get-repositories-for-measurements'
import { MtRoadSection, SpecialtyAction } from '@/services/useGetRepositories'
import { CellChange, CellLocation, Column } from '@silevis/reactgrid'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {
  applyRoadSurfaceChanges,
  getMediciones,
  getRoadSurfaceColumns,
  getRoadSurfaceEmpty,
  getRoadSurfaceRows,
  moreRoadSurfaceRows,
} from './functions'
import { useStateCallback } from '@/hooks/useStateCallback'
import { toast } from 'sonner'
import { DataResponse } from '@/types/data-response'
import { SpreadSheet } from '@/components/spread-sheet'
import { Button } from '@/components/ui/button'

import { BiSearch } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'

import { MesurementBySpecialty } from '../types'

interface Props {
  specialty: any
  subcat: SubcategoryActionsGetDropdownItems[]
  esp: SpecialtyAction[]
  roadSection: MtRoadSection[]
  highwayIntersection: MtHighwayIntersection[]
  slipLaneRoad: MtSlipLaneRoad[]
  highwayLane: MtHighwayLane[]
  priority: MtPriority[]
  performanceCatalogByEsp: PerformanceCatalogByEsp[]
  compositeCatalogByEsp: CompositeCatalogByEsp[]
  deteriorationTypeByEsp: MtDeteriorationTypeByEsp[]
}

export interface Medicion {
  idauto: number
  id: number
  idUnidad: string
  fechaPrevia: string
  tramo: any
  entronque: any
  cuerpo: any
  carril: any
  cadenamientoInicial: string
  km: number
  M: number
  L: number
  distanciaSeguimientoCad: number
  cadenamientoFinal: string
  km2: number
  m4: number
  O: number
  distanciaPreviaCad: number
  idIntervencion: string
  deterioros: any[]
  prioridad: any
  observacion: string | null
  actuacion: any
  compuesta: any // tipo de tratamiento

  porcentajeAfectacion: number
  longitud: number
  ancho: number
  area: number
  espesor: number
  volumen: number
  densidad: number
  masa: number

  alternativeUnitMeasurementValue: number
  habilitarUdAlt: boolean

  estudio: number

  tramoisOpen: boolean
  entronqueisOpen: boolean
  cuerpoisOpen: boolean
  carrilisOpen: boolean
  prioridadisOpen: boolean
  actuacionisOpen: boolean
  compuestaisOpen: boolean

  // compuestaFilter: any[]
  newItem: boolean // indica si es elemento nuevo: true, o cagado desde bd: false
  habilitarInputs: boolean
}

interface Option {
  label: string
  value: string
  checked: boolean
}

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

const RoadSurfacesMeasurements = ({
  specialty,
  subcat,
  esp,
  performanceCatalogByEsp: actuaciones,
  roadSection: tramo,
  highwayIntersection: entronque,
  slipLaneRoad: cuerpo,
  highwayLane: carril,
  priority: prioridad,
  compositeCatalogByEsp: compuestas,
  deteriorationTypeByEsp: deterioros,
}: Props) => {
  const params = useParams<{ projectId: string }>()
  const projectId = params && params.projectId ? params.projectId : '0'

  const searchParams = useSearchParams()
  const espId = searchParams ? searchParams.get('esp') : '0'

  const router = useRouter()

  const [itemId, setItemId] = useState(0)
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')
  const [filtroTramo, setFiltroTramo] = useState('')

  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/MeasurementTab/Create`,
    creator /* options */,
  )

  const { data, mutate, isLoading, error } = useSWR<
    DataResponse<MesurementBySpecialty[]>
  >(
    espId
      ? `${process.env.API_URL}/MeasurementTab/GetBySpecialty?specialityId=${espId}&projectId=${projectId}`
      : null,
    fetcher,
  )

  const [mediciones, setMediciones] = useState<Medicion[]>([])
  const [columns, setColumns] = useState<Column[]>(getRoadSurfaceColumns())
  const [modal, setModal] = useState(false)
  const [modalCadenamientoInicial, setModalCadenamientoInicial] =
    useStateCallback(false)
  const [modalCadenamientoFinal, setModalCadenamientoFinal] =
    useStateCallback(false)
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<Medicion>(getRoadSurfaceEmpty)

  const [toastExecuted, setToastExecuted] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Pavimentos', value: 'P', checked: true },
    { label: 'Estructuras', value: 'E', checked: false },
    { label: 'Safety', value: 'S', checked: false },
  ])

  if (actuaciones.length === 0 && !toastExecuted) {
    setToastExecuted(true) // Agrega esta variable de estado
    router.push(`/proyectos/${projectId}`)

    toast.warning(
      'No hay mediciones disponibles...\n\n Para ver la tabla de mediciones, primero debe ser creada al menos una actuación.',
    )
  }

  const rows = useMemo(
    () =>
      getRoadSurfaceRows(
        mediciones,
        columns,
        tramo.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
        entronque.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        cuerpo.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        carril.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        prioridad.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        actuaciones.map((item: any) => ({
          label: item.performanceName,
          value: String(item.id),
        })),
        compuestas.map((item: any) => ({
          label: item.compositeUdName,
          value: String(item.id),
        })),
      ),
    [
      actuaciones,
      carril,
      columns,
      compuestas,
      cuerpo,
      entronque,
      mediciones,
      prioridad,
      tramo,
    ],
  )

  const handleChange = useCallback(
    (changes: CellChange<any>[]) => {
      setMediciones((prevUnidades) =>
        applyRoadSurfaceChanges(changes, prevUnidades, getRoadSurfaceEmpty),
      )
    },
    [setMediciones],
  )

  const handleLocationClick = useCallback(
    async (location: CellLocation) => {
      if (location.columnId.toString() === 'modal') {
        setModal(!modal)

        const idx = location.rowId as number
        const item = mediciones.at(idx - 1)

        if (item) {
          setItem(item)
          console.log(item)
        }
      }

      if (location.columnId.toString() === 'button_delete') {
        const idx = location.rowId as number
        const item = mediciones.at(idx - 1)

        if (item != undefined) {
          setDeleteItem(item.id)
          setModalDelete(true)
        }
      }

      if (location.columnId.toString() === 'cadenamientoInicial') {
        setModalCadenamientoInicial(true)
        const idx = location.rowId as number
        const item = mediciones.at(idx - 1)

        if (item) {
          setItem(item)
          console.log(item)
        }
      }

      if (location.columnId.toString() === 'cadenamientoFinal') {
        setModalCadenamientoFinal(true)
        const idx = location.rowId as number
        const item = mediciones.at(idx - 1)

        if (item) {
          setItem(item)
          console.log(item)
        }
      }

      if (location.columnId.toString() === 'button_save') {
        const idx = location.rowId as number
        const item = mediciones.at(idx - 1)

        let toastId
        try {
          if (item != undefined) {
            if (
              item.fechaPrevia !== '' &&
              item.tramo !== null &&
              item.entronque !== null &&
              item.cuerpo !== null &&
              item.carril !== null &&
              item.actuacion !== null &&
              item.compuesta !== null &&
              item.deterioros.length > 0 &&
              item.prioridad !== null &&
              item.cadenamientoInicial.length > 5 &&
              item.cadenamientoFinal.length > 5 &&
              Number(item.ancho) > 0 &&
              item.espesor > 0
            ) {
              const cadInicial = item.cadenamientoInicial.split('+')
              const cadFinal = item.cadenamientoFinal.split('+')

              toastId = toast.loading('Enviando... 🚀')
              console.log('cadenamientoInicial', cadInicial)
              // Submit data
              const value: any = {
                // id: 0,
                previousStudiesDate: item.fechaPrevia,
                mtRoadSectionId: item.tramo,
                mtHigwayIntersectionId: item.entronque,
                mtSlipLaneRoadId: item.cuerpo,
                mtHighwayLaneId: item.carril,
                performanceCatalogId: item.actuacion,
                // interventionIdLocation: item.idIntervencion,
                compositeCatalogId: item.compuesta,
                mtPriorityId: item.prioridad,

                mtSpecialtyActionId: specialty.value,
                observation: item.observacion,
                initialNumber: item.cadenamientoInicial.replace('+', ''),
                finalNumber: item.cadenamientoFinal.replace('+', ''),

                affectePercentage: item.porcentajeAfectacion,
                length: item.longitud,
                width: item.ancho,
                area: item.area,
                thickness: item.espesor,
                volume: item.volumen,
                density: item.densidad,
                t: item.masa,

                alternativeUnitMeasurementValue:
                  item.alternativeUnitMeasurementValue,

                mtDeteriorationTypeIds: item.deterioros.map(
                  (item: any) => item.value,
                ),
              }

              let result: any = null

              if (item.newItem) {
                result = await trigger(value)
              } else {
                value['id'] = item.id
                result = await fetch(
                  `${process.env.API_URL}/MeasurementTab/Update/${item.id}`,
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
            }
          }
        } catch (e) {
          toast.error('No se puede enviar 😱', { id: toastId })
        }
      }
    },
    [
      mediciones,
      modal,
      mutate,
      setModalCadenamientoFinal,
      setModalCadenamientoInicial,
      specialty.value,
      trigger,
    ],
  )

  const processUnidad = useCallback(
    (item: MesurementBySpecialty, idx: number): Medicion => {
      return {
        idauto: idx + 1,
        id: item.id,

        idUnidad: '',
        fechaPrevia: item.previousStudiesDate,
        tramo: String(item.mtRoadSectionId),
        entronque: String(item.mtHigwayIntersectionId),
        cuerpo: String(item.mtSlipLaneRoadId),
        carril: String(item.mtHighwayLaneId),
        cadenamientoInicial: String(item.initialNumber),
        km: item.km,
        M: item.m,
        L: item.l,
        distanciaSeguimientoCad: item.distanceToNext,
        cadenamientoFinal: String(item.finalNumber),
        km2: item.km2,
        m4: item.m4,
        O: item.o,
        distanciaPreviaCad: item.distanceToPreviousCd,
        idIntervencion: item.intervetionIdLocation,
        deterioros: item.mtDeteriorationTypes.map((det) => ({
          label: det.name,
          value: det.id,
        })),
        prioridad: String(item.mtPriorityId),
        observacion: item.observation,
        actuacion: String(item.performanceCatalogId),
        compuesta: String(item.compositeCatalogId),

        porcentajeAfectacion: item.affectePercentage,

        longitud: item.length,
        ancho: item.width,
        area: item.area,
        espesor: item.thickness,
        densidad: item.density,
        masa: item.t,
        volumen: item.volume,
        alternativeUnitMeasurementValue: item.alternativeUnitMeasurementValue,
        estudio: 0,

        tramoisOpen: false,
        prioridadisOpen: false,
        entronqueisOpen: false,
        cuerpoisOpen: false,
        carrilisOpen: false,
        actuacionisOpen: false,
        compuestaisOpen: false,
        newItem: false,
        habilitarInputs: false,
        habilitarUdAlt: false,
      }
    },
    [],
  )

  const handleNewItem = useCallback(() => {
    setItemId((prev) => 0)
    setModalNewItem(true, () => setItemId((prev) => 0))
  }, [setModalNewItem])

  useEffect(() => {
    try {
      if (data) {
        const updatedUnidadesSimples = moreRoadSurfaceRows(
          data.result.map(processUnidad),
          25,
        )
        setMediciones(updatedUnidadesSimples)
      } else {
        setMediciones(moreRoadSurfaceRows(getMediciones(), 25))
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
            title="Mediciones de pavimentos"
            description="Desglose de mediciones de pavimentos"
          >
            opa
          </SpreadSheet.Header>
          <SpreadSheet.Body
            loading={isLoading}
            items={mediciones}
            rows={rows}
            columns={columns}
            emptyElement={getRoadSurfaceEmpty(mediciones.length + 1)}
            onChangeRows={(items: Medicion[]) => setMediciones(items)}
            onChangeColumns={(columns: Column[]) => setColumns(columns)}
            onChange={(changes: CellChange<any>[]) => handleChange(changes)}
            onCellClick={handleLocationClick}
            onShowRow={(idx: any) => {
              const item = mediciones.at(idx - 1)
              setItemId(item ? item.id : 0)
              setModalDetail(true)
            }}
            onUpdateRow={async (idx: any) => {
              const item = mediciones.at(idx - 1)

              console.log(item)
              setItemId((prev) => (item ? item.id : 0))
              setModalNewItem(true, () =>
                setItemId(item !== undefined ? item.id : 0),
              )
            }}
          />
        </SpreadSheet.Root>
      </div>
    </section>
  )
}

export default RoadSurfacesMeasurements
