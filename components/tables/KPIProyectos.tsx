import React from 'react'
import { DiCss3, DiJavascript, DiNpm } from 'react-icons/di'
import { FaList, FaRegFolder, FaRegFolderOpen } from 'react-icons/fa'
import TreeView, { INode, flattenTree } from 'react-accessible-treeview'

import {
  subCategoriaActuacionIndicadores,
  especialidadActuacionIndicadores,
} from '@/context/indicadores'
import { IFlatMetadata } from 'react-accessible-treeview/dist/TreeView/utils'
import { cn } from '@/lib/utils'

const performanceTextColor = (value: number) => {
  let color = 'text-blue-700'

  if (value <= 35) {
    color = 'text-red-500'
  }

  if (value > 35 && value < 85) {
    color = 'text-yellow-400'
  }

  if (value >= 85) {
    color = 'text-green-500'
  }

  return color
}

const performanceBgColor = (value: number) => {
  let color = 'bg-blue-700'

  if (value <= 35) {
    color = 'bg-red-500'
  }

  if (value > 35 && value < 85) {
    color = 'bg-yellow-400'
  }

  if (value >= 85) {
    color = 'bg-green-500'
  }

  return color
}

const folder = {
  name: 'Proyectos',
  metadata: { performance: Math.floor(Math.random() * 100) },
  children: [
    {
      name: '2024',
      metadata: { performance: Math.floor(Math.random() * 100) },
      children: [
        {
          name: 'Proyecto 1',
          metadata: { performance: Math.floor(Math.random() * 100) },
          children: [
            {
              name: 'Subcategoria de actuacion',
              metadata: { performance: Math.floor(Math.random() * 100) },
              children: subCategoriaActuacionIndicadores.map((item: any) => ({
                name: item.nombre,
                metadata: { performance: Math.floor(Math.random() * 100) },
                children: especialidadActuacionIndicadores
                  .filter((esp: any) => item.codigo == esp.subcat)
                  .map((esp: any) => ({
                    name: esp.nombre,
                    metadata: { performance: Math.floor(Math.random() * 100) },
                  })),
              })),
            },
            {
              name: 'Documentos',
              metadata: { performance: Math.floor(Math.random() * 100) },
              children: [
                {
                  name: 'Catalogo de unidades simples',
                  metadata: { performance: Math.floor(Math.random() * 100) },
                },
                {
                  name: 'Catalogo de unidades compuestas',
                  metadata: { performance: Math.floor(Math.random() * 100) },
                },
                {
                  name: 'Catalogo de unidades actuaciones',
                  metadata: { performance: Math.floor(Math.random() * 100) },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const data = flattenTree(folder)
function KPIProyectos() {
  return (
    <div>
      <h1 className="mt-3 bg-white p-2  text-xs font-bold uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        Proyectos
      </h1>
      <div className="overflow-y-scroll">
        <TreeView
          data={data}
          aria-label="directory tree"
          togglableSelect
          clickAction="EXCLUSIVE_SELECT"
          multiSelect
          className="h-64 p-2"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleSelect,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              <div className="flex cursor-pointer">
                <div className="flex w-full">
                  <span className="py-1">
                    {isBranch ? (
                      <FolderIcon
                        isOpen={isExpanded}
                        color={performanceTextColor(
                          element.metadata?.performance as number,
                        )}
                      />
                    ) : (
                      <FileIcon filename={element.name} />
                    )}
                  </span>
                  <span
                    className={cn(
                      'mx-2',
                      performanceTextColor(
                        element.metadata?.performance as number,
                      ),
                    )}
                    suppressHydrationWarning
                  >
                    {element.name} ({element.metadata?.performance}%)
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}

interface Props {
  isOpen: Boolean
  color: string
}
const FolderIcon = (props: Props) =>
  props.isOpen ? (
    <FaRegFolderOpen color="e8a87c" className={cn('icon', props.color)} />
  ) : (
    <FaRegFolder color="e8a87c" className={cn('icon', props.color)} />
  )

interface Props1 {
  filename: String
}

const FileIcon = (props: Props1) => {
  const extension = props.filename.slice(props.filename.lastIndexOf('.') + 1)
  switch (extension) {
    case 'js':
      return <DiJavascript color="yellow" className="icon" />
    case 'css':
      return <DiCss3 color="turquoise" className="icon" />
    case 'json':
      return <FaList color="yellow" className="icon" />
    case 'npmignore':
      return <DiNpm color="red" className="icon" />
    default:
      return null
  }
}
export default KPIProyectos
