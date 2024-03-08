export interface MtDeteriorationType {
  mtSpecialtyAction: any
  mtActionSubCategory: any
  mtActionSubCategoryId: number
  mtSpecialtyActionId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MesurementBySpecialty {
  km: number
  m: number
  distanceToNext: number
  km2: number
  m4: number
  o: number
  distanceToPreviousCd: number
  intervetionIdLocation: string
  eje: number
  elementCode: string
  projectTask: string
  mtRoadSection: string
  mtHigwayIntersection: string
  mtSlipLaneRoad: string
  mtHighwayLane: string
  performanceCatalog: string
  mtSide: any
  mtStructureType: any
  mtElement: any
  mtCalification: any
  axis: any
  mtStructureNumber: any
  compositeCatalog: string
  mtPriority: string
  mtTypology: any
  mtDisposition: any
  mtPosition: any
  mtSpecialtyAction: string
  mtBusinessUnit: string
  mtSubCategoryAction: string
  supportCount: number
  affectedJointsLength: number
  totalJointsLength: number
  totalArea: number
  affectedLength: number
  mtDeteriorationTypes: MtDeteriorationType[]
  previousStudiesDate: string
  mtRoadSectionId: number
  mtHigwayIntersectionId: number
  mtSlipLaneRoadId: number
  mtHighwayLaneId: number
  performanceCatalogId: number
  mtSideId: any
  mtStructureTypeId: any
  mtElementId: any
  mtCalificationId: any
  axisId: any
  mtStructureNumberId: any
  compositeCatalogId: number
  mtPriorityId: number
  mtTypologyId: any
  mtDispositionId: any
  mtPositionId: any
  mtSpecialtyActionId: number
  observation: any
  initialNumber: string
  finalNumber: string
  manualWidth: string
  roadAverage: number
  esviaje: number
  jointWidth: string
  elementsCount: number
  study: number
  width: number
  thickness: number
  idGeneral: string
  length: number
  area: number
  volume: number
  ud: number
  t: number
  l: number
  density: number
  affectePercentage: number
  supportsAffectedCount: number
  cosForCalculate: boolean
  alternativeUnitMeasurementValue: number
  numberAxles: number
  elementArea: number
  id: number
  disabled: boolean
  coseno?: boolean
}
