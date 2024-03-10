'use client'

// import 'swiper/css';

import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/table'
import { useState } from 'react'

import ModalDeleteRow from '@/components/common-modals/modal-delete-row'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  nombreActuacion: string
  nombreUdCompuesta: string
  unidad: string
  P: string
  Q: string
  PxQ: string
  unidadMoneda: string
  moneda: string
  seguimiento: string
}

const proyectos: any[] = [
  {
    unidadNegocio: 'Viaducto Bicentenario',
    simbolo: 'VEB',
    proyecto: 'Mantenimiento Mayor Categorías Críticas',
    year: '2024',
  },
  {
    unidadNegocio: 'Viaducto Bicentenario',
    simbolo: 'VEB',
    proyecto: 'Mantenimiento Mayor Categorías Críticas',
    year: '2024',
  },
  {
    unidadNegocio: 'Viaducto Bicentenario',
    simbolo: 'VEB',
    proyecto: 'Mantenimiento Mayor Categorías Críticas',
    year: '2024',
  },
  {
    unidadNegocio: 'Viaducto Bicentenario',
    simbolo: 'VEB',
    proyecto: 'Mantenimiento Mayor Categorías Críticas',
    year: '2024',
  },
  {
    unidadNegocio: 'Viaducto Bicentenario',
    simbolo: 'VEB',
    proyecto: 'Mantenimiento Mayor Categorías Críticas',
    year: '2024',
  },
  {
    unidadNegocio: 'Viaducto Bicentenario',
    simbolo: 'VEB',
    proyecto: 'Mantenimiento Mayor Categorías Críticas',
    year: '2024',
  },
]

export default function PxQActuacion1() {
  const [columnsValues, setColumnsValues] = useState(proyectos)
  const [modalDelete, setModalDelete] = useState(false)
  const [rowDelete, setRowDelete] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'GNA', value: 'GNA', checked: true },
    { label: 'CEM', value: 'CEM', checked: false },
    { label: 'LEP', value: 'LEP', checked: false },
  ])

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [changedRows, setChangedRows] = useState<any[]>([])

  const mapFieldsOrdered = [
    { fieldName: 'unidadNegocio', fieldType: 'string' },
    { fieldName: 'simbolo', fieldType: 'string' },
    { fieldName: 'proyecto', fieldType: 'string' },
    { fieldName: 'year', fieldType: 'string' },
  ]

  const saveUdSimple = async (values: any): Promise<any> => {
    console.log(values)
  }

  const handleSearchinput = (value: string) => {
    setSearchInput(value)
  }

  const handleModalDelete = (value: string) => {
    if (value != '') {
      setRowDelete(value)
    }
    setModalDelete(!modalDelete)
  }

  const handleDeleteRow = () => {
    if (rowDelete == '') {
      return
    }

    const newValues =
      rowDelete == 'multi'
        ? columnsValues.filter((item: Item) => !selectedRows.includes(item.id))
        : columnsValues.filter((item) => item.id != rowDelete)

    setSelectedRows([])
    setRowDelete('')
    setColumnsValues(newValues)
    setModalDelete(!modalDelete)
  }

  const handleCloseModal = (value: string) => {
    setModalDelete(!modalDelete)
    setRowDelete(value)
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Consultas', link: '/consultas' },
    { label: 'Proyectos por unidad de negocio', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              // key={crypto.randomUUID()}
              titulo="Proyecto por unidades"
              descripcion="Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more."
              hideDescripcion={false}
              hideFilter={false}
              searchInputValue={searchInput}
              loading={false}
              error={false}
              options={filtros}
              pageSize={0}
              onChangePageSize={() => {}}
              actions={
                [
                  // {
                  //     label: 'Guardar',
                  //     icon: 'new',
                  //     visibleLabel: true,
                  //     style: 'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  //     onClick: () => {
                  //         let toastId;
                  //         try {
                  //             if(changedRows.length == 0){
                  //                 return;
                  //             }
                  //             toastId = toast.loading('Enviando... 🚀');
                  //             // Submit data
                  //             toast.success('Enviado con éxito 🙌', { id: toastId });
                  //         } catch (e) {
                  //             toast.error('No se puede enviar 😱', { id: toastId });
                  //         }
                  //     }
                  // },
                  // {
                  //     label: 'Eliminar',
                  //     icon: 'remove',
                  //     visibleLabel: true,
                  //     style: 'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
                  //     onClick: () => {
                  //         if (selectedRows.length == 0) {
                  //             return;
                  //         }
                  //         handleModalDelete('multi');
                  //     }
                  // }
                ]
              }
              searchInputPlaceholder="Buscar elemento"
              filterText="Unidad de negocio"
              columsValues={columnsValues}
              onChangeSelect={(newValue: Option[]) => {
                setFiltros(newValue)
              }}
              onChangeInput={(newValue: string) => {
                setSearchInput(newValue)
              }}
              onSearch={handleSearchinput}
              hideCheckboxColumn={true}
              mapFields={mapFieldsOrdered}
              columsLabels={[
                'Unidad de negocio',
                'Simbolo',
                'Proyecto',
                'Anno',
              ]}
              columsActions={
                [
                  // {
                  //     label: 'Editar',
                  //     icon: 'edit',
                  //     visibleLabel: false,
                  //     style: 'font-medium text-blue-600 dark:text-blue-500 hover:underline',
                  //     onClick: (value: string) => router.push(`/mediciones/udsimples/editar?u=${searchParams.get('u')}&e=${searchParams.get('e')}&id=${value}`)
                  // },
                  // {
                  //     label: 'Eliminar',
                  //     icon: 'remove',
                  //     visibleLabel: false,
                  //     style: 'font-medium text-red-600 dark:text-red-500 hover:underline',
                  //     onClick: (value: string) => handleModalDelete(value)
                  // }
                ]
              }
              hideNavigation={false}
              elementByPage={20}
              currentPage={1}
              totalValues={1000}
              pagesCount={5}
              onNavigate={() => console.log('navigate')}
              selectedItems={selectedRows}
              onSelectedItems={(values: any) => {
                setSelectedRows(values)
              }}
              menuRow={[]}
              onChangeItem={(value: any, id: any, fieldName: string) => {
                if (value == '') {
                  return
                }
                const elem = columnsValues.filter((item) => item.id == id)[0]
                const index = columnsValues.indexOf(elem)

                if (elem != null) {
                  const list = columnsValues
                  list[index][fieldName] = value

                  setColumnsValues([...list])

                  const updateItems = changedRows
                  const updateItem = updateItems.filter(
                    (item) => item.id == id,
                  )[0]

                  if (updateItem != null) {
                    updateItems[updateItems.indexOf(updateItem)] =
                      columnsValues[index]
                  } else {
                    updateItems.push(columnsValues[index])
                  }
                  setChangedRows(updateItems)
                }
              }}
            />
          </div>
        </div>
      </section>

      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar ${rowDelete == 'multi' ? 'precios' : 'precio'}`}
          mensaje={`¿Estás seguro de que deseas eliminar ${rowDelete == 'multi' ? 'estos precios' : 'este precio'} de la lista? Una vez ${rowDelete == 'multi' ? 'eliminadas' : 'eliminada'}, no podrás recuperar los datos asociados. `}
          onClose={() => handleCloseModal('')}
          onDelete={() => handleDeleteRow()}
        />
      ) : null}

      {/* <Footer></Footer> */}
    </main>
  )
}
