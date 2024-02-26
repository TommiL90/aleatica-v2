'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  title: string
  buttonText: string
  defaultValue: string
  onClose: Function
  onSave: Function
}

export default function ModalDescriptionCell(props: Props) {
  const [newValue, setNewValue] = useState(props.defaultValue)
  return (
    <>
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 mx-auto flex w-[450px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full w-full">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Descripción
              </h3>
              <button
                type="button"
                onClick={() => {
                  props.onClose()
                }}
                className="ml-auto inline-flex size-8 items-center  justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="size-3"
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
              <textarea
                className="block h-60 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Descripción"
                value={newValue}
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewValue(evt.currentTarget.value)
                }
              ></textarea>
            </div>
            <div className="text-center">
              <button
                disabled={newValue === ''}
                type="button"
                className={cn(
                  'm-4 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto',
                  newValue !== ''
                    ? 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    : 'border-blue-300 bg-blue-400 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                )}
                onClick={() => props.onSave(newValue)}
              >
                {props.buttonText}
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
