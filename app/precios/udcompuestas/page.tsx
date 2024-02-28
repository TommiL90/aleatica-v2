'use client'

import Breadcrumbs from '@/components/breadcrumbs'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import Table from '@/components/tables/table'
import { useAppContext } from '@/context/appContext'
import { useState } from 'react'
import { toast } from 'sonner'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  nombre: string
  unidad: string
  year: string
  precio: string
  unidadMoneda: string
  moneda: string
}

const precios: any[] = Array.from({ length: 20 }, (item, index) => ({
  id: `MM.OP.CEM.24.001.RE0${index + 1}`,
  nombre: `Unidad simple #${index + 1}`,
  unidad: 'm',
  year: '2024',
  precio: '1,00',
  unidadMoneda: 'Unidad',
  moneda: 'MEX',
}))

export default function PreciosUDCompuestas() {
  const [columnsValues, setColumnsValues] = useState(precios)
  const [modalDelete, setModalDelete] = useState(false)
  const [rowDelete, setRowDelete] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Categoria 1', value: 'cat1', checked: true },
    { label: 'Categoria 2', value: 'cat2', checked: false },
    { label: 'Categoria 3', value: 'cat3', checked: false },
  ])

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [changedRows, setChangedRows] = useState<any[]>([])

  const { unidadMonedaIndicador, monedaIndicador } = useAppContext()

  const mapFieldsOrdered = [
    { fieldName: 'nombre', fieldType: 'string' },
    { fieldName: 'unidad', fieldType: 'string' },
    { fieldName: 'year', fieldType: 'string' },
    {
      fieldName: 'precio',
      fieldType: 'string',
      input: true,
      inputType: 'number',
    },
    {
      fieldName: 'unidadMoneda',
      fieldType: 'string',
      input: true,
      inputType: 'select',
      options: unidadMonedaIndicador,
    },
    {
      fieldName: 'moneda',
      fieldType: 'string',
      input: true,
      inputType: 'select',
      options: monedaIndicador,
    },
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
    { label: 'Proyectos', link: '/proyectos' },
    { label: 'Precios de unidades compuestas', link: null },
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
              titulo="Precios unidades compuestas"
              descripcion="Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more."
              hideDescripcion={false}
              searchInputValue={searchInput}
              options={filtros}
              loading={false}
              error={false}
              pageSize={0}
              onChangePageSize={() => {}}
              hideFilter={false}
              actions={[
                {
                  label: 'Guardar',
                  icon: 'new',
                  visibleLabel: true,
                  style:
                    'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  onClick: () => {
                    let toastId
                    try {
                      if (changedRows.length == 0) {
                        return
                      }

                      toastId = toast.loading('Enviando... 🚀')
                      // Submit data

                      toast.success('Enviado con éxito 🙌', { id: toastId })
                    } catch (e) {
                      toast.error('No se puede enviar 😱', { id: toastId })
                    }
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
                //         handleModalDelete('multi');
                //     }
                // }
              ]}
              searchInputPlaceholder="Buscar precios"
              filterText="Categorias"
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
                'Nombre',
                'Ud',
                'Año',
                'Precio',
                'Unidad de moneda',
                'Moneda',
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
