'use client'
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
import { UnidadesCompuestas } from './subform/unidades-compuestas'
import { cn } from '@/lib/utils'
import { disjoinLists } from '@/utils/disjoin-lists'

// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  categoriaProyecto: any
  categoriaActuacion: any
  subCategoriaActuacion: any
  especialidadActuacion: any
  noActuacion: string
  diferido: boolean
  nombreActuacion: string
  expediente: string
  codigoSAP: string
  PRA: boolean
  tca: null
  MRAsociado: any
  udObra: any
  faseTramo: any
  ambitoActuacion: any
  sostenibilidad: boolean

  unidadesCompuestas: any[]
}

interface FormProps {
  compositeList: any[]
  compositeSelected: any[]
  categoriaProyecto: any[]
  categoriaActuacion: any[]
  tramo: any[]
  tca: any[]
  unidadMedida: any[]
  ambitoActuacion: any[]
  MRAsociado: any[]
  subcategorias: any[]
  especialidades: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  categoriaProyecto: null,
  categoriaActuacion: null,
  subCategoriaActuacion: null,
  especialidadActuacion: null,
  noActuacion: '',
  diferido: false,
  nombreActuacion: '',
  codigoSAP: '',
  expediente: '',
  PRA: false,
  tca: null,
  MRAsociado: null,
  udObra: null,
  faseTramo: null,
  ambitoActuacion: null,
  sostenibilidad: false,
  unidadesCompuestas: [],
}

function CatalogoActuaciones(props: FormProps) {
  const tcaId = useId()
  const udObraId = useId()

  const MRAsociadoId = useId()
  const faseId = useId()
  const ambitoActuacionId = useId()

  const [tabIndex, setTabIndex] = useState(0)

  const [disabled, setDisabled] = useState(false)

  const [categoriaProyectoSeleccionada, setCategoriaProyectoSeleccionada] =
    useState(
      props.initValue
        ? props.categoriaProyecto.filter(
            (item: any) => item['value'] === props.initValue.categoriaProyecto,
          )[0]
        : null,
    )

  const [categoriaActuacionSeleccionada, setCategoriaActuacionSeleccionada] =
    useState(
      props.initValue
        ? props.categoriaActuacion.filter(
            (item: any) => item['value'] === props.initValue.categoriaActuacion,
          )[0]
        : null,
    )

  const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState(
    props.initValue
      ? props.unidadMedida.filter(
          (item: any) => item['value'] === props.initValue.udObra,
        )[0]
      : null,
  )

  const [ambitoActuacionSeleccionada, setAmbitoActuacionSeleccionada] =
    useState(
      props.initValue
        ? props.ambitoActuacion.filter(
            (item: any) => item['value'] === props.initValue.ambitoActuacion,
          )[0]
        : null,
    )

  const [MRAsociadoSeleccionada, setMRAsociadoSeleccionada] = useState(
    props.initValue
      ? props.MRAsociado.filter(
          (item: any) => item['value'] === props.initValue.MRAsociado,
        )[0]
      : null,
  )

  const [tramoSeleccionada, setTramoSeleccionada] = useState(
    props.initValue
      ? props.tramo.filter(
          (item: any) => item['value'] === props.initValue.faseTramo,
        )[0]
      : null,
  )

  const [tcaSeleccionada, setTcaSeleccionada] = useState(
    props.initValue
      ? props.tca.filter(
          (item: any) => item['value'] === props.initValue.tca,
        )[0]
      : null,
  )

  const SchemaForm = Yup.object().shape({
    categoriaProyecto: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    categoriaActuacion: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),

    udObra: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),

    nombreActuacion: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    expediente: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),

    tca: Yup.string().trim().optional().nullable(),
    noActuacion: Yup.string()
      .trim()
      .required('Requerido')
      .matches(/^[A-Za-z]{2}\d{3}$/, {
        message:
          'Formato no válido. Deben ser dos letras seguidas de tres dígitos.',
      })
      .transform((value) => (value ? value.toUpperCase() : '')),

    codigoSAP: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .optional()
      .nullable(),
    ambitoActuacion: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    MRAsociado: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .optional()
      .nullable(),
    faseTramo: Yup.string().trim().required('Requerido'),

    unidadesCompuestas: Yup.array()
      .min(1, 'Debe seleccionar al menos una unidad compuesta.')
      .required(),
  })

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    submitEnquiryForm({ ...values })

    formikHelpers.resetForm()
  }

  const submitEnquiryForm = async (values: FormValues): Promise<any> => {
    let toastId
    try {
      // Submit data
      if (typeof props.onSubmit === 'function') {
        await props.onSubmit(values)
      }
    } catch (e) {}
  }
  console.log(props.tca)
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
                    Actuacion
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
                    Unidades compuestas ({values['unidadesCompuestas'].length})
                  </button>
                </li>
              </ul>
            </div>
            {tabIndex === 0 ? (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="nombreActuacion"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre de la actuacion
                  </label>
                  <Field
                    disabled={disabled}
                    name="nombreActuacion"
                    className={cn(
                      'block w-full rounded-lg border p-2.5 text-sm',
                      errors.nombreActuacion && touched.nombreActuacion
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                  <ErrorMessage
                    name="nombreActuacion"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="noActuacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Numero de actuacion
                    </label>
                    <Field
                      disabled={disabled}
                      max={6}
                      name="noActuacion"
                      className={cn(
                        'block w-full rounded-lg border p-2.5 text-sm',
                        errors.noActuacion && touched.noActuacion
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />

                    <ErrorMessage
                      name="noActuacion"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="expediente"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expediente
                    </label>
                    <Field
                      disabled={disabled}
                      name="expediente"
                      className={cn(
                        'block w-full rounded-lg border p-2.5 text-sm',
                        errors.expediente && touched.expediente
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                    <ErrorMessage
                      name="expediente"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>

                  <div>
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
                </div>
                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  {/* <div>
                            <label htmlFor="unidadNegocio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unidad de Negocio</label>
                            <Field name="unidadNegocio" >
                            {({
                                field, // { name, value, onChange, onBlur }
                                value,
                                form: { touched, errors, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                              }: any) => (
                                  <div>
                                    <Select
                                        id='unidadNegocio'
                                        isDisabled={true}
                                        instanceId={udNegocioId}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) , menuList: base => ({ ...base, color: 'black'}) }}
                                        options={unidadNegocioIndicadores.map((item: any) => ({label: `${item['nombre']} (${item['codigo']})`, value: item['codigo']}))}
                                        value={unidadNegocioIndicadores.filter((item : any) => item['codigo'] == props.unidadNegocio).map((item: any) => ({label: `${item['nombre']} (${item['codigo']}) - ${props.year}`, value: item['codigo']}))[0]}
                                    />
                                  </div>
                                )}
                                
                            </Field>
                          </div>
                        
                        */}
                  <div>
                    <label
                      htmlFor="categoriaProyecto"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Categoria de proyecto{' '}
                    </label>
                    <Field name="categoriaProyecto">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="categoriaProyecto"
                            instanceId={udObraId}
                            placeholder="Inserte categoria de proyecto"
                            options={props.categoriaProyecto}
                            value={categoriaProyectoSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setCategoriaProyectoSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.categoriaProyecto.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.categoriaProyecto,
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.categoriaProyecto &&
                                touched.categoriaProyecto,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.categoriaProyecto &&
                                touched.categoriaProyecto
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="categoriaProyecto"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="categoriaActuacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Categoria de actuacion{' '}
                    </label>
                    <Field name="categoriaActuacion">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="categoriaActuacion"
                            instanceId={udObraId}
                            placeholder="Inserte categoria de actuacion"
                            options={props.categoriaActuacion}
                            value={categoriaActuacionSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setCategoriaActuacionSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.categoriaActuacion.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.categoriaActuacion,
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.categoriaActuacion &&
                                touched.categoriaActuacion,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.categoriaActuacion &&
                                touched.categoriaActuacion
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="categoriaActuacion"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  {/* <div>
                          <label htmlFor="subCategoriaActuacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subcategoría de Actuación</label>
                            
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
                                      id='subCategoriaActuacion'
                                      instanceId={subCategoriaActuacionId} 
                                      placeholder="Inserte subcategoria de actuacion"
                                      options={subCategoriaActuacionIndicadores.map((item: any)  => ({label: `${item['nombre']} (${item['codigo']})`, value: item['codigo']}))}
                                      value={value}
                                      
                                      defaultValue={ props.initValue != null ?
                                        subCategoriaActuacionIndicadores.filter((item: any) => item['codigo'] == props.initValue.subCategoriaActuacion).map((item: any) => ({
                                          label: item['nombre'],
                                          value: item['codigo']
                                        }))[0]
                                        : null
                                      }

                                      onChange={(option: any) => {
                                        setFieldValue(field.name, option ? option.value : null);
                                        setFieldValue('especialidadActuacion', null);
                                      }}
                                      styles={customStyleSelect(errors.subCategoriaActuacion && touched.subCategoriaActuacion)}

                                      className={cn(
                                        'border text-sm rounded-lg block w-full',
                                        errors.subCategoriaActuacion && touched.subCategoriaActuacion
                                          ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                                          : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                      )} 
                                    />
                                </div>
                              )}
                            </Field>
                            <ErrorMessage name="subCategoriaActuacion" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500"/>
                        </div>
                        <div>
                            <label htmlFor="especialidadActuacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidad de Actuación</label>
                            
                              <Field name="especialidadActuacion">
                                {({
                                  field, // { name, value, onChange, onBlur }
                                  value,
                                  form: { touched, errors, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,
                                }: any) => (
                                  <div>
                                    <Select
                                      {...field}
                                      id='especialidadActuacion'
                                      instanceId={especialidadActuacionId} 
                                      placeholder="Inserte especialidad de actuacion"
                                      value={value}
                                      options={
                                        especialidadActuacionIndicadores.filter((item: any)  => item['subcat'] == values['subCategoriaActuacion']).
                                        map((item: any)  => ({label: `${item['nombre']} (${item['codigo']})`, value: item['codigo']}))
                                      }
                                      onChange={(option: any) => setFieldValue(field.name, option ? option.value : null)}

                                      defaultValue={ props.initValue != null ?
                                        especialidadActuacionIndicadores.filter(
                                          (item: any) => item['codigo'] == props.initValue.especialidadActuacion &&
                                                        item['subcat'] == props.initValue.subCategoriaActuacion).map((item: any) => ({
                                          label: item['nombre'],
                                          value: item['codigo']
                                        }))[0]
                                        : null
                                      }
                                      

                                      styles={customStyleSelect(errors.especialidadActuacion && touched.especialidadActuacion)}

                                      className={cn(
                                        'border text-sm rounded-lg block w-full',
                                        errors.especialidadActuacion && touched.especialidadActuacion
                                          ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                                          : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                      )} 
                                    />
                                  </div>
                                )}
                              </Field>
                              <ErrorMessage name="especialidadActuacion" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500"/>
                          </div> */}
                  <div>
                    <label
                      htmlFor="udObra"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Unidad de Obra
                    </label>
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
                            options={props.unidadMedida}
                            value={unidadMedidaSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setUnidadMedidaSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.unidadMedida.filter(
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
                  {/* <div>
                            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Año</label>
                            
                              <Field name="year">
                                {({
                                  field, // { name, value, onChange, onBlur }
                                  value,
                                  form: { touched, errors, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,
                                }: any) => (
                                  <div>
                                    <Select
                                      {...field}
                                      id='year'
                                      instanceId={yearId} 
                                      placeholder="Inserte Año"
                                      value={value}
                                      options={years}
                                      onChange={(option: any) => setFieldValue(field.name, option ? option.value : null)}

                                      defaultValue={ props.initValue != null ?
                                        years.filter(
                                          (item: any) => item['value'] == props.initValue.year)[0]
                                        : null
                                      } 

                                      styles={customStyleSelect(errors.year && touched.year)}

                                      className={cn(
                                        'border text-sm rounded-lg block w-full',
                                        errors.year && touched.year
                                          ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                                          : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                      )} 
                                    />
                                  </div>
                                )}
                              </Field>
                              <ErrorMessage name="year" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500"/>
                          </div> */}
                  <div>
                    <Field name="diferido">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <div className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700">
                            <input
                              id="diferido"
                              type="checkbox"
                              checked={values['diferido']}
                              onChange={() => setFieldValue(field.name, !value)}
                              value={value}
                              name="bordered-checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label
                              htmlFor="diferido"
                              className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Diferido
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="sostenibilidad">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <div className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700">
                            <input
                              id="sostenibilidad"
                              type="checkbox"
                              checked={values['sostenibilidad']}
                              onChange={() => setFieldValue(field.name, !value)}
                              value={value}
                              name="bordered-checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label
                              htmlFor="sostenibilidad"
                              className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Sostenibilidad
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="PRA">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <div className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700">
                            <input
                              id="PRA"
                              type="checkbox"
                              checked={values['PRA']}
                              onChange={() => setFieldValue(field.name, !value)}
                              value={value}
                              name="bordered-checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label
                              htmlFor="PRA"
                              className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              PRA
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="ambitoActuacion"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Ambito de Actuacion
                    </label>
                    <Field name="ambitoActuacion">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="ambitoActuacion"
                            instanceId={ambitoActuacionId}
                            placeholder="Inserte ambito de actuacion"
                            options={props.ambitoActuacion}
                            value={ambitoActuacionSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setAmbitoActuacionSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.ambitoActuacion.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.ambitoActuacion,
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.ambitoActuacion && touched.ambitoActuacion,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.ambitoActuacion && touched.ambitoActuacion
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="ambitoActuacion"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="MRAsociado"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      MR Asociado
                    </label>
                    <Field name="MRAsociado">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="MRAsociado"
                            instanceId={MRAsociadoId}
                            placeholder="Inserte MR asociado"
                            options={props.MRAsociado}
                            value={MRAsociadoSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setMRAsociadoSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.MRAsociado.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.MRAsociado,
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.MRAsociado && touched.MRAsociado,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.MRAsociado && touched.MRAsociado
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="MRAsociado"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="faseTramo"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fase/Tramo
                    </label>
                    <Field name="faseTramo">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="faseTramo"
                            instanceId={faseId}
                            placeholder="Inserte fase/tramo"
                            options={props.tramo}
                            value={tramoSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setTramoSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.tramo.filter(
                                    (item: any) =>
                                      item['value'] ==
                                      props.initValue.faseTramo,
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.faseTramo && touched.faseTramo,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.faseTramo && touched.faseTramo
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="faseTramo"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="tca"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Puntos negros/TCA
                    </label>
                    <Field name="tca">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <Select
                            {...field}
                            id="tca"
                            instanceId={tcaId}
                            placeholder="Inserte tca"
                            // options={props.tca.filter((item: any) => item.tramo === values["faseTramo"])}
                            options={props.tca}
                            value={tcaSeleccionada}
                            onChange={(option: any) => {
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                              setTcaSeleccionada(option)
                            }}
                            defaultValue={
                              props.initValue != null
                                ? props.tca.filter(
                                    (item: any) =>
                                      Number(props.initValue.faseTramo) ===
                                      item['tramo'],
                                  )[0]
                                : null
                            }
                            styles={customStyleSelect(
                              errors.tca && touched.tca,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.tca && touched.tca
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="tca"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                </div>
              </>
            ) : null}
            {tabIndex === 1 ? (
              <div>
                <Field name="unidadesCompuestas">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <UnidadesCompuestas
                      compositeList={disjoinLists(
                        props.compositeList,
                        values['unidadesCompuestas'],
                        'value',
                      )}
                      compositeSelected={values['unidadesCompuestas']}
                      onChange={(value: any) =>
                        setFieldValue(field.name, value)
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="unidadesCompuestas"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            ) : null}

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

export default CatalogoActuaciones
