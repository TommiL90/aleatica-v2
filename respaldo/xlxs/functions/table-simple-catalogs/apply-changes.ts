import { SimpleUd } from '@/respaldo/contexts/types'
import {
  CellChange,
  CheckboxCell,
  DateCell,
  DropdownCell,
  NumberCell,
  TextCell,
} from '@silevis/reactgrid'

export const applyChanges = (
  changes: CellChange<
    TextCell | NumberCell | CheckboxCell | DropdownCell | DateCell
  >[],
  prevDetails: SimpleUd[],
  especialities: any[],
  getEmptyDataRow: () => SimpleUd,
): SimpleUd[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number
    const fieldName = change.columnId as keyof SimpleUd

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
                (el: any) => dataRow?.subCategoria === el.subcategory,
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
