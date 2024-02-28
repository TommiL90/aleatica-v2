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
import TreeView, { flattenTree } from 'react-accessible-treeview'
import { IoMdArrowDropright } from 'react-icons/io'
import { FaCheckSquare, FaMinusSquare, FaSquare } from 'react-icons/fa'
import SubespecialidadesNiveles from '../subespecialidadesNiveles'
import { cn } from '@/lib/utils'
// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  id: string
  subcategoria: string
  nombre: string
  codigo: string
  especialidad: number
  padre: number
}

interface FormProps {
  subcategorias: any[]
  especialidades: any[]
  padres: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

const initialValues: FormValues = {
  id: '',
  subcategoria: '',
  nombre: '',
  codigo: '',
  especialidad: 0,
  padre: 0,
}

const SchemaForm = Yup.object().shape({
  subcategoria: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
  nombre: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  codigo: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  especialidad: Yup.number()
    .min(1, 'Especialidad requerida')
    .required('Requerido'),
  // padre: Yup.string().trim().min(1, 'Demasiado corto!').max(80, 'Demasiado largo!').required('Requerido'),
})

function IndicadorSubEspecialidadForm(props: FormProps) {
  const [disabled, setDisabled] = useState(false)

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    if (props.initValue == null) {
      values['id'] = crypto.randomUUID()
    }

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
              <div className="mb-6">
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

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="subcategoria"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Subcategoria de actuacion
                </label>
                <Field name="subcategoria">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="subcategoria"
                        instanceId="subcategoria"
                        placeholder="Inserte subcategoria de actuacion"
                        options={props.subcategorias}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.subcategorias.filter(
                                (item: any) =>
                                  item.value == props.initValue.subcategoria,
                              )[0]
                            : []
                        }
                        styles={customStyleSelect(
                          errors.subcategoria && touched.subcategoria,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.subcategoria && touched.subcategoria
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="subcategoria"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="especialidad"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Especialidad de actuacion
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
                        {...field}
                        id="especialidad"
                        instanceId="especialidad"
                        placeholder="Inserte especialidad de actuacion"
                        options={props.especialidades.filter(
                          (item: any) =>
                            item.mtActionSubCategoryId ==
                            values['subcategoria'],
                        )}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.especialidades.filter(
                                (item: any) =>
                                  item.value === props.initValue.especialidad,
                              )[0]
                            : []
                        }
                        styles={customStyleSelect(
                          errors.especialidad && touched.especialidad,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.especialidad && touched.especialidad
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="especialidad"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="padre"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Padre
              </label>

              <Field name="padre">
                {({
                  field, // { name, value, onChange, onBlur }
                  value,
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }: any) => (
                  <>
                    <div className="mb-2 w-1/2">
                      <Select
                        {...field}
                        id="padre"
                        instanceId="padre"
                        placeholder="Seleccione elemento padre"
                        // options={props.padres}
                        options={props.padres
                          .filter((item: any) =>
                            props.initValue != null
                              ? item['mtSpecialtyActionId'] ==
                                  values['especialidad'] &&
                                item['value'] != props.initValue.id
                              : item['mtSpecialtyActionId'] ==
                                values['especialidad'],
                          )
                          .concat([
                            {
                              label: 'Sin padre',
                              value: 0,
                              mtSpecialtyActionId: 0,
                            },
                          ])}
                        value={props.padres.filter(
                          (item: any) => item.value === values['padre'],
                        )}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.padres.filter(
                                (item: any) =>
                                  item.value == props.initValue.padre,
                              )[0]
                            : []
                        }
                        styles={customStyleSelect(
                          errors.padre && touched.padre,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.padre && touched.padre
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                    <div>
                      <SubespecialidadesNiveles
                        especialidad={values['especialidad']}
                        nodoSelected={''}
                        onChange={(sub: any) =>
                          setFieldValue(field.name, sub.value)
                        }
                      />
                    </div>
                  </>
                )}
              </Field>
              <ErrorMessage
                name="padre"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-500"
              />
            </div>

            <div className="mt-8 text-center">
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

export default IndicadorSubEspecialidadForm
