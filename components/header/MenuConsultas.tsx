import Link from 'next/link'
import Image from 'next/image'
import React, { useState, MouseEvent, useEffect, useCallback } from 'react'
import {
  FaHome,
  FaCog,
  FaSitemap,
  FaCogs,
  FaCodeBranch,
  FaMapSigns,
  FaMapMarker,
  FaHandshake,
  FaFolder,
  FaServer,
  FaUser,
  FaInfoCircle,
  FaUsersCog,
  FaMapMarkerAlt,
  FaRoute,
  FaRegListAlt,
  FaRegObjectGroup,
  FaRegWindowRestore,
  FaWarehouse,
  FaStream,
  FaWaveSquare,
  FaWater,
  FaWind,
  FaLayerGroup,
} from 'react-icons/fa'

interface Props {
  handleMenuMedicionesClick: Function
  handleMenuPreciosPlanificacionClick: Function
  handleMenuPxQClick: Function
  handleMenuOtrasClick: Function
  menuMediciones: boolean
  menuPreciosPlanificacion: boolean
  menuPxQ: boolean
  menuOtros: boolean
}

export default function MenuConsultas(props: Props) {
  const menuMedicionesComponent = props.menuMediciones ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="overflow-y-scroll p-4" style={{ height: '430px' }}>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRegListAlt className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/mediciones/udsimples"
              className="block font-semibold text-gray-900"
            >
              Mediciones Resumen US
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaServer className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/mediciones/udcompuestas"
              className="block font-semibold text-gray-900"
            >
              Mediciones Resumen UC
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRegObjectGroup className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/mediciones/actuaciones"
              className="block font-semibold text-gray-900"
            >
              Mediciones resumen actuaciones
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRegWindowRestore className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/mediciones/actuaciones-uoc"
              className="block font-semibold text-gray-900"
            >
              Mediciones resumen Actuaciones vs UOC
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/mediciones/resumen_tramos"
              className="block font-semibold text-gray-900"
            >
              Mediciones resumen tramos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/mediciones/ficha_mediciones"
              className="block font-semibold text-gray-900"
            >
              Ficha de mediciones
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null

  const menuOtrasComponent = props.menuOtros ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRegListAlt className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/costos/proyecto"
              className="block font-semibold text-gray-900"
            >
              Costo de proyectos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaServer className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/costos/tareas"
              className="block font-semibold text-gray-900"
            >
              Proyectos por subcategoria
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null

  const menuPreciosPlanificacionComponent = props.menuPreciosPlanificacion ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/precios/udsimples"
              className="block font-semibold text-gray-900"
            >
              Precios unidades simples
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/precios/udcompuestas"
              className="block font-semibold text-gray-900"
            >
              Precios unidades compuestas
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null

  const menuPxQComponent = props.menuPxQ ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/pxq/udsimples"
              className="block font-semibold text-gray-900"
            >
              Presupuesto tecnico PxQ US
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/pxq/udcompuestas"
              className="block font-semibold text-gray-900"
            >
              Presupuesto tecnico PxQ UC
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/pxq/actuacion1"
              className="block font-semibold text-gray-900"
            >
              Presupuesto tecnico PxQ Actuaciones 1
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/pxq/actuacion2"
              className="block font-semibold text-gray-900"
            >
              Presupuesto tecnico PxQ Actuaciones 2
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/consultas/pxq/ratioP"
              className="block font-semibold text-gray-900"
            >
              Ratio promedio de actuaciones
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div
      id="consultas"
      className="absolute -left-64 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
    >
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaMapSigns
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <button
              type="button"
              onClick={() => props.handleMenuMedicionesClick()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Mediciones
              <svg
                className="h-5 w-5 flex-none text-gray-900"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <p className="mt-1 text-gray-600">
              Reportes preconfigurados de mediciones de proyecto
            </p>
            {menuMedicionesComponent}
          </div>
        </div>
        {/* <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <FaMapSigns size={25} className="text-green-500 hover:text-purple-400"/>
                    </div>
                    <div className="flex-auto">
                                                    
                        <button type="button" onClick={()=>props.handleMenuPreciosPlanificacionClick()} className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
                            Precios planificacion
                            <svg className="h-5 w-5 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <p className="mt-1 text-gray-600">Reportes preconfigurados de planificacion de precios de proyecto</p>
                        {menuPreciosPlanificacionComponent}
                    </div>
                                            
                </div> */}

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaMapSigns
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <button
              type="button"
              onClick={() => props.handleMenuPxQClick()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Presupuesto planificacion
              <svg
                className="h-5 w-5 flex-none text-gray-900"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <p className="mt-1 text-gray-600">
              Reportes preconfigurados de planificacion de precios de proyecto
            </p>
            {menuPxQComponent}
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaMapSigns
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <button
              type="button"
              onClick={() => props.handleMenuOtrasClick()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Otras consultas
              <svg
                className="h-5 w-5 flex-none text-gray-900"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <p className="mt-1 text-gray-600">
              Reportes dinámicos por proyecto de presupuesto
            </p>
            {menuOtrasComponent}
          </div>
        </div>
      </div>
    </div>
  )
}
