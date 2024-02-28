'use client'

import { cn } from '@/lib/utils'
import fetcher from '@/services/fetcher'
import { disjoinLists } from '@/utils/disjoin-lists'
import { ChangeEvent, useEffect, useId, useState } from 'react'
import Select from 'react-select'
import useSWRImmutable from 'swr/immutable'

interface UnidadesSimplesProps {
  // simplesList: any[];
  especialidad: number
  simplesSelected: any[]
  onChange: Function
}

const ids: string[] = []

interface SubCategory {
  value: string
  label: string
}

interface Specialty {
  value: number
  label: string
}

interface SimplyUN {
  id: string
  label: string
  value: number
  global: boolean
  subcategoryId: string
  especialityId: number
  especialityName: string
  description: string
}

export function UnidadesSimples(props: UnidadesSimplesProps) {
  const { data: subcatRes } = useSWRImmutable(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: espRes } = useSWRImmutable(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const { data: udSimplesRes } = useSWRImmutable(
    `${process.env.API_URL}/SimpleCatalog/GetAll`,
    fetcher,
  )
  const [currentSelectValue, setCurrentSelectValue] = useState(null)
  const [items, setItems] = useState(props.simplesSelected)
  const [_document, set_document] = useState<Document>()
  const [specialties, setSpecialties] = useState<Specialty[]>([] as Specialty[])
  const [simplyUn, setSimplyUn] = useState<SimplyUN[]>([] as SimplyUN[])

  const newId = useId()
  const subCategoryOptions = subcatRes.result.map((s: any) => ({
    value: s.value,
    label: s.text,
  }))

  for (let i = 0; i < props.simplesSelected.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  const handleAgregarEspecialidad = (e: any, id: any) => {
    if (currentSelectValue == null) {
      return
    }
    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        label: currentSelectValue['label'],
        value: currentSelectValue['value'],
      },
    ]

    setItems(list)
    setCurrentSelectValue(null)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarUnidad = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = items.filter((item) => item['value'] !== id)
    console.log(list)
    setItems(list)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  // console.log(simplyUn)
  // console.log(props.simplesList)

  const handleChangeSubCategory = (subCategory: any) => {
    const specialtyOptions = espRes.result.reduce(
      (options: Specialty[], e: any) => {
        if (e.mtSubCategoryActionId === Number(subCategory.value)) {
          options.push({ value: Number(e.id), label: e.name })
        }
        return options
      },
      [],
    )

    setSpecialties(specialtyOptions)
  }

  const handleChangeSpecialty = (specialty: any) => {
    const udSimpleOptions = udSimplesRes.result.reduce(
      (options: SimplyUN[], e: any) => {
        if (e.mtSpecialtyActionId === specialty.value) {
          options.push({
            id: e.simpleUdId,
            label: e.simpleUdName,
            value: e.id,
            global: e.global,
            subcategoryId: e.mtSubCategoryActionId,
            especialityId: e.mtSpecialtyActionId,
            especialityName: e.mtSpecialtyAction,
            description: e.description,
          })
        }
        return options
      },
      [],
    )
    setSimplyUn(udSimpleOptions)
  }

  useEffect(() => {
    set_document(document)
  }, [])

  return (
    <div className="mb-4">
      <div className="flex w-full">
        <div className="w-7/12">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="Subcategoría de Actuación"
                className="mb-4 font-semibold text-gray-800"
              >
                {' '}
                Subcategoría de Actuación
              </label>
              <Select
                name="Subcategoría de Actuación"
                id="Subcategoría de Actuación"
                placeholder="Seleccione subcategoría de actuación"
                className="mt-2 block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                options={subCategoryOptions}
                onChange={handleChangeSubCategory}
              />
            </div>
            <div>
              <label
                htmlFor="Espcialidad de Actuación"
                className="mb-4 font-semibold text-gray-800"
              >
                {' '}
                Especialidad de Actuación
              </label>
              <Select
                name="Selecciones especialidad de actuación"
                id="Subcategoría de Actuación"
                placeholder="Inserte unidad simple"
                isDisabled={specialties.length === 0}
                className="mt-2 block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                options={specialties}
                onChange={handleChangeSpecialty}
              />
            </div>
            <div>
              <label className="mb-4 font-semibold text-gray-800">
                {' '}
                Unidad simple
              </label>
              <Select
                id="newEntry"
                instanceId={newId}
                placeholder="Selecciones unidad simple"
                isDisabled={simplyUn.length === 0}
                className="mt-2 block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                options={[
                  {
                    options: disjoinLists(simplyUn, items, 'value'),
                  },
                ]}
                value={currentSelectValue}
                onChange={(newValue: any) => setCurrentSelectValue(newValue)}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menuList: (base) => ({ ...base, color: 'black' }),
                }}
                menuPortalTarget={_document?.body}
                menuPlacement="auto"
              />
            </div>
          </div>
          <div className="mb-4 mt-2">
            <button
              disabled={currentSelectValue === null}
              onClick={(e: any) => handleAgregarEspecialidad(e, 0)}
              type="button"
              className={cn(
                'w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto',
                currentSelectValue !== null
                  ? 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  : 'border-blue-300 bg-blue-400 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
              )}
            >
              Adicionar especialidad
            </button>
          </div>
          <div>
            <label className="mb-4 font-semibold text-gray-800"> Codigo</label>
            <p className="m-4 text-sm text-gray-600">
              {currentSelectValue !== null ? currentSelectValue['id'] : `-`}
            </p>
          </div>
          <div>
            <label className="mb-4 font-semibold text-gray-800">
              {' '}
              Descripcion
            </label>
            <div className="max-h-[200px] overflow-y-auto">
              <p className="m-4 text-sm text-gray-600">
                {currentSelectValue !== null
                  ? currentSelectValue['description']
                  : '-'}
              </p>
            </div>
          </div>
          <div>
            <label className="mb-4 font-semibold text-gray-800">
              {' '}
              Subcategoria / Especialidad
            </label>
            <p className="m-4 text-sm text-gray-600">
              {currentSelectValue !== null && simplyUn.length > 0
                ? simplyUn.filter(
                    (item: any) => item.value === currentSelectValue['value'],
                  )[0].especialityName
                : `-`}
              /
              {currentSelectValue !== null && simplyUn.length > 0
                ? simplyUn.filter(
                    (item: any) => item.value === currentSelectValue['value'],
                  )[0].especialityName
                : `-`}
            </p>
          </div>
        </div>
        <div className="mx-2 h-[430px] w-5/12  border-l">
          <h2
            className={cn(
              'py-2 pl-2 text-xs font-semibold uppercase text-gray-700',
              props.simplesSelected.length === 0
                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-400',
            )}
          >
            Unidades simples agregadas
          </h2>
          <div className="h-[420px] w-full overflow-y-scroll">
            <ul className="mb-2 ml-2 ">
              {items.length > 0 ? (
                items.map((item: any, idx: number) => (
                  <span
                    key={idx}
                    id="badge-dismiss-green"
                    className="me-2 mt-2 inline-flex items-center rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    {item.label}
                    <button
                      type="button"
                      onClick={(e: any) => handleEliminarUnidad(e, item.value)}
                      className="ms-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-green-400 hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                      aria-label="Remove"
                    >
                      <svg
                        className="h-2 w-2"
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
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                ))
              ) : (
                <li className="my-8 bg-white text-sm  hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  No hay unidades simples para esta unidad compuesta.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
