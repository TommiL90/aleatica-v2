import { Link } from '@/navigation'
import React from 'react'
import PropTypes from 'prop-types'

interface Props {
  titulo: string
  mensaje: string
  onClose: Function
  onClone: Function
}

export default function ModalDuplicateProject({
  titulo = '',
  mensaje = '',
  onClose = () => {},
  onClone = () => {},
}) {
  return (
    <>
      <div
        id="defaultModal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className={
          'fixed left-0 right-0 top-0 z-50 mx-auto flex h-[calc(100%-1rem)] max-h-full w-96 flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0'
        }
      >
        <div className="relative max-h-full w-full max-w-2xl">
          <div className="relative rounded-lg border border-blue-300 bg-blue-50 text-blue-800 shadow dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-white">
                {titulo}
              </h3>
              <button
                data-modal-target="defaultModal"
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
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
            {/* <!-- Modal body --> */}
            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-blue-500 dark:text-blue-400">
                {mensaje}
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                onClick={onClone}
                type="button"
                className="mr-2 inline-flex items-center rounded-lg bg-blue-800 px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800"
              >
                CLonar
              </button>
              <button
                data-modal-hide="defaultModal"
                onClick={onClose}
                type="button"
                className="rounded-lg border border-blue-800 bg-transparent px-5 py-2.5 text-center text-xs font-medium text-blue-800 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-blue-600 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-red-800"
              >
                Cancelar
              </button>
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
