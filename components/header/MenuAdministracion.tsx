/* eslint-disable no-irregular-whitespace */
import { Link } from '@/navigation'
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
  handleMenuMaestroProyectosClick: Function
  handleMenuElementosCarreteraClick: Function
  handleMenuZonasGeograficasClick: Function
  menuMaestroProyectos: boolean
  menuElementosCarretera: boolean
  menuZonasGeograficas: boolean
}
export default function MenuAdministracion(props: Props) {
  const menuMaestroProyectosComponent = props.menuMaestroProyectos ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="overflow-y-scroll p-4" style={{ height: '430px' }}>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRegListAlt className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/unidades_negocios"
              className="block font-semibold text-gray-900"
            >
              Unidades de Negocio
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
              href="/maestros/categorias_proyecto"
              className="block font-semibold text-gray-900"
            >
              Categorías del Proyecto
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
              href="/maestros/categorias_actuacion"
              className="block font-semibold text-gray-900"
            >
              Categorías de Actuación
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
              href="/maestros/subcategorias_actuacion"
              className="block font-semibold text-gray-900"
            >
              Subcategorías de Actuación
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
              href="/maestros/especialidades_actuacion"
              className="block font-semibold text-gray-900"
            >
              Especialidades de Actuación
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
              href="/maestros/subespecialidades_actuacion"
              className="block font-semibold text-gray-900"
            >
              Subespecialidades de Actuación
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
              href="/maestros/unidad_obra"
              className="block font-semibold text-gray-900"
            >
              Unidad de obra
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
              href="/maestros/moneda"
              className="block font-semibold text-gray-900"
            >
              Moneda
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
              href="/maestros/seguimiento"
              className="block font-semibold text-gray-900"
            >
              Seguimiento
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
              href="/maestros/desempeno"
              className="block font-semibold text-gray-900"
            >
              Indicadores de desempeño
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
              href="/maestros/deterioros"
              className="block font-semibold text-gray-900"
            >
              Deterioros
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
              href="/maestros/udsimples"
              className="block font-semibold text-gray-900"
            >
              Unidades simples
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
              href="/maestros/udcompuestos"
              className="block font-semibold text-gray-900"
            >
              Unidades compuestas
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

  const menuElementosCarreteraComponent = props.menuElementosCarretera ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaStream className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/tramos"
              className="block font-semibold text-gray-900"
            >
              Tramos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWaveSquare className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/entronque"
              className="block font-semibold text-gray-900"
            >
              Entronque
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWater className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/gaza"
              className="block font-semibold text-gray-900"
            >
              Gaza
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWater className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/calzada"
              className="block font-semibold text-gray-900"
            >
              Calzada
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWind className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/carril"
              className="block font-semibold text-gray-900"
            >
              Carril
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWind className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/tca"
              className="block font-semibold text-gray-900"
            >
              Tramos de concentracion de accidentes
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

  const menuZonasGeograficasComponent = props.menuZonasGeograficas ? (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaStream className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/zonas_geograficas/pais"
              className="block font-semibold text-gray-900"
            >
              Pais
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Pais de la unidad de negocio</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWaveSquare className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/zonas_geograficas/zonas"
              className="block font-semibold text-gray-900"
            >
              Zonas geograficas
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Zonas geograficas de la unidad de negocio
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWater className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/zonas_geograficas/administracion"
              className="block font-semibold text-gray-900"
            >
              Administracion
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Administracion competente de la unidad de negocio
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div
      id="administracion"
      className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
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
              onClick={() => props.handleMenuMaestroProyectosClick()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Maestro de Proyectos
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
              Configurar datos maestros de un proyecto
            </p>
            {menuMaestroProyectosComponent}
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRoute
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <button
              type="button"
              onClick={() => props.handleMenuElementosCarreteraClick()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Elementos de la carretera
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
              Configurar datos maestros de carretera
            </p>
            {menuElementosCarreteraComponent}
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaMapMarkerAlt
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <button
              type="button"
              onClick={() => props.handleMenuZonasGeograficasClick()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Zonas Geográficas
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
              Configurar zonas para unidades de negocio
            </p>
            {menuZonasGeograficasComponent}
          </div>
        </div>
      </div>
    </div>
  )
}
