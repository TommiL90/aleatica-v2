"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactInputMask from "react-input-mask"
import { RoadSurfaceDamages } from "@/components/road-surface-damages"



const newRoadSurfaceMeasurementSchemaEsp = z.object({

  fechaEstudioPrevio: z.date({
    required_error: "A date of birth is required.",
  }),
  tramo: z.string().min(1, 'Requerido').max(5),
  entronque: z.string().min(1, 'Requerido').max(5),
  gaza: z.string().min(1, 'Requerido').max(5),
  carril: z.string().min(1, 'Requerido').max(5),

  cadenamientoInicial: z.string().min(7, 'Ingresar en formato correcto').max(7),
  cadenamientoFinal: z.string().min(7, 'Ingresar en formato correcto').max(7),

  actuacion: z.string().min(1, 'Requerido').max(5),
  compuesta: z.string().min(1, 'Requerido').max(5),
  prioridad: z.string().min(1, 'Requerido').max(5),


  deterioros: z.array(z.string()).min(1, 'Debe seleccionar al menos un deterioro.'),

  ancho: z.number()
    .min(0, { message: 'Debe ser un número positivo o cero' })
    .optional()
    .refine(value => {
      if (value === undefined) return true;
      const regex = /^\d+(\.\d{1,2})?$/;
      return regex.test(value.toString());
    }, { message: 'Máximo de dos decimales permitidos' }),

  espesor: z.number()
    .min(0, { message: 'Debe ser un número positivo o cero' })
    .optional()
    .refine(value => {
      if (value === undefined) return true;
      const regex = /^\d+(\.\d{1,2})?$/;
      return regex.test(value.toString());
    }, { message: 'Máximo de dos decimales permitidos' }),

  densidad: z.number()
    .min(0, { message: 'Debe ser un número positivo o cero' })
    .optional()
    .refine(value => {
      if (value === undefined) return true;
      const regex = /^\d+(\.\d{1,2})?$/;
      return regex.test(value.toString());
    }, { message: 'Máximo de dos decimales permitidos' }),


  porcentajeAfectacion: z.number()
    .min(0, { message: 'Debe ser un número positivo o cero' })
    .optional()
    .refine(value => {
      if (value === undefined) return true;
      const regex = /^\d+(\.\d{1,2})?$/;
      return regex.test(value.toString());
    }, { message: 'Máximo de dos decimales permitidos' }),



})


export type NewRoadSurfaceMeasurementEsp = z.infer<typeof newRoadSurfaceMeasurementSchemaEsp>;


export default function IndexPage() {

  // 1. Define your form.
  const form = useForm<NewRoadSurfaceMeasurementEsp>({
    resolver: zodResolver(newRoadSurfaceMeasurementSchemaEsp),
    // defaultValues: {
    //   : "",
    // },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = form




  // 2. Define a submit handler.
  function onSubmit(values: NewRoadSurfaceMeasurementEsp) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[820px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Descripcion
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="newMeasurement" onSubmit={form.handleSubmit(onSubmit)} className="min-h-full space-y-8">
              <Tabs defaultValue="account" className="min-h-full w-full">
                <TabsList defaultValue="identificacion" className="grid w-full grid-cols-5">
                  <TabsTrigger value="identificacion">Identificación</TabsTrigger>
                  <TabsTrigger value="cadenamientos">Cadenamientos</TabsTrigger>
                  <TabsTrigger value="deterioros">Deterioros</TabsTrigger>
                  <TabsTrigger value="actuacion">Actuación</TabsTrigger>
                  <TabsTrigger value="calculos">Cálculos</TabsTrigger>

                </TabsList>
                <TabsContent value="identificacion" className="grid min-h-full grid-cols-2 gap-4">
                  <FormField

                    name="especialidad"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Especialidad</FormLabel>
                        <FormControl>
                          <Input disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fechaEstudioPrevio"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="pb-[6px] pt-1">Fecha estudio previo</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tramo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tramo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="entronque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entronque</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gaza"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gaza</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carril"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carril</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </TabsContent>
                <TabsContent value="cadenamientos" className="grid min-h-full grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cadenamientoInicial"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Cadenamiento Inicial</FormLabel>
                        <FormControl>
                          <ReactInputMask
                            mask="999+0999"
                            alwaysShowMask={true}
                            maskChar="#"

                            {...field}

                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cadenamientoFinal"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Cadenamiento Final</FormLabel>
                        <FormControl>
                          <ReactInputMask
                            mask="999+0999"
                            alwaysShowMask={true}
                            maskChar="#"
                    
                            {...field}

                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </TabsContent>
                <TabsContent value="deterioros" className="flex-1">
                <FormField
                    control={form.control}
                    name="deterioros"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Deterioros</FormLabel>
                        <FormControl>
                        <RoadSurfaceDamages deteriorosSelected={field.value} onChange={field.onChange} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 
                </TabsContent>
              </Tabs>

            </form>
          </Form>

          <DialogFooter>
            <Button type="submit" form="newMeasurement">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
