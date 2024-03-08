'use client'
import { useRouter } from 'next/navigation'

import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/table'
import { useState } from 'react'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import IndicadorSubEspecialidadForm from '@/components/forms/IndicadorSubEspecialidadForm'

import { useStateCallback } from '@/hooks/useStateCallback'
import Loading from '@/components/loading'
import ModalNewItem from './modalEdit'
import ModalDetail from './modalDetail'
import { FaEdit, FaEye, FaRegTrashAlt } from 'react-icons/fa'
import fetcher from '@/services/fetcher'
import { deleter } from '@/services/deleter'
import { toast } from 'sonner'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  name: string
  code: string
  route: string
  mtSpecialtyAction: string
}

const mapFieldsOrdered = [
  // { fieldName:  'id', fieldType: 'string'},
  { fieldName: 'code', fieldType: 'string' },
  { fieldName: 'name', fieldType: 'string' },
  { fieldName: 'speciality', fieldType: 'string' },
  { fieldName: 'level1', fieldType: 'string' },
  { fieldName: 'level2', fieldType: 'string' },
  { fieldName: 'level3', fieldType: 'string' },
  // { fieldName:  'level4', fieldType: 'string'},
]

export default function MaestroSubEspecialidad() {
  const [itemId, setItemId] = useStateCallback(0)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const { data: subRes } = useSWR(
    `${process.env.API_URL}/MtSubCategoryAction/GetAll`,
    fetcher,
  )
  const { data: espRes } = useSWR(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher,
  )
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('')
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('')

  const { data, mutate, isLoading } = useSWR(
    `${process.env.API_URL}/MtSubspeciality/GetAllPaginated?Page=${pageIndex}&PageSize=${pageSize}&SearchCriteria=${searchInput}&MtSpecialtyActionId=${filtroEspecialidad}`,
    fetcher,
  )

  const mutation = useSWRMutation(
    `${process.env.API_URL}/MtSubspeciality/DeleteAll`,
    deleter,
  )

  if (mutation.error)
    toast.error('No se pudo eliminar el recurso seleccionado 😱')

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
      label: 'Subespecialidades de actuacion',
      link: '/maestros/subespecialidades_actuacion',
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
              titulo="Subespecialidades de actuacion"
              descripcion="Repositorio con las diferentes subespecialidades de actuacion"
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
                  especialidades:
                    espRes !== undefined && espRes.status === 200
                      ? espRes.result.map((item: any) => ({
                          label: item.name,
                          value: String(item.id),
                          subcategory: String(item.mtSubCategoryActionId),
                        }))
                      : [],
                },
                values: {
                  subcategoria: filtroSubcategoria,
                  especialidad: filtroEspecialidad,
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
              searchInputPlaceholder="Buscar subespecialidades de actuacion"
              filterText="Filtros"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.results.map((item: Item) => {
                      const levels = item.route.split('/').reverse()
                      return {
                        id: item.id,
                        code: item.code,
                        level1: levels[0] !== undefined ? levels[0] : '-',
                        level2: levels[1] !== undefined ? levels[1] : '-',
                        level3: levels[2] !== undefined ? levels[2] : '-',
                        // level4: levels[3] !== undefined ? levels[3] : '-',
                        name: item.name,
                        speciality: item.mtSpecialtyAction,
                      }
                    })
                  : []
              }
              onChangeSelect={(newValue: any) => {}}
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

                if (
                  'especialidad' in values &&
                  values.especialidad !== undefined
                )
                  setFiltroEspecialidad(values.especialidad.value)

                await mutate()
              }}
              hideCheckboxColumn={false}
              mapFields={mapFieldsOrdered}
              columsLabels={[
                'Codigo',
                'Nombre',
                'Especialidad',
                'Nivel 1',
                'Nivel 2',
                'Nivel 3',
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
            itemId === 0
              ? 'Nueva subespecialidad'
              : 'Actualizar subespecialidad'
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
          title="Detalles de subespecialidad"
          itemSelected={itemId}
          onClose={() => setModalDetail(false)}
        />
      ) : null}

      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar ${selectedRows.length > 1 ? 'subespecialidades' : 'subespecialidad'}`}
          mensaje={`¿Estás seguro de que deseas eliminar ${selectedRows.length > 1 ? 'estas subespecialidades' : 'esta subespecialidad'} de la lista? Una vez ${selectedRows.length > 1 ? 'eliminadas' : 'eliminada'}, no podrás recuperar los datos asociados. `}
          onClose={() => handleCloseModal('')}
          onDelete={() => handleDeleteRow()}
        />
      ) : null}

      {/* <Footer></Footer> */}
    </main>
  )
}
