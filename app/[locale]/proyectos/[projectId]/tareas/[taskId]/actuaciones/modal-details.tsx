import { AnimatePresence, motion } from 'framer-motion'

interface PropsModalDetailItem {
  title: string
  // subcategorias: any[];
  especialidades: any[]
  unidadMedida: any[]
  isModalOpen: boolean
  itemSelected: any
  onClose: Function
}

export default function ModalDetail(props: PropsModalDetailItem) {
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
            <div className="max-w-7xlxl relative mx-auto max-h-full w-[780px]">
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

                <div className="h-[750px] space-y-6 overflow-y-auto p-6">
                  {props.itemSelected !== undefined ? (
                    <>
                      <div className="mb-6 grid gap-6 md:grid-cols-3">
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Id
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.idActuacion}
                          </p>
                        </div>
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Expediente
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.idExpediente}
                          </p>
                        </div>
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Numero de actuacion
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.noActuacion}
                          </p>
                        </div>
                      </div>
                      <div className="mb-2 w-full border-gray-300  p-2 ">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Nombre
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.nombreActuacion}
                        </p>
                      </div>

                      <div className="mb-6 grid gap-6 md:grid-cols-3">
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Categoria de proyecto
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.categoriaProyectoName}
                          </p>
                        </div>

                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Categoria de actuacion
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.categoriaActuacionName}
                          </p>
                        </div>

                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Ambito de actuacion
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.ambitoActuacionName}
                          </p>
                        </div>
                      </div>
                      <div className="mb-6 grid gap-6 md:grid-cols-2">
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Subcategoria
                          </h2>
                          <p className="text-sm text-gray-700">
                            {/* {
                                                        props.subcategorias.filter((item: any) => item.value === props.itemSelected.subCategoria).length > 0 ?
                                                            props.subcategorias.filter((item: any) => item.value === props.itemSelected.subCategoria)[0].label
                                                            :
                                                            <> - </>
                                                    } */}
                            {props.itemSelected.subcategoriaActuacion}
                          </p>
                        </div>
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Especialidad
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.especialidadActuacion}
                          </p>
                        </div>
                        <div className="mb-2 w-full border-gray-300  p-2 ">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            Unidad de obra
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.unidadMedida.filter(
                              (item: any) =>
                                item.value === props.itemSelected.unidadObra,
                            ).length > 0 ? (
                              props.unidadMedida.filter(
                                (item: any) =>
                                  item.value === props.itemSelected.unidadObra,
                              )[0].label
                            ) : (
                              <> - </>
                            )}
                          </p>
                        </div>
                        <div className="mb-2 w-full border-gray-300  p-2">
                          <h2 className="mb-2 text-sm font-semibold text-gray-800">
                            SAP
                          </h2>
                          <p className="text-sm text-gray-700">
                            {props.itemSelected.codigoSAP}
                          </p>
                        </div>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Unidades compuestas
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.unidadesCompuestas.map(
                            (item: any, idx: number) => (
                              <span
                                key={idx}
                                id="badge-dismiss-green"
                                className="me-2 mt-2 inline-flex items-center rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                              >
                                {item.label}
                              </span>
                            ),
                          )}
                        </p>
                      </div>
                    </>
                  ) : null}
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
