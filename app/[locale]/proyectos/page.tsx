'use client'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@/components/breadcrumbs'

import { useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { FaEdit, FaRegTrashAlt, FaRegClone } from 'react-icons/fa'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import Table from '@/components/tables/table'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  mtBusinessUnit: string
  name: string
  description: string
}

interface Project {
  mtBusinessUnit: string
  mtYear: string
  code: string
  version: string
  type: string
  projectTasks: any[]
  responsibles: any[]
  name: string
  description: string
  conclusion?: any
  mtBusinessUnitId: number
  status: number
  mtYearId: number
  id: number
}

interface Result {
  currentPage: number
  pageCount: number
  pageSize: number
  recordCount: number
  results: Project[]
}

interface Data {
  status: number
  result: Result
  errorMessage?: any
}

interface MenuItem {
  id: string
  label: string
  codigo: string
  link: string
  menu: MenuItem[]
}

const mapFieldsOrdered = [
  { fieldName: 'name', fieldType: 'string' },
  { fieldName: 'description', fieldType: 'string' },
  { fieldName: 'unit', fieldType: 'string' },
  { fieldName: 'version', fieldType: 'string' },
  { fieldName: 'task', fieldType: 'link' },
  { fieldName: 'type', fieldType: 'string' },
]

export default function Proyectos() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const { data: unidadRes } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetAll`,
    fetcher,
  )
  const { data: yearRes } = useSWR(
    `${process.env.API_URL}/MtYear/GetAll`,
    fetcher,
  )
  const [filtroUnidad, setFiltroUnidad] = useState('')
  const [filtroYear, setFiltroYear] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')

  const { data: subcatRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher,
  )
  const { data: espRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )

  const { data, mutate, isLoading } = useSWR<Data>(
    `${process.env.API_URL}/Project/GetAllPaginated?Page=${pageIndex}&PageSize=${pageSize}&SearchByProp=Code&SearchCriteria=${searchInput}&MtBusinessUnitId=${filtroUnidad}&MtYearId=${filtroYear}&Type=${filtroTipo}`,
    fetcher,
  )

  // No se usa
  const mutation = useSWRMutation(
    `${process.env.API_URL}/Project/DeleteAll`,
    fetcher,
  )
  const router = useRouter()

  const [modalDelete, setModalDelete] = useState(false)

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const menuItems: MenuItem[] = []

  if (subcatRes && espRes) {
    const subcategorias =
      subcatRes !== undefined && subcatRes.status === 200
        ? subcatRes.result.map((item: any) => ({
            label: item.text,
            value: item.value,
          }))
        : []

    const especialidades =
      espRes !== undefined && espRes.status === 200
        ? espRes.result.map((el: any) => ({
            label: el.name,
            value: String(el.id),
            subcategory: String(el.mtSubCategoryActionId),
          }))
        : []

    for (let i = 0; i < subcategorias.length; i++) {
      const item: MenuItem = {
        id: crypto.randomUUID(),
        label: subcategorias[i].label,
        codigo: subcategorias[i].value,
        link: '',
        menu: especialidades
          .filter(
            (especialidad: any) =>
              subcategorias[i]['value'] == especialidad['subcategory'],
          )
          .map((item: any) => ({
            id: crypto.randomUUID(),
            label: item.nombre,
            codigo: item.codigo,
            link: '',
            menu: [
              {
                id: crypto.randomUUID(),
                label: 'Catálogo de Deterioros',
                link: '/catalogos/deterioros',
                codigo: '',
                menu: [],
              },
              {
                id: crypto.randomUUID(),
                label: 'Catálogo Ud Simples',
                link: '/catalogos/udsimples',
                codigo: '',
                menu: [],
              },
              {
                id: crypto.randomUUID(),
                label: 'Catálogo Ud Compuestas',
                link: '/catalogos/udcompuestos',
                codigo: '',
                menu: [],
              },
              {
                id: crypto.randomUUID(),
                label: 'Catálogo Actuaciones',
                link: '/catalogos/actuaciones',
                codigo: '',
                menu: [],
              },

              {
                id: crypto.randomUUID(),
                label: 'Mediciones Ficha Campo',
                link: '/mediciones/ficha_campo',
                codigo: '',
                menu: [],
              },
            ],
          })),
      }
      menuItems.push(item)
    }

    const menuMediciones: MenuItem = {
      id: crypto.randomUUID(),
      label: 'Mediciones',
      codigo: '',
      link: '',
      menu: [
        {
          id: crypto.randomUUID(),
          label: 'Mediciones Resumen Ud Simples',
          link: '/consultas/mediciones/udsimples',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Mediciones Resumen Ud Compuestas',
          link: '/consultas/mediciones/udcompuestas',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Mediciones Resumen Actuaciones',
          link: '/consultas/mediciones/actuaciones',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Mediciones Resumen Actuaciones - UOC',
          link: '/consultas/mediciones/actuaciones-uoc',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Mediciones Resumen Ficha Actuaciones',
          link: '/consultas/mediciones/actuaciones-uoc',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Mediciones Resumen por Tramos',
          link: '/consultas/mediciones/resumen_tramos',
          codigo: '',
          menu: [],
        },
      ],
    }

    const menuPreciosPlanificacion: MenuItem = {
      id: crypto.randomUUID(),
      label: 'Precios Planificación:',
      codigo: '',
      link: '',
      menu: [
        {
          id: crypto.randomUUID(),
          label: 'Precios Ud Simples Planifacion',
          link: '/precios/udsimples',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Precios Ud Compuestas Planifacion',
          link: '/precios/udcompuestas',
          codigo: '',
          menu: [],
        },
      ],
    }
    const menuPresupuestoPlanificacion: MenuItem = {
      id: crypto.randomUUID(),
      label: 'Presupuesto Planificación:',
      codigo: '',
      link: '',
      menu: [
        {
          id: crypto.randomUUID(),
          label: 'Presupuesto Técnico PxQ Ud Simples',
          link: '/consultas/pxq/udsimples',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Presupuesto Técnico PxQ Ud Compuestas',
          link: '/consultas/pxq/udcompuestas',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Presupuesto Técnico PxQ Actuaciones 1',
          link: '/consultas/pxq/actuacion1',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Presupuesto Técnico PxQ Actuaciones 2',
          link: '/consultas/pxq/actuacion2',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Ratio P actuacion',
          link: '/consultas/pxq/ratioP',
          codigo: '',
          menu: [],
        },
      ],
    }
    const menuDocumentos: MenuItem = {
      id: crypto.randomUUID(),
      label: 'Documentos',
      codigo: '',
      link: '',
      menu: [
        {
          id: crypto.randomUUID(),
          label: 'Fichas tecnicas',
          link: '/ficha_tecnica',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Presupuesto ',
          link: '/presupuesto',
          codigo: '',
          menu: [],
        },
      ],
    }

    const menuOtros: MenuItem = {
      id: crypto.randomUUID(),
      label: 'Presupuesto Planificación:',
      codigo: '',
      link: '',
      menu: [
        {
          id: crypto.randomUUID(),
          label: 'Costos de Proyecto',
          link: '/costos/proyecto',
          codigo: '',
          menu: [],
        },
        {
          id: crypto.randomUUID(),
          label: 'Proyectos x Subcategorías ',
          link: '/costos/tareas',
          codigo: '',
          menu: [],
        },
      ],
    }

    menuItems.push(menuMediciones)
    menuItems.push(menuPreciosPlanificacion)
    menuItems.push(menuPresupuestoPlanificacion)
    menuItems.push(menuDocumentos)
  }

  const handleSearchinput = async (value: string) => {
    console.log(value)
    setSearchInput(value)
    await mutate()
    console.log(data?.result.results)
  }

  const handleModalDelete = (value: string) => {
    setModalDelete(!modalDelete)
  }

  const handleDeleteRow = async () => {
    if (selectedRows.length == 0) {
      return
    }
    // const result = await mutation.trigger(selectedRows)

    await mutate()
    setSelectedRows([])
    setModalDelete(!modalDelete)
  }

  const handleCloseModal = (value: string) => {
    setModalDelete(!modalDelete)
  }

  const handleCloneProject = async (projectId: string) => {
    let toastId
    try {
      toastId = toast.loading('Enviando... 🚀')
      const response = await fetch(
        `${process.env.API_URL}/Project/Duplicate/${projectId}`,
      )

      if (!response.ok) {
        toast.error(`Hubo un problema al realizar la solicitud. 😱`, {
          id: toastId,
        })
        throw new Error('Hubo un problema al realizar la solicitud.')
      }

      const data = await response.json()

      console.log('Datos recibidos:', data)

      toast.success('Enviado con éxito 🙌', { id: toastId })
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Hubo un problema al realizar la solicitud. 😱`, {
        id: toastId,
      })
    }
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Proyectos en desarrollo', link: '/proyectos' },
  ]

  return (
    <main>
      {/* '' */}

      {/* <!-- Start block --> */}
      <section className="w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              titulo="Proyectos en desarrollo"
              descripcion="Lista de proyectos en desarrollo"
              hideDescripcion={false}
              hideFilter={false}
              searchInputValue={searchInput}
              options={{
                filtros: {
                  unidadNegocios:
                    unidadRes !== undefined && unidadRes.status === 200
                      ? unidadRes.result.map((item: any) => ({
                          label: item.name,
                          value: item.id,
                        }))
                      : [],
                  years:
                    yearRes !== undefined && yearRes.status === 200
                      ? yearRes.result.map((item: any) => ({
                          label: item.year,
                          value: item.id,
                        }))
                      : [],

                  tipos: [
                    { label: 'Proyecto en curso', value: 0 },
                    { label: 'Proyecto terminado', value: 1 },
                    { label: 'Todos los proyectos', value: '' },
                  ],
                },
                values: {
                  unidadNegocio: filtroUnidad,
                  year: filtroYear,
                  tipo: filtroTipo,
                },
              }}
              loading={isLoading}
              error={data !== undefined && data.status >= 400}
              actions={[
                {
                  label: 'Nuevo',
                  icon: 'new',
                  visibleLabel: true,
                  style:
                    'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  onClick: () => router.push('/proyectos/nuevo'),
                },
                {
                  label: 'Eliminar',
                  icon: 'remove',
                  visibleLabel: true,
                  style:
                    'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
                  onClick: () => {
                    if (selectedRows.length == 0) {
                      return
                    }
                    handleModalDelete('multi')
                  },
                },
              ]}
              searchInputPlaceholder="Buscar proyectos"
              filterText="Filtros"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.results.map((item: Project) => ({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      unit: item.mtBusinessUnit,
                      version: item.version,
                      task: `/proyectos/${item.id}`,
                      type: item.type,
                    }))
                  : []
              }
              onChangeSelect={(newValue: any) => {}}
              onChangeInput={(newValue: string) => {
                handleSearchinput(newValue)
              }}
              onSearch={async (values: any) => {
                console.log(values)
                if (
                  'unidadNegocio' in values &&
                  values.unidadNegocio !== undefined
                )
                  setFiltroUnidad(values.unidadNegocio.value)

                if ('year' in values && values.year !== undefined)
                  setFiltroYear(values.year.value)

                if ('tipo' in values && values.tipo !== undefined)
                  setFiltroTipo(values.tipo.value)

                await mutate()
              }}
              hideCheckboxColumn={false}
              mapFields={mapFieldsOrdered}
              columsLabels={[
                'Nombre',
                'Descripcion',
                'Unidad de negocio',
                'Versión',
                'Tareas',
                'Tipo',
              ]}
              columsActions={[
                // {
                //     label: 'Menu',
                //     icon: 'menu',
                //     visibleLabel: false,
                //     style: 'font-medium text-gray-600 dark:text-gray-500 hover:underline',
                //     onClick: ()=>{}
                // },
                {
                  label: 'Clonar',
                  icon: <FaRegClone className="mr-2" />,
                  visibleLabel: false,
                  style:
                    'font-medium text-gray-600 dark:text-gray-500 hover:underline',
                  onClick: (value: string) => {
                    handleCloneProject(value)
                  },
                },
                {
                  label: 'Editar',
                  icon: <FaEdit className="mr-2" />,
                  visibleLabel: false,
                  style:
                    'font-medium text-blue-600 dark:text-blue-500 hover:underline',
                  onClick: (value: string) =>
                    router.push(`/proyectos/editar?id=${value}`),
                },
                {
                  label: 'Eliminar',
                  icon: <FaRegTrashAlt className="mr-2" />,
                  visibleLabel: false,
                  style:
                    'font-medium text-red-600 dark:text-red-500 hover:underline',
                  onClick: (value: number) => {
                    setSelectedRows([value])
                    setModalDelete(!modalDelete)
                  },
                },
              ]}
              hideNavigation={data !== undefined && data.status >= 400}
              elementByPage={
                data != undefined && data.status == 200
                  ? data.result.pageSize
                  : 10
              }
              currentPage={
                data != undefined && data.status == 200
                  ? data.result.currentPage
                  : 1
              }
              totalValues={
                data != undefined && data.status == 200
                  ? data.result.recordCount
                  : 10
              }
              pagesCount={
                data != undefined && data.status == 200
                  ? data.result.pageCount
                  : 1
              }
              onNavigate={(page: number) => setPageIndex(page)}
              pageSize={pageSize}
              onChangePageSize={(newValue: any) => setPageSize(newValue.value)}
              selectedItems={selectedRows}
              onSelectedItems={(values: any) => {
                setSelectedRows(values)
              }}
              menuRow={[]}
              onChangeItem={() => {}}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
