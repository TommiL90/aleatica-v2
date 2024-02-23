import { cache } from 'react'

import fetcher from './fetcher'
import { MtRoadSection, SpecialtyAction } from './useGetRepositories'

interface SubcategoryActionsGetDropdownItems {
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

interface MtHighwayIntersection {
  mtHighwayIntersectionMtHighwayRoads: any[]
  mtHighwayIntersectionMtSlipLaneRoads: MtHighwayIntersectionMtSlipLaneRoad[]
  code: string
  name: string
  id: number
  disabled: boolean
}

interface MtSlipLaneRoad {
  code: string
  name: string
  id: number
  disabled: boolean
}

interface MtHighwayLane {
  name: string
  id: number
  disabled: boolean
}

interface MtPriority {
  name: string
  id: number
  disabled: boolean
}

interface CompositeCatalog {
  mtUnitOfMeasurement?: any
  mtSpecialtyAction?: any
  mtSubCategoryAction?: any
  mtSubCategoryActionId: string
  simpleCatalogs: any[]
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

interface PerformanceCatalogByEsp {
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

interface SimpleCatalog {
  simpleUdId: string
  count: number
  mtUnitOfMeasurement?: any
  mtSpecialtyAction: string
  mtSubCategoryAction?: any
  mtSubspecialityName?: any
  mtSubspecialityRoute?: any
  mtSubCategoryActionId: string
  code: string
  simpleUdName: string
  description: string
  mtUnitOfMeasurementId: number
  mtSpecialtyActionId: number
  mtSubspecialityId: number
  accountantConcept: string
  sapId: string
  global: boolean
  id: number
  disabled: boolean
}

interface CompositeCatalogByEsp {
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

interface MtDeteriorationTypeByEsp {
  mtSpecialtyAction: string
  mtActionSubCategory: string
  mtActionSubCategoryId: number
  mtSpecialtyActionId: number
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
export const getRepositoriesForMeasurements = cache(async (esp: number) => {
  try {
    const [
      subcatRes,
      roadSectionRes,
      espRes,
      highwayIntersectionRes,
      slipLaneRoad,
      highwayLane,
      priorityRes,
      performanceCatalogByEspRes,
      compositeCatalogByEspRes,
      deteriorationTypeByEsp,
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
      fetcher(`${process.env.API_URL}/MtHighwayIntersection/GetAll`) as Promise<
        Response<MtHighwayIntersection>
      >,
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
        `${process.env.API_URL}/PerformanceCatalog/GetBySpecialtyAndTask?specialityId=${esp}`,
      ) as Promise<Response<PerformanceCatalogByEsp>>,
      fetcher(
        `${process.env.API_URL}/CompositeCatalog/GetBySpecialty/${esp}`,
      ) as Promise<Response<CompositeCatalogByEsp>>,
      fetcher(
        `${process.env.API_URL}/MtDeteriorationType/GetBySpecialty/${esp}`,
      ) as Promise<Response<MtDeteriorationTypeByEsp>>,
    ])

    return {
      subcatRes,
      roadSectionRes,
      espRes,
      highwayIntersectionRes,
      slipLaneRoad,
      highwayLane,
      priorityRes,
      performanceCatalogByEspRes,
      compositeCatalogByEspRes,
      deteriorationTypeByEsp,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error')
  }
})
