import React, {
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  CellChange,
  CellLocation,
  CellTemplates,
  CheckboxCell,
  Column,
  DateCell,
  DateCellTemplate,
  DefaultCellTypes,
  DropdownCell,
  Highlight,
  Id,
  MenuOption,
  NumberCell,
  ReactGrid,
  Row,
  SelectionMode,
  TextCell,
} from '@silevis/reactgrid'

import '@silevis/reactgrid/styles.css'
import { ButtonCell, ButtonCellTemplate } from '../cells/button'
import { DateFieldCellTemplate } from '../cells/date'
import { FlagCell, FlagCellTemplate } from '../cells/flag'
import { MaskFieldCell, MaskFieldCellTemplate } from '../cells/input_mask'

/* load 'stream' for stream support */

const myCellTemplates: CellTemplates = {
  flag: new FlagCellTemplate(),
  button: new ButtonCellTemplate(),
  dateField: new DateFieldCellTemplate(),
  mask: new MaskFieldCellTemplate(),
  // 'dropdown': new DropdownCellTemplate
}

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Props {
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
  loading: boolean
  onChangeColumns: Function
  onChangeRows: Function
  onChange: Function
  onCellClick: Function
  onUpdateRow: Function
  onShowRow: Function
}

export default function SpreadSheetBody({
  columns,
  emptyElement,
  items,
  loading,
  onCellClick,
  onChange,
  onChangeColumns,
  onChangeRows,
  onShowRow,
  onUpdateRow,
  rows,
}: Props) {
  const [columnStickyLeft, setColumsStickyLeft] = useState(0)
  const [_document, set_document] = useState<Document>()
  const [modalCadenamientoInicial, setModalCadenamientoInicial] =
    useState(false)
  const [refresh] = useState(false)

  useEffect(() => {
    set_document(document)

    if (_document) {
      _document.body.style.overflow = 'hidden'
    }
  }, [_document, items])

  const handleChanges = (changes: CellChange<any>[]) => {
    onChange(changes)
  }

  const handleColumnResize = (ci: Id, width: number) => {
    const resizedColumns = columns

    const columnIndex = resizedColumns.findIndex((el) => el.columnId === ci)
    const resizedColumn = resizedColumns[columnIndex]
    const updatedColumn = { ...resizedColumn, width }
    resizedColumns[columnIndex] = updatedColumn

    onChangeColumns(resizedColumns)
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
    const reorderedColumns = columns

    const to = reorderedColumns.findIndex(
      (column) => column.columnId === targetColumnId,
    )
    const columnIdxs = columnIds.map((columnId) =>
      reorderedColumns.findIndex((c) => c.columnId === columnId),
    )
    onChangeColumns(reorderArray(reorderedColumns, columnIdxs, to))
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
          onUpdateRow(selectedRowIds)

        if (selectionMode === 'range' && selectedRanges.length > 0)
          onUpdateRow(selectedRanges[0][0].rowId)
      },
    }

    const showRow = {
      id: 'mostrarFila',
      label: 'Ver elemento',
      handler: () => {
        if (selectionMode === 'row' && selectedRowIds.length > 0)
          onShowRow(selectedRowIds)

        if (selectionMode === 'range' && selectedRanges.length > 0)
          onShowRow(selectedRanges[0][0].rowId)
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

            onChangeRows(
              [
                ...items.slice(0, index - 1),
                emptyElement,
                items.filter((item, idx) => item.idauto == index)[0],
                ...items.slice(index),
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

            onChangeRows(
              [
                ...items.slice(0, index),
                emptyElement,
                ...items.slice(index),
              ].map((item, idx) => ({ ...item, idauto: idx + 1 })),
            )
          },
        },
        {
          id: 'clonarFilas',
          label: 'Clonar fila',
          handler: () => {
            const newRows = items.filter((item, idx) =>
              selectedRowIds.includes(item.idauto),
            )
            const index = Number(selectedRowIds[0])

            onChangeRows(
              [...items.slice(0, index), ...newRows, ...items.slice(index)].map(
                (item, idx) => ({ ...item, idauto: idx + 1 }),
              ),
            )
          },
        },
        {
          id: 'eliminarFila',
          label: 'Eliminar fila',
          handler: () => {
            onChangeRows(
              [
                ...items.filter(
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
                columns.findIndex(
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
    // if (
    //   typeof location.rowId === "number" &&
    //   location.rowId > 0 &&
    //   location.columnId === "descripcionUnidadSimple"
    // ) {
    //   const cell = rows[location.rowId].cells[3]

    //   let description: string

    //   if ("text" in cell) {
    //     description = cell.text
    //   } else {
    //     description = "Descripción vacía"
    //   }

    //   setModalCadenamientoInicial(true)
    // }
    onCellClick(location)
  }

  return (
    <>
      <div className="flex overflow-scroll" style={{ height: '60vh' }}>
        {!refresh && !loading ? (
          <ReactGrid
            rows={rows}
            columns={columns}
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
          <p>loading</p>
        )}
      </div>
    </>
  )
}
