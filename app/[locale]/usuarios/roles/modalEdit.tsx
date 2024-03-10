import { AnimatePresence, motion } from 'framer-motion'
import IndicadorSubEspecialidadForm from '@/components/forms/IndicadorSubEspecialidadForm'

import Loading from '@/components/loading'

import fetcher from '@/services/fetcher'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'
import IndicadorForm from '@/components/forms/indicadorForm'
import CreateForm from '@/components/forms/usuarios/createForm'
import RoleForm from '@/components/forms/usuarios/roleForm'

interface PropsModalNewItem {
  title: string
  isModalOpen: boolean
  itemSelected: any
  onClose: Function
  onMutate: Function
}

const creator = async (
  url: string,
  { arg }: { arg: { name: string; permissionIds: number[] } },
) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

const updater = async (
  url: string,
  { arg }: { arg: { id: number; name: string; permissionIds: number[] } },
) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export default function ModalNewItem(props: PropsModalNewItem) {
  const { data: permissionRes } = useSWR(
    `${process.env.API_URL}/Permission/GetAll`,
    fetcher,
  )
  const { trigger, error } = useSWRMutation(
    `${process.env.API_URL}/Rol/Create`,
    creator /* options */,
  )
  const {
    data: dataFindById,
    mutate: mutateFindById,
    isLoading: isLoadingFindById,
    isValidating,
  } = useSWR(
    props.itemSelected > 0
      ? `${process.env.API_URL}/Rol/FindById/${props.itemSelected}`
      : null,
    fetcher,
  )
  const updateMutation = useSWRMutation(
    dataFindById !== undefined && dataFindById.status == 200
      ? `${process.env.API_URL}/Rol/Update/${dataFindById.result.id}`
      : null,
    updater /* options */,
  )

  const saveRol = async (values: any): Promise<any> => {
    console.log(values)

    let toastId
    try {
      toastId = toast.loading('Enviando... 🚀')
      // Submit data
      const item: any = {
        id:
          dataFindById !== undefined && dataFindById.status == 200
            ? dataFindById.result.id
            : 0,
        name: values.name,
        permissionIds: values.permissionList,
      }

      const result =
        item['id'] > 0
          ? await updateMutation.trigger(item)
          : await trigger(item)

      if (
        result != undefined &&
        (result.status === 200 || result.status === 201)
      ) {
        toast.success('Enviado con éxito 🙌', { id: toastId })
        props.onMutate()
      }
      if (result != undefined && result.status >= 299) {
        toast.error('No se puede enviar 😱', { id: toastId })
      }
    } catch (e) {
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
            className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[800px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="max-w-7xlxl relative mx-auto max-h-full w-[800px]">
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
                  {isValidating ? (
                    <Loading label={''} />
                  ) : (
                    <RoleForm
                      permissionList={
                        permissionRes !== undefined &&
                        permissionRes.status === 200
                          ? // permissionRes.result.map((item: any) =>({label: item.name, value: item.id,}))
                            permissionRes.result.reduce((r: any, a: any) => {
                              r[a.module] = [...(r[a.module] || []), a]
                              return r
                            }, {})
                          : []
                      }
                      initValue={
                        dataFindById !== undefined && dataFindById.status == 200
                          ? {
                              id: dataFindById.result.id,
                              name: dataFindById.result.name,
                              permissionList:
                                dataFindById.result.permissions.map(
                                  (item: any) => item.id,
                                ),
                            }
                          : null
                      }
                      buttonText="Guardar"
                      onSubmit={saveRol}
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
