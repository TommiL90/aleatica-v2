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
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { FaRegFile, FaRegTrashAlt } from 'react-icons/fa'

interface FormValues {
  mediciones: any[]
}

interface FormProps {
  unidadNegocio: string
  especialidad: string
  redirectPath: string
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  mediciones: [],
}

const formatCreateLabel = (inputValue: string) =>
  `Crear nueva entrada... "${inputValue}"`

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
]

const SchemaForm = Yup.object().shape({
  subEspecialidades: Yup.array().min(
    1,
    'Debe seleccionar al menos una subespecialidad.',
  ),
})

function MedicionesUDSimplesForm(props: FormProps) {
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
    let toastId
    try {
      setDisabled(true)
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      if (typeof props.onSubmit === 'function') {
        await props.onSubmit(values)
      }
      toast.success('Enviado con éxito 🙌', { id: toastId })
      // Redirect user
      if (props.redirectPath) {
        router.push(props.redirectPath)
      }
    } catch (e) {
      toast.error('No se puede enviar 😱', { id: toastId })
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
            <div>
              <Field name="mediciones">
                {({
                  field, // { name, value, onChange, onBlur }
                  value,
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }: any) => (
                  <Mediciones
                    errors={errors}
                    udsimples={values.mediciones}
                    onChange={(value: any) => setFieldValue(field.name, value)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="mediciones"
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

export default MedicionesUDSimplesForm

const udsimplesOptions = [
  { nombre: 'Unidad Simple #1', codigo: 'US.PF.PA.MC.0020', unidad: 'm' },
  { nombre: 'Unidad Simple #2', codigo: 'US.PF.PA.MC.0021', unidad: 'm' },
  { nombre: 'Unidad Simple #3', codigo: 'US.PF.PA.MC.0022', unidad: 'm' },
  { nombre: 'Unidad Simple #4', codigo: 'US.PF.PA.MC.0023', unidad: 'm' },
  { nombre: 'Unidad Simple #5', codigo: 'US.PF.PA.MC.0024', unidad: 'm' },
]

interface MedicionesProps {
  udsimples: any[]
  errors: any
  onChange: Function
}

const ids: string[] = []

export function Mediciones(props: MedicionesProps) {
  const [currentSelectValue, setCurrentSelectValue] = useState(null)
  const [currentMedicion, setCurrentMedicion] = useState(0)
  const [currentUnidad, setCurrentUnidad] = useState('-')
  const [currentCodigo, setCurrentCodigo] = useState('')
  const [items, setItems] = useState(props.udsimples)

  const [_document, set_document] = useState<Document>()
  useEffect(() => {
    set_document(document)
  }, [])

  const newId = useId()

  for (let i = 0; i < props.udsimples.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: any) => {
    e.preventDefault()
    const { value } = e.target
    if (id == 0) {
      setCurrentMedicion(Number(value))
    }
  }

  const handleSelectChange = (newValue: any, id: any) => {
    const { value } = newValue
    setCurrentSelectValue(newValue)

    const item = udsimplesOptions.filter(
      (item) => item.codigo == newValue.value,
    )[0]
    setCurrentUnidad(item.unidad)
    setCurrentCodigo(item.codigo)
  }

  const handleAgregarMedicion = (e: any, id: any) => {
    if (currentMedicion == 0 || currentSelectValue == null) {
      return
    }
    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        nombre: currentSelectValue['label'],
        codigo: currentSelectValue['value'],
        medicion: currentMedicion,
      },
    ]

    setItems(list)
    setCurrentSelectValue(null)
    setCurrentMedicion(0)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const handleEliminarMedicion = (e: any, id: number) => {
    if (id == 0) {
      return
    }

    const list: any = items.filter((item) => item['id'] != id)
    setItems(list)

    if (typeof props.onChange === 'function') {
      props.onChange(list)
    }
  }

  const EmptyInputs = (
    <tr
      key="fixed-key-for-dont-have-problem-with-focus"
      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="w-64 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
        style={{ minWidth: '256px' }}
      >
        <Select
          id="newEntry"
          instanceId={newId}
          placeholder="Inserte unidad simples"
          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          options={udsimplesOptions.map((item: any) => ({
            label: `${item['nombre']}`,
            value: item['codigo'],
          }))}
          value={currentSelectValue}
          onChange={(newValue) => handleSelectChange(newValue, 0)}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, color: 'black' }),
          }}
          menuPortalTarget={_document?.body}
          menuPlacement="auto"
        />
      </th>
      <td className="w-52 px-6 py-4 ">
        <input
          key="fixed-key-for-dont-have-problem-with-focus"
          type="number"
          value={currentMedicion}
          onChange={(e) => handleInputChange(e, 0)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </td>
      <td className="w-52 px-6 py-4 ">{currentUnidad}</td>
      <td className="w-52 px-6 py-4 " style={{ minWidth: '256px' }}>
        {currentCodigo}
      </td>
      <td className="w-4 p-3 text-right">
        <button
          type="button"
          onClick={(e) => handleAgregarMedicion(e, 0)}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          <FaRegFile />
        </button>
      </td>
      <td className="w-4 p-3 text-right">
        <button
          type="button"
          onClick={(e) => handleEliminarMedicion(e, 0)}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  )

  return (
    <div className="mb-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead
            className={cn(
              'text-xs uppercase text-gray-700',
              props.errors.subEspecialidades
                ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
            )}
          >
            <tr>
              <th scope="col" className="w-64 px-6 py-3">
                Unidad simple
              </th>
              <th scope="col" className="w-52 px-6 py-3">
                Medicion
              </th>
              <th scope="col" className="w-52 px-6 py-3">
                Unidad de medida
              </th>
              <th scope="col" className="w-52 px-6 py-3">
                Codigo de unidad
              </th>
              <th scope="col" className="w-4 p-3">
                <span className="sr-only">Agregar</span>
              </th>
              <th scope="col" className="w-4 p-3">
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length == 0
              ? EmptyInputs
              : items
                  .map((item, index) => (
                    <tr
                      key={item['id']}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="w-64 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        style={{ minWidth: '256px' }}
                      >
                        <Select
                          key={item['id']}
                          isDisabled={true}
                          id={item['id']}
                          instanceId={item['id']}
                          placeholder="Inserte subespecialidad"
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          options={udsimplesOptions.map((item: any) => ({
                            label: `${item['nombre']}`,
                            value: item['codigo'],
                          }))}
                          value={
                            udsimplesOptions
                              .filter((ele) => ele.codigo == item['codigo'])
                              .map((item) => ({
                                label: item.nombre,
                                value: item.codigo,
                              }))[0]
                          }
                          onChange={(newValue) =>
                            handleSelectChange(newValue, item['id'])
                          }
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                        />
                      </th>
                      <td className="w-52 px-6 py-4 ">
                        <input
                          key={item['id']}
                          disabled={true}
                          type="number"
                          value={item['medicion']}
                          onChange={(e) => handleInputChange(e, item['id'])}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                        />
                      </td>
                      <td className="w-52 px-6 py-4">
                        {
                          udsimplesOptions.filter(
                            (ele) => ele.codigo == item['codigo'],
                          )[0]['unidad']
                        }
                      </td>
                      <td
                        className="w-52 px-6 py-4 "
                        style={{ minWidth: '256px' }}
                      >
                        {item['codigo']}
                      </td>
                      <td className="w-4 p-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleAgregarMedicion(e, item['id'])}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          <FaRegFile />
                        </button>
                      </td>
                      <td className="w-4 p-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => handleEliminarMedicion(e, item['id'])}
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                  .concat(EmptyInputs)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
