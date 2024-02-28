'use client'
import Breadcrumbs from '@/components/breadcrumbs'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import Table from '@/components/tables/table'
import { useState } from 'react'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  id: string
  nombre: string
  unidad: string
  urgente: string
  alta: string
  media: string
  baja: string
  medicionQTotal: string
}

const mediciones: Item[] = [
  {
    id: `UC.PF.RE.DEN.0001`,
    nombre: `Colocación de carpeta asfáltica densa`,
    unidad: 'm3',
    urgente: '-',
    alta: '-',
    media: '-',
    baja: '-',
    medicionQTotal: '-',
  },
  {
    id: `UC.PF.RE.SMA.0001`,
    nombre: `Colocación de carpeta asfáltica SMA`,
    unidad: 'm3',
    urgente: '-',
    alta: '-',
    media: '-',
    baja: '-',
    medicionQTotal: '-',
  },
  {
    id: `UC.PF.RE.CAS.0001`,
    nombre: `Colocación de carpeta asfáltica CASAA`,
    unidad: 'm3',
    urgente: '2064',
    alta: '-',
    media: '152',
    baja: '-',
    medicionQTotal: '2216',
  },
  {
    id: `UC.PF.CR.CAS.0001`,
    nombre: `Corte y reposición con carpeta asfáltica CASAA`,
    unidad: 'm3',
    urgente: '3027',
    alta: '-',
    media: '200',
    baja: '-',
    medicionQTotal: '3227',
  },
]

const mapFieldsOrdered = [
  // { fieldName:  'id', fieldType: 'string'},
  { fieldName: 'nombre', fieldType: 'string' },
  { fieldName: 'unidad', fieldType: 'string' },
  { fieldName: 'urgente', fieldType: 'string' },
  { fieldName: 'alta', fieldType: 'string' },
  { fieldName: 'media', fieldType: 'string' },
  { fieldName: 'baja', fieldType: 'string' },
  { fieldName: 'medicionQTotal', fieldType: 'string' },
]

export default function MedicionesUDCompuestos() {
  const [columnsValues, setColumnsValues] = useState(mediciones)
  const [modalDelete, setModalDelete] = useState(false)
  const [rowDelete, setRowDelete] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Categoria 1', value: 'cat1', checked: true },
    { label: 'Categoria 2', value: 'cat2', checked: false },
    { label: 'Categoria 3', value: 'cat3', checked: false },
  ])

  const [selectedRows, setSelectedRows] = useState<string[]>([])

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
    { label: 'Mediciones de Ud compuestas', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              titulo="Mediciones resumen de unidades compuestas"
              descripcion="Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more."
              hideDescripcion={false}
              searchInputValue={searchInput}
              options={filtros}
              loading={false}
              error={false}
              onChangeItem={() => {}}
              pageSize={0}
              onChangePageSize={() => {}}
              hideFilter={false}
              actions={
                [
                  // {
                  //     label: 'Nuevo',
                  //     icon: 'new',
                  //     visibleLabel: true,
                  //     style: 'px-3 py-2.5 flex items-center mx-1 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                  //     onClick: () => router.push(`/mediciones/udsimples/nuevo?u=${searchParams.get('u')}&e=${searchParams.get('e')}`)
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
              searchInputPlaceholder="Buscar mediciones unidades compuestas"
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
                'Obra compuesta',
                'Medida',
                'Urgente',
                'Alta',
                'Media',
                'Baja',
                'Medicion(Q) Total',
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
            />
          </div>
        </div>
      </section>
      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar ${rowDelete == 'multi' ? 'mediciones' : 'medicion'}`}
          mensaje={`¿Estás seguro de que deseas eliminar ${rowDelete == 'multi' ? 'estas mediciones' : 'esta medicion'} de la lista? Una vez ${rowDelete == 'multi' ? 'eliminadas' : 'eliminada'}, no podrás recuperar los datos asociados. `}
          onClose={() => handleCloseModal('')}
          onDelete={() => handleDeleteRow()}
        />
      ) : null}
      {/* <Footer></Footer> */}
    </main>
  )
}
