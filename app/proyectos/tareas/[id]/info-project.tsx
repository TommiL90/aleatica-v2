import React from "react"

import { Button } from "@/components/ui/button"

import { Project } from "./types"

interface InfoProjectProps {
  data: Project
}
const InfoProject = ({ data }: InfoProjectProps) => {
  return (
    <section className="mb-6 grid gap-6 md:grid-cols-2">
      <ul>
        <li className="border-b p-3 ">
          <span className="font-bold">Nombre: </span>
          {data.name}
        </li>
        <li className="border-b p-3 ">
          <span className="font-bold"> Codigo: </span>
          {data.code}
        </li>
        <li className="border-b p-3 ">
          <span className="font-bold"> Unidad de negocio: </span>
          {data.mtBusinessUnit}
        </li>
        <li className="border-b p-3 ">
          <span className="font-bold">Tipo: </span>
          {data.type}
        </li>
        <li className="border-b p-3 ">
          <span className="font-bold">Versión: </span>
          {data.version}
        </li>
      </ul>
      <ul>
        <li className="border-b p-3 ">
          <span className="font-bold">Año de Finalización: </span>
          {data.conclusion}
        </li>
        <li className="border-b p-3 ">
          <span className="font-bold"> Estado: </span>
          {data.status}
        </li>
        <li className="border-b p-3 ">
          <span className="font-bold"> Responsable: </span>
          Por asignar
        </li>
        <li className="border-b p-3 ">
          <Button variant={"secondary"}>Clonar Proyecto</Button>
        </li>
      </ul>
    </section>
  )
}

export default InfoProject
