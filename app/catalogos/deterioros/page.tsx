import React from 'react'
import { getRepositories } from '@/services/useGetRepositories'

import DepreciationTable from './depreciation-table'

const DepreciationCatalogPage = async () => {
  const { espRes, subCat } = await getRepositories()

  return (
    <div>
      <DepreciationTable esp={espRes.result} subCat={subCat.result} />
    </div>
  )
}

export default DepreciationCatalogPage
