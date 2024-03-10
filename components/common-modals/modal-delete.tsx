'use client'

import dynamic from 'next/dynamic'
import fetcher from '@/services/fetcher'
import { getErrorMessage } from '@/utils/handleErrors'
import { toast } from 'sonner'
import { KeyedMutator, mutate } from 'swr'

import { DataResponse } from '@/types/data-response'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { textVariants } from '@/components/typography'

interface DialogDeleteProps {
  title: string
  description: string
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  mutate: KeyedMutator<DataResponse<any>>
  urlRoute: string
}
// ex urlRoute: `${process.env.API_URL}/SimpleCatalog/ChangeDisabledStatus/${id}`
function DialogDelete({
  open,
  onOpenChange,
  urlRoute,
  title,
  description,
  mutate,
}: DialogDeleteProps) {
  const handleDelete = async () => {
    // SimpleCatalog/ChangeDisabledStatus/3
    const toastId = toast.loading('Eliminando...')
    try {
      await fetcher(urlRoute)
      mutate()
      onOpenChange(false)
      toast.success('Eliminado con éxito 👍🏻', { id: toastId })
    } catch (error) {
      console.log(getErrorMessage(error))
      toast.error('No se puede eliminar 😱', { id: toastId })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription
          className={cn(
            textVariants({ variant: 'large' }),
            'text-center text-destructive',
          )}
        >
          {description}
        </DialogDescription>
        <DialogFooter>
          <Button variant={'destructive'} onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant={'outline'} onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ModalDelete = dynamic(
  async () => {
    return function Dialog(props: DialogDeleteProps): JSX.Element {
      return <DialogDelete {...props} />
    }
  },
  {
    ssr: false,
  },
)
