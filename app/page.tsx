import React from "react"
import api from "@/services/api"
import fetcher from "@/services/fetcher"

const getSpecialty = async (specialtyId: number) => {
  const specialty = await fetcher(
    `${process.env.API_URL}/MtSpecialtyAction/FindById/${specialtyId}`
  )

  return specialty.result
}

// tramo = roadsection
// highwayIntersectionRes = entronqueRes
// slipLaneRoad = cuerpoRes
// highwayLane = carrilRes
// priorityRes = prioridadRes
// performanceCatalog = actuacionesRes
const IndexPage = async () => {
  /////////
  return <div>Dashboard</div>
}

export default IndexPage
