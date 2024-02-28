'use client'
import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useId,
  useMemo,
  MouseEventHandler,
  useCallback,
} from 'react'
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  CheckboxCell,
  DropdownCell,
  NumberCell,
  TextCell,
  Id,
  MenuOption,
  CellLocation,
  SelectionMode,
  Highlight,
  CellTemplates,
  DefaultCellTypes,
  DateCellTemplate,
  DateCell,
} from '@silevis/reactgrid'

import { FlagCell, FlagCellTemplate } from '../cells/flag'
import { ButtonCell, ButtonCellTemplate } from '../cells/button'
import { MaskFieldCell, MaskFieldCellTemplate } from '../cells/input_mask'
import { DateFieldCell, DateFieldCellTemplate } from '../cells/date'
// import { DropdownCell, DropdownCellTemplate } from "../cells/select";
import Papa from 'papaparse'
import SearchInput from '../inputs/searchInput'

import {
  FaFileImport,
  FaPlus,
  FaRegFile,
  FaRegTrashAlt,
  FaSyncAlt,
} from 'react-icons/fa'
import Select from 'react-select'

import classNames from 'classnames'

import { useDropzone } from 'react-dropzone'

// import * as XLSX from 'xlsx'

// import { readFile, utils, set_fs } from 'xlsx'
import { join } from 'path'
import { cwd } from 'process'

/* load 'stream' for stream support */
import { Readable } from 'stream'
import Loading from '../loading'

/* load the codepage support library for extended support with older formats  */
// import * as cpexcel from 'xlsx/dist/cpexcel'

// XLSX.stream.set_readable(Readable)
// XLSX.set_cptable(cpexcel)

const myCellTemplates: CellTemplates = {
  flag: new FlagCellTemplate(),
  button: new ButtonCellTemplate(),
  dateField: new DateFieldCellTemplate(),
  mask: new MaskFieldCellTemplate(),
  // 'dropdown': new DropdownCellTemplate
}

// export async function getServerSideProps() {
//   XLSX.set_fs(await import('fs'))
// }

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Props {
  titulo: string
  descripcion: string
  hideDescripcion: boolean
  items: any[]
  rows: Row<
    | DefaultCellTypes
    | FlagCell
    | ButtonCell
    | DateCell
    | DropdownCell
    | MaskFieldCell
  >[]
  columns: Column[]
  emptyElement: any
  options: any
  hideFilterInput: boolean
  loading: boolean
  searchInputPlaceholder: string
  filterText: string
  onChangeColumns: Function
  onChangeRows: Function
  onChange: Function
  onImport: Function
  onCellClick: Function
  searchInputValue: string
  onChangeSelect: Function
  onChangeInput: Function
  onSearch: Function
  onNewItem: Function
  onUpdateRow: Function
  onShowRow: Function
}

export default function SpreadSheetDep(props: Props) {
  const [columnStickyLeft, setColumsStickyLeft] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [_document, set_document] = useState<Document>()
  const [columnasMapeadas, setColumnasMapeadas] = useState<any>([])
  const [dataImported, setDataImported] = useState<any>([])
  const [columnsImported, setColumnsImported] = useState<any>([])
  const [modalFileUpload, setModalFileUpload] = useState(false)

  const [refresh, setRefresh] = useState(false)
  const [refreshButtonDisable, setRefreshButtonDisable] = useState(false)
  const [modalFileUploadXLSX, setModalFileUploadXLSX] = useState(false)
  // const [workbook, setWorkbook] = useState<XLSX.WorkBook>()
  const [modalCadenamientoInicial, setModalCadenamientoInicial] =
    useState(false)

  const uploadFile = async (files: any) => {
    if (files.length > 0) {
      console.log(files)

      switch (files[0].type) {
        case 'text/csv':
          Papa.parse(files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              setModalFileUpload(!modalFileUpload)

              const colums: string[] = Object.getOwnPropertyNames(
                results.data[0],
              )

              setColumnsImported(
                colums.map((item) => ({ label: item, value: item })),
              )
              setDataImported(results.data)

              if (_document) {
                const file: HTMLInputElement = _document.getElementById(
                  'fileUpload',
                ) as HTMLInputElement
                if (file) {
                  file.value = ''
                }
              }
            },
          })
          break

        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          // const filexlsx = XLSX.read( await event.target.files[0]) ;
          // const workbookFile = XLSX.read(await files[0].arrayBuffer())
          // setWorkbook(workbookFile)
          // console.log(workbookFile)
          // setModalFileUploadXLSX(!modalFileUploadXLSX)

          if (_document) {
            const file: HTMLInputElement = _document.getElementById(
              'fileUpload',
            ) as HTMLInputElement
            if (file) {
              file.value = ''
            }
          }
          break
      }
    }
  }

  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    await uploadFile(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    },
    maxFiles: 1,
    noDragEventsBubbling: true,
    noClick: true,
  })

  useEffect(() => {
    set_document(document)

    if (_document) {
      _document.body.style.overflow = 'hidden'
    }
  }, [])

  const handleChanges = (changes: CellChange<any>[]) => {
    props.onChange(changes)
  }

  const handleColumnResize = (ci: Id, width: number) => {
    const resizedColumns = props.columns

    const columnIndex = resizedColumns.findIndex((el) => el.columnId === ci)
    const resizedColumn = resizedColumns[columnIndex]
    const updatedColumn = { ...resizedColumn, width }
    resizedColumns[columnIndex] = updatedColumn

    props.onChangeColumns(resizedColumns)
  }

  const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements = arr.filter((_, idx) => idxs.includes(idx))
    const targetIdx =
      Math.min(...idxs) < to
        ? (to += 1)
        : (to -= idxs.filter((idx) => idx < to).length)
    const leftSide = arr.filter(
      (_, idx) => idx < targetIdx && !idxs.includes(idx),
    )
    const rightSide = arr.filter(
      (_, idx) => idx >= targetIdx && !idxs.includes(idx),
    )
    return [...leftSide, ...movedElements, ...rightSide]
  }

  const handleColumnsReorder = (targetColumnId: Id, columnIds: Id[]) => {
    const reorderedColumns = props.columns

    const to = reorderedColumns.findIndex(
      (column) => column.columnId === targetColumnId,
    )
    const columnIdxs = columnIds.map((columnId) =>
      reorderedColumns.findIndex((c) => c.columnId === columnId),
    )
    props.onChangeColumns(reorderArray(reorderedColumns, columnIdxs, to))
  }

  const handleContextMenu = (
    selectedRowIds: Id[],
    selectedColIds: Id[],
    selectionMode: SelectionMode,
    menuOptions: MenuOption[],
    selectedRanges: CellLocation[][],
  ): MenuOption[] => {
    const updateRow = {
      id: 'editarFila',
      label: 'Editar elemento',
      handler: () => {
        if (selectionMode === 'row' && selectedRowIds.length > 0)
          props.onUpdateRow(selectedRowIds)

        if (selectionMode === 'range' && selectedRanges.length > 0)
          props.onUpdateRow(selectedRanges[0][0].rowId)
      },
    }

    const showRow = {
      id: 'mostrarFila',
      label: 'Ver elemento',
      handler: () => {
        if (selectionMode === 'row' && selectedRowIds.length > 0)
          props.onShowRow(selectedRowIds)

        if (selectionMode === 'range' && selectedRanges.length > 0)
          props.onShowRow(selectedRanges[0][0].rowId)
      },
    }

    if (selectionMode === 'row') {
      menuOptions = [
        showRow,
        updateRow,
        {
          id: 'nuevoArriba',
          label: 'Nueva fila arriba',
          handler: () => {
            if (selectedRowIds.length == 0) {
              return
            }
            const index = Number(selectedRowIds[0])

            props.onChangeRows(
              [
                ...props.items.slice(0, index - 1),
                props.emptyElement,
                props.items.filter((item, idx) => item.idauto == index)[0],
                ...props.items.slice(index),
              ].map((item, idx) => ({ ...item, idauto: idx + 1 })),
            )
          },
        },
        {
          id: 'nuevoAbajo',
          label: 'Nueva fila abajo',
          handler: () => {
            if (selectedRowIds.length == 0) {
              return
            }
            const index = Number(selectedRowIds[0])

            props.onChangeRows(
              [
                ...props.items.slice(0, index),
                props.emptyElement,
                ...props.items.slice(index),
              ].map((item, idx) => ({ ...item, idauto: idx + 1 })),
            )
          },
        },
        {
          id: 'clonarFilas',
          label: 'Clonar fila',
          handler: () => {
            const newRows = props.items.filter((item, idx) =>
              selectedRowIds.includes(item.idauto),
            )
            const index = Number(selectedRowIds[0])

            props.onChangeRows(
              [
                ...props.items.slice(0, index),
                ...newRows,
                ...props.items.slice(index),
              ].map((item, idx) => ({ ...item, idauto: idx + 1 })),
            )
          },
        },
        {
          id: 'eliminarFila',
          label: 'Eliminar fila',
          handler: () => {
            props.onChangeRows(
              [
                ...props.items.filter(
                  (item, idx) => !selectedRowIds.includes(item.idauto),
                ),
              ].map((item, idx) => ({ ...item, idauto: idx + 1 })),
            )
          },
        },
      ]
    }

    if (selectionMode === 'column') {
      menuOptions = [
        // ...menuOptions,
        {
          id: 'fijarColumnaIzquierda',
          label:
            columnStickyLeft > 0
              ? 'Desbloquear columna a la izquierda'
              : 'Bloquear columna a la izquierda',
          handler: () => {
            if (columnStickyLeft == 0) {
              const columnIndex =
                props.columns.findIndex(
                  (item: Column, idx: number) =>
                    item.columnId == selectedColIds[0],
                ) + 1
              setColumsStickyLeft(columnIndex)
            } else {
              setColumsStickyLeft(0)
            }
          },
        },
      ]
    }
    if (selectionMode === 'range') {
      menuOptions[0].label = 'Copiar'
      menuOptions[1].label = 'Cortar'
      menuOptions[2].label = 'Pegar'

      menuOptions = [showRow, updateRow, ...menuOptions]
    }
    return menuOptions
  }

  const handleFocusCell = (location: CellLocation) => {
    if (
      typeof location.rowId === 'number' &&
      location.rowId > 0 &&
      location.columnId === 'descripcionUnidadSimple'
    ) {
      const cell = props.rows[location.rowId].cells[3]

      let description: string

      if ('text' in cell) {
        description = cell.text
      } else {
        description = 'Descripción vacía'
      }

      setModalCadenamientoInicial(true)
    }
    props.onCellClick(location)
  }

  return (
    <>
      <div className="relative max-h-screen overflow-x-auto bg-white shadow-md dark:bg-gray-900 sm:rounded-lg lg:m-auto">
        <div className=" justify-between p-5 text-left text-lg font-semibold  text-gray-900 dark:bg-gray-800  dark:text-white">
          <h3>{props.titulo}</h3>
          {props.hideDescripcion == undefined || !props.hideDescripcion ? (
            <p className="mb-4 mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              {props.descripcion}
            </p>
          ) : null}
          <div className="flex items-center justify-between px-3 pt-4">
            <form>
              <SearchInput
                label=""
                hideLabel={true}
                selectValue={null}
                hideFilter={props.hideFilterInput}
                selectPlaceholder={props.filterText}
                inputPlaceholder={props.searchInputPlaceholder}
                options={props.options}
                searchInputValue={props.searchInputValue}
                onChangeInput={(newValue: any) => props.onChangeInput(newValue)}
                onChangeSelect={(newValue: any) =>
                  props.onChangeSelect(newValue)
                }
                onSearch={(newValue: any) => props.onSearch(newValue)}
              />
            </form>
            <div className="mx-2 flex items-center justify-between pt-4">
              <button
                onClick={(evt: any) => props.onNewItem()}
                className="mx-1 flex items-center rounded-lg bg-green-700 px-3 py-1 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <FaPlus className="mr-2" style={{ height: 35 }} />
                Nuevo
              </button>
              <button
                disabled={refreshButtonDisable}
                onClick={(evt: any) => {
                  setRefresh(true)
                  setTimeout(() => {
                    setRefresh(false)
                  }, 500)
                }}
                className={classNames(
                  'mx-1 flex items-center rounded-lg px-3 py-1 text-center text-sm font-medium text-white focus:outline-none focus:ring-4',
                  refreshButtonDisable
                    ? ' bg-blue-400 hover:bg-blue-400'
                    : ' bg-blue-700 hover:bg-blue-800',
                )}
              >
                <FaSyncAlt className="mr-2" style={{ height: 35 }} />
                Actualizar contenido
              </button>
              <button
                onClick={(evt: any) => {
                  _document?.getElementById('fileUpload')?.click()
                }}
                className="mx-1 flex items-center rounded-lg bg-green-700 px-3 py-1 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <FaFileImport className="mr-2" style={{ height: 35 }} />
                Importar Archivo (CSV)
              </button>
              <form id="fileForm">
                <input
                  // {...getInputProps()}
                  id="fileUpload"
                  type="file"
                  accept=".csv, .xlsx"
                  onChange={async (event) => {
                    // Passing file data (event.target.files[0]) to parse using Papa.parse
                    await uploadFile(event.target.files)
                  }}
                  className=" hidden w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                />
              </form>
            </div>
          </div>
        </div>
        <div
          className="flex overflow-x-scroll overflow-y-scroll"
          style={{ height: '60vh' }}
          {...getRootProps()}
        >
          {!isDragActive ? (
            !refresh && !props.loading ? (
              <ReactGrid
                rows={props.rows}
                columns={props.columns}
                // highlights={highlights}
                onCellsChanged={handleChanges}
                onColumnsReordered={handleColumnsReorder}
                onColumnResized={handleColumnResize}
                enableRowSelection
                enableColumnSelection
                enableRangeSelection
                enableGroupIdRender
                enableFillHandle
                stickyTopRows={1}
                // stickyRightColumns={3}
                stickyLeftColumns={columnStickyLeft}
                // stickyRightColumns={columnStickyRigth}
                onContextMenu={handleContextMenu}
                onFocusLocationChanged={handleFocusCell}
                customCellTemplates={myCellTemplates}
              />
            ) : (
              <Loading label="" />
            )
          ) : (
            <div className="flex w-full items-center rounded-lg border-4 border-dashed border-gray-400 bg-white p-4 shadow-lg">
              <p
                className="text-center text-3xl text-gray-600"
                style={{ margin: '0 auto' }}
              >
                Arrastra tu archivos csv o Excel (xlsx)
              </p>
            </div>
          )}

          {modalFileUpload ? (
            <ModalFileUpload
              columnsImported={columnsImported}
              mappedColums={columnasMapeadas}
              onImport={async () => {
                await props.onImport(dataImported, columnasMapeadas)

                setDataImported([])
                setColumnasMapeadas([])
                setModalFileUpload(!modalFileUpload)
              }}
              onChange={(values) => setColumnasMapeadas(values)}
              onClose={() => setModalFileUpload(!modalFileUpload)}
            />
          ) : null}
          {/* {modalFileUploadXLSX ? (
            <ModalXLSX
              workbook={workbook}
              onClose={() => setModalFileUploadXLSX(!modalFileUploadXLSX)}
              columnsImported={columnsImported}
              mappedColums={columnasMapeadas}
              onImport={async () => {
                await props.onImport(dataImported, columnasMapeadas)

                setDataImported([])
                setColumnasMapeadas([])
                setModalFileUpload(!modalFileUpload)
              }}
              onChange={(values) => setColumnasMapeadas(values)}
            />
          ) : null} */}
        </div>
      </div>
    </>
  )
}

function ModalFileUpload({
  onClose = () => {},
  onChange = (values: any) => {},
  onImport = () => {},
  columnsImported = [],
  mappedColums = [],
}) {
  return (
    <>
      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 flex w-full items-center overflow-y-auto overflow-x-hidden p-4  md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Importando archivo
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex h-8 w-8  items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              <ImportMap
                columsImport={columnsImported}
                mappedColums={mappedColums}
                onChange={(values: any) => onChange(values)}
              />
            </div>
            <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
              <button
                onClick={onImport}
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Importar
              </button>
              <button
                onClick={onClose}
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}

interface ModalXLSXProps {
  onClose: MouseEventHandler<HTMLButtonElement>
  workbook: any
  columnsImported: any[]
  mappedColums: any[]
  onChange: MouseEventHandler<HTMLButtonElement>
  onImport: MouseEventHandler<HTMLButtonElement>
}

function ModalXLSX(props: ModalXLSXProps) {
  const [sheet, setSheet] = useState(null)

  return (
    <>
      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 flex w-full items-center overflow-y-auto overflow-x-hidden p-4  md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Modal xls
              </h3>
              <button
                type="button"
                onClick={props.onClose}
                className="ml-auto inline-flex h-8 w-8  items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              Hojas de trabajo
              <Select
                id="workbook-sheets"
                placeholder="Seleccione hoja de trabajo"
                className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                options={props.workbook.SheetNames.map((item: any) => ({
                  label: item,
                  value: item,
                }))}
                value={sheet}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menuList: (base) => ({ ...base, color: 'black' }),
                }}
                onChange={(newValue: any) => setSheet(newValue)}
              />
              {/* {sheet ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: XLSX.utils.sheet_to_html(
                      props.workbook.Sheets[sheet['value']],
                    ),
                  }}
                >
                  {}
                </div>
              ) : null} */}
            </div>
            <div className="space-y-6 p-6">
              <ImportMap
                columsImport={props.columnsImported}
                mappedColums={props.mappedColums}
                onChange={(values: any) => props.onChange(values)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}

interface ImportMapProps {
  mappedColums: any[]
  columsImport: any[]
  onChange: Function
}

const mapColumnOptions = [
  { label: 'Unidad de negocio', value: 'unidadNegocio' },
  { label: 'Codigo de actuacion', value: 'codigoActuacion' },
  { label: 'Expediente', value: 'expediente' },
  { label: 'Categoria de proyecto', value: 'categoriaProyecto' },
  { label: 'Categoria de actuacion', value: 'categoriaActuacion' },
  { label: 'Subcategoria de actuacion', value: 'subcategoriaActuacion' },
  { label: 'Especialidad de actuacion', value: 'especialidadActuacion' },
  { label: 'Unidad de obra', value: 'unidadObra' },
  { label: 'Anno', value: 'anno' },
  { label: 'Nombre de actuacion', value: 'nombreActuacion' },
  { label: 'Diferido', value: 'diferido' },
  { label: 'Sostenibilidad', value: 'sostenibilidad' },
  { label: 'PRA', value: 'PRA' },
  { label: 'Puntos negro TCA', value: 'puntosNegrosTCA' },
  { label: 'Codigo SAP', value: 'codigoSAP' },
  { label: 'Ambito de actuacion', value: 'ambitoActuacion' },
  { label: 'MRAsociado', value: 'MRAsociado' },
  { label: 'Fase/Tramo', value: 'faseTramo' },
  { label: 'Responsable', value: 'responsable' },
  { label: 'Aprobado', value: 'aprobado' },
]

const ids: string[] = []

export function ImportMap(props: ImportMapProps) {
  const [currentColumn, setCurrentColumn] = useState(null)
  const [currentColumFromFile, setCurrentColumFromFile] = useState(null)
  const [items, setItems] = useState(props.mappedColums)

  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const newId = useId()

  for (let i = 0; i < props.mappedColums.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  const handleColumnImportedChange = (newValue: any, id: any) => {
    if (id == 0) {
      setCurrentColumFromFile(newValue)
    }
  }

  const handleColumnChage = (newValue: any, id: any) => {
    const { value } = newValue
    if (id == 0) {
      setCurrentColumn(newValue)
    }
  }

  const handleAgregarColumnaMapeada = (e: any, id: any) => {
    if (currentColumFromFile == null || currentColumn == null) {
      return
    }
    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        columna: {
          label: currentColumn['label'],
          value: currentColumn['value'],
        },
        columnaMapeada: {
          label: currentColumFromFile['label'],
          value: currentColumFromFile['value'],
        },
      },
    ]

    setItems(list)
    setCurrentColumn(null)
    setCurrentColumFromFile(null)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarColumnaMapeada = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = items.filter((item) => item['id'] != id)
    setItems(list)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const EmptyInputs = (
    <tr
      key="fixed-key-for-dont-have-problem-with-focus-1"
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="w-5/12 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        style={{ minWidth: 300 }}
      >
        <Select
          id="column"
          instanceId={useId()}
          placeholder="Columna"
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={mapColumnOptions}
          value={currentColumn}
          onChange={(newValue) => handleColumnChage(newValue, 0)}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </th>
      <td className="w-5/12 px-6 py-4 " style={{ minWidth: 300 }}>
        <Select
          id="columnFromFile"
          instanceId={useId()}
          placeholder="Columna "
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={props.columsImport}
          value={currentColumFromFile}
          onChange={(newValue) => handleColumnImportedChange(newValue, 0)}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </td>
      <td className="w-1/12 px-6 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleAgregarColumnaMapeada(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaRegFile />
        </button>
      </td>
      <td className="w-1/12 px-6 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleEliminarColumnaMapeada(e, 0)}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  )

  return (
    <div className="mb-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            className={classNames(
              'text-xs uppercase text-gray-700',
              'bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
            )}
          >
            <tr>
              <th
                scope="col"
                className="w-5/12 px-6 py-3"
                style={{ minWidth: 300 }}
              >
                Columna
              </th>
              <th
                scope="col"
                className="w-5/12 px-6 py-3"
                style={{ minWidth: 300 }}
              >
                Columnas desde archivo
              </th>
              <th scope="col" className="w-1/12 px-6 py-3">
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className="w-1/12 px-6 py-3">
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length == 0
              ? EmptyInputs
              : items
                  .map((item, index) => (
                    <tr
                      key={crypto.randomUUID()}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="w-5/12 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        style={{ minWidth: 300 }}
                      >
                        <Select
                          // key={`esp-${item['id']}`}
                          isDisabled={true}
                          id={item['id']}
                          instanceId={item['id']}
                          placeholder="Columna"
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={mapColumnOptions}
                          value={item.columna}
                          onChange={(newValue) =>
                            handleColumnChage(newValue, item['id'])
                          }
                        />
                      </th>
                      <td
                        className="w-5/12 px-6 py-4 "
                        style={{ minWidth: 300 }}
                      >
                        <Select
                          // key={`esp-${item['id']}`}
                          isDisabled={true}
                          id={item['id']}
                          instanceId={item['id']}
                          placeholder="Columna"
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={props.columsImport}
                          value={item.columnaMapeada}
                          onChange={(newValue) =>
                            handleColumnImportedChange(newValue, item['id'])
                          }
                        />
                      </td>
                      <td className="w-1/12 px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAgregarColumnaMapeada(e, item['id'])
                          }
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaRegFile />
                        </button>
                      </td>
                      <td className="w-1/12 px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleEliminarColumnaMapeada(e, item['id'])
                          }
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                  .concat(EmptyInputs)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
