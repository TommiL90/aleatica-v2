'use client'

import {
  FaEdit,
  FaEllipsisV,
  FaEllipsisH,
  FaRegTrashAlt,
  FaRegFile,
  FaArrowCircleRight,
  FaRegSave,
} from 'react-icons/fa'
import { Link } from '@/navigation'
import React, {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import Select from 'react-select'

import SearchInput from '../inputs/searchInput'
import { cn } from '@/lib/utils'
import Loading from '../loading'
import ErrorComponent from '../error'
import ModalFiltrosBusqueda from '../common-modals/filtrosBusqueda'

const udsimples: any[] = new Array(20)
udsimples.fill(20)

interface Option {
  label: string
  value: string
  checked: boolean
}

interface Action {
  label: string
  style: string
  icon: any
  visibleLabel: boolean
  onClick: Function
}

interface MenuItem {
  id: string
  label: string
  codigo: string
  link: string
  menu: MenuItem[]
}

interface Props {
  titulo: string
  descripcion: string
  hideDescripcion: boolean
  projectsItems: any[]
  bussinessItems: any[]
  options: any
  actions: Action[]
  selectedProject: any
  selectedBussinessUnit: any
  onChangeSelect: Function
  onChangeProject: Function
  onChangeBussinessUnit: Function
  onChangeInput: Function
  onSearch: Function
  onFilter: Function

  hideCheckboxColumn: boolean
  loading: boolean
  error: boolean
  columsLabels: string[]
  columsValues: any[]
  columsActions: Action[]
  hideNavigation: boolean
  currentPage: number
  elementByPage: number
  totalValues: number
  pagesCount: number
  pageSize: number
  onNavigate: Function
  onChangePageSize: Function

  selectedItems: any[]
  onSelectedItems: Function
  onChangeItem: Function

  selectPlaceholder: string
  filterText: string
  hideFilter: boolean
  searchInputPlaceholder: string
  searchInputValue: string

  bussinessUnitPlaceholder: string

  orderPlaceholder: string
  orderItems: any[]
  selectedOrderItem: any
  onChangeOrder: Function

  mapFields: any[]

  menuRow: any[]
}

export function TableQueryByProject(props: Props) {
  const [_document, set_document] = useState<Document>()
  const [modalFilter, setModalFilter] = useState(false)

  useEffect(() => {
    set_document(document)
  }, [])
  const handleSelectedItem = (evt: any, id: any) => {
    const { checked } = evt.target
    if (id == 'all') {
      checked
        ? props.onSelectedItems(
            Array.from(props.columsValues).map((item) => item.id),
          )
        : props.onSelectedItems([])
      return
    }
    if (props.selectedItems.includes(id)) {
      props.onSelectedItems(props.selectedItems.filter((item) => item !== id))
    } else {
      props.onSelectedItems([...props.selectedItems, id])
    }
  }

  const createPageforNavigator = (pages: number, currentPage: number) => {
    const pagesDeployed = new Array(pages)

    for (let i = 0; i < pages; i++) {
      pagesDeployed.push(
        currentPage == i + 1 ? (
          <li key={i}>
            <button
              onClick={() => props.onNavigate(i + 1)}
              aria-current="page"
              className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {i + 1}
            </button>
          </li>
        ) : (
          <li key={i}>
            <button
              onClick={() => props.onNavigate(i + 1)}
              className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {i + 1}
            </button>
          </li>
        ),
      )
    }

    return pagesDeployed
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'new':
        return <FaRegFile className="mr-2" />
      case 'save':
        return <FaRegSave className="mr-2" />
      case 'continue':
        return <FaArrowCircleRight className="mr-2" />
      case 'edit':
        return <FaEdit className="mr-2" />
      case 'menu':
        return <FaEllipsisV className="mr-2" />
      case 'remove':
        return <FaRegTrashAlt className="mr-2" />
      default:
        return null
    }
  }

  const dropdownMenu = (options: Action[], id: string) => {
    return (
      <Menu
        menuClassName="my-menu"
        menuButton={
          <MenuButton>
            <FaEllipsisV />
          </MenuButton>
        }
        transition
      >
        {options.map((opt: any, idx: number) => (
          <MenuItem key={idx} onClick={(evt: any) => opt.onClick(id)}>
            <div className="flex w-full">
              <div className="w-2/12">
                <span className="block pt-0.5">{getIcon(opt.icon)}</span>
              </div>
              <div className="w-2/12"></div>
              <div className="w-8/12">{opt.label}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    )
  }

  return (
    <>
      {
        // props.error ? null :
        // (
        <div className="bg-gray-50 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
          <h3>{props.titulo}</h3>
          {props.hideDescripcion == undefined || !props.hideDescripcion ? (
            <p className="mb-4 mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              {props.descripcion}
            </p>
          ) : null}

          <div className="mt-2 flex items-center justify-between pb-4">
            <form>
              <div className="mb-6 grid gap-6 md:grid-cols-3">
                <Select
                  id="unidad"
                  placeholder={props.bussinessUnitPlaceholder}
                  instanceId="unidad"
                  options={[
                    { label: props.bussinessUnitPlaceholder, value: 0 },
                    ...props.bussinessItems,
                  ]}
                  value={props.selectedBussinessUnit}
                  onChange={(value: any) => props.onChangeBussinessUnit(value)}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menuList: (base) => ({ ...base, color: 'black' }),
                  }}
                  menuPortalTarget={_document?.body}
                  menuPlacement="auto"
                  className={cn(
                    'block w-full rounded-lg border text-sm',
                    'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />

                <Select
                  id="proyecto"
                  placeholder={props.selectPlaceholder}
                  instanceId="proyecto"
                  options={[
                    { label: props.selectPlaceholder, value: 0 },
                    ...props.projectsItems.filter(
                      (item: any) =>
                        props.selectedBussinessUnit !== null &&
                        item.mtBusinessUnitId ===
                          props.selectedBussinessUnit.value,
                    ),
                  ]}
                  value={props.selectedProject}
                  onChange={(value: any) => props.onChangeProject(value)}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menuList: (base) => ({ ...base, color: 'black' }),
                  }}
                  menuPortalTarget={_document?.body}
                  menuPlacement="auto"
                  className={cn(
                    'block w-full rounded-lg border text-sm',
                    'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />

                <Select
                  id="order"
                  placeholder={props.orderPlaceholder}
                  instanceId="order"
                  options={[
                    { label: props.orderPlaceholder, value: 0 },
                    ...props.orderItems,
                  ]}
                  value={props.selectedOrderItem}
                  onChange={(value: any) => props.onChangeOrder(value)}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menuList: (base) => ({ ...base, color: 'black' }),
                  }}
                  menuPortalTarget={_document?.body}
                  menuPlacement="auto"
                  className={cn(
                    'block w-full rounded-lg border text-sm',
                    'bg-gray-100  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                  )}
                />
              </div>
              <div className="grid">
                <SearchInput
                  label=""
                  hideLabel={true}
                  hideFilter={props.hideFilter}
                  selectValue={null}
                  selectPlaceholder={props.filterText}
                  inputPlaceholder={props.searchInputPlaceholder}
                  options={props.options}
                  searchInputValue={props.searchInputValue}
                  onChangeInput={(newValue: any) =>
                    props.onChangeInput(newValue)
                  }
                  onChangeSelect={(newValue: any) =>
                    props.onChangeSelect(newValue)
                  }
                  onSearch={(newValue: any) => props.onSearch(newValue)}
                />
              </div>

              {/* <button
                                type='button' 
                                className='text-sm bg-blue-700 text-white'
                                onClick={()=> setModalFilter(true)}
                            >
                                Filtros
                            </button> */}

              {modalFilter ? (
                <ModalFiltrosBusqueda
                  filter={props.options}
                  onClose={() => setModalFilter(false)}
                  onSearch={(values: any) => props.onFilter(values)}
                />
              ) : null}

              {props.actions.length > 0 ? (
                <div className="hidden lg:flex">
                  {props.actions.map((item, index) => (
                    <button
                      key={crypto.randomUUID()}
                      onClick={(evt: any) => item.onClick()}
                      className={item.style}
                    >
                      {getIcon(item.icon)}
                      {item.visibleLabel ? (
                        <span className="mr-auto">{item.label}</span>
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </form>
          </div>

          {props.actions.length > 0 ? (
            <div className="flex w-full items-center lg:hidden xl:hidden">
              {props.actions.map((item, index) => (
                <button
                  key={crypto.randomUUID()}
                  onClick={(evt: any) => item.onClick()}
                  className={item.style}
                >
                  {getIcon(item.icon)}
                  {item.visibleLabel ? (
                    <span className="mr-auto">{item.label}</span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        // )
      }

      {props.loading ? (
        <Loading label="Actualizando ..." />
      ) : props.error ? (
        <ErrorComponent
          label="Error"
          description="Ha ocurrido algun problema al contactar con el servidor"
        />
      ) : props.columsValues.length > 0 ? (
        <table
          id="myTable"
          className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {!props.hideCheckboxColumn ? (
                <th scope="col" className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      onChange={(evt) => handleSelectedItem(evt, 'all')}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
              ) : null}
              {props.columsLabels.map((item, index) => (
                <th key={index} scope="col" className="auto px-6 py-3">
                  {item}
                </th>
              ))}

              <th scope="col" className="w-4 p-3">
                <span className="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.columsValues.map((item, index) => {
              const id = crypto.randomUUID()
              const keyField = crypto.randomUUID()
              const keyAction = crypto.randomUUID()
              return (
                <tr
                  key={id}
                  className={cn(
                    ' border-b hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                  )}
                >
                  {!props.hideCheckboxColumn ? (
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          // id={`checkbox-table-${id}-${index + 1}`}

                          type="checkbox"
                          checked={props.selectedItems.includes(item.id)}
                          onChange={(evt) => handleSelectedItem(evt, item.id)}
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                        <label
                          htmlFor={`checkbox-table-${index + 1}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                  ) : null}
                  {props.mapFields.map((field, index) =>
                    field['input'] == undefined || !field['input'] ? (
                      <th
                        key={`${keyField}-${index}`}
                        scope="row"
                        className="w-auto px-6  py-4"
                      >
                        {field['fieldType'] == 'string' ? (
                          <div
                            className={cn(
                              'line-clamp-6',
                              item[field['fieldName']].split(' ').length >= 5
                                ? 'w-50'
                                : 'w-auto',
                            )}
                          >
                            {field['fieldType'] != 'array'
                              ? item[field['fieldName']]
                              : item[field['fieldName']].length}
                          </div>
                        ) : field['fieldType'] == 'any' ? (
                          <div
                            className={cn(
                              'line-clamp-6',
                              item[field['fieldName']][
                                field['fieldString']
                              ].split(' ').length >= 5
                                ? 'w-50'
                                : 'w-auto',
                            )}
                          >
                            {field['fieldType'] != 'array'
                              ? item[field['fieldName']][field['fieldString']]
                              : item[field['fieldName']].length}
                          </div>
                        ) : (
                          <div className={cn('w-20')}>
                            {field['fieldType'] != 'array'
                              ? item[field['fieldName']]
                              : item[field['fieldName']].length}
                          </div>
                        )}
                      </th>
                    ) : (
                      <th
                        key={`${keyField}-${index}`}
                        scope="row"
                        className="w-auto whitespace-nowrap px-6 py-4"
                        style={{
                          minWidth: field['inputType'] == 'select' ? 160 : 80,
                          maxWidth: field['inputType'] == 'select' ? 208 : 130,
                        }}
                      >
                        {field['inputType'] == 'select' ? (
                          <Select
                            id={`input-${field['fieldName']}-${item['id']}`}
                            instanceId={`input-${field['fieldName']}-${item['id']}`}
                            placeholder=""
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              menuList: (base) => ({ ...base, color: 'black' }),
                            }}
                            menuPortalTarget={_document?.body}
                            menuPlacement="auto"
                            className="block rounded-lg border bg-gray-100 text-sm  text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            onChange={(elem: any) =>
                              props.onChangeItem(
                                elem['value'],
                                item['id'],
                                field['fieldName'],
                              )
                            }
                            options={field['options'].map((elem: any) => ({
                              label: `${elem['nombre']}`,
                              value: elem['codigo'],
                            }))}
                            value={
                              field['options']
                                .filter(
                                  (elem: any) =>
                                    elem['codigo'] == item[field['fieldName']],
                                )
                                .map((elem: any) => ({
                                  label: `${elem['nombre']}`,
                                  value: elem['codigo'],
                                }))[0]
                            }
                          />
                        ) : (
                          <input
                            id={`input-${field['fieldName']}-${item['id']}`}
                            type={field['inputType']}
                            min={0}
                            onChange={(evt: any) =>
                              props.onChangeItem(
                                evt.target.value,
                                item['id'],
                                field['fieldName'],
                              )
                            }
                            value={item[field['fieldName']]}
                            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          />
                        )}
                      </th>
                    ),
                  )}
                  {props.columsActions.length > 0 ? (
                    <th>{dropdownMenu(props.columsActions, item.id)}</th>
                  ) : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div className="bg-white p-8"> No hay elementos disposibles</div>
      )}

      {!props.hideNavigation && props.columsValues.length > 0 ? (
        <nav
          className="mx-2 my-4 flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Mostrando{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{`${props.currentPage == 1 ? 1 : (props.currentPage - 1) * props.elementByPage} - ${props.currentPage * props.elementByPage}`}</span>{' '}
            de{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {props.totalValues}
            </span>
          </span>
          <div className="flex text-sm font-normal text-gray-500">
            <span className="mx-3 pt-2.5">Tamano de pagina</span>
            <Select
              id="page-size"
              instanceId="page-size"
              options={[
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 35, value: 35 },
                { label: 50, value: 50 },
              ]}
              value={{ label: props.pageSize, value: props.pageSize }}
              onChange={(newValue: any) => props.onChangePageSize(newValue)}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menuList: (base) => ({ ...base, color: 'black' }),
              }}
              menuPortalTarget={_document?.body}
              menuPlacement="auto"
            />
          </div>

          <ul className="inline-flex h-8 -space-x-px text-sm">
            <li>
              <button
                key="prev"
                disabled={props.currentPage == 1}
                onClick={() =>
                  props.onNavigate(
                    props.currentPage > 1 ? props.currentPage - 1 : null,
                  )
                }
                className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Anterior
              </button>
            </li>
            {
              // createPageforNavigator(props.pagesCount, props.currentPage)
            }

            <li>
              <button
                key="next"
                disabled={props.currentPage == props.pagesCount}
                onClick={() =>
                  props.onNavigate(
                    props.currentPage < props.pagesCount
                      ? props.currentPage + 1
                      : null,
                  )
                }
                className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  )
}
