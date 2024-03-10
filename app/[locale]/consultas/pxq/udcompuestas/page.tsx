'use client'

// import 'swiper/css';

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { useAppContext } from '@/context/appContext'
import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/table'
import { toast } from 'sonner'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'
import fetcher from '@/services/fetcher'
import useSWR from 'swr'
import { TableQueryByProject } from '@/components/tables/TableQueryByProject'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  compositeCatalog: string
  mtUnitOfMeasurement: string
  compositeUdId: string
  mtBusinessUnit: string
  year: number
  planningPrice: number
  salePrice: number
  q: number
  q_Sale: number
  pxQ_Sale: number
  pxQ_Planning: number
}

const mapFieldsOrdered = [
  { fieldName: 'compositeCatalog', fieldType: 'string' },
  { fieldName: 'mtUnitOfMeasurement', fieldType: 'string' },
  { fieldName: 'compositeUdId', fieldType: 'string' },
  { fieldName: 'q', fieldType: 'string' },
  // { fieldName:  'medicion', fieldType: 'string', input: true, inputType: 'number'},

  // { fieldName:  'id', fieldType: 'string'},
]

export default function PxQUDSimples() {
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

  const [filtroUnidadMedida, setFiltroUnidadMedida] = useState([])
  const [filtroUnidadSimple, setFiltroUnidadSimple] = useState([])
  console.log(projectSelected)

  let params = ''
  if (filtroUnidadMedida.length > 0) {
    for (let i = 0; i < filtroUnidadMedida.length; i++) {
      params += `MtUnitOfMeasurementIds=${filtroUnidadMedida[i]['value']}`
    }
  }
  if (order !== null && order['value'] !== 0) {
    params += `OrderSentences=${order['value']}`

    console.log(params)
  }

  const { data, mutate, isLoading } = useSWR(
    projectSelected !== null && projectSelected['value'] > 0
      ? `${process.env.API_URL}/Summary/GetPlanningCompositeCatalogEstimationSummary/${projectSelected['value']}?${params}`
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
    { label: 'PxQ de unidades compuestas', link: null },
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
              titulo="PxQ unidades compuestas"
              descripcion="Lista resumen de PXQ compuestas del proyecto."
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
                },
                values: {
                  unidadMedida: filtroUnidadMedida,
                },
              }}
              pageSize={pageSize}
              onChangePageSize={(newValue: any) => setPageSize(newValue.value)}
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
                  //             if (changedRows.length == 0) {
                  //                 return;
                  //             }
                  //             console.log(changedRows);
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
              searchInputPlaceholder={'Buscar elementos por texto'}
              searchInputValue={searchInput}
              selectPlaceholder="Seleccionar proyecto"
              filterText="Filtros"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.summary.results.map((item: Item) => ({
                      // id: item.simpleUdId,
                      // code: item.code,
                      compositeCatalog: item.compositeCatalog,
                      compositeUdId: item.compositeUdId,
                      mtUnitOfMeasurement: item.mtUnitOfMeasurement,
                      q: String(item.q),
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
              columsLabels={['Nombre', 'Ud', 'Codigo', 'Medicion (Q)']}
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
              }}
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
