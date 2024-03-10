/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, {
  useState,
  useCallback,
  ChangeEvent,
  useId,
  useEffect,
  useMemo,
  useRef,
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

import useSWR from 'swr'
import { FaLessThan } from 'react-icons/fa'
import fetcher from '@/services/fetcher'
import { Deterioros } from '../subform/deterioros'
import { cn } from '@/lib/utils'

// import { v4 as uuidv4 } from 'uuid';

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
}

interface MtDeteriorationType {
  mtSpecialtyAction?: any
  mtActionSubCategory?: any
  mtActionSubCategoryId: number
  mtSpecialtyActionId: number
  code: string
  name: string
  id: number
  disabled: boolean
}

interface FormValues {
  fechaEstudioPrevio: string
  tramo: any
  entronque: any
  gaza: any
  carril: any

  cadenamientoInicial: string
  cadenamientoFinal: string
  deterioros: any[]
  actuacion: any
  compuesta: any
  prioridad: any
  ancho: number

  observacion?: string

  porcentajeAfectacion?: number
  longitud?: number
  area?: number
  espesor?: number
  masa?: number
  volumen?: number

  alternativeUnitMeasurementValue?: number
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
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  fechaEstudioPrevio: '',
  tramo: null,
  entronque: null,
  gaza: null,
  carril: null,

  cadenamientoInicial: '',
  cadenamientoFinal: '',
  deterioros: [],
  actuacion: null,
  compuesta: null,
  prioridad: null,
  ancho: 0,
  espesor: 0,
  observacion: '',

  porcentajeAfectacion: 100,
}

function MedicionFichaCampoPavimentosForm(props: FormProps) {
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

  const [anchoSeleccionada, setAnchoSeleccionada] = useState(
    props.initValue ? props.initValue.ancho : 0,
  )

  const [espesorSeleccionada, setEspesorSeleccionada] = useState(
    props.initValue ? props.initValue.espesor : 0,
  )

  const [densidad, setDensidad] = useState(
    props.initValue ? props.initValue.densidad : 0,
  )

  const [porcentajeAfectacion, setPorcentajeAfectacion] = useState(
    props.initValue && props.initValue.porcentajeAfectacion
      ? props.initValue.porcentajeAfectacion
      : 100,
  )

  const [altInput, setAltInput] = useState(false)

  const [disableLengthInput, setDisableLengthInput] = useState(true)
  const [length, setLength] = useState(
    props.initValue ? props.initValue.longitud : 0,
  )
  const [disableAreaInput, setDisableAreaInput] = useState(true)
  const [area, setArea] = useState(props.initValue ? props.initValue.area : 0)

  const [disableVolumeInput, setDisableVolumeInput] = useState(true)
  const [volume, setVolume] = useState(
    props.initValue ? props.initValue.volumen : 0,
  )
  const [disableMasaInput, setDisableMasaInput] = useState(true)
  const [masa, setMasa] = useState(props.initValue ? props.initValue.masa : 0)
  const [alternativeUnitMeasurementValue, setAlternativeUnitMeasurementValue] =
    useState(
      props.initValue ? props.initValue.alternativeUnitMeasurementValue : 0,
    )
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
  // const unitOfMeasurement = unitOfMeasurements.result.data.find((item: any) => item.id === compuestaSeleccionada.mtUnitOfMeasurementId)

  // const [nextCadenamiento, setNextCadenamiento] = useState(0);
  // const [previousCadenamiento, setPrevoiusCadenamiento] = useState(0);

  const especialidadId = useId()
  const deterioroId = useId()
  const actuaciondId = useId()
  const compuestaId = useId()
  const tramoId = useId()
  const entronqueId = useId()
  const gazaId = useId()
  const carrilId = useId()
  const prioridadId = useId()

  const [disabled, setDisabled] = useState(false)

  const SchemaForm = Yup.object().shape({
    // codigoMedicion: Yup.string().trim().min(2, 'Demasiado corto!').max(80, 'Demasiado largo!').required('Requerido'),
    fechaEstudioPrevio: Yup.string()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),

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
    tramo: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    entronque: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    gaza: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    carril: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    deterioros: Yup.array().min(1, 'Debe seleccionar al menos un deterioro.'),
    actuacion: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    compuesta: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),

    porcentajeAfectacion: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    ancho: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),
    espesor: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    densidad: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    longitud: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    area: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    volumen: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    masa: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    alternativeUnitMeasurementValue: Yup.number()
      .typeError('Debe ser un número')
      .min(0)
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .optional()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined) return true // Permite valores undefined
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      }),

    prioridad: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
  })

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    let data: any = values

    if (!disableLengthInput) {
      data = {
        ...values,
        longitud: length,
      }
    }

    if (!disableAreaInput) {
      data = {
        ...values,
        area,
      }
    }

    if (!disableVolumeInput) {
      data = {
        ...values,
        volumen: volume,
      }
    }

    if (!disableMasaInput) {
      data = {
        ...values,
        masa,
      }
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
      thickness: espesorSeleccionada || 0,
      width: anchoSeleccionada || 0,
      affectePercentage: porcentajeAfectacion,
      density: densidad,
      mtUnitOfMeasurementId: alternativeUnitMeasurementValue,
      length: disableLengthInput ? undefined : length,
      area: disableAreaInput ? undefined : area,
      volume: disableVolumeInput ? undefined : volume,
      t: disableMasaInput ? undefined : masa,
    }

    const res = await fetch(`${process.env.API_URL}/MeasurementTab/GetInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
    const data = await res.json()
    console.log(data.result)
    if (data.result) {
      const {
        length: lengthRes,
        area: areaRes,
        volume: volumeRes,
        t,
      } = data.result

      console.log(lengthRes)
      console.log(areaRes)
      console.log(volumeRes)
      console.log(t)

      setLength(lengthRes)
      setArea(areaRes)
      setVolume(volumeRes)
      setMasa(t)
    }
  }, [
    actuacionSeleccionada,
    compuestaSeleccionada,
    prioridadSeleccionada,
    props.especialidad.value,
    cadenamientoInicialSeleccionada,
    cadenamientoFinalSeleccionada,
    espesorSeleccionada,
    anchoSeleccionada,
    porcentajeAfectacion,
    densidad,
    alternativeUnitMeasurementValue,
    length,
    area,
    volume,
    masa,
  ])

  // const handleGetInfo = useCallback(async () => {
  //   console.log(value)
  //   const res = await fetch(`${process.env.API_URL}/MeasurementTab/GetInfo`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(value),
  //   })
  //   const data = await res.json()
  //   console.log(data.result)
  //   if (data.result) {
  //     const {
  //       length: lengthRes,
  //       area: areaRes,
  //       volume: volumeRes,
  //       t,
  //     } = data.result

  //     console.log(lengthRes)
  //     console.log(areaRes)
  //     console.log(volumeRes)
  //     console.log(t)

  //     setLength(lengthRes)
  //     setArea(areaRes)
  //     setVolume(volumeRes)
  //     setMasa(t)
  //   }
  // }, [])

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
    anchoSeleccionada,
    espesorSeleccionada,
    densidad,
    compuestaSeleccionada,
    prioridadSeleccionada,
    handleGetInfo,
    length,
    area,
    volume,
    masa,
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
            {unitOfMeasurement ? unitOfMeasurement.name : '-'}
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
                    Deterioros ({0})
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
                    Actuacion
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
                          //   entronqueSeleccionada.filter((item: any) => item['value'] == props.initValue.entronque)[0]
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
                        {/* <Select
                            {...field}
                            id='gaza'
                            instanceId={gazaId}
                            placeholder="Inserte gaza"
                            options={entronqueSeleccionada ? entronqueSeleccionada.gaza.map((item: any) => ({ label: item.mtSlipLaneRoad, value: String(item.mtSlipLaneRoadId) })) : []}
                            value={gazaSeleccionada}

                            defaultValue={props.initValue != null ?
                              props.gazas.filter((item: any) => item['value'] == props.initValue.gaza)[0]
                              : null
                            }

                            onChange={(option: any) => {
                              setFieldValue(field.name, option ? option.value : null);
                              setGazaSeleccionada(option)
                            }}
                            styles={customStyleSelect(errors.gaza && touched.gaza)}

                            className={cn(
                              'border text-sm rounded-lg block w-full',
                              errors.gaza && touched.gaza
                                ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            )}
                          /> */}
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
                  {/* <label htmlFor="distanciaSgteCadenamiento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Distancia siguiente cadenamiento
                      <span className="ml-1 text-xs text-red-700">
                        *
                      </span>
                    </label> */}
                  {/* <Field disabled={true} name="distanciaSgteCadenamiento" value={nextCadenamiento} className='border bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:border-blue-500  block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500' /> */}
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
                {/* <div>
                    <label htmlFor="distanciaACadenamiento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distancia a cadenamiento previo</label>
                    <Field disabled={true} name="distanciaACadenamiento" value={previousCadenamiento} className='border bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:border-blue-500  block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div> */}
              </div>
            ) : null}

            {tabIndex === 2 ? (
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

            {tabIndex === 3 ? (
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
                              setCompuestaSeleccionada(null)
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
                            isDisabled={actuacionSeleccionada === null}
                            instanceId={compuestaId}
                            placeholder="Seleccione compuesta"
                            options={
                              actuacionSeleccionada
                                ? actuacionSeleccionada.compuestas
                                : []
                            }
                            value={compuestaSeleccionada}
                            // defaultValue={ actuacionSeleccionada ?
                            //   actuacionSeleccionada.compuestas.filter((item: any) => item['value'] == props.initValue.compuesta)[0]
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

            {tabIndex === 4 &&
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
                <div className="mb-6 grid gap-6 md:grid-cols-4">
                  <div>
                    <label
                      htmlFor="porcentajeAfectacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      % de afectación
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </label>
                    <Field name="porcentajeAfectacion">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min={0}
                          max={100}
                          value={porcentajeAfectacion}
                          defaultValue={100}
                          onChange={(evt: any) => {
                            setDisableLengthInput(true)
                            setDisableAreaInput(true)
                            setDisableVolumeInput(true)
                            setDisableVolumeInput(true)
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setPorcentajeAfectacion(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.porcentajeAfectacion &&
                              touched.porcentajeAfectacion
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="porcentajeAfectacion"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="longitud"
                      className="mb-2 block space-x-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span>Longitud (m)</span>
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        checked={!disableLengthInput}
                        onChange={() =>
                          setDisableLengthInput(!disableLengthInput)
                        }
                        className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                    </label>
                    <Field name="longitud">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          value={length}
                          disabled={disableLengthInput}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setLength(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.longitud && touched.longitud
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableLengthInput ? 'bg-gray-200' : 'bg-white'}`,
                          )}
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="ancho"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Ancho (m)
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </label>
                    <Field name="ancho">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          value={anchoSeleccionada}
                          onChange={(evt: any) => {
                            setDisableLengthInput(true)
                            setDisableAreaInput(true)
                            setDisableVolumeInput(true)
                            setDisableVolumeInput(true)
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setAnchoSeleccionada(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.ancho && touched.ancho
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="ancho"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="area"
                      className="mb-2 block space-x-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span>Area (m2)</span>
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        checked={!disableAreaInput}
                        onChange={() => setDisableAreaInput(!disableAreaInput)}
                        className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                    </label>
                    <Field name="area">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          disabled={disableAreaInput}
                          value={area}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setArea(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.area && touched.area
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableAreaInput ? 'bg-gray-200' : 'bg-white'}`,
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="area"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="espesor"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Espesor (cm)
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </label>
                    <Field name="espesor">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          value={espesorSeleccionada}
                          onChange={(evt: any) => {
                            setDisableLengthInput(true)
                            setDisableAreaInput(true)
                            setDisableVolumeInput(true)
                            setDisableVolumeInput(true)
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setEspesorSeleccionada(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.espesor && touched.espesor
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="espesor"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="volumen"
                      className="mb-2 block space-x-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span> Volumen (m3)</span>
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        checked={!disableVolumeInput}
                        onChange={() =>
                          setDisableVolumeInput(!disableVolumeInput)
                        }
                        className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                    </label>

                    <Field name="volumen">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          disabled={disableVolumeInput}
                          name="volumen"
                          value={volume}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setVolume(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.volumen && touched.volumen
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableVolumeInput ? 'bg-gray-200' : 'bg-white'}`,
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="volumen"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="densidad"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Densidad (t/m3)
                    </label>
                    <Field name="densidad">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          value={densidad}
                          onChange={(evt: any) => {
                            setDisableLengthInput(true)
                            setDisableAreaInput(true)
                            setDisableVolumeInput(true)
                            setDisableVolumeInput(true)
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setDensidad(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.densidad && touched.densidad
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="densidad"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="masa"
                      className="mb-2 block space-x-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span>Masa (t)</span>
                      <input
                        id="checked-checkbox"
                        type="checkbox"
                        checked={!disableMasaInput}
                        onChange={() => setDisableMasaInput(!disableMasaInput)}
                        className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                    </label>
                    <Field name="masa">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          disabled={disableMasaInput}
                          name="masa"
                          value={masa}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setMasa(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.masa && touched.masa
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableMasaInput ? 'bg-gray-200' : 'bg-white'}`,
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="masa"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>

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
                                onChange={(evt: any) => {
                                  setFieldValue(
                                    field.name,
                                    evt.target.valueAsNumber,
                                  )
                                  setAlternativeUnitMeasurementValue(
                                    evt.target.valueAsNumber,
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
            ) : (
              <small className="text-black">
                # Para desbloquear cálculos, necesita informar cadenamiento
                incial, cadenamiento final y unidad compuesta.
              </small>
            )}

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

export default MedicionFichaCampoPavimentosForm
