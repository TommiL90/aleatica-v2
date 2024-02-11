import { SimpleUd } from "@/respaldo/contexts/types"
import {
  Column,
  DateCell,
  DefaultCellTypes,
  DropdownCell,
  Row,
} from "@silevis/reactgrid"

import { ButtonCell } from "@/components/cells/button"
import { FlagCell } from "@/components/cells/flag"

import { filtro } from "./filter"
import { headerRow } from "./header-row"

export const getRows = (
  unidades: SimpleUd[],
  columns: Column[],
  subcategories: any[],
  especialities: any[],
  measurementUnits: any[],
  subespecialities: any[]
): Row<
  DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell
>[] => [
  headerRow(columns),
  ...unidades.map<
    Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>
  >((item, idx) => ({
    rowId: idx + 1, // item.idauto,
    reorderable: true,
    height: 35,
    cells: columns.map((col) => {
      let elem:
        | DefaultCellTypes
        | FlagCell
        | ButtonCell
        | DateCell
        | DropdownCell = { type: "header", text: "", style: { color: "" } }

      switch (col.columnId) {
        case "id":
          elem = {
            type: "header",
            text: `${item.idauto}`,
            style: { color: "#666179" },
          }
          break
        case "idUnidad":
          elem = {
            type: "header",
            text: `${item.idUnidad}`,
            style: { color: "#666179" },
          }
          break
        case "modal":
          elem = {
            type: "button",
            text:
              item.subEspecialidad !== null
                ? item.subEspecialidad.label
                : "Editar",
            style: { color: "#666179" },
            enabled: true,
            size: 1,
            id: item.id,
            onClick: () => {
              console.log("click")
            },
          }
          break
        case "button_save":
          elem = {
            type: "button",
            text: `Guardar`,
            style: { color: "#666179" },
            enabled: filtro(item, subespecialities),
            size: -1,
            id: item.id,
            onClick: () => {
              console.log(item)
            },
          }
          break
        case "button_delete":
          elem = {
            type: "button",
            text: `Eliminar`,
            style: { color: "#666179" },
            enabled: item.id > 0,
            size: -1,
            id: item.id,
            onClick: () => {
              console.log("click")
            },
          }
          break
        case "sap":
          elem = {
            type: "text",
            text: item.sap,
            className: "text-sm block w-full text-gray-800",
          }
          break

        case "nombreUnidadSimple":
          elem = {
            type: "text",
            text: item.nombreUnidadSimple,
            className: "text-sm block w-full text-gray-800 focus:text-gray-800",
          }
          break
        case "descripcionUnidadSimple":
          elem = {
            type: "text",
            text: item.descripcionUnidadSimple,
            className: "text-sm block w-full text-gray-800 focus:text-gray-800",
          }
          break
        case "counter":
          elem = {
            type: "text",
            text: item.counter,
            className: "text-sm block w-full text-gray-800",
          }
          break

        case "subCategoria":
          elem = {
            type: "dropdown",
            selectedValue: item.subCategoria,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.subcategoriaisOpen,
            values: subcategories,
            className: "text-sm  block w-full bg-gray-100 text-gray-800",
          }
          break

        case "especialidad":
          elem = {
            type: "dropdown",
            selectedValue: item.especialidad,
            // inputValue: item.especialidadActuacion,
            isOpen: item.especialidadisOpen,
            values: item.especialidadesFilter,
            className: "text-sm  block w-full bg-gray-100 text-gray-800",
          }
          break

        case "unidadObra":
          elem = {
            type: "dropdown",
            selectedValue: item.unidadObra,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.unidadObraisOpen,
            values: measurementUnits,
            className: "text-sm  block w-full bg-gray-100 text-gray-800",
          }
          break
        case "global":
          elem = {
            type: "checkbox",
            checked: item.global,
            className:
              "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
          }
          break
      }

      return elem
    }),
  })),
]
