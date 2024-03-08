import { AnimatePresence, motion } from 'framer-motion'
import { Deterioros } from '@/components/forms/subform/deterioros'
import Loading from '../loading'

interface Props {
  title: string
  isModalOpen: boolean
  options: any[]

  deterioros: any[]
  onClose: Function
  onChange: Function
}

export default function ModalDeteriorosParaSpreadsheet(props: Props) {
  return (
    <>
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[700px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full w-[700px]">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {props.title}
              </h3>
              <button
                type="button"
                onClick={() => props.onClose()}
                className="ml-auto inline-flex h-8 w-8  items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
              {props.options !== null && props.deterioros !== null ? (
                <Deterioros
                  onChange={(value: any) => props.onChange(value)}
                  deteriorosList={props.options}
                  deteriorosSelected={props.deterioros}
                />
              ) : (
                <Loading label={''} />
              )}
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
