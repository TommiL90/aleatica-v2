import axios from 'axios'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Link } from '@/navigation'
import 'swiper/css'
import CatalogoTCAForm from '@/components/forms/catalogoTCA'

import Header from '@/components/header'
import Breadcrumbs from '@/components/breadcrumbs'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import fetcher from '@/services/fetcher'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'
import Loading from '@/components/loading'

const updater = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      id: number
      name: string
      description: string
      mtRoadSectionId: 0
      mtHighwayIntersectionId: 0
      mtSlipLaneRoadId: 0
      initialNumber: 0
      endNumber: 0
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

export default function CatalogoTCAEditar() {
  const params = useParams<{ id: string }>()
  const { data: businessUnitRes } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetAll`,
    fetcher,
  )
  const { data: tramoRes } = useSWR(
    `${process.env.API_URL}/MtRoadSection/GetAll`,
    fetcher,
  )
  const { data: entronqueRes } = useSWR(
    `${process.env.API_URL}/MtHighwayIntersection/GetAll`,
    fetcher,
  )
  const { data: gazaRes } = useSWR(
    `${process.env.API_URL}/MtSlipLaneRoad/GetAll`,
    fetcher,
  )
  const { data, isLoading } = useSWR(
    params
      ? `${process.env.API_URL}/MtAccidentRoadSection/FindById/${params.id}`
      : null,
    fetcher,
  )
  const mutation = useSWRMutation(
    `${process.env.API_URL}/MtAccidentRoadSection/Update/${params.id}`,
    updater /* options */,
  )

  if (isLoading) return <Loading label="" />

  console.log(data)

  const saveTCA = async (values: any): Promise<any> => {
    let toastId

    console.log(values)

    try {
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      const item: any = {
        id: params.id,
        name: values.nombre,
        description: values.descripcionTCA,
        mtRoadSectionId: values.tramo,
        mtHighwayIntersectionId: values.entronque,
        mtSlipLaneRoadId: values.gaza,
        initialNumber: values.cadenamientoInicial,
        endNumber: values.cadenamientoFinal,
      }
      console.log('dsasda')
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
    {
      label: 'Tramos de concentracion de accidentes',
      link: '/elementos_carretera/tca',
    },
    { label: 'Editar', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="w-full md:mx-auto md:w-10/12 lg:mx-auto lg:w-10/12 xl:mx-auto xl:w-10/12">
            <h1 className="mb-4 max-w-2xl text-xl font-extrabold leading-none tracking-tight dark:text-white">
              Tramos de concentracion de accidentes
            </h1>
            <CatalogoTCAForm
              unidadNegocio={
                businessUnitRes !== undefined && businessUnitRes.status === 200
                  ? businessUnitRes.result.map((item: any) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
              tramos={
                tramoRes !== undefined && tramoRes.status === 200
                  ? tramoRes.result.map((item: any) => ({
                      label: item.name,
                      value: item.id,
                      unidadNEgocio: item.mtBusinessUnitId,
                      entronques: item.mtRoadSectionMtHighwayIntersections.map(
                        (entronque: any) => ({
                          label: entronque.mtHighwayIntersection,
                          value: entronque.mtHighwayIntersectionId,
                          gazas:
                            entronque.mtHighwayIntersectionMtSlipLaneRoadDto.map(
                              (gaza: any) => ({
                                label: gaza.mtSlipLaneRoad,
                                value: gaza.mtSlipLaneRoadId,
                              }),
                            ),
                        }),
                      ),
                    }))
                  : []
              }
              entronques={
                entronqueRes !== undefined && entronqueRes.status === 200
                  ? entronqueRes.result.map((item: any) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
              gazas={
                gazaRes !== undefined && gazaRes.status === 200
                  ? gazaRes.result.map((item: any) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
              initValue={
                data !== undefined && data.status == 200
                  ? {
                      unidadNegocio: 22,
                      nombre: data.result.name,
                      tramo: data.result.mtRoadSectionId,
                      entronque: data.result.mtHighwayIntersectionId,
                      gaza: data.result.mtSlipLaneRoadId,
                      descripcionTCA: data.result.description,
                      cadenamientoInicial: data.result.initialNumber,
                      cadenamientoFinal: data.result.endNumber,
                    }
                  : null
              }
              buttonText="Guardar"
              onSubmit={saveTCA}
            />
          </div>
        </div>
      </section>
      {/* <Footer></Footer> */}
    </main>
  )
}
