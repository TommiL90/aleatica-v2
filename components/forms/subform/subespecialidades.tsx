"use client"

import { ChangeEvent, useEffect, useId, useState } from "react"
import Select from "react-select"

import SubespecialidadesNiveles from "@/components/subespecialidadesNiveles"

interface Option {
  label: string
  value: number
}

interface SubEspecialidadesProps {
  subEspecialidadesList: any[]
  especialidad: number
  nodeSelected: Option
  // subespecialidadesSelected: any[],
  onChange: Function
}

let ids: string[] = new Array()

export function SubEspecialidades(props: SubEspecialidadesProps) {
  const [currentSelectValue, setCurrentSelectValue] = useState<Option>(
    props.nodeSelected || { label: "", value: 0 }
  )

  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  return (
    <div className="mb-4">
      <div className="flex w-full">
        <div className="w-7/12">
          <SubespecialidadesNiveles
            especialidad={props.especialidad}
            nodoSelected={
              props.nodeSelected !== null
                ? String(props.nodeSelected.value)
                : ""
            }
            onChange={(value: any) => {
              setCurrentSelectValue(value)
              props.onChange(value)
            }}
          />
        </div>
        <div className="mx-2 h-[430px] w-5/12 border-l p-2">
          <div className="">
            <label className="mb-4 font-semibold text-gray-800"> Codigo</label>
            <p className="m-4 text-sm text-gray-600">
              {currentSelectValue.value > 0 &&
              props.subEspecialidadesList.length > 0
                ? props.subEspecialidadesList.filter(
                    (item: any) => item.value === currentSelectValue.value
                  )[0].code
                : `-`}
            </p>
          </div>

          <div>
            <label className="mb-4 font-semibold  text-gray-800">
              {" "}
              Subcategoria / Especialidad
            </label>
            <p className="m-4 text-sm  text-gray-600">
              {currentSelectValue.value > 0 &&
              props.subEspecialidadesList.length > 0
                ? props.subEspecialidadesList.filter(
                    (item: any) => item.value === currentSelectValue.value
                  )[0].especialityName
                : `-`}
              /
              {currentSelectValue.value > 0 &&
              props.subEspecialidadesList.length > 0
                ? props.subEspecialidadesList.filter(
                    (item: any) => item.value === currentSelectValue.value
                  )[0].especialityName
                : `-`}
            </p>
          </div>

          <div>
            <label className="mb-4 font-semibold  text-gray-800">
              {" "}
              Jerarquia
            </label>
            <p className="m-4 text-sm  text-gray-600">
              {currentSelectValue.value > 0 &&
              props.subEspecialidadesList.length > 0
                ? props.subEspecialidadesList.filter(
                    (item: any) => item.value === currentSelectValue.value
                  )[0].route
                : `-`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
