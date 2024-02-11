import { Column, DefaultCellTypes, Row } from '@silevis/reactgrid'

export const headerRow = (columns: Column[]): Row => ({
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
      case 'nombreUnidadSimple':
        elem = { type: 'header', text: 'Nombre *', style: { color: '#666179' } }
        break
      case 'descripcionUnidadSimple':
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
          text: 'Unidad de obra *',
          style: { color: '#666179' },
        }
        break
      case 'sap':
        elem = { type: 'header', text: 'SAP', style: { color: '#666179' } }
        break
      case 'global':
        elem = { type: 'header', text: 'Global', style: { color: '#666179' } }
        break
      case 'idUnidad':
        elem = {
          type: 'header',
          text: 'ID Unidad (autogenerado)',
          style: { color: '#666179' },
        }
        break
      case 'modal':
        elem = {
          type: 'header',
          text: 'Subespecialidad *',
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
