"use client"

import dynamic from "next/dynamic"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DialogDemoProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const formSchema = z.object({
  categoriaProyecto: z.string().trim().min(2).max(80),
  categoriaActuacion: z.string().trim().min(1).max(80),

  udObra: z.string().trim().min(1).max(70),

  nombreActuacion: z.string().trim().min(2).max(80),
  expediente: z.string().trim().min(1).max(80),

  tca: z.string().trim().optional().nullable(),
  noActuacion: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]{2}\d{3}$/.test(value), {
      message:
        "Formato no válido. Deben ser dos letras seguidas de tres dígitos.",
    })
    .transform((value) => (value ? value.toUpperCase() : "")),
  codigoSAP: z.string().trim().min(1).max(70).nullable(),
  ambitoActuacion: z.string().trim().min(1).max(80),
  MRAsociado: z.string().trim().min(1).max(80).nullable(),
  faseTramo: z.string().trim(),

  unidadesCompuestas: z
    .array(z.unknown())
    .refine((values) => values.length > 0, {
      message: "Debe seleccionar al menos una unidad compuesta.",
    }),
})

type TSchemaForm = z.infer<typeof formSchema>
function DialogDemo({ open, onOpenChange }: DialogDemoProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = form

  function onSubmit(data: TSchemaForm) {
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Nueva actuacion</DialogTitle>
          <DialogDescription>
            Make changes to your profile here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-y-8 flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="nombreActuacion"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nombre de la actuación</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        className={cn(
                          errors.categoriaProyecto
                            ? "border-destructive text-sm font-medium"
                            : ""
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />{" "}
            <div className="flex w-full items-center justify-center gap-4">
              {" "}
              <FormField
                control={form.control}
                name="noActuacion"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Número de actuación</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className={cn(
                            errors.categoriaProyecto
                              ? "border-destructive text-sm font-medium"
                              : ""
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="expediente"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Expediente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className={cn(
                            errors.categoriaProyecto
                              ? "border-destructive text-sm font-medium"
                              : ""
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="codigoSAP"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Código SAP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className={cn(
                            errors.categoriaProyecto
                              ? "border-destructive text-sm font-medium"
                              : ""
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="other"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox id="diferido" />
                      </FormControl>
                      <FormLabel
                        htmlFor="diferido"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Diferido
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="tca"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox id="actuacion" />
                      </FormControl>
                      <FormLabel
                        htmlFor="actuacion"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Categoría de actuación
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="tca"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox id="SAP" />
                      </FormControl>
                      <FormLabel
                        htmlFor="SAP"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Código SAP
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="categoriaProyecto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría de proyecto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoriaActuacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría de actuación</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="udObra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de obra</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="categoriaProyecto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría de proyecto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoriaActuacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría de actuación</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="udObra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de obra</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="categoriaActuacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría de actuación</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const DialogDemoTest = dynamic(
  async () => {
    return function DialogDemoTest(props: DialogDemoProps): JSX.Element {
      return <DialogDemo {...props} />
    }
  },
  {
    ssr: false,
  }
)
