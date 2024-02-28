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
import { FaEdit, FaRegTrashAlt, FaRegFile } from 'react-icons/fa'

import InputMask from 'react-input-mask'
import { cn } from '@/lib/utils'
import { UnidadesSimples } from './subform/unidades-simples'
// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  nombreUnidadCompuesta: string
  descripcionUnidadCompuesta: string
  udObra: any
  subCategoriaActuacion: any
  especialidadActuacion: any
  codigoCompuesto: string
  codigoSAP: string
  unidadesSimples: any[]
}

interface FormProps {
  especialidad: any
  unidadesSimples: any[]
  especialidades: any[]
  subcategorias: any[]
  unidadesObra: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  nombreUnidadCompuesta: '',
  descripcionUnidadCompuesta: '',
  udObra: null,
  subCategoriaActuacion: null,
  especialidadActuacion: null,
  codigoCompuesto: '',
  codigoSAP: '',
  unidadesSimples: [],
}

function CatalogoUDCompuestasForm(props: FormProps) {
  const udObraId = useId()
  const subCategoriaActuacionId = useId()
  const especialidadActuacionId = useId()

  const [disabled, setDisabled] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)

  const [unidadObraSeleccionada, setUnidadObraSeleccionada] = useState(
    props.initValue
      ? props.unidadesObra.filter(
          (item: any) => item['value'] === props.initValue.udObra,
        )[0]
      : null,
  )

  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(
    props.initValue
      ? props.subcategorias.filter(
          (item: any) =>
            item['value'] === props.initValue.subCategoriaActuacion,
        )[0]
      : null,
  )

  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(
    props.initValue
      ? props.especialidades.filter(
          (item: any) =>
            item['value'] === props.initValue.especialidadActuacion,
        )[0]
      : null,
  )

  const SchemaForm = Yup.object().shape({
    nombreUnidadCompuesta: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    descripcionUnidadCompuesta: Yup.string()
      .min(2, 'Demasiado corto!')
      .required('Requerido'),
    udObra: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    subCategoriaActuacion: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),

    codigoCompuesto: Yup.string()
      .required('Requerido')
      .uppercase('Formato de código en mayúsculas'),
    // .test("formato", "Formato incorrecto. Debe ser XX.1234 o XX.XX.1234", function (value) {
    //   const formatoUnoRegex = /^[A-Za-z]{2}\.\d{4}$/;
    //   const formatoDosRegex = /^[A-Za-z]{2}\.[A-Za-z]{2}\.\d{4}$/;

    //   return formatoUnoRegex.test(value) || formatoDosRegex.test(value);
    // }),

    especialidadActuacion: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),

    // test("globalError", "La especialidad no pertenece a la subcategoria seleccionada", function (value) {
    //   const { subCategoriaActuacion, especialidadActuacion }: any = this.parent;

    //   return props.especialidades.some((item) => item.subcategory === Number(subCategoriaActuacion) && item.value === especialidadActuacion);
    // }).
    // test("globalError", "Especialidad no compatible con unidades simples", function (value) {
    //   const { subCategoriaActuacion, especialidadActuacion, unidadesSimples }: any = this.parent;

    //   const size = unidadesSimples.length;
    //   const filtered = unidadesSimples.filter(
    //     (item: any) => (
    //       props.unidadesSimples.some(
    //         (el: any) => el.especialityId === Number(especialidadActuacion) &&
    //           el.subcategoryId === subCategoriaActuacion &&
    //           el.value === item.value
    //       )
    //     )).length;

    //   return size === filtered;
    // }),

    unidadesSimples: Yup.array().min(
      1,
      'Debe seleccionar al menos una unidad simple.',
    ),
  })

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    /// Agregar al enquire en campo de codigo generado por otros campos.
    const udsimples = values.unidadesSimples.map((item) => ({
      ...item,
      especialidad: values.especialidadActuacion,
    }))
    values.unidadesSimples = udsimples

    try {
      if (typeof props.onSubmit === 'function') {
        await props.onSubmit(values)
      }
    } catch (e) {
      setDisabled(false)
    }
    formikHelpers.resetForm()
    // submitEnquiryForm({ ...values });
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
                    Unidad
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
                    Unidades Simples ({values['unidadesSimples'].length})
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
              </ul>
            </div>

            {tabIndex === 0 ? (
              <>
                <div className="mb-6">
                  <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Nombre
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </div>
                  <Field
                    disabled={disabled}
                    name="nombreUnidadCompuesta"
                    className={cn(
                      'block w-full rounded-lg border p-2.5 text-sm',
                      errors.nombreUnidadCompuesta &&
                        touched.nombreUnidadCompuesta
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                  <ErrorMessage
                    name="nombreUnidadCompuesta"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="mb-6">
                  <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Descripción
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </div>
                  <Field
                    disabled={disabled}
                    as="textarea"
                    rows={4}
                    name="descripcionUnidadCompuesta"
                    className={cn(
                      'block w-full rounded-lg border p-2.5 text-sm',
                      errors.descripcionUnidadCompuesta &&
                        touched.descripcionUnidadCompuesta
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                  <ErrorMessage
                    name="descripcionUnidadCompuesta"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Unidad de Obra
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </div>
                    <Field name="udObra">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="udObra"
                            instanceId={udObraId}
                            placeholder="Inserte unidad de obra"
                            options={props.unidadesObra}
                            value={unidadObraSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setUnidadObraSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.unidadesObra.filter(
                                    (item: any) =>
                                      item['value'] == props.initValue.udObra,
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.udObra && touched.udObra,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.udObra && touched.udObra
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="udObra"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Subcategoría de Actuación
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </div>

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
                            instanceId={subCategoriaActuacionId}
                            placeholder="Inserte subcategoria de actuacion"
                            options={props.subcategorias}
                            value={subcategoriaSeleccionada}
                            defaultValue={
                              props.initValue != null
                                ? props.subcategorias.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.subCategoriaActuacion,
                                  )[0]
                                : null
                            }
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setSubcategoriaSeleccionada(option)
                            }}
                            styles={customStyleSelect(
                              errors.subCategoriaActuacion &&
                                touched.subCategoriaActuacion,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.subCategoriaActuacion &&
                                touched.subCategoriaActuacion
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
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
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Especialidad de Actuación
                      <span className="ml-1 text-xs text-red-700">*</span>
                    </div>
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
                            value={especialidadSeleccionada}
                            options={props.especialidades.filter(
                              (item: any) =>
                                item['subcategory'] ==
                                values['subCategoriaActuacion'],
                            )}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setEspecialidadSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.especialidades.filter(
                                    (item: any) =>
                                      item['value'] ==
                                        props.initValue.especialidadActuacion &&
                                      item['subcategory'] ==
                                        props.initValue.subCategoriaActuacion,
                                  )[0]
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
                  <div className="">
                    <label
                      htmlFor="codigoSAP"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Codigo SAP{' '}
                    </label>
                    <Field
                      disabled={disabled}
                      name="codigoSAP"
                      className={cn(
                        'block w-full rounded-lg border p-2.5 text-sm',
                        errors.codigoSAP && touched.codigoSAP
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                    <ErrorMessage
                      name="codigoSAP"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>

                  {/* <div>
                      <label htmlFor="codigoCompuesto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo Obra Compuesta </label>
                      <Field disabled={disabled} name="codigoCompuesto" className={cn(
                        'border text-sm rounded-lg block w-full p-2.5',
                        errors.codigoCompuesto && touched.codigoCompuesto
                          ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                          : 'border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:border-blue-500  block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      )}
                      />
                      <ErrorMessage name="codigoCompuesto" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500" />
                    </div> */}
                  <div>
                    <label
                      htmlFor="codigoCompuesto"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Código Obra Compuesta
                    </label>
                    <Field name="codigoCompuesto">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <InputMask
                            mask="aaa.aaa.9999"
                            alwaysShowMask={true}
                            maskPlaceholder="xxx.xxx.9999"
                            maskChar="_"
                            onChange={(evt: any) => {
                              setFieldValue(field.name, evt.target.value)
                            }}
                            value={value}
                            className={cn(
                              'block w-full rounded-lg border p-2.5 text-sm',
                              errors.codigoCompuesto && touched.codigoCompuesto
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                          <small className="text-gray-500">
                            Formato: XXX.XXX.9999
                          </small>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="codigoCompuesto"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
              </>
            ) : null}
            {tabIndex === 1 ? (
              <>
                <div>
                  <Field name="unidadesSimples">
                    {({
                      field, // { name, value, onChange, onBlur }
                      value,
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: any) => (
                      <UnidadesSimples
                        onChange={(value: any) =>
                          setFieldValue(field.name, value)
                        }
                        // simplesList={
                        //   props.unidadesSimples.filter((item: any) => (item.especialityId === Number(values["especialidadActuacion"]) || item.global === true) && !values["unidadesSimples"].map((i: any) => parseInt(i.value)).includes(parseInt(item.value)))}
                        especialidad={0}
                        simplesSelected={values['unidadesSimples']}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="unidadesSimples"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
              </>
            ) : null}
            <div className="mb-6 grid gap-6 md:grid-cols-2"></div>

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
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CatalogoUDCompuestasForm
