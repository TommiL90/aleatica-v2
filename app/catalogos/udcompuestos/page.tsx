import React from 'react'
import fetcher from '@/services/fetcher'
import { SimpleCatalog, getRepositories } from '@/services/useGetRepositories'

import { DataResponse } from '@/types/data-response'

import CompostCatalogTable from './compost-catalog-table'

const CompostCatalogPage = async () => {
  const simpleCatalogRes: DataResponse<SimpleCatalog[]> = await fetcher(
    `${process.env.API_URL}/SimpleCatalog/GetAll`,
  )
  const { subEspRes, espRes, subCat, unitMeasurementRes } =
    await getRepositories()

  return (
    <div>
      <CompostCatalogTable
        subEsp={subEspRes.result}
        esp={espRes.result}
        subCat={subCat.result}
        unitMeasurement={unitMeasurementRes.result}
        simpleCatalog={simpleCatalogRes.result}
      />
    </div>
  )
}

export default CompostCatalogPage
