import React, { useState, ChangeEvent, useId, useEffect } from 'react'
import * as Yup from 'yup'
import {
  FormikProps,
  Form,
  Field,
  ErrorMessage,
  Formik,
  FormikHelpers,
} from 'formik'

import Select, { StylesConfig } from 'react-select'

import { FaEdit, FaRegTrashAlt, FaRegFile } from 'react-icons/fa'
import { useStateCallback } from '@/hooks/useStateCallback'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  nombreProyecto: string
  descripcionProyecto: string
  unidadNegocio: string
  year: any
  responsables: any[]
  tareas: any[]
}

interface FormProps {
  units: any[]
  years: any[]
  users: any[]
  subcategorias: any[]
  especialidades: any[]
  processForms: any[]
  buttonText: string
  initValue: any
  onSubmit: Function
}

interface Option {
  label: string
  value: any
}

const initialValues: FormValues = {
  nombreProyecto: '',
  descripcionProyecto: '',
  unidadNegocio: '',
  year: null,
  tareas: [],
  responsables: [],
}

const SchemaForm = Yup.object().shape({
  nombreProyecto: Yup.string()
    .trim()
    .min(2, 'Demasiado corto')
    .max(80, 'Demasiado largo!')
    .required('Requerido'),
  descripcionProyecto: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(400, 'Demasiado largo!')
    .required('Requerido'),
  unidadNegocio: Yup.string()
    .trim()
    .min(1, 'Demasiado corto!')
    .max(70, 'Demasiado largo!')
    .required('Requerido'),
  year: Yup.string().trim().required('Requerido'),
  responsables: Yup.array().min(1, 'Debe agregar al menos un responsable.'),
  tareas: Yup.array().min(1, 'Debe agregar al menos una tarea.'),
})

function ProyectoForm(props: FormProps) {
  const [disabled, setDisabled] = useState(false)
  const [modalTareas, setModalTareas] = useState(false)

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
                htmlFor="nombreProyecto"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Agregue nombre del proyecto
              </label>
              <Field
                disabled={disabled}
                name="nombreProyecto"
                className={cn(
                  'block w-full rounded-lg border p-2.5 text-sm',
                  errors.nombreProyecto && touched.nombreProyecto
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
              <ErrorMessage
                name="nombreProyecto"
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="descripcionProyecto"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripción del proyecto:
              </label>
              <Field
                disabled={disabled}
                as="textarea"
                rows={4}
                name="descripcionProyecto"
                className={cn(
                  'block w-full rounded-lg border p-2.5 text-sm',
                  errors.descripcionProyecto && touched.descripcionProyecto
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
              <ErrorMessage
                name="descripcionProyecto"
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
                  Unidad de negocio
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
                <ErrorMessage
                  name="unidadNegocio"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Año
                </label>
                <Field name="year">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="year"
                        placeholder="Seleccionar año"
                        instanceId="year"
                        options={props.years}
                        value={value}
                        onChange={(option: any) =>
                          setFieldValue(
                            field.name,
                            option ? option.value : null,
                          )
                        }
                        defaultValue={
                          props.initValue != null
                            ? props.years.filter(
                                (item: any) =>
                                  item.value == props.initValue.year,
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
                  name="year"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="responsables"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Responsables de proyecto
                </label>

                <Field name="responsables">
                  {({
                    field, // { name, value, onChange, onBlur }
                    value,
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }: any) => (
                    <div>
                      <Select
                        {...field}
                        id="responsables"
                        isMulti
                        placeholder="Seleccionar responsables"
                        instanceId="responsables"
                        options={props.users}
                        value={values['responsables']}
                        onChange={(option: any) => {
                          setFieldValue(field.name, option)
                        }}
                        defaultValue={
                          props.initValue != null ? props.initValue.users : []
                        }
                        styles={customStyleSelect(
                          errors.responsables && touched.responsables,
                        )}
                        className={cn(
                          'block w-full rounded-lg border text-sm',
                          errors.responsables && touched.responsables
                            ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                            : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                        )}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="responsables"
                  component="div"
                  className="mt-1 text-sm text-red-600 dark:text-red-500"
                />
              </div>
            </div>

            <div>
              <Field name="tareas">
                {({
                  field, // { name, value, onChange, onBlur }
                  value,
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }: any) => (
                  <>
                    <button
                      id="task"
                      onClick={() => setModalTareas(!modalTareas)}
                      className={cn(
                        'mb-2 mr-2 flex  items-center rounded-lg border px-5 py-2.5 text-sm font-medium focus:outline-none',
                        values.tareas.length > 0
                          ? 'border-gray-200 bg-white  text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                          : 'dark:focus:red-gray-700  border-red-200  bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white',
                      )}
                      type="button"
                    >
                      <FaEdit className="mr-2" />
                      <span className="mr-auto">Administrar tareas</span>
                      <span
                        className={cn(
                          'float-right ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold',
                          values.tareas.length > 0
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-red-300 text-red-800',
                        )}
                      >
                        {props.initValue != null
                          ? props.initValue.tareas.length
                          : values.tareas.length}
                      </span>
                    </button>
                    {modalTareas ? (
                      <Modal
                        taskList={
                          props.initValue != null
                            ? props.initValue.tareas
                            : values.tareas
                        }
                        users={props.users}
                        processForms={props.processForms}
                        subcategorias={props.subcategorias}
                        especialidades={props.especialidades}
                        onTask={(value: any) => {
                          // values['tareas'] = value;
                          setFieldValue(field.name, value)
                          console.log(value)
                        }}
                        onClose={() => setModalTareas(!modalTareas)}
                      />
                    ) : null}
                  </>

                  //
                )}
              </Field>
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

export default ProyectoForm

interface TareasProps {
  taskList: any[]
  users: any[]
  processForms: any[]
  subcategorias: any[]
  especialidades: any[]
  errors: any
  onChange: Function
}

const ids: string[] = []

const generarFecha = (fechaInicio: string, dias: number) => {
  // Convertir la fecha de inicio a un objeto Date de JavaScript
  const fecha = new Date(fechaInicio)

  // Añadir 15 días a la fecha de inicio
  fecha.setDate(fecha.getDate() + dias)

  // Devolver la nueva fecha
  return fecha
}

const dateStr = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

const colourStyles: StylesConfig<any> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: 'yellow',
      color: 'red',
    }
  },
  // input: (styles) => ({ ...styles, ...dot() }),
  // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}

const formatedDate = (fecha: Date): string => {
  const date = new Date(fecha)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

const calcularDiferenciaDias = (fecha1: string, fecha2: string): string => {
  if (fecha1 == '' || fecha2 == '') {
    return '-'
  }

  const fechaInicio = new Date(fecha1)
  const fechaFin = new Date(fecha2)

  const diferenciaMilisegundos = fechaFin.getTime() - fechaInicio.getTime()
  const diferenciaDias = Math.abs(
    diferenciaMilisegundos / (1000 * 60 * 60 * 24),
  )

  return fechaFin > fechaInicio ? diferenciaDias.toString() : '0'
}

const Fecha2MayorFecha1 = (fecha1: string, fecha2: string) => {
  // Convertir las fechas a objetos Date de JavaScript
  const date1 = new Date(fecha1)
  const date2 = new Date(fecha2)

  return date2 > date1
}

// Verifica que cada fecha en las tareas es correcto fecha final mayor que fecha 1
const validateTaskDateEndOk = (taskList: any) => {
  let toastId
  for (let i = 0; i < taskList.tasks.length; i++) {
    const fecha1 = taskList.tasks[i].fechaInicio.split('T')[0]
    const fecha2 = taskList.tasks[i].fechaFinal.split('T')[0]

    if (!Fecha2MayorFecha1(fecha1, fecha2)) {
      toast.error(
        `En ${taskList.tasks[i].name} la fecha de inicio es mayor que la final 😱`,
        { id: toastId },
      )
      break
      return false
    }
  }

  return true
}

// Verifica que cada fecha entre tareas es correcto. Ej: fecha de inicio de ud simples no puede ser menor que la de finalizacion de deterioros
const validateTaskDeadlineOk = (taskList: any) => {
  let toastId

  for (let i = 0; i < taskList.tasks.length - 1; i++) {
    const task1 = taskList.tasks[i]
    const task2 = taskList.tasks[i + 1]

    const task1FechaFinal = task1.fechaFinal.split('T')[0]
    const task2FechaInicio = task2.fechaInicio.split('T')[0]

    if (!Fecha2MayorFecha1(task1FechaFinal, task2FechaInicio)) {
      toast.error(
        `La fecha final de ${task1.name} es mayor que la fecha de inicio de ${task2.name} 😱`,
        { id: toastId },
      )
      break
      return false
    }
  }

  return true
}

interface Option {
  label: string
  value: any
}

export function Tareas(props: TareasProps) {
  const [_document, set_document] = useState<Document>()

  const [currentSubcategoria, setCurrentSubcategoria] = useState(null)
  const [currentEspecialidad, setCurrentEspecialidad] = useStateCallback(null)
  const [currentFechaInicio, setFechaInicio] = useState(dateStr(new Date()))
  const [currentFechaFinal, setFechaFinal] = useState(
    dateStr(generarFecha(currentFechaInicio, 15)),
  )
  const [tasks, setTask] = useState(props.taskList)
  const [currentTaskList, setCurrentTaskList] = useState<any>(null)

  useEffect(() => {
    set_document(document)
  }, [])

  for (let i = 0; i < props.taskList.length; i++) {
    const val = crypto.randomUUID()
    ids.push(val)
  }

  const handleEspecialidad = (newValue: any) => {
    if (!currentSubcategoria) return

    setCurrentEspecialidad(newValue)

    let inicioFecha = currentFechaInicio
    let finalFecha = currentFechaFinal

    // const taskList =

    const list = tasks.filter(
      (item: any) => item.especialidad === newValue['value'],
    )

    console.log(newValue['value'])

    setCurrentTaskList(
      list.length > 0
        ? list[0]
        : {
            subcategoria: currentSubcategoria['value'],

            especialidad: newValue['value'],
            tasks: props.processForms.map((item: any) => {
              inicioFecha =
                item.id == 1
                  ? currentFechaInicio
                  : dateStr(generarFecha(finalFecha, 2))
              finalFecha =
                item.id == 1
                  ? currentFechaFinal
                  : dateStr(generarFecha(inicioFecha, 15))

              return {
                id: item.id,
                name: item.name,
                responsables: null,
                dependencia: false,
                necesidad: false,
                fechaInicio: inicioFecha,
                fechaFinal: finalFecha,
                aprobado: [],
                habilitado: true,
              }
            }),
          },
    )
  }

  const handleResponsables = (id: number, newValue: any) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        responsables: item.id === id ? newValue : item.responsables,
      })),
    }))
  }

  const handleAprobado = (id: number, newValue: any) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        aprobado: item.id === id ? newValue : item.aprobado,
      })),
    }))
  }

  const handleDependencia = (id: number) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        dependencia: item.id === id ? !item.dependencia : item.dependencia,
      })),
    }))
  }

  const handleNecesidad = (id: number) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        necesidad: item.id === id ? !item.necesidad : item.necesidad,
      })),
    }))
  }

  const handleHabilitado = (id: number) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        habilitado: item.id === id ? !item.habilitado : item.habilitado,
      })),
    }))
  }

  const handleFechaInicio = (id: number, newDate: Date) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        fechaInicio: item.id === id ? formatedDate(newDate) : item.fechaInicio,
      })),
    }))
  }

  const handleFechaFinal = (id: number, newDate: Date) => {
    setCurrentTaskList((prev: any) => ({
      ...prev,
      tasks: prev.tasks.map((item: any) => ({
        ...item,
        fechaFinal: item.id === id ? formatedDate(newDate) : item.fechaFinal,
      })),
    }))
  }

  const handleSaveTasks = () => {
    if (currentSubcategoria == null || currentEspecialidad == null) {
      return
    }

    let toastId

    if (
      currentTaskList.tasks.filter((task: any) => task.responsables !== null)
        .length !== currentTaskList.tasks.length
    ) {
      toast.error('Todos los responsables de las tareas deben definirse 😱', {
        id: toastId,
      })
      return
    }

    if (
      currentTaskList.tasks.filter((task: any) => task.aprobado.length > 0)
        .length !== currentTaskList.tasks.length
    ) {
      toast.error(
        'Todos los usuarios que aprueban las tareas deben definirse 😱',
        { id: toastId },
      )
      return
    }

    if (!validateTaskDateEndOk(currentTaskList)) return

    if (!validateTaskDeadlineOk(currentTaskList)) return

    console.log(
      tasks.filter(
        (item: any) => item.especialidad === currentTaskList.especialidad,
      ).length,
    )

    setTask((prev) =>
      tasks.filter(
        (item: any) => item.especialidad === currentTaskList.especialidad,
      ).length > 0
        ? [
            ...tasks.map((item: any) =>
              item.especialidad === currentTaskList.especialidad
                ? currentTaskList
                : item,
            ),
          ]
        : [...tasks, currentTaskList],
    )

    // console.log(tasks)

    if (typeof props.onChange === 'function') {
      toast.success('Tareas guardadas con éxito 🙌', { id: toastId })

      props.onChange(
        tasks.filter(
          (item: any) => item.especialidad === currentTaskList.especialidad,
        ).length > 0
          ? [
              ...tasks.map((item: any) =>
                item.especialidad === currentTaskList.especialidad
                  ? currentTaskList
                  : item,
              ),
            ]
          : [...tasks, currentTaskList],
      )
    }
  }

  const handleEliminarTarea = (e: any, id: number) => {
    // if(id == 0){
    //   return;
    // }
    // const list : any = items.filter(item => item['id'] != id);
    // setItems(list);
    // if (typeof props.onChange === 'function') {
    //   props.onChange(list);
    // }
  }

  return (
    <div className="mb-4">
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-left text-sm text-gray-700 dark:text-gray-400">
            {' '}
            Subcategoria
          </label>
          <Select
            id="subcategoria"
            placeholder="Inserte subcategoria"
            className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              menuList: (base) => ({ ...base, color: 'black' }),
            }}
            menuPortalTarget={_document?.body}
            menuPlacement="auto"
            options={props.subcategorias}
            value={currentSubcategoria}
            onChange={(newValue: any) => {
              console.log(newValue)
              setCurrentSubcategoria(newValue)
              setCurrentEspecialidad(null)
            }}
          />
        </div>

        <div>
          <label className="text-left text-sm text-gray-700 dark:text-gray-400">
            {' '}
            Especialidad
          </label>
          <Select
            id="especialidad"
            placeholder="Inserte subcategoria"
            className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              menuList: (base) => ({ ...base, color: 'black' }),
            }}
            menuPortalTarget={_document?.body}
            menuPlacement="auto"
            options={
              currentSubcategoria != null
                ? props.especialidades.filter(
                    (item: any) =>
                      item['subcategory'] == currentSubcategoria['value'],
                  )
                : []
            }
            value={currentEspecialidad}
            onChange={(newValue: any) => handleEspecialidad(newValue)}
          />
        </div>

        {/* <div>
          <label className='text-sm text-left text-gray-700 dark:text-gray-400'> Fecha inicio</label>
          <input
            id={`fecha-inicio`}
            type="date"
            value={currentFechaInicio}
            onChange={(evt)  => setFechaInicio(evt.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Select date"
          />
        </div> */}
        {/* <div>
          <label className='text-sm text-left text-gray-700 dark:text-gray-400'> Fecha fin</label>
          <input
            id={`fecha-fin`}
            type="date"
            value={currentFechaFinal}
            onChange={(evt)  => setFechaFinal(evt.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Select date"
          />
        </div> */}
        {/* <div>
          <button
            type="button" 
            className={
              cn('text-white mt-6 px-5 py-2.5 text-center font-medium rounded-lg text-sm w-10 sm:w-auto',
                          true
                          ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          : 'bg-blue-400 border-blue-300 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            )}
                      >
            Generar tareas
          </button>
        </div> */}
      </div>
      {currentTaskList ? (
        <div className="relative h-[650px] overflow-scroll shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead
              className={cn(
                'text-xs uppercase text-gray-700',
                // props.errors.tareas
                //   ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                //   : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
              )}
            >
              <tr>
                <th
                  scope="col"
                  className="w-52  px-3 py-3"
                  style={{ minWidth: 208 }}
                >
                  Tarea
                </th>
                <th
                  scope="col"
                  className="w-52  px-3 py-3"
                  style={{ minWidth: 208 }}
                >
                  Responsable
                </th>
                <th scope="col" className="w-8  px-2 py-3">
                  Dependencia
                </th>
                <th scope="col" className="w-8  px-2 py-3">
                  Necesidad
                </th>
                <th
                  scope="col"
                  className="w-52  px-3 py-3"
                  style={{ minWidth: 208 }}
                >
                  Inicio
                </th>
                <th
                  scope="col"
                  className="w-52  px-3 py-3"
                  style={{ minWidth: 208 }}
                >
                  Final
                </th>
                <th scope="col" className="w-8  px-2 py-3">
                  Dias
                </th>
                <th
                  scope="col"
                  className="w-52  px-3 py-3"
                  style={{ minWidth: 208 }}
                >
                  Aprobado
                </th>
                <th scope="col" className="w-4 px-2 py-3">
                  Habilitado?
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTaskList && currentTaskList['tasks'].length > 0
                ? currentTaskList['tasks'].map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td
                        scope="col"
                        className="w-52 whitespace-nowrap px-3 py-4 font-medium text-gray-900 dark:text-white"
                        style={{ minWidth: 208 }}
                      >
                        {
                          props.processForms.filter(
                            (pf: any) => pf.id === item.id,
                          )[0].name
                        }
                      </td>
                      <th
                        scope="col"
                        className="w-52 px-3 py-3"
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          id={`responsable-${index}`}
                          instanceId={`responsable-${index}`}
                          placeholder=""
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          // isMulti
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          menuPortalTarget={_document?.body}
                          menuPlacement="auto"
                          options={props.users}
                          value={item['responsables']}
                          onChange={(newValue: any) =>
                            handleResponsables(item['id'], newValue)
                          }
                        />
                      </th>
                      <th scope="col" className="w-8 px-3 py-3 text-center">
                        <input
                          id={`checkbox-dependencia-${item['id']}`}
                          onChange={(e: any) => handleDependencia(item['id'])}
                          checked={item['dependencia']}
                          type="checkbox"
                          className="h-4 w-4  rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                      </th>
                      <th scope="col" className="w-8 px-3 py-3 text-center">
                        <input
                          id={`checkbox-necesidad-${item['id']}`}
                          onChange={(e: any) => handleNecesidad(item['id'])}
                          checked={item['necesidad']}
                          type="checkbox"
                          className="h-4 w-4  rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                      </th>
                      <th
                        scope="col"
                        className="w-52  px-3 py-3"
                        style={{ minWidth: 208 }}
                      >
                        <div className="relative max-w-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                              className="h-4 w-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            id={`fecha-inicio-${index}`}
                            type="date"
                            onChange={(e: any) =>
                              handleFechaInicio(
                                item['id'],
                                e.target.valueAsDate,
                              )
                            }
                            value={item['fechaInicio']}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Select date"
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="w-52  px-3 py-3"
                        style={{ minWidth: 208 }}
                      >
                        <div className="relative max-w-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                              className="h-4 w-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            type="date"
                            id={`fecha-fin-${index}`}
                            onChange={(e: any) =>
                              handleFechaFinal(item['id'], e.target.valueAsDate)
                            }
                            value={item['fechaFinal']}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Select date"
                          />
                        </div>
                      </th>
                      <th scope="col" className="w-8  px-3 py-3">
                        {calcularDiferenciaDias(
                          item['fechaInicio'],
                          item['fechaFinal'],
                        )}
                      </th>
                      <th
                        scope="col"
                        className="w-52  px-3 py-3"
                        style={{ minWidth: 208 }}
                      >
                        <Select
                          id={`aprobado-${index}`}
                          instanceId={`aprobado-${index}`}
                          placeholder=""
                          className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          isMulti
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, color: 'black' }),
                          }}
                          menuPortalTarget={_document?.body}
                          menuPlacement="auto"
                          options={props.users}
                          value={item['aprobado']}
                          onChange={(newValue: any) =>
                            handleAprobado(item['id'], newValue)
                          }
                        />
                      </th>

                      <td className="w-4 px-3 py-4 text-center">
                        <input
                          id={`habilitado-${item['id']}`}
                          onChange={(e: any) => handleHabilitado(item['id'])}
                          checked={item['habilitado']}
                          type="checkbox"
                          className="h-4 w-4  rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p className="p-4 text-red-700">
            {' '}
            Seleccione una subcategoria y especialidad para ver los formularios
            de procesos.
          </p>
          {currentSubcategoria ? (
            <>
              <div className="border-b py-4 text-xl">
                {' '}
                Estado de las tareas por especialidad
              </div>
              <div className=" h-[560px] overflow-y-auto ">
                {props.taskList.length > 0 ? (
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead
                      className={cn(
                        'text-xs uppercase text-gray-700',
                        // props.errors.tareas
                        //   ? 'bg-red-100 border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400 dark:focus:ring-red-500 dark:focus:border-red-500'
                        //   : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
                      )}
                    >
                      <tr>
                        <th
                          scope="col"
                          className="w-52  px-3 py-3"
                          style={{ minWidth: 208 }}
                        >
                          Especialidad
                        </th>
                        <th
                          scope="col"
                          className="w-52  px-3 py-3"
                          style={{ minWidth: 208 }}
                        >
                          Estado de tareas
                        </th>
                        <th
                          scope="col"
                          className="w-52  px-3 py-3"
                          style={{ minWidth: 208 }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.especialidades
                        .filter(
                          (item: any) =>
                            currentSubcategoria &&
                            String(item.subcategory) ===
                              currentSubcategoria['value'],
                        )
                        .map((item: any, idx: number) => (
                          <tr
                            key={idx}
                            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                          >
                            <th scope="col" className="w-full  px-3 py-3">
                              {item.label}
                            </th>
                            <th scope="col" className="w-full  px-3 py-3">
                              {props.taskList.filter(
                                (task: any) => task.especialidad === item.value,
                              ).length > 0 ? (
                                <span className="text-blue-500">Definida</span>
                              ) : (
                                <span className="text-red-500">
                                  No definida
                                </span>
                              )}
                            </th>
                            <th scope="col" className="w-full  px-3 py-3">
                              <button
                                type="button"
                                className={cn(
                                  'font-medium text-blue-600 hover:underline dark:text-blue-500',
                                )}
                                onClick={async () => {
                                  // const newSubcategoria: Option| any = {
                                  //   label: props.especialidades.filter((item: any)=> item.subcategory === task.especialidad)[0].label,
                                  //   value: task.subcategoria
                                  // }
                                  // const newEspecialidad: Option| any = {label: task.especialidadName, value: task.especialidad}
                                  // setCurrentSubcategoria(newSubcategoria,)
                                  setCurrentEspecialidad(item, (s) =>
                                    handleEspecialidad(item),
                                  )
                                }}
                              >
                                Ver tareas
                              </button>
                            </th>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            </>
          ) : null}
        </>
      )}

      {currentTaskList ? (
        <div className="mt-6 text-center">
          <button
            type="button"
            className={cn(
              'w-10 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto',
              'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
            )}
            onClick={() => handleSaveTasks()}
          >
            Guardar Tareas
          </button>
        </div>
      ) : null}
    </div>
  )
}

interface ModalProps {
  taskList: any[]
  subcategorias: any[]
  especialidades: any[]
  users: any[]
  processForms: any[]
  onTask: Function
  onClose: Function
}

function Modal(props: ModalProps) {
  return (
    <>
      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 flex max-h-full items-center overflow-y-auto overflow-x-scroll p-4  md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Administrar tareas
              </h3>
              <button
                type="button"
                onClick={() => props.onClose()}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              <Tareas
                errors={null}
                taskList={props.taskList}
                users={props.users}
                processForms={props.processForms}
                subcategorias={props.subcategorias}
                especialidades={props.especialidades}
                onChange={(value: any) => {
                  props.onTask(value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}
