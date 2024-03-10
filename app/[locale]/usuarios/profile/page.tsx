'use client'

import TreeView, { flattenTree } from 'react-accessible-treeview'
import { useEffect, useState } from 'react'
import NotificacionesList from '@/components/notifications-list'
import ProyectoPerformance from '@/components/tables/proyectosPerformance'
import KPIProyectos from '@/components/tables/KPIProyectos'
import ProyectoEstado from '@/components/tables/proyectoEstado'
import ProyectoSubcategoriaEstado from '@/components/tables/proyectoSubcategoriaEstado'
import ProyectoSubcategoriaVencimiento from '@/components/tables/proyectoSubcategoriaVencimiento'

export default function Dashboard() {
  const [proyectos, setProyectos] = useState<any[]>([])
  const [notificaciones, setNotificaciones] = useState<any[]>([])

  const folder = {
    name: '',
    children: [
      {
        name: 'src',
        children: [{ name: 'index.js' }, { name: 'styles.css' }],
      },
      {
        name: 'node_modules',
        children: [
          {
            name: 'react-accessible-treeview',
            children: [{ name: 'bundle.js' }],
          },
          { name: 'react', children: [{ name: 'bundle.js' }] },
        ],
      },
      {
        name: '.npmignore',
      },
      {
        name: 'package.json',
      },
      {
        name: 'webpack.config.js',
      },
    ],
  }

  const data = flattenTree(folder)

  useEffect(() => {
    let items: any[] = Array.from({ length: 5 }, (item, index) => ({
      id: 'c0342d45-7ba7-4f74-8093-5a556ff9c8d2',
      nombre: `Proyecto #${index + 1}`,
      ejecucion: Math.floor(Math.random() * 100),
    }))

    setProyectos(items)

    items = [
      {
        id: 'c0342d45-7ba7-4f74-8093-5a556ff9c8d2',
        nombre: `Catalogo de unidades simples cierra hoy`,
        estado: 'danger',
      },
      {
        id: 'c0342d45-7ba7-4f74-8093-5a556ff9c8d2',
        nombre: `Catalogo de unidades compuestas cierra hoy`,
        estado: 'danger',
      },
      {
        id: 'c0342d45-7ba7-4f74-8093-5a556ff9c8d2',
        nombre: `Mediciones de unidades compuestas por empezar`,
        estado: 'pending',
      },
      {
        id: 'c0342d45-7ba7-4f74-8093-5a556ff9c8d2',
        nombre: `Mediciones de unidades compuestas por empezar`,
        estado: 'pending',
      },
      {
        id: 'c0342d45-7ba7-4f74-8093-5a556ff9c8d2',
        nombre: `Mediciones de actuaciones completado`,
        estado: 'success',
      },
    ]

    setNotificaciones(items)
  }, [])

  return (
    <main>
      <section className="max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto lg:w-10/12">
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <ProyectoPerformance proyectos={proyectos} />
            </div>
            <div>
              <NotificacionesList notificaciones={notificaciones} />
            </div>
            <div>
              <ProyectoSubcategoriaEstado />
            </div>
            <div>
              <ProyectoSubcategoriaVencimiento />
            </div>
          </div>
          <div className="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
            <ProyectoEstado />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* <LineGraph /> */}
          </div>
        </div>
      </section>
    </main>
  )
}
