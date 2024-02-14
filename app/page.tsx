import React from "react"
import api from "@/services/api"
import fetcher from "@/services/fetcher"
import { getRepositoriesForMeasurements } from "@/services/get-repositories-for-measurements"

import { NewRoadSurfaceMeasurementModal } from "./new-measurament-modal"

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
  const esp = 28
  const projectId = 134
  const specialtyRes = await getSpecialty(esp)
  const especialidad = { label: specialtyRes.name, value: specialtyRes.id }
  let projectTaskId: string
  try {
    const response = await api.get(
      `${process.env.API_URL}/MeasurementTab/GetBySpecialty?specialityId=${esp}&projectId=${projectId}`
    )
    projectTaskId = response.data.result[0].projectTask
  } catch (error) {
    console.log(error)
  }
  const {
    subcatRes,
    compositeCatalogByEspRes,
    deteriorationTypeByEsp,
    espRes,
    highwayIntersectionRes,
    highwayLane,
    performanceCatalogByEspRes,
    priorityRes,
    roadSectionRes,
    slipLaneRoad,
  } = await getRepositoriesForMeasurements(28)

  const tramos = roadSectionRes.result.map((item) => ({
    label: item.name,
    value: item.id,
    highwayIntersections: item.mtRoadSectionMtHighwayIntersections,
  }))
  const gazas = slipLaneRoad.result.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const carriles = highwayLane.result.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const deterioros = deteriorationTypeByEsp.result.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const actuaciones = performanceCatalogByEspRes.result
    .filter((actuacion) => actuacion.projectTask === projectTaskId)
    .map((item) => ({
      label: item.performanceName,
      value: item.id,
      compuestas: item.compositeCatalogs.map((item) => ({
        label: item.compositeUdName,
        value: item.id,
        mtUnitOfMeasurementId: item.mtUnitOfMeasurementId,
      })),
    }))

  const prioridades = priorityRes.result.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  return (
    <div>
      <NewRoadSurfaceMeasurementModal
        especialidad={especialidad}
        actuaciones={actuaciones}
        carriles={carriles}
        deterioros={deterioros}
        gazas={gazas}
        prioridades={prioridades}
        tramos={tramos}
      />
    </div>
  )
}

export default IndexPage
