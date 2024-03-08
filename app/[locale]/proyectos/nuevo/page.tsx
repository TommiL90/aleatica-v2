'use client'
import ProyectoForm from '@/components/forms/proyecto'

import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import useSWR from 'swr'
import Breadcrumbs from '@/components/breadcrumbs'
import fetcher from '@/services/fetcher'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Loading from '@/components/loading'

const creator = async (
  url: string,
  {
    arg,
  }: {
    arg: {
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
    method: 'POST',
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
        mtProcessFormId: Number(task.formularioProceso),
        userId: task.responsables ? Number(task.responsables.value) : 0,
        startDate: new Date(task.fechaInicio).toISOString(),
        endDate: new Date(task.fechaFinal).toISOString(),
        dependency: task.dependencia,
        enable: task.habilitado,
        needAdvisors: task.necesidad,
        responsiblesForApprovingIds: task.aprobado.map((user: any) =>
          Number(user.value),
        ),
      })),
    ),
  )
}

export default function ProyectoNuevo() {
  const { data: unitRes } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const {
    data: yearRes,
    mutate,
    isLoading,
  } = useSWR(`${process.env.API_URL}/MtYear/GetAll`, fetcher)
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
  const { data, trigger, error, isMutating } = useSWRMutation(
    `${process.env.API_URL}/Project/Create`,
    creator /* options */,
  )
  const [failure, setFailure] = useState<any>(null)
  const router = useRouter()

  const saveProyecto = async (values: any): Promise<any> => {
    let toastId
    // console.log(values);

    try {
      toastId = toast.loading('Enviando... 🚀')

      // console.log(values);
      // return;

      // Submit data
      const item: any = {
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
      const result = await trigger(item)

      if (result != undefined && result.status === 201) {
        console.log(result)
        toast.success('Enviado con éxito 🙌', { id: toastId })
        router.push('/proyectos')
      }

      if (result != undefined && result.status >= 400) {
        toast.error('No se puede enviar 😱', { id: toastId })
      }
    } catch (e) {
      const message: string = (e as any).info.errorMessage

      if (message.includes('Cannot insert duplicate key row in object')) {
        toast.error('Nombre de proyecto ya existe 😱', { id: toastId })
        return
      }

      toast.error('No se puede enviar 😱', { id: toastId })
    }
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Proyectos', link: '/proyectos' },
    { label: 'Nuevo', link: null },
  ]

  if (error) console.log(error)

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          {isMutating ? (
            <Loading label="Actualizando ..." />
          ) : (
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
              <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white">
                Proyecto
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
                initValue={null}
                buttonText="Guardar"
                onSubmit={saveProyecto}
              />
            </div>
          )}
        </div>
      </section>

      {/* <Footer></Footer> */}
    </main>
  )
}
