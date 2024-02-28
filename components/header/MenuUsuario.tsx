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

export default function MenuUsuario() {
  return (
    <div
      id="usuario"
      className="absolute -left-64 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
    >
      <div className="p-4">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <a
              href="/usuarios/perfil"
              className="block font-semibold text-gray-900"
            >
              Mi perfil
              <span className="absolute inset-0"></span>
            </a>
            <p className="mt-1 text-gray-600">Configurar mi cuenta de usario</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/usuarios"
              className="block font-semibold text-gray-900"
            >
              Configuracion de usuarios
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Defina usaurios y sus privilegios
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/usuarios/roles"
              className="block font-semibold text-gray-900"
            >
              Roles
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Configuracion de roles</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/usuarios/permisos"
              className="block font-semibold text-gray-900"
            >
              Permisos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Configuracion de permisos</p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/usuarios/departamentos"
              className="block font-semibold text-gray-900"
            >
              Departamentos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Lista de departamentos de la organizacion
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/usuarios/cargos"
              className="block font-semibold text-gray-900"
            >
              Cargos
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Lista de cargos de la organizacion
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link
              href="/usuarios/tareas"
              className="block font-semibold text-gray-900"
            >
              Tareas y actividades
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">
              Tareas y actividades del usuario
            </p>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <FaUsersCog
              size={25}
              className="text-green-500 hover:text-purple-400"
            />
          </div>
          <div className="flex-auto">
            <Link href="#" className="block font-semibold text-gray-900">
              Cerrar sesion
              <span className="absolute inset-0"></span>
            </Link>
            <p className="mt-1 text-gray-600">Salir de su cuenta de usuario</p>
          </div>
        </div>
      </div>
    </div>
  )
}
