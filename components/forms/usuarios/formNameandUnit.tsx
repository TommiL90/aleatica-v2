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
import 'react-phone-number-input/style.css'
import { cn } from '@/lib/utils'

// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  id: string
  nombre: string
  unidadNegocio: any
}

interface FormProps {
  units: any[]
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
  unidadNegocio: null,
}

const SchemaForm = Yup.object().shape({
  nombre: Yup.string()
    .trim()
    .min(8, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  unidadNegocio: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .required('Requerido'),
})

function NameandUnitForm(props: FormProps) {
  console.log(props.units)
  // console.log(props.initValue.unidadNegocio)

  const [disabled, setDisabled] = useState(false)

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    submitEnquiryForm({ ...values })

    formikHelpers.resetForm()
    values['unidadNegocio'] = ''
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
                        setFieldValue(field.name, option ? option.value : null)
                      }
                      defaultValue={
                        props.initValue != null
                          ? props.units.filter(
                              (item: any) =>
                                item.value === props.initValue.unidadNegocio,
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
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre
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

export default NameandUnitForm
