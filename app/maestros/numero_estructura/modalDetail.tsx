import { AnimatePresence, motion } from 'framer-motion'
import IndicadorSubEspecialidadForm from '@/components/forms/IndicadorSubEspecialidadForm'

import Loading from '@/components/loading'

import useSWR from 'swr'
import fetcher from '@/services/fetcher'

interface PropsModalDetailItem {
  title: string
  isModalOpen: boolean
  itemSelected: any
  onClose: Function
}

export default function ModalDetail(props: PropsModalDetailItem) {
  // const { data: subespRes, mutate,  } = useSWR(`${process.env.API_URL}/MtSpecialtyAction/GetAll`, fetcher)
  // const { data: subRes, } = useSWR(`${process.env.API_URL}/MtSubCategoryAction/GetAll`, fetcher)
  // const { data: padresRes, } = useSWR(`${process.env.API_URL}/MtSubspeciality/GetAll`, fetcher)
  const { data, error, isLoading } = useSWR(
    props.itemSelected > 0
      ? `${process.env.API_URL}/MtStructureNumber/FindById/${props.itemSelected}`
      : null,
    fetcher,
  )

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

                <div className="h-[630px] space-y-6 overflow-y-auto p-6">
                  {isLoading ? <Loading label={''} /> : null}
                  {error ? (
                    <div
                      className="mb-2 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Danger</span>
                      <div>
                        <span className="font-medium">
                          Alguno de los siguientes requerimientos no se cumple:
                        </span>
                        <ul className="mt-1.5 list-inside list-disc">
                          <li>No esta conectado al servidor</li>
                          <li>El recurso solicitado no existe</li>
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  {data !== undefined && data.status === 200 ? (
                    <>
                      <div className="mb-2 w-full border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Nombre
                        </h2>
                        <p className="text-sm text-gray-700">
                          {data.result.name}
                        </p>
                      </div>

                      <div className="mb-2 w-full border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Codigo
                        </h2>
                        <p className="text-sm text-gray-700">
                          {data.result.code}
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
