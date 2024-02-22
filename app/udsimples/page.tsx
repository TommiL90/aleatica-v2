import React from "react"
import { getRepositories } from "@/services/useGetRepositories"

import TableUdSimple from "./simple-catalog"



const SimpleCatalogPage = async () => {
  const { subEspRes, espRes, subCat, unitMeasurementRes } =
    await getRepositories()

  return (
    <div>
      <TableUdSimple
        subEsp={subEspRes.result}
        esp={espRes.result}
        subCat={subCat.result}
        unitMeasurement={unitMeasurementRes.result}
      />
    </div>
  )
}

export default SimpleCatalogPage
