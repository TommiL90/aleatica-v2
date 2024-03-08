'use client'
import RepoDeterioroForm from '@/components/forms/repoDeterioro'

import Breadcrumbs from '@/components/breadcrumbs'

import { useParams } from 'next/navigation'
import { useRouter } from '@/navigation'

import Loading from '@/components/loading'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import ErrorComponent from '@/components/error'

const updater = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string
      code: string
      mtSpecialtyActionId: string | number
    }
  },
) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export default function RepoDeteriorosEditar() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { data, mutate, error, isLoading } = useSWR(
    params
      ? `${process.env.API_URL}/MtDeteriorationType/FindById/${params.id}`
      : null,
    fetcher,
  )
  const { data: subcategoryRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: especialityRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const mutation = useSWRMutation(
    `${process.env.API_URL}/MtDeteriorationType/Update/${params.id}`,
    updater,
  )

  const saveDeterioro = async (values: any): Promise<any> => {
    let toastId

    try {
      toastId = toast.loading('Enviando... 🚀')

      console.log(values)

      // Submit data
      const item: any = {
        id: values.id,
        name: values.nombreDeterioro,
        code: values.codigoDeterioro,
        mtSpecialtyActionId: values.especialidad,
      }
      const result = await mutation.trigger(item)

      if (result != undefined && result.status === 200) {
        console.log(result)
        toast.success('Enviado con éxito 🙌', { id: toastId })
        await router.push('/maestros/deterioros')
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
    { label: 'Deterioros', link: '/maestros/deterioros' },
    { label: 'Editar', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          {isLoading || mutation.isMutating ? (
            <Loading label="Actualizando ..." />
          ) : error || mutation.error ? (
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
                Deterioro
              </h1>
              <RepoDeterioroForm
                subCategoria={
                  subcategoryRes !== undefined && subcategoryRes.status === 200
                    ? subcategoryRes.result.map((item: any) => ({
                        label: item.text,
                        value: item.value,
                      }))
                    : []
                }
                especialidad={
                  especialityRes !== undefined && especialityRes.status === 200
                    ? especialityRes.result.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                        mtActionSubCategoryId: item.mtActionSubCategoryId,
                      }))
                    : []
                }
                initValue={
                  data !== undefined && data.status == 200
                    ? {
                        id: data.result.id,
                        codigoDeterioro: data.result.code,
                        nombreDeterioro: data.result.name,
                        subCategoria: data.result.mtActionSubCategoryId,
                        especialidad: data.result.mtSpecialtyActionId,
                      }
                    : null
                }
                buttonText="Guardar"
                onSubmit={saveDeterioro}
              />
            </div>
          )}
        </div>
      </section>

      {/* <Footer></Footer> */}
    </main>
  )
}
