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

import Select from 'react-select'
import { cn } from '@/lib/utils'

interface FormValues {
  id: string
  nombre: string
  codigo: string
  pais: string
  zona: any[]
  administracion: any[]
  Kmcalzada: number
  m2calzada: number
  Kmcarril: number
  m2carril: number
  Kmgaza: number
  m2gaza: number
  estructuras: number
  TDPA: number
  TDPAPesados: number

  fechaAlta: string
  fechaBaja: string
  activo: boolean
}

interface FormProps {
  countries: any[]
  zones: any[]
  administrations: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  id: '',
  nombre: '',
  codigo: '',
  pais: '',
  zona: [],
  administracion: [],
  Kmcalzada: 0,
  m2calzada: 0,
  Kmcarril: 0,
  m2carril: 0,
  Kmgaza: 0,
  m2gaza: 0,
  estructuras: 0,
  TDPA: 0,
  TDPAPesados: 0,

  fechaAlta: '',
  fechaBaja: '',
  activo: false,
}

const SchemaForm = Yup.object().shape({
  // udObraSimple: Yup.string().trim().min(1, 'Demasiado corto!').max(70, 'Demasiado largo!').required('Requerido'),
  nombre: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  codigo: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  pais: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  zona: Yup.array().test(
    'La zona pertenece al pais',
    'La zona actual no pertenece al pais',
    function (value) {
      const { zona, pais }: any = this.parent
      if (pais != undefined) {
        return zona.filter((item: any) => item.countryId == pais).length > 0
      }

      return false
    },
  ),

  administracion: Yup.array().test(
    'La zona pertenece al pais',
    'La zona actual no pertenece al pais',
    function (value) {
      const { administracion, pais }: any = this.parent
      if (pais != undefined) {
        return (
          administracion.filter((item: any) => item.countryId == pais).length >
          0
        )
      }

      return false
    },
  ),

  Kmcalzada: Yup.number().required('Requerido'),
  m2calzada: Yup.number().required('Requerido'),
  Kmcarril: Yup.number().required('Requerido'),
  m2carril: Yup.number().required('Requerido'),
  Kmgaza: Yup.number().required('Requerido'),
  m2gaza: Yup.number().required('Requerido'),
  estructuras: Yup.number().required('Requerido'),
  TDPA: Yup.number().required('Requerido'),
  TDPAPesados: Yup.number().required('Requerido'),

  fechaAlta: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  fechaBaja: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
})

function IndicadorUnidadNegocio(props: FormProps) {
  const [disabled, setDisabled] = useState(false)

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    submitEnquiryForm({ ...values })

    formikHelpers.resetForm()
  }

  const submitEnquiryForm = async (values: FormValues): Promise<any> => {
    try {
      if (typeof props.onSubmit === 'function') {
        await props.onSubmit(values)
      }
    } catch (e) {
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
            <div className="mb-6">
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Agregue nombre
              </label>
              <Field
                disabled={disabled}
                name="nombre"
                className={cn(
                  'block w-full rounded-lg border p-2.5 text-sm',
                  errors.nombre && touched.nombre
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
              <ErrorMessage
                name="nombre"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="codigo"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Agregue codigo
                </label>
                <Field
                  disabled={disabled}
                  name="codigo"
                  className={cn(
                    'block w-full rounded-lg border p-2.5 text-sm',
                    errors.codigo && touched.codigo
                      ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                      : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
                <ErrorMessage
                  name="codigo"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="pais"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pais
                </label>
                <Field name="pais">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="pais"
                        instanceId="pais"
                        placeholder="Seleccione un pais"
                        options={props.countries}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.countries.filter(
                                (item: any) =>
                                  item.value == props.initValue.pais,
                              )[0]
                            : []
                        }
                        styles={customStyleSelect(errors.pais && touched.pais)}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.pais && touched.pais
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-white  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="pais"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="zona"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Zona geografica
                </label>
                <Field name="zona">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="zona"
                        instanceId="zona"
                        isMulti
                        placeholder="Seleccione zona geografica"
                        options={props.zones.filter(
                          (item: any) => item['countryId'] == values['pais'],
                        )}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(field.name, [...option])
                        }
                        defaultValue={
                          props.initValue != null ? props.initValue.zona : []
                        }
                        styles={customStyleSelect(errors.zona && touched.zona)}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.zona && touched.zona
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="zona"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="administracion"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Administracion
                </label>
                <Field name="administracion">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="administracion"
                        instanceId="administracion"
                        placeholder="Seleccione administracion"
                        isMulti
                        options={props.administrations.filter(
                          (item: any) => item['countryId'] == values['pais'],
                        )}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(field.name, [...option])
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.initValue.administracion
                            : []
                        }
                        styles={customStyleSelect(
                          errors.administracion && touched.administracion,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.administracion && touched.administracion
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="administracion"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="Kmcalzada"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Calzada Km
                </label>
                <Field name="Kmcalzada">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={
                        props.initValue != null ? values['Kmcalzada'] : value
                      }
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.Kmcalzada && touched.Kmcalzada
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="Kmcalzada"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="m2calzada"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Calzada m2
                </label>
                <Field name="m2calzada">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={
                        props.initValue != null ? values['m2calzada'] : value
                      }
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.m2calzada && touched.m2calzada
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="m2calzada"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="Kmcarril"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Carril km
                </label>
                <Field name="Kmcarril">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={
                        props.initValue != null ? values['Kmcarril'] : value
                      }
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.Kmcarril && touched.Kmcarril
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="Kmcarril"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="m2carril"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Carril m2
                </label>
                <Field name="m2carril">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={
                        props.initValue != null ? values['m2carril'] : value
                      }
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.m2carril && touched.m2carril
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="m2carril"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="Kmgaza"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gaza km
                </label>
                <Field name="Kmgaza">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={props.initValue != null ? values['Kmgaza'] : value}
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.Kmgaza && touched.Kmgaza
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="Kmgaza"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="m2gaza"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gaza m2
                </label>
                <Field name="m2gaza">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={props.initValue != null ? values['m2gaza'] : value}
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.m2gaza && touched.m2gaza
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="m2gaza"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="estructuras"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Estructuras
                </label>
                <Field name="estructuras">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={
                        props.initValue != null ? values['estructuras'] : value
                      }
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.estructuras && touched.estructuras
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="estructuras"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="TDPA"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  TDPA
                </label>
                <Field name="TDPA">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={props.initValue != null ? values['TDPA'] : value}
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.TDPA && touched.TDPA
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="TDPA"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="TDPAPesados"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  TDPA Pesados
                </label>
                <Field name="TDPAPesados">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="number"
                      value={
                        props.initValue != null ? values['TDPAPesados'] : value
                      }
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.TDPAPesados && touched.TDPAPesados
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="TDPAPesados"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fechaAlta"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha de alta
                </label>
                <Field name="fechaAlta">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <input
                        id={`fechaAlta}`}
                        type="date"
                        value={
                          props.initValue != null ? values['fechaAlta'] : value
                        }
                        onChange={(evt: any) =>
                          setFieldValue(field.name, evt.target.value)
                        }
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.fechaAlta && touched.fechaAlta
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'border-gray-300 bg-white  text-gray-900 focus:border-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="fechaAlta"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="fechaBaja"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha de baja
                </label>
                <Field name="fechaBaja">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <input
                        id={`fechaBaja}`}
                        type="date"
                        value={
                          props.initValue != null ? values['fechaBaja'] : value
                        }
                        onChange={(evt: any) =>
                          setFieldValue(field.name, evt.target.value)
                        }
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.fechaBaja && touched.fechaBaja
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'border-gray-300 bg-white  text-gray-900 focus:border-gray-100 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="fechaBaja"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <Field name="activo">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <div className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700">
                        <input
                          id="activo"
                          type="checkbox"
                          value={value}
                          name="bordered-checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="activo"
                          className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Activo
                        </label>
                      </div>
                    </div>
                  )}
                </Field>
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

export default IndicadorUnidadNegocio
