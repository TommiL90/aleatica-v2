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
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'
import { cn } from '@/lib/utils'

// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  oldPassword: string
  passwordNew: string
}

interface FormProps {
  buttonText: string
  onSubmit: Function
  admin: boolean
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  oldPassword: '',
  passwordNew: '',
}

const getCharacterValidationError = (str: string) => {
  return `Tu contrasenna debe tener al menos 1 ${str}`
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SchemaFormUser = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters')
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError('digito'))
    .matches(/[a-z]/, getCharacterValidationError('minuscula'))
    .matches(/[A-Z]/, getCharacterValidationError('mayuscula')),

  passwordNew: Yup.string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters')
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError('digito'))
    .matches(/[a-z]/, getCharacterValidationError('minuscula'))
    .matches(/[A-Z]/, getCharacterValidationError('mayuscula')),
})

const SchemaFormAdmin = Yup.object().shape({
  passwordNew: Yup.string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters')
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError('digito'))
    .matches(/[a-z]/, getCharacterValidationError('minuscula'))
    .matches(/[A-Z]/, getCharacterValidationError('mayuscula')),
})

function ChangePasswordForm(props: FormProps) {
  const [disabled, setDisabled] = useState(false)

  const handleOnSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    submitEnquiryForm({ ...values })

    formikHelpers.resetForm()
    values['oldPassword'] = ''
    values['passwordNew'] = ''
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
        initialValues={initialValues}
        validationSchema={props.admin ? SchemaFormAdmin : SchemaFormUser}
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
            {props.admin === false && (
              <div className="mb-6">
                <label
                  htmlFor="oldPassword"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contrasena vieja
                </label>
                <Field name="oldPassword">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <input
                      {...field}
                      type="password"
                      disabled={props.admin}
                      value={values['oldPassword']}
                      onChange={(evt: any) =>
                        setFieldValue(field.name, evt.target.value)
                      }
                      className={cn(
                        'block w-full rounded-lg border text-sm',
                        errors.passwordOld && touched.passwordOld
                          ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                          : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                      )}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="passwordNew"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contrasenna nueva
              </label>
              <Field name="passwordNew">
                {({
                  field, // { name, value, onChange, onBlur }
                  value,
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }: any) => (
                  <input
                    {...field}
                    type="password"
                    value={values['passwordNew']}
                    onChange={(evt: any) =>
                      setFieldValue(field.name, evt.target.value)
                    }
                    className={cn(
                      'block w-full rounded-lg border text-sm',
                      errors.passwordNew && touched.passwordNew
                        ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                        : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    )}
                  />
                )}
              </Field>
              <ErrorMessage
                name="passwordNew"
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

export default ChangePasswordForm
