import CatalogoUDCompuestasForm from '@/components/forms/catalogoUDCompuestas'
import Loading from '@/components/loading'
import { AnimatePresence, motion } from 'framer-motion'

interface PropsModalNewItem {
  title: string
  isModalOpen: boolean
  itemSelected: any
  unidadesObra: any[]
  subcategorias: any[]
  especialidades: any[]
  simples: any[]
  onClose: Function
  onMutate: Function
}

export default function ModalNewItem(props: PropsModalNewItem) {
  // console.log(props.simples)

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
            className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[700px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="max-w-7xlxl relative mx-auto max-h-full w-[700px]">
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
                    <CatalogoUDCompuestasForm
                      unidadesSimples={props.simples}
                      unidadesObra={props.unidadesObra}
                      subcategorias={props.subcategorias}
                      especialidades={props.especialidades}
                      especialidad={
                        props.itemSelected !== null
                          ? props.itemSelected.especialidad
                          : null
                      }
                      initValue={
                        props.itemSelected !== null
                          ? {
                              codigoSAP: props.itemSelected.sap,
                              nombreUnidadCompuesta:
                                props.itemSelected.nombreUnidadCompuesta,
                              descripcionUnidadCompuesta:
                                props.itemSelected.descripcionUnidadCompuesta,
                              udObra: props.itemSelected.unidadObra,
                              subCategoriaActuacion:
                                props.itemSelected.subCategoria,
                              especialidadActuacion:
                                props.itemSelected.especialidad,
                              unidadesSimples:
                                props.itemSelected.unidadesSimples,
                              codigoCompuesto:
                                props.itemSelected.codigoCompuesta,
                            }
                          : null
                      }
                      buttonText="Guardar unidad compuesta"
                      onSubmit={(values: any) => {
                        // eslint-disable-next-line no-useless-catch
                        try {
                          props.onMutate(values)
                        } catch (error) {
                          throw error
                        }
                      }}
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
