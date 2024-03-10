import classNames from 'classnames'
import { ErrorMessage, Field } from 'formik'
import React, { Dispatch } from 'react'
import Select from 'react-select'

interface JuntasSubFormProps {
  anchoCalzada: number
  setAnchoCalzada: Dispatch<number>
  esviaje: number
  setEsviaje: Dispatch<number>
  coseno: boolean
  setCoseno: Dispatch<boolean>
  longitudJunta: number
  setLongitudJunta: Dispatch<number>
  noElementos: number
  setNoElementos: Dispatch<number>
  longitudTotalJuntas: number
  setLongitudTotalJuntas: Dispatch<number>
  porcentajeAfectacion: number
  setPorcentajeAfectacion: Dispatch<number>
  longitudJuntasAfectadas: number
  setLongitudJuntasAfectadas: Dispatch<number>
  disableLongitudJunta: boolean
  setDisableLongitudJunta: Dispatch<boolean>
  disableLongitudTotalJuntas: boolean
  setDisableLongitudTotalJuntas: Dispatch<boolean>
  disableLongitudJuntasAfectadas: boolean
  setDisableLongitudJuntasAfectadas: Dispatch<boolean>
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

const JuntasSubForm = ({
  anchoCalzada,
  setAnchoCalzada,
  esviaje,
  setEsviaje,
  coseno,
  setCoseno,
  longitudJunta,
  setLongitudJunta,
  noElementos,
  setNoElementos,
  longitudTotalJuntas,
  setLongitudTotalJuntas,
  porcentajeAfectacion,
  setPorcentajeAfectacion,
  longitudJuntasAfectadas,
  setLongitudJuntasAfectadas,
  disableLongitudJunta,
  setDisableLongitudJunta,
  disableLongitudJuntasAfectadas,
  disableLongitudTotalJuntas,
  setDisableLongitudJuntasAfectadas,
  setDisableLongitudTotalJuntas,
}: JuntasSubFormProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="anchoCalzada"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Ancho de calzada (m)
        </label>
        <Field name="anchoCalzada">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              step="0.01"
              min={0}
              value={anchoCalzada}
              onChange={(evt: any) => {
                setDisableLongitudJunta(true)
                setDisableLongitudTotalJuntas(true)
                setDisableLongitudJuntasAfectadas(true)
                setFieldValue(field.name, evt.target.valueAsNumber)
                setAnchoCalzada(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.anchoCalzada && touched.anchoCalzada
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="anchoCalzada"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>
      <div>
        <label
          htmlFor="esviaje"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Esviaje (º)
        </label>
        <Field name="esviaje">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              step="0.01"
              min={0}
              value={esviaje}
              onChange={(evt: any) => {
                setDisableLongitudJunta(true)
                setDisableLongitudTotalJuntas(true)
                setDisableLongitudJuntasAfectadas(true)
                setFieldValue(field.name, evt.target.valueAsNumber)
                setEsviaje(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.esviaje && touched.esviaje
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="esviaje"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>
      <div>
        <label
          htmlFor="coseno"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Coseno o seno para cálculo
        </label>

        <Field name="coseno">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <div>
              <Select
                {...field}
                id="coseno"
                placeholder="Seleccione"
                options={[
                  { label: 'Coseno', value: true },
                  { label: 'Seno', value: false },
                ]}
                value={coseno}
                onChange={(option: any) => {
                  setDisableLongitudJunta(true)
                  setDisableLongitudTotalJuntas(true)
                  setDisableLongitudJuntasAfectadas(true)
                  setFieldValue(field.name, option ? option.value : null)
                  setCoseno(option)
                }}
                styles={customStyleSelect(errors.coseno && touched.coseno)}
                className={classNames(
                  'block w-full rounded-lg border text-sm',
                  errors.coseno && touched.coseno
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
            </div>
          )}
        </Field>
        <ErrorMessage
          name="coseno"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>
      <div>
        <label
          htmlFor="longitudJunta"
          className=" mb-2  block space-x-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span>Long. de cada Junta (m)</span>
          <input
            id="checked-checkbox"
            type="checkbox"
            checked={!disableLongitudJunta}
            onChange={() => setDisableLongitudJunta(!disableLongitudJunta)}
            className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </label>
        <Field name="longitudJunta">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              step="0.01"
              min={0}
              value={longitudJunta}
              disabled={disableLongitudJunta}
              onChange={(evt: any) => {
                setFieldValue(field.name, evt.target.valueAsNumber)
                setLongitudJunta(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.longitudJunta && touched.longitudJunta
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableLongitudJunta ? 'bg-gray-200' : 'bg-white'}`,
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="longitudJunta"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>

      <div>
        <label
          htmlFor="noElementos"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Nº de juntas
        </label>
        <Field name="noElementos">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              min="0"
              value={noElementos}
              onChange={(evt: any) => {
                setDisableLongitudJunta(true)
                setDisableLongitudTotalJuntas(true)
                setDisableLongitudJuntasAfectadas(true)
                setFieldValue(field.name, evt.target.valueAsNumber)
                setNoElementos(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.noElementos && touched.noElementos
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="noElementos"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>

      <div>
        <label
          htmlFor="longitudTotalJuntas"
          className="mb-2 block space-x-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span>Long. total juntas (m)</span>
          <input
            id="checked-checkbox"
            type="checkbox"
            checked={!disableLongitudTotalJuntas}
            onChange={() =>
              setDisableLongitudTotalJuntas(!disableLongitudTotalJuntas)
            }
            className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </label>
        <Field name="longitudTotalJuntas">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              step="0.01"
              min={0}
              disabled={disableLongitudTotalJuntas}
              value={longitudTotalJuntas}
              onChange={(evt: any) => {
                setFieldValue(field.name, evt.target.valueAsNumber)
                setLongitudTotalJuntas(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.longitudTotalJuntas && touched.longitudTotalJuntas
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableLongitudTotalJuntas ? 'bg-gray-200' : 'bg-white'}`,
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="longitudTotalJuntas"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>

      <div>
        <label
          htmlFor="porcentajeAfectacion"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          % afectación
        </label>
        <Field name="porcentajeAfectacion">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              step="0.01"
              min={0}
              max={100}
              value={porcentajeAfectacion}
              onChange={(evt: any) => {
                setDisableLongitudJunta(true)
                setDisableLongitudTotalJuntas(true)
                setDisableLongitudJuntasAfectadas(true)
                setFieldValue(field.name, evt.target.valueAsNumber)
                setPorcentajeAfectacion(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.porcentajeAfectacion && touched.porcentajeAfectacion
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="porcentajeAfectacion"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>
      <div>
        <label
          htmlFor="longitudJuntasAfectadas"
          className="mb-2 block space-x-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span>Long. afect. (m)</span>
          <input
            id="checked-checkbox"
            type="checkbox"
            checked={!disableLongitudJuntasAfectadas}
            onChange={() =>
              setDisableLongitudJuntasAfectadas(!disableLongitudJuntasAfectadas)
            }
            className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
        </label>
        <Field name="longitudJuntasAfectadas">
          {({
            field, // { name, value, onChange, onBlur }
            value,
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }: any) => (
            <input
              {...field}
              type="number"
              step="0.01"
              min={0}
              disabled={disableLongitudJuntasAfectadas}
              value={longitudJuntasAfectadas}
              onChange={(evt: any) => {
                setFieldValue(field.name, evt.target.valueAsNumber)
                setLongitudJuntasAfectadas(evt.target.valueAsNumber)
              }}
              className={classNames(
                'block w-full rounded-lg border text-sm',
                errors.longitudJuntasAfectadas &&
                  touched.longitudJuntasAfectadas
                  ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                  : ` block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-gray-400 focus:ring-gray-400 ${disableLongitudJuntasAfectadas ? 'bg-gray-200' : 'bg-white'}`,
              )}
            />
          )}
        </Field>
        <ErrorMessage
          name="longitudJuntasAfectadas"
          component="div"
          className="mt-1 text-sm text-red-600 dark:text-red-500"
        />
      </div>
    </>
  )
}

export default JuntasSubForm
