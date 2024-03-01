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
import { Medicion } from '.'
import { FlagCell } from '@/components/cells/flag'
import { ButtonCell } from '@/components/cells/button'
import { MaskFieldCell } from '@/components/cells/input_mask'

export const getStructuresMediciones = (): Medicion[] => []

export const getStructuresColumns = (): Column[] => [
  { columnId: 'id', width: 30, reorderable: true, resizable: true },
  { columnId: 'fechaPrevia', width: 200, reorderable: true, resizable: true },
  { columnId: 'tramo', width: 350, reorderable: true, resizable: true },
  { columnId: 'entronque', width: 200, reorderable: true, resizable: true },
  { columnId: 'cuerpo', width: 200, reorderable: true, resizable: true },
  { columnId: 'carril', width: 200, reorderable: true, resizable: true },
  {
    columnId: 'cadenamientoInicial',
    width: 200,
    reorderable: true,
    resizable: true,
  },
  { columnId: 'km', width: 200, reorderable: true, resizable: true },
  { columnId: 'M', width: 150, reorderable: true },
  { columnId: 'L', width: 150, reorderable: true },
  { columnId: 'distanciaSeguimientoCad', width: 150, reorderable: true },
  { columnId: 'cadenamientoFinal', width: 200, reorderable: true },
  { columnId: 'km2', width: 150, reorderable: true },
  { columnId: 'm4', width: 150, reorderable: true },
  { columnId: 'O', width: 150, reorderable: true },
  { columnId: 'distanciaPreviaCad', width: 150, reorderable: true },

  { columnId: 'idIntervencion', width: 150, reorderable: true },
  // { columnId: "deterioro", width: 150, reorderable: true},
  { columnId: 'prioridad', width: 150, reorderable: true },
  { columnId: 'observacion', width: 150, reorderable: true },
  { columnId: 'actuacion', width: 150, reorderable: true },
  { columnId: 'compuesta', width: 150, reorderable: true },
  { columnId: 'longitud', width: 150, reorderable: true },
  { columnId: 'ancho', width: 150, reorderable: true },
  { columnId: 'area', width: 150, reorderable: true },
  { columnId: 'espesor', width: 150, reorderable: true },
  { columnId: 'volumen', width: 150, reorderable: true },
  { columnId: 'litro', width: 150, reorderable: true },
  { columnId: 'unidad', width: 150, reorderable: true },
  { columnId: 'tonelada', width: 150, reorderable: true },

  { columnId: 'numeroEstructuras', width: 150, reorderable: true },
  { columnId: 'tipoEstructura', width: 150, reorderable: true },
  { columnId: 'idGeneral', width: 150, reorderable: true },
  { columnId: 'eje', width: 150, reorderable: true },
  { columnId: 'lado', width: 150, reorderable: true },
  { columnId: 'elementoEstructura', width: 150, reorderable: true },
  // { columnId: "posicion", width: 150, reorderable: true},
  // { columnId: "disposicion", width: 150, reorderable: true},
  { columnId: 'calificacion', width: 150, reorderable: true },
  { columnId: 'anchoPromedioCalzada', width: 150, reorderable: true },
  { columnId: 'esviaje', width: 150, reorderable: true },
  { columnId: 'anchoJunta', width: 150, reorderable: true },
  { columnId: 'numeroElementos', width: 150, reorderable: true },

  { columnId: 'modal', width: 150, reorderable: true },
  { columnId: 'button_save', width: 150, reorderable: true },
  { columnId: 'button_delete', width: 150, reorderable: true },
]

const headerRow = (columns: Column[]): Row => ({
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
      case 'fechaPrevia':
        elem = {
          type: 'header',
          text: 'Fecha E. Previos *',
          style: { color: '#666179' },
        }
        break
      case 'tramo':
        elem = { type: 'header', text: 'Tramo *', style: { color: '#666179' } }
        break
      case 'entronque':
        elem = {
          type: 'header',
          text: 'Entronque *',
          style: { color: '#666179' },
        }
        break
      case 'cuerpo':
        elem = { type: 'header', text: 'Cuerpo *', style: { color: '#666179' } }
        break
      case 'carril':
        elem = { type: 'header', text: 'Carril *', style: { color: '#666179' } }
        break
      case 'cadenamientoInicial':
        elem = {
          type: 'header',
          text: 'Cadenamiento Inicial *',
          style: { color: '#666179' },
        }
        break
      case 'km':
        elem = { type: 'header', text: 'km', style: { color: '#666179' } }
        break
      case 'M':
        elem = { type: 'header', text: 'M', style: { color: '#666179' } }
        break
      case 'L':
        elem = { type: 'header', text: 'L', style: { color: '#666179' } }
        break
      case 'distanciaSeguimientoCad':
        elem = {
          type: 'header',
          text: 'Distancia Seguimiento Cad',
          style: { color: '#666179' },
        }
        break
      case 'cadenamientoFinal':
        elem = {
          type: 'header',
          text: 'Cadenamiento Final *',
          style: { color: '#666179' },
        }
        break
      case 'km2':
        elem = { type: 'header', text: 'km2', style: { color: '#666179' } }
        break
      case 'm4':
        elem = { type: 'header', text: 'm4', style: { color: '#666179' } }
        break
      case 'O':
        elem = { type: 'header', text: 'O', style: { color: '#666179' } }
        break
      case 'distanciaPreviaCad':
        elem = {
          type: 'header',
          text: 'Distancia Previa Cad',
          style: { color: '#666179' },
        }
        break

      case 'idIntervencion':
        elem = {
          type: 'header',
          text: 'ID Interv. - Loc.',
          style: { color: '#666179' },
        }
        break
      // case "deterioro": elem = { type: "header", text: "Deterioros", style: {color: '#666179'}}; break;
      case 'prioridad':
        elem = {
          type: 'header',
          text: 'Prioridad *',
          style: { color: '#666179' },
        }
        break
      case 'observacion':
        elem = {
          type: 'header',
          text: 'Observacion',
          style: { color: '#666179' },
        }
        break
      case 'actuacion':
        elem = {
          type: 'header',
          text: 'Actuacion *',
          style: { color: '#666179' },
        }
        break
      case 'compuesta':
        elem = {
          type: 'header',
          text: 'Compuesta *',
          style: { color: '#666179' },
        }
        break
      case 'longitud':
        elem = { type: 'header', text: 'Longitud', style: { color: '#666179' } }
        break
      case 'ancho':
        elem = { type: 'header', text: 'Ancho *', style: { color: '#666179' } }
        break
      case 'area':
        elem = { type: 'header', text: 'Area', style: { color: '#666179' } }
        break
      case 'espesor':
        elem = { type: 'header', text: 'Espesor', style: { color: '#666179' } }
        break
      case 'volumen':
        elem = { type: 'header', text: 'Volumen', style: { color: '#666179' } }
        break
      case 'litro':
        elem = { type: 'header', text: 'Litro', style: { color: '#666179' } }
        break
      case 'unidad':
        elem = { type: 'header', text: 'Unidad', style: { color: '#666179' } }
        break
      case 'tonelada':
        elem = { type: 'header', text: 'Tonelada', style: { color: '#666179' } }
        break

      case 'numeroEstructuras':
        elem = {
          type: 'header',
          text: 'Numero de estructuras',
          style: { color: '#666179' },
        }
        break
      case 'tipoEstructura':
        elem = {
          type: 'header',
          text: 'Tipo de estructura',
          style: { color: '#666179' },
        }
        break
      case 'idGeneral':
        elem = {
          type: 'header',
          text: 'idGeneral',
          style: { color: '#666179' },
        }
        break
      case 'eje':
        elem = { type: 'header', text: 'Eje', style: { color: '#666179' } }
        break
      case 'lado':
        elem = { type: 'header', text: 'Lado', style: { color: '#666179' } }
        break
      case 'elementoEstructura':
        elem = {
          type: 'header',
          text: 'Elemento de Estructura',
          style: { color: '#666179' },
        }
        break

      case 'calificacion':
        elem = {
          type: 'header',
          text: 'Calificacion',
          style: { color: '#666179' },
        }
        break
      // case "posicion": elem = { type: "header", text: "Posicion *", style: {color: '#666179'}}; break;
      // case "disposicion": elem = { type: "header", text: "Disposicion *", style: {color: '#666179'}}; break;
      case 'anchoPromedioCalzada':
        elem = {
          type: 'header',
          text: 'Ancho Promedio de Calzada',
          style: { color: '#666179' },
        }
        break
      case 'esviaje':
        elem = { type: 'header', text: 'Esviaje', style: { color: '#666179' } }
        break
      case 'anchoJunta':
        elem = {
          type: 'header',
          text: 'Ancho de Junta',
          style: { color: '#666179' },
        }
        break
      case 'numeroElementos':
        elem = {
          type: 'header',
          text: 'Numero de Elementos',
          style: { color: '#666179' },
        }
        break

      case 'modal':
        elem = {
          type: 'header',
          text: 'Deterioros *',
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

export const getStructuresRows = (
  mediciones: Medicion[],
  columns: Column[],
  tramos: any[],
  entronques: any[],
  cuerpos: any[],
  carriles: any[],
  prioridades: any[],
  actuaciones: any[],
  compuestas: any[],
  numeroEstructuras: any[],
  tipoEstructuras: any[],
  ejes: any[],
  lados: any[],
  elementoEstructuras: any[],
  posiciones: any[],
  disposiciones: any[],
  calificaciones: any[],
): Row<
  | DefaultCellTypes
  | FlagCell
  | ButtonCell
  | DateCell
  | DropdownCell
  | MaskFieldCell
>[] => [
  headerRow(columns),
  ...mediciones.map<
    Row<
      | DefaultCellTypes
      | FlagCell
      | ButtonCell
      | DateCell
      | DropdownCell
      | MaskFieldCell
    >
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
        | DropdownCell
        | MaskFieldCell = { type: 'header', text: '', style: { color: '' } }
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
            size: item.deterioros.length,
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
              item.fechaPrevia !== '' &&
              item.tramo !== null &&
              item.entronque !== null &&
              item.cuerpo !== null &&
              item.carril !== null &&
              item.actuacion !== null &&
              item.compuesta !== null &&
              item.deterioros.length > 0 &&
              item.prioridad !== null &&
              item.cadenamientoInicial.length > 5 &&
              item.cadenamientoFinal.length > 5 &&
              Number(item.ancho) > 0 &&
              item.espesor > 0,
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

        case 'fechaPrevia':
          elem = {
            type: 'date',
            date: new Date(item.fechaPrevia),
            style: { color: '#666179' },
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'tramo':
          elem = {
            type: 'dropdown',
            selectedValue: item.tramo,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.tramoisOpen,
            values: tramos,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'entronque':
          elem = {
            type: 'dropdown',
            selectedValue: item.entronque,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.entronqueisOpen,
            values: entronques,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'cuerpo':
          elem = {
            type: 'dropdown',
            selectedValue: item.cuerpo,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.cuerpoisOpen,
            values: cuerpos,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'carril':
          elem = {
            type: 'dropdown',
            selectedValue: item.carril,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.carrilisOpen,
            values: carriles,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'cadenamientoInicial':
          elem = {
            type: 'mask',
            text: item.cadenamientoInicial,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'km':
          elem = {
            type: 'header',
            text: `${item.km}`,
            style: { color: '#666179' },
          }
          break
        case 'M':
          elem = {
            type: 'header',
            text: `${item.M}`,
            style: { color: '#666179' },
          }
          break
        case 'L':
          elem = {
            type: 'header',
            text: `${item.L}`,
            style: { color: '#666179' },
          }
          break
        case 'distanciaSeguimientoCad':
          elem = {
            type: 'header',
            text: `${item.distanciaSeguimientoCad}`,
            style: { color: '#666179' },
          }
          break
        case 'cadenamientoFinal':
          elem = {
            type: 'mask',
            text: item.cadenamientoFinal,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'km2':
          elem = {
            type: 'header',
            text: `${item.km2}`,
            style: { color: '#666179' },
          }
          break
        case 'm4':
          elem = {
            type: 'header',
            text: `${item.m4}`,
            style: { color: '#666179' },
          }
          break
        case 'O':
          elem = {
            type: 'header',
            text: `${item.O}`,
            style: { color: '#666179' },
          }
          break
        case 'distanciaPreviaCad':
          elem = {
            type: 'header',
            text: `${item.distanciaPreviaCad}`,
            style: { color: '#666179' },
          }
          break
        case 'idIntervencion':
          elem = {
            type: 'header',
            text: `${item.idIntervencion}`,
            style: { color: '#666179' },
          }
          break

        case 'prioridad':
          elem = {
            type: 'dropdown',
            selectedValue: item.prioridad,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.prioridadisOpen,
            values: prioridades,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
        case 'observacion':
          elem = {
            type: 'text',
            text: item.observacion,
            className: 'text-sm block w-full text-gray-800',
          }
          break
        case 'actuacion':
          elem = {
            type: 'dropdown',
            selectedValue: item.actuacion,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.actuacionisOpen,
            values: actuaciones,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'compuesta':
          elem = {
            type: 'dropdown',
            selectedValue: item.compuesta,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.compuestaisOpen,
            values: compuestas,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'longitud':
          elem = {
            type: 'header',
            text: String(item.longitud),
            style: { color: '#666179' },
          }
          break
        case 'ancho':
          elem = {
            type: 'number',
            value: item.ancho,
            style: { color: '#666179' },
          }
          break
        case 'area':
          elem = {
            type: 'header',
            text: String(item.area),
            style: { color: '#666179' },
          }
          break
        case 'espesor':
          elem = {
            type: 'number',
            value: item.espesor,
            style: { color: '#666179' },
          }
          break
        case 'volumen':
          elem = {
            type: 'header',
            text: String(item.volumen),
            style: { color: '#666179' },
          }
          break
        case 'litro':
          elem = {
            type: 'number',
            value: item.litro,
            style: { color: '#666179' },
          }
          break
        case 'unidad':
          elem = {
            type: 'number',
            value: item.unidad,
            style: { color: '#666179' },
          }
          break
        case 'tonelada':
          elem = {
            type: 'number',
            value: item.tonelada,
            style: { color: '#666179' },
          }
          break

        case 'numeroEstructuras':
          elem = {
            type: 'dropdown',
            selectedValue: item.numeroEstructuras,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.numeroEstructurasisOpen,
            values: numeroEstructuras,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'tipoEstructura':
          elem = {
            type: 'dropdown',
            selectedValue: item.tipoEstructura,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.tipoEstructuraisOpen,
            values: tipoEstructuras,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
        case 'eje':
          elem = {
            type: 'dropdown',
            selectedValue: item.eje,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.ejeisOpen,
            values: ejes,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'lado':
          elem = {
            type: 'dropdown',
            selectedValue: item.lado,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.ladoisOpen,
            values: lados,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
        case 'elementoEstructura':
          elem = {
            type: 'dropdown',
            selectedValue: item.elementoEstructura,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.elementoEstructuraisOpen,
            values: elementoEstructuras,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'posicion':
          elem = {
            type: 'dropdown',
            selectedValue: item.posicion,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.posicionisOpen,
            values: posiciones,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'disposicion':
          elem = {
            type: 'dropdown',
            selectedValue: item.disposicion,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.disposicionisOpen,
            values: disposiciones,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break

        case 'calificacion':
          elem = {
            type: 'dropdown',
            selectedValue: item.calificacion,
            // inputValue: item.subcategoriaActuacion,
            isOpen: item.calificacionisOpen,
            values: calificaciones,
            className: 'text-sm  block w-full bg-gray-100 text-gray-800',
          }
          break
        case 'idGeneral':
          elem = {
            type: 'text',
            text: item.idGeneral,
            style: { color: '#666179' },
          }
          break
        case 'anchoPromedioCalzada':
          elem = {
            type: 'number',
            value: item.anchoPromedioCalzada,
            style: { color: '#666179' },
          }
          break
        case 'esviaje':
          elem = {
            type: 'number',
            value: item.esviaje,
            style: { color: '#666179' },
          }
          break
        case 'anchoJunta':
          elem = {
            type: 'number',
            value: item.anchoJunta,
            style: { color: '#666179' },
          }
          break
        case 'numeroElementos':
          elem = {
            type: 'number',
            value: item.numeroElementos,
            style: { color: '#666179' },
          }
          break
      }

      return elem
    }),
  })),
]

export const getStructuresEmpty = (id: number = 1): Medicion => ({
  idauto: id,
  id: 0,
  idUnidad: '',
  fechaPrevia: '',
  tramo: null,
  entronque: null,
  cuerpo: null,
  carril: null,
  cadenamientoInicial: '',
  km: 0,
  M: 0,
  L: 0,
  distanciaSeguimientoCad: 0,
  cadenamientoFinal: '',
  km2: 0,
  m4: 0,
  O: 0,
  distanciaPreviaCad: 0,
  idIntervencion: '',
  deterioros: [],
  prioridad: null,
  observacion: '',
  actuacion: null,
  compuesta: null,
  longitud: 0,
  ancho: 0,
  area: 0,
  espesor: 0,
  volumen: 0,
  litro: 0,
  unidad: 0,
  tonelada: 0,
  estudio: 0,

  numeroEstructuras: null,
  tipoEstructura: null,
  idGeneral: '',
  eje: null,
  lado: null,
  elementoEstructura: null,
  posicion: null,
  disposicion: null,
  calificacion: null,
  anchoPromedioCalzada: 0,
  esviaje: 0,
  anchoJunta: 0,
  numeroElementos: 0,

  anchoCalzada: 0,
  coseno: false,
  longitudCadaJunta: 0,
  longitudJuntasAfectadas: 0,
  longitudTotalJuntas: 0,
  noApoyos: 0,
  noEjes: 0,
  noElementos: 0,
  porcentajeAfectacion: 0,

  numeroEstructurasisOpen: false,
  tipoEstructuraisOpen: false,
  ejeisOpen: false,
  ladoisOpen: false,
  elementoEstructuraisOpen: false,
  posicionisOpen: false,
  disposicionisOpen: false,
  calificacionisOpen: false,

  tramoisOpen: false,
  prioridadisOpen: false,
  entronqueisOpen: false,
  cuerpoisOpen: false,
  carrilisOpen: false,
  actuacionisOpen: false,
  compuestaisOpen: false,

  compuestaFilter: [],
  newItem: true,
})

export const applyStructuresChanges = (
  changes: CellChange<
    | TextCell
    | NumberCell
    | CheckboxCell
    | DropdownCell
    | DateCell
    | MaskFieldCell
  >[],
  prevDetails: Medicion[],
  getEmptyDataRow: () => Medicion,
): Medicion[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number
    const fieldName = change.columnId as keyof Medicion

    console.log(change)

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
    } else if (change.type === 'mask') {
      dataRow[fieldName] = change.newCell.text as never
    } else if (
      change.type === 'checkbox' &&
      typeof dataRow[fieldName] === 'boolean'
    ) {
      dataRow[fieldName] = change.newCell.checked as never
    } else if (
      change.type === 'date' &&
      typeof dataRow[fieldName] === 'string'
    ) {
      dataRow[fieldName] = change.newCell.date as never
    } else if (change.type === 'dropdown') {
      /**
       * Checking for an opening/closing of a dropdown list
       */

      if (change.previousCell.isOpen !== change.newCell.isOpen) {
        switch (fieldName) {
          case 'tramo':
            dataRow['tramoisOpen'] = change.newCell.isOpen as never
            break
          case 'entronque':
            dataRow['entronqueisOpen'] = change.newCell.isOpen as never
            break
          case 'cuerpo':
            dataRow['cuerpoisOpen'] = change.newCell.isOpen as never
            break
          case 'carril':
            dataRow['carrilisOpen'] = change.newCell.isOpen as never
            break
          case 'prioridad':
            dataRow['prioridadisOpen'] = change.newCell.isOpen as never
            break
          case 'actuacion':
            dataRow['actuacionisOpen'] = change.newCell.isOpen as never
            break
          case 'compuesta':
            dataRow['compuestaisOpen'] = change.newCell.isOpen as never
            break

          case 'numeroEstructuras':
            dataRow['numeroEstructurasisOpen'] = change.newCell.isOpen as never
            break
          case 'tipoEstructura':
            dataRow['tipoEstructuraisOpen'] = change.newCell.isOpen as never
            break
          case 'eje':
            dataRow['ejeisOpen'] = change.newCell.isOpen as never
            break
          case 'lado':
            dataRow['ladoisOpen'] = change.newCell.isOpen as never
            break
          case 'elementoEstructura':
            dataRow['elementoEstructuraisOpen'] = change.newCell.isOpen as never
            break
          case 'calificacion':
            dataRow['calificacionisOpen'] = change.newCell.isOpen as never
            break
          case 'posicion':
            dataRow['posicionisOpen'] = change.newCell.isOpen as never
            break
          case 'disposicion':
            dataRow['disposicionisOpen'] = change.newCell.isOpen as never
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

export const moreStructuresRows = (
  mediciones: Medicion[],
  exceed: number = 100,
) => [
  ...mediciones,
  ...Array.from({ length: exceed }, (item, idx) => ({
    ...getStructuresEmpty(mediciones.length + 1),
    idauto: mediciones.length + idx + 1,
    // counter: getCounter(mediciones.length + idx + 1)
  })),
]
