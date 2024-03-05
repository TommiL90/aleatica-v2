/* eslint-disable no-irregular-whitespace */
'use client'
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
import MenuProyecto from './MenuProyecto'
import MenuAdministracion from './MenuAdministracion'
import MenuConsultas from './MenuConsultas'
import MenuUsuario from './MenuUsuario'
import MenuDatosGenerales from './MenuDatosGenerales'
import MenuCatalogosGlobales from './MenuCatalogosGlobales'

export default function Header() {
  const [menuProyecto, setMenuProyecto] = useState(false)

  const [menuDatosGenerales, setMenuDatosGenerales] = useState(false)
  const [menuUnidadNegocios, setMenuUnidadNegocios] = useState(false)
  const [menuMaestrosUnidadesNegocios, setMenuMaestrosUnidadesNegocios] =
    useState(false)
  const [menuInventarioTramos, setMenuInventarioTramos] = useState(false)
  const [menuTCA, setMenuTCA] = useState(false)
  const [menuIdentificadores, setMenuIdentificadores] = useState(false)

  const [menuCatalogosGlobales, setMenuCatalogosGlobales] = useState(false)
  const [menuElementosCarretera, setMenuElementosCarretera] = useState(false)
  const [menuUsuario, setMenuUsuario] = useState(false)
  const [menuMaestroProyectos, setMenuMaestroProyectos] = useState(false)
  const [menuDocPlantillas, setMenuDocPlantillas] = useState(false)
  const [menuConsultas, setMenuConsultas] = useState(false)

  const [menuOtros, setMenuOtros] = useState(false)
  const [menuZonasGeograficas, setMenuZonasGeograficas] = useState(false)

  const [menuMediciones, setMenuMediciones] = useState(false)
  const [menuPreciosPlanificacion, setMenuPreciosPlanificacion] =
    useState(false)
  const [menuPxQ, setMenuPxQ] = useState(false)

  /** ********* Estados de la vista mobile y tablet********* */

  const [menuDialogMobile, setMenuDialogMobile] = useState(false)

  const [menuProyectoMobile, setMenuProyectoMobile] = useState(false)
  const [menuDatosGeneralesMobile, setMenuDatosGeneralesMobile] =
    useState(false)
  const [menuUnidadNegociosMobile, setMenuUnidadNegociosMobile] =
    useState(false)

  const [
    menuMaestrosUnidadesNegociosMobile,
    setMenuMaestrosUnidadesNegociosMobile,
  ] = useState(false)
  const [menuInventarioTramosMobile, setMenuInventarioTramosMobile] =
    useState(false)
  const [menuTCAMobile, setMenuTCAMobile] = useState(false)
  const [menuIdentificadoresMobile, setMenuIdentificadoresMobile] =
    useState(false)

  const [menuCatalogosGlobalesMobile, setMenuCatalogosGlobalesMobile] =
    useState(false)
  const [menuElementosCarreteraMobile, setMenuElementosCarreteraMobile] =
    useState(false)
  const [menuUsuarioMobile, setMenuUsuarioMobile] = useState(false)
  const [menuMaestroProyectosMobile, setMenuMaestroProyectosMobile] =
    useState(false)

  const [menuMedicionesMobile, setMenuMedicionesMobile] = useState(false)
  const [menuOtrosMobile, setMenuOtrosMobile] = useState(false)
  const [menuZonasGeograficasMobile, setMenuZonasGeograficasMobile] =
    useState(false)

  const [menuConsultasMobile, setMenuConsultasMobile] = useState(false)

  const [menuPreciosPlanificacionMobile, setMenuPreciosPlanificacionMobile] =
    useState(false)
  const [menuPxQMobile, setMenuPxQMobile] = useState(false)
  /** ************************************************************ */

  const handleClickOutside = useCallback(
    (event: any) => {
      if (menuProyecto && !event.target.closest('#presupuesto')) {
        setMenuProyecto(false)
      }
    },
    [menuProyecto],
  )

  const handleCatalogosGlobalesClickOutside = useCallback(
    (event: any) => {
      if (
        menuCatalogosGlobales &&
        !event.target.closest('#catalogos-globales')
      ) {
        setMenuCatalogosGlobales(false)
      }
    },
    [menuCatalogosGlobales],
  )
  const handleDatosGeneralesClickOutside = useCallback(
    (event: any) => {
      if (menuDatosGenerales && !event.target.closest('#generales')) {
        setMenuDatosGenerales(false)
      }
    },
    [menuDatosGenerales],
  )

  const handleUsuarioClickOutside = useCallback(
    (event: any) => {
      if (menuUsuario && !event.target.closest('#usuario')) {
        setMenuUsuario(false)
      }
    },
    [menuUsuario],
  )

  const handleConsultasClickOutside = useCallback(
    (event: any) => {
      if (menuConsultas && !event.target.closest('#consultas')) {
        setMenuConsultas(false)
      }
    },
    [menuConsultas],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mousedown', handleDatosGeneralesClickOutside)
    document.addEventListener('mousedown', handleCatalogosGlobalesClickOutside)
    document.addEventListener('mousedown', handleUsuarioClickOutside)
    document.addEventListener('mousedown', handleConsultasClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener(
        'mousedown',
        handleDatosGeneralesClickOutside,
      )
      document.removeEventListener(
        'mousedown',
        handleCatalogosGlobalesClickOutside,
      )
      document.removeEventListener('mousedown', handleUsuarioClickOutside)
      document.removeEventListener('mousedown', handleConsultasClickOutside)
    }
  }, [
    handleClickOutside,
    handleDatosGeneralesClickOutside,
    handleCatalogosGlobalesClickOutside,
    handleUsuarioClickOutside,
    handleConsultasClickOutside,
    menuDatosGenerales,
    menuCatalogosGlobales,
    menuProyecto,
    menuUsuario,
    menuConsultas,
  ])

  const handlemenuProyectoClick = (event: MouseEvent) => {
    setMenuProyecto(!menuProyecto)
    setMenuConsultas(false)
    setMenuCatalogosGlobales(false)
    setMenuUsuario(false)
    setMenuMaestroProyectos(false)
    setMenuElementosCarretera(false)
    setMenuDocPlantillas(false)
    setMenuZonasGeograficas(false)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuDatosGeneralesClick = (event: MouseEvent) => {
    setMenuDatosGenerales(!menuDatosGenerales)
  }

  const handleMenuUnidadesNegociosClick = (event: MouseEvent) => {
    setMenuUnidadNegocios(!menuUnidadNegocios)
    setMenuIdentificadores(false)
    setMenuMaestrosUnidadesNegocios(false)
    setMenuInventarioTramos(false)
    setMenuTCA(false)
  }

  const handleMenuMaestrosUnidadesNegociosClick = () => {
    setMenuMaestrosUnidadesNegocios(!menuMaestrosUnidadesNegocios)
    setMenuInventarioTramos(false)
    setMenuTCA(false)
  }

  const handleMenuInventarioTramoClick = () => {
    setMenuInventarioTramos(!menuInventarioTramos)
    setMenuMaestrosUnidadesNegocios(false)
    setMenuTCA(false)
  }

  const handleMenuTCAClick = () => {
    setMenuTCA(!menuTCA)
    setMenuMaestrosUnidadesNegocios(false)
    setMenuInventarioTramos(false)
  }

  const handleMenuIdentificadoresClick = () => {
    setMenuIdentificadores(!menuIdentificadores)
    setMenuUnidadNegocios(false)
  }

  const handleMenuCatalogosGlobalesClick = (event: MouseEvent) => {
    setMenuCatalogosGlobales(!menuCatalogosGlobales)
    setMenuProyecto(false)
    setMenuUsuario(false)
    // setMenuAdministracion(false);
    setMenuConsultas(false)
    setMenuZonasGeograficas(false)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuUsuarioClick = (event: MouseEvent) => {
    setMenuUsuario(!menuUsuario)
    setMenuConsultas(false)
    setMenuCatalogosGlobales(false)
    setMenuProyecto(false)
    setMenuMaestroProyectos(false)
    setMenuElementosCarretera(false)
    setMenuDocPlantillas(false)
    setMenuZonasGeograficas(false)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuConsultasClick = (event: MouseEvent) => {
    setMenuConsultas(!menuConsultas)
    setMenuMediciones(false)
    setMenuOtros(false)
    setMenuCatalogosGlobales(false)
    setMenuProyecto(false)
    setMenuMaestroProyectos(false)
    setMenuElementosCarretera(false)
    setMenuDocPlantillas(false)
    setMenuZonasGeograficas(false)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuMaestroProyectosClick = (event: MouseEvent) => {
    setMenuMaestroProyectos(!menuMaestroProyectos)
    setMenuElementosCarretera(false)
    setMenuDocPlantillas(false)
    setMenuZonasGeograficas(false)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuMedicionesClick = (event: MouseEvent) => {
    setMenuMediciones(!menuMediciones)

    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuPreciosPlanificacionClick = (event: MouseEvent) => {
    setMenuPreciosPlanificacion(!menuPreciosPlanificacion)

    setMenuMediciones(false)
    setMenuPxQ(false)
    setMenuOtros(false)
  }

  const handleMenuPxQClick = (event: MouseEvent) => {
    setMenuPxQ(!menuPxQ)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuOtros(false)
  }

  const handleMenuOtrasClick = (event: MouseEvent) => {
    setMenuOtros(!menuOtros)

    setMenuMediciones(false)
    setMenuPreciosPlanificacion(false)
    setMenuPxQ(false)
  }

  const handleMenuElementosCarreteraClick = (event: MouseEvent) => {
    setMenuElementosCarretera(!menuElementosCarretera)
    setMenuDocPlantillas(false)
    setMenuMaestroProyectos(false)
    setMenuZonasGeograficas(false)
  }

  const handleMenuZonasGeograficasClick = (event: MouseEvent) => {
    setMenuZonasGeograficas(!menuZonasGeograficas)
    setMenuDocPlantillas(false)
    setMenuMaestroProyectos(false)
    setMenuElementosCarretera(false)
  }

  const handleMenuDialogMobileClick = (event: MouseEvent) => {
    setMenuDialogMobile(!menuDialogMobile)
  }

  const handlemenuProyectoMobileClick = (event: MouseEvent) => {
    setMenuProyectoMobile(!menuProyectoMobile)
  }

  const handleDatosGeneralesMobileClick = (event: MouseEvent) => {
    setMenuDatosGeneralesMobile(!menuDatosGeneralesMobile)
  }

  const handleMenuCatalogosGlobalesMobileClick = () => {
    setMenuCatalogosGlobalesMobile(!menuCatalogosGlobalesMobile)
  }

  const handleUnidadesNegociosMobileClick = (event: MouseEvent) => {
    setMenuUnidadNegociosMobile(!menuUnidadNegociosMobile)
  }

  const handleMenuMaestrosUnidadesNegociosMobileClick = (event: MouseEvent) => {
    setMenuMaestrosUnidadesNegociosMobile(!menuMaestrosUnidadesNegociosMobile)
  }

  const handleMenuInventarioTramosMobileClick = (event: MouseEvent) => {
    setMenuInventarioTramosMobile(!menuInventarioTramosMobile)
  }

  const handleMenuTCAMobileClick = (event: MouseEvent) => {
    setMenuTCAMobile(!menuTCAMobile)
  }

  const handlemenuIdentificadoresMobileClick = (event: MouseEvent) => {
    setMenuIdentificadoresMobile(!menuIdentificadoresMobile)
  }

  const handleMenuUsuarioMobileClick = (event: MouseEvent) => {
    setMenuUsuarioMobile(!menuUsuarioMobile)
  }

  const handleMenuConsultasMobileClick = (event: MouseEvent) => {
    setMenuConsultasMobile(!menuConsultasMobile)
  }

  const handleMenuMedicionesMobileClick = (event: MouseEvent) => {
    setMenuMedicionesMobile(!menuMedicionesMobile)
  }

  const handleMenuPreciosPlanificacionMobileClick = (event: MouseEvent) => {
    setMenuPreciosPlanificacionMobile(!menuPreciosPlanificacionMobile)
  }

  const handleMenuPxQMobileClick = (event: MouseEvent) => {
    setMenuPxQMobile(!menuPxQMobile)
  }

  const handleMenuOtrosMobileClick = (event: MouseEvent) => {
    setMenuOtrosMobile(!menuOtrosMobile)
  }

  const handleMenuMaestroProyectosMobileClick = (event: MouseEvent) => {
    setMenuMaestroProyectosMobile(!menuMaestroProyectosMobile)
  }

  const handleMenuElementoCarreteraMobileClick = (event: MouseEvent) => {
    setMenuElementosCarreteraMobile(!menuElementosCarreteraMobile)
  }

  const handleMenuZonasGeograficasMobileClick = (event: MouseEvent) => {
    setMenuZonasGeograficasMobile(!menuZonasGeograficasMobile)
  }

  return (
    <header className="relative z-20 bg-green-400">
      <nav
        className="flex w-full items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              src="/images/logo.svg"
              alt="logo"
              className="h-11 "
              height={64}
              width={256}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={handleMenuDialogMobileClick}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden items-center justify-center lg:flex lg:gap-x-12">
          <Link
            href="/dashboard"
            className="text-sm font-semibold leading-6 text-white"
          >
            Panel
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={handleMenuDatosGeneralesClick}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              aria-expanded="false"
            >
              Datos Generales
              <svg
                className="h-5 w-5 flex-none text-white"
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
            {menuDatosGenerales ? (
              <MenuDatosGenerales
                handleMenuUnidadesNegocios={handleMenuUnidadesNegociosClick}
                handleMenuMaestrosUnidadesNegocios={
                  handleMenuMaestrosUnidadesNegociosClick
                }
                handleMenuInventarioTramo={handleMenuInventarioTramoClick}
                handleMenuTCA={handleMenuTCAClick}
                handleMenuIdentificadores={handleMenuIdentificadoresClick}
                menuUnidadNegocios={menuUnidadNegocios}
                menuMaestrosUnidadesNegocios={menuMaestrosUnidadesNegocios}
                menuInventarioTramo={menuInventarioTramos}
                menuTCA={menuTCA}
                menuIdentificadores={menuIdentificadores}
              />
            ) : null}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={handlemenuProyectoClick}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              aria-expanded="false"
            >
              Proyectos
              <svg
                className="h-5 w-5 flex-none text-white"
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
            {menuProyecto ? <MenuProyecto /> : null}
          </div>

          {/** ** menu administracion** */}
          <div className="relative">
            <button
              type="button"
              onClick={handleMenuCatalogosGlobalesClick}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              aria-expanded="false"
            >
              Catalogos Globales
              <svg
                className="h-5 w-5 flex-none text-white"
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
            {menuCatalogosGlobales ? <MenuCatalogosGlobales /> : null}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={handleMenuConsultasClick}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              aria-expanded="false"
            >
              Consultas y Reportes
              <svg
                className="h-5 w-5 flex-none text-white"
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
            {menuConsultas ? (
              <MenuConsultas
                handleMenuMedicionesClick={handleMenuMedicionesClick}
                handleMenuPreciosPlanificacionClick={
                  handleMenuPreciosPlanificacionClick
                }
                handleMenuPxQClick={handleMenuPxQClick}
                handleMenuOtrasClick={handleMenuOtrasClick}
                menuMediciones={menuMediciones}
                menuPreciosPlanificacion={menuPreciosPlanificacion}
                menuPxQ={menuPxQ}
                menuOtros={menuOtros}
              />
            ) : null}
          </div>
          {/** ** menu usuario** */}
          <div className="relative">
            <button
              type="button"
              onClick={handleMenuUsuarioClick}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
              aria-expanded="false"
            >
              Usuario
              <svg
                className="h-5 w-5 flex-none text-white"
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
            {menuUsuario ? <MenuUsuario /> : null}
          </div>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Documentacion
          </a>
        </div>
      </nav>

      {menuDialogMobile ? (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  src="/images/logo-mobile.svg"
                  alt="logo"
                  className="h-8 w-auto"
                  height={64}
                  width={256}
                />
              </Link>
              <button
                type="button"
                onClick={handleMenuDialogMobileClick}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/dashboard"
                    className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <FaHome className="mr-5 text-green-500" /> Panel
                  </Link>

                  <div className="-mx-3">
                    <button
                      type="button"
                      onClick={handleDatosGeneralesMobileClick}
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      <span className="flex items-center ">
                        <FaCog className="mr-5 text-green-500" />
                        Datos Generales
                      </span>
                      <svg
                        className="h-5 w-5 flex-none"
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

                    {menuDatosGeneralesMobile ? (
                      <div className="mt-1 space-y-1" id="disclosure-1">
                        <div className="px-3">
                          <button
                            type="button"
                            onClick={handleUnidadesNegociosMobileClick}
                            className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            aria-controls="disclosure-1"
                            aria-expanded="false"
                          >
                            <span className="flex items-center">
                              <FaMapSigns className="mr-5 text-green-500" />
                              Unidades de Negocios
                            </span>
                            <svg
                              className="h-5 w-5 flex-none"
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
                          {menuUnidadNegociosMobile ? (
                            <>
                              <div className="px-3">
                                <button
                                  type="button"
                                  onClick={
                                    handleMenuMaestroProyectosMobileClick
                                  }
                                  className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  aria-controls="disclosure-1"
                                  aria-expanded="false"
                                >
                                  <span className="flex items-center">
                                    <FaMapSigns className="mr-5 text-green-500" />
                                    Maestro Unidad de negocios
                                  </span>
                                  <svg
                                    className="h-5 w-5 flex-none"
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

                                {menuMaestroProyectosMobile ? (
                                  <div
                                    className="mt-2 space-y-2"
                                    id="disclosure-1"
                                  >
                                    <Link
                                      href="/maestros/unidades_negocios"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Ficha Unidad de Negocio
                                    </Link>
                                    <Link
                                      href="/maestros/desempeno"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Indicadores MR
                                    </Link>
                                    <Link
                                      href="/zonas_geograficas/pais"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Pais
                                    </Link>
                                    <Link
                                      href="/zonas_geograficas/zonas"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Zonas geograficas
                                    </Link>
                                    <Link
                                      href="/zonas_geograficas/administracion"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Administracion competente
                                    </Link>
                                    {/* 
                                                                                        <Link href="/maestros/categorias_proyecto" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Categorías del Proyecto</Link>
                                                                                        <Link href="/maestros/categorias_actuacion" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Categorías de Actuación</Link>
                                                                                        <Link href="/maestros/subcategorias_actuacion" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Subcategorías de Actuación</Link>
                                                                                        <Link href="/maestros/especialidades_actuacion" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Especialidades de Actuación</Link>
                                                                                        <Link href="/maestros/subespecialidades_actuacion" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Subespecialidades de Actuación</Link>
                                                                                        <Link href="/maestros/unidad_obra" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Unidad de obra</Link>
                                                                                        
                                                                                        <Link href="/maestros/moneda" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Moneda</Link>
                                                                                        <Link href="/maestros/seguimiento" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Seguimiento</Link>
                                                                                        <Link href="/maestros/deterioros" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Deterioros</Link>
                                                                                        <Link href="/maestros/udsimples" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Unidades simples</Link>
                                                                                        <Link href="/maestros/udcompuestos" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Unidades compuestas</Link> */}
                                  </div>
                                ) : null}
                              </div>
                              <div className="px-3">
                                <button
                                  type="button"
                                  onClick={
                                    handleMenuInventarioTramosMobileClick
                                  }
                                  className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  aria-controls="disclosure-1"
                                  aria-expanded="false"
                                >
                                  <span className="flex items-center">
                                    <FaMapSigns className="mr-5 text-green-500" />
                                    Inventario de tramos
                                  </span>
                                  <svg
                                    className="h-5 w-5 flex-none"
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
                                {menuInventarioTramosMobile ? (
                                  <div
                                    className="mt-2 space-y-2"
                                    id="disclosure-1"
                                  >
                                    <Link
                                      href="/elementos_carretera/tramos"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Tramos
                                    </Link>
                                    <Link
                                      href="/elementos_carretera/entronque"
                                      className="block rounded-lg pl-10  text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Entronque
                                    </Link>
                                    <Link
                                      href="/elementos_carretera/gaza"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Gaza / Cuerpo
                                    </Link>
                                    <Link
                                      href="/elementos_carretera/calzada"
                                      className="block rounded-lg pl-10  text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Calzada
                                    </Link>
                                    <Link
                                      href="/elementos_carretera/carril"
                                      className="block rounded-lg pl-10  text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Carril
                                    </Link>
                                  </div>
                                ) : null}
                              </div>
                              <div className="px-3">
                                <button
                                  type="button"
                                  onClick={handleMenuTCAMobileClick}
                                  className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  aria-controls="disclosure-1"
                                  aria-expanded="false"
                                >
                                  <span className="flex items-center">
                                    <FaMapSigns className="mr-5 text-green-500" />
                                    TCA
                                  </span>
                                  <svg
                                    className="h-5 w-5 flex-none"
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

                                {menuTCAMobile ? (
                                  <div
                                    className="mt-2 space-y-2"
                                    id="disclosure-1"
                                  >
                                    <Link
                                      href="/elementos_carretera/tca"
                                      className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      TCA
                                    </Link>
                                  </div>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                        </div>
                        <div className="px-3">
                          <button
                            type="button"
                            onClick={handlemenuIdentificadoresMobileClick}
                            className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            aria-controls="disclosure-1"
                            aria-expanded="false"
                          >
                            <span className="flex items-center">
                              <FaMapSigns className="mr-5 text-green-500" />
                              Identificadores
                            </span>
                            <svg
                              className="h-5 w-5 flex-none"
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
                          {menuIdentificadoresMobile ? (
                            <div className="mt-2 space-y-2" id="disclosure-1">
                              <Link
                                href="/maestros/categorias_proyecto"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Categorías del Proyecto
                              </Link>
                              <Link
                                href="/maestros/categorias_actuacion"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Categorías de Actuación
                              </Link>
                              <Link
                                href="/maestros/subcategorias_actuacion"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Subcategorías de Actuación
                              </Link>
                              <Link
                                href="/maestros/especialidades_actuacion"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Especialidades de Actuación
                              </Link>

                              <Link
                                href="/maestros/unidad_obra"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Unidad de obra
                              </Link>
                              <Link
                                href="/maestros/ambito"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Ambito de actuacion
                              </Link>
                              <Link
                                href="/maestros/moneda"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Moneda
                              </Link>

                              <Link
                                href="/maestros/posicion"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Posicion
                              </Link>
                              <Link
                                href="/maestros/disposicion"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Disposicion
                              </Link>
                              <Link
                                href="/maestros/lado"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Lado
                              </Link>
                              <Link
                                href="/maestros/calificacion"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Calificacion
                              </Link>
                              <Link
                                href="/maestros/numero_estructura"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Numero de estructuras
                              </Link>
                              <Link
                                href="/maestros/estructura"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Tipo de estructura
                              </Link>
                              <Link
                                href="/maestros/elemento"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Elemento
                              </Link>

                              <Link
                                href="/maestros/eje"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Eje
                              </Link>
                              <Link
                                href="/maestros/tipologia"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Tipologia
                              </Link>
                              <Link
                                href="/maestros/prioridad"
                                className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Prioridad
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="-mx-3">
                    <button
                      type="button"
                      onClick={handlemenuProyectoMobileClick}
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      <span className="flex items-center ">
                        <FaCog className="mr-5 text-green-500" />
                        Proyectos
                      </span>
                      <svg
                        className="h-5 w-5 flex-none"
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

                    {menuProyectoMobile ? (
                      <div className="mt-2 space-y-2" id="disclosure-1">
                        <Link
                          href="/proyectos"
                          className="flex items-center  rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          <FaCogs className="mr-5 text-green-500" />
                          Proyecto de presupuesto
                        </Link>
                        <Link
                          href="/ficha_tecnica"
                          className="flex items-center  rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          <FaCogs className="mr-5 text-green-500" />
                          Ficha tecnica
                        </Link>
                        <Link
                          href="/presupuestos_aprobados"
                          className="flex items-center  rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          <FaCogs className="mr-5 text-green-500" />
                          Presupuestos aprobados
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  <div className="-mx-3">
                    <button
                      type="button"
                      onClick={handleMenuCatalogosGlobalesMobileClick}
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      <span className="flex items-center ">
                        <FaSitemap className="mr-5 text-green-500" />
                        Catalogos Globales
                      </span>

                      <svg
                        className="h-5 w-5 flex-none"
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

                    {menuCatalogosGlobalesMobile ? (
                      <div className="mt-2 space-y-2" id="disclosure-1">
                        <Link
                          href="/maestros/subespecialidades_actuacion"
                          className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Subespecialidades de Actuación
                        </Link>
                        <Link
                          href="/maestros/udsimples"
                          className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Unidades simples
                        </Link>
                        <Link
                          href="/maestros/udcompuestos"
                          className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Unidades compuestas
                        </Link>
                        <Link
                          href="/maestros/deterioros"
                          className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Deterioros
                        </Link>
                        <Link
                          href="/precios/udsimples"
                          className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Precios de unidades simples
                        </Link>
                        <Link
                          href="/precios/udcompuestas"
                          className="block rounded-lg pl-10 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Precios de unidades compuestas
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  <div className="-mx-3">
                    <button
                      type="button"
                      onClick={handleMenuConsultasMobileClick}
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      <span className="flex items-center">
                        <FaUser className="mr-5 text-green-500" />
                        Consultas y Reportes
                      </span>
                      <svg
                        className="h-5 w-5 flex-none"
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
                    {menuConsultasMobile ? (
                      <div className="mt-1 space-y-1" id="disclosure-1">
                        <div className="px-3">
                          <button
                            type="button"
                            onClick={handleMenuMedicionesMobileClick}
                            className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            aria-controls="disclosure-1"
                            aria-expanded="false"
                          >
                            <span className="flex items-center">
                              <FaMapSigns className="mr-5 text-green-500" />
                              Mediciones
                            </span>
                            <svg
                              className="h-5 w-5 flex-none"
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
                          {menuMedicionesMobile ? (
                            <div className="mt-2 space-y-2" id="disclosure-1">
                              <Link
                                href="/consultas/mediciones/udsimples"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Mediciones resumen US
                              </Link>
                              <Link
                                href="/consultas/mediciones/udcompuestas"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Mediciones resumen UC
                              </Link>
                              <Link
                                href="/consultas/mediciones/actuaciones"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Mediciones resumen actuaciones
                              </Link>
                              <Link
                                href="/consultas/mediciones/actuaciones-uoc"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Mediciones resumen actuaciones vs UOC
                              </Link>
                              <Link
                                href="/consultas/mediciones/resumen_tramos"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Mediciones resumen tramos
                              </Link>
                              <Link
                                href="/consultas/mediciones/ficha_mediciones"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Resumen ficha mediciones
                              </Link>
                            </div>
                          ) : null}
                        </div>
                        {/* <div className="px-3">
                                                                <button type="button" onClick={handleMenuPreciosPlanificacionMobileClick} className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50" aria-controls="disclosure-1" aria-expanded="false">
                                                                    <span className="flex items-center">
                                                                        <FaMapSigns className="mr-5 text-green-500" />
                                                                        Precios planificacion
                                                                    </span>
                                                                    <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                                {
                                                                    menuPreciosPlanificacionMobile ? (
                                                                        <div className="mt-2 space-y-2" id="disclosure-1">
                                                                            <Link href="/precios/udsimples" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Precios unidades simples</Link>
                                                                            <Link href="/precios/udcompuestas" className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50">Precios unidades compuestas</Link>

                                                                        </div>

                                                                    ) : null
                                                                }
                                                            </div> */}
                        <div className="px-3">
                          <button
                            type="button"
                            onClick={handleMenuPxQMobileClick}
                            className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            aria-controls="disclosure-1"
                            aria-expanded="false"
                          >
                            <span className="flex items-center">
                              <FaMapSigns className="mr-5 text-green-500" />
                              Presupuesto planificacion
                            </span>
                            <svg
                              className="h-5 w-5 flex-none"
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
                          {menuPxQMobile ? (
                            <div className="mt-2 space-y-2" id="disclosure-1">
                              <Link
                                href="/consultas/pxq/udsimples"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Presupuesto tecnico PxQ US
                              </Link>
                              <Link
                                href="/consultas/pxq/udcompuestas"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Presupuesto tecnico PxQ UC
                              </Link>
                              <Link
                                href="/consultas/pxq/actuacion1"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Presupuesto tecnico PxQ Actuaciones 1
                              </Link>
                              <Link
                                href="/consultas/pxq/actuacion2"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Presupuesto tecnico PxQ Actuaciones 2
                              </Link>
                              <Link
                                href="/consultas/pxq/ratioP"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Ratio promedio de actuaciones
                              </Link>
                            </div>
                          ) : null}
                        </div>
                        <div className="px-3">
                          <button
                            type="button"
                            onClick={handleMenuOtrosMobileClick}
                            className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            aria-controls="disclosure-1"
                            aria-expanded="false"
                          >
                            <span className="flex items-center">
                              <FaMapSigns className="mr-5 text-green-500" />
                              Otras consultas
                            </span>
                            <svg
                              className="h-5 w-5 flex-none"
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
                          {menuOtrosMobile ? (
                            <div className="mt-2 space-y-2" id="disclosure-1">
                              <Link
                                href="/consultas/costos/proyecto"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Costo de proyectos
                              </Link>
                              <Link
                                href="/consultas/costos/tareas"
                                className="block rounded-lg py-2 pl-6 pr-3 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                Proyecto por subcategoria
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="-mx-3">
                    <button
                      type="button"
                      onClick={handleMenuUsuarioMobileClick}
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      <span className="flex items-center">
                        <FaUser className="mr-5 text-green-500" />
                        Usuario
                      </span>
                      <svg
                        className="h-5 w-5 flex-none"
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
                    {menuUsuarioMobile ? (
                      <div className="mt-2 space-y-2" id="disclosure-1">
                        <a
                          href="#"
                          className="flex items-center rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          <FaUsersCog className="mr-5 text-green-500" />
                          Perfil
                        </a>
                      </div>
                    ) : null}
                  </div>
                  <a
                    href="#"
                    className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <FaInfoCircle className="mr-5 text-green-500" />
                    Documentacion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
