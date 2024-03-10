export type Year = {
  text: string
  value: number
}

export interface IIndicador {
  codigo: string
  nombre: string
  subcat: string
}

export interface IUnidad {
  codigo: string
}

export interface IComplementoTextual {
  nombre: string
}

export type IndicadorContextType = {
  categoriaProyectoIndicadores: IIndicador[]
  categoriaActuacionIndicadores: IIndicador[]
  subCategoriaActuacionIndicadores: IIndicador[]
  especialidadActuacionIndicadores: IIndicador[]
  unidadNegocioIndicadores: IIndicador[]
  unidadObraFinalizadaIndicadores: IUnidad[]
  ambitoActuacionIndicadores: IComplementoTextual[]
  unidadMonedaIndicadores: IUnidad[]
  indicadoresDesempenoIndicadores: IUnidad[]
  saveIndicador: (indicador: IIndicador) => void
}
