'use client'

import CatalogoActuaciones from '@/components/forms/catalogo-actuaciones'
import Loading from '@/components/loading'
import { AnimatePresence, motion } from 'framer-motion'

interface PropsModalNewItem {
  title: string
  isModalOpen: boolean
  itemSelected: any
  especialidad: number

  compositeList: any[]
  compositeSelected: any[]
  categoriaProyecto: any[]
  categoriaActuacion: any[]
  tramo: any[]
  unidadMedida: any[]
  ambitoActuacion: any[]
  MRAsociado: any[]
  tca: any[]
  subcategorias: any[]
  especialidades: any[]

  onClose: Function
  onMutate: Function
}

export default function ModalNewItem(props: PropsModalNewItem) {
  console.log(props.tca)

  return (
    <AnimatePresence>
      {props.isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            id="staticModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[950px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="max-w-7xlxl relative mx-auto max-h-full w-[950px]">
              <div className="relative bg-white  shadow dark:bg-gray-700">
                <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {props.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => props.onClose()}
                    className="ml-auto inline-flex h-8 w-8  items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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

                <div className="space-y-6 p-6">
                  {props.itemSelected === null ? (
                    <Loading label={''} />
                  ) : (
                    <CatalogoActuaciones
                      compositeList={props.compositeList.filter(
                        (item: any) =>
                          item.especialityId === props.especialidad,
                      )}
                      compositeSelected={props.compositeSelected}
                      categoriaProyecto={props.categoriaProyecto}
                      categoriaActuacion={props.categoriaActuacion}
                      tramo={props.tramo}
                      unidadMedida={props.unidadMedida}
                      ambitoActuacion={props.ambitoActuacion}
                      MRAsociado={props.MRAsociado}
                      tca={props.tca}
                      subcategorias={props.subcategorias}
                      especialidades={props.especialidades}
                      initValue={
                        props.itemSelected !== null
                          ? {
                              categoriaProyecto:
                                props.itemSelected.categoriaProyecto,
                              categoriaActuacion:
                                props.itemSelected.categoriaActuacion,
                              noActuacion: props.itemSelected.noActuacion,
                              diferido: props.itemSelected.diferido,
                              nombreActuacion:
                                props.itemSelected.nombreActuacion,
                              codigoSAP: props.itemSelected.codigoSAP,
                              expediente: props.itemSelected.expediente,
                              PRA: props.itemSelected.PRA,
                              tca: props.itemSelected.puntosNegrosTCA,
                              MRAsociado: props.itemSelected.MRAsociado,
                              udObra: props.itemSelected.unidadObra,
                              faseTramo: Number(props.itemSelected.faseTramo),
                              ambitoActuacion:
                                props.itemSelected.ambitoActuacion,
                              sostenibilidad: props.itemSelected.sostenibilidad,
                              unidadesCompuestas:
                                props.itemSelected.unidadesCompuestas,
                            }
                          : null
                      }
                      buttonText="Guardar actuacion"
                      onSubmit={(values: any) => props.onMutate(values)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            modal-backdrop=""
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
