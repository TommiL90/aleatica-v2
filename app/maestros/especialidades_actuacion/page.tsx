'use client'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useStateCallback } from '@/hooks/useStateCallback'
import { FaEdit, FaEye, FaRegTrashAlt } from 'react-icons/fa'
import ModalNewItem from './modalEdit'
import ModalDetail from './modalDetail'
import fetcher from '@/services/fetcher'
import { deleter } from '@/services/deleter'
import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/table'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  name: string
  code: string
  mtSubCategoryAction: string
}

const mapFieldsOrdered = [
  // { fieldName:  'id', fieldType: 'string'},
  { fieldName: 'code', fieldType: 'string' },
  { fieldName: 'name', fieldType: 'string' },
  { fieldName: 'subcategory', fieldType: 'string' },
]

export default function MaestroEspecialidades() {
  const [itemId, setItemId] = useStateCallback(0)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const { data: subRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetAll`,
    fetcher,
  )
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')

  const { data, mutate, isLoading } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAllPaginated?Page=${pageIndex}&PageSize=${pageSize}&SearchByProp=Code&SearchCriteria=${searchInput}&MtSubCategoryActionId=${filtroSubcategoria}`,
    fetcher,
  )
  const mutation = useSWRMutation(
    `${process.env.API_URL}/MtSpecialtyAction/DeleteAll`,
    deleter,
  )
  const router = useRouter()

  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)

  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const handleSearchinput = (value: string) => {
    setSearchInput(value)
  }

  const handleModalDelete = (value: number | string) => {
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
    setSelectedRows([])
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    {
      label: 'Especialidades de actuacion',
      link: '/maestros/especialidades_actuacion',
    },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              titulo="Especialidades de actuacion"
              descripcion="Repositorio con las diferentes especialidades de actuacion"
              hideDescripcion={false}
              hideFilter={false}
              searchInputValue={searchInput}
              loading={isLoading || mutation.isMutating}
              error={data !== undefined && data.status >= 400}
              options={{
                filtros: {
                  subcategorias:
                    subRes !== undefined && subRes.status === 200
                      ? subRes.result.map((item: any) => ({
                          label: item.name,
                          value: String(item.id),
                        }))
                      : [],
                },
                values: {
                  subcategoria: filtroSubcategoria,
                },
              }}
              actions={[
                {
                  label: 'Nuevo',
                  icon: 'new',
                  visibleLabel: true,
                  style:
                    'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  onClick: () => setModalNewItem(true, () => setItemId(0)),
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
                    setModalDelete(!modalDelete)
                  },
                },
              ]}
              searchInputPlaceholder="Buscar especialidades de actuacion"
              filterText="Filtros"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.results.map((item: Item) => ({
                      id: item.id,
                      code: item.code,
                      name: item.name,
                      subcategory: item.mtSubCategoryAction,
                    }))
                  : []
              }
              onChangeSelect={(newValue: Option[]) => {}}
              onChangeInput={(newValue: string) => {
                setSearchInput(newValue)
              }}
              onSearch={async (values: any) => {
                console.log(values)
                if (
                  'subcategoria' in values &&
                  values.subcategoria !== undefined
                )
                  setFiltroSubcategoria(values.subcategoria.value)

                await mutate()
              }}
              hideCheckboxColumn={false}
              mapFields={mapFieldsOrdered}
              columsLabels={[
                'Codigo',
                'Especialidad',
                'Subcategoria actuacion',
              ]}
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
                {
                  label: 'Editar',
                  icon: <FaEdit className="mr-2" />,
                  visibleLabel: false,
                  style:
                    'font-medium text-blue-600 dark:text-blue-500 hover:underline',
                  onClick: async (value: string) =>
                    setModalNewItem(true, () => setItemId(Number(value))),
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

      {modalNewItem ? (
        <ModalNewItem
          isModalOpen={modalNewItem}
          title={
            itemId === 0 ? 'Nueva especialidad' : 'Actualizar especialidad'
          }
          itemSelected={itemId}
          onMutate={async () => {
            await mutate()
            if (itemId !== 0) {
              setModalNewItem(false)
            }
          }}
          onClose={() => setModalNewItem(false)}
        />
      ) : null}

      {modalDetail ? (
        <ModalDetail
          isModalOpen={modalDetail}
          title="Detalles de disposicion"
          itemSelected={itemId}
          onClose={() => setModalDetail(false)}
        />
      ) : null}

      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar ${selectedRows.length > 1 ? 'especialidades' : 'especialidad'}`}
          mensaje={`¿Estás seguro de que deseas eliminar ${selectedRows.length > 1 ? 'estas especialidades' : 'esta especialidad'} de la lista? Una vez ${selectedRows.length > 1 ? 'eliminadas' : 'eliminada'}, no podrás recuperar los datos asociados. `}
          onClose={() => handleCloseModal('')}
          onDelete={() => handleDeleteRow()}
        />
      ) : null}

      {/* <Footer></Footer> */}
    </main>
  )
}
