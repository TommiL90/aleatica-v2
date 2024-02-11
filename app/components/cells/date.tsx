'use client'
import * as React from 'react'
import {
  CellTemplate,
  Cell,
  Compatible,
  Uncertain,
  UncertainCompatible,
  isNavigationKey,
  getCellProperty,
  isAlphaNumericKey,
  keyCodes,
} from '@silevis/reactgrid'
import { cn } from '@/lib/utils'

// import "./flag-cell-style.css";

export interface DateFieldCell extends Cell {
  type: 'dateField'
  text: string
  value: number
}

export class DateFieldCellTemplate implements CellTemplate<DateFieldCell> {
  getCompatibleCell(
    uncertainCell: Uncertain<DateFieldCell>,
  ): Compatible<DateFieldCell> {
    const val = getCellProperty(uncertainCell, 'value', 'number')
    const text = String(val)
    const value = parseFloat(val)
    return { ...uncertainCell, text, value }
  }

  handleKeyDown(
    cell: Compatible<DateFieldCell>,
    keyCode: number,
    ctrl: boolean,
    shift: boolean,
    alt: boolean,
  ): { cell: Compatible<DateFieldCell>; enableEditMode: boolean } {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return { cell, enableEditMode: true }
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    }
  }

  update(
    cell: Compatible<DateFieldCell>,
    cellToMerge: UncertainCompatible<DateFieldCell>,
  ): Compatible<DateFieldCell> {
    return this.getCompatibleCell({
      ...cell,
      text: cellToMerge.text,
      value: cellToMerge.value,
    })
  }

  render(
    cell: Compatible<DateFieldCell>,
    isInEditMode: boolean,
    onCellChanged: (cell: Compatible<DateFieldCell>, commit: boolean) => void,
  ): React.ReactNode {
    return (
      <input
        type="date"
        value={cell.value}
        onChange={(evt: any) => {
          console.log(evt)
        }}
        className={cn(
          'block w-full rounded-lg border text-sm',
          'border-gray-300 bg-white  text-gray-900 focus:border-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
        )}
      />
    )
  }
}
