import React from "react"
import { FieldErrors, UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { NewStructureMeasurementEsp } from "./new-structure-measurament.modal"

interface NeoprenoSubFormProps {
  form: UseFormReturn<NewStructureMeasurementEsp>
  errors: FieldErrors<NewStructureMeasurementEsp>
}
const NeoprenoSubForm = ({ form, errors }: NeoprenoSubFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="noEje"
        render={({ field }) => {
          return (
            <FormItem className="w-full">
              <FormLabel>Nº de ejes (a gatear)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={cn(
                    errors.noEje ? "border-destructive text-sm font-medium" : ""
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
        name="noApoyos"
        render={({ field }) => {
          return (
            <FormItem className="w-full">
              <FormLabel>Nº apoyos afectados</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  disabled
                  {...field}
                  className={cn(
                    // data && data.result.code === "m2"
                    //   ? "border-4 border-secondary"
                    //   : "",
                    "bg-slate-400",
                    errors.area ? "border-destructive text-sm font-medium" : ""
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      {/* <FormField
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
      /> */}
    </>
  )
}

export default NeoprenoSubForm
