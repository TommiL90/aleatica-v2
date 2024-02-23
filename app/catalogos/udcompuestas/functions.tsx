import {
  CellChange,
  CheckboxCell,
  Column,
  DateCell,
  DefaultCellTypes,
  DropdownCell,
  NumberCell,
  Row,
  TextCell,
} from '@silevis/reactgrid'

import { ButtonCell } from '@/components/cells/button'
import { FlagCell } from '@/components/cells/flag'

import { UnidadCompuesta } from './compost-catalog-table'

export const composUdCreator = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      compositeUdName: string
      description: string
      mtSpecialtyActionId: number
      count: string
      sapId: string
      code: string
      simpleCatalogsIds: number[]
    }
  },
) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export const composGetEmpty = (id: number = 1): UnidadCompuesta => ({
  idauto: id,
  id: 0,
  idUnidad: '',
  nombreUnidadCompuesta: ``,
  descripcionUnidadCompuesta: ``,
  codigoCompuesta: '',
  counter: '',
  subCategoria: null,
  especialidad: null,
  unidadObra: null,
  sap: ``,
  unidadesSimples: [],
  unidadObraisOpen: false,
  subcategoriaisOpen: false,
  especialidadisOpen: false,
  especialidadesFilter: [],
  newItem: true,
})
export const composMoreRows = (
  unidades: UnidadCompuesta[],
  exceed: number = 100,
) => [
  ...unidades,
  ...Array.from({ length: exceed }, (item, idx) => ({
    ...composGetEmpty(unidades.length + 1),
    idauto: unidades.length + idx + 1,
    // counter: getCounter(unidades.length + idx + 1)
  })),
]

export const getUnidadesCompuestas = (): UnidadCompuesta[] => []

export const getComposColumns = (): Column[] => [
  { columnId: 'id', width: 30, reorderable: true, resizable: true },
  { columnId: 'idUnidad', width: 200, reorderable: true, resizable: true },
  {
    columnId: 'codigoCompuesta',
    width: 200,
    reorderable: true,
    resizable: true,
  },
  {
    columnId: 'nombreUnidadCompuesta',
    width: 200,
    reorderable: true,
    resizable: true,
  },
  {
    columnId: 'descripcionUnidadCompuesta',
    width: 350,
    reorderable: true,
    resizable: true,
  },
  { columnId: 'unidadObra', width: 200, reorderable: true, resizable: true },
  // { columnId: "counter", width: 200, reorderable: true, resizable: true },
  { columnId: 'subCategoria', width: 200, reorderable: true, resizable: true },
  { columnId: 'especialidad', width: 200, reorderable: true, resizable: true },

  // { columnId: "codigoCompuesta", width: 350, reorderable: true, resizable: true },
  { columnId: 'sap', width: 200, reorderable: true, resizable: true },

  { columnId: 'modal', width: 150, reorderable: true },
  { columnId: 'button_save', width: 100, reorderable: true },
  { columnId: 'button_delete', width: 100, reorderable: true },
]
export const composHeaderRow = (columns: Column[]): Row => ({
  rowId: 'header',
  height: 35,
  cells: columns.map((col) => {
    let elem: DefaultCellTypes = {
      type: 'header',
      text: '',
      style: { color: '' },
    }
    switch (col.columnId) {
      case 'id':
        elem = { type: 'header', text: 'No', style: { color: '#666179' } }
        break
      case 'codigoCompuesta':
        elem = {
          type: 'header',
          text: 'Codigo compuesta',
          style: { color: '#666179' },
        }
        break
      case 'nombreUnidadCompuesta':
        elem = { type: 'header', text: 'Nombre *', style: { color: '#666179' } }
        break
      case 'descripcionUnidadCompuesta':
        elem = {
          type: 'header',
          text: 'Descripcion *',
          style: { color: '#666179' },
        }
        break
      case 'counter':
        elem = { type: 'header', text: 'Contador', style: { color: '#666179' } }
        break
      case 'subCategoria':
        elem = {
          type: 'header',
          text: 'Subcategoria *',
          style: { color: '#666179' },
        }
        break
      case 'especialidad':
        elem = {
          type: 'header',
          text: 'Especialidad *',
          style: { color: '#666179' },
        }
        break
      case 'unidadObra':
        elem = {
          type: 'header',
          text: 'Unidad de Obra *',
          style: { color: '#666179' },
        }
        break
      case 'sap':
        elem = { type: 'header', text: 'SAP', style: { color: '#666179' } }
        break
      case 'idUnidad':
        elem = {
          type: 'header',
          text: 'ID Unidad',
          style: { color: '#666179' },
        }
        break
      case 'modal':
        elem = {
          type: 'header',
          text: 'Unidades Simples *',
          style: { color: '#666179' },
        }
        break
      case 'button_save':
        elem = { type: 'header', text: '', style: { color: '#666179' } }
        break
      case 'button_delete':
        elem = { type: 'header', text: '', style: { color: '#666179' } }
        break
    }

    return elem
  }),
})

export const composGetRows = (
  unidades: UnidadCompuesta[],
  columns: Column[],
  subcategories: any[],
  especialities: any[],
  measurementUnits: any[],
): Row<
  DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell
>[] => [
  composHeaderRow(columns),
  ...unidades.map<
    Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>
  >((item, idx) => ({
    rowId: idx + 1, // item.idauto,
    reorderable: true,
    height: 35,
    cells: columns.map((col) => {
      let elem:
        | DefaultCellTypes
        | FlagCell
        | ButtonCell
        | DateCell
        | DropdownCell = { type: 'header', text: '', style: { color: '' } }
      switch (col.columnId) {
        case 'id':
          elem = {
            type: 'header',
            text: `${item.idauto}`,
            style: { color: '#666179' },
          }
          break
        case 'idUnidad':
          elem = {
            type: 'header',
            text: `${item.idUnidad}`,
            style: { color: '#666179' },
          }
          break
        case 'modal':
          elem = {
            type: 'button',
            text: `Editar`,
            style: { color: '#666179' },
            enabled: true,
            size: -1,
            id: item.id,
            onClick: () => {},
          }
          break
        case 'button_save':
          elem = {
            type: 'button',
            text: `Guardar`,
            style: { color: '#666179' },
            enabled:
              item.nombreUnidadCompuesta != '' &&
              item.descripcionUnidadCompuesta != '' &&
              // item.counter !=  ""&&
              // item.codigoCompuesta != "" &&
              // item.sap !=  "" &&
              item.unidadObra != '' &&
              item.subCategoria != '' &&
              item.especialidad != '' &&
              item.unidadesSimples.length > 0,
            size: -1,
            id: item.id,
            onClick: () => {},
          }
          break
        case 'button_delete':
          elem = {
            type: 'button',
            text: `Eliminar`,
            style: { color: '#666179' },
            enabled: item.id > 0,
            size: -1,
            id: item.id,
            onClick: () => {},
          }
          break
        case 'sap':
          elem = {
            type: 'text',
            text: item.sap,
            className: 'text-sm block w-full text-gray-800',
          }
          break

        case 'nombreUnidadCompuesta':
          elem = {
            type: 'text',
            text: item.nombreUnidadCompuesta,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'descripcionUnidadCompuesta':
          elem = {
            type: 'text',
            text: item.descripcionUnidadCompuesta,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'counter':
          elem = {
            type: 'text',
            text: item.counter,
            className: 'text-sm block w-full text-gray-800',
          }
          break

        case 'codigoCompuesta':
          elem = {
            type: 'text',
            text: item.codigoCompuesta,
            className: 'text-sm block w-full text-gray-800',
          }
          break

        case 'subCategoria':
          elem = {
            type: 'dropdown',
            selectedValue: item.subCategoria,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.subcategoriaisOpen,
            values: subcategories,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'especialidad':
          elem = {
            type: 'dropdown',
            selectedValue: item.especialidad,
            // inputValue: item.especialidadActuacion,
            isOpen: item.especialidadisOpen,
            values: item.especialidadesFilter,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'unidadObra':
          elem = {
            type: 'dropdown',
            selectedValue: item.unidadObra,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.unidadObraisOpen,
            values: measurementUnits,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
      }

      return elem
    }),
  })),
]
export const composeApplyChanges = (
  changes: CellChange<
    TextCell | NumberCell | CheckboxCell | DropdownCell | DateCell
  >[],
  prevDetails: UnidadCompuesta[],
  especialities: any[],
  getEmptyDataRow: () => UnidadCompuesta,
): UnidadCompuesta[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number
    const fieldName = change.columnId as keyof UnidadCompuesta

    let dataRow = prevDetails.find((d) => d.idauto === dataRowId)

    if (!dataRow) {
      dataRow = getEmptyDataRow()
      prevDetails.push(dataRow)

      // return;
    }
    if (change.type === 'text' && typeof dataRow[fieldName] === 'string') {
      dataRow[fieldName] = change.newCell.text as never
    } else if (
      change.type === 'number' &&
      typeof dataRow[fieldName] === 'number'
    ) {
      dataRow[fieldName] = change.newCell.value as never
    } else if (
      change.type === 'checkbox' &&
      typeof dataRow[fieldName] === 'boolean'
    ) {
      dataRow[fieldName] = change.newCell.checked as never
    } else if (change.type === 'dropdown') {
      /**
       * Checking for an opening/closing of a dropdown list
       */

      if (change.previousCell.isOpen !== change.newCell.isOpen) {
        switch (fieldName) {
          case 'subCategoria':
            dataRow.subcategoriaisOpen = change.newCell.isOpen as never
            dataRow.especialidadesFilter = [
              ...especialities.filter(
                (el: any) => dataRow?.subCategoria == el.subcategory,
              ),
            ]
            break

          case 'especialidad':
            dataRow.especialidadisOpen = change.newCell.isOpen as never
            break
          case 'unidadObra':
            dataRow.unidadObraisOpen = change.newCell.isOpen as never
            break
        }
      }

      if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
        dataRow[fieldName] = change.newCell.selectedValue as never
      }
    }
  })

  return [...prevDetails]
}
