import { cache } from 'react'

import fetcher from './fetcher'
import {
  CompositeCatalog,
  MtRoadSection,
  SimpleCatalog,
  SpecialtyAction,
} from './useGetRepositories'

export interface SubcategoryActionsGetDropdownItems {
  disabled: boolean
  group?: any
  selected: boolean
  text: string
  value: string
}

interface MtHighwayIntersectionMtSlipLaneRoad {
  mtSlipLaneRoad: string
  mtHighwayIntersection: string
  mtRoadSection?: any
  highDate: string
  lowDate: string
  modificationDate: string
  state: boolean
  mtSlipLaneRoadId: number
  mtHighwayIntersectionId: number
  mtRoadSectionId: number
  id: number
  disabled: boolean
}

export interface MtHighwayIntersection {
  mtHighwayIntersectionMtHighwayRoads: any[]
  mtHighwayIntersectionMtSlipLaneRoads: MtHighwayIntersectionMtSlipLaneRoad[]
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtSlipLaneRoad {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtHighwayLane {
  name: string
  id: number
  disabled: boolean
}

export interface MtPriority {
  name: string
  id: number
  disabled: boolean
}

export interface PerformanceCatalogByEsp {
  fileNumberId: string
  performanceId: string
  projectTask: string
  mtProjectCategory: string
  mtActionCategory: string
  mtSubCategoryAction: string
  mtRoadSection: string
  mtUnitOfMeasurement: string
  measurementTab?: any
  mtScopeOfAction: string
  mrPerformanceIndicator?: string
  mtSpecialtyAction: string
  compositeCatalogs: CompositeCatalog[]
  mtAccidentRoadSections: any[]
  projectTaskId: number
  mtProjectCategoryId: number
  mtActionCategoryId: number
  fileNumber: string
  performanceNumber: string
  deferred: boolean
  performanceName: string
  sapId: string
  mtRoadSectionId: number
  sustainability: boolean
  pra: boolean
  mtUnitOfMeasurementId: number
  measurementTabId?: any
  mtScopeOfActionId: number
  mrPerformanceIndicatorId?: number
  status: number
  mtSpecialtyActionId: number
  id: number
  disabled: boolean
}

export interface CompositeCatalogByEsp {
  mtUnitOfMeasurement: string
  mtSpecialtyAction: string
  mtSubCategoryAction: string
  mtSubCategoryActionId: string
  simpleCatalogs: SimpleCatalog[]
  compositeUdId: string
  count: string
  compositeUdName: string
  description: string
  mtUnitOfMeasurementId: number
  mtSpecialtyActionId: number
  sapId: string
  code: string
  id: number
  disabled: boolean
}

export interface MtDeteriorationTypeByEsp {
  mtSpecialtyAction: string
  mtActionSubCategory: string
  mtActionSubCategoryId: number
  mtSpecialtyActionId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtStructureNumber {
  code: any
  name: string
  id: number
  disabled: boolean
}

export interface MtTypology {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtAxis {
  name: string
  id: number
  disabled: boolean
}

export interface MtSide {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtElement {
  name: string
  id: number
  disabled: boolean
}

export interface MtCalification {
  name: string
  id: number
  disabled: boolean
}

export interface MtPosition {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtDisposition {
  code: string
  name: string
  id: number
  disabled: boolean
}

interface Response<T> {
  status: number
  result: T[]
  errorMessage?: any
}

// const { data: compuestasRes } = useSWR(`${process.env.API_URL}/CompositeCatalog/GetBySpecialty/${esp}`, fetcher)
// const { data: deteriorosRes } = useSWR(router.isReady ? `${process.env.API_URL}/MtDeteriorationType/GetBySpecialty/${esp}` : null, fetcher)

// tramo = roadsection
// highwayIntersectionRes = entronqueRes
// slipLaneRoad = cuerpoRes
// highwayLane = carrilRes
// priorityRes = prioridadRes
// performanceCatalog = actuacionesRes

// const { data: numeroEstructuraRes } = useSWR(`${process.env.API_URL}/MtStructureNumber/GetAll`, fetcher) ok
// const { data: tipoEstructuraRes } = useSWR(`${process.env.API_URL}/MtTypology/GetAll`, fetcher) ok
// const { data: ejeRes } = useSWR(`${process.env.API_URL}/MtAxis/GetAll`, fetcher) ok
// const { data: ladoRes } = useSWR(`${process.env.API_URL}/MtSide/GetAll`, fetcher) ok
// const { data: elementoRes } = useSWR(`${process.env.API_URL}/MtElement/GetAll`, fetcher) ok
// const { data: calificacionRes } = useSWR(`${process.env.API_URL}/MtCalification/GetAll`, fetcher)
// const { data: positionRes } = useSWR(`${process.env.API_URL}/MtPosition/GetAll`, fetcher)
// const { data: dispositionRes } = useSWR(`${process.env.API_URL}/MtDisposition/GetAll`, fetcher)
export const getRepositoriesForMeasurements = cache(
  async (esp: number, action: number) => {
    try {
      const [
        subcatRes,
        roadSectionRes,
        espRes,
        highwayIntersectionRes,
        slipLaneRoadRes,
        highwayLaneRes,
        priorityRes,
        performanceCatalogByEspRes,
        compositeCatalogByEspRes,
        deteriorationTypeByEspRes,
        structureNumberRes,
        typologyRes,
        axisRes,
        sideRes,
        elementRes,
        calificationRes,
        positionRes,
        dispositionRes,
      ] = await Promise.all([
        fetcher(
          `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
        ) as Promise<Response<SubcategoryActionsGetDropdownItems>>,
        fetcher(`${process.env.API_URL}/MtRoadSection/GetAll`) as Promise<
          Response<MtRoadSection>
        >,
        fetcher(`${process.env.API_URL}/MtSpecialtyAction/GetAll`) as Promise<
          Response<SpecialtyAction>
        >,
        fetcher(
          `${process.env.API_URL}/MtHighwayIntersection/GetAll`,
        ) as Promise<Response<MtHighwayIntersection>>,
        fetcher(`${process.env.API_URL}/MtSlipLaneRoad/GetAll`) as Promise<
          Response<MtSlipLaneRoad>
        >,
        fetcher(`${process.env.API_URL}/MtHighwayLane/GetAll`) as Promise<
          Response<MtHighwayLane>
        >,
        fetcher(`${process.env.API_URL}/MtPriority/GetAll`) as Promise<
          Response<MtPriority>
        >,
        fetcher(
          `${process.env.API_URL}/PerformanceCatalog/GetBySpecialtyAndTask?specialityId=${esp}&projectTaskId=${action}`,
        ) as Promise<Response<PerformanceCatalogByEsp>>,
        fetcher(
          `${process.env.API_URL}/CompositeCatalog/GetBySpecialty/${esp}`,
        ) as Promise<Response<CompositeCatalogByEsp>>,
        fetcher(
          `${process.env.API_URL}/MtDeteriorationType/GetBySpecialty/${esp}`,
        ) as Promise<Response<MtDeteriorationTypeByEsp>>,
        fetcher(`${process.env.API_URL}/MtStructureNumber/GetAll`) as Promise<
          Response<MtStructureNumber>
        >,
        fetcher(`${process.env.API_URL}/MtTypology/GetAll`) as Promise<
          Response<MtTypology>
        >,
        fetcher(`${process.env.API_URL}/MtAxis/GetAll`) as Promise<
          Response<MtAxis>
        >,
        fetcher(`${process.env.API_URL}/MtSide/GetAll`) as Promise<
          Response<MtSide>
        >,
        fetcher(`${process.env.API_URL}/MtElement/GetAll`) as Promise<
          Response<MtElement>
        >,
        fetcher(`${process.env.API_URL}/MtCalification/GetAll`) as Promise<
          Response<MtCalification>
        >,
        fetcher(`${process.env.API_URL}/MtPosition/GetAll`) as Promise<
          Response<MtPosition>
        >,
        fetcher(`${process.env.API_URL}/MtDisposition/GetAll`) as Promise<
          Response<MtDisposition>
        >,
      ])

      return {
        subcatRes,
        roadSectionRes,
        espRes,
        highwayIntersectionRes,
        slipLaneRoadRes,
        highwayLaneRes,
        priorityRes,
        performanceCatalogByEspRes,
        compositeCatalogByEspRes,
        deteriorationTypeByEspRes,
        structureNumberRes,
        typologyRes,
        axisRes,
        sideRes,
        elementRes,
        calificationRes,
        positionRes,
        dispositionRes,
      }
    } catch (error) {
      console.log(error)
      throw new Error('Error')
    }
  },
)
