import React, {
  useState,
  useCallback,
  ChangeEvent,
  useId,
  useEffect,
  useMemo,
} from 'react'
import { IoMdArrowDropright } from 'react-icons/io'

import Tree from 'react-d3-tree'
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
import { useCenteredTree } from '@/hooks/useCenteredTree'
import Select from 'react-select'

import { EntronquesComponent } from './subform/entronques'

import {
  FaEdit,
  FaRegTrashAlt,
  FaPlus,
  FaRoad,
  FaSquare,
  FaMinusSquare,
  FaThinkPeaks,
  FaStrikethrough,
} from 'react-icons/fa'
import { GazasComponent } from './subform/gazas'
import { cn } from '@/lib/utils'
// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  id: string
  codigoTramo: string
  nombreTramo: string
  unidadNegocio: any

  fechaAlta: string
  fechaBaja: string
  activo: boolean

  entronques: any[]
}

interface FormProps {
  units: any[]
  entronques: any[]
  gazas: any[]
  entronquesXtramos: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

const initialValues: FormValues = {
  id: '',
  codigoTramo: '',
  nombreTramo: '',
  fechaAlta: '',
  fechaBaja: '',
  activo: false,
  unidadNegocio: null,
  entronques: [],
}

function CatalogoTramosForm(props: FormProps) {
  const [dimensions, translate, containerRef] = useCenteredTree()
  const [tabIndex, setTabIndex] = useState(0)

  const [disabled, setDisabled] = useState(false)

  const SchemaForm = Yup.object().shape({
    // udObraSimple: Yup.string().trim().min(1, 'Demasiado corto!').max(70, 'Demasiado largo!').required('Requerido'),
    nombreTramo: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    unidadNegocio: Yup.string()
      .trim()
      .min(1, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    codigoTramo: Yup.string()
      .trim()
      .min(2, 'Demasiado corto!')
      .max(70, 'Demasiado largo!')
      .required('Requerido'),
    fechaAlta: Yup.string()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    fechaBaja: Yup.string()
      .min(2, 'Demasiado corto!')
      .max(80, 'Demasiado largo!')
      .required('Requerido'),
    entronques: Yup.array().min(1, 'Debe adicionar al menos 1 entronque'),
  })

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

  const ArrowIcon = ({ isOpen, className }: any) => {
    const baseClass = 'arrow'
    const classes = cn(
      baseClass,
      { [`${baseClass}--closed`]: !isOpen },
      { [`${baseClass}--open`]: isOpen },
      className,
    )
    return <IoMdArrowDropright className={classes} />
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
                    Tramo
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
                    Entronques ({values['entronques'].length})
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
                    Gazas
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
                    Vista jerarquica
                    <span className="ml-1 text-xs text-red-700">*</span>
                  </button>
                </li>
              </ul>
            </div>

            {tabIndex === 0 ? (
              <div className="flex w-full flex-col">
                <div className="mb-6">
                  <label
                    htmlFor="nombreTramo"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre de tramo
                  </label>
                  <Field
                    disabled={disabled}
                    name="nombreTramo"
                    className={cn(
                      'block w-full rounded-lg border p-2.5 text-sm',
                      errors.nombreTramo && touched.nombreTramo
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                  <ErrorMessage
                    name="nombreTramo"
                    component="div"
                    className="mt-1 text-sm text-red-600 dark:text-red-500"
                  />
                </div>

                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="codigoTramo"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Codigo de tramo
                    </label>
                    <Field
                      disabled={disabled}
                      name="codigoTramo"
                      className={cn(
                        'block w-full rounded-lg border p-2.5 text-sm',
                        errors.codigoTramo && touched.codigoTramo
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                    <ErrorMessage
                      name="codigoTramo"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
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
                            {...field}
                            id="unidadNegocio"
                            placeholder="Seleccionar unidad de negocio"
                            instanceId="unidadNegocio"
                            options={props.units}
                            value={value}
                            onChange={(option: any) =>
                              setFieldValue(
                                field.name,
                                option ? option.value : null,
                              )
                            }
                            defaultValue={
                              props.initValue != null
                                ? props.units.filter(
                                    (item: any) =>
                                      item.value ==
                                      props.initValue.unidadNegocio,
                                  )[0]
                                : []
                            }
                            styles={customStyleSelect(
                              errors.unidadNegocio && touched.unidadNegocio,
                            )}
                            className={cn(
                              'block w-full rounded-lg border text-sm',
                              errors.unidadNegocio && touched.unidadNegocio
                                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                                : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            )}
                          />
                        </div>
                      )}
                    </Field>
                    <ErrorMessage
                      name="unidadNegocio"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>

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
                              props.initValue != null
                                ? values['fechaAlta']
                                : value
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
                              props.initValue != null
                                ? values['fechaBaja']
                                : value
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
              </div>
            ) : null}

            {tabIndex === 1 ? (
              <div>
                <Field name="entronques">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <EntronquesComponent
                      errors={errors}
                      tramoId={props.initValue != null ? props.initValue.id : 0}
                      entronques={props.entronques}
                      entronquesxTramo={props.entronquesXtramos}
                      entronquesTramo={values['entronques']}
                      gazas={props.gazas}
                      onChange={(value: any) => {
                        setFieldValue(field.name, value)
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="entronques"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            ) : null}

            {tabIndex === 2 ? (
              <div>
                <Field name="gazas">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <GazasComponent
                      entronques={values['entronques']}
                      gazasList={values['entronques']
                        .map((obj) => obj.gazas)
                        .reduce((acc, val) => acc.concat(val), [])}
                      gazas={props.gazas}
                      errors={undefined}
                      onChange={(value: any) => {
                        setFieldValue(field.name, value)
                      }}
                      onAddGaza={(value: any) => {
                        values['entronques'] = [
                          ...values['entronques'].map((entronque: any) => ({
                            ...entronque,
                            gazas:
                              entronque.value === value.entronque
                                ? [...entronque.gazas, value]
                                : entronque.gazas,
                          })),
                        ]

                        console.log(values['entronques'])
                      }}
                      onDeleteGaza={(value: any) => {
                        values['entronques'] = [
                          ...values['entronques'].map((entronque: any) => ({
                            ...entronque,
                            gazas: [
                              ...entronque.gazas.filter(
                                (gaza: any) => gaza.id !== value,
                              ),
                            ],
                          })),
                        ]

                        console.log(values['entronques'])
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="gazas"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            ) : null}

            {tabIndex === 3 ? (
              <div className="w-full">
                {/* <h3 className='text-base font-semibold text-gray-800'> Estructura de tramo</h3>
                      <div className='flex'>
                        <div className='my-1'><FaRoad /> </div>
                          <div className='ml-4'>Tramo: {values["nombreTramo"]}</div>
                      </div>
                        {
                          values["entronques"].map((entronque : any, idx: number) =>(
                            <>
                              <div key={idx} className='flex ml-2'>
                                <div className='my-1'><FaStrikethrough /> </div>
                                <div className='mx-4 text-sm'> {entronque.label}</div>
                              </div>
                              {
                                entronque.gazas ?
                                entronque.gazas.map((gaza: any, idxGaza: number) => (
                                  <div key={`gaza${idxGaza}`} className='flex ml-4'>
                                    <div className='my-1' ><FaSquare /> </div>
                                    <div  className='mx-8 text-sm'> {gaza.label}</div>
                                  </div>
                                )) : null
                              }
                            </>
                          ))
                        }
                      */}

                <div
                  id="treeWrapper"
                  style={{
                    width: '100%',
                    height: '600px',
                    backgroundColor: '#f7f7f7',
                  }}
                  ref={containerRef}
                >
                  <Tree
                    data={{
                      name: `${values['nombreTramo']} (${values['codigoTramo']})`,
                      children: values['entronques'].map((entronque: any) => ({
                        name: entronque.label,
                        // attributes: {
                        //   fechaAlta: entronque.fechaAlta,
                        //   fechaBaja: entronque.fechaBaja,
                        //   fechaModificacion: entronque.fechaModificacion,
                        //   estado: entronque.estado,
                        //   gazas: entronque.gazas.length
                        // },
                        children: entronque.gazas.map((gaza: any) => ({
                          name: gaza.label,
                          // attributes: {
                          //   fechaAlta: gaza.fechaAlta,
                          //   fechaBaja: gaza.fechaBaja,
                          //   fechaModificacion: gaza.fechaModificacion,
                          //   estado: gaza.estado,
                          // },
                        })),
                      })),
                    }}
                    orientation="vertical"
                    dimensions={dimensions}
                    translate={translate}
                  />
                </div>
              </div>
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
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CatalogoTramosForm
