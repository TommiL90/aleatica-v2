'use client'
import { Specialty } from '@/app/proyectos/[projectId]/tareas/[taskId]/mediciones/page'
import fetcher from '@/services/fetcher'
import {
  CompositeCatalogByEsp,
  MtAxis,
  MtCalification,
  MtDeteriorationTypeByEsp,
  MtDisposition,
  MtElement,
  MtHighwayIntersection,
  MtHighwayLane,
  MtPosition,
  MtPriority,
  MtSide,
  MtSlipLaneRoad,
  MtStructureNumber,
  MtTypology,
  PerformanceCatalogByEsp,
  SubcategoryActionsGetDropdownItems,
} from '@/services/get-repositories-for-measurements'
import { MtRoadSection, SpecialtyAction } from '@/services/useGetRepositories'
import { DataResponse } from '@/types/data-response'
import { CellChange, CellLocation, Column } from '@silevis/reactgrid'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { toast } from 'sonner'
import { useStateCallback } from '@/hooks/useStateCallback'
import {
  applyStructuresChanges,
  getStructuresColumns,
  getStructuresEmpty,
  getStructuresMediciones,
  getStructuresRows,
  moreStructuresRows,
} from './functions'
import { MesurementBySpecialty } from '../types'
import { SpreadSheet } from '@/components/spread-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BiSearch } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import ModalNewItem from './modalEdit'
import ModalDetail from './modalDetail'
import ModalDeteriorosParaSpreadsheet from '../modalDeteriorosParaSpeadsheet'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import ModalInputMask from '@/components/common-modals/modal-input-mask'

interface Props {
  specialty: Specialty
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
  structureNumber: MtStructureNumber[]
  typology: MtTypology[]
  axis: MtAxis[]
  side: MtSide[]
  element: MtElement[]
  calification: MtCalification[]
  position: MtPosition[]
  disposition: MtDisposition[]
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
  observacion: string
  actuacion: any
  compuesta: any // tipo de tratamiento
  longitud: number
  ancho: number
  area: number
  espesor: number
  volumen: number
  litro: number
  unidad: number // ud
  tonelada: number

  estudio: number

  // estructuras
  numeroEstructuras: any
  tipoEstructura: any
  idGeneral: string
  eje: any
  lado: any
  elementoEstructura: any
  posicion: any
  disposicion: any
  calificacion: any
  anchoPromedioCalzada: number
  esviaje: number
  anchoJunta: number
  numeroElementos: number
  anchoCalzada: number
  coseno: boolean
  longitudCadaJunta: number
  noElementos: number
  longitudTotalJuntas: number
  porcentajeAfectacion: number
  longitudJuntasAfectadas: number
  noEjes: number
  noApoyos: number

  //* ************* */
  numeroEstructurasisOpen: boolean
  tipoEstructuraisOpen: boolean
  ejeisOpen: boolean
  ladoisOpen: boolean
  elementoEstructuraisOpen: boolean
  posicionisOpen: boolean
  disposicionisOpen: boolean
  calificacionisOpen: boolean

  tramoisOpen: boolean
  entronqueisOpen: boolean
  cuerpoisOpen: boolean
  carrilisOpen: boolean
  prioridadisOpen: boolean
  actuacionisOpen: boolean
  compuestaisOpen: boolean

  compuestaFilter: any[]
  newItem: boolean // indica si es elemento nuevo: true, o cagado desde bd: false
}

const breadcrumbs = [
  { label: 'Inicio', link: '/' },
  { label: 'Repositorio', link: null },
  { label: 'Desglose de mediciones', link: null },
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

interface Option {
  label: string
  value: string
  checked: boolean
}

const StructuresMeasurements = ({
  specialty,
  performanceCatalogByEsp: actuaciones,
  roadSection: tramo,
  highwayIntersection: entronque,
  slipLaneRoad: cuerpo,
  highwayLane: carril,
  priority: prioridad,
  compositeCatalogByEsp: compuestas,
  deteriorationTypeByEsp: deterioros,
  structureNumber: numeroEstructura,
  typology: tipoEstructura,
  axis: eje,
  side: lado,
  element: elemento,
  calification: calificacion,
  position,
  disposition,
}: Props) => {
  const params = useParams<{ projectId: string }>()
  const projectId = params && params.projectId ? params.projectId : '0'

  const searchParams = useSearchParams()
  const espId = searchParams ? searchParams.get('esp') : '0'

  const actionId = searchParams ? searchParams.get('actuacion') : '0'

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
  const [columns, setColumns] = useState<Column[]>(getStructuresColumns())
  const [modal, setModal] = useState(false)
  const [modalCadenamientoInicial, setModalCadenamientoInicial] =
    useStateCallback(false)
  const [modalCadenamientoFinal, setModalCadenamientoFinal] =
    useStateCallback(false)
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<Medicion>(getStructuresEmpty)

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
      getStructuresRows(
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

        numeroEstructura.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        tipoEstructura.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        eje.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        lado.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        elemento.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        position.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        disposition.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        calificacion.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
      ),
    [
      actuaciones,
      calificacion,
      carril,
      columns,
      compuestas,
      cuerpo,
      disposition,
      eje,
      elemento,
      entronque,
      lado,
      mediciones,
      numeroEstructura,
      position,
      prioridad,
      tipoEstructura,
      tramo,
    ],
  )

  const handleChange = useCallback(
    (changes: CellChange<any>[]) => {
      setMediciones((prevUnidades) =>
        applyStructuresChanges(changes, prevUnidades, getStructuresEmpty),
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

                compositeCatalogId: item.compuesta,
                mtPriorityId: item.prioridad,

                mtSpecialtyActionId: specialty.value,
                observation: item.observacion,
                initialNumber:
                  cadInicial.length > 1
                    ? Number(`${cadInicial[0]}${cadInicial[1]}`)
                    : Number(cadInicial[0]),
                finalNumber:
                  cadFinal.length > 1
                    ? Number(`${cadFinal[0]}${cadFinal[1]}`)
                    : Number(cadFinal[0]),

                thickness: item.espesor,
                width: item.ancho,
                ud: item.unidad,
                t: item.tonelada,
                l: item.litro,

                mtDeteriorationTypeIds: item.deterioros.map(
                  (item: any) => item.value,
                ),

                mtSideId: item.lado,
                mtStructureTypeId: item.tipoEstructura,
                mtElementId: item.elementoEstructura,
                mtCalificationId: item.calificacion,
                axisId: item.eje,
                mtStructureNumberId: item.numeroEstructuras,

                // roadAverage: item.anchoPromedioCalzada,
                // esviaje: item.esviaje,
                // jointWidth: item.anchoJunta,
                // elementsCount: item.numeroElementos,
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
        observacion: item.observation ? item.observation : '',
        actuacion: String(item.performanceCatalogId),
        compuesta: String(item.compositeCatalogId),
        ancho: item.width,
        area: item.area,
        espesor: item.thickness,
        volumen: item.volume,
        litro: 0,
        unidad: item.ud,
        tonelada: item.t,
        estudio: 0,

        numeroEstructuras: null,
        tipoEstructura: null,
        idGeneral: '',
        eje: null,
        lado: null,
        elementoEstructura: null,
        posicion: null,
        disposicion: null,
        calificacion: null,

        numeroEstructurasisOpen: false,
        tipoEstructuraisOpen: false,
        ejeisOpen: false,
        ladoisOpen: false,
        elementoEstructuraisOpen: false,
        posicionisOpen: false,
        disposicionisOpen: false,
        calificacionisOpen: false,

        // hay que borrar:
        anchoPromedioCalzada: 0,
        anchoJunta: 0,
        compuestaFilter: [],
        longitud: 0,
        numeroElementos: 0,
        // ---------
        anchoCalzada: item.roadAverage,
        esviaje: item.esviaje,
        coseno: item.coseno ? item.coseno : false,
        longitudCadaJunta: item.length,
        noElementos: item.elementsCount,
        longitudTotalJuntas: item.totalJointsLength,
        porcentajeAfectacion: item.affectePercentage,
        longitudJuntasAfectadas: item.affectedJointsLength,

        noEjes: item.numberAxles,
        noApoyos: item.supportCount,

        tramoisOpen: false,
        prioridadisOpen: false,
        entronqueisOpen: false,
        cuerpoisOpen: false,
        carrilisOpen: false,
        actuacionisOpen: false,
        compuestaisOpen: false,
        newItem: false,
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
        const updatedUnidadesSimples = moreStructuresRows(
          data.result.map(processUnidad),
          25,
        )
        setMediciones(updatedUnidadesSimples)
      } else {
        setMediciones(moreStructuresRows(getStructuresMediciones(), 25))
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
            title="Mediciones de pavimento"
            description="Repositorio de mediciones de pavimento"
          >
            <div className="flex items-center py-4">
              <div className="flex">
                <Button className="rounded-r-none" type="button">
                  Filtros
                </Button>
                <div className="relative w-full">
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="w-60 max-w-sm rounded-l-none"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="secondary"
                    className="absolute end-0 top-0 rounded-l-none"
                  >
                    <BiSearch size={16} />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="default" onClick={handleNewItem}>
              <FaPlus className="mr-2" size={14} />
              Nuevo
            </Button>
          </SpreadSheet.Header>
          <SpreadSheet.Body
            loading={isLoading}
            items={mediciones}
            rows={rows}
            columns={columns}
            emptyElement={getStructuresEmpty(mediciones.length + 1)}
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
      {modalNewItem ? (
        <ModalNewItem
          isModalOpen={modalNewItem}
          title={itemId === 0 ? 'Nueva medicion' : 'Actualizar medicion'}
          itemSelected={mediciones.find((item: Medicion) => item.id === itemId)}
          especialidad={specialty}
          tramos={tramo.map((item: any) => ({
            label: item.name,
            value: String(item.id),
            entronques: item.mtRoadSectionMtHighwayIntersections,
          }))}
          // entronques={
          //   entronqueRes !== undefined && entronqueRes.status === 200 ?
          //     entronqueRes.result.map((item: any) => ({ label: item.name, value: String(item.id) }))
          //       : []
          //   }
          gazas={cuerpo.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          carriles={carril.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          deterioros={deterioros.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          actuaciones={actuaciones.map((item) => ({
            label: item.performanceName,
            value: String(item.id),
            compuestas: item.compositeCatalogs.map((i) => ({
              label: i.compositeUdName,
              value: String(i.id),
              mtUnitOfMeasurementId: i.mtUnitOfMeasurementId,
            })),
          }))}
          // compuestas={
          //   compuestasRes !== undefined && compuestasRes.status === 200 ?
          //     compuestasRes.result.map((item: any) => ({ label: item.compositeUdName, value: String(item.id) }))
          //       : []
          // }
          prioridades={prioridad.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          numeroEstructuras={numeroEstructura.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          tipoEstructura={tipoEstructura.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          eje={eje.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          lado={lado.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          elementoEstructura={elemento.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          // posicion={
          //   elementoRes !== undefined && positionRes.status === 200 ?
          //   positionRes.result.map((item: any) => ({ label: item.name, value: item.id }))
          //       : []
          // }
          // disposicion={
          //   dispositionRes !== undefined && dispositionRes.status === 200 ?
          //   dispositionRes.result.map((item: any) => ({ label: item.name, value: item.id }))
          //       : []
          // }
          calificacion={calificacion.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
          onMutate={async (values: any) => {
            console.log(values)
            await mutate()
            if (itemId !== 0) {
              setModalNewItem(false)
            }

            let toastId
            try {
              const cadInicial = values.cadenamientoInicial.split('+')
              const cadFinal = values.cadenamientoFinal.split('+')

              toastId = toast.loading('Enviando... 🚀')
              console.log('cadenamientoInicial', cadInicial)
              // Submit data
              const value: any = {
                id: itemId,
                previousStudiesDate: values.fechaEstudioPrevio,
                mtRoadSectionId: values.tramo,
                mtHigwayIntersectionId: values.entronque,
                mtSlipLaneRoadId: values.gaza,
                mtHighwayLaneId: values.carril,
                performanceCatalogId: values.actuacion,

                compositeCatalogId: values.compuesta,
                mtPriorityId: values.prioridad,

                mtSpecialtyActionId: specialty.value,
                observation: values.observacion,
                initialNumber: values.cadenamientoInicial.replace('+', ''),
                finalNumber: values.cadenamientoFinal.replace('+', ''),

                thickness: values.espesor,
                width: values.ancho,
                ud: values.unidad,
                t: values.tonelada,
                l: values.litro,

                mtDeteriorationTypeIds: values.deterioros.map(
                  (item: any) => item.value,
                ),

                mtSideId: values.lado,
                mtStructureTypeId: values.tipoEstructura,
                mtElementId: values.elementoEstructura,
                mtCalificationId: values.calificacion,
                axisId: values.eje,
                mtStructureNumberId: values.numeroEstructuras,

                jointWidth: values.anchoJunta,

                roadAverage: values.anchoCalzada,
                esviaje: values.esviaje,
                coseno: values.coseno,
                length: values.longitudJunta,
                elementsCount: values.noElementos,
                totalJointsLength: values.longitudTotalJuntas,
                affectePercentage: values.porcentajeAfectacion,
                affectedJointsLength: values.longitudJuntasAfectadas,

                numberAxles: values.noEjes,
                supportCount: values.noApoyos,

                alternativeUnitMeasurementValue:
                  values.alternativeUnitMeasurementValue,
              }

              let result: any = null

              if (itemId === 0) result = await trigger(value)
              else {
                result = await fetch(
                  `${process.env.API_URL}/MeasurementTab/Update/${itemId}`,
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
                toast.error(`No se puede enviar. ${result.errorMessage}😱`, {
                  id: toastId,
                })
              }

              await mutate()
              if (itemId !== 0) {
                setModalNewItem(false)
              }
            } catch (e) {
              toast.error(
                `No se puede enviar. Error en el servidor. Consulte a servicios 😱`,
                { id: toastId },
              )
            }
          }}
          onClose={() => setModalNewItem(false)}
        />
      ) : null}
      {modalDetail ? (
        <ModalDetail
          isModalOpen={modalDetail}
          title="Detalles de medicion"
          itemSelected={mediciones.find((item: Medicion) => item.id === itemId)}
          especialidad={specialty}
          tramos={tramo.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          entronques={entronque.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          gazas={cuerpo.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          carriles={carril.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          // deterioros={
          //   deteriorosRes !== undefined && deteriorosRes.status === 200 ?
          //     deteriorosRes.result.map((item: any) => ({ label: item.name, value: String(item.id) }))
          //       : []
          // }
          actuaciones={actuaciones.map((item: any) => ({
            label: item.performanceName,
            value: String(item.id),
          }))}
          compuestas={compuestas.map((item: any) => ({
            label: item.compositeUdName,
            value: String(item.id),
          }))}
          prioridades={prioridad.map((item: any) => ({
            label: item.name,
            value: String(item.id),
          }))}
          onClose={() => setModalDetail(false)}
        />
      ) : null}
      {modal ? (
        <ModalDeteriorosParaSpreadsheet
          title="Deterioros"
          options={deterioros.map((item: any) => ({
            label: item.name,
            value: item.id,
            code: item.code,
            subcategoria: item.mtActionSubCategory,
            especialidad: item.mtSpecialtyAction,
          }))}
          deterioros={item.deterioros}
          onChange={(values: any[]) => {
            setMediciones([
              ...mediciones.map((medicion: Medicion) => ({
                ...medicion,
                deterioros:
                  medicion.idauto === item.idauto
                    ? values
                    : medicion.deterioros,
              })),
            ])
          }}
          onClose={() => setModal(!modal)}
          isModalOpen={modal}
        />
      ) : null}
      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar unidad`}
          mensaje={`¿Estás seguro de que deseas eliminar esta unidad medición de la lista? `}
          onClose={() => setModalDelete(false)}
          onDelete={async () => {
            let toastId
            try {
              if (deleteItem > 0) {
                toastId = toast.loading('Eliminando de lista... 🚀')
                await fetch(
                  `${process.env.API_URL}/MeasurementTab/ChangeDisabledStatus/${deleteItem}`,
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
      {modalCadenamientoInicial ? (
        <ModalInputMask
          title={'Adicionar cadenamiento Inicial'}
          label={''}
          buttonText={'Guardar'}
          isModalOpen={modalCadenamientoInicial}
          inputValue={item.cadenamientoInicial}
          onClose={() => setModalCadenamientoInicial(false)}
          onChange={(value: string) => {
            console.log(value)
            setMediciones([
              ...mediciones.map((medicion: Medicion) => ({
                ...medicion,
                cadenamientoInicial:
                  medicion.idauto === item.idauto
                    ? value
                    : medicion.cadenamientoInicial,
              })),
            ])

            setModalCadenamientoInicial(false)
          }}
        />
      ) : null}
      {modalCadenamientoFinal ? (
        <ModalInputMask
          title={'Adicionar cadenamiento final'}
          label={''}
          buttonText={'Guardar'}
          isModalOpen={modalCadenamientoFinal}
          inputValue={item.cadenamientoFinal}
          onClose={() => setModalCadenamientoFinal(false)}
          onChange={(value: string) => {
            console.log(value)
            setMediciones([
              ...mediciones.map((medicion: Medicion) => ({
                ...medicion,
                cadenamientoFinal:
                  medicion.idauto === item.idauto
                    ? value
                    : medicion.cadenamientoFinal,
              })),
            ])

            setModalCadenamientoFinal(false)
          }}
        />
      ) : null}
    </section>
  )
}

export default StructuresMeasurements
