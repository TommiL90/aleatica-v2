'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import fetcher from '../../../services/fetcher'
import Breadcrumbs from '../../../components/breadcrumbs'
import Loading from '../../../components/loading'
import { toast } from 'sonner'
import ProyectoForm from '@/components/forms/proyecto'

const updater = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      id: number
      code: string
      version: string
      name: string
      description: string
      mtBusinessUnitId: number
      mtYearId: number
      responsiblesIds: number[]
      projectTasks: any[]
    }
  },
) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as any
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

const generateTaskList = (array: any[]) => {
  if (!array) return

  // let result = array.reduce((acc, curr) => {
  //     let foundIndex = acc.findIndex((item: any) => item.especialidad === curr.mtSpecialtyActionId);

  // const task = {
  //     id: curr.mtProcessFormId,
  //     name: curr.name,
  //     responsables: curr.user ? {label: curr.user.userName, value: curr.user.id} : null,//.responsibles.map((user: any)=>({label: user.userName, value: user.id})),
  //     dependencia: curr.dependency,
  //     necesidad: curr.needAdvisors,
  //     fechaInicio: curr.startDate.split("T")[0],
  //     fechaFinal: curr.endDate.split("T")[0],
  //     aprobado: curr.responsiblesForApproving.map((user: any)=>({label: user.userName, value: user.id})),
  //     habilitado: curr.enable
  // };

  //     if (foundIndex !== -1) {
  //       acc[foundIndex].tasks.push(task);
  //     } else {
  //       acc.push({
  //         especialidad: String(curr.mtSpecialtyActionId),
  //         tasks: [task]
  //       });
  //     }
  //     return acc;
  //   }, []);

  const grouped = array.reduce((acc, curr) => {
    const key = curr.mtSpecialtyActionId
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push({
      id: curr.id,
      formularioProceso: curr.mtProcessFormId,
      name: curr.name,
      responsables: curr.user
        ? { label: curr.user.userName, value: curr.user.id }
        : null, // .responsibles.map((user: any)=>({label: user.userName, value: user.id})),
      dependencia: curr.dependency,
      necesidad: curr.needAdvisors,
      fechaInicio: curr.startDate.split('T')[0],
      fechaFinal: curr.endDate.split('T')[0],
      aprobado: curr.responsiblesForApproving.map((user: any) => ({
        label: user.userName,
        value: user.id,
      })),
      habilitado: curr.enable,
    })
    return acc
  }, {})

  const result = Object.keys(grouped).map((key) => ({
    especialidad: key,
    tasks: grouped[key],
  }))

  console.log(result)

  // console.log(result);

  return result
}

const flattenArrays = (arrayList: Array<Array<any>>): any[] => {
  let result: any[] = []
  for (let i = 0; i < arrayList.length; i++) {
    result = result.concat(arrayList[i])
  }
  return result
}

const projectTasksFormat = (tasks: any[]) => {
  return flattenArrays(
    tasks.map((item: any) =>
      item.tasks.map((task: any) => ({
        mtSpecialtyActionId: Number(item.especialidad),
        id: Number(task.id),
        mtProcessFormId: Number(task.formularioProceso),
        userId: task.responsables ? Number(task.responsables.value) : 0,
        startDate: new Date(task.fechaInicio).toISOString(),
        endDate: new Date(task.fechaFinal).toISOString(),
        dependency: task.dependencia,
        needAdvisors: task.necesidad,
        enable: task.habilitado,
        responsiblesForApprovingIds: task.aprobado.map((user: any) =>
          Number(user.value),
        ),
      })),
    ),
  )
}

const ProyectoEditar = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  const { data: unitRes } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: yearRes } = useSWR(
    `${process.env.API_URL}/MtYear/GetAll`,
    fetcher,
  )
  const { data: formRes } = useSWR(
    `${process.env.API_URL}/MtProcessForm/GetAll`,
    fetcher,
  )
  const { data: subcatRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: espRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const { data: userRes } = useSWR(
    `${process.env.API_URL}/User/GetAll`,
    fetcher,
  )
  const { data, mutate, error, isLoading } = useSWR(
    id ? `${process.env.API_URL}/Project/FindById/${id}` : '',
    fetcher,
  )

  const mutation = useSWRMutation(
    `${process.env.API_URL}/Project/Update/${id}`,
    updater /* options */,
  )

  console.log(data)

  const saveProyecto = async (values: any): Promise<any> => {
    let toastId

    try {
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      const item: any = {
        id,
        code: data.result.code,
        version: data.result.version,
        name: values.nombreProyecto,
        description: values.descripcionProyecto,
        mtBusinessUnitId: Number(values.unidadNegocio),
        mtYearId: Number(values.year),
        responsiblesIds: values.responsables.map((item: any) =>
          Number(item.value),
        ),
        projectTasks: projectTasksFormat(values.tareas),
      }

      console.log(item)
      const result = await mutation.trigger(item)

      if (result != undefined && result.status === 200) {
        toast.success('Enviado con éxito 🙌', { id: toastId })
        router.push('/proyectos')
      }

      if (result != undefined && result.status >= 400) {
        toast.error('No se puede enviar 😱', { id: toastId })
      }
    } catch (e) {
      toast.error('No se puede enviar 😱', { id: toastId })
    }
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Proyectos', link: '/proyectos' },
    { label: 'Editar', link: null },
  ]

  return (
    <main>
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          {isLoading || mutation.isMutating ? (
            <Loading label="Actualizando ..." />
          ) : (
            <div className="w-full md:mx-auto md:w-10/12 lg:mx-auto lg:w-10/12 xl:mx-auto xl:w-10/12">
              {error || mutation.error ? (
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
                    <div className="mt-4">
                      {error
                        ? error.info.errorMessage
                        : mutation.error.info.errorMessage}
                    </div>
                  </div>
                </div>
              ) : null}
              <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white">
                Unidad de negocio
              </h1>
              <ProyectoForm
                units={
                  unitRes !== undefined && unitRes.status === 200
                    ? unitRes.result.map((item: any) => ({
                        label: item.text,
                        value: item.value,
                      }))
                    : []
                }
                years={
                  yearRes !== undefined && yearRes.status === 200
                    ? yearRes.result.map((item: any) => ({
                        label: item.year,
                        value: item.id,
                      }))
                    : []
                }
                users={
                  userRes !== undefined && userRes.status === 200
                    ? userRes.result.map((item: any) => ({
                        label: item.userName,
                        value: item.id,
                      }))
                    : []
                }
                subcategorias={
                  subcatRes !== undefined && subcatRes.status === 200
                    ? subcatRes.result.map((item: any) => ({
                        label: item.text,
                        value: item.value,
                      }))
                    : []
                }
                especialidades={
                  espRes !== undefined && espRes.status === 200
                    ? espRes.result.map((item: any) => ({
                        label: item.name,
                        value: String(item.id),
                        subcategory: item.mtSubCategoryActionId,
                      }))
                    : []
                }
                processForms={
                  formRes !== undefined && formRes.status === 200
                    ? formRes.result
                    : []
                }
                initValue={
                  data !== undefined && data.status == 200
                    ? {
                        nombreProyecto: data.result.name,
                        descripcionProyecto: data.result.description,
                        unidadNegocio: data.result.mtBusinessUnitId,
                        year: Number(data.result.mtYearId),
                        responsables: data.result.responsibles.map(
                          (user: any) => ({
                            label: user.userName,
                            value: user.id,
                          }),
                        ),
                        tareas: generateTaskList(data.result.projectTasks),
                      }
                    : null
                }
                buttonText="Guardar"
                onSubmit={saveProyecto}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default ProyectoEditar
