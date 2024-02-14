/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"
import fetcher from "@/services/fetcher"
import { RoadSectionMtHighwayIntersection } from "@/services/useGetRepositories"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import ReactInputMask from "react-input-mask"
import useSWR from "swr"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RoadSurfaceDamages } from "@/components/road-surface-damages"

interface Tramo {
  label: string
  value: number
  highwayIntersections: RoadSectionMtHighwayIntersection[]
}

interface Gaza {
  label: string
  value: number
}

interface Carril {
  label: string
  value: number
}

interface Deterioro {
  label: string
  value: number
}

interface Actuacion {
  label: string
  value: number
  compuestas: {
    label: string
    value: number
    mtUnitOfMeasurementId: number
  }[]
}

interface Prioridad {
  label: string
  value: number
}

interface Especialidad {
  label: string
  value: number
}

interface NewRoadSurfaceMeasurementModalProps {
  tramos: Tramo[]
  gazas: Gaza[]
  carriles: Carril[]
  deterioros: Deterioro[]
  actuaciones: Actuacion[]
  prioridades: Prioridad[]
  especialidad: Especialidad
}

interface mtUnitOfMeasurementById {
  code: string
  name: string
  id: number
  disabled: boolean
}

interface CrearMedicion {
  id: number
  disabled: boolean
  previousStudiesDate: string // Formato de fecha y hora
  mtRoadSectionId: number
  mtHigwayIntersectionId: number
  mtSlipLaneRoadId: number
  mtHighwayLaneId: number
  performanceCatalogId: number
  mtSideId: number
  mtStructureTypeId?: number | null // Puede ser nulo
  mtElementId?: number | null // Puede ser nulo
  mtCalificationId?: number | null // Puede ser nulo
  axisId?: number | null // Puede ser nulo
  mtStructureNumberId?: number | null // Puede ser nulo
  compositeCatalogId: number
  mtPriorityId: number
  mtTypologyId: number
  mtDispositionId?: number | null // Puede ser nulo
  mtPositionId?: number | null // Puede ser nulo
  mtSpecialtyActionId?: number | null // Puede ser nulo
  observation?: string | null // Puede ser nulo
  initialNumber: number
  finalNumber: number
  manualWidth?: string | null // Puede ser nulo
  roadAverage: number
  esviaje: number
  jointWidth?: string | null // Puede ser nulo
  elementsCount: number
  study: number
  width: number
  thickness: number
  idGeneral?: string | null // Puede ser nulo
  length: number
  area: number
  volume: number
  ud: number
  t: number
  l: number
  density: number
  affectePercentage: number
  supportsAffectedCount: number
  cosForCalculate: boolean
  mtDeteriorationTypeIds?: number[] | null // Puede ser nulo
}

const newRoadSurfaceMeasurementSchemaEsp = z.object({
  fechaEstudioPrevio: z.date({
    required_error: "A date of birth is required.",
  }),
  tramo: z.string().min(1, "Requerido").max(5),
  entronque: z.string().min(1, "Requerido").max(5),
  gaza: z.string().min(1, "Requerido").max(5),
  carril: z.string().min(1, "Requerido").max(5),

  cadenamientoInicial: z.string().min(7, "Ingresar en formato correcto").max(8),
  cadenamientoFinal: z.string().min(7, "Ingresar en formato correcto").max(8),

  actuacion: z.string().min(1, "Requerido").max(5),
  compuesta: z.string().min(1, "Requerido").max(5),
  prioridad: z.string().min(1, "Requerido").max(5),

  observacion: z.string().max(1000).optional(),

  deterioros: z.array(z.any()).refine((arr) => arr.length > 0, {
    message: "Debe seleccionar al menos un objeto.",
  }),

  ancho: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  espesor: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  densidad: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  porcentajeAfectacion: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  masa: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  longitud: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  area: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),

  volumen: z.coerce
    .number()
    .min(0, { message: "Debe ser un número positivo o cero" })
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true
        const regex = /^\d+(\.\d{1,2})?$/
        return regex.test(value.toString())
      },
      { message: "Máximo de dos decimales permitidos" }
    ),
})

export type NewRoadSurfaceMeasurementEsp = z.infer<
  typeof newRoadSurfaceMeasurementSchemaEsp
>

export const NewRoadSurfaceMeasurementModal = ({
  especialidad,
  actuaciones,
  carriles,
  deterioros,
  gazas,
  prioridades,
  tramos,
}: NewRoadSurfaceMeasurementModalProps) => {
  const [length, setLength] = useState(0)
  const [area, setArea] = useState(0)
  const [volume, setVolume] = useState(0)
  const [masa, setMasa] = useState(0)

  // 1. Define your form.
  const form = useForm<NewRoadSurfaceMeasurementEsp>({
    resolver: zodResolver(newRoadSurfaceMeasurementSchemaEsp),
    defaultValues: {
      porcentajeAfectacion: 100,
      deterioros: [],
    },
    mode: "all",
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = form

  const selectedTramo = watch("tramo")
  let filteredEntronques: { label: string; value: number }[] = []

  if (selectedTramo) {
    const foundTramo = tramos.find(
      (item) => item.value.toString() === selectedTramo
    )
    if (foundTramo) {
      filteredEntronques = foundTramo.highwayIntersections.map((item) => ({
        label: item.mtHighwayIntersection,
        value: item.mtHighwayIntersectionId,
      }))
    }
  }

  const selectedActuacion = watch("actuacion")
  let filteredCompuestas: {
    label: string
    value: number
    mtUnitOfMeasurementId: number
  }[] = []

  if (selectedActuacion) {
    const foundActuacion = actuaciones.find(
      (item) => item.value.toString() === selectedActuacion
    )
    if (foundActuacion) {
      filteredCompuestas = foundActuacion.compuestas.map((item) => ({
        label: item.label,
        value: item.value,
        mtUnitOfMeasurementId: item.mtUnitOfMeasurementId,
      }))
    }
  }

  const selectedCompuesta = filteredCompuestas.find(
    (i) => i.value.toString() === watch("compuesta")
  )

  const { data } = useSWR(
    selectedCompuesta
      ? `${process.env.API_URL}/MtUnitOfMeasurement/FindById/${selectedCompuesta.mtUnitOfMeasurementId}`
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  )

  const value: Partial<CrearMedicion> = {
    performanceCatalogId: Number(watch("actuacion")),
    compositeCatalogId: Number(watch("compuesta")),
    mtPriorityId: Number(watch("prioridad")),
    mtSpecialtyActionId: especialidad.value,
    initialNumber: watch("cadenamientoInicial")
      ? Number(watch("cadenamientoInicial").replace("+", ""))
      : undefined,
    finalNumber: watch("cadenamientoFinal")
      ? Number(watch("cadenamientoFinal").replace("+", ""))
      : undefined,
    thickness: Number(watch("espesor")),
    width: Number(watch("ancho")),
    affectePercentage: Number(watch("porcentajeAfectacion")),
    density: Number(watch("densidad")),
  }
  const handleGetPartialMeasurements = async () => {
    console.log(value)
    const res = await fetch(`${process.env.API_URL}/MeasurementTab/GetInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
    const data = await res.json()
    console.log(data.result)
    if (data.result) {
      const {
        length: lengthRes,
        area: areaRes,
        volume: volumeRes,
        t,
      } = data.result
      console.log(lengthRes, areaRes, volumeRes, t)
      setValue("longitud", lengthRes)
      setValue("area", areaRes)
      setValue("volumen", volumeRes)
      setValue("masa", t)
    }
  }
  // 2. Define a submit handler.
  function onSubmit(values: NewRoadSurfaceMeasurementEsp) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  useEffect(() => {
    handleGetPartialMeasurements()
  }, [
    watch("densidad"),
    watch("ancho"),
    watch("espesor"),
    watch("porcentajeAfectacion"),
    watch("cadenamientoInicial"),
    watch("cadenamientoFinal"),
  ])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">+ Nuevo</Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[820px]">
          <DialogHeader>
            <DialogTitle>Nueva Medición</DialogTitle>
            <DialogDescription>
              <div>
                UOC:{" "}
                <strong className="text-secondary">
                  {selectedCompuesta ? selectedCompuesta.label : "-"}
                </strong>
              </div>
              <div>
                Unidad de medida:{" "}
                <strong className="text-secondary">
                  {data ? data.result.name : "-"}
                </strong>
              </div>
              <small>
                Los campos marcados con (
                <span className="text-destructive">*</span>) son obligatorios
              </small>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="newMeasurement"
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-h-full space-y-8"
            >
              <Tabs defaultValue="account" className="min-h-full w-full">
                <TabsList
                  defaultValue="identificacion"
                  className="grid w-full grid-cols-5"
                >
                  <TabsTrigger value="identificacion">
                    Identificación
                  </TabsTrigger>
                  <TabsTrigger value="cadenamientos">Cadenamientos</TabsTrigger>
                  <TabsTrigger value="deterioros">Deterioros</TabsTrigger>
                  <TabsTrigger value="actuacion">Actuación</TabsTrigger>
                  <TabsTrigger value="calculos">Cálculos</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="identificacion"
                  className="grid min-h-full grid-cols-2 gap-4"
                >
                  <FormField
                    name=""
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidad </FormLabel>
                        <Select
                          disabled
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={especialidad.label} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={especialidad.value.toString()}>
                              {especialidad.label}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fechaEstudioPrevio"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="pb-[6px] pt-1">
                          Fecha estudio previo{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
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
                                  <span>Escoje una fecha válida</span>
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                        <FormLabel>
                          Tramo <span className="text-destructive">*</span>{" "}
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setValue("entronque", "")
                            field.onChange(value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un tramo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tramos.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
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
                        <FormLabel>
                          Entronque <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          disabled={!selectedTramo}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un tramo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredEntronques.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
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
                        <FormLabel>
                          Gaza <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione gaza" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {gazas.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
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
                        <FormLabel>
                          Carril <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione carril" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {carriles.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent
                  value="cadenamientos"
                  className="grid min-h-full grid-cols-2 gap-4"
                >
                  <FormField
                    control={form.control}
                    name="cadenamientoInicial"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Cadenamiento Inicial{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          Cadenamiento Final{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          Deterioros <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <RoadSurfaceDamages
                            deterioros={deterioros}
                            deteriorosSelected={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent
                  value="actuacion"
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="actuacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Actuación{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              setValue("compuesta", "")
                              field.onChange(value)
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciones actuación" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {actuaciones.map((item) => (
                                <SelectItem
                                  key={item.value}
                                  value={item.value.toString()}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />{" "}
                    <FormField
                      control={form.control}
                      name="compuesta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Compuesta{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            disabled={!selectedActuacion}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione unidad compuesta" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {filteredCompuestas.map((item) => (
                                <SelectItem
                                  key={item.value}
                                  value={item.value.toString()}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />{" "}
                    <FormField
                      control={form.control}
                      name="prioridad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Prioridad{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione prioridad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {prioridades.map((item) => (
                                <SelectItem
                                  key={item.value}
                                  value={item.value.toString()}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="observacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent
                  value="calculos"
                  className="grid min-h-full grid-cols-4 gap-4"
                >
                  <FormField
                    control={form.control}
                    name="porcentajeAfectacion"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>% de Afectación (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min={0}
                              max={100}
                              {...field}
                              className={cn(
                                errors.porcentajeAfectacion
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
                    name="longitud"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Longitud (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              disabled
                              {...field}
                              className={cn(
                                "bg-slate-400",
                                errors.longitud
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
                    name="ancho"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Ancho (m)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className={cn(
                                errors.ancho
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
                    name="area"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Area (m2)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              disabled
                              {...field}
                              className={cn(
                                data && data.result.code === "m2"
                                  ? "border-4 border-secondary"
                                  : "",
                                "bg-slate-400",
                                errors.area
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
                    name="espesor"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Espesor (cm)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder=""
                              {...field}
                              className={cn(
                                errors.espesor
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
                    name="volumen"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Volúmen (m3)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              disabled
                              {...field}
                              className={cn(
                                "bg-slate-400",
                                errors.volumen
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
                    name="densidad"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Densidad (t/m3)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              min="0"
                              className={cn(
                                errors.densidad
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
                    name="masa"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>Masa (t)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              min="0"
                              disabled
                              className={cn(
                                "bg-slate-400",
                                errors.masa
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
                </TabsContent>
              </Tabs>
            </form>
          </Form>

          <DialogFooter className="flex w-full items-center justify-between">
            <Button type="submit" variant="secondary" form="newMeasurement">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
