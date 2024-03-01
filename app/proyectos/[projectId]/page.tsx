'use client'
import Link from 'next/link'

// import 'swiper/css'

import { useParams, useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'

import Select from 'react-select'
import useSWR from 'swr'
import { toast } from 'sonner'
import Loading from '@/components/loading'
import Breadcrumbs from '@/components/breadcrumbs'
import { cn } from '@/lib/utils'
import fetcher from '@/services/fetcher'
import ModalDuplicateProject from '@/components/common-modals/modal-duplicate-proyect'

export default function Selectors() {
  const params = useParams<{ projectId: string }>()
  const projectId = parseInt(
    params && params.projectId ? params.projectId : '0',
  )
  const [modalClone, setModalClone] = useState(false)
  const [subcategoria, setSubcategoria] = useState(null)
  const [tab, setTab] = useState('tareas')
  const { data: subcatRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: espRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const { data: formRes } = useSWR(
    `${process.env.API_URL}/MtProcessForm/GetAll`,
    fetcher,
  )
  const { data, error, isLoading } = useSWR(
    projectId ? `${process.env.API_URL}/Project/FindById/${projectId}` : null,
    fetcher,
  )
  const { data: getSubAndTaskRes } = useSWR(
    projectId
      ? `${process.env.API_URL}/Project/GetTasksAndSubcategories/${projectId}`
      : null,
    fetcher,
  )
  const { trigger } = useSWRMutation(
    projectId ? `${process.env.API_URL}/Project/Duplicate/${projectId}` : null,
    fetcher,
  )

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Proyectos', link: '/proyectos' },
    { label: 'Proyectos desarrollo', link: null },
  ]

  const generateTaskLink = (
    taskId: number,
    processFormId: number,
    espId: number,
    actiontask: number | undefined = undefined,
  ) => {
    switch (processFormId) {
      case 2:
        return `/proyectos/${projectId}/tareas/${taskId}/udsimples?esp=${espId}`
      case 3:
        return `/proyectos/${projectId}/tareas/${taskId}/udcompuestas/esp/${espId}`
      case 4:
        return `/proyectos/${projectId}/tareas/${taskId}/actuaciones?esp=${espId}`
      case 6:
        return `/proyectos/${projectId}/tareas/${taskId}/mediciones?esp=${espId}&actuacion=${actiontask}`
      case 7:
        return `/precios/udsimples?id=${taskId}&esp=${espId}`
      case 8:
        return `/precios/udcompuestas?id=${taskId}&esp=${espId}`
      case 13:
        return '#' // estudios previos
    }
  }

  const handleCloseModal = (value: string) => {
    setModalClone(!modalClone)
  }

  const handleClone = async () => {
    const toastId = toast.loading('Duplicando proyecto... 🚀')

    const result: any = await trigger()

    if (result != undefined && result.status === 201) {
      toast.success('Proyecto duplicado 🙌', { id: toastId })
    }

    if (result != undefined && result.status >= 300) {
      toast.error('Error duplicando proyecto😱', { id: toastId })
    }
    setModalClone(false)
  }

  if (isLoading)
    return (
      <main>
        <Loading label={''} />
      </main>
    )

  if (error) return <p>Error</p>

  if (data)
    return (
      <main>
        {/* <!-- Start block --> */}
        <section className="max-h-screen w-full  bg-white dark:bg-gray-900 lg:m-auto">
          <div className="w-full md:mx-auto md:w-10/12 lg:mx-auto lg:w-10/12 xl:mx-auto xl:w-10/12">
            {error ? (
              <div
                className="mb-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="mr-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
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
                    Asegurese que estos requerimientos se cumplen:
                  </span>
                  <div className="mt-4">{error.info.errorMessage}</div>
                </div>
              </div>
            ) : null}
          </div>
          <Breadcrumbs items={breadcrumbs} />
          <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <ul>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Nombre:{' '}
                      </span>
                      {data.result.name}
                    </p>
                  </li>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Código:{' '}
                      </span>
                      {data.result.code}
                    </p>
                  </li>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Unidad de negocio:{' '}
                      </span>
                      {data.result.mtBusinessUnit}
                    </p>
                  </li>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Tipo:{' '}
                      </span>
                      {data.result.type}
                    </p>
                  </li>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Versión:{' '}
                      </span>
                      {data.result.version}
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Año de finalización:{' '}
                      </span>
                      <span className="uppercase">{data.result.mtYear}</span>
                    </p>
                  </li>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Estado:{' '}
                      </span>
                      En desarrollo
                    </p>
                  </li>
                  <li className="border-b p-3">
                    <p
                      suppressHydrationWarning
                      className="text-base text-gray-900 dark:text-white"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        Responsable:{' '}
                      </span>
                      Juan Lopez
                    </p>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setModalClone(!modalClone)}
                    type="button"
                    className="m-1 rounded-lg bg-blue-700 px-3 py-2 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Clonar proyecto
                  </button>
                </div>
              </div>
            </div>
            <div className="my-6 border-b">
              <span className="text-base font-medium text-gray-900">
                Descripción
              </span>
              <p className="mb-6 mt-2 text-base text-gray-700">
                {data.result.description}
              </p>
            </div>
            <div className="mb-6  border-b border-gray-200 text-center text-base font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <ul className="-mb-px flex flex-wrap">
                <li className="mr-2">
                  <button
                    onClick={() => setTab('tareas')}
                    className={cn(
                      'inline-block p-4',
                      tab === 'tareas'
                        ? 'active rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : ' rounded-t-lg border-b-2 border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Tareas
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setTab('consultas')}
                    className={cn(
                      'inline-block p-4',
                      tab === 'consultas'
                        ? 'active rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : ' rounded-t-lg border-b-2 border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Consultas
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setTab('presupuesto')}
                    className={cn(
                      'inline-block p-4',
                      tab === 'presupuesto'
                        ? 'active rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : ' rounded-t-lg border-b-2 border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Plantilla de presupuestos
                  </button>
                </li>
              </ul>
            </div>
            {tab === 'tareas' ? (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="subcategoria"
                    className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                  >
                    Subcategoría
                  </label>
                  <Select
                    id="subcategoria"
                    instanceId="subcategoria"
                    placeholder="Seleccione subcategoría"
                    className="w-4/12"
                    value={subcategoria}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      menuList: (base) => ({ ...base, color: 'black' }),
                    }}
                    options={
                      getSubAndTaskRes !== undefined &&
                      getSubAndTaskRes.status === 200
                        ? getSubAndTaskRes.result.mtSubCategories.map(
                            (item: any) => ({
                              label: item.name,
                              value: item.id,
                            }),
                          )
                        : []
                    }
                    onChange={(option: any) => setSubcategoria(option)}
                  />
                </div>
                <div className="bg-gray-100 p-2">
                  {getSubAndTaskRes !== undefined &&
                  getSubAndTaskRes.status === 200 &&
                  getSubAndTaskRes !== null ? (
                    <div className="mb-4">
                      {' '}
                      <p className="text-base text-black">Especialidades</p>
                    </div>
                  ) : null}
                  <div className="mb-6 grid gap-6 md:grid-cols-3">
                    {getSubAndTaskRes !== undefined &&
                    getSubAndTaskRes.status === 200 &&
                    subcategoria !== null &&
                    espRes !== undefined &&
                    espRes.status === 200 ? (
                      getSubAndTaskRes.result.projectTaskGroupInfos
                        .filter(
                          (el: any) =>
                            el.mtSubCategoryActionId === subcategoria['value'],
                        )
                        .map((item: any, idx: number) => (
                          <>
                            <div
                              key={idx}
                              className="m-2 w-full rounded-lg border border-gray-200 bg-white text-base font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                              <div
                                aria-current="true"
                                className="block w-full cursor-pointer rounded-t-lg border-b border-gray-200 bg-blue-700 px-4 py-2 text-white dark:border-gray-600 dark:bg-gray-800"
                              >
                                {
                                  espRes.result.filter(
                                    (esp: any) =>
                                      esp.id === item.mtSpecialtyActionId,
                                  )[0].name
                                }
                              </div>
                              {item.projectTaskInfos.filter(
                                (task: any) => task.enable,
                              ).length > 0 ? (
                                item.projectTaskInfos.map(
                                  (task: any, taskIdx: number) => {
                                    let generateLink: string | undefined

                                    if (task.processFormId !== 6) {
                                      generateLink = generateTaskLink(
                                        task.id,
                                        task.processFormId,
                                        item.mtSpecialtyActionId,
                                      )
                                    } else {
                                      const actionId =
                                        item.projectTaskInfos.find(
                                          (task: any) =>
                                            task.processFormId === 4,
                                        )?.id

                                      generateLink = generateTaskLink(
                                        task.id,
                                        task.processFormId,
                                        item.mtSpecialtyActionId,
                                        actionId,
                                      )
                                    }
                                    return task.enable ? (
                                      <Link
                                        key={crypto.randomUUID()}
                                        href={`${generateLink}`}
                                        className="block w-full cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
                                      >
                                        {task.taskName} {task.id}
                                      </Link>
                                    ) : null
                                  },
                                )
                              ) : (
                                <p className="p-4">
                                  No hay tareas habilitadas para esta
                                  especialidad
                                </p>
                              )}
                            </div>
                          </>
                        ))
                    ) : (
                      <p className="mt-6 text-black">
                        Al seleccionar una subcategoria se mostrara las
                        especialidades con sus respectivos formularios de
                        procesos
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : null}
            {tab === 'consultas' ? (
              <div className="mb-6 grid gap-6 md:grid-cols-3">
                <div className="w-full">
                  <h3 className="ml-4 text-xl">Mediciones</h3>
                  <ul className="w-full">
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Mediciones Fichas de campo
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Mediciones resumen unidades simples
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Mediciones resumen unidades compuestas
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Mediciones resumen actuaciones 1
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Mediciones resumen actuaciones 2
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="w-full">
                  <h3 className="ml-4 text-xl">Presupuesto</h3>
                  <ul className="w-full">
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        P x Q Unidades simples
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        P x Q Unidades compuestas
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        P x Q Actuaciones 1
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        P x Q Actuaciones 2
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Ratio P Actualizado
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}

            {tab === 'presupuesto' ? (
              <div className="mb-6 grid gap-6 md:grid-cols-3">
                <div className="w-full">
                  <ul className="w-full">
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Actuaciones diferidas
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Actuaciones manuales
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Editar plantilla
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="w-full">
                  <ul className="w-full">
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Planificacion de tareas preconstructivas
                      </button>
                    </li>
                    <li className="p-2">
                      <button
                        type="button"
                        className="mb-2 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Planificacion de mensualizacion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {modalClone ? (
          <ModalDuplicateProject
            titulo={`Clonar proyecto`}
            mensaje={`¿Estás seguro de que deseas clonar el proyecto "${data.result.name}"? `}
            onClose={() => handleCloseModal('')}
            onClone={() => handleClone()}
          />
        ) : null}
      </main>
    )
}
