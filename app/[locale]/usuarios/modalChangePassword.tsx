import { AnimatePresence, motion } from 'framer-motion'
import IndicadorSubEspecialidadForm from '@/components/forms/IndicadorSubEspecialidadForm'

import Loading from '@/components/loading'

import fetcher from '@/services/fetcher'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'
import IndicadorForm from '@/components/forms/indicadorForm'
import CreateForm from '@/components/forms/usuarios/createForm'
import ChangePasswordForm from '@/components/forms/usuarios/changePassword'

interface PropsModalNewItem {
  title: string
  isModalOpen: boolean
  itemSelected: number
  onClose: Function
  onMutate: Function
}

interface ValuesProps {
  oldPassword: string | null
  passwordNew: string
}

interface Item {
  username: string
  oldPassword: string | null
  password: string
}

interface IDataFindById {
  status: number
  result: {
    rols: any[]
    department: any
    departmentPosition: any
    mtBusinessUnit: any
    mtBusinessUnitId: number
    userName: string
    email: string
    profileName: string
    phoneNumber: string
    officePhoneNumber: string
    state: boolean
    departmentId: number
    departmentPositionId: number
    id: number
  }
  errorMessage: string | null
}

// const creator = async (url: string, { arg }: { arg: { code: string; name: string } }) => {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(arg),
//     }).then((res) => res.json());
// };

const updater = async (
  url: string,
  { arg }: { arg: { id: number; code: string; name: string } },
) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

const updaterV2 = async (url: string, arg: Item) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

const ModalChangePassword: React.FC<PropsModalNewItem> = (props) => {
  // const { data: unitRes } = useSWR(`${process.env.API_URL}/MtBusinessUnit/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`, fetcher);
  // const { trigger, error } = useSWRMutation(`${process.env.API_URL}/User/Create`, creator);
  const {
    data: dataFindById,
    mutate: mutateFindById,
    isLoading: isLoadingFindById,
    isValidating,
  } = useSWR<IDataFindById>(
    props.itemSelected > 0
      ? `${process.env.API_URL}/User/FindById/${props.itemSelected}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )
  const updateMutation = useSWRMutation(
    dataFindById !== undefined && dataFindById.status === 200
      ? `${process.env.API_URL}/User/Update/${dataFindById.result.id}`
      : null,
    updater,
  )

  const saveUser = async (values: ValuesProps): Promise<void> => {
    let toastId

    try {
      toastId = toast.loading('Enviando... 🚀')

      if (dataFindById && dataFindById.result && dataFindById.status === 200) {
        const item: Item = {
          username: dataFindById.result.userName,
          oldPassword: null,
          password: values.passwordNew,
        }
        console.log(JSON.stringify(item))
        const result = await fetch(
          `${process.env.API_URL}/User/ChangePassword/${dataFindById.result.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          },
        )

        if (result.ok) {
          toast.success('Enviado con éxito 🙌', { id: toastId })
          props.onMutate()
        } else {
          toast.error('No se puede enviar 😱', { id: toastId })
        }
      } else {
        toast.error('No se puede enviar 😱', { id: toastId })
      }
    } catch (e) {
      console.log(e)
      toast.error('No se puede enviar 😱', { id: toastId })
    }
  }

  return (
    <AnimatePresence>
      {props.isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            id="staticModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[400px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="max-w-7xlxl relative mx-auto max-h-full w-[400px]">
              <div className="relative bg-white shadow dark:bg-gray-700">
                <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {props.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => props.onClose()}
                    className="ml-auto inline-flex h-8 w-8 items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
                  {isValidating ? (
                    <Loading label={''} />
                  ) : (
                    <ChangePasswordForm
                      buttonText="Guardar"
                      onSubmit={saveUser}
                      admin={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            modal-backdrop=""
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalChangePassword
