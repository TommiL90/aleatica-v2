'use client'

import * as React from 'react'
import {
  Cell,
  CellTemplate,
  Compatible,
  Uncertain,
  UncertainCompatible,
  getCellProperty,
  getCharFromKey,
  isAlphaNumericKey,
  isNavigationKey,
  keyCodes,
} from '@silevis/reactgrid'
import InputMask from 'react-input-mask'

export interface MaskFieldCell extends Cell {
  type: 'mask'
  text: string
  placeholder?: string
  validator?: (text: string) => boolean
  renderer?: (text: string) => React.ReactNode
  errorMessage?: string
}

export class MaskFieldCellTemplate implements CellTemplate<MaskFieldCell> {
  private wasEscKeyPressed = false

  getCompatibleCell(
    uncertainCell: Uncertain<MaskFieldCell>,
  ): Compatible<MaskFieldCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string')
    let placeholder: string | undefined
    try {
      placeholder = getCellProperty(uncertainCell, 'placeholder', 'string')
    } catch {
      placeholder = ''
    }
    const value = parseFloat(text) // TODO more advanced parsing for all text based cells
    return { ...uncertainCell, text, value, placeholder }
  }

  update(
    cell: Compatible<MaskFieldCell>,
    cellToMerge: UncertainCompatible<MaskFieldCell>,
  ): Compatible<MaskFieldCell> {
    return this.getCompatibleCell({
      ...cell,
      text: cellToMerge.text,
      placeholder: cellToMerge.placeholder,
    })
  }

  handleKeyDown(
    cell: Compatible<MaskFieldCell>,
    keyCode: number,
    ctrl: boolean,
    shift: boolean,
    alt: boolean,
    key: string,
  ): { cell: Compatible<MaskFieldCell>; enableEditMode: boolean } {
    const char = getCharFromKey(key, shift)

    if (
      !ctrl &&
      !alt &&
      isAlphaNumericKey(keyCode) &&
      !(shift && keyCode === keyCodes.SPACE)
    )
      return {
        cell: this.getCompatibleCell({ ...cell, text: char }),
        enableEditMode: true,
      }
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    }
  }

  handleCompositionEnd(
    cell: Compatible<MaskFieldCell>,
    eventData: any,
  ): { cell: Compatible<MaskFieldCell>; enableEditMode: boolean } {
    return { cell: { ...cell, text: eventData }, enableEditMode: true }
  }

  getClassName(cell: Compatible<MaskFieldCell>, isInEditMode: boolean): string {
    const isValid = cell.validator ? cell.validator(cell.text) : true
    const className = cell.className ? cell.className : ''
    return `${isValid ? 'valid' : 'rg-invalid'} ${cell.placeholder && cell.text === '' ? 'placeholder' : ''} ${className}`
  }

  render(
    cell: Compatible<MaskFieldCell>,
    isInEditMode: boolean,
    onCellChanged: (cell: Compatible<MaskFieldCell>, commit: boolean) => void,
  ): React.ReactNode {
    // if (!isInEditMode) {
    //     const isValid = cell.validator ? cell.validator(cell.text) : true;
    //     const cellText = cell.text || cell.placeholder || '';
    //     const textToDisplay = !isValid && cell.errorMessage ? cell.errorMessage : cellText;
    //     return cell.renderer ? cell.renderer(textToDisplay) : textToDisplay;
    // }

    return (
      <InputMask
        mask="999+9999"
        alwaysShowMask={true}
        maskChar="#"
        value={cell.text}
        onChange={(e) => {
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            false,
          )
        }}
      />
    )
  }
}
