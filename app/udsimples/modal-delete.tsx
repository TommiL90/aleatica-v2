"use client"

import dynamic from "next/dynamic"
import { toast } from "sonner"



import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { textVariants } from "@/components/typography"
import { SimpleUnitPaginated } from "./simple-catalog"
import { KeyedMutator, mutate } from "swr"
import { DataResponse } from "@/types/data-response"
import fetcher from "@/services/fetcher"
import { getErrorMessage } from "@/utils/handleErrors"

interface DialogDeleteProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  id: number
  mutate: KeyedMutator<DataResponse<SimpleUnitPaginated>>
}



function DialogDelete({ open, onOpenChange, id, mutate }: DialogDeleteProps) {

  const handleDelete = async () => {
    // SimpleCatalog/ChangeDisabledStatus/3
    let toastId = toast.loading("Eliminando...")
    try {
      await fetcher(`${process.env.API_URL}/SimpleCatalog/ChangeDisabledStatus/${id}`)
      mutate()
      onOpenChange(false)
      toast.success("Eliminado con éxito 👍🏻", { id: toastId })
    } catch (error) {
      console.log(getErrorMessage(error))
      toast.error('No se puede eliminar 😱', { id: toastId });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Eliminar Unidad Simple</DialogTitle>
        </DialogHeader>
        <DialogDescription className={cn(textVariants({variant:'large'}), 'text-center text-destructive')}>¿Está seguro que desea eliminar esta unidad?</DialogDescription>
        <DialogFooter>
          <Button variant={'destructive'} onClick={handleDelete}>Eliminar</Button>
          <Button variant={'outline'} onClick={()=>onOpenChange(false)} >Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ModalDeleteUdSimple = dynamic(
  async () => {
    return function Dialog(props: DialogDeleteProps): JSX.Element {
      return <DialogDelete {...props} />
    }
  },
  {
    ssr: false,
  }
)
