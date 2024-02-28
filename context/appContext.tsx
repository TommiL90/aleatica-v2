import * as React from 'react'
import {
  IndicadorContextType,
  IIndicador,
  IUnidad,
  IComplementoTextual,
} from '@/types/type'
import * as Indicadores from '@/context/indicadores/index'

const AppContext = React.createContext<IndicadorContextType | any>(null)

export const useAppContext = () => React.useContext(AppContext)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [seguimientoIndicadores, setSeguimientoIndicadores] = React.useState<
    any[]
  >(Indicadores.seguimientoIndicadores)
  const [carrilIndicadores, setCarrilIndicadores] = React.useState<any[]>(
    Indicadores.carrilIndicadores,
  )
  const [gazaIndicadores, setGazaIndicadores] = React.useState<any[]>(
    Indicadores.gazaIndicadores,
  )
  const [deterioroIndicadores, setDeterioroIndicadores] = React.useState<any[]>(
    Indicadores.deterioroIndicadores,
  )
  const [tramosIndicadores, setTramosIndicadores] = React.useState<any[]>(
    Indicadores.tramosIndicadores,
  )
  const [faseIndicadores, setFaseIndicadores] = React.useState<any[]>(
    Indicadores.faseIndicadores,
  )
  const [aprobadosIndicadores, setAprobados] = React.useState<any[]>(
    Indicadores.aprobadosIndicadores,
  )
  const [responsables, setResponsables] = React.useState<any[]>(
    Indicadores.responsables,
  )
  const [formularios, setFormularios] = React.useState<any[]>(
    Indicadores.Formularios,
  )
  const [categoriaProyecto, setCategoriaProyecto] = React.useState<
    IIndicador[]
  >(Indicadores.categoriaProyecto)
  const [categoriaActuacionIndicadores, setCategoriaActuacionIndicadores] =
    React.useState<IIndicador[]>(Indicadores.categoriaActuacion)
  const [subCategoriaActuacionIndicadores, setSubCategoriaActuacion] =
    React.useState<IIndicador[]>(Indicadores.subCategoriaActuacionIndicadores)
  const [especialidadActuacionIndicadores, setEspecialidadActuacion] =
    React.useState<IIndicador[]>(Indicadores.especialidadActuacionIndicadores)
  const [unidadNegocioIndicadores, setUnidadNegocio] = React.useState<
    IIndicador[]
  >(Indicadores.unidadNegocioIndicadores)
  const [unidadObraFinalizadaIndicadores, setUnidadObraFinalizada] =
    React.useState<IUnidad[]>(Indicadores.unidadObraFinalizadaIndicadores)
  const [ambitoActuacion, setAmbitoActuacion] = React.useState<
    IComplementoTextual[]
  >(Indicadores.ambitoActuacion)
  const [unidadMonedaIndicador, setUnidadMonedaIndicador] = React.useState<
    any[]
  >(Indicadores.unidadMoneda)
  const [monedaIndicador, setMonedaIndicador] = React.useState<any[]>(
    Indicadores.moneda,
  )
  const [indicadoresDesempeno, setIndicadoresDesempeno] = React.useState<
    IUnidad[]
  >(Indicadores.indicadoresDesempeno)
  const [tareaIndicadores, setTareaIndicadores] = React.useState<IIndicador[]>(
    Indicadores.tareaIndicadores,
  )

  const saveIndicador = (indicador: IIndicador) => {}

  const valueProvider = {
    seguimientoIndicadores,
    carrilIndicadores,
    gazaIndicadores,
    deterioroIndicadores,
    tramosIndicadores,
    aprobadosIndicadores,
    faseIndicadores,
    responsables,
    formularios,
    categoriaProyecto,
    categoriaActuacionIndicadores,
    subCategoriaActuacionIndicadores,
    especialidadActuacionIndicadores,
    unidadNegocioIndicadores,
    unidadObraFinalizadaIndicadores,
    ambitoActuacion,
    unidadMonedaIndicador,
    monedaIndicador,
    indicadoresDesempeno,
    tareaIndicadores,
    saveIndicador,
  }

  return (
    <AppContext.Provider value={valueProvider}>{children}</AppContext.Provider>
  )
}
