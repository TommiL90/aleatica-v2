import { AnimatePresence, motion } from 'framer-motion'
import useSWR from 'swr'

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import fetcher from '@/services/fetcher'
import Treeview from '@/components/treeview'

interface PropsModalDetailItem {
  title: string
  // unidadesObra: any[];
  // subcategorias: any[];
  // especialidades: any[];
  isModalOpen: boolean
  itemSelected: any
  onClose: Function
}

export default function ModalDetail(props: PropsModalDetailItem) {
  const [tabIndex, setTabIndex] = useState(0)
  // const [subEspecilityFather, setSubEspecilityFather] = useState('');
  const { data, error, isLoading } = useSWR(
    props.itemSelected > 0
      ? `${process.env.API_URL}/SimpleCatalog/FindById/${props.itemSelected}`
      : null,
    fetcher,
  )

  // useEffect(() => {
  //     if (!data.result.subEspecialidad || data.result.subEspecialidad.value === '') {
  //         return;
  //     }

  //     const subEspId = data.result.subEspecialidad.value;

  //     const fetchData = async () => {
  //         try {
  //             const res = await fetch(`${process.env.API_URL}/MtSubspeciality/FindById/${subEspId}`);

  //             if (!res.ok) {
  //                 throw new Error(`Error en la solicitud: ${res.status}`);
  //             }

  //             const data = await res.json();

  //             setSubEspecilityFather(data.result.father);
  //         } catch (error) {
  //             console.error('Error en la solicitud:', error);
  //         }
  //     };

  //     fetchData();
  // }, []);

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
                <div className="flex items-start justify-between rounded-t  p-4 dark:border-gray-600">
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
                  {data != undefined && data.status == 200 ? (
                    <>
                      <div className="mb-6 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
                        <ul className="-mb-px flex flex-wrap">
                          <li className="me-2">
                            <button
                              type="button"
                              onClick={() => setTabIndex(0)}
                              className={classNames(
                                tabIndex === 0
                                  ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                                  : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                              )}
                            >
                              Unidad
                            </button>
                          </li>
                          <li className="me-2">
                            <button
                              type="button"
                              onClick={() => setTabIndex(1)}
                              className={classNames(
                                tabIndex === 1
                                  ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                                  : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                              )}
                            >
                              Subespecialidades
                            </button>
                          </li>
                        </ul>
                      </div>

                      {tabIndex === 0 ? (
                        <>
                          <div className="mb-2 w-full border-gray-300  p-2 ">
                            <h2 className="mb-2 text-sm font-semibold text-gray-800">
                              Id unidad simple
                            </h2>
                            <p className="text-sm text-gray-700">
                              {data.result.simpleUdId}
                            </p>
                          </div>
                          <div className="mb-2 w-full border-gray-300  p-2 ">
                            <h2 className="mb-2 text-sm font-semibold text-gray-800">
                              Nombre
                            </h2>
                            <p className="text-sm text-gray-700">
                              {data.result.simpleUdName}
                            </p>
                          </div>
                          <div className="mb-2 w-full border-gray-300  p-2 ">
                            <h2 className="mb-2 text-sm font-semibold text-gray-800">
                              Descripcion
                            </h2>
                            <p className="text-sm text-gray-700">
                              {data.result.description}
                            </p>
                          </div>
                          <div className="mb-6 grid gap-6 md:grid-cols-2">
                            <div className="mb-2 w-full border-gray-300  p-2 ">
                              <h2 className="mb-2 text-sm font-semibold text-gray-800">
                                Subcategoria
                              </h2>
                              <p className="text-sm text-gray-700">
                                {data.result.mtSubCategoryAction}
                              </p>
                            </div>
                            <div className="mb-2 w-full border-gray-300  p-2 ">
                              <h2 className="mb-2 text-sm font-semibold text-gray-800">
                                Especialidad
                              </h2>
                              <p className="text-sm text-gray-700">
                                {data.result.mtSpecialtyAction}
                              </p>
                            </div>
                            <div className="mb-2 w-full border-gray-300  p-2 ">
                              <h2 className="mb-2 text-sm font-semibold text-gray-800">
                                Unidad de obra
                              </h2>
                              <p className="text-sm text-gray-700">
                                {data.result.mtUnitOfMeasurement}
                              </p>
                            </div>
                            <div className="mb-2 w-full border-gray-300  p-2">
                              <h2 className="mb-2 text-sm font-semibold text-gray-800">
                                SAP
                              </h2>
                              <p className="text-sm text-gray-700">
                                {data.result.sapId}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="mb-2 w-full rounded  border-gray-300 p-2">
                              <h2 className="mb-2 text-sm font-semibold text-gray-800">
                                Subespecialidad
                              </h2>
                              <p className="text-sm text-gray-700">
                                {data.result.mtSubspecialityName}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : null}

                      {tabIndex === 1 ? (
                        <Treeview
                          orientation="vertical"
                          data={{
                            name: `Ud simple: ${data.result.simpleUdName}`,
                            children: [
                              {
                                name: `Sub: ${data.result.mtSubspecialityName}`,

                                children: [],
                              },
                            ],
                          }}
                          height={600}
                        />
                      ) : null}
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
