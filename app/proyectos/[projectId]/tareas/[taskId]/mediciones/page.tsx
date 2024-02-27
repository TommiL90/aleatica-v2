import RoadSurfacesMeasurements from '@/components/measuraments/road-surfaces-measurements'
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
  getRepositoriesForMeasurements,
} from '@/services/get-repositories-for-measurements'
import { MtRoadSection, SpecialtyAction } from '@/services/useGetRepositories'
import { DataResponse } from '@/types/data-response'
import React, { Suspense } from 'react'

//   searchParams?: { [key: string]: string | string[] | undefined }

interface searchParams {
  esp: string
  actuacion: string
}
interface Props {
  params: { slug: string }
  searchParams: searchParams
}

export interface Specialty {
  label: string
  value: number
}

const MeasurementsPage = async ({ params, searchParams }: Props) => {
  const { esp, actuacion } = searchParams
  const {
    subcatRes,
    espRes,
    roadSectionRes,
    highwayIntersectionRes,
    slipLaneRoadRes,
    highwayLaneRes,
    priorityRes,
    performanceCatalogByEspRes,
    compositeCatalogByEspRes,
    deteriorationTypeByEspRes,
  } = await getRepositoriesForMeasurements(Number(esp), Number(actuacion))
  const data: DataResponse<SpecialtyAction> = await fetcher(
    `${process.env.API_URL}/MtSpecialtyAction/FindById/${esp}`,
  )
  const { result } = data
  const specialty = { label: result.name, value: result.id }

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      {result.mtSubCategoryActionId === 2 && (
        <RoadSurfacesMeasurements
          specialty={specialty}
          subcat={subcatRes.result}
          esp={espRes.result}
          roadSection={roadSectionRes.result}
          highwayIntersection={highwayIntersectionRes.result}
          slipLaneRoad={slipLaneRoadRes.result}
          highwayLane={highwayLaneRes.result}
          priority={priorityRes.result}
          performanceCatalogByEsp={performanceCatalogByEspRes.result}
          compositeCatalogByEsp={compositeCatalogByEspRes.result}
          deteriorationTypeByEsp={deteriorationTypeByEspRes.result}
        />
      )}
    </Suspense>
  )
}

export default MeasurementsPage

// subcatRes: SubcategoryActionsGetDropdownItems[],
// espRes: SpecialtyAction[],
// roadSectionRes: MtRoadSection[],
// highwayIntersectionRes: MtHighwayIntersection[],
// slipLaneRoad: MtSlipLaneRoad[],
// highwayLane: MtHighwayLane[],
// priorityRes: MtPriority[],
// performanceCatalogByEspRes: PerformanceCatalogByEsp[],
// compositeCatalogByEspRes: CompositeCatalogByEsp[],
// deteriorationTypeByEsp: MtDeteriorationTypeByEsp[],
