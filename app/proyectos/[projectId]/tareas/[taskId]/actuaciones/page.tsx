import React from 'react'
import { getRepositories } from '@/services/useGetRepositories'
import ActionsTable from './actions-table'

interface Params {
  projectId: string
  taskId: string
  slugs: string[]
}

interface Props {
  params: Params
}

const ActionsCatalogPage = async () => {
  //  uocRes es CompositeCatalog
  // tcaRes es MtAccidentRoadSection y es igual a accidentRoadSectionnRes
  // MRPerformanceRes es MRRes
  const {
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
  } = await getRepositories()

  return (
    <div>
      <ActionsTable
        uoc={uocRes.result}
        tca={tcaRes.result}
        subCat={subCat.result}
        esp={espRes.result}
        projectCategory={projectCategoryRes.result}
        actionCategory={actionCategoryRes.result}
        roadSection={roadSectionRes.result}
        unitMeasurement={unitMeasurementRes.result}
        scopeAction={scopeActionRes.result}
        mRPerformance={mRPerformanceRes.result}
      />
    </div>
  )
}

export default ActionsCatalogPage
