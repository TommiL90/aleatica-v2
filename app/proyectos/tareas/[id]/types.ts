export interface Responsible {
  rols: any[]
  department: any
  departmentPosition: any
  mtBusinessUnit: any
  mtBusinessUnitId: number
  userName: string
  email: string
  profileName: string
  phoneNumber: string
  officePhoneNumber: any
  state: boolean
  departmentId: number
  departmentPositionId: number
  id: number
  disabled: boolean
}

export interface SimpleCatalog {
  simpleUdId: string
  count: number
  mtUnitOfMeasurement: any
  mtSpecialtyAction: any
  mtSubCategoryAction: any
  mtSubspecialityName: any
  mtSubspecialityRoute: any
  mtSubCategoryActionId: string
  code: string
  simpleUdName: string
  description: string
  mtUnitOfMeasurementId: number
  mtSpecialtyActionId: number
  mtSubspecialityId?: number
  accountantConcept: string
  sapId: string
  global: boolean
  id: number
  disabled: boolean
}

export interface ResponsiblesForApproving {
  rols: any[]
  department: any
  departmentPosition: any
  mtBusinessUnit: any
  mtBusinessUnitId: number
  userName: string
  email: string
  profileName: string
  phoneNumber: string
  officePhoneNumber: any
  state: boolean
  departmentId: number
  departmentPositionId: number
  id: number
  disabled: boolean
}

export interface User {
  rols: any[]
  department: any
  departmentPosition: any
  mtBusinessUnit: any
  mtBusinessUnitId: number
  userName: string
  email: string
  profileName: string
  phoneNumber: string
  officePhoneNumber: any
  state: boolean
  departmentId: number
  departmentPositionId: number
  id: number
  disabled: boolean
}

export interface ProjectTask {
  project: string
  mtSpecialtyAction: any
  mtProcessForm: any
  days: number
  status: string
  enable: boolean
  user: User
  responsiblesForApproving: ResponsiblesForApproving[]
  simpleCatalogs: SimpleCatalog[]
  compositeCatalogs: any[]
  projectId: number
  mtSpecialtyActionId: number
  mtProcessFormId: number
  userId: number
  startDate: string
  endDate: string
  dependency: boolean
  needAdvisors: boolean
  id: number
  disabled: boolean
}

export interface Project {
  mtBusinessUnit: string
  mtYear: string
  code: string
  version: string
  type: string
  projectTasks: ProjectTask[]
  responsibles: Responsible[]
  name: string
  description: string
  conclusion: any
  mtBusinessUnitId: number
  status: number
  mtYearId: number
  id: number
  disabled: boolean
}

export interface ProjectTaskInfo {
  id: number
  mtSpecialtyActionName: string
  taskName: string
  processFormId: number
  enable: boolean
}

export interface ProjectTaskGroupInfo {
  mtSubCategoryActionId: number
  mtSpecialtyActionId: number
  projectTaskInfos: ProjectTaskInfo[]
}

export interface MtSubCategory {
  code: string
  name: string
  id: number
  disabled: boolean
}

export interface TasksAndSubCategories {
  mtSubCategories: MtSubCategory[]
  projectTaskGroupInfos: ProjectTaskGroupInfo[]
}
