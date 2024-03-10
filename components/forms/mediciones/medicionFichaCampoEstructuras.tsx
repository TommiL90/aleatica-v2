/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useCallback,
  ChangeEvent,
  useId,
  useEffect,
  useMemo,
  useRef,
  Fragment,
} from 'react'
import * as Yup from 'yup'

import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  ErrorMessage,
  Formik,
  FormikValues,
  FormikHelpers,
  FieldProps,
  FieldHelperProps,
  FieldMetaProps,
  FormikTouched,
} from 'formik'
import Select from 'react-select'

import InputMask from 'react-input-mask'
import { Deterioros } from '../subform/deterioros'
import JuntasSubForm from './sub-form/juntas'
import NeoprenosSubForm from './sub-form/neoprenos'
import useSWR from 'swr'
import fetcher from '@/services/fetcher'
import { cn } from '@/lib/utils'

// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  fechaEstudioPrevio: string
  tramo: any
  entronque: any
  gaza: any
  carril: any

  cadenamientoInicial: number
  cadenamientoFinal: number
  deterioros: any[]
  actuacion: any
  compuesta: any
  prioridad: any
  ancho: number
  espesor: number
  unidad: number
  litro: number
  tonelada: number
  observacion: string

  numeroEstructura: any
  tipoEstructura: any
  idGeneral: string
  eje: any
  lado: any
  elementoEstructura: any
  // posicion: any;
  // disposicion: any;
  calificacion: any

  anchoPromedioCalzada: number
  esviaje: number
  anchoJunta: number
  noElementos: number
}

interface FormProps {
  especialidad: any
  tramos: any[]
  // entronques: any[];
  gazas: any[]
  carriles: any[]
  deterioros: any[]
  actuaciones: any[]
  // compuestas: any[];
  prioridades: any[]
  numeroEstructura: any[]
  tipoEstructura: any[]
  eje: any[]
  lado: any[]
  elementoEstructura: any[]
  // posicion: any[];
  // disposicion: any[];
  calificacion: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

interface CrearMedicion {
  id: number
  disabled: boolean
  previousStudiesDate: string // Formato de fecha y hora
  mtRoadSectionId: number
  mtHigwayIntersectionId: number
  mtSlipLaneRoadId: number
  mtHighwayLaneId: number
  performanceCatalogId: number
  mtSideId: number
  mtStructureTypeId?: number | null // Puede ser nulo
  mtElementId?: number | null // Puede ser nulo
  mtCalificationId?: number | null // Puede ser nulo
  axisId?: number | null // Puede ser nulo
  mtStructureNumberId?: number | null // Puede ser nulo
  compositeCatalogId: number
  mtPriorityId: number
  mtTypologyId: number
  mtDispositionId?: number | null // Puede ser nulo
  mtPositionId?: number | null // Puede ser nulo
  mtSpecialtyActionId?: number | null // Puede ser nulo
  observation?: string | null // Puede ser nulo
  initialNumber: string
  finalNumber: string
  manualWidth?: string | null // Puede ser nulo
  roadAverage: number
  esviaje: number
  jointWidth?: string | null // Puede ser nulo
  elementsCount: number
  study: number
  width: number
  thickness: number
  idGeneral?: string | null // Puede ser nulo
  length: number
  area: number
  volume: number
  ud: number
  t: number
  l: number
  density: number
  affectePercentage: number
  supportsAffectedCount: number
  cosForCalculate: boolean
  mtDeteriorationTypeIds?: number[] | null // Puede ser nulo
  mtUnitOfMeasurementId: number
  totalJointsLength: number
  affectedJointsLength: number
}

const initialValues: FormValues = {
  fechaEstudioPrevio: '',
  tramo: null,
  entronque: null,
  gaza: null,
  carril: null,

  cadenamientoInicial: 0,
  cadenamientoFinal: 0,
  deterioros: [],
  actuacion: null,
  compuesta: null,
  prioridad: null,
  ancho: 0,
  espesor: 0,
  unidad: 0,
  litro: 0,
  tonelada: 0,
  observacion: '',

  numeroEstructura: null,
  tipoEstructura: null,
  idGeneral: '',
  eje: null,
  lado: null,
  elementoEstructura: null,
  // posicion: null,
  // disposicion: null,
  calificacion: null,

  anchoPromedioCalzada: 0,
  esviaje: 0,
  anchoJunta: 0,
  noElementos: 0,
}

function MedicionFichaCampoEstructurasForm(props: FormProps) {
  const cadenamientoInicialRaw: string = props.initValue
    ? props.initValue.cadenamientoInicial.toString()
    : ''

  const cadenamientoInicialFormatado =
    cadenamientoInicialRaw.substring(0, 3) +
    '0' +
    (cadenamientoInicialRaw.length === 7
      ? cadenamientoInicialRaw.substring(4)
      : cadenamientoInicialRaw.substring(3))

  const cadenamientoFinalRaw: string = props.initValue
    ? props.initValue.cadenamientoFinal.toString()
    : ''

  const cadenamientoFinalFormatado =
    cadenamientoFinalRaw.substring(0, 3) +
    '0' +
    (cadenamientoFinalRaw.length === 7
      ? cadenamientoFinalRaw.substring(4)
      : cadenamientoFinalRaw.substring(3))

  const [tabIndex, setTabIndex] = useState(0)

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    props.initValue ? props.initValue.fechaEstudioPrevio : '',
  )

  const [tramoSeleccionada, setTramoSeleccionada] = useState(
    props.initValue
      ? props.tramos.filter(
          (item: any) => item['value'] === props.initValue.tramo,
        )[0]
      : null,
  )

  const [entronqueSeleccionada, setEntronqueSeleccionada] = useState(
    tramoSeleccionada
      ? tramoSeleccionada.entronques
          .map((item: any) => ({
            label: item.mtHighwayIntersection,
            value: String(item.mtHighwayIntersectionId),
            entronques: item.mtHighwayIntersectionMtSlipLaneRoadDto,
          }))
          .find((item: any) => item.value === props.initValue.entronque) || null
      : null,
  )

  const [gazaSeleccionada, setGazaSeleccionada] = useState(
    props.initValue
      ? props.gazas.filter(
          (item: any) => item['value'] === props.initValue.gaza,
        )[0]
      : null,
  )

  const [carrilSeleccionada, setCarrilSeleccionada] = useState(
    props.initValue
      ? props.carriles.filter(
          (item: any) => item['value'] === props.initValue.carril,
        )[0]
      : null,
  )

  const [cadenamientoInicialSeleccionada, setCadenamientoInicialSeleccionada] =
    useState(cadenamientoInicialFormatado)
  const [cadenamientoFinalSeleccionada, setCadenamientoFinalSeleccionada] =
    useState(cadenamientoFinalFormatado)

  const [actuacionSeleccionada, setActuacionSeleccionada] = useState(
    props.initValue
      ? props.actuaciones.filter(
          (item: any) => item['value'] === props.initValue.actuacion,
        )[0]
      : null,
  )

  const [compuestaSeleccionada, setCompuestaSeleccionada] = useState(
    actuacionSeleccionada
      ? actuacionSeleccionada.compuestas.filter(
          (item: any) => item['value'] === props.initValue.compuesta,
        )[0]
      : null,
  )

  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState(
    props.initValue
      ? props.prioridades.filter(
          (item: any) => item['value'] === props.initValue.prioridad,
        )[0]
      : null,
  )

  const [observacionesSeleccionada, setObservacionesSeleccionada] = useState(
    props.initValue ? props.initValue.observaciones : '',
  )

  const [numeroEstructuraSeleccionada, setNumeroEstructuraSeleccionada] =
    useState(
      props.initValue
        ? props.numeroEstructura.filter(
            (item: any) => item['value'] === props.initValue.numeroEstructura,
          )[0]
        : null,
    )

  const [tipoEstructuraSeleccionada, setTipoEstructuraSeleccionada] = useState(
    props.initValue
      ? props.tipoEstructura.filter(
          (item: any) => item['value'] === props.initValue.tipoEstructura,
        )[0]
      : null,
  )

  const [ejeSeleccionada, setEjeSeleccionada] = useState(
    props.initValue
      ? props.eje.filter(
          (item: any) => item['value'] === props.initValue.eje,
        )[0]
      : null,
  )

  const [ladoSeleccionada, setLadoSeleccionada] = useState(
    props.initValue
      ? props.lado.filter(
          (item: any) => item['value'] === props.initValue.lado,
        )[0]
      : null,
  )

  const [elementoEstructuraSeleccionada, setElementoEstructuraSeleccionada] =
    useState(
      props.initValue
        ? props.elementoEstructura.filter(
            (item: any) => item['value'] === props.initValue.elementoEstructura,
          )[0]
        : null,
    )

  const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(
    props.initValue
      ? props.calificacion.filter(
          (item: any) => item['value'] === props.initValue.calificacion,
        )[0]
      : null,
  )
  const [anchoCalzada, setAnchoCalzada] = useState(
    props.initValue ? props.initValue.anchoCalzada : null,
  )

  const [esviaje, setEsviaje] = useState(
    props.initValue ? props.initValue.esviaje : null,
  )

  const [coseno, setCoseno] = useState(
    props.initValue ? props.initValue.coseno : true,
  )

  const [disableLongitudJunta, setDisableLongitudJunta] = useState(true)
  const [longitudJunta, setLongitudJunta] = useState(
    props.initValue ? props.initValue.longitudCadaJunta : null,
  )

  const [noElementos, setNoElementos] = useState(
    props.initValue ? props.initValue.noElementos : null,
  )

  const [disableLongitudTotalJuntas, setDisableLongitudTotalJuntas] =
    useState(true)
  const [longitudTotalJuntas, setLongitudTotalJuntas] = useState(
    props.initValue ? props.initValue.longitudTotalJuntas : null,
  )

  const [porcentajeAfectacion, setPorcentajeAfectacion] = useState(
    props.initValue ? props.initValue.porcentajeAfectacion : 100,
  )

  const [disableLongitudJuntasAfectadas, setDisableLongitudJuntasAfectadas] =
    useState(true)
  const [longitudJuntasAfectadas, setLongitudJuntasAfectadas] = useState(
    props.initValue ? props.initValue.longitudJuntasAfectadas : null,
  )

  const [noApoyos, setNoApoyos] = useState(
    props.initValue ? props.initValue.noApoyos : null,
  )

  const [noEjes, setNoEjes] = useState(
    props.initValue ? props.initValue.noEjes : null,
  )

  const [alternativeUnitMeasurementValue, setAlternativeUnitMeasurementValue] =
    useState(
      props.initValue ? props.initValue.alternativeUnitMeasurementValue : 0,
    )

  const [altInput, setAltInput] = useState(false)

  const { data, isLoading } = useSWR(
    compuestaSeleccionada
      ? `${process.env.API_URL}/MtUnitOfMeasurement/GetAll`
      : null,
    fetcher,
  )
  let unitOfMeasurement: any
  if (data) {
    unitOfMeasurement = data.result.find(
      (item: any) => item.id === compuestaSeleccionada.mtUnitOfMeasurementId,
    )
  }

  const especialidadId = useId()
  const deterioroId = useId()
  const actuaciondId = useId()
  const compuestaId = useId()
  const tramoId = useId()
  const entronqueId = useId()
  const gazaId = useId()
  const carrilId = useId()
  const prioridadId = useId()

  const numeroEstructurasId = useId()
  const tipoEstructuraId = useId()
  const ejeId = useId()
  const ladoId = useId()
  const elementoEstructuraId = useId()
  const posicionId = useId()
  const disposicionId = useId()
  const calificacionId = useId()

  const [disabled, setDisabled] = useState(false)

  const SchemaForm = Yup.object().shape({
    // codigoMedicion: Yup.string().trim().min(2, 'Demasiado corto!').max(80, 'Demasiado largo!').required('Requerido'),
    fechaEstudioPrevio: Yup.string()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    tramo: Yup.string().required('Requerido'),
    entronque: Yup.string().required('Requerido'),
    gaza: Yup.string().required('Requerido'),
    carril: Yup.string().required('Requerido'),
    cadenamientoInicial: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    cadenamientoFinal: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    numeroEstructura: Yup.number().required('Requerido'),
    tipoEstructura: Yup.number().required('Requerido'),
    eje: Yup.number().required('Requerido'),
    lado: Yup.number().required('Requerido'),
    calificacion: Yup.number().required('Requerido'),
    elementoEstructura: Yup.string().required('Requerido'),

    deterioros: Yup.array().min(1, 'Debe seleccionar al menos un deterioro.'),
    actuacion: Yup.string().required('Requerido'),
    compuesta: Yup.string().required('Requerido'),
    prioridad: Yup.string().required('Requerido'),
    observaciones: Yup.string()
      .optional()
      .nullable()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!'),
    // Juntas
    anchoCalzada: Yup.number()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    esviaje: Yup.number()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    coseno: Yup.boolean().optional().default(true),
    // calculada en backend
    longitudJunta: Yup.number()
      .optional()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .nullable()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined || value === null) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    // nª juntas
    noElementos: Yup.number()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional(),
    // calculada en backend
    longitudTotalJuntas: Yup.number()
      .optional()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .nullable()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined || value === null) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    porcentajeAfectacion: Yup.number()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .max(100, 'No puede ser mayor que 100')
      .optional()
      .default(100)
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined || value === null) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    // calculada en backend
    longitudJuntasAfectadas: Yup.number()
      .optional()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .nullable()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined || value === null) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    // Neoprenos
    noApoyos: Yup.number()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .nullable(),
    noEjes: Yup.number()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .nullable(),
    // Alternative input
    alternativeUnitMeasurementValue: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .default(0)
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
  })

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    let data: any = values

    if (!disableLongitudJunta) {
      data = { ...data, longitudJunta }
    }

    if (!disableLongitudTotalJuntas) {
      data = { ...data, longitudTotalJuntas }
    }

    if (!disableLongitudJuntasAfectadas) {
      data = { ...data, longitudJuntasAfectadas }
    }

    submitEnquiryForm({ ...data })

    formikHelpers.resetForm()
  }

  const submitEnquiryForm = async (values: FormValues): Promise<any> => {
    try {
      if (typeof props.onSubmit === 'function') {
        await props.onSubmit(values)
      }
    } catch (e) {}
  }

  const customStyleSelect = (isValid: boolean) => {
    return {
      control: (base: any) => ({
        ...base,
        backgroundColor: isValid ? 'rgb(253 232 232)' : '#FFFFFF',
        borderColor: isValid ? 'rgb(249 128 128)' : '#FFFFFF',
      }),
    }
  }

  const handleGetInfo = useCallback(async () => {
    const value: Partial<CrearMedicion> = {
      performanceCatalogId: actuacionSeleccionada
        ? actuacionSeleccionada.value
        : '',
      compositeCatalogId: compuestaSeleccionada
        ? compuestaSeleccionada.value
        : '',
      mtPriorityId: prioridadSeleccionada ? prioridadSeleccionada.value : '',
      mtSpecialtyActionId: props.especialidad.value,
      initialNumber: cadenamientoInicialSeleccionada
        ? cadenamientoInicialSeleccionada.replace('+', '')
        : '',
      finalNumber: cadenamientoFinalSeleccionada
        ? cadenamientoFinalSeleccionada.replace('+', '')
        : '',
      roadAverage: anchoCalzada || 0,
      esviaje: esviaje || 0,
      cosForCalculate: coseno ? coseno.value : true,
      elementsCount: noElementos || 0,
      affectePercentage: porcentajeAfectacion || 100,
      supportsAffectedCount: noApoyos || 0,
      mtUnitOfMeasurementId: alternativeUnitMeasurementValue,
      length: disableLongitudJunta ? undefined : longitudJunta,
      totalJointsLength: disableLongitudTotalJuntas
        ? undefined
        : longitudTotalJuntas,
      affectedJointsLength: disableLongitudJuntasAfectadas
        ? undefined
        : longitudJuntasAfectadas,
    }
    const res = await fetch(`${process.env.API_URL}/MeasurementTab/GetInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
    const data = await res.json()

    if (data.result) {
      const { length, affectedJointsLength, totalJointsLength } = data.result
      // longitudTotalJuntas, longitudJuntasAfectadas, longitudJunta
      setLongitudJunta(length)
      setLongitudJuntasAfectadas(affectedJointsLength)
      setLongitudTotalJuntas(totalJointsLength)
    }
  }, [
    actuacionSeleccionada,
    alternativeUnitMeasurementValue,
    anchoCalzada,
    cadenamientoFinalSeleccionada,
    cadenamientoInicialSeleccionada,
    compuestaSeleccionada,
    coseno,
    esviaje,
    noApoyos,
    noElementos,
    porcentajeAfectacion,
    prioridadSeleccionada,
    props.especialidad.value,
    longitudJunta,
    longitudTotalJuntas,
    longitudJuntasAfectadas,
  ])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // marca que ya no es la primera renderización
      return
    }
    handleGetInfo()
  }, [
    cadenamientoInicialSeleccionada,
    cadenamientoFinalSeleccionada,
    porcentajeAfectacion,
    compuestaSeleccionada,
    prioridadSeleccionada,
    anchoCalzada,
    esviaje,
    coseno,
    noElementos,
    noApoyos,
    noEjes,
    alternativeUnitMeasurementValue,
    handleGetInfo,
    longitudJunta,
    longitudTotalJuntas,
    longitudJuntasAfectadas,
  ])

  return (
    <>
      <div className="text-black">
        <div className="mb-2 block space-x-2 text-sm font-medium text-gray-600">
          UOC:{' '}
          <span className="text-gray-900">
            {compuestaSeleccionada ? compuestaSeleccionada.label : '-'}
          </span>
        </div>
        <div className="mb-2 block space-x-2 text-sm font-medium text-gray-600">
          Unidad de medida:{' '}
          <span className="text-gray-900">
            {unitOfMeasurement
              ? `${unitOfMeasurement.name} (${unitOfMeasurement.code})`
              : '-'}
          </span>
        </div>
      </div>
      <Formik
        initialValues={props.initValue || initialValues}
        validationSchema={SchemaForm}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
          isValid,
          values,
        }: FormikProps<FormValues>) => (
          <Form>
            <div className="mb-6 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <ul className="-mb-px flex flex-wrap">
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setTabIndex(0)}
                    className={cn(
                      tabIndex === 0
                        ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Identificacion
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setTabIndex(1)}
                    className={cn(
                      tabIndex === 1
                        ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Cadenamientos
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setTabIndex(2)}
                    className={cn(
                      tabIndex === 2
                        ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Estructuras
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setTabIndex(3)}
                    className={cn(
                      tabIndex === 3
                        ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Deterioros ({0})
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setTabIndex(4)}
                    className={cn(
                      tabIndex === 4
                        ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Actuacion
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
                <li className="me-2">
                  <button
                    type="button"
                    onClick={() => setTabIndex(5)}
                    className={cn(
                      tabIndex === 5
                        ? 'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                        : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
                    )}
                  >
                    Calculos
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
              </ul>
            </div>

            {tabIndex === 0 ? (
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="especialidad"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Especialidad
                  </label>
                  <Field name="especialidad">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          id="especialidad"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          isDisabled={true}
                          instanceId={especialidadId}
                          options={[
                            {
                              label: props.especialidad.label,
                              value: props.especialidad.value,
                            },
                          ]}
                          value={props.especialidad}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <label
                    htmlFor="fechaEstudioPrevio"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha estudio previo
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>
                  <Field name="fechaEstudioPrevio">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <input
                          id={`fechaEstudioPrevio}`}
                          type="date"
                          value={fechaSeleccionada}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.value)
                            setFechaSeleccionada(evt.target.value)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.fechaEstudioPrevio &&
                              touched.fechaEstudioPrevio
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white  text-gray-900 focus:border-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="fechaEstudioPrevio"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tramo"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tramo
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="tramo">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="tramo"
                          instanceId={tramoId}
                          placeholder="Inserte tramo"
                          options={props.tramos}
                          value={tramoSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.tramos.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.tramo,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setTramoSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.tramo && touched.tramo,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.tramo && touched.tramo
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="tramo"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="entronque"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Entronque
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="entronque">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="entronque"
                          instanceId={entronqueId}
                          placeholder="Inserte entronque"
                          options={
                            tramoSeleccionada
                              ? tramoSeleccionada.entronques.map(
                                  (item: any) => ({
                                    label: item.mtHighwayIntersection,
                                    value: String(item.mtHighwayIntersectionId),
                                    gaza: item.mtHighwayIntersectionMtSlipLaneRoadDto,
                                  }),
                                )
                              : []
                          }
                          value={entronqueSeleccionada}
                          // defaultValue={props.initValue != null ?
                          //   props.entronques.filter((item: any) => item['value'] == props.initValue.entronque)[0]
                          //   : null
                          // }

                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setEntronqueSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.entronque && touched.entronque,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.entronque && touched.entronque
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="entronque"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gaza"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gaza
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="gaza">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="gaza"
                          instanceId={gazaId}
                          placeholder="Inserte gaza"
                          options={props.gazas}
                          value={gazaSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.gazas.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.gaza,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setGazaSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.gaza && touched.gaza,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.gaza && touched.gaza
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="gaza"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="carril"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Carril
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="carril">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="carril"
                          instanceId={carrilId}
                          placeholder="Inserte carril"
                          options={props.carriles}
                          value={carrilSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.carriles.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.carril,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setCarrilSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.carril && touched.carril,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.carril && touched.carril
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="carril"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
            ) : null}

            {tabIndex === 1 ? (
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="cadenamientoInicial"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cadenamiento inicial
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>
                  <Field name="cadenamientoInicial">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <InputMask
                          mask="999+0999"
                          alwaysShowMask={true}
                          maskChar="#"
                          onChange={(evt: any) => {
                            const value = evt.target.value
                            const array = value.split('+')

                            const kmValue = Number(array[0])
                            const mtrsValue = Number(array[1])

                            // setDistanciaSgteCadenamiento(distanciaSiguienteCadenamiento());
                            // setDistanciaACadenamiento(distanciaACadenamientoPrevio())

                            setFieldValue(field.name, evt.target.value)
                            setCadenamientoInicialSeleccionada(evt.target.value)
                          }}
                          value={cadenamientoInicialSeleccionada}
                          className={cn(
                            'block w-full rounded-lg border p-2.5 text-sm',
                            errors.cadenamientoInicial &&
                              touched.cadenamientoInicial
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="cadenamientoInicial"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cadenamientoFinal"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cadenamiento Final
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>
                  <Field name="cadenamientoFinal">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <InputMask
                          mask="999+0999"
                          alwaysShowMask={true}
                          maskChar="#"
                          onChange={(evt: any) => {
                            const value = evt.target.value
                            const array = value.split('+')

                            const km2Value = Number(array[0])
                            const m4Value = Number(array[1])

                            // setDistanciaSgteCadenamiento(distanciaSiguienteCadenamiento());
                            // setDistanciaACadenamiento(distanciaACadenamientoPrevio())

                            setFieldValue(field.name, evt.target.value)
                            setCadenamientoFinalSeleccionada(evt.target.value)

                            console.log(evt.target.value)
                          }}
                          value={cadenamientoFinalSeleccionada}
                          className={cn(
                            'block w-full rounded-lg border p-2.5 text-sm',
                            errors.cadenamientoFinal &&
                              touched.cadenamientoFinal
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="cadenamientoFinal"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
            ) : null}
            {tabIndex === 2 ? (
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="numeroEstructura"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Numero de estructuras
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="numeroEstructura">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="numeroEstructura"
                          instanceId={numeroEstructurasId}
                          placeholder="Seleccione numero de estructuras"
                          options={props.numeroEstructura}
                          value={numeroEstructuraSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.numeroEstructura.filter(
                                  (item: any) =>
                                    item['value'] ==
                                    props.initValue.numeroEstructura,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setNumeroEstructuraSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.numeroEstructura && touched.numeroEstructura,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.numeroEstructura && touched.numeroEstructura
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="numeroEstructura"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tipoEstructura"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tipo de estructuras
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="tipoEstructura">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="tipoEstructura"
                          instanceId={tipoEstructuraId}
                          placeholder="Seleccione tipo de estructuras"
                          options={props.tipoEstructura}
                          value={tipoEstructuraSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.tipoEstructura.filter(
                                  (item: any) =>
                                    item['value'] ==
                                    props.initValue.tipoEstructura,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setTipoEstructuraSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.tipoEstructura && touched.tipoEstructura,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.tipoEstructura && touched.tipoEstructura
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="tipoEstructura"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="eje"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Eje
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="eje">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="eje"
                          instanceId={ejeId}
                          placeholder="Seleccione eje"
                          options={props.eje}
                          value={ejeSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.eje.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.eje,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setEjeSeleccionada(option)
                          }}
                          styles={customStyleSelect(errors.eje && touched.eje)}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.eje && touched.eje
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="eje"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lado"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lado
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="lado">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="lado"
                          instanceId={ladoId}
                          placeholder="Seleccione lado"
                          options={props.lado}
                          value={ladoSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.lado.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.lado,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setLadoSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.lado && touched.lado,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.lado && touched.lado
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="lado"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="elementoEstructura"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Elementos de estructura
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="elementoEstructura">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="elementoEstructura"
                          instanceId={elementoEstructuraId}
                          placeholder="Seleccione elemento de estructura"
                          options={props.elementoEstructura}
                          value={elementoEstructuraSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.elementoEstructura.filter(
                                  (item: any) =>
                                    item['value'] ==
                                    props.initValue.elementoEstructura,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setElementoEstructuraSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.elementoEstructura &&
                              touched.elementoEstructura,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.elementoEstructura &&
                              touched.elementoEstructura
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="elementoEstructura"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="calificacion"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Calificacion
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="calificacion">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="calificacion"
                          instanceId={calificacionId}
                          placeholder="Seleccione calificacion"
                          options={props.calificacion}
                          value={calificacionSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.calificacion.filter(
                                  (item: any) =>
                                    item['value'] ==
                                    props.initValue.calificacion,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setCalificacionSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.calificacion && touched.calificacion,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.calificacion && touched.calificacion
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="calificacion"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
            ) : null}
            {tabIndex === 3 ? (
              <div>
                <Field name="deterioros">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <Deterioros
                      onChange={(value: any) =>
                        setFieldValue(field.name, value)
                      }
                      deteriorosList={props.deterioros}
                      deteriorosSelected={values['deterioros']}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="deterioros"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            ) : null}

            {tabIndex === 4 ? (
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="actuacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Actuacion
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </label>

                    <Field name="actuacion">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="actuacion"
                            instanceId={actuaciondId}
                            placeholder="Seleccione actuacion"
                            options={props.actuaciones}
                            value={actuacionSeleccionada}
                            defaultValue={
                              props.initValue != null
                                ? props.actuaciones.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.actuacion,
                                  )[0]
                                : null
                            }
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setActuacionSeleccionada(option)
                            }}
                            styles={customStyleSelect(
                              errors.actuacion && touched.actuacion,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.actuacion && touched.actuacion
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="actuacion"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="compuesta"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Compuesta
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </label>

                    <Field name="compuesta">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="compuesta"
                            instanceId={compuestaId}
                            placeholder="Seleccione compuesta"
                            options={
                              actuacionSeleccionada
                                ? actuacionSeleccionada.compuestas
                                : []
                            }
                            value={compuestaSeleccionada}
                            // defaultValue={props.initValue != null ?
                            //   props.compuestas.filter((item: any) => item['value'] == props.initValue.compuesta)[0]
                            //   : null
                            // }

                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setCompuestaSeleccionada(option)
                            }}
                            styles={customStyleSelect(
                              errors.compuesta && touched.compuesta,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.compuesta && touched.compuesta
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="compuesta"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prioridad"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Prioridad
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </label>

                    <Field name="prioridad">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="prioridad"
                            instanceId={prioridadId}
                            placeholder="Inserte prioridad"
                            options={props.prioridades}
                            value={prioridadSeleccionada}
                            defaultValue={
                              props.initValue != null
                                ? props.prioridades.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.prioridad,
                                  )[0]
                                : null
                            }
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setPrioridadSeleccionada(option)
                            }}
                            styles={customStyleSelect(
                              errors.prioridad && touched.prioridad,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.prioridad && touched.prioridad
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="prioridad"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      htmlFor="observacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Observaciones
                    </label>
                    <Field
                      name="observacion"
                      value={observacionesSeleccionada}
                      onChange={(e: any) =>
                        setObservacionesSeleccionada(e.target.value)
                      }
                      as="textarea"
                      className={cn(
                        'block h-[200px] w-full rounded-lg border p-2.5 text-sm',
                        errors.observacion && touched.observacion
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                    <ErrorMessage
                      name="observacion"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {tabIndex === 5 &&
            cadenamientoInicialSeleccionada &&
            cadenamientoFinalSeleccionada &&
            compuestaSeleccionada ? (
              <>
                <div className="mb-6 flex flex-col space-y-2">
                  <div className="flex w-[50%] items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      checked={altInput}
                      onChange={() => setAltInput(!altInput)}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Usar unidad de medida alternativa
                    </label>
                  </div>
                </div>
                <div
                  className={cn(
                    'mb-6 grid gap-6 md:grid-cols-4',
                    props.especialidad.value === 32 ? '' : 'hidden',
                  )}
                >
                  <JuntasSubForm
                    anchoCalzada={anchoCalzada}
                    setAnchoCalzada={setAnchoCalzada}
                    esviaje={esviaje}
                    setEsviaje={setEsviaje}
                    coseno={coseno}
                    setCoseno={setCoseno}
                    longitudJunta={longitudJunta}
                    setLongitudJunta={setLongitudJunta}
                    noElementos={noElementos}
                    setNoElementos={setNoElementos}
                    longitudTotalJuntas={longitudTotalJuntas}
                    setLongitudTotalJuntas={setLongitudTotalJuntas}
                    porcentajeAfectacion={porcentajeAfectacion}
                    setPorcentajeAfectacion={setPorcentajeAfectacion}
                    longitudJuntasAfectadas={longitudJuntasAfectadas}
                    setLongitudJuntasAfectadas={setLongitudJuntasAfectadas}
                    disableLongitudJunta={disableLongitudJunta}
                    setDisableLongitudJunta={setDisableLongitudJunta}
                    disableLongitudTotalJuntas={disableLongitudTotalJuntas}
                    setDisableLongitudTotalJuntas={
                      setDisableLongitudTotalJuntas
                    }
                    disableLongitudJuntasAfectadas={
                      disableLongitudJuntasAfectadas
                    }
                    setDisableLongitudJuntasAfectadas={
                      setDisableLongitudJuntasAfectadas
                    }
                  />
                </div>
                <div
                  className={cn(
                    'mb-6 grid gap-6 md:grid-cols-3',
                    props.especialidad.value === 32 ? 'hidden' : '',
                  )}
                >
                  <NeoprenosSubForm
                    noApoyos={noApoyos}
                    setNoApoyos={setNoApoyos}
                    noEjes={noEjes}
                    setNoEjes={setNoEjes}
                  />
                </div>

                <div className="mb-6 grid gap-6 md:grid-cols-4">
                  {unitOfMeasurement &&
                    altInput &&
                    (() => {
                      return (
                        <div>
                          <label
                            htmlFor="alternativeUnitMeasurementValue"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Unidad de medida alternativa:{' '}
                            <strong>{unitOfMeasurement.name}</strong>
                          </label>
                          <Field name="alternativeUnitMeasurementValue">
                            {({
                              field,
                              form: { touched, errors, setFieldValue },
                            }: any) => (
                              <input
                                {...field}
                                type="number"
                                step="0.01"
                                min="0"
                                value={alternativeUnitMeasurementValue}
                                onChange={(evt: any) => {
                                  setFieldValue(
                                    field.name,
                                    evt.target.valueAsNumber,
                                    setAlternativeUnitMeasurementValue(
                                      evt.target.valueAsNumber,
                                    ),
                                  )
                                }}
                                className={cn(
                                  'block w-full rounded-lg border text-sm ',
                                  errors.alternativeUnitMeasurementValue &&
                                    touched.alternativeUnitMeasurementValue
                                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                    : 'border-blue-500 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                                )}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="alternativeUnitMeasurementValue"
                            component="div"
                            className="mt-1 text-sm text-red-600 dark:text-red-500"
                          />
                        </div>
                      )
                    })()}
                </div>
              </>
            ) : null}

            <div className="mt-8 text-right">
              <button
                disabled={disabled || !isValid}
                type="submit"
                className={cn(
                  'w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto',
                  isValid
                    ? 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    : 'border-blue-300 bg-blue-400 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              >
                {props.buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default MedicionFichaCampoEstructurasForm
