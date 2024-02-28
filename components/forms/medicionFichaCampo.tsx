import React, {
  useState,
  useCallback,
  ChangeEvent,
  useId,
  useEffect,
  useMemo,
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
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'

import Select from 'react-select'
import { IndicadorContextType } from '@/types/type'
import { especialidadActuacionIndicadores } from '@/context/indicadores'
import { useAppContext } from '@/context/appContext'
import { setFips } from 'crypto'
import { FaEdit, FaRegTrashAlt, FaRegFile } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  especialidad: string
  codigoMedicion: string
  fechaEstudioPrevio: string
  subCategoriaActuacion: any
  especialidadActuacion: any
  tramo: any
  entronque: any
  gaza: any
  carril: any
  prioridad: any
  cadenamientoInicial: string
  cadenamientoFinal: string
  deterioros: any[]
  actuaciones: any[]

  numeroEstructura: number
  tipoEstructura: string
  eje: string
  lado: string
}

interface FormProps {
  unidadNegocio: string
  especialidad: string
  redirectPath: string
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  especialidad: '',
  codigoMedicion: '',
  fechaEstudioPrevio: '',
  subCategoriaActuacion: null,
  especialidadActuacion: null,
  tramo: null,
  entronque: null,
  gaza: null,
  carril: null,
  prioridad: null,
  cadenamientoInicial: '',
  cadenamientoFinal: '',
  deterioros: [],
  actuaciones: [],

  numeroEstructura: 0,
  tipoEstructura: '',
  eje: '',
  lado: '',
}

const options: any[] = [
  { nombre: 'Option #1', codigo: 'Op1' },
  { nombre: 'Option #2', codigo: 'Op2' },
  { nombre: 'Option #3', codigo: 'Op3' },
  { nombre: 'Option #4', codigo: 'Op4' },
]

const prioridades: any[] = [
  { label: 'Urgente', value: 'Urgente' },
  { label: 'Alta', value: 'Alta' },
  { label: 'Media', value: 'Media' },
  { label: 'Baja', value: 'Baja' },
]

const SchemaForm = Yup.object().shape({
  // codigoMedicion: Yup.string().trim().min(2, 'Demasiado corto!').max(80, 'Demasiado largo!').required('Requerido'),
  fechaEstudioPrevio: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),

  // subCategoriaActuacion: Yup.string().trim().min(1, 'Demasiado corto!').max(70, 'Demasiado largo!').required('Requerido'),
  especialidadActuacion: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido')
    .test(
      'especialidad pertenece a subcategoria de actuacion',
      'La especialidad actual no pertenece a la subcategoria de actuacion',
      function (value) {
        const { especialidad }: any = this.parent

        return especialidadActuacionIndicadores.some(
          (item) => item.subcat === especialidad && item.codigo === value,
        )
      },
    ),
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
  actuaciones: Yup.array().min(1, 'Debe seleccionar al menos una actuacion.'),

  numeroEstructura: Yup.number().when(
    'especialidad',
    (especialidad, schema) => {
      if (especialidad[0] == 'E') {
        return schema
          .required('Requerido')
          .min(1, 'Numero de estructuras debe ser al menos 1')
      }
      return schema
    },
  ),
  tipoEstructura: Yup.string().when('especialidad', (especialidad, schema) => {
    if (especialidad[0] == 'E') {
      return schema.required('Requerido').min(2, 'Demasiado corto!')
    }
    return schema
  }),
  eje: Yup.string().when('especialidad', (especialidad, schema) => {
    if (especialidad[0] == 'E') {
      return schema.required('Requerido').min(2, 'Demasiado corto!')
    }
    return schema
  }),
  lado: Yup.string().when('especialidad', (especialidad, schema) => {
    if (especialidad[0] == 'E') {
      return schema.required('Requerido').min(2, 'Demasiado corto!')
    }
    return schema
  }),
  prioridad: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
})

function MedicionFichaCampoPavimentosForm(props: FormProps) {
  const [modalDeterioros, setModalDeterioros] = useState(false)
  const [modalActuaciones, setModalActuaciones] = useState(false)

  const [km, setKm] = useState(0)
  const [mtrs, setMtrs] = useState(0)
  const [distanciaSgteCadenamiento, setDistanciaSgteCadenamiento] = useState(0)

  const [km2, setKm2] = useState(0)
  const [m4, setM4] = useState(0)
  const [distanciaACadenamiento, setDistanciaACadenamiento] = useState(0)

  if (props.initValue != null) {
    props.initValue['especialidad'] = props.especialidad
  } else {
    initialValues['especialidad'] = props.especialidad
  }

  const udNegocioId = useId()
  const especialidadId = useId()
  const subCategoriaActuacionId = useId()
  const especialidadActuacionId = useId()
  const tramoId = useId()
  const entronqueId = useId()
  const gazaId = useId()
  const carrilId = useId()
  const tipoEstructuraId = useId()
  const ejeId = useId()
  const ladoId = useId()
  const prioridadId = useId()

  const router = useRouter()

  const [disabled, setDisabled] = useState(false)

  const {
    unidadNegocioIndicadores,
    tramosIndicadores,
    carrilIndicadores,
    gazaIndicadores,
    faseIndicadores,
    categoriaActuacion,
    unidadObraFinalizadaIndicadores,
    subCategoriaActuacionIndicadores,
    especialidadActuacionIndicadores,
  } = useAppContext()

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    submitEnquiryForm({ ...values })

    formikHelpers.resetForm()
  }

  const distanciaSiguienteCadenamiento = (): number => {
    if (km2 > km || (km2 == km && m4 > mtrs)) {
      if (mtrs > 999) {
        return 0
      } else {
        return 1000 - mtrs
      }
    } else {
      return mtrs
    }
  }

  const distanciaACadenamientoPrevio = (): number => {
    if (km > km2 || (km == km2 && mtrs > m4)) {
      if (m4 > 999) {
        return 0
      } else {
        return 1000 - m4
      }
    } else {
      return m4
    }
  }

  const submitEnquiryForm = async (values: FormValues): Promise<any> => {
    let toastId
    try {
      setDisabled(true)
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      if (typeof props.onSubmit === 'function') {
        await props.onSubmit(values)
      }
      toast.success('Enviado con éxito 🙌', { id: toastId })
      // Redirect user
      if (props.redirectPath) {
        router.push(props.redirectPath)
      }
    } catch (e) {
      toast.error('No se puede enviar 😱', { id: toastId })
      setDisabled(false)
    }
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
  return (
    <>
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
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="unidadNegocio"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Unidad de Negocio
                </label>
                <Field name="unidadNegocio">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        id="unidadNegocio"
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menuList: (base) => ({ ...base, color: 'black' }),
                        }}
                        isDisabled={true}
                        instanceId={udNegocioId}
                        options={unidadNegocioIndicadores.map((item: any) => ({
                          label: `${item['nombre']} (${item['codigo']})`,
                          value: item['codigo'],
                        }))}
                        value={
                          unidadNegocioIndicadores
                            .filter(
                              (item: any) =>
                                item['codigo'] == props.unidadNegocio,
                            )
                            .map((item: any) => ({
                              label: `${item['nombre']} (${item['codigo']})`,
                              value: item['codigo'],
                            }))[0]
                        }
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
                        value={
                          props.initValue != null
                            ? props.initValue.fechaEstudioPrevio
                            : value
                        }
                        onChange={(evt: any) =>
                          setFieldValue(field.name, evt.target.value)
                        }
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
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="subCategoriaActuacion"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Subcategoría de Actuación
                </label>

                <Field name="subCategoriaActuacion">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="subCategoriaActuacion"
                        isDisabled={true}
                        instanceId={subCategoriaActuacionId}
                        placeholder="Inserte subcategoria de actuacion"
                        options={subCategoriaActuacionIndicadores.map(
                          (item: any) => ({
                            label: `${item['nombre']} (${item['codigo']})`,
                            value: item['codigo'],
                          }),
                        )}
                        value={
                          subCategoriaActuacionIndicadores
                            .filter(
                              (item: any) =>
                                item['codigo'] == props.especialidad,
                            )
                            .map((item: any) => ({
                              label: `${item['nombre']} (${item['codigo']})`,
                              value: item['codigo'],
                            }))[0]
                        }
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menuList: (base) => ({ ...base, color: 'black' }),
                        }}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="subCategoriaActuacion"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="especialidadActuacion"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Especialidad de Actuación
                </label>

                <Field name="especialidadActuacion">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="especialidadActuacion"
                        instanceId={especialidadActuacionId}
                        placeholder="Inserte especialidad de actuacion"
                        value={value}
                        options={especialidadActuacionIndicadores
                          .filter(
                            (item: any) => item['subcat'] == props.especialidad,
                          )
                          .map((item: any) => ({
                            label: `${item['nombre']} (${item['codigo']})`,
                            value: item['codigo'],
                          }))}
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }}
                        defaultValue={
                          props.initValue != null
                            ? especialidadActuacionIndicadores
                                .filter(
                                  (item: any) =>
                                    item['codigo'] ==
                                      props.initValue.especialidadActuacion &&
                                    item['subcat'] ==
                                      props.initValue.subCategoriaActuacion,
                                )
                                .map((item: any) => ({
                                  label: item['nombre'],
                                  value: item['codigo'],
                                }))[0]
                            : null
                        }
                        styles={customStyleSelect(
                          errors.especialidadActuacion &&
                            touched.especialidadActuacion,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.especialidadActuacion &&
                            touched.especialidadActuacion
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="especialidadActuacion"
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
                        options={tramosIndicadores.map((item: any) => ({
                          label: `${item['nombre']}`,
                          value: item['codigo'],
                        }))}
                        value={value}
                        defaultValue={
                          props.initValue != null
                            ? tramosIndicadores
                                .filter(
                                  (item: any) =>
                                    item['codigo'] == props.initValue.tramo,
                                )
                                .map((item: any) => ({
                                  label: item['nombre'],
                                  value: item['codigo'],
                                }))[0]
                            : null
                        }
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
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
                        options={faseIndicadores.map((item: any) => ({
                          label: `${item['nombre']}`,
                          value: item['codigo'],
                        }))}
                        value={value}
                        defaultValue={
                          props.initValue != null
                            ? faseIndicadores
                                .filter(
                                  (item: any) =>
                                    item['codigo'] == props.initValue.entronque,
                                )
                                .map((item: any) => ({
                                  label: item['nombre'],
                                  value: item['codigo'],
                                }))[0]
                            : null
                        }
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
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
                        options={gazaIndicadores.map((item: any) => ({
                          label: `${item['nombre']}`,
                          value: item['codigo'],
                        }))}
                        value={value}
                        defaultValue={
                          props.initValue != null
                            ? gazaIndicadores
                                .filter(
                                  (item: any) =>
                                    item['codigo'] == props.initValue.gaza,
                                )
                                .map((item: any) => ({
                                  label: item['nombre'],
                                  value: item['codigo'],
                                }))[0]
                            : null
                        }
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }}
                        styles={customStyleSelect(errors.gaza && touched.gaza)}
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
                  name="entronque"
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
                        options={carrilIndicadores.map((item: any) => ({
                          label: `${item['nombre']}`,
                          value: item['codigo'],
                        }))}
                        value={value}
                        defaultValue={
                          props.initValue != null
                            ? carrilIndicadores
                                .filter(
                                  (item: any) =>
                                    item['codigo'] == props.initValue.carril,
                                )
                                .map((item: any) => ({
                                  label: item['nombre'],
                                  value: item['codigo'],
                                }))[0]
                            : null
                        }
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
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
                  htmlFor="cadenamientoInicial"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cadenamiento inicial
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
                        mask="999+9999"
                        alwaysShowMask={true}
                        maskChar="#"
                        onChange={(evt: any) => {
                          const value = evt.target.value
                          const array = value.split('+')

                          const kmValue = Number(array[0])
                          const mtrsValue = Number(array[1])

                          setKm(isNaN(kmValue) ? 0 : kmValue)
                          setMtrs(isNaN(mtrsValue) ? 0 : mtrsValue)

                          setDistanciaSgteCadenamiento(
                            distanciaSiguienteCadenamiento(),
                          )
                          setDistanciaACadenamiento(
                            distanciaACadenamientoPrevio(),
                          )

                          setFieldValue(field.name, evt.target.value)
                        }}
                        value={
                          props.initValue != null
                            ? props.initValue.cadenamientoInicial
                            : value
                        }
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
                  htmlFor="km"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  km
                </label>
                <Field
                  disabled={true}
                  name="km"
                  value={km}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="mtrs"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  mtrs
                </label>
                <Field
                  disabled={true}
                  name="mtrs"
                  value={mtrs}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="L"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  L
                </label>
                <Field
                  disabled={true}
                  name="mtrs"
                  value={''}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="distanciaSgteCadenamiento"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Distancia siguiente cadenamiento
                </label>
                <Field
                  disabled={true}
                  name="distanciaSgteCadenamiento"
                  value={distanciaSgteCadenamiento}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="cadenamientoFinal"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cadenamiento Final
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
                        mask="999+9999"
                        alwaysShowMask={true}
                        maskChar="#"
                        onChange={(evt: any) => {
                          const value = evt.target.value
                          const array = value.split('+')

                          const km2Value = Number(array[0])
                          const m4Value = Number(array[1])

                          setKm2(isNaN(km2Value) ? 0 : km2Value)
                          setM4(isNaN(m4Value) ? 0 : m4Value)

                          setDistanciaSgteCadenamiento(
                            distanciaSiguienteCadenamiento(),
                          )
                          setDistanciaACadenamiento(
                            distanciaACadenamientoPrevio(),
                          )

                          setFieldValue(field.name, evt.target.value)
                        }}
                        value={
                          props.initValue != null
                            ? props.initValue.cadenamientoFinal
                            : value
                        }
                        className={cn(
                          'block w-full rounded-lg border p-2.5 text-sm',
                          errors.cadenamientoFinal && touched.cadenamientoFinal
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
              <div>
                <label
                  htmlFor="km2"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  km2
                </label>
                <Field
                  disabled={true}
                  name="km2"
                  value={km2}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="m4"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  m4
                </label>
                <Field
                  disabled={true}
                  name="m4"
                  value={m4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="O"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  O
                </label>
                <Field
                  disabled={true}
                  name="mtrs"
                  value={''}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="distanciaACadenamiento"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Distancia a cadenamiento
                </label>
                <Field
                  disabled={true}
                  name="distanciaACadenamiento"
                  value={distanciaACadenamiento}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              {props.especialidad === 'E' ? (
                <>
                  <div>
                    <label
                      htmlFor="numeroEstructura"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Numero de estructura
                    </label>

                    <Field name="numeroEstructura">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <input
                            {...field}
                            type="number"
                            id="numeroEstructura"
                            min={0}
                            value={values['numeroEstructura']}
                            onChange={(evt: any) =>
                              setFieldValue(field.name, evt.target.value)
                            }
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.numeroEstructura &&
                                touched.numeroEstructura
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'border-gray-200  bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
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
                      Tipo de estructura
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
                            placeholder="Inserte tipo de estructura"
                            options={options.map((item: any) => ({
                              label: `${item['nombre']}`,
                              value: item['codigo'],
                            }))}
                            value={value}
                            defaultValue={
                              props.initValue != null
                                ? options
                                    .filter(
                                      (item: any) =>
                                        item['codigo'] ==
                                        props.initValue.tipoEstructura,
                                    )
                                    .map((item: any) => ({
                                      label: item['nombre'],
                                      value: item['codigo'],
                                    }))[0]
                                : null
                            }
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
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
                      htmlFor="idGeneral"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Identificador General
                    </label>
                    <Field
                      disabled={true}
                      name="idGeneral"
                      value={''}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eje"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Eje
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
                            placeholder="Inserte eje"
                            options={options.map((item: any) => ({
                              label: `${item['nombre']}`,
                              value: item['codigo'],
                            }))}
                            value={value}
                            defaultValue={
                              props.initValue != null
                                ? options
                                    .filter(
                                      (item: any) =>
                                        item['codigo'] == props.initValue.eje,
                                    )
                                    .map((item: any) => ({
                                      label: item['nombre'],
                                      value: item['codigo'],
                                    }))[0]
                                : null
                            }
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                            }}
                            styles={customStyleSelect(
                              errors.eje && touched.eje,
                            )}
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
                            placeholder="Inserte lado"
                            options={options.map((item: any) => ({
                              label: `${item['nombre']}`,
                              value: item['codigo'],
                            }))}
                            value={value}
                            defaultValue={
                              props.initValue != null
                                ? options
                                    .filter(
                                      (item: any) =>
                                        item['codigo'] == props.initValue.eje,
                                    )
                                    .map((item: any) => ({
                                      label: item['nombre'],
                                      value: item['codigo'],
                                    }))[0]
                                : null
                            }
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
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
                      htmlFor="codigoEstructura"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Codigo elemento estructura
                    </label>
                    <Field
                      disabled={true}
                      name="codigoEstructura"
                      value={''}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="idIntervencion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      identificador de intervencion
                    </label>
                    <Field
                      disabled={true}
                      name="idIntervencion"
                      value={''}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                </>
              ) : null}

              <div>
                <label
                  htmlFor="prioridad"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prioridad
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
                        options={prioridades}
                        value={value}
                        defaultValue={
                          props.initValue != null
                            ? prioridades.filter(
                                (item: any) =>
                                  item['value'] == props.initValue.prioridad,
                              )[0]
                            : null
                        }
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
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
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-end">
                  <Field name="deterioros">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <>
                        <button
                          id="task"
                          onClick={() => setModalDeterioros(!modalDeterioros)}
                          className={cn(
                            'mr-2 flex items-center  rounded-lg border px-5 py-2.5 text-sm font-medium focus:outline-none',
                            values.deterioros.length > 0
                              ? 'border-gray-200 bg-white  text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                              : 'dark:focus:red-gray-700  border-red-200  bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white',
                          )}
                          type="button"
                        >
                          <FaEdit className="mr-2" />
                          <span className="mr-auto">Deterioros</span>
                          <span
                            className={cn(
                              'float-right ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold',
                              values.deterioros.length > 0
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-red-300 text-red-800',
                            )}
                          >
                            {props.initValue != null
                              ? props.initValue.deterioros.length
                              : values.deterioros.length}
                          </span>
                        </button>
                        {modalDeterioros ? (
                          <ModalDeterioros
                            deteriorosList={
                              props.initValue != null
                                ? props.initValue.deterioros
                                : values.deterioros
                            }
                            especialidad={values['especialidadActuacion']}
                            onDeterioro={(value: any) =>
                              setFieldValue(field.name, value)
                            }
                            onClose={() => setModalDeterioros(!modalDeterioros)}
                          />
                        ) : null}
                      </>

                      //
                    )}
                  </Field>
                </div>

                <div className="flex items-end">
                  <Field name="actuaciones">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <>
                        <button
                          id="task"
                          onClick={() => setModalActuaciones(!modalActuaciones)}
                          className={cn(
                            'mr-2 flex items-center  rounded-lg border px-5 py-2.5 text-sm font-medium focus:outline-none',
                            values.actuaciones.length > 0
                              ? 'border-gray-200 bg-white  text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                              : 'dark:focus:red-gray-700  border-red-200  bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white',
                          )}
                          type="button"
                        >
                          <FaEdit className="mr-2" />
                          <span className="mr-auto">Actuaciones</span>
                          <span
                            className={cn(
                              'float-right ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold',
                              values.actuaciones.length > 0
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-red-300 text-red-800',
                            )}
                          >
                            {props.initValue != null
                              ? props.initValue.actuaciones.length
                              : values.actuaciones.length}
                          </span>
                        </button>
                        {modalActuaciones ? (
                          <ModalActuaciones
                            distanciaACadenamientoPrevio={distanciaACadenamientoPrevio()}
                            distanciaSiguienteCadenamiento={distanciaSiguienteCadenamiento()}
                            km={km}
                            km2={km2}
                            actuacionesList={
                              props.initValue != null
                                ? props.initValue.actuaciones
                                : values.actuaciones
                            }
                            especialidad={props.especialidad}
                            onActuacion={(value: any) =>
                              setFieldValue(field.name, value)
                            }
                            onClose={() =>
                              setModalActuaciones(!modalActuaciones)
                            }
                          />
                        ) : null}
                      </>

                      //
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className="mt-8">
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
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default MedicionFichaCampoPavimentosForm

interface DeteriorosProps {
  deteriorosList: any[]
  especialidad: any
  errors: any
  onChange: Function
}

const ids: string[] = []

export function Deterioros(props: DeteriorosProps) {
  const { deterioroIndicadores, especialidadActuacionIndicadores } =
    useAppContext()

  const [_document, set_document] = useState<Document>()

  const [currentEspecialidad, setCurrentEspecialidad] = useState(
    especialidadActuacionIndicadores
      .map((item: any) => ({
        label: item['nombre'],
        value: item['codigo'],
      }))
      .filter((item: any) => item['value'] == props.especialidad)[0],
  )

  const [currentDeterioro, setCurrentDeterioro] = useState(null)
  const [currentPrioridad, setCurrentPrioridad] = useState(null)
  const [currentObservacion, setCurrentObservacion] = useState('')
  const [items, setItems] = useState(props.deteriorosList)

  useEffect(() => {
    set_document(document)
  }, [])

  for (let i = 0; i < props.deteriorosList.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  const handleAgregarDeterioro = (e: any, id: any) => {
    if (
      props.especialidad == '' ||
      currentDeterioro == null ||
      currentObservacion == ''
    ) {
      return
    }

    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        especialidad: currentEspecialidad,
        deterioro: currentDeterioro,

        observacion: currentObservacion,
      },
    ]

    setItems(list)
    // setCurrentEspecialidad(null);
    setCurrentDeterioro(null)
    setCurrentObservacion('')

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarDeterioro = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = items.filter((item) => item['id'] != id)
    setItems(list)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const EmptyInputs = (
    <tr
      key="fixed-key-for-dont-have-problem-with-focus"
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      <td
        scope="col"
        className="w-52 whitespace-nowrap px-3 py-4 font-medium text-gray-900 dark:text-white"
        style={{ minWidth: 208 }}
      >
        <Select
          id="newEntry"
          isDisabled={true}
          instanceId={useId()}
          placeholder=""
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={especialidadActuacionIndicadores.map((item: any) => ({
            label: `${item['nombre']}`,
            value: item['codigo'],
          }))}
          value={currentEspecialidad}
          // onChange={(newValue : any)  => setCurrentEspecialidad(newValue)}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </td>
      <td scope="col" className="w-52 px-3 py-4 " style={{ minWidth: 208 }}>
        <Select
          id="newEntry"
          instanceId={useId()}
          placeholder=""
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
          options={deterioroIndicadores.map((item: any) => ({
            label: `${item['nombre']} (${item['codigo']})`,
            value: item['codigo'],
          }))}
          value={currentDeterioro}
          onChange={(newValue: any) => setCurrentDeterioro(newValue)}
        />
      </td>

      <th scope="col" className="w-72 px-3 py-3 text-center">
        <textarea
          key="fixed-key-for-dont-have-problem-with-focus"
          value={currentObservacion}
          onChange={(evt: any) => setCurrentObservacion(evt.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>
      <td className="w-4 px-3 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleAgregarDeterioro(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaRegFile />
        </button>
      </td>
      <td className="w-4 px-3 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleEliminarDeterioro(e, 0)}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  )

  return (
    <div className="mb-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            className={cn(
              'text-xs uppercase text-gray-700',
              // props.errors.tareas
              //   ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
              //   : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
            )}
          >
            <tr>
              <th
                scope="col"
                className="w-52 px-3 py-3"
                style={{ minWidth: 208 }}
              >
                Especialidad
              </th>
              <th
                scope="col"
                className="w-52  px-3 py-3"
                style={{ minWidth: 208 }}
              >
                Deterioro
              </th>

              <th scope="col" className="w-72  px-2 py-3">
                Observacion
              </th>

              <th scope="col" className="w-4 px-2 py-3">
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className="w-4 px-2 py-3">
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length == 0
              ? EmptyInputs
              : items
                  .map((item, index) => (
                    <tr
                      key={item['id']}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td
                        scope="col"
                        className="w-52 whitespace-nowrap px-3 py-4 font-medium text-gray-900 dark:text-white"
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          id={`especialidad-${item['id']}`}
                          instanceId={`especialidad-${item['id']}`}
                          isDisabled={true}
                          placeholder=""
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={especialidadActuacionIndicadores.map(
                            (item: any) => ({
                              label: `${item['nombre']}`,
                              value: item['codigo'],
                            }),
                          )}
                          value={item['especialidad']}
                        />
                      </td>
                      <td
                        scope="col"
                        className="w-52 px-3 py-4 "
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          id={`deterioro-${item['id']}`}
                          instanceId={`deterioro-${item['id']}`}
                          isDisabled={true}
                          placeholder=""
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={deterioroIndicadores.map((item: any) => ({
                            label: `${item['nombre']} (${item['codigo']})`,
                            value: item['codigo'],
                          }))}
                          value={item['deterioro']}
                        />
                      </td>

                      <th scope="col" className="w-72 px-3 py-3 text-center">
                        <textarea
                          id={`observacion-${item['id']}`}
                          disabled={true}
                          value={item['observacion']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>

                      <td className="w-4 px-3 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleAgregarDeterioro(e, item['id'])}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaRegFile />
                        </button>
                      </td>
                      <td className="w-4 px-3 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleEliminarDeterioro(e, item['id'])
                          }
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                  .concat(EmptyInputs)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ModalDeterioros({
  deteriorosList = [],
  especialidad = null,
  onDeterioro = (e: any) => {},
  onClose = () => {},
}) {
  const [items, setItems] = useState(deteriorosList)
  const [modal, setModal] = useState(false)

  return (
    <>
      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 flex w-full items-center overflow-y-auto overflow-x-hidden p-4  md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Deterioros
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              <Deterioros
                errors={null}
                deteriorosList={items}
                especialidad={especialidad}
                onChange={(value: any) => {
                  setItems(value)
                  onDeterioro(value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}

/// ////////////////////////// Actuaciones //////////////////////////////////////////////////////////////////

const udcompuestas: any[] = [
  { label: 'UD #1', value: 'UD1' },
  { label: 'UD #2', value: 'UD2' },
  { label: 'UD #3', value: 'UD3' },
  { label: 'UD #4', value: 'UD4' },
  { label: 'UD #5', value: 'UD5' },
]

const optionstest: any[] = [
  { label: 'Option #1', value: 'Op1' },
  { label: 'Option #2', value: 'Op2' },
  { label: 'Option #3', value: 'Op3' },
  { label: 'Option #4', value: 'Op4' },
]

interface ActuacionesProps {
  actuacionesList: any[]
  especialidad: string
  distanciaACadenamientoPrevio: number
  distanciaSiguienteCadenamiento: number
  km: number
  km2: number
  errors: any
  onChange: Function
}

export function Actuaciones(props: ActuacionesProps) {
  const {
    deterioroIndicadores,
    especialidadActuacionIndicadores,
    categoriaActuacionIndicadores,
  } = useAppContext()

  const [_document, set_document] = useState<Document>()

  const [currentEspecialidad, setCurrentEspecialidad] = useState(
    props.especialidad,
  )

  console.log(currentEspecialidad)

  const [currentActuacion, setCurrentActuacion] = useState(null)
  const [currentUDCompuesta, setCurrentUDCompuesta] = useState(null)
  const [currentLongitud, setCurrentLongitud] = useState(
    props.distanciaACadenamientoPrevio +
      props.distanciaSiguienteCadenamiento +
      (Math.abs(props.km2 - props.km) - 1) * 1000,
  )
  const [currentAncho, setCurrentAncho] = useState(0)
  const [currentEspesor, setCurrentEspesor] = useState(0)
  const [items, setItems] = useState(props.actuacionesList)

  const [currentElemento, setCurrentElemento] = useState(null)
  const [currentCalificacion, setCurrentCalificacion] = useState(null)

  const [currentAnchoPromedioCalzada, setCurrentAnchoPromedioCalzada] =
    useState(0)
  const [currentEsviaje, setCurrentEsviaje] = useState(0)
  const [currentAnchoJunta, setCurrentAnchoJunta] = useState(0)
  const [currentNumeroElementos, setCurrentNumeroElementos] = useState(0)
  const [currentEje, setCurrentEje] = useState(0)
  const [currentUnidad, setCurrentUnidad] = useState(0)
  const [currentToneladas, setCurrentToneladas] = useState(0)

  useEffect(() => {
    set_document(document)
  }, [])

  for (let i = 0; i < props.actuacionesList.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  const handleAgregarActuacion = (e: any, id: any) => {
    if (
      props.especialidad == '' ||
      currentActuacion == null ||
      currentUDCompuesta == null ||
      currentLongitud <= 0 ||
      currentAncho <= 0 ||
      currentEspesor <= 0 ||
      currentAnchoPromedioCalzada <= 0 ||
      currentEsviaje <= 0 ||
      currentAnchoJunta <= 0 ||
      currentNumeroElementos <= 0
    ) {
      return
    }

    if (
      props.especialidad == 'E' &&
      (currentElemento == null ||
        currentActuacion == null ||
        currentEje == 0 ||
        currentUnidad == 0 ||
        currentToneladas == 0)
    ) {
      return
    }

    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        especialidad: currentEspecialidad,
        actuacion: currentActuacion,
        udcompuesta: currentUDCompuesta,
        elemento: currentEspecialidad == 'E' ? currentElemento : null,
        calificacion: currentEspecialidad == 'E' ? currentCalificacion : null,
        anchoPromedioCalzada: currentAnchoPromedioCalzada,
        esviaje: currentEsviaje,
        anchoJunta: currentAnchoJunta,
        numElementos: currentNumeroElementos,
        longitud: currentLongitud,
        ancho: currentAncho,
        espesor: currentEspesor,
        eje: currentEspecialidad == 'E' ? currentEje : null,
        unidad: currentEspecialidad == 'E' ? currentUnidad : null,
        toneladas: currentEspecialidad == 'E' ? currentToneladas : null,
      },
    ]

    setItems(list)
    setCurrentActuacion(null)
    setCurrentUDCompuesta(null)
    setCurrentElemento(null)
    setCurrentCalificacion(null)
    setCurrentAnchoPromedioCalzada(0)
    setCurrentEsviaje(0)
    setCurrentAnchoJunta(0)
    setCurrentNumeroElementos(0)
    setCurrentEje(0)
    setCurrentUnidad(0)
    setCurrentToneladas(0)
    setCurrentLongitud(0)
    setCurrentAncho(0)
    setCurrentEspesor(0)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarActuacion = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = items.filter((item) => item['id'] != id)
    setItems(list)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const EmptyInputs = (
    <tr
      key="fixed-key-for-dont-have-problem-with-focus"
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      {/* <td scope="col" className="w-52 px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{minWidth: 208}}>
        <Select
          id="newEntry"
          isDisabled={true}
          instanceId={useId()}
          placeholder=""
          className='border text-sm rounded-lg block bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          options={
            especialidadActuacionIndicadores.map((item: any)  => ({label: `${item['nombre']}`, value: item['codigo']}))
          }
          value={currentEspecialidad}
          //onChange={(newValue : any)  => setCurrentEspecialidad(newValue)}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </td> */}
      <td scope="col" className="w-52 px-3 py-4 " style={{ minWidth: 208 }}>
        <Select
          id="newEntry"
          instanceId={useId()}
          placeholder=""
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
          options={deterioroIndicadores.map((item: any) => ({
            label: `${item['nombre']} (${item['codigo']})`,
            value: item['codigo'],
          }))}
          value={currentActuacion}
          onChange={(newValue: any) => setCurrentActuacion(newValue)}
        />
      </td>
      <th scope="col" className="w-52  px-3 py-3" style={{ minWidth: 208 }}>
        <Select
          id="newEntry"
          instanceId={useId()}
          placeholder=""
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
          options={udcompuestas}
          value={currentUDCompuesta}
          onChange={(newValue: any) => setCurrentUDCompuesta(newValue)}
        />
      </th>
      {currentEspecialidad === 'E' ? (
        <>
          <th scope="col" className="w-52  px-3 py-3" style={{ minWidth: 208 }}>
            <Select
              id="newEntry"
              instanceId={crypto.randomUUID()}
              placeholder=""
              className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menuList: (base) => ({ ...base, color: 'black' }),
              }}
              menuPortalTarget={_document?.body}
              menuPlacement="auto"
              options={optionstest}
              value={currentElemento}
              onChange={(newValue: any) => setCurrentElemento(newValue)}
            />
          </th>
          <th scope="col" className="w-52  px-3 py-3" style={{ minWidth: 208 }}>
            <Select
              id="newEntry"
              instanceId={crypto.randomUUID()}
              placeholder=""
              className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menuList: (base) => ({ ...base, color: 'black' }),
              }}
              menuPortalTarget={_document?.body}
              menuPlacement="auto"
              options={optionstest}
              value={currentCalificacion}
              onChange={(newValue: any) => setCurrentCalificacion(newValue)}
            />
          </th>
        </>
      ) : null}
      <th
        scope="col"
        className="w-28 px-3 py-3 text-center"
        style={{ minWidth: 112 }}
      >
        <input
          type="number"
          min={0}
          value={currentAnchoPromedioCalzada}
          onChange={(evt: any) =>
            setCurrentAnchoPromedioCalzada(evt.target.value)
          }
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>
      <th
        scope="col"
        className="w-28 px-3 py-3 text-center"
        style={{ minWidth: 112 }}
      >
        <input
          type="number"
          min={0}
          value={currentEsviaje}
          onChange={(evt: any) => setCurrentEsviaje(evt.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>
      <th
        scope="col"
        className="w-28 px-3 py-3 text-center"
        style={{ minWidth: 112 }}
      >
        <input
          type="number"
          min={0}
          value={currentAnchoJunta}
          onChange={(evt: any) => setCurrentAnchoJunta(evt.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>
      <th
        scope="col"
        className="w-28 px-3 py-3 text-center"
        style={{ minWidth: 112 }}
      >
        <input
          type="number"
          min={0}
          value={currentNumeroElementos}
          onChange={(evt: any) => setCurrentNumeroElementos(evt.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>

      <th scope="col" className="w-28 px-3 py-3 text-center">
        {currentLongitud > 0 ? currentLongitud : 0}
        {/* <input 
          type='number'
          min={0}
          disabled={true}
          value={currentLongitud} 
          onChange={(evt: any) => setCurrentLongitud(evt.target.value)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        /> */}
      </th>
      <th
        scope="col"
        className="w-28 px-3 py-3 text-center"
        style={{ minWidth: 112 }}
      >
        <input
          type="number"
          min={0}
          value={currentAncho}
          onChange={(evt: any) => setCurrentAncho(evt.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>
      <th scope="col" className="w-14 px-3 py-3 text-center">
        {currentLongitud * currentAncho}
      </th>
      <th
        scope="col"
        className="w-28 px-3 py-3 text-center"
        style={{ minWidth: 112 }}
      >
        <input
          type="number"
          min={0}
          value={currentEspesor}
          onChange={(evt: any) => setCurrentEspesor(evt.target.value)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </th>
      <th scope="col" className="w-24 px-3 py-3 text-center">
        {currentLongitud * currentAncho * currentEspesor}
      </th>
      {currentEspecialidad == 'E' ? (
        <>
          <th
            scope="col"
            className="w-28 px-3 py-3 text-center"
            style={{ minWidth: 112 }}
          >
            <input
              type="number"
              min={0}
              value={currentEje}
              onChange={(evt: any) => setCurrentEje(evt.target.value)}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </th>
          <th
            scope="col"
            className="w-28 px-3 py-3 text-center"
            style={{ minWidth: 112 }}
          >
            <input
              type="number"
              min={0}
              value={currentUnidad}
              onChange={(evt: any) => setCurrentUnidad(evt.target.value)}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </th>
          <th
            scope="col"
            className="w-28 px-3 py-3 text-center"
            style={{ minWidth: 112 }}
          >
            <input
              type="number"
              min={0}
              value={currentToneladas}
              onChange={(evt: any) => setCurrentToneladas(evt.target.value)}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </th>
        </>
      ) : null}

      <td className="w-4 px-3 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleAgregarActuacion(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaRegFile />
        </button>
      </td>
      <td className="w-4 px-3 py-4 text-right">
        <button
          type="button"
          onClick={(e) => handleEliminarActuacion(e, 0)}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  )

  return (
    <div className="mb-4">
      <div className="relative overflow-x-scroll shadow-md sm:rounded-lg">
        <table className="w-full overflow-x-auto  text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            className={cn(
              'text-xs uppercase text-gray-700',
              // props.errors.tareas
              //   ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
              //   : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
            )}
          >
            <tr>
              {/* <th scope="col" className="w-52 px-3 py-3" style={{minWidth: 208}}>
                Especialidad
              </th> */}
              <th
                scope="col"
                className="w-52  px-3 py-3"
                style={{ minWidth: 208 }}
              >
                Actuacion
              </th>
              <th
                scope="col"
                className="w-52  px-3 py-3"
                style={{ minWidth: 208 }}
              >
                UD Compuesta
              </th>
              {currentEspecialidad === 'E' ? (
                <>
                  <th
                    scope="col"
                    className="w-52  px-3 py-3"
                    style={{ minWidth: 208 }}
                  >
                    Elemento
                  </th>
                  <th
                    scope="col"
                    className="w-52  px-3 py-3"
                    style={{ minWidth: 208 }}
                  >
                    Calificación
                  </th>
                </>
              ) : null}
              <th
                scope="col"
                className="w-28  px-2 py-3"
                style={{ minWidth: 112 }}
              >
                Ancho promedio de calzada
              </th>
              <th
                scope="col"
                className="w-28  px-2 py-3"
                style={{ minWidth: 112 }}
              >
                Esviaje
              </th>
              <th
                scope="col"
                className="w-28  px-2 py-3"
                style={{ minWidth: 112 }}
              >
                Ancho Junta
              </th>
              <th
                scope="col"
                className="w-28  px-2 py-3"
                style={{ minWidth: 112 }}
              >
                Núm de Elementos
              </th>
              <th scope="col" className="w-28  px-2 py-3">
                Longitud
              </th>
              <th
                scope="col"
                className="w-28  px-2 py-3"
                style={{ minWidth: 112 }}
              >
                Ancho
              </th>
              <th scope="col" className="w-14  px-2 py-3">
                Area
              </th>
              <th
                scope="col"
                className="w-28  px-2 py-3"
                style={{ minWidth: 112 }}
              >
                Espesor
              </th>
              <th scope="col" className="w-24  px-2 py-3">
                Volumen
              </th>
              {currentEspecialidad == 'E' ? (
                <>
                  <th
                    scope="col"
                    className="w-28  px-2 py-3"
                    style={{ minWidth: 112 }}
                  >
                    Eje
                  </th>
                  <th
                    scope="col"
                    className="w-28  px-2 py-3"
                    style={{ minWidth: 112 }}
                  >
                    Unidad
                  </th>
                  <th
                    scope="col"
                    className="w-28  px-2 py-3"
                    style={{ minWidth: 112 }}
                  >
                    Toneladas
                  </th>
                </>
              ) : null}

              <th scope="col" className="w-4 px-2 py-3">
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className="w-4 px-2 py-3">
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length == 0
              ? EmptyInputs
              : items
                  .map((item, index) => (
                    <tr
                      key={item['id']}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      {/* <td scope="col" className="w-52 px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{minWidth: 208}}>
                      <Select
                        id={`especialidad-${item['id']}`}
                        instanceId={`especialidad-${item['id']}`}
                        isDisabled={true}
                        placeholder=""
                        className='border text-sm rounded-lg block bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                     
                        options={
                          especialidadActuacionIndicadores.map((item: any)  => ({label: `${item['nombre']}`, value: item['codigo']}))
                        }
                        value={item['especialidad']}
                      />
                    </td> */}
                      <td
                        scope="col"
                        className="w-52 px-3 py-4 "
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          id={`actuacion-${item['id']}`}
                          instanceId={`actuacion-${item['id']}`}
                          isDisabled={true}
                          placeholder=""
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={categoriaActuacionIndicadores.map(
                            (item: any) => ({
                              label: `${item['nombre']} (${item['codigo']})`,
                              value: item['codigo'],
                            }),
                          )}
                          value={item['actuacion']}
                        />
                      </td>
                      <td
                        scope="col"
                        className="w-52 px-3 py-4 "
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          id={`udcompuesta-${item['id']}`}
                          instanceId={`udcompuesta-${item['id']}`}
                          isDisabled={true}
                          placeholder=""
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          options={udcompuestas}
                          value={item['udcompuesta']}
                        />
                      </td>
                      {currentEspecialidad === 'E' ? (
                        <>
                          <th
                            scope="col"
                            className="w-52  px-3 py-3"
                            style={{ minWidth: 208 }}
                          >
                            <Select
                              id={`elemento-${item['id']}`}
                              instanceId={`elemento-${item['id']}`}
                              isDisabled={true}
                              placeholder=""
                              className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                                menuList: (base) => ({
                                  ...base,
                                  color: 'black',
                                }),
                              }}
                              options={options}
                              value={item['elemento']}
                            />
                          </th>
                          <th
                            scope="col"
                            className="w-52  px-3 py-3"
                            style={{ minWidth: 208 }}
                          >
                            <Select
                              id={`calificacion-${item['id']}`}
                              instanceId={`calificacion-${item['id']}`}
                              isDisabled={true}
                              placeholder=""
                              className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                                menuList: (base) => ({
                                  ...base,
                                  color: 'black',
                                }),
                              }}
                              options={options}
                              value={item['calificacion']}
                            />
                          </th>
                        </>
                      ) : null}
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-center"
                        style={{ minWidth: 112 }}
                      >
                        <input
                          id={`anchoPromedioCalzada-${item['id']}`}
                          min={0}
                          disabled={true}
                          value={item['anchoPromedioCalzada']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-center"
                        style={{ minWidth: 112 }}
                      >
                        <input
                          id={`esviaje-${item['id']}`}
                          min={0}
                          disabled={true}
                          value={item['esviaje']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-center"
                        style={{ minWidth: 112 }}
                      >
                        <input
                          id={`anchoJunta-${item['id']}`}
                          min={0}
                          disabled={true}
                          value={item['anchoJunta']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-center"
                        style={{ minWidth: 112 }}
                      >
                        <input
                          id={`numElementos-${item['id']}`}
                          min={0}
                          disabled={true}
                          value={item['numElementos']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>
                      <th scope="col" className="w-28 px-3 py-3 text-center">
                        {item['longitud']}
                        {/* <input 
                        id={`longitud-${item['id']}`}
                        min={0}
                        disabled={true}
                        value={item['longitud']} 
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      /> */}
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-center"
                        style={{ minWidth: 112 }}
                      >
                        <input
                          id={`ancho-${item['id']}`}
                          min={0}
                          disabled={true}
                          value={item['ancho']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>
                      <th scope="col" className="w-14 px-3 py-3 text-center">
                        {item['longitud'] * item['ancho']}
                      </th>
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-center"
                        style={{ minWidth: 112 }}
                      >
                        <input
                          id={`espesor-${item['id']}`}
                          min={0}
                          disabled={true}
                          value={item['espesor']}
                          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </th>
                      <th scope="col" className="w-24 px-3 py-3 text-center">
                        {item['longitud'] * item['ancho'] * item['espesor']}
                      </th>

                      {currentEspecialidad == 'E' ? (
                        <>
                          <th
                            scope="col"
                            className="w-28 px-3 py-3 text-center"
                            style={{ minWidth: 112 }}
                          >
                            <input
                              id={`eje-${item['id']}`}
                              min={0}
                              disabled={true}
                              value={item['eje']}
                              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                          </th>
                          <th
                            scope="col"
                            className="w-28 px-3 py-3 text-center"
                            style={{ minWidth: 112 }}
                          >
                            <input
                              id={`unidad-${item['id']}`}
                              min={0}
                              disabled={true}
                              value={item['unidad']}
                              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                          </th>
                          <th
                            scope="col"
                            className="w-28 px-3 py-3 text-center"
                            style={{ minWidth: 112 }}
                          >
                            <input
                              id={`toneladas-${item['id']}`}
                              min={0}
                              disabled={true}
                              value={item['toneladas']}
                              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                          </th>
                        </>
                      ) : null}

                      <td className="w-4 px-3 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleAgregarActuacion(e, item['id'])}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaRegFile />
                        </button>
                      </td>
                      <td className="w-4 px-3 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleEliminarActuacion(e, item['id'])
                          }
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                  .concat(EmptyInputs)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ModalActuaciones({
  actuacionesList = [],
  especialidad = '',
  distanciaACadenamientoPrevio = 0,
  distanciaSiguienteCadenamiento = 0,
  km = 0,
  km2 = 0,

  onActuacion = (e: any) => {},
  onClose = () => {},
}) {
  const [items, setItems] = useState(actuacionesList)
  const [modal, setModal] = useState(false)

  return (
    <>
      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      >
        <div className="relative">
          <div
            className="relative h-full overflow-x-visible rounded-lg bg-white  shadow dark:bg-gray-700"
            style={{ height: '100vh' }}
          >
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Actuaciones
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              <Actuaciones
                distanciaACadenamientoPrevio={distanciaACadenamientoPrevio}
                distanciaSiguienteCadenamiento={distanciaSiguienteCadenamiento}
                km={km}
                km2={km2}
                errors={null}
                actuacionesList={items}
                especialidad={especialidad}
                onChange={(value: any) => {
                  setItems(value)
                  onActuacion(value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}
