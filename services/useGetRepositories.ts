import { cache } from 'react'

import fetcher from './fetcher'
import { getErrorMessage } from '@/utils/handleErrors'

export interface SimpleCatalog {
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
  mtSubspecialityId?: number | any
  accountantConcept: string
  sapId: string
  global: boolean
  id: number
  disabled: boolean
}
export interface CompositeCatalog {
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

export interface Tca {
  mtRoadSection: string
  mtHighwayIntersection: string
  mtSlipLaneRoad: string
  mtBusinessUnitId: number
  description: string
  mtRoadSectionId: number
  mtHighwayIntersectionId: number
  mtSlipLaneRoadId: number
  initialNumber: number
  endNumber: number
  name: string
  id: number
  disabled: boolean
}

export interface SubCategory {
  disabled: boolean
  group?: any
  selected: boolean
  text: string
  value: string
}

export interface SpecialtyAction {
  mtSubCategoryAction: string
  mtSubCategoryActionId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface ProjectCategory {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface ActionCategory {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface AccidentRoadSection {
  mtRoadSection: string
  mtHighwayIntersection: string
  mtSlipLaneRoad: string
  mtBusinessUnitId: number
  description: string
  mtRoadSectionId: number
  mtHighwayIntersectionId: number
  mtSlipLaneRoadId: number
  initialNumber: number
  endNumber: number
  name: string
  id: number
  disabled: boolean
}

export interface HighwayIntersectionMtSlipLaneRoad {
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

export interface RoadSectionMtHighwayIntersection {
  mtRoadSection: string
  mtHighwayIntersection: string
  mtHighwayIntersectionMtSlipLaneRoadDto: HighwayIntersectionMtSlipLaneRoad[]
  highDate: string
  lowDate: string
  modificationDate: string
  state: boolean
  mtRoadSectionId: number
  mtHighwayIntersectionId: number
  id: number
  disabled: boolean
}

export interface MtRoadSection {
  mtBusinessUnit: string
  mtRoadSectionMtHighwayIntersections: RoadSectionMtHighwayIntersection[]
  highDate: string
  lowDate: string
  modificationDate: string
  state: boolean
  mtBusinessUnitId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface UnitOfMeasurement {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface ScopeOfAction {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface PerformanceIndicator {
  mtBusinessUnit: string
  mtSpecialtyAction: string
  mtActionSubCategory: string
  mtActionSubCategoryId: number
  mtBusinessUnitId: number
  mtSpecialtyActionId: number
  name: string
  id: number
  disabled: boolean
}

interface Children {
  mtSpecialtyAction?: any
  father: string
  route?: any
  childrens: any[]
  mtSubCategoryActionId: number
  mtSubCategoryAction?: any
  mtSpecialtyActionId: number
  fatherId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface Subspeciality {
  mtSpecialtyAction: string
  father?: string
  route: string
  childrens: Children[]
  mtSubCategoryActionId: number
  mtSubCategoryAction: string
  mtSpecialtyActionId: number
  fatherId?: number
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

export const getRepositories = cache(async () => {
  let test
  try {
    const [
      uocRes,
      tcaRes,
      subCat,
      espRes,
      projectCategoryRes,
      actionCategoryRes,
      roadSectionRes,
      unitMeasurementRes,
      scopeActionRes,
      mRPerformanceRes,
      subEspRes,
    ] = await Promise.all([
      fetcher(`${process.env.API_URL}/CompositeCatalog/GetAll`) as Promise<
        Response<CompositeCatalog>
      >,
      fetcher(`${process.env.API_URL}/MtAccidentRoadSection/GetAll`) as Promise<
        Response<Tca>
      >,
      fetcher(
        `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
      ) as Promise<Response<SubCategory>>,
      fetcher(`${process.env.API_URL}/MtSpecialtyAction/GetAll`) as Promise<
        Response<SpecialtyAction>
      >,
      fetcher(`${process.env.API_URL}/MtProjectCategory/GetAll`) as Promise<
        Response<ProjectCategory>
      >,
      fetcher(`${process.env.API_URL}/MtActionCategory/GetAll`) as Promise<
        Response<ActionCategory>
      >,
      fetcher(`${process.env.API_URL}/MtRoadSection/GetAll`) as Promise<
        Response<MtRoadSection>
      >,
      fetcher(`${process.env.API_URL}/MtUnitOfMeasurement/GetAll`) as Promise<
        Response<UnitOfMeasurement>
      >,
      fetcher(`${process.env.API_URL}/MtScopeOfAction/GetAll`) as Promise<
        Response<ScopeOfAction>
      >,
      fetcher(
        `${process.env.API_URL}/MRPerformanceIndicator/GetAll`,
      ) as Promise<Response<PerformanceIndicator>>,
      fetcher(`${process.env.API_URL}/MtSubspeciality/GetAll`) as Promise<
        Response<Subspeciality>
      >,
    ])

    return {
      uocRes,
      tcaRes,
      subCat,
      espRes,
      projectCategoryRes,
      actionCategoryRes,
      roadSectionRes,
      unitMeasurementRes,
      scopeActionRes,
      mRPerformanceRes,
      subEspRes,
    }
  } catch (error) {
    console.log(getErrorMessage(error))
    throw new Error('Error')
  }
})
