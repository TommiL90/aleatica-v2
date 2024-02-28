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

import { SubEspecialidades } from './subform/subespecialidades'
import { cn } from '@/lib/utils'

// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  // udObraSimple: any;
  contador: number
  sap: string
  nombreUnidadSimple: string
  descripcionUnidadSimple: string
  udObra: any
  global: boolean
  subCategoriaActuacion: any
  especialidadActuacion: any
  subEspecialidad?: any | null
}

interface FormProps {
  subEspecialidaddesList: any[]
  unidadesObra: any[]
  subcategorias: any[]
  especialidades: any[]
  especialidad: any
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  // udObraSimple: null,
  contador: 0,
  sap: '',
  nombreUnidadSimple: '',
  descripcionUnidadSimple: '',
  udObra: null,
  global: false,
  subCategoriaActuacion: null,
  especialidadActuacion: null,
  subEspecialidad: null,
}

function CatalogoUDSimplesForm(props: FormProps) {
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
    // udObraSimple: Yup.string().trim().min(1, 'Demasiado corto!').max(70, 'Demasiado largo!').required('Requerido'),
    nombreUnidadSimple: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    descripcionUnidadSimple: Yup.string()
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
    especialidadActuacion: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    // subEspecialidad: Yup.object(),
    // sap: Yup.string().trim().min(1, 'Demasiado corto!').max(80, 'Demasiado largo!').required('Requerido'),
  })

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    submitEnquiryForm({ ...values })

    formikHelpers.setFieldValue('udObraSimple', null)
    formikHelpers.setFieldValue('udObra', null)
    formikHelpers.setFieldValue('subCategoriaActuacion', null)
    formikHelpers.setFieldValue('especialidadActuacion', null)
    formikHelpers.setFieldValue('nombreUnidadSimple', '')
    formikHelpers.setFieldValue('descripcionUnidadSimple', '')

    formikHelpers.resetForm()
  }

  const submitEnquiryForm = async (values: FormValues): Promise<any> => {
    try {
      if (typeof props.onSubmit === 'function') {
        console.log(values)
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
        validate={(values: any) => {
          const errors: any = {}

          const filtered = props.subEspecialidaddesList.filter(
            (item: any) =>
              item.especialityId === Number(values.especialidadActuacion),
          )

          if (filtered.length > 0 && values.subEspecialidad === null)
            errors['subEspecialidad'] = 'Seleccione subespecialidad'

          return errors
        }}
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
                    Subespecialidad
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
                {/* <li className="me-2">
                              <button type='button' onClick={()=>setTabIndex(2)} className={cn(tabIndex === 2 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}>Jerarquia</button>
                          </li> */}
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
                    name="nombreUnidadSimple"
                    className={cn(
                      'block w-full rounded-lg border p-2.5 text-sm',
                      errors.nombreUnidadSimple && touched.nombreUnidadSimple
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                  <ErrorMessage
                    name="nombreUnidadSimple"
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
                    name="descripcionUnidadSimple"
                    className={cn(
                      'block w-full rounded-lg border p-2.5 text-sm',
                      errors.descripcionUnidadSimple &&
                        touched.descripcionUnidadSimple
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                  <ErrorMessage
                    name="descripcionUnidadSimple"
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

                              // const filteredList = props.subEspecialidaddesList.filter((item: any) => item.especialityId === Number(option.value));

                              // if (filteredList.length === 0) {

                              //  setFieldValue('subEspecialidad', null)
                              // }
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
                    <div className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Codigo SAP
                    </div>
                    <Field
                      disabled={disabled}
                      name="sap"
                      className={cn(
                        'block w-full rounded-lg border p-2.5 text-sm',
                        errors.sap && touched.sap
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                    <ErrorMessage
                      name="sap"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <Field name="global">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <div>
                          <div className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700">
                            <input
                              id="global"
                              type="checkbox"
                              checked={values['global']}
                              onChange={() => setFieldValue(field.name, !value)}
                              value={value}
                              name="bordered-checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label
                              htmlFor="global"
                              className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Global
                            </label>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>
                {/* <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div className="">
                        <label htmlFor="contador" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contador</label>
                        <Field disabled={disabled} name="contador" className={cn(
                            'border text-sm rounded-lg block w-full p-2.5',
                            errors.contador && touched.contador
                              ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                              : 'border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:border-blue-500  block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          )} 
                        />
                        <ErrorMessage name="contador" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500"/>
                      </div>
                      
                    </div> */}
              </>
            ) : null}

            {tabIndex === 1 ? (
              <div>
                <Field name="subEspecialidad">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) =>
                    props.subEspecialidaddesList.filter(
                      (item: any) =>
                        item.especialityId ===
                        Number(values['especialidadActuacion']),
                    ).length > 0 ? (
                      <SubEspecialidades
                        onChange={(value: any) =>
                          setFieldValue(field.name, value)
                        }
                        nodeSelected={values['subEspecialidad']}
                        subEspecialidadesList={props.subEspecialidaddesList.filter(
                          (item: any) =>
                            item.especialityId ===
                            Number(values['especialidadActuacion']),
                        )}
                        especialidad={values['especialidadActuacion']}
                      />
                    ) : (
                      <p className="p-4 text-center">
                        {' '}
                        No hay subespecialidades para la especialidad
                        seleccionada
                      </p>
                    )
                  }
                </Field>
                <ErrorMessage
                  name="subEspecialidad"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            ) : null}

            {/* {
                tabIndex === 2 ? (
                  <Treeview 
                    data={
                      {
                        name: `Ud simple: ${values["nombreUnidadSimple"]}`,
                        children: values["subEspecialidad"].map((sub: any) => ({
                          name: `Sub: ${sub.label}`,
                          // attributes: {
                          //   fechaAlta: entronque.fechaAlta,
                          //   fechaBaja: entronque.fechaBaja,
                          //   fechaModificacion: entronque.fechaModificacion,
                          //   estado: entronque.estado,
                          //   gazas: entronque.gazas.length
                          // },
                          children: []
                        }))
                      }
                    } 
                    height={600}
                  />
                ): null 
              } */}

            <div className=" border-t text-right">
              <button
                disabled={!isValid}
                type="submit"
                className={cn(
                  'mt-4 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto',
                  isValid
                    ? 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    : 'border-blue-300 bg-blue-400 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              >
                Guardar unidad simple
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CatalogoUDSimplesForm
