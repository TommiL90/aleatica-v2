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
import Select from 'react-select'
import { cn } from '@/lib/utils'

interface FormValues {
  codigoDeterioro: string
  nombreDeterioro: string
  especialidad: any
  subCategoria: any
}

interface FormProps {
  subCategoria: any
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
  codigoDeterioro: '',
  nombreDeterioro: '',
  especialidad: null,
  subCategoria: null,
}

const SchemaForm = Yup.object().shape({
  // udObraSimple: Yup.string().trim().min(1, 'Demasiado corto!').max(70, 'Demasiado largo!').required('Requerido'),
  codigoDeterioro: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  nombreDeterioro: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  subCategoria: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
  especialidad: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
})

function RepoDeterioroForm(props: FormProps) {
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
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="subCategoria"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Subcategoría
                </label>

                <Field name="subCategoria">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="subCategoria"
                        instanceId="subcategoria"
                        placeholder="Inserte subcategoria"
                        options={props.subCategoria}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.subCategoria.filter(
                                (item: any) =>
                                  item.value == props.initValue.subCategoria,
                              )[0]
                            : []
                        }
                        styles={customStyleSelect(
                          errors.subCategoria && touched.subCategoria,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.subCategoria && touched.subCategoria
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="subCategoria"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
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
                        {...field}
                        id="especialidad"
                        instanceId="especialidad"
                        placeholder="Inserte especialidad"
                        value={value}
                        // options={props.especialidad}
                        options={props.especialidad.filter(
                          (item: any) =>
                            item['mtActionSubCategoryId'] ==
                            values['subCategoria'],
                        )}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.especialidad.filter(
                                (item: any) =>
                                  item.value == props.initValue.especialidad &&
                                  item.mtActionSubCategoryId ==
                                    props.initValue.subCategoria,
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
                htmlFor="nombreDeterioro"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de deterioro
              </label>
              <Field
                disabled={disabled}
                name="nombreDeterioro"
                className={cn(
                  'block w-full rounded-lg border p-2.5 text-sm',
                  errors.nombreDeterioro && touched.nombreDeterioro
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
              <ErrorMessage
                name="nombreDeterioro"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-500"
              />
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="mb-6">
                <label
                  htmlFor="codigoDeterioro"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Codigo de deterioro
                </label>
                <Field
                  disabled={disabled}
                  name="codigoDeterioro"
                  className={cn(
                    'block w-full rounded-lg border p-2.5 text-sm',
                    errors.codigoDeterioro && touched.codigoDeterioro
                      ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                      : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
                <ErrorMessage
                  name="codigoDeterioro"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
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

export default RepoDeterioroForm
