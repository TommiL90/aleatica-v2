import Link from 'next/link'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
interface Option {
  label: string
  value: string
  checked: boolean
}
interface Props {
  label: string
  hideLabel: boolean
  selectValue: any
  selectPlaceholder: string
  inputPlaceholder: string
  options: Option[]
  searchInputValue: string
  onChangeSelect: Function
  onChangeInput: Function
  onSearch: Function
}

export default function CheckboxList() {
  const [openDropDown, setOpenDropDown] = useState(false)

  return (
    <>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Technology
      </h3>
      <ul className="w-48 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="vue-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="vue-checkbox"
              className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Vue JS
            </label>
          </div>
        </li>
        <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="react-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="react-checkbox"
              className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              React
            </label>
          </div>
        </li>
        <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="angular-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="angular-checkbox"
              className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Angular
            </label>
          </div>
        </li>
        <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="laravel-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="laravel-checkbox"
              className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Laravel
            </label>
          </div>
        </li>
      </ul>
    </>
  )
}
