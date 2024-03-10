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
  id: string
  fullname: string
  username: string
  password: string
  confirmPassword: string
  phone: string
  officePhone: string
  email: string
  unidadNegocio: any
  departamento: any
  cargo: any
  roles: any[]
}

interface FormProps {
  units: any[]
  departamentos: any[]
  cargos: any[]
  roles: any[]
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
  fullname: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  officePhone: '',
  email: '',
  unidadNegocio: null,
  departamento: null,
  cargo: null,
  roles: [],
}

const getCharacterValidationError = (str: string) => {
  return `Tu contrasenna debe tener al menos 1 ${str}`
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function CreateForm(props: FormProps) {
  const [disabled, setDisabled] = useState(false)

  const SchemaForm =
    props.initValue == null
      ? Yup.object().shape({
          fullname: Yup.string()
            .trim()
            .min(8, 'Demasiado corto!')
            .max(80, 'Demasiado largo!')
            .required('Requerido'),
          username: Yup.string()
            .trim()
            .min(8, 'Demasiado corto!')
            .max(20, 'Demasiado largo!')
            .required('Requerido'),
          password: Yup.string()
            .required('Please enter a password')
            // check minimum characters
            .min(8, 'Password must have at least 8 characters')
            // different error messages for different requirements
            .matches(/[0-9]/, getCharacterValidationError('digito'))
            .matches(/[a-z]/, getCharacterValidationError('minuscula'))
            .matches(/[A-Z]/, getCharacterValidationError('mayuscula')),
          confirmPassword: Yup.string().test(
            'passwords-match',
            'Contrasennas no coincide',
            function (value) {
              return this.parent.password === value
            },
          ),
          phone: Yup.string().required('Requerido'), // matches(phoneRegExp, 'Telefono no valido')
          officePhone: Yup.string().required('Requerido'),
          email: Yup.string().email('Correo no valido'),
          unidadNegocio: Yup.string()
            .trim()
            .min(2, 'Demasiado corto!')
            .required('Requerido'),
          // permisos: Yup.string().trim().min(8, 'Demasiado corto!').max(20, 'Demasiado largo!').required('Requerido'),
        })
      : Yup.object().shape({
          fullname: Yup.string()
            .trim()
            .min(8, 'Demasiado corto!')
            .max(80, 'Demasiado largo!')
            .required('Requerido'),
          username: Yup.string()
            .trim()
            .min(8, 'Demasiado corto!')
            .max(20, 'Demasiado largo!')
            .required('Requerido'),
          phone: Yup.string().required('Requerido'), // matches(phoneRegExp, 'Telefono no valido')
          officePhone: Yup.string().required('Requerido'),
          email: Yup.string().email('Correo no valido'),
          unidadNegocio: Yup.string()
            .trim()
            .min(2, 'Demasiado corto!')
            .required('Requerido'),
          // permisos: Yup.string().trim().min(8, 'Demasiado corto!').max(20, 'Demasiado largo!').required('Requerido'),
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
                  htmlFor="fullname"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre completo
                </label>
                <Field
                  disabled={disabled}
                  name="fullname"
                  className={cn(
                    'block w-full rounded-lg border p-2.5 text-sm',
                    errors.fullname && touched.fullname
                      ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                      : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre de usuario
                </label>
                <Field
                  disabled={disabled}
                  name="username"
                  className={cn(
                    'block w-full rounded-lg border p-2.5 text-sm',
                    errors.username && touched.username
                      ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                      : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              {props.initValue !== null ? null : (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contrasena
                    </label>
                    <Field name="password">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="password"
                          value={values['password']}
                          onChange={(evt: any) =>
                            setFieldValue(field.name, evt.target.value)
                          }
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.password && touched.password
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirmar contrasenna{' '}
                    </label>
                    <Field name="confirmPassword">
                      {({
                        field, // { name, value, onChange, onBlur }
                        value,
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                      }: any) => (
                        <input
                          {...field}
                          type="password"
                          value={values['confirmPassword']}
                          onChange={(evt: any) =>
                            setFieldValue(field.name, evt.target.value)
                          }
                          className={cn(
                            'block w-full rounded-lg border text-sm',
                            errors.confirmPassword && touched.confirmPassword
                              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                              : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                          )}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="mt-1 text-sm text-red-600 dark:text-red-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Telefono
                </label>
                <Field name="phone">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    // <input
                    //   {...field}
                    //   type="text"
                    //   value={props.initValue != null ? values['phone'] : value}
                    //   onChange={(evt: any) => setFieldValue(field.name, evt.target.value)}
                    //   className={cn(
                    //     'border text-sm rounded-lg block w-full',
                    //     errors.phone && touched.phone
                    //       ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                    //       : 'bg-white text-gray-900 border-gray-300 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    //   )}
                    // />

                    <PhoneInput
                      {...field}
                      placeholder=""
                      value={values['phone']}
                      onChange={(value) => {
                        if (value)
                          values['phone'] = formatPhoneNumberIntl(value)
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="officePhone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Telefono oficina
                </label>
                <Field name="officePhone">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <PhoneInput
                      {...field}
                      placeholder=""
                      value={values['officePhone']}
                      onChange={(value) => {
                        if (value)
                          values['officePhone'] = formatPhoneNumberIntl(value)
                      }}
                      className="rounded-sm"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="officePhone"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo electronico
                </label>
                <Field
                  disabled={disabled}
                  name="email"
                  type="email"
                  className={cn(
                    'block w-full rounded-lg border p-2.5 text-sm',
                    errors.email && touched.email
                      ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                      : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
                <ErrorMessage
                  name="email"
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
                                  item.value == props.initValue.unidadNegocio,
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
                  htmlFor="departamento"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Departamento
                </label>
                <Field name="departamento">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="departamento"
                        instanceId={'departamento'}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menuList: (base) => ({ ...base, color: 'black' }),
                        }}
                        options={props.departamentos.filter(
                          (item: any) =>
                            item.unidadNegocio ===
                            Number(values['unidadNegocio']),
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
                            ? props.departamentos.filter(
                                (item: any) =>
                                  item['value'] ==
                                    props.initValue.departamento &&
                                  item['unidadNegocio'] ==
                                    props.initValue.unidadNegocio,
                              )[0]
                            : null
                        }
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <label
                  htmlFor="cargo"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cargo
                </label>
                <Field name="cargo">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="cargo"
                        instanceId={'cargo'}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          menuList: (base) => ({ ...base, color: 'black' }),
                        }}
                        options={props.cargos.filter(
                          (item: any) =>
                            item.unidadNegocio ===
                            Number(values['unidadNegocio']),
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
                            ? props.cargos.filter(
                                (item: any) =>
                                  item['value'] == props.initValue.cargo &&
                                  item['unidadNegocio'] ==
                                    props.initValue.unidadNegocio,
                              )[0]
                            : null
                        }
                      />
                    </div>
                  )}
                </Field>
              </div>

              <div>
                <label
                  htmlFor="roles"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Roles
                </label>
                <Field name="roles">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        id="roles"
                        isMulti
                        isSearchable
                        options={props.roles}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(field.name, option || null)
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.roles.filter((item: any) =>
                                props.initValue.roles.includes(item.value),
                              )
                            : []
                        }
                      />
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

export default CreateForm
