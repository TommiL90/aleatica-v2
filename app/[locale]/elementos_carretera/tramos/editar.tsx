import CatalogoTramosForm from '@/components/forms/catalogoTramos'

import Header from '@/components/header'
import Breadcrumbs from '@/components/breadcrumbs'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/components/loading'

import fetcher from '@/services/fetcher'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'
import { useState } from 'react'
import ErrorComponent from '@/components/error'

const updater = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      id: number
      code: string
      name: string
      highDate: string
      lowDate: string
      modificationDate: string
      state: boolean
      mtBusinessUnitId: string | number
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

export default function CatalogoTramosEditar() {
  const params = useParams<{ id: string }>()
  const { data: unitRes } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: entronqueRes } = useSWR(
    `${process.env.API_URL}/MtHighwayIntersection/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: gazaRes } = useSWR(
    `${process.env.API_URL}/MtSlipLaneRoad/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data, mutate, error, isLoading } = useSWR(
    params
      ? `${process.env.API_URL}/MtRoadSection/FindById/${params.id}`
      : null,
    fetcher,
  )
  const mutation = useSWRMutation(
    `${process.env.API_URL}/MtRoadSection/Update/${params.id}`,
    updater /* options */,
  )
  const [failure, setFailure] = useState<any>(null)

  const saveTramo = async (values: any): Promise<any> => {
    let toastId

    console.log(values)

    try {
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      const item: any = {
        id: params.id,
        name: values.nombreTramo,
        code: values.codigoTramo,
        highDate: values.fechaAlta,
        lowDate: values.fechaBaja,
        modificationDate: values.fechaAlta,
        state: values.activo,
        mtBusinessUnitId: values.unidadNegocio,
        mtRoadSectionMtHighwayIntersections: values.entronques.map(
          (item: any) => ({
            highDate: item.fechaAlta,
            lowDate: item.fechaBaja,
            modificationDate: item.fechaModificacion,
            state: item.estado,
            mtRoadSectionId: 0,
            mtHighwayIntersectionId: item.value,

            mtHighwayIntersectionMtSlipLaneRoadDtos: item.gazas.map(
              (gaza: any) => ({
                highDate: gaza.fechaAlta,
                lowDate: gaza.fechaBaja,
                modificationDate: gaza.fechaModificacion,
                state: gaza.estado,
                mtRoadSectionId: 0,
                mtHighwayIntersectionId: item.value,
                mtSlipLaneRoadId: gaza.value,
              }),
            ),
          }),
        ),
      }

      const result = await mutation.trigger(item)
      if (result != undefined && result.status === 200) {
        toast.success('Enviado con éxito 🙌', { id: toastId })
      }

      if (result != undefined && result.status >= 400) {
        toast.error('No se puede enviar 😱', { id: toastId })
      }
    } catch (e) {
      console.log(e)
      toast.error('No se puede enviar 😱', { id: toastId })
    }
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Tramos', link: '/elementos_carretera/tramos' },
    { label: 'Editar', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="lg:w-12/12 max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto w-10/12 px-4 pb-8 pt-8">
          {isLoading || mutation.isMutating ? (
            <Loading label="Actualizando ..." />
          ) : error || mutation.error ? (
            <ErrorComponent
              label="Error"
              description="Ha ocurrido algun problema al contactar con el servidor"
            />
          ) : (
            <div className="w-full">
              {mutation.data != undefined && mutation.data.status >= 400 ? (
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
                      {Object.keys(mutation.data.errors).map(
                        (key: string, idx: number) =>
                          mutation.data.errors[key].map(
                            (item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            ),
                          ),
                      )}
                    </ul>
                  </div>
                </div>
              ) : null}
              <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white">
                Catalogo de tramo
              </h1>
              <CatalogoTramosForm
                units={
                  unitRes !== undefined && unitRes.status === 200
                    ? unitRes.result.map((item: any) => ({
                        label: item.text,
                        value: item.value,
                      }))
                    : []
                }
                entronques={
                  entronqueRes !== undefined && entronqueRes.status === 200
                    ? entronqueRes.result.map((item: any) => ({
                        label: item.text,
                        value: item.value,
                      }))
                    : []
                }
                gazas={
                  gazaRes !== undefined && gazaRes.status === 200
                    ? gazaRes.result.map((item: any) => ({
                        label: item.text,
                        value: item.value,
                      }))
                    : []
                }
                initValue={
                  data !== undefined && data.status == 200
                    ? {
                        id: data.result.id,
                        nombreTramo: data.result.name,
                        codigoTramo: data.result.code,
                        fechaAlta: data.result.highDate.split('T')[0],
                        fechaBaja: data.result.lowDate.split('T')[0],
                        activo: data.result.state,

                        entronques:
                          data.result.mtRoadSectionMtHighwayIntersections.map(
                            (item: any) => ({
                              id: item.id,
                              label: item.mtHighwayIntersection,
                              value: item.mtHighwayIntersectionId,
                              fechaAlta: item.highDate.split('T')[0],
                              fechaBaja: item.lowDate.split('T')[0],
                              fechaModificacion:
                                item.modificationDate.split('T')[0],
                              estado: item.state,
                              gazas:
                                item.mtHighwayIntersectionMtSlipLaneRoadDto.map(
                                  (gaza: any) => ({
                                    id: gaza.id,
                                    entronque: item.mtHighwayIntersectionId,
                                    label: gaza.mtSlipLaneRoad,
                                    value: gaza.mtSlipLaneRoadId,
                                    fechaAlta: gaza.highDate.split('T')[0],
                                    fechaBaja: gaza.lowDate.split('T')[0],
                                    fechaModificacion:
                                      gaza.modificationDate.split('T')[0],
                                    estado: gaza.state,
                                  }),
                                ),
                            }),
                          ),

                        unidadNegocio: data.result.mtBusinessUnitId,
                      }
                    : null
                }
                entronquesXtramos={
                  data !== undefined && data.status == 200
                    ? data.result.mtRoadSectionMtHighwayIntersections
                    : []
                }
                buttonText="Guardar"
                onSubmit={saveTramo}
              />
            </div>
          )}
        </div>
      </section>
      {/* <Footer></Footer> */}
    </main>
  )
}
