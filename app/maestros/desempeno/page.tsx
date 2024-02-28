'use client'
import { useRouter } from 'next/navigation'

import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/table'
import { useState } from 'react'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useStateCallback } from '@/hooks/useStateCallback'
import { FaEdit, FaEye, FaRegTrashAlt } from 'react-icons/fa'
import ModalNewItem from './modalEdit'
import ModalDetail from './modalDetail'
import fetcher from '@/services/fetcher'
import { deleter } from '@/services/deleter'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  mtBusinessUnit: string
  mtActionSubCategory: string
  mtSpecialtyAction: string
  name: string
}

const mapFieldsOrdered = [
  // { fieldName:  'id', fieldType: 'string'},
  { fieldName: 'nombre', fieldType: 'string' },
  { fieldName: 'unidad', fieldType: 'string' },
  { fieldName: 'subcategoria', fieldType: 'string' },
  { fieldName: 'especialidad', fieldType: 'string' },
]

export default function MaestroDesempenno() {
  const [itemId, setItemId] = useStateCallback(0)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const { data: unidadRes } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetAll`,
    fetcher,
  )
  const { data: subRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetAll`,
    fetcher,
  )
  const [filtroUnidadNegocio, setFiltroUnidadNegocio] = useState(0)
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')

  const { data, mutate, isLoading } = useSWR(
    `${process.env.API_URL}/MRPerformanceIndicator/GetAllPaginated?Page=${pageIndex}&PageSize=${pageSize}&SearchByProp=Code&SearchCriteria=${searchInput}&MtActionSubCategoryId=${filtroSubcategoria}`,
    fetcher,
  )
  const mutation = useSWRMutation(
    `${process.env.API_URL}/MRPerformanceIndicator/DeleteAll`,
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
    { label: 'Indicador de desempeño', link: 'maestros/desempeno' },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              titulo="Indicadores de desempeño"
              descripcion="Repositorio con los diferentes indicadores de desempeño."
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
                  unidadNegocios:
                    unidadRes !== undefined && unidadRes.status === 200
                      ? unidadRes.result.map((item: any) => ({
                          label: item.name,
                          value: item.id,
                        }))
                      : [],
                },
                values: {
                  subcategoria: filtroSubcategoria,
                  unidadNegocio: filtroUnidadNegocio,
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
              searchInputPlaceholder="Buscar indicadores de desempeño"
              filterText="Filtros"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.results.map((item: Item) => ({
                      id: item.id,
                      nombre: item.name,
                      unidad: item.mtBusinessUnit,
                      subcategoria: item.mtActionSubCategory,
                      especialidad: item.mtSpecialtyAction,
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
                  'unidadNegocio' in values &&
                  values.unidadNegocio !== undefined
                )
                  setFiltroUnidadNegocio(values.unidadNegocio.value)

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
                'Nombre',
                'Unidad de Negocio',
                'Subcategoria',
                'Especialidad',
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
          title={itemId === 0 ? 'Nuevo desempenno' : 'Actualizar desempenno'}
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
          title="Detalles de desempenno"
          itemSelected={itemId}
          onClose={() => setModalDetail(false)}
        />
      ) : null}

      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar ${selectedRows.length > 1 ? 'desempennos' : 'desempenno'}`}
          mensaje={`¿Estás seguro de que deseas eliminar ${selectedRows.length > 1 ? 'estos desempennos' : 'este desempenno'} de la lista? Una vez ${selectedRows.length > 1 ? 'eliminadas' : 'eliminada'}, no podrás recuperar los datos asociados. `}
          onClose={() => handleCloseModal('')}
          onDelete={() => handleDeleteRow()}
        />
      ) : null}

      {/* <Footer></Footer> */}
    </main>
  )
}
