import classNames from 'classnames'
import { ErrorMessage, Field } from 'formik'
import React, { Dispatch } from 'react'

interface NeoprenosSubFormProps {
  noApoyos: number
  setNoApoyos: Dispatch<number>
  noEjes: number
  setNoEjes: Dispatch<number>
}

const NeoprenosSubForm = ({
  noEjes,
  setNoEjes,
  noApoyos,
  setNoApoyos,
}: NeoprenosSubFormProps) => {
  return (
    <>
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <div>
          <label
            htmlFor="noEjess"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Nº de ejes (a gatear)
          </label>
          <Field name="noEjes">
            {({
              field, // { name, value, onChange, onBlur }
              value,
              form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }: any) => (
              <input
                {...field}
                type="number"
                min={0}
                value={noEjes}
                onChange={(evt: any) => {
                  setFieldValue(field.name, evt.target.valueAsNumber)
                  setNoEjes(evt.target.valueAsNumber)
                }}
                className={classNames(
                  'block w-full rounded-lg border text-sm',
                  errors.noEjes && touched.noEjes
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
            )}
          </Field>
          <ErrorMessage
            name="noEjes"
            component="div"
            className="mt-1 text-sm text-red-600 dark:text-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="noApoyos"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Nº de apoyos afectados
          </label>
          <Field name="noApoyos">
            {({
              field, // { name, value, onChange, onBlur }
              value,
              form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }: any) => (
              <input
                {...field}
                type="number"
                min={0}
                value={noApoyos}
                onChange={(evt: any) => {
                  setFieldValue(field.name, evt.target.valueAsNumber)
                  setNoApoyos(evt.target.valueAsNumber)
                }}
                className={classNames(
                  'block w-full rounded-lg border text-sm',
                  errors.noApoyos && touched.noApoyos
                    ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
              />
            )}
          </Field>
          <ErrorMessage
            name="noApoyos"
            component="div"
            className="mt-1 text-sm text-red-600 dark:text-red-500"
          />
        </div>
      </div>
    </>
  )
}

export default NeoprenosSubForm
