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
import { cn } from '@/lib/utils'

interface FormValues {
  id: string
  codigoEntronque: string
  nombreEntronque: string
}

interface FormProps {
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
  codigoEntronque: '',
  nombreEntronque: '',
}

const SchemaForm = Yup.object().shape({
  // udObraSimple: Yup.string().trim().min(1, 'Demasiado corto!').max(70, 'Demasiado largo!').required('Requerido'),
  nombreEntronque: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),

  codigoEntronque: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
})

function CatalogoEntronqueForm(props: FormProps) {
  const router = useRouter()

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
                htmlFor="nombreEntronque"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Agregue nombre de entronque
              </label>
              <Field
                disabled={disabled}
                name="nombreEntronque"
                className={cn(
                  'block w-full rounded-lg border p-2.5 text-sm',
                  errors.nombreEntronque && touched.nombreEntronque
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
              <ErrorMessage
                name="nombreEntronque"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="codigoEntronque"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Codigo de entronque
                </label>
                <Field
                  disabled={disabled}
                  name="codigoEntronque"
                  className={cn(
                    'block w-full rounded-lg border p-2.5 text-sm',
                    errors.codigoEntronque && touched.codigoEntronque
                      ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                      : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
                <ErrorMessage
                  name="codigoEntronque"
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

export default CatalogoEntronqueForm
