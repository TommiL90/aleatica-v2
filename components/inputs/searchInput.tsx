import { Link } from '@/navigation'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ModalFiltrosBusqueda from '../common-modals/filtrosBusqueda'

interface Props {
  label: string
  hideLabel: boolean
  hideFilter: boolean
  selectValue: any
  selectPlaceholder: string
  inputPlaceholder: string
  options: any
  searchInputValue: string
  onChangeSelect: Function
  onChangeInput: Function
  onSearch: Function
}

interface Option {
  label: string
  value: string
  checked: boolean
}

export default function SearchInput(props: Props) {
  const [inputValue, setInputValue] = useState<string>('')

  // Manejador de eventos para actualizar el estado cuando se cambia el input
  const handlerValueInput = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChangeInput(event.target.value)
  }

  const [modalFilter, setModalFilter] = useState(false)

  return (
    <div className="flex">
      {!props.hideLabel ? (
        <label
          htmlFor="search-dropdown"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      ) : null}

      {!props.hideFilter ? (
        <>
          <button
            id="dropdown-button"
            onClick={() => setModalFilter(!modalFilter)}
            className="z-1 inline-flex flex-shrink-0 items-center rounded-l-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            {props.selectPlaceholder}
            <svg
              className="ml-2.5 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {modalFilter ? (
            <ModalFiltrosBusqueda
              filter={props.options}
              onClose={() => setModalFilter(false)}
              onSearch={(values: any) => props.onSearch(values)}
            />
          ) : null}
        </>
      ) : null}

      <div className="relative w-full">
        <input
          type="search"
          onChange={handlerValueInput}
          id="search-dropdown"
          className={classNames(
            'z-20 block border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500  sm:w-full md:min-w-[384px] lg:min-w-[384px] xl:min-w-[384px]',
            !props.hideFilter
              ? 'rounded-r-lg border-l-2 border-l-gray-50'
              : 'rounded',
          )}
          placeholder={props.inputPlaceholder}
        />
        <button
          type="button"
          onClick={(e) => props.onSearch(props.searchInputValue)}
          className="absolute right-0 top-0 h-full rounded-r-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  )
}
