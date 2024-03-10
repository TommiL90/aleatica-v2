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
  handleMenuUnidadesNegocios: Function
  handleMenuMaestrosUnidadesNegocios: Function
  handleMenuInventarioTramo: Function
  handleMenuTCA: Function
  handleMenuIdentificadores: Function
  menuUnidadNegocios: boolean
  menuMaestrosUnidadesNegocios: boolean
  menuInventarioTramo: boolean
  menuTCA: boolean
  menuIdentificadores: boolean
}
export default function MenuDatosGenerales(props: Props) {
  const menuMaestroNegocioComponent = (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaStream className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/unidades_negocios"
              className="block font-semibold text-gray-900"
            >
              Ficha unidad de negocios
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Repositorio de unidad de negocios
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWaveSquare className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/desempeno"
              className="block font-semibold text-gray-900"
            >
              Indicadores MR
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
              href="/zonas_geograficas/pais"
              className="block font-semibold text-gray-900"
            >
              Pais
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
              href="/zonas_geograficas/zonas"
              className="block font-semibold text-gray-900"
            >
              Zonas geograficas
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
              href="/zonas_geograficas/administracion"
              className="block font-semibold text-gray-900"
            >
              Administracion competente
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Breve texto introductorio del menu
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const menuInventarioTramoComponent = (
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
            <p className="mt-1 text-gray-600">Inventario de tramos</p>
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
              Entronques
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Inventario de entronques</p>
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
              Gaza / Cuerpo
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Inventario de gazas / cuerpos</p>
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
            <p className="mt-1 text-gray-600">Inventario de calzadas</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWater className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/carril"
              className="block font-semibold text-gray-900"
            >
              Carril
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Inventario de carriles</p>
          </div>
        </div>
      </div>
    </div>
  )

  const menuTCAComponent = (
    <div className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaStream className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/elementos_carretera/tca"
              className="block font-semibold text-gray-900"
            >
              Catalogo de TCA
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Inventario de TCAs</p>
          </div>
        </div>
      </div>
    </div>
  )

  const menuUnidadNegocios = props.menuUnidadNegocios ? (
    <div
      id="unidadesNegocios"
      className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
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
              onClick={() => props.handleMenuMaestrosUnidadesNegocios()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Maestro unidad de negocios
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
              Informacion de unidad de negocios
            </p>
            {props.menuMaestrosUnidadesNegocios
              ? menuMaestroNegocioComponent
              : null}
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
              onClick={() => props.handleMenuInventarioTramo()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Inventario de tramos
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
            <p className="mt-1 text-gray-600">Datos de inventarios de tramos</p>
            {props.menuInventarioTramo ? menuInventarioTramoComponent : null}
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
              onClick={() => props.handleMenuTCA()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              TCA
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
              Tramos de concentracion de accidentes
            </p>
            {props.menuTCA ? menuTCAComponent : null}
          </div>
        </div>
      </div>
    </div>
  ) : null

  const menuIdentificadores = (
    <div
      className="absolute right-8 top-full z-10 mt-3 w-screen max-w-md overflow-y-auto rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
      style={{ maxHeight: 448 }}
    >
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/year"
              className="block font-semibold text-gray-900"
            >
              Anno
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Configuracion de annos de los proyectos
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaRegObjectGroup className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/formularios"
              className="block font-semibold text-gray-900"
            >
              Formularios de procesos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Repositorio de formularios de procesos
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
              Repositorio de categorías del Proyecto
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
              Repositorio de categorías de actuación
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
              Repositorio de subcategorías de actuación
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
              Repositorio de especialidades de actuación
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/ambito_actuacion"
              className="block font-semibold text-gray-900"
            >
              Ambito de Actuación
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Repositorio de ambitos de actuación
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
              Repositorio de unidades de obra
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
            <p className="mt-1 text-gray-600">Tipos de monedas</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/posicion"
              className="block font-semibold text-gray-900"
            >
              Posicion
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de posiciones</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/disposicion"
              className="block font-semibold text-gray-900"
            >
              Disposicion
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de disposiciones</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/lado"
              className="block font-semibold text-gray-900"
            >
              Lado
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de lados</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/calificacion"
              className="block font-semibold text-gray-900"
            >
              Calificacion
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de calificaciones</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/numero_estructura"
              className="block font-semibold text-gray-900"
            >
              Numero de estructuras
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Repositorio de numero de estructuras
            </p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/estructura"
              className="block font-semibold text-gray-900"
            >
              Tipo de estructura
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Repositorio de tipos de estructuras
            </p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/elemento"
              className="block font-semibold text-gray-900"
            >
              Elemento
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de elementos</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/eje"
              className="block font-semibold text-gray-900"
            >
              Eje
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de ejes</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/tipologia"
              className="block font-semibold text-gray-900"
            >
              Tipologia
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de tipologias</p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/prioridad"
              className="block font-semibold text-gray-900"
            >
              Prioridad
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Repositorio de prioridades</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div
      id="generales"
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
              onClick={() => props.handleMenuUnidadesNegocios()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Unidades de Negocios
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
              Informacion de unidad de negocios
            </p>
            {menuUnidadNegocios}
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
              onClick={() => props.handleMenuIdentificadores()}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Identificadores
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
              Principales indicadores del sistema
            </p>

            {props.menuIdentificadores ? menuIdentificadores : null}
          </div>
        </div>
      </div>
    </div>
  )
}
