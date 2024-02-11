import { Column } from "@silevis/reactgrid"

export const getColumns = (): Column[] => [
  { columnId: "id", width: 30, reorderable: true, resizable: true },
  { columnId: "idUnidad", width: 200, reorderable: true, resizable: true },
  {
    columnId: "nombreUnidadSimple",
    width: 200,
    reorderable: true,
    resizable: true,
  },
  {
    columnId: "descripcionUnidadSimple",
    width: 350,
    reorderable: true,
    resizable: true,
  },
  // { columnId: "counter", width: 200, reorderable: true, resizable: true },
  { columnId: "subCategoria", width: 200, reorderable: true, resizable: true },
  { columnId: "especialidad", width: 200, reorderable: true, resizable: true },
  { columnId: "unidadObra", width: 200, reorderable: true, resizable: true },
  { columnId: "sap", width: 200, reorderable: true, resizable: true },
  { columnId: "global", width: 70, reorderable: true, resizable: true },
  { columnId: "modal", width: 150, reorderable: true },
  { columnId: "button_save", width: 120, reorderable: true },
  { columnId: "button_delete", width: 120, reorderable: true },
]
