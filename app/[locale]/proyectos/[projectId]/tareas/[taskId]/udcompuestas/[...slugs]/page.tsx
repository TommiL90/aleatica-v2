'use client'

import { useStateCallback } from '@/hooks/useStateCallback'
import { deleter } from '@/services/deleter'
import fetcher from '@/services/fetcher'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import ModalDetail from './modalDetail'
import { FaEye } from 'react-icons/fa'
import Table from '@/components/tables/table'
import Breadcrumbs from '@/components/breadcrumbs'
import { UnidadCompuesta } from '@/app/[locale]/catalogos/udcompuestos/compost-catalog-table'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  compositeUdName: string
  description: string
}

const mapFieldsOrdered = [
  { fieldName: 'compositeUdName', fieldType: 'string' },
  { fieldName: 'description', fieldType: 'string' },
]

interface SetCompCatalogs {
  projectTaskId: number
  compositeCatalogsIds: number[]
}

async function setCompCatalogsPost(
  url: string,
  { arg }: { arg: SetCompCatalogs },
) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

const MaestroAnno = () => {
  const params = useParams<{ taskId: string; slugs: string[] }>()
  const taskId = params && params.taskId ? params.taskId : '0'

  const espId = params ? params.slugs[1] : '0'

  const [itemId, setItemId] = useStateCallback(0)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Categoria 1', value: 'cat1', checked: true },
    { label: 'Categoria 2', value: 'cat2', checked: false },
    { label: 'Categoria 3', value: 'cat3', checked: false },
  ])
  const [filtroSelected, setFiltroSelected] = useState(false)
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')

  const { data: medtRes } = useSWR(
    `${process.env.API_URL}/MtUnitOfMeasurement/GetAll`,
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
  // const { data, mutate, isLoading } = useSWR(`${process.env.API_URL}/CompositeCatalog/GetAllPaginated?Page=${pageIndex}&PageSize=${pageSize}&SearchByProp=simpleUdName&SearchCriteria=${searchInput}&MtSpecialtyActionId=${filtroEspecialidad}`, fetcher)
  const { data, mutate, isLoading } = useSWR(
    `${process.env.API_URL}/CompositeCatalog/GetForAsignTaskPaginated?ProjectTaskId=${taskId}&OnlyShowAsigned=${filtroSelected}&Page=${pageIndex}&PageSize=${pageSize}&SearchByProp=simpleUdName&SearchCriteria=${searchInput}&MtSpecialtyActionId=${espId}`,
    fetcher,
  )
  const mutation = useSWRMutation(
    `${process.env.API_URL}/SimpleCatalog/DeleteAll`,
    deleter,
  )

  const { data: udSimplesRes } = useSWR(
    `${process.env.API_URL}/SimpleCatalog/GetAll`,
    fetcher,
  )

  const { data: projectTasks } = useSWR(
    `${process.env.API_URL}/ProjectTask/FindById/${taskId}`,
    fetcher,
  )
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/ProjectTask/SetCompositeCatalogs`,
    setCompCatalogsPost,
  )

  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  console.log(projectTasks)

  const handleSearchinput = (value: string) => {
    setSearchInput(value)
  }

  const handleModalDelete = (value: string) => {
    setModalDelete(!modalDelete)
  }

  const handleDeleteRow = async () => {
    if (selectedRows.length == 0) {
      return
    }
    const result = await mutation.trigger(selectedRows)

    await mutate()
    setSelectedRows([])
    setModalDelete(!modalDelete)
  }

  const handleCloseModal = (value: string) => {
    setModalDelete(!modalDelete)
  }

  const handleSetSimpleCatalogs = async () => {
    let toastId

    try {
      toastId = toast.loading('Enviando... 🚀')
      await trigger({
        projectTaskId: Number(taskId),
        compositeCatalogsIds: selectedRows,
      })

      toast.success('Enviado con éxito 🙌', { id: toastId })
    } catch (error) {
      console.log(error)
      toast.error('No se puede enviar 😱', { id: toastId })
    }
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Formularios', link: null },
  ]

  useEffect(() => {
    if (projectTasks && projectTasks.result) {
      const CompCatalogsArr = projectTasks.result.compositeCatalogs.map(
        (cc: { id: number }) => cc.id,
      )
      setSelectedRows(CompCatalogsArr)
    }
  }, [data, projectTasks])

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              titulo="Tarea unidades compuestas"
              descripcion="Seleccione las unidades compuestas a utilizar en este proyecto"
              hideDescripcion={false}
              hideFilter={false}
              searchInputValue={searchInput}
              options={{
                filtros: {
                  subcategorias:
                    subcatRes !== undefined && subcatRes.status === 200
                      ? subcatRes.result.map((item: any) => ({
                          label: item.text,
                          value: String(item.value),
                        }))
                      : [],
                  especialidades:
                    espRes !== undefined && espRes.status === 200
                      ? espRes.result.map((item: any) => ({
                          label: item.name,
                          value: String(item.id),
                          subcategory: String(item.mtSubCategoryActionId),
                        }))
                      : [],
                  seleccionados: [true, false],
                },
                values: {
                  seleccionado: filtroSelected,
                  subcategoria: filtroSubcategoria,
                  // especialidad: filtroEspecialidad,
                },
              }}
              loading={isLoading || mutation.isMutating}
              error={data !== undefined && data.status >= 400}
              actions={[
                {
                  label: 'Guardar seleccion',
                  icon: '',
                  visibleLabel: true,
                  style:
                    'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  onClick: () => {
                    handleSetSimpleCatalogs()
                  },
                },
                // {
                //     label: 'Eliminar',
                //     icon: 'remove',
                //     visibleLabel: true,
                //     style: 'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
                //     onClick: () => {
                //         if (selectedRows.length == 0) {
                //             return;
                //         }
                //         setModalDelete(!modalDelete)
                //     }
                // }
              ]}
              searchInputPlaceholder="Buscar unidad compuesta"
              filterText="Categoria"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.results.map((item: Item) => ({
                      id: item.id,
                      compositeUdName: item.compositeUdName,
                      description: item.description,
                    }))
                  : []
              }
              onChangeSelect={(newValue: Option[]) => {
                setFiltros(newValue)
              }}
              onChangeInput={(newValue: string) => {
                setSearchInput(newValue)
              }}
              onSearch={async (values: any) => {
                // if (
                //   'especialidad' in values &&
                //   values.especialidad !== undefined
                // )
                //   setFiltroEspecialidad(values.especialidad.value)

                if ('selected' in values && values.selected !== undefined)
                  setFiltroSelected(values.selected)

                await mutate()
              }}
              hideCheckboxColumn={false}
              mapFields={mapFieldsOrdered}
              columsLabels={['Unidad', 'Descripcion']}
              columsActions={[
                {
                  label: 'Detalles',
                  icon: <FaEye className="mr-2" />,
                  visibleLabel: false,
                  style:
                    'font-medium text-blue-600 dark:text-blue-500 hover:underline',
                  onClick: async (value: string) =>
                    setModalDetail(true, () => setItemId(Number(value))),
                },
                // {
                //     label: 'Editar',
                //     icon: <FaEdit className="mr-2" />,
                //     visibleLabel: false,
                //     style: 'font-medium text-blue-600 dark:text-blue-500 hover:underline',
                //     onClick: async (value: string) => setModalNewItem(true, () => setItemId(Number(value)))
                // },
                // {
                //     label: 'Eliminar',
                //     icon: <FaRegTrashAlt className="mr-2" />,
                //     visibleLabel: false,
                //     style: 'font-medium text-red-600 dark:text-red-500 hover:underline',
                //     onClick: (value: number) => {
                //         setSelectedRows([value]);
                //         setModalDelete(!modalDelete)
                //     }
                // }
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

      {modalDetail ? (
        <ModalDetail
          isModalOpen={modalDetail}
          title="Detalles de unidad"
          itemSelected={data.result.results.find(
            (item: UnidadCompuesta) => item.id === itemId,
          )}
          unidadesObra={
            medtRes !== undefined && medtRes.status === 200
              ? medtRes.result.map((item: any) => ({
                  label: item.name,
                  value: String(item.id),
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
          onClose={() => setModalDetail(false)}
        />
      ) : null}

      {/* <Footer></Footer> */}
    </main>
  )
}

export default MaestroAnno
