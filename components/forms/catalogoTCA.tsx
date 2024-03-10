import React, {
  useState,
  useCallback,
  ChangeEvent,
  useId,
  useEffect,
  useMemo,
} from 'react'
import * as Yup from 'yup'
import Select from 'react-select'
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
import { cn } from '@/lib/utils'

interface FormValues {
  unidadNegocio: any
  tramo: any
  entronque: any
  // carril: any;
  gaza: any
  nombre: string
  descripcionTCA: string
  cadenamientoInicial: number
  cadenamientoFinal: number
}

interface FormProps {
  unidadNegocio: any[]
  tramos: any[]
  entronques: any[]
  gazas: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

const initialValues: FormValues = {
  unidadNegocio: null,
  tramo: null,
  entronque: null,
  // carril: null,
  gaza: null,
  nombre: '',
  descripcionTCA: '',
  cadenamientoInicial: 0,
  cadenamientoFinal: 0,
}

const SchemaForm = Yup.object().shape({
  unidadNegocio: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  nombre: Yup.string()
    .trim()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  descripcionTCA: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  tramo: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
  entronque: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),

  gaza: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
  cadenamientoInicial: Yup.number().required('Requerido'),
  cadenamientoFinal: Yup.number().required('Requerido'),
})

function CatalogoTCA(props: FormProps) {
  const [disabled, setDisabled] = useState(false)

  const unitId = useId()
  const tramoId = useId()
  const entronqueId = useId()
  const gazaId = useId()

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
            <div className="mb-6">
              <label
                htmlFor="descripcionTCA"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripción del TCA:
              </label>
              <Field
                disabled={disabled}
                as="textarea"
                rows={4}
                name="descripcionTCA"
                className={cn(
                  'block w-full rounded-lg border p-2.5 text-sm',
                  errors.descripcionTCA && touched.descripcionTCA
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
              <ErrorMessage
                name="descripcionTCA"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
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
                        id="unidadNegocio"
                        placeholder="Seleccione unidad de negocio"
                        instanceId={unitId}
                        options={props.unidadNegocio}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.unidadNegocio.filter(
                                (item: any) =>
                                  item['value'] ===
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
                  htmlFor="tramo"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tramo
                </label>
                <Field name="tramo">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="tramo"
                        placeholder="Seleccionar tramo"
                        instanceId={tramoId}
                        options={props.tramos.filter(
                          (item: any) =>
                            item.unidadNEgocio === values['unidadNegocio'],
                        )}
                        value={value}
                        onChange={(option: any) => {
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }}
                        defaultValue={
                          props.initValue != null
                            ? props.tramos.filter(
                                (item: any) =>
                                  item['value'] == props.initValue.tramo,
                              )[0]
                            : null
                        }
                        styles={customStyleSelect(
                          errors.tramo && touched.tramo,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.tramo && touched.tramo
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="tramo"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="entronque"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Entronque
                </label>
                <Field name="entronque">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="entronque"
                        placeholder="Seleccionar entronque"
                        instanceId={entronqueId}
                        // options={props.entronques}
                        options={
                          props.tramos.filter(
                            (item: any) => item.value === values['tramo'],
                          ).length > 0
                            ? props.tramos.filter(
                                (item: any) => item.value === values['tramo'],
                              )[0].entronques
                            : []
                        }
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.entronques.filter(
                                (item: any) =>
                                  item['value'] == props.initValue.entronque,
                              )[0]
                            : null
                        }
                        styles={customStyleSelect(
                          errors.entronque && touched.entronque,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.entronque && touched.entronque
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="entronque"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              {/* <div>
                      <label htmlFor="carril" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Carril</label>
                      <Field name="carril">
                        {({
                          field, // { name, value, onChange, onBlur }
                          value,
                          form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }: any) => (
                          <div>
                            <Select
                             {...field}
                             id='carril'
                             placeholder="Seleccionar carril"
                             instanceId={carrilId} 
                             options={carrilIndicadores.map((item: any) => ({label: `${item['nombre']} (${item['codigo']})`, value: item['codigo']}))}
                             value={value}

                             onChange={(option: any) => setFieldValue(field.name, option ? option.value : null)}

                             defaultValue={ props.initValue != null ?
                              carrilIndicadores.filter((item: any) => item['codigo'] == props.initValue.carril).map((item: any) => ({
                                label: `${item['nombre']} (${item['codigo']})`,
                                value: item['codigo']
                              }))[0]
                              : null
                            }
                        
                              styles={customStyleSelect(errors.carril && touched.carril)}

                              className={cn(
                                'border text-sm rounded-lg block w-full',
                                errors.carril && touched.carril
                                  ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                                  : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                              )} 
                            />
                            
                          </div>
                        )}
                      </Field>
                      <ErrorMessage name="carril" component="div" className="mt-1 text-sm text-red-600 dark:text-red-500"/>
                    </div> */}
              <div>
                <label
                  htmlFor="gaza"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gaza
                </label>
                <Field name="gaza">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="gaza"
                        placeholder="Seleccionar gaza"
                        instanceId={gazaId}
                        options={
                          props.tramos.filter(
                            (item: any) => item.value === values['tramo'],
                          ).length > 0
                            ? props.tramos
                                .filter(
                                  (item: any) => item.value === values['tramo'],
                                )[0]
                                .entronques.filter(
                                  (entronque: any) =>
                                    entronque.value === values['entronque'],
                                ).length > 0
                              ? props.tramos
                                  .filter(
                                    (item: any) =>
                                      item.value === values['tramo'],
                                  )[0]
                                  .entronques.filter(
                                    (entronque: any) =>
                                      entronque.value === values['entronque'],
                                  )[0].gazas
                              : []
                            : []
                        }
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.gazas.filter(
                                (item: any) =>
                                  item['value'] == props.initValue.gaza,
                              )[0]
                            : null
                        }
                        styles={customStyleSelect(errors.gaza && touched.gaza)}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.gaza && touched.gaza
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="gaza"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="cadenamientoInicial"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cadenamiento Inicial
                </label>
                <Field name="cadenamientoInicial">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <input
                        id="cadenamientoInicial"
                        type="number"
                        value={values['cadenamientoInicial']}
                        onChange={(evt: any) =>
                          setFieldValue(field.name, evt.target.valueAsNumber)
                        }
                        className="block w-full rounded-sm border border-gray-300 px-2.5 py-2 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="cadenamientoInicial"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="cadenamientoFinal"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cadenamiento Final
                </label>
                <Field name="cadenamientoFinal">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <input
                        id="cadenamientoFinal"
                        type="number"
                        value={values['cadenamientoFinal']}
                        onChange={(evt: any) =>
                          setFieldValue(field.name, evt.target.valueAsNumber)
                        }
                        className="block w-full rounded-sm border border-gray-300 px-2.5 py-2 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="cadenamientoFinal"
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

export default CatalogoTCA
