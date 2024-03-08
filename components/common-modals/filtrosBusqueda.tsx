'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import Select from 'react-select'

interface Props {
  filter: any
  onSearch: Function
  onClose: Function
}
export default function ModalFiltrosBusqueda(props: Props) {
  const [selected, setSelected] = useState<boolean>(
    'seleccionado' in props.filter.values
      ? props.filter.filtros.seleccionados.filter(
          (item: boolean) => item === props.filter.values.seleccionado,
        )[0]
      : null,
  )

  const [subcategoria, setSubcategoria] = useState(
    'subcategoria' in props.filter.values
      ? props.filter.filtros.subcategorias.filter(
          (item: any) => item['value'] == props.filter.values.subcategoria,
        )[0]
      : null,
  )
  const [especialidad, setEspecialidad] = useState(
    'especialidad' in props.filter.values
      ? props.filter.filtros.especialidades.filter(
          (item: any) => item['value'] == props.filter.values.especialidad,
        )[0]
      : null,
  )

  const [tramo, setTramo] = useState(
    'tramo' in props.filter.values
      ? props.filter.filtros.tramos.filter(
          (item: any) => item['value'] == props.filter.values.tramo,
        )[0]
      : null,
  )

  const [unidadNegocio, setUnidadNegocio] = useState(
    'unidadNegocio' in props.filter.values
      ? props.filter.filtros.unidadNegocios.filter(
          (item: any) => item['value'] == props.filter.values.unidadNegocio,
        )[0]
      : null,
  )

  const [pais, setPais] = useState(
    'pais' in props.filter.values
      ? props.filter.filtros.paises.filter(
          (item: any) => item['value'] == props.filter.values.pais,
        )[0]
      : null,
  )

  const [year, setYear] = useState(
    'year' in props.filter.values
      ? props.filter.filtros.years.filter(
          (item: any) => item['value'] == props.filter.values.year,
        )[0]
      : null,
  )

  const [tipo, setTipo] = useState(
    'tipo' in props.filter.values
      ? props.filter.filtros.tipos.filter(
          (item: any) => item['value'] == props.filter.values.tipo,
        )[0]
      : null,
  )

  const [categoriaProyecto, setCategoriaProyecto] = useState(
    'categoriaProyecto' in props.filter.values
      ? props.filter.filtros.categoriaProyectos.filter(
          (item: any) => item['value'] == props.filter.values.categoriaProyecto,
        )[0]
      : null,
  )

  const [categoriaActuacion, setCategoriaActuacion] = useState(
    'categoriaActuacion' in props.filter.values
      ? props.filter.filtros.categoriaActuacion.filter(
          (item: any) =>
            item['value'] == props.filter.values.categoriaActuacion,
        )[0]
      : null,
  )

  const [unidadMedida, setUnidadMedida] = useState(
    'unidadMedida' in props.filter.values
      ? props.filter.filtros.unidadMedida.filter(
          (item: any) => item['value'] == props.filter.values.unidadMedida,
        )[0]
      : null,
  )

  const [ambitoActuacion, setAmbitoActuacion] = useState(
    'ambitoActuacion' in props.filter.values
      ? props.filter.filtros.ambitoActuacion.filter(
          (item: any) => item['value'] == props.filter.values.ambitoActuacion,
        )[0]
      : null,
  )

  const [MRAsociado, setMRAsociado] = useState(
    'MRAsociado' in props.filter.values
      ? props.filter.filtros.MRAsociado.filter(
          (item: any) => item['value'] == props.filter.values.MRAsociado,
        )[0]
      : null,
  )

  const [prioridad, setPrioridad] = useState(
    'prioridad' in props.filter.values
      ? props.filter.filtros.prioridad.filter(
          (item: any) => item['value'] == props.filter.values.prioridad,
        )[0]
      : null,
  )

  const [compuesta, setCompuesta] = useState(
    'compuesta' in props.filter.values
      ? props.filter.filtros.compuesta.filter(
          (item: any) => item['value'] == props.filter.values.compuesta,
        )[0]
      : null,
  )

  const [calzada, setCalzada] = useState(
    'calzada' in props.filter.values
      ? props.filter.filtros.calzadas.filter(
          (item: any) => item['value'] == props.filter.values.calzada,
        )[0]
      : null,
  )

  const [entronque, setEntronque] = useState(
    'entronque' in props.filter.values
      ? props.filter.filtros.entronques.filter(
          (item: any) => item['value'] == props.filter.values.entronque,
        )[0]
      : null,
  )

  const [gaza, setGaza] = useState(
    'gaza' in props.filter.values
      ? props.filter.filtros.gazas.filter(
          (item: any) => item['value'] == props.filter.values.gaza,
        )[0]
      : null,
  )

  const [deterioro, setDeterioro] = useState(
    'deterioro' in props.filter.values
      ? props.filter.filtros.deterioros.filter(
          (item: any) => item['value'] == props.filter.values.deterioro,
        )[0]
      : null,
  )

  const clearFilters = () => {
    setSubcategoria(null)
    setEspecialidad(null)
  }

  return (
    <>
      <div
        id="defaultModal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className={
          'fixed left-0 right-0 top-0 z-50 mx-auto flex h-[calc(100%-1rem)] max-h-full w-[900px] flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0'
        }
      >
        <div className="relative max-h-full w-full">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Filtros de busqueda
              </h3>
              <button
                data-modal-target="defaultModal"
                type="button"
                onClick={() => props.onClose()}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="mb-6 grid gap-6 p-4 md:grid-cols-2">
              {'subcategorias' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="subcategoria"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subcategoria
                  </label>
                  <div>
                    <Select
                      id="subcategoria"
                      instanceId="subcategoria"
                      placeholder="Inserte subcategoria de actuacion"
                      options={props.filter.filtros.subcategorias}
                      value={subcategoria}
                      onChange={(option: any) => setSubcategoria(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'especialidades' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="especialidad"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Especialidad
                  </label>
                  <div>
                    <Select
                      id="especialidad"
                      instanceId="especialidad"
                      placeholder="Inserte especialidad de actuacion"
                      options={
                        subcategoria !== undefined && subcategoria !== null
                          ? props.filter.filtros.especialidades.filter(
                              (item: any) =>
                                item.subcategory === subcategoria['value'],
                            )
                          : []
                      }
                      value={especialidad}
                      onChange={(option: any) => setEspecialidad(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'tramos' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="tramo"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tramo
                  </label>
                  <div>
                    <Select
                      id="tramo"
                      instanceId="tramo"
                      placeholder="Inserte tramo"
                      options={props.filter.filtros.tramos}
                      value={tramo}
                      onChange={(option: any) => setTramo(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'unidadNegocios' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="unidadNegocio"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Unidades de negocios
                  </label>
                  <div>
                    <Select
                      id="unidadNegocio"
                      instanceId="unidadNegocio"
                      placeholder="Inserte unidad de negocios"
                      options={props.filter.filtros.unidadNegocios}
                      value={unidadNegocio}
                      onChange={(option: any) => setUnidadNegocio(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'paises' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="pais"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pais
                  </label>
                  <div>
                    <Select
                      id="pais"
                      instanceId="pais"
                      placeholder="Inserte pais"
                      options={props.filter.filtros.paises}
                      value={pais}
                      onChange={(option: any) => setPais(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'years' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="year"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Anno
                  </label>
                  <div>
                    <Select
                      id="year"
                      instanceId="year"
                      placeholder="Inserte year"
                      options={props.filter.filtros.years}
                      value={year}
                      onChange={(option: any) => setYear(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'tipos' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="tipo"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tipo de proyecto
                  </label>
                  <div>
                    <Select
                      id="tipo"
                      instanceId="tipo"
                      placeholder="Inserte tipo proyecto"
                      options={props.filter.filtros.tipos}
                      value={tipo}
                      onChange={(option: any) => setTipo(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'categoriaProyectos' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="categoriaProyectos"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Categorida de proyecto
                  </label>
                  <div>
                    <Select
                      id="categoriaProyectos"
                      instanceId="categoriaProyectos"
                      placeholder="Inserte categoria de proyecto"
                      options={props.filter.filtros.categoriaProyectos}
                      value={categoriaProyecto}
                      onChange={(option: any) => setCategoriaProyecto(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'categoriaActuacion' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="categoriaActuacion"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Categorida de actuacion
                  </label>
                  <div>
                    <Select
                      id="categoriaActuacion"
                      instanceId="categoriaActuacion"
                      placeholder="Inserte categoria de actuacion"
                      options={props.filter.filtros.categoriaActuacion}
                      value={categoriaActuacion}
                      onChange={(option: any) => setCategoriaActuacion(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'unidadMedida' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="unidadMedida"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Unidad de medida
                  </label>
                  <div>
                    <Select
                      id="unidadMedida"
                      instanceId="unidadMedida"
                      placeholder="Inserte unidad de medida"
                      options={props.filter.filtros.unidadMedida}
                      value={unidadMedida}
                      onChange={(option: any) => setUnidadMedida(option)}
                      isMulti
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'ambitoActuacion' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="ambitoActuacion"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ambito de actuacion
                  </label>
                  <div>
                    <Select
                      id="ambitoActuacion"
                      instanceId="ambitoActuacion"
                      placeholder="Inserte ambito de actuacion"
                      options={props.filter.filtros.ambitoActuacion}
                      value={ambitoActuacion}
                      onChange={(option: any) => setAmbitoActuacion(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'MRAsociado' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="MRAsociado"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Indicador de ejecucion
                  </label>
                  <div>
                    <Select
                      id="MRAsociado"
                      instanceId="MRAsociado"
                      placeholder="Inserte indicador de ejecucion"
                      options={props.filter.filtros.MRAsociado}
                      value={MRAsociado}
                      onChange={(option: any) => setMRAsociado(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'prioridad' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="prioridad"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Prioridad
                  </label>
                  <div>
                    <Select
                      id="prioridad"
                      instanceId="prioridad"
                      placeholder="Inserte prioridad"
                      options={props.filter.filtros.prioridad}
                      value={prioridad}
                      onChange={(option: any) => setPrioridad(option)}
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'compuesta' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="compuesta"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Unidad compuesta
                  </label>
                  <div>
                    <Select
                      id="compuesta"
                      instanceId="compuesta"
                      placeholder="Inserte unidad compuesta"
                      options={props.filter.filtros.compuesta}
                      value={compuesta}
                      onChange={(option: any) => setCompuesta(option)}
                      isMulti
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'calzadas' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="calzada"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Calzada
                  </label>
                  <div>
                    <Select
                      id="calzada"
                      instanceId="calzada"
                      placeholder="Inserte calzada"
                      options={props.filter.filtros.calzadas}
                      value={calzada}
                      onChange={(option: any) => setCalzada(option)}
                      isMulti
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'entronques' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="entronque"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Entronque
                  </label>
                  <div>
                    <Select
                      id="entronque"
                      instanceId="entronque"
                      placeholder="Inserte entronque"
                      options={props.filter.filtros.entronques}
                      value={entronque}
                      onChange={(option: any) => setEntronque(option)}
                      isMulti
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'gazas' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="gaza"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gaza
                  </label>
                  <div>
                    <Select
                      id="gaza"
                      instanceId="gaza"
                      placeholder="Inserte gaza"
                      options={props.filter.filtros.gazas}
                      value={gaza}
                      onChange={(option: any) => setGaza(option)}
                      isMulti
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}
              {'deterioros' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="deterioro"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Deterioro
                  </label>
                  <div>
                    <Select
                      id="deterioro"
                      instanceId="deterioro"
                      placeholder="Inserte deterioro"
                      options={props.filter.filtros.deterioros}
                      value={deterioro}
                      onChange={(option: any) => setDeterioro(option)}
                      isMulti
                      className={cn(
                        'block w-full rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {'seleccionados' in props.filter.filtros ? (
                <div>
                  <label
                    htmlFor="seleccionados"
                    className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <input
                      type="checkbox"
                      id="seleccionados"
                      checked={selected}
                      onChange={() => setSelected(!selected)}
                    />

                    <span className="ml-2">Mostrar apenas seleccionados</span>
                  </label>
                </div>
              ) : null}
            </div>
            {/* <!-- Modal footer --> */}
            <div className=" space-x-2 rounded-b border-t border-gray-200 p-6 text-center dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                onClick={() =>
                  props.onSearch({
                    subcategoria,
                    especialidad,
                    tramo,
                    entronque,
                    calzada,
                    gaza,
                    deterioro,
                    unidadNegocio,
                    prioridad,
                    pais,
                    year,
                    compuesta,
                    tipo,
                    unidadMedida,
                    selected,
                  })
                }
                type="button"
                className="hover:bg-blue-800focus:ring-4  mr-2 inline-flex items-center rounded-lg rounded-r-lg border border-blue-700 bg-blue-700 px-5 py-2.5 text-center text-xs font-medium text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar
              </button>
              <button
                data-modal-hide="defaultModal"
                onClick={() => clearFilters()}
                type="button"
                className="mr-2  inline-flex items-center rounded-lg rounded-r-lg border border-red-700 bg-red-700 px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}
