import React from "react"

import { cn } from "@/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const JuntasSubForm = () => {
  return (
    <>
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
                    errors.ancho ? "border-destructive text-sm font-medium" : ""
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
                    errors.area ? "border-destructive text-sm font-medium" : ""
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
                    errors.masa ? "border-destructive text-sm font-medium" : ""
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}

export default JuntasSubForm
