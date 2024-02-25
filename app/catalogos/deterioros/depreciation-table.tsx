import { SpecialtyAction, SubCategory } from '@/services/useGetRepositories'
import React from 'react'

interface DepreciationCatalogTableProps {
  esp: SpecialtyAction[]
  subCat: SubCategory[]
}
const DepreciationTable = ({ esp, subCat }: DepreciationCatalogTableProps) => {
  return <div>DepreciationTable</div>
}

export default DepreciationTable
