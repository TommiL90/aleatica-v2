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

export default function MenuProyecto() {
  return (
    <div
      id="presupuesto"
      className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
    >
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaCogs
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/proyectos/nuevo"
              className="block font-semibold text-gray-900"
            >
              Nuevo Proyecto
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Crea nuevo proyecto</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaCogs
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/proyectos"
              className="block font-semibold text-gray-900"
            >
              Proyectos en desarrollo
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Listado de proyectos en desarrollo
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaCogs
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/proyectos"
              className="block font-semibold text-gray-900"
            >
              Proyectos cerrados
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Listado de proyectos cerrados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
