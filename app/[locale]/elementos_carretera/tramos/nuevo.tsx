import CatalogoTramosForm from '@/components/forms/catalogoTramos'

import Breadcrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'

import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import { toast } from 'sonner'

import fetcher from '@/services/fetcher'
import useSWR from 'swr'

import { IoMdArrowDropright } from 'react-icons/io'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import {
  FaEdit,
  FaRegTrashAlt,
  FaPlus,
  FaCheckSquare,
  FaSquare,
  FaMinusSquare,
} from 'react-icons/fa'
import classNames from 'classnames'

const creator = async (
  url: string,
  {
    arg,
  }: {
    arg: {
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export default function CatalogoTramosNuevo() {
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
  const { data, trigger, error, isMutating } = useSWRMutation(
    `${process.env.API_URL}/MtRoadSection/Create`,
    creator /* options */,
  )

  const saveTramo = async (values: any): Promise<any> => {
    let toastId

    console.log(values)

    try {
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      const item: any = {
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
      console.log('dsasda')
      const result = await trigger(item)
      if (result != undefined && result.status === 201) {
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
    { label: 'Nuevo', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="lg:w-12/12 max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto w-10/12 px-4 pb-8 pt-8">
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
                entronquesXtramos={
                  data !== undefined && data.status == 200
                    ? data.result.mtRoadSectionMtHighwayIntersections
                    : []
                }
                initValue={null}
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
