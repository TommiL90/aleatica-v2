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

export default function MenuCatalogosGlobales() {
  return (
    <div
      id="catalogos-globales"
      className="absolute -left-64 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
    >
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/maestros/subespecialidades_actuacion"
              className="block font-semibold text-gray-900"
            >
              Subespecialidades de Actuación
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Repositorio de subespecialidades de actuacion
            </p>
          </div>
        </div>

        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/catalogos/udsimples"
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
              href="/catalogos/udcompuestos"
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
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaWarehouse className="mr-5 text-green-500" />
          </div>
          <div className="flex-auto">
            <Link
              href="/catalogos/deterioros"
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
  )
}
