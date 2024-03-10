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
import { Actuacion } from './actions-table'
import { FlagCell } from '@/components/cells/flag'
import { ButtonCell } from '@/components/cells/button'

export const getActuaciones = (): Actuacion[] => []

export const getActionsColumns = (): Column[] => [
  { columnId: 'id', width: 30, reorderable: true, resizable: true },
  {
    columnId: 'categoriaProyecto',
    width: 250,
    reorderable: true,
    resizable: true,
  },
  {
    columnId: 'categoriaActuacion',
    width: 250,
    reorderable: true,
    resizable: true,
  },
  { columnId: 'expediente', width: 200, reorderable: true, resizable: true },
  { columnId: 'noActuacion', width: 200, reorderable: true, resizable: true },

  { columnId: 'diferido', width: 70, reorderable: true, resizable: true },
  {
    columnId: 'nombreActuacion',
    width: 250,
    reorderable: true,
    resizable: true,
  },
  { columnId: 'idActuacion', width: 250, reorderable: true, resizable: true },
  { columnId: 'idExpediente', width: 250, reorderable: true, resizable: true },
  { columnId: 'codigoSAP', width: 250, reorderable: true, resizable: true },
  { columnId: 'MRAsociado', width: 250, reorderable: true, resizable: true },
  { columnId: 'faseTramo', width: 250, reorderable: true, resizable: true },
  { columnId: 'sostenibilidad', width: 70, reorderable: true, resizable: true },
  { columnId: 'PRA', width: 70, reorderable: true, resizable: true },
  {
    columnId: 'puntosNegrosTCA',
    width: 250,
    reorderable: true,
    resizable: true,
  },
  { columnId: 'unidadObra', width: 120, reorderable: true, resizable: true },
  {
    columnId: 'ambitoActuacion',
    width: 250,
    reorderable: true,
    resizable: true,
  },

  { columnId: 'modal', width: 150, reorderable: true, resizable: true },
  { columnId: 'button_save', width: 150, reorderable: true },
  { columnId: 'button_delete', width: 150, reorderable: true },
]

export const headerActionsRow = (columns: Column[]): Row => ({
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
      case 'modal':
        elem = {
          type: 'header',
          text: 'Unidades compuestas',
          style: { color: '#666179' },
        }
        break
      case 'noActuacion':
        elem = {
          type: 'header',
          text: 'No. Actuacion',
          style: { color: '#666179' },
        }
        break
      // case "unidadNegocio": elem = { type: "header", text: "Unidad de negocio", style: {color: '#666179'}}; break;
      case 'codigoActuacion':
        elem = {
          type: 'header',
          text: 'Codigo de actuacion',
          style: { color: '#666179' },
        }
        break
      case 'expediente':
        elem = {
          type: 'header',
          text: 'Expediente',
          style: { color: '#666179' },
        }
        break
      case 'categoriaProyecto':
        elem = {
          type: 'header',
          text: 'Categoria de proyecto *',
          style: { color: '#666179' },
        }
        break
      case 'categoriaActuacion':
        elem = {
          type: 'header',
          text: 'Categoria de actuacion *',
          style: { color: '#666179' },
        }
        break
      // case "subcategoriaActuacion": elem = { type: "header", text: "Subcategoria de actuacion", style: {color: '#666179'}}; break;
      // case "especialidadActuacion": elem = { type: "header", text: "Especialidad de actuacion", style: {color: '#666179'}}; break;
      case 'unidadObra':
        elem = {
          type: 'header',
          text: 'Unidad de obra',
          style: { color: '#666179' },
        }
        break
      // case "anno": elem = { type: "header", text: "Anno", style: {color: '#666179'}}; break;
      case 'nombreActuacion':
        elem = {
          type: 'header',
          text: 'Nombre de actuacion *',
          style: { color: '#666179' },
        }
        break
      case 'idActuacion':
        elem = {
          type: 'header',
          text: 'ID actuacion',
          style: { color: '#666179' },
        }
        break
      case 'idExpediente':
        elem = {
          type: 'header',
          text: 'ID expediente',
          style: { color: '#666179' },
        }
        break
      case 'diferido':
        elem = { type: 'header', text: 'Diferido', style: { color: '#666179' } }
        break
      case 'sostenibilidad':
        elem = {
          type: 'header',
          text: 'Sostenibilidad',
          style: { color: '#666179' },
        }
        break
      case 'PRA':
        elem = { type: 'header', text: 'PRA', style: { color: '#666179' } }
        break
      case 'puntosNegrosTCA':
        elem = {
          type: 'header',
          text: 'Puntos Negros / TCA',
          style: { color: '#666179' },
        }
        break
      case 'codigoSAP':
        elem = {
          type: 'header',
          text: 'ID SAP',
          style: { color: '#666179' },
        }
        break
      case 'ambitoActuacion':
        elem = {
          type: 'header',
          text: 'Ambito de actuacion',
          style: { color: '#666179' },
        }
        break
      case 'MRAsociado':
        elem = {
          type: 'header',
          text: 'MR Asociado',
          style: { color: '#666179' },
        }
        break
      case 'faseTramo':
        elem = {
          type: 'header',
          text: 'Fase / Tramo *',
          style: { color: '#666179' },
        }
        break
      // case "responsable": elem = { type: "header", text: "Responsable", style: {color: '#666179'}}; break;
      // case "aprobado": elem = { type: "header", text: "Aprobado", style: {color: '#666179'}}; break;
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

export const getActionsRows = (
  actuacion: Actuacion[],
  columns: Column[],
  subcategorias: any[],
  especialidades: any[],
  categoriasProyectos: any[],
  categoriasActuacion: any[],
  tramos: any[],
  unidadesMedida: any[],
  ambitoActuacion: any[],
  MRs: any[],
  tcas: any[],
): Row<
  DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell
>[] => [
  headerActionsRow(columns),
  ...actuacion.map<
    Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>
  >((item, idx) => ({
    rowId: idx + 1,
    reorderable: false,
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

        case 'modal':
          elem = {
            type: 'button',
            text: `Editar`,
            style: { color: '#666179' },
            enabled: true,
            size: item.unidadesCompuestas.length,
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
              // item.codigoActuacion != "" &&
              item.expediente != '' &&
              item.categoriaProyecto != '' &&
              item.categoriaActuacion != '' &&
              // item.subcategoriaActuacion != "" &&
              // item.especialidadActuacion != "" &&
              // item.unidadObra != "" &&
              // item.anno != "" &&
              item.nombreActuacion != '' &&
              // item.puntosNegrosTCA != "" &&
              // item.codigoSAP != "" &&
              // item. ambitoActuacion != "" &&
              // item.MRAsociado != "" &&
              item.faseTramo != '' &&
              item.unidadesCompuestas.length > 0,
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
        // case "fecha": elem = { type: "date", date: new Date(item.fecha), format: new Intl.DateTimeFormat('es', { year: 'numeric', month: 'long', day: 'numeric' }), className: 'text-sm block w-full text-gray-800'}; break;

        // case "unidadNegocio":
        //   elem = {
        //     type: "dropdown",
        //     selectedValue: item.unidadNegocio,
        //     //inputValue: item.unidadNegocio,
        //     isOpen: item.unidadNegocioisOpen,
        //     values: unidadNegocioIndicadores.map((p) => ({ label: p.nombre, value: p.codigo })),
        //     className: 'text-sm block w-full bg-gray-100 text-gray-800',
        //   };
        //   break;

        case 'idActuacion':
          elem = {
            type: 'header',
            text: item.idActuacion,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'idExpediente':
          elem = {
            type: 'header',
            text: item.idExpediente,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'expediente':
          elem = {
            type: 'text',
            text: item.expediente,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'noActuacion':
          elem = {
            type: 'text',
            text: item.noActuacion,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'categoriaProyecto':
          elem = {
            type: 'dropdown',
            selectedValue: item.categoriaProyecto,
            // inputValue: item.categoriaProyecto,
            isOpen: item.categoriaProyectoisOpen,
            values: categoriasProyectos,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'categoriaActuacion':
          elem = {
            type: 'dropdown',
            selectedValue: item.categoriaActuacion,
            // inputValue: item.categoriaActuacion,
            isOpen: item.categoriaActuacionisOpen,
            values: categoriasActuacion,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'puntosNegrosTCA':
          elem = {
            type: 'dropdown',
            selectedValue: item.puntosNegrosTCA,
            // inputValue: item.categoriaProyecto,
            isOpen: item.puntosNegrosTCAisOpen,
            values: tcas,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
        // case 'puntosNegrosTCA':
        //   elem = {
        //     type: 'text',
        //     text: item.puntosNegrosTCA,
        //     style: { color: '#666179' },
        //   }
        //   break

        // case "subcategoriaActuacion":
        //   elem = {
        //     type: "dropdown",
        //     selectedValue: item.subcategoriaActuacion,
        //   // inputValue: item.subcategoriaActuacion,
        //     isOpen: item.subcategoriaActuacionisOpen,
        //     values: subcategorias,
        //     className: 'text-sm  block w-full bg-gray-100 text-gray-800'
        //   };
        //   break;

        // case "especialidadActuacion":
        //   elem = {
        //     type: "dropdown",
        //     selectedValue: item.especialidadActuacion,
        //     //inputValue: item.especialidadActuacion,
        //     isOpen: item.especialidadActuacionisOpen,
        //     values: item.especialidadesFilter,
        //     // text: item.especialidadActuacion,
        //     className: 'text-sm  block w-full bg-gray-100 text-gray-800'
        //   };
        //   break;

        case 'unidadObra':
          elem = {
            type: 'dropdown',
            selectedValue: item.unidadObra,
            // inputValue: item.unidadObra,
            isOpen: item.unidadObraisOpen,
            values: unidadesMedida,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        // case "anno": elem = { type: "text", text: item.anno, className: 'text-sm block w-full text-gray-800' }; break;
        case 'nombreActuacion':
          elem = {
            type: 'text',
            text: item.nombreActuacion,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'diferido':
          elem = {
            type: 'checkbox',
            checked: item.diferido,
            className:
              'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
          }
          break
        case 'sostenibilidad':
          elem = {
            type: 'checkbox',
            checked: item.sostenibilidad,
            className:
              'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
          }
          break
        case 'PRA':
          elem = {
            type: 'checkbox',
            checked: item.PRA,
            className:
              'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
          }
          break

        case 'codigoSAP':
          elem = {
            type: 'text',
            text: item.codigoSAP,
            style: { color: '#666179' },
          }
          break

        case 'ambitoActuacion':
          elem = {
            type: 'dropdown',
            selectedValue: item.ambitoActuacion,

            // inputValue: item.ambitoActuacion,
            isOpen: item.ambitoActuacionisOpen,
            values: ambitoActuacion,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'MRAsociado':
          elem = {
            type: 'dropdown',
            selectedValue: item.MRAsociado,
            // inputValue: item.MRAsociado,
            isOpen: item.MRAsociadoisOpen,
            values: MRs,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'faseTramo':
          elem = {
            type: 'dropdown',
            selectedValue: item.faseTramo,
            // inputValue: item.faseTramo,
            isOpen: item.faseTramoisOpen,
            values: tramos,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
      }

      return elem
    }),
  })),
]

export const getActionsEmpty = (id: number = 1): Actuacion => ({
  idauto: id,
  id: 0,

  idActuacion: '',
  idExpediente: '',

  categoriaProyectoName: '',
  categoriaActuacionName: '',
  ambitoActuacionName: '',

  expediente: '',
  categoriaProyecto: '',
  categoriaActuacion: '',
  subcategoriaActuacion: '',
  especialidadActuacion: '',
  unidadObra: '',
  noActuacion: '',
  // anno: "",
  nombreActuacion: '',
  diferido: false,
  sostenibilidad: false,
  PRA: false,
  puntosNegrosTCA: '',
  codigoSAP: '',
  ambitoActuacion: '',
  MRAsociado: '',
  faseTramo: '',
  unidadesCompuestas: [],
  categoriaProyectoisOpen: false,
  categoriaActuacionisOpen: false,
  // subcategoriaActuacionisOpen: false,
  // especialidadActuacionisOpen: false,
  puntosNegrosTCAisOpen: false,
  unidadObraisOpen: false,
  ambitoActuacionisOpen: false,
  MRAsociadoisOpen: false,
  faseTramoisOpen: false,
  // especialidadesFilter: [],
  newItem: true,
  unidadNegocioisOpen: false,
})

export const applyActionsChanges = (
  changes: CellChange<
    TextCell | NumberCell | CheckboxCell | DropdownCell | DateCell
  >[],
  prevDetails: Actuacion[],
  especialities: any[],
  getEmptyDataRow: () => Actuacion,
): Actuacion[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number
    const fieldName = change.columnId as keyof Actuacion

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
          case 'categoriaProyecto':
            dataRow.categoriaProyectoisOpen = change.newCell.isOpen as never
            break
          // case 'unidadNegocio' : dataRow.unidadNegocioisOpen = change.newCell.isOpen as never; break;
          case 'categoriaActuacion':
            dataRow.categoriaActuacionisOpen = change.newCell.isOpen as never
            break
          // case 'subcategoriaActuacion' :
          //   dataRow.subcategoriaActuacionisOpen = change.newCell.isOpen as never;
          //   dataRow.especialidadesFilter = [...especialities.filter((el: any) => dataRow?.subcategoriaActuacion == el.subcategory)];
          //   break;

          case 'puntosNegrosTCA':
            dataRow.puntosNegrosTCAisOpen = change.newCell.isOpen as never
            break
          case 'unidadObra':
            dataRow.unidadObraisOpen = change.newCell.isOpen as never
            break

          case 'ambitoActuacion':
            dataRow.ambitoActuacionisOpen = change.newCell.isOpen as never
            break
          case 'MRAsociado':
            dataRow.MRAsociadoisOpen = change.newCell.isOpen as never
            break
          case 'faseTramo':
            dataRow.faseTramoisOpen = change.newCell.isOpen as never
            break
          // case 'responsable' : dataRow.responsableisOpen = change.newCell.isOpen as never; break;
          // case 'aprobado' : dataRow.aprobadoisOpen = change.newCell.isOpen as never; break;
        }
      }

      if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
        dataRow[fieldName] = change.newCell.selectedValue as never
      }
    } else if (change.type === 'date') {
      try {
        const fecha = change.newCell.date?.getTime() as never

        const offsetZonaHoraria =
          change.newCell.date?.getTimezoneOffset() as never

        const fechaFormatted =
          offsetZonaHoraria / 60 >= 4
            ? new Date(fecha + offsetZonaHoraria * 60 * 1000)
            : new Date(fecha - offsetZonaHoraria * 60 * 1000)

        dataRow[fieldName] = fechaFormatted.toISOString() as never
      } catch (e) {}
    }
  })

  return [...prevDetails]
}

export const moreActionsRows = (
  actuaciones: Actuacion[],
  exceed: number = 100,
) => [
  ...actuaciones,
  ...Array.from({ length: exceed }, (item, idx) => ({
    ...getActionsEmpty(actuaciones.length + 1),
    idauto: actuaciones.length + idx + 1,
  })),
]
