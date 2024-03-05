'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Breadcrumbs from '@/components/breadcrumbs'

import { useState } from 'react'

import { useAppContext } from '@/context/appContext'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import { TableQueryByProject } from '@/components/tables/TableQueryByProject'

const inter = Inter({ subsets: ['latin'] })

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  compositeUdId: string
  concept: string
  measurementTotal: string
  measurementUnit: string
  urgent: string
  higth: string
  middle: string
  low: string
  total: string
}

const mapFieldsOrdered = [
  { fieldName: 'concept', fieldType: 'string' },
  { fieldName: 'compositeUdId', fieldType: 'string' },
  { fieldName: 'measurementUnit', fieldType: 'string' },
  { fieldName: 'urgent', fieldType: 'string' },
  { fieldName: 'higth', fieldType: 'string' },
  { fieldName: 'middle', fieldType: 'string' },
  { fieldName: 'low', fieldType: 'string' },
  { fieldName: 'total', fieldType: 'string' },
  { fieldName: 'measurementTotal', fieldType: 'string' },

  // { fieldName:  'id', fieldType: 'string'},
]

export default function MedicionesUDCOmpuestas() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [projectSelected, setProjectSelected] = useState(null)
  const [businessSelected, setBusinessSelected] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [order, setOrder] = useState(null)

  const { data: unitMRes } = useSWR(
    `${process.env.API_URL}/MtUnitOfMeasurement/GetAll`,
    fetcher,
  )
  const { data: priorityMRes } = useSWR(
    `${process.env.API_URL}/MtPriority/GetAll`,
    fetcher,
  )

  const [filtroUnidadMedida, setFiltroUnidadMedida] = useState([])
  const [filtroPrioridad, setFiltroPrioridad] = useState([])

  let params = ''
  if (filtroUnidadMedida.length > 0) {
    for (let i = 0; i < filtroUnidadMedida.length; i++) {
      params += `MtUnitOfMeasurementIds=${filtroUnidadMedida[i]['value']}`
    }

    console.log(params)
  }
  if (filtroPrioridad.length > 0) {
    for (let i = 0; i < filtroPrioridad.length; i++) {
      params += `MtPriorityIds=${filtroPrioridad[i]['value']}`
    }
  }

  if (order !== null && order['value'] !== 0) {
    params += `OrderSentences=${order['value']}`

    console.log(params)
  }

  const { data, mutate, isLoading } = useSWR(
    projectSelected !== null && projectSelected['value'] > 0
      ? `${process.env.API_URL}/Summary/GetCompositeCatalogSummary/${projectSelected['value']}?${params}&Page=${pageIndex}&PageSize=${pageSize}&SearchCriteria=${searchInput}`
      : '',
    fetcher,
  )
  const { data: dataProjects } = useSWR(
    `${process.env.API_URL}/Project/GetAll`,
    fetcher,
  )
  const { data: dataBussiness } = useSWR(
    `${process.env.API_URL}/MtBusinessUnit/GetAll`,
    fetcher,
  )

  const [columnsValues, setColumnsValues] = useState([])
  const [modalDelete, setModalDelete] = useState(false)
  const [rowDelete, setRowDelete] = useState('')

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [changedRows, setChangedRows] = useState<any[]>([])

  console.log(data)

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
    // if(rowDelete == ''){
    //     return;
    // }
    // let newValues = rowDelete == 'multi' ?
    //     columnsValues.filter((item: Item) => !selectedRows.includes(item.id))
    //     :
    //     columnsValues.filter(item => item.id != rowDelete);
    // setSelectedRows([]);
    // setRowDelete('');
    // setColumnsValues(newValues);
    // setModalDelete(!modalDelete);
  }

  const handleCloseModal = (value: string) => {
    setModalDelete(!modalDelete)
    setRowDelete(value)
  }

  const breadcrumbs = [
    { label: 'Inicio', link: '/' },
    { label: 'Proyectos', link: '/proyectos' },
    { label: 'Mediciones de unidades compuestas', link: null },
  ]

  return (
    <main>
      {/* <!-- Start block --> */}
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TableQueryByProject
              // key={crypto.randomUUID()}
              titulo="Mediciones resumen unidades compuestas"
              descripcion="Lista resumen de unidades compuestas del proyecto."
              hideDescripcion={false}
              hideFilter={false}
              projectsItems={
                dataProjects != undefined && dataProjects.status == 200
                  ? dataProjects.result.map((item: any) => ({
                      ...item,
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
              selectedProject={projectSelected}
              onChangeProject={(project: any) => {
                setProjectSelected(project)
              }}
              loading={false}
              error={false}
              options={{
                filtros: {
                  unidadMedida:
                    unitMRes !== undefined && unitMRes.status === 200
                      ? unitMRes.result.map((item: any) => ({
                          label: item.name,
                          value: String(item.id),
                        }))
                      : [],

                  prioridad:
                    priorityMRes !== undefined && priorityMRes.status === 200
                      ? priorityMRes.result.map((item: any) => ({
                          label: item.name,
                          value: String(item.id),
                        }))
                      : [],
                },
                values: {
                  unidadMedida: filtroUnidadMedida,
                  prioridad: filtroPrioridad,
                },
              }}
              pageSize={pageSize}
              onChangePageSize={(newValue: any) => setPageSize(newValue.value)}
              actions={[]}
              searchInputPlaceholder={'Buscar elementos por texto'}
              searchInputValue={searchInput}
              selectPlaceholder="Seleccionar proyecto"
              filterText="Filtros"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.summary.results.map((item: Item) => ({
                      concept: item.concept,
                      compositeUdId: item.compositeUdId,

                      measurementUnit: item.measurementUnit,
                      urgent: String(item.urgent),
                      higth: String(item.higth),
                      middle: String(item.middle),
                      low: String(item.low),
                      measurementTotal: String(item.measurementTotal),
                      total: String(item.total),
                    }))
                  : []
              }
              onChangeSelect={(newValue: Option[]) => {}}
              onChangeInput={(newValue: string) => {
                setSearchInput(newValue)
              }}
              onSearch={handleSearchinput}
              onFilter={async (values: any) => {
                if (
                  'unidadMedida' in values &&
                  values.unidadMedida !== undefined
                )
                  setFiltroUnidadMedida(values.unidadMedida)

                if ('prioridad' in values && values.prioridad !== undefined)
                  setFiltroUnidadMedida(values.prioridad)

                await mutate()
              }}
              bussinessItems={
                dataBussiness != undefined && dataBussiness.status == 200
                  ? dataBussiness.result.map((item: any) => ({
                      ...item,
                      label: item.name,
                      value: item.id,
                    }))
                  : []
              }
              selectedBussinessUnit={businessSelected}
              onChangeBussinessUnit={(unit: any) => {
                setBusinessSelected(unit)
              }}
              bussinessUnitPlaceholder={'Seleccione unidad de negocio'}
              hideCheckboxColumn={true}
              mapFields={mapFieldsOrdered}
              columsLabels={[
                'Concepto',
                'Id compuesta',
                'Medida',
                'Urgente',
                'Alta',
                'Media',
                'Baja',
                'Medicion(Q)',
                'Total',
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
              elementByPage={
                data != undefined && data.status == 200
                  ? data.result.summary.pageSize
                  : 10
              }
              currentPage={
                data != undefined && data.status == 200
                  ? data.result.summary.currentPage
                  : 1
              }
              totalValues={
                data != undefined && data.status == 200
                  ? data.result.summary.recordCount
                  : 10
              }
              pagesCount={
                data != undefined && data.status == 200
                  ? data.result.summary.pageCount
                  : 1
              }
              onNavigate={(page: number) => setPageIndex(page)}
              selectedItems={selectedRows}
              onSelectedItems={(values: any) => {
                setSelectedRows(values)
              }}
              menuRow={[]}
              onChangeItem={(value: any, id: any, fieldName: string) => {
                // if (value == '') {
                //     return;
                // }
                // let elem = columnsValues.filter(item => item.id == id)[0];
                // const index = columnsValues.indexOf(elem);
                // if (elem != null) {
                //     let list = columnsValues;
                //     list[index][fieldName] = value;
                //     setColumnsValues([...list]);
                //     let updateItems = changedRows;
                //     const updateItem = updateItems.filter(item => item.id == id)[0];
                //     if (updateItem != null) {
                //         updateItems[updateItems.indexOf(updateItem)] = columnsValues[index];
                //     }
                //     else {
                //         updateItems.push(columnsValues[index]);
                //     }
                //     setChangedRows(updateItems);
                // }
              }} // searchInputPlaceholder={''} searchInputValue={''}
              orderPlaceholder="Ordenar elementos por ..."
              orderItems={[
                { label: 'Orden 1', value: 'order1:asc' },
                { label: 'Orden 2', value: 'order2:asc' },
                { label: 'Orden 3', value: 'order3:asc' },
              ]}
              selectedOrderItem={order}
              onChangeOrder={(value: any) => setOrder(value)}
            />
          </div>
        </div>
      </section>

      {modalDelete ? (
        <ModalDeleteRow
          titulo={`Eliminar ${rowDelete == 'multi' ? 'mediciones' : 'medicion'}`}
          mensaje={`¿Estás seguro de que deseas eliminar ${rowDelete == 'multi' ? 'estas mediciones' : 'esta medicion'} de la lista? Una vez ${rowDelete == 'multi' ? 'eliminadas' : 'eliminada'}, no podrás recuperar los datos asociados. `}
          onClose={() => handleCloseModal('')}
          onDelete={() => {} /* handleDeleteRow() */}
        />
      ) : null}

      {/* <Footer></Footer> */}
    </main>
  )
}
