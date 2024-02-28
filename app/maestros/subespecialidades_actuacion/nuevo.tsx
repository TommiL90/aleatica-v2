import IndicadorSubEspecialidadForm from '@/components/forms/IndicadorSubEspecialidadForm'

import Breadcrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'

import useSWR from 'swr'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import ErrorComponent from '@/components/error'

const creator = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      code: string
      name: string
      mtSpecialtyActionId: number
      fatherId: number
    }
  },
) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export default function SubespecialidadesActuacionNuevo() {
  const {
    data: subespRes,
    mutate,
    isLoading,
  } = useSWR(`${process.env.API_URL}/MtSpecialtyAction/GetAll`, fetcher)
  const { data: subRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetAll`,
    fetcher,
  )
  const { data: padresRes } = useSWR(
    `${process.env.API_URL}/MtSubspeciality/GetAll`,
    fetcher,
  )
  const { data, trigger, error, isMutating } = useSWRMutation(
    `${process.env.API_URL}/MtSubspeciality/Create`,
    creator /* options */,
  )
  const [failure, setFailure] = useState<any>(null)
  const router = useRouter()

  const saveSubespecialidadActuacion = async (values: any): Promise<any> => {
    let toastId
    try {
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      const item: any = {
        name: values.nombre,
        code: values.codigo,
        mtSpecialtyActionId: parseInt(values.especialidad),
        fatherId: parseInt(values.padre) > 0 ? parseInt(values.padre) : null,
      }
      const result = await trigger(item)

      console.log(result)
      if (result != undefined && result.status === 201) {
        toast.success('Enviado con éxito 🙌', { id: toastId })
        router.push('/maestros/subespecialidades_actuacion')
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
    {
      label: 'Subespecialidades de actuacion',
      link: '/maestros/subespecialidades_actuacion',
    },
    { label: 'Nuevo', link: null },
  ]

  console.log(padresRes)

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          {isMutating ? (
            <Loading label="Actualizando ..." />
          ) : error ? (
            <ErrorComponent
              label="Error"
              description="Ha ocurrido algun problema al contactar con el servidor"
            />
          ) : (
            <div className="w-full md:mx-auto md:w-10/12 lg:mx-auto lg:w-10/12 xl:mx-auto xl:w-10/12">
              {data != undefined && data.status >= 400 ? (
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
                    <ul className="ml-4 mt-1.5 list-inside list-disc">
                      {Object.keys(data.errors).map(
                        (key: string, idx: number) =>
                          data.errors[key].map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )),
                      )}
                    </ul>
                  </div>
                </div>
              ) : null}
              <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white">
                Subespecialidad de actuacion
              </h1>
              <IndicadorSubEspecialidadForm
                subcategorias={
                  subRes !== undefined && subRes.status === 200
                    ? subRes.result.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                especialidades={
                  subespRes !== undefined && subespRes.status === 200
                    ? subespRes.result.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                        mtActionSubCategoryId: item.mtSubCategoryActionId,
                      }))
                    : []
                }
                padres={
                  padresRes !== undefined && padresRes.status === 200
                    ? padresRes.result.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                        mtSpecialtyActionId: item.mtSpecialtyActionId,
                      }))
                    : []
                }
                initValue={null}
                buttonText="Guardar"
                onSubmit={saveSubespecialidadActuacion}
              />
            </div>
          )}
        </div>
      </section>

      {/* <Footer></Footer> */}
    </main>
  )
}
