"use client"

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"
import { useStateCallback } from "@/respaldo/hooks/useStateCallback"
import fetcher from "@/services/fetcher"
import { Column } from "@silevis/reactgrid"
import useSWR, { KeyedMutator } from "swr"
import useSWRMutation, { TriggerWithArgs } from "swr/mutation"

import { ALt } from "@/app/functions/table-simple-catalogs/alt"
import { getColumns } from "@/app/functions/table-simple-catalogs/get-columns"
import { getEmpty } from "@/app/functions/table-simple-catalogs/get-empty"
import { getSimpleUdList } from "@/app/functions/table-simple-catalogs/get-simple-ud"
import { moreRows } from "@/app/functions/table-simple-catalogs/more-rows"

import {
  DataResponse,
  MtSpecialtyAction,
  MtUnitOfMeasurement,
  SimpleCatalogCreate,
  SimpleCatalogsResponse,
  SimpleUd,
  SubCategory,
  SubSpecialty,
} from "./types"

interface SimpleCatalogsContext {
  itemId: number
  setItemId: Dispatch<SetStateAction<number>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  filtroSubcategoria: string
  setFiltroSubcategoria: Dispatch<SetStateAction<string>>
  filtroEspecialidad: string
  setFiltroEspecialidad: Dispatch<SetStateAction<string>>
  unidades: SimpleUd[]
  setUnidadesSimples: Dispatch<SetStateAction<SimpleUd[]>>
  columns: Column[]
  setColumns: Dispatch<SetStateAction<Column[]>>
  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
  modalNewItem: boolean
  setModalNewItem: (
    state: boolean,
    cb?: ((state: boolean) => void) | undefined
  ) => void
  modalDetail: boolean
  setModalDetail: (
    state: boolean,
    cb?: ((state: boolean) => void) | undefined
  ) => void
  modalDelete: boolean
  setModalDelete: Dispatch<SetStateAction<boolean>>
  deleteItem: number
  setDeleteItem: Dispatch<SetStateAction<number>>
  item: SimpleUd
  setItem: Dispatch<SetStateAction<SimpleUd>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  descriptionCell: {
    descripcionUnidadSimple: string
    idx: number
  }
  setDescriptionCell: Dispatch<
    SetStateAction<{
      descripcionUnidadSimple: string
      idx: number
    }>
  >
  showDescriptionModal: boolean
  setShowDescriptionModal: Dispatch<SetStateAction<boolean>>
  subEspRes?: DataResponse<SubSpecialty[]>
  subcatRes?: DataResponse<SubCategory[]>
  medtRes?: DataResponse<MtUnitOfMeasurement[]>
  espRes?: DataResponse<MtSpecialtyAction[]>
  trigger: TriggerWithArgs<
    any,
    any,
    `${string}/SimpleCatalog/Create`,
    {
      simpleUdName: string
      description: string
      mtSpecialtyActionId: number
      accountantConcept: string
      sapId: string
      status: number
      mtSubspecialities: number[]
    }
  >
  data?: DataResponse<SimpleCatalogsResponse>
  mutate: KeyedMutator<DataResponse<SimpleCatalogsResponse>>
  isLoading: boolean
}

interface ChildrenProps {
  children: ReactNode
}

export const SimpleCatalogsContext = createContext({} as SimpleCatalogsContext)

export const SimpleCatalogsProvider = ({ children }: ChildrenProps) => {
  const [itemId, setItemId] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [filtroSubcategoria, setFiltroSubcategoria] = useState("")
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("")
  const [unidades, setUnidadesSimples] = useState<SimpleUd[]>([])
  const [columns, setColumns] = useState<Column[]>(getColumns())
  const [modal, setModal] = useState(false)
  const [modalNewItem, setModalNewItem] = useStateCallback(false)
  const [modalDetail, setModalDetail] = useStateCallback(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<SimpleUd>(getEmpty)
  const [loading, setLoading] = useState(false)
  const [descriptionCell, setDescriptionCell] = useState({
    descripcionUnidadSimple: "",
    idx: 0,
  })
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)

  const { data: subEspRes } = useSWR<DataResponse<SubSpecialty[]>>(
    `${process.env.API_URL}/MtSubspeciality/GetAll`,
    fetcher
  )
  const { data: subcatRes } = useSWR<DataResponse<SubCategory[]>>(
    `${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`,
    fetcher
  )
  const { data: medtRes } = useSWR<DataResponse<MtUnitOfMeasurement[]>>(
    `${process.env.API_URL}/MtUnitOfMeasurement/GetAll`,
    fetcher
  )
  const { data: espRes } = useSWR<DataResponse<MtSpecialtyAction[]>>(
    `${process.env.API_URL}/MtSpecialtyAction/GetAll`,
    fetcher
  )
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/SimpleCatalog/Create`,
    ALt /* options */
  )

  const { data, mutate, isLoading } = useSWR<
    DataResponse<SimpleCatalogsResponse>
  >(
    `${process.env.API_URL}/SimpleCatalog/GetAllPaginated?MtSpecialtyActionId=${filtroEspecialidad}&SearchByProp=simpleUdName&SearchCriteria=${searchInput}`,
    fetcher
  )

  useEffect(() => {
    try {
      if (data !== undefined && data.status === 200) {
        setUnidadesSimples(
          moreRows(
            data.result.results.map((item, idx) => ({
              idauto: idx + 1,
              id: item.id,
              idUnidad: item.simpleUdId,
              nombreUnidadSimple: item.simpleUdName,
              descripcionUnidadSimple: item.description ? item.description : "",
              counter: item.accountantConcept,
              subCategoria: item.mtSubCategoryActionId,
              especialidad: String(item.mtSpecialtyActionId),
              unidadObra: String(item.mtUnitOfMeasurementId),
              sap: item.sapId,
              global: item.global,
              subEspecialidad:
                item.mtSubspecialityId !== null
                  ? {
                      label: item.mtSubspecialityName,
                      value: item.mtSubspecialityId,
                    }
                  : null, // simpleCatalogMtSubspecialities.map((sub: any) => ({label: sub.mtSubspecialityName, value: sub.mtSubspecialityId})),
              subcategoriaisOpen: false,
              especialidadisOpen: false,
              unidadObraisOpen: false,
              especialidadesFilter:
                espRes !== undefined && espRes.status === 200
                  ? espRes.result
                      .map((el) => ({
                        label: el.name,
                        value: String(el.id),
                        subcategory: String(el.mtSubCategoryActionId),
                      }))
                      .filter(
                        (i) => i.subcategory === item.mtSubCategoryActionId
                      )
                  : [],
              newItem: false,
            })),
            25
          )
        )
      } else {
        setUnidadesSimples(moreRows(getSimpleUdList(), 25))
      }
    } finally {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [data])

  const contextValue: SimpleCatalogsContext = {
    itemId,
    setItemId,
    searchInput,
    setSearchInput,
    filtroSubcategoria,
    setFiltroSubcategoria,
    filtroEspecialidad,
    setFiltroEspecialidad,
    unidades,
    setUnidadesSimples,
    columns,
    setColumns,
    modal,
    setModal,
    modalNewItem,
    setModalNewItem,
    modalDetail,
    setModalDetail,
    modalDelete,
    setModalDelete,
    deleteItem,
    setDeleteItem,
    item,
    setItem,
    loading,
    setLoading,
    descriptionCell,
    setDescriptionCell,
    showDescriptionModal,
    setShowDescriptionModal,
    subEspRes,
    subcatRes,
    medtRes,
    espRes,
    trigger,
    data,
    mutate,
    isLoading,
  }

  return (
    <SimpleCatalogsContext.Provider value={contextValue}>
      {children}
    </SimpleCatalogsContext.Provider>
  )
}
