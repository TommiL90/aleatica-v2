export interface SimpleCatalogsData {
  simpleUdId: string
  count: number
  mtUnitOfMeasurement: string
  mtSpecialtyAction: string
  mtSubCategoryAction: string
  mtSubspecialityName: string
  mtSubspecialityRoute?: any
  mtSubCategoryActionId: string
  code: string
  simpleUdName: string
  description?: any
  mtUnitOfMeasurementId: number
  mtSpecialtyActionId: number
  mtSubspecialityId: number
  accountantConcept?: any
  sapId: string
  global: boolean
  id: number
}

export interface SimpleCatalogsResponse {
  currentPage: number
  pageCount: number
  pageSize: number
  recordCount: number
  results: SimpleCatalogsData[]
}

export interface DataResponse<T> {
  status: number
  result: T
  errorMessage?: any
}

export interface SimpleUd {
  idauto: number
  id: number
  idUnidad: string
  nombreUnidadSimple: string
  descripcionUnidadSimple: string
  counter: string
  global: boolean
  unidadObra: any
  subCategoria: any
  especialidad: any
  sap: string
  subEspecialidad: any
  unidadObraisOpen: boolean
  subcategoriaisOpen: boolean
  especialidadisOpen: boolean
  especialidadesFilter: any[]
  newItem: boolean // indica si es elemento nuevo: true, o cagado desde bd: false
}

export interface ChildrenSubSpecialty {
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

export interface SubSpecialty {
  mtSpecialtyAction: string
  father?: string
  route: string
  childrens: ChildrenSubSpecialty[]
  mtSubCategoryActionId: number
  mtSubCategoryAction: string
  mtSpecialtyActionId: number
  fatherId?: number
  code: string
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

export interface MtUnitOfMeasurement {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface MtSpecialtyAction {
  mtSubCategoryAction: string
  mtSubCategoryActionId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface SimpleCatalogCreate {
  disabled: boolean
  simpleUdName: string
  description: string
  mtUnitOfMeasurementId: number
  mtSpecialtyActionId: number
  mtSubspecialityId: number
  accountantConcept: string
  sapId: string
  global: boolean
}
