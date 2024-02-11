import { SimpleUd } from "@/respaldo/contexts/types"

export const getEmpty = (id = 1): SimpleUd => ({
  idauto: id,
  id: 0,
  idUnidad: "",
  nombreUnidadSimple: ``,
  descripcionUnidadSimple: ``,
  counter: "",
  subCategoria: null,
  especialidad: null,
  unidadObra: null,
  sap: ``,
  global: false,
  subEspecialidad: null,
  unidadObraisOpen: false,
  subcategoriaisOpen: false,
  especialidadisOpen: false,
  especialidadesFilter: [],
  newItem: true,
})
