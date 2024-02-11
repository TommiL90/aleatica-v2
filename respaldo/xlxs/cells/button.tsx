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

import { FaEdit } from 'react-icons/fa'
import { cn } from '@/lib/utils'

export interface ButtonCell extends Cell {
  type: 'button'
  text: string
  size: number
  enabled: boolean
  id: string | number
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: Function
}

export class ButtonCellTemplate implements CellTemplate<ButtonCell> {
  getCompatibleCell(
    uncertainCell: Uncertain<ButtonCell>,
  ): Compatible<ButtonCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string')
    const id = getCellProperty(uncertainCell, 'id', 'number')
    const size = getCellProperty(uncertainCell, 'size', 'number')
    const enabled = getCellProperty(uncertainCell, 'enabled', 'boolean')
    const onClick = getCellProperty(uncertainCell, 'onClick', 'function')
    const value = parseFloat(text)
    return { ...uncertainCell, text, value, size, id, onClick, enabled }
  }

  handleKeyDown(
    cell: Compatible<ButtonCell>,
    keyCode: number,
    ctrl: boolean,
    shift: boolean,
    alt: boolean,
  ): { cell: Compatible<ButtonCell>; enableEditMode: boolean } {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return { cell, enableEditMode: true }
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    }
  }

  update(
    cell: Compatible<ButtonCell>,
    cellToMerge: UncertainCompatible<ButtonCell>,
  ): Compatible<ButtonCell> {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text })
  }

  render(
    cell: Compatible<ButtonCell>,
    isInEditMode: boolean,
    onCellChanged: (cell: Compatible<ButtonCell>, commit: boolean) => void,
  ): React.ReactNode {
    return (
      <>
        {cell.size >= 0 ? (
          <button
            onClick={() => cell.onClick(cell.id)}
            className={cn(
              'flex w-full items-center text-sm font-medium focus:outline-none',
              cell.size > 0
                ? 'block w-full rounded-lg bg-gray-100 text-sm text-gray-800'
                : 'dark:focus:red-gray-700  text-red-700 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white',
            )}
            type="button"
          >
            <FaEdit className="mr-2" style={{ height: 35 }} />
            <span className="mr-auto">{cell.text}</span>
            <span
              className={cn(
                'float-right ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold',
                cell.size > 0
                  ? 'bg-gray-300 text-gray-800'
                  : 'bg-red-300 text-red-800',
              )}
            >
              {cell.size}
            </span>
          </button>
        ) : (
          <button
            disabled={!cell.enabled}
            onClick={() => cell.onClick(cell.id)}
            className={cn(
              'rounded-lgbg-transparent block h-full w-full items-center text-center text-sm font-medium focus:outline-none',
              cell.enabled ? ' text-blue-700 ' : ' text-gray-400 ',
            )}
            type="button"
          >
            {cell.text}
          </button>
        )}
      </>
    )
  }
}
