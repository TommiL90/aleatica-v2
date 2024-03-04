/* eslint-disable react-hooks/exhaustive-deps */
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
import { Deterioros } from '../subform/deterioros'
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
  tipologia: any
  posicion: any
  disposicion: any
  ancho: number
  espesor: number
  unidad: number
  litro: number
  tonelada: number
  observacion: string
}

interface FormProps {
  especialidad: any
  tramos: any[]
  entronques: any[]
  gazas: any[]
  carriles: any[]
  deterioros: any[]
  actuaciones: any[]

  prioridades: any[]
  tipologias: any[]
  posiciones: any[]
  disposiciones: any[]
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

  cadenamientoInicial: 0,
  cadenamientoFinal: 0,
  deterioros: [],
  actuacion: null,
  compuesta: null,
  prioridad: null,
  tipologia: null,
  posicion: null,
  disposicion: null,
  ancho: 0,
  espesor: 0,
  unidad: 0,
  litro: 0,
  tonelada: 0,
  observacion: '',
}

function MedicionFichaCampoSafetyForm(props: FormProps) {
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
    props.initValue
      ? props.entronques.filter(
          (item: any) => item['value'] === props.initValue.entronque,
        )[0]
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
    useState(props.initValue ? props.initValue.cadenamientoInicial : '')
  const [cadenamientoFinalSeleccionada, setCadenamientoFinalSeleccionada] =
    useState(props.initValue ? props.initValue.cadenamientoFinal : '')

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

  const [tipologiaSeleccionada, setTipologiaSeleccionada] = useState(
    props.initValue
      ? props.tipologias.filter(
          (item: any) => item['value'] === props.initValue.tipologia,
        )[0]
      : null,
  )

  const [posicionSeleccionada, setPosicionSeleccionada] = useState(
    props.initValue
      ? props.posiciones.filter(
          (item: any) => item['value'] === props.initValue.posicion,
        )[0]
      : null,
  )

  const [disposicionSeleccionada, setDisposicionSeleccionada] = useState(
    props.initValue
      ? props.disposiciones.filter(
          (item: any) => item['value'] === props.initValue.disposicion,
        )[0]
      : null,
  )

  const [observacionesSeleccionada, setObservacionesSeleccionada] = useState(
    props.initValue ? props.initValue.observaciones : '',
  )

  const [longitud, setLongitud] = useState(
    props.initValue ? props.initValue.densidad : 0,
  )

  const [unidad, setUnidad] = useState(
    props.initValue ? props.initValue.unidad : 0,
  )

  const [porcentajeAfectacion, setPorcentajeAfectacion] = useState(
    props.initValue ? props.initValue.porcentajeAfectacion : 100,
  )

  const [alternativeUnitMeasurementValue, setAlternativeUnitMeasurementValue] =
    useState(
      props.initValue ? props.initValue.alternativeUnitMeasurementValue : 0,
    )

  const [altInput, setAltInput] = useState(false)
  const [activeZincInputs, setActiveInputs] = useState(true)

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

  const tipologiaId = useId()
  const posicionId = useId()
  const disposicionId = useId()

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
    tramo: Yup.string().required('Requerido'),
    entronque: Yup.string().required('Requerido'),
    gaza: Yup.string().required('Requerido'),
    carril: Yup.string().required('Requerido'),
    deterioros: Yup.array().min(1, 'Debe seleccionar al menos un deterioro.'),
    actuacion: Yup.string().required('Requerido'),
    compuesta: Yup.string().required('Requerido'),
    prioridad: Yup.string().required('Requerido'),
    tipologia: Yup.string().required('Requerido'),
    posicion: Yup.string().required('Requerido'),
    disposicion: Yup.string().required('Requerido'),

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
    unidad: Yup.number().min(1).required('Requerido'),
    longitud: Yup.number()
      .optional()
      .moreThan(-1, 'Debe ser un número positivo o cero')
      .nullable()
      .test('maxDecimals', 'Máximo de dos decimales permitidos', (value) => {
        if (value === undefined || value === null) return true // Permite valores undefined
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
  })

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const data = {
      ...values,
      longitud,
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

  const value = {
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
    affectePercentage: porcentajeAfectacion || 100,
    ud: unidad || 0,
    alternativeUnitMeasurementValue,
  }
  const handleGetInfo = async () => {
    const res = await fetch(`${process.env.API_URL}/MeasurementTab/GetInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
    const data = await res.json()
    if (data.result) {
      const { length } = data.result
      setLongitud(length)
    }
  }

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
    unidad,
    alternativeUnitMeasurementValue,
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
                          options={props.entronques}
                          value={entronqueSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.entronques.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.entronque,
                                )[0]
                              : null
                          }
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

                <div>
                  <label
                    htmlFor="tipologia"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tipologia
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="tipologia">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="tipologia"
                          instanceId={tipologiaId}
                          placeholder="Inserte tipologia"
                          options={props.tipologias}
                          value={tipologiaSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.tipologias.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.tipologia,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setTipologiaSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.tipologia && touched.tipologia,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.tipologia && touched.tipologia
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="tipologia"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="posicion"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Posicion
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="posicion">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="posicion"
                          instanceId={posicionId}
                          placeholder="Inserte posicion"
                          options={props.posiciones}
                          value={posicionSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.posiciones.filter(
                                  (item: any) =>
                                    item['value'] == props.initValue.posicion,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setPosicionSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.posicion && touched.posicion,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.posicion && touched.posicion
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="posicion"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="disposicion"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Disposicion
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </label>

                  <Field name="disposicion">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <div>
                        <Select
                          {...field}
                          id="disposicion"
                          instanceId={disposicionId}
                          placeholder="Inserte disposicion"
                          options={props.disposiciones}
                          value={disposicionSeleccionada}
                          defaultValue={
                            props.initValue != null
                              ? props.disposiciones.filter(
                                  (item: any) =>
                                    item['value'] ==
                                    props.initValue.disposicion,
                                )[0]
                              : null
                          }
                          onChange={(option: any) => {
                            setFieldValue(
                              field.name,
                              option ? option.value : null,
                            )
                            setDisposicionSeleccionada(option)
                          }}
                          styles={customStyleSelect(
                            errors.disposicion && touched.disposicion,
                          )}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.disposicion && touched.disposicion
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="disposicion"
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
                            isDisabled={actuacionSeleccionada === null}
                            options={
                              actuacionSeleccionada
                                ? actuacionSeleccionada.compuestas
                                : []
                            }
                            value={compuestaSeleccionada}
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
                  <div className="flex items-center">
                    <input
                      id="checked-checkbox"
                      type="checkbox"
                      checked={!activeZincInputs}
                      onChange={() => setActiveInputs(!activeZincInputs)}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="checked-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Liberar campos de lectura grises e introducir datos
                      manualmente
                    </label>
                  </div>
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

                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="porcentajeAfectacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      % afectación
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
                          onChange={(evt: any) => {
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
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      longitud (m)
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
                          min={0}
                          max={100}
                          disabled={activeZincInputs}
                          value={longitud}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setLongitud(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.longitud && touched.longitud
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-gray-100 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="longitud"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="unidad"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nº de piezas / unidades
                    </label>
                    <Field name="unidad">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="number"
                          min={0}
                          value={unidad}
                          onChange={(evt: any) => {
                            setFieldValue(field.name, evt.target.valueAsNumber)
                            setUnidad(evt.target.valueAsNumber)
                          }}
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.unidad && touched.unidad
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="unidad"
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

export default MedicionFichaCampoSafetyForm
