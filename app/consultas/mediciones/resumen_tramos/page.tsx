'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/TableQueryByProject'
import { useState } from 'react'

import { useAppContext } from '@/context/appContext'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import fetcher from '@/services/fetcher'
import { toast } from 'sonner'
import ModalDeleteRow from '@/components/common-modals/modal-delete-row'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Item {
  mtRoadSectionsName: string
  performanceName: string
  compositeUdId: string
  compositeCatalogName: string
  mtUnitOfMeasurementName: string
  qt: number
}

const mapFieldsOrdered = [
  { fieldName: 'mtRoadSectionsName', fieldType: 'string' },
  { fieldName: 'performanceName', fieldType: 'string' },
  { fieldName: 'compositeUdId', fieldType: 'string' },
  { fieldName: 'compositeCatalogName', fieldType: 'string' },
  { fieldName: 'mtUnitOfMeasurementName', fieldType: 'string' },
  { fieldName: 'qt', fieldType: 'string' },

  // { fieldName:  'id', fieldType: 'string'},
]

export default function MedicionesTramos() {
  const [projectSelected, setProjectSelected] = useState(null)
  const [businessSelected, setBusinessSelected] = useState(null)

  const { data: unitMRes } = useSWR(
    `${process.env.API_URL}/MtUnitOfMeasurement/GetAll`,
    fetcher,
  )
  const { data: tramoRes } = useSWR(
    `${process.env.API_URL}/MtRoadSection/GetAll`,
    fetcher,
  )

  const [filtroUnidadMedida, setFiltroUnidadMedida] = useState([])
  const [filtroTramo, setFiltroTramo] = useState([])

  let params
  if (filtroUnidadMedida.length > 0) {
    params = ''
    for (let i = 0; i < filtroUnidadMedida.length; i++) {
      params += `MtUnitOfMeasurementIds=${filtroUnidadMedida[i]['value']}&`
    }

    console.log(params)
  }
  if (filtroTramo.length > 0) {
    for (let i = 0; i < filtroTramo.length; i++) {
      params += `MtRoadSectionIds=${filtroTramo[i]['value']}&`
    }

    console.log(params)
  }

  const { data, mutate, isLoading } = useSWR(
    projectSelected !== null && projectSelected['value'] > 0
      ? `${process.env.API_URL}/Summary/GetMeasurementCompositeCatalogSummary/${projectSelected['value']}`
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
  const [searchInput, setSearchInput] = useState('')

  const [filtros, setFiltros] = useState<Option[]>([
    { label: 'Categoria 1', value: 'cat1', checked: true },
    { label: 'Categoria 2', value: 'cat2', checked: false },
    { label: 'Categoria 3', value: 'cat3', checked: false },
  ])

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [changedRows, setChangedRows] = useState<any[]>([])

  console.log(tramoRes)

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
    { label: 'Mediciones de actuaciones vs compuestas', link: null },
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
              titulo="Mediciones resumen de tramos"
              descripcion="Lista resumen de tramos"
              hideDescripcion={false}
              hideFilter={true}
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

                  tramos:
                    tramoRes !== undefined && tramoRes.status === 200
                      ? tramoRes.result.map((item: any) => ({
                          label: item.name,
                          value: String(item.id),
                        }))
                      : [],
                },
                values: {
                  unidadMedida: filtroUnidadMedida,
                  tramo: filtroTramo,
                },
              }}
              pageSize={0}
              onChangePageSize={() => {}}
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

                      console.log(changedRows)
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
              selectPlaceholder="Seleccionar proyecto"
              filterText="Categorias"
              columsValues={
                data != undefined && data.status == 200
                  ? data.result.summary.map((item: Item) => ({
                      mtRoadSectionsName: item.mtRoadSectionsName,
                      performanceName: item.performanceName,
                      compositeUdId: item.compositeUdId,
                      compositeCatalogName: item.compositeCatalogName,
                      mtUnitOfMeasurementName: item.mtUnitOfMeasurementName,
                      qt: String(item.qt),
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
                if (
                  'unidadMedida' in values &&
                  values.unidadMedida !== undefined
                )
                  setFiltroUnidadMedida(values.unidadMedida)

                if ('tramo' in values && values.tramo !== undefined)
                  setFiltroTramo(values.tramo)

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
              columsLabels={['Tramo', 'Actuacion', 'id', 'UOC', 'Unidad', 'Qt']}
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
              searchInputPlaceholder={''}
              searchInputValue={''}
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
