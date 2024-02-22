"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import fetcher from "@/services/fetcher"
import {
  SpecialtyAction,
  SubCategory,
  Subspeciality,
  UnitOfMeasurement,
} from "@/services/useGetRepositories"
import {
  CellChange,
  CellLocation,
  CheckboxCell,
  Column,
  DateCell,
  DefaultCellTypes,
  DropdownCell,
  NumberCell,
  Row,
  TextCell,
} from "@silevis/reactgrid"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import {
  applyChanges,
  creator,
  getColumns,
  getEmpty,
  getRows,
  getUnidadesSimples,
  headerRow,
  moreRows,
} from "./functions"

import SpreadSheetAlt from "@/components/spread-sheet-alt"
import { SpreadSheet } from "@/components/spread-sheet"
import { Button } from "@/components/ui/button"
import { BiSearch } from "react-icons/bi"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModalDeleteUdSimple } from "./modal-delete"
import ModalEspecialidadesParaSpreadsheet from "./modalEspecialidadesParaSpreadsheet"
import ModalDescriptionCell from "./modal-cell-description"


interface DataResponse<T> {
  status: number
  result: T
  errorMessage?: any
}
export interface SimpleUnitPaginated {
  currentPage: number
  pageCount: number
  pageSize: number
  recordCount: number
  results: SimpleUnit[]
}
export interface SimpleUnit {
  simpleUdId: string
  count: number
  mtUnitOfMeasurement: string
  mtSpecialtyAction: string
  mtSubCategoryAction: string
  mtSubspecialityName: string
  mtSubspecialityRoute?: any
  mtSubCategoryActionId: string
  code: string
  simpleUdName: string
  description?: any
  mtUnitOfMeasurementId: number
  mtSpecialtyActionId: number
  mtSubspecialityId: number
  accountantConcept?: any
  sapId: string
  global: boolean
  id: number
  [key: string]: any
}

export interface UnidadSimple {
  idauto: number
  id: number
  idUnidad: string
  nombreUnidadSimple: string
  descripcionUnidadSimple: string
  counter: string
  // global: boolean
  unidadObra: any
  subCategoria: any
  especialidad: any
  sap: string
  subEspecialidad: any
  unidadObraisOpen: boolean
  subcategoriaisOpen: boolean
  especialidadisOpen: boolean
  especialidadesFilter: any[]
  newItem: boolean
  [key: string]: any
}
interface Option {
  label: string
  value: string
  checked: boolean
}

export interface SimpleCatalogProps {
  subEsp: Subspeciality[]
  esp: SpecialtyAction[]
  subCat: SubCategory[]
  unitMeasurement: UnitOfMeasurement[]
}

export default function SimpleCatalog({
  esp,
  subEsp,
  subCat,
  unitMeasurement,
}: SimpleCatalogProps) {
  const [itemId, setItemId] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [filtroSubcategoria, setFiltroSubcategoria] = useState("")
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("")
  const { trigger } = useSWRMutation(
    `${process.env.API_URL}/SimpleCatalog/Create`,
    creator /* options */
  )

  const { data, mutate, isLoading, error } = useSWR<
    DataResponse<SimpleUnitPaginated>
  >(
    `${process.env.API_URL}/SimpleCatalog/GetAllPaginated?${filtroEspecialidad.length ? ` MtSpecialtyActionId=${filtroEspecialidad}&` : ''}${searchInput.length ? `SearchCriteria=${searchInput}&` : ''}PageSize=2147483647`,
    fetcher
  )
  // const { data, mutate, isLoading } = useSWR<DataResponse<ResponseSimpleUN>>(`${process.env.API_URL}/SimpleCatalog/GetAll`, fetcher)

  const [unidades, setUnidadesSimples] = useState<UnidadSimple[]>([])
  const [columns, setColumns] = useState<Column[]>(getColumns())
  const [modal, setModal] = useState(false)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [showModalSpecialty, setShowModalSpecialty] = useState(false)
  const [showModaldelete, setShowModalDelete] = useState(false)
  const [indexOfDescription, setIndexOfDescription] = useState(0)
  const [item, setItem] = useState<UnidadSimple>(getEmpty)
  //const rows = useMemo(() => getRows(people), [people])

  const handleLocationClick = useCallback(async (location: CellLocation) => {

    if (location.columnId.toString() === "descripcionUnidadSimple") {
      const idx = location.rowId as number;
      const item = unidades.at(idx - 1);
 
      if (item) {
        setIndexOfDescription(idx - 1)
        setItem(item)
        setShowDescriptionModal(true)
      }

    }


    if (location.columnId.toString() === "modal") {
      mutate()
      const idx = location.rowId as number;
      const item = unidades.at(idx - 1);

      if (item) {
        setItem(item)
        setShowModalSpecialty(true)
      }

    }

    if (location.columnId.toString() === "button_delete") {
      const idx = location.rowId as number;
      const item = unidades.at(idx - 1);

      if (item != undefined) {
        setItem(item)
        setShowModalDelete(true)
      }

    }

    // if (location.columnId.toString() === "button_save") {

    //   const idx = location.rowId as number;
    //   const item = unidades.at(idx - 1);

    //   let toastId;
    //   try {
    //     if (item != undefined) {
    //       if (item.nombreUnidadSimple.length > 0 &&
    //         item.descripcionUnidadSimple.length > 0 &&
    //         // item.counter.length > 0 && 
    //         // item.sap.length > 0 &&
    //         item.subCategoria != "" &&
    //         item.especialidad != "" &&
    //         item.unidadObra != "" &&
    //         item.subEspecialidad !== null) {

    //         toastId = toast.loading('Enviando... 🚀');
    //         // Submit data
    //         let value: any = {

    //           simpleUdName: item.nombreUnidadSimple,
    //           description: item.descripcionUnidadSimple,
    //           mtUnitOfMeasurementId: parseInt(item.unidadObra),
    //           mtSpecialtyActionId: parseInt(item.especialidad),
    //           accountantConcept: item.counter,
    //           sapId: item.sap,
    //           global: item.global,
    //           status: 0,
    //           mtSubspecialityId: item.subEspecialidad !== null ? item.subEspecialidad.value : null//.map((item: any) => item.value)
    //         }

    //         let result: any = null;

    //         if (item.newItem)
    //           result = await trigger(value);
    //         else {
    //           value["id"] = item.id,
    //             result = await fetch(`${process.env.API_URL}/SimpleCatalog/Update/${item.id}`, {
    //               method: 'PUT',
    //               headers: {
    //                 "Content-Type": "application/json",
    //                 // 'Content-Type': 'application/x-www-form-urlencoded',
    //               },
    //               body: JSON.stringify(value)
    //             })
    //         }


    //         if (result != undefined && (result.status === 200 || result.status === 201)) {
    //           toast.success('Enviado con éxito 🙌', { id: toastId });
    //         }
    //         if (result != undefined && result.status >= 400) {
    //           toast.error('No se puede enviar 😱', { id: toastId });
    //         }
    //       }
    //     }
    //   } catch (e) {
    //     toast.error('No se puede enviar 😱', { id: toastId });
    //   }
    // }


    console.log(location)

  }, [modal, mutate, unidades])

  const rows = useMemo(
    () =>
      getRows(
        unidades,
        columns,
        subCat.map((item: any) => ({ label: item.text, value: item.value })),
        esp.map((item: any) => ({
          label: item.name,
          value: String(item.id),
          subcategory: item.mtSubCategoryActionId,
        })),
        unitMeasurement.map((item: any) => ({
          label: item.name,
          value: String(item.id),
        })),
        subEsp.map((item: any) => ({
          label: item.name,
          value: item.id,
          subcategoryId: item.mtSubCategoryActionId,
          especialityId: item.mtSpecialtyActionId,
        }))
      ),
    [columns, esp, subCat, subEsp, unidades, unitMeasurement]
  )

  const processUnidad = (item: SimpleUnit, idx: number): UnidadSimple => {
    const {
      id,
      simpleUdId,
      simpleUdName,
      description,
      accountantConcept,
      mtSubCategoryActionId,
      mtSpecialtyActionId,
      mtUnitOfMeasurementId,
      sapId,
      global,
      mtSubspecialityId,
      mtSubspecialityName,
    } = item

    const subEspecialidad =
      mtSubspecialityId !== null
        ? { label: mtSubspecialityName, value: mtSubspecialityId }
        : null
    const especialidadesFilter = esp
      .filter(
        (el) => el.mtSubCategoryActionId.toString() === mtSubCategoryActionId
      )
      .map((el) => ({
        label: el.name,
        value: String(el.id),
        subcategory: String(el.mtSubCategoryActionId),
      }))

    return {
      idauto: idx + 1,
      id,
      idUnidad: simpleUdId,
      nombreUnidadSimple: simpleUdName,
      descripcionUnidadSimple: description || "",
      counter: accountantConcept,
      subCategoria: mtSubCategoryActionId,
      especialidad: String(mtSpecialtyActionId),
      unidadObra: String(mtUnitOfMeasurementId),
      sap: sapId,
      global,
      subEspecialidad,
      subcategoriaisOpen: false,
      especialidadisOpen: false,
      unidadObraisOpen: false,
      especialidadesFilter,
      newItem: false,
    }
  }

  const handleChange = useCallback((changes: CellChange<any>[]) => {
    setUnidadesSimples(prevUnidades => applyChanges(changes, prevUnidades, esp.map((item: any) => ({
      label: item.name,
      value: String(item.id),
      subcategory: item.mtSubCategoryActionId,
    })), getEmpty));
  }, [esp, setUnidadesSimples])

  // pasar dentro de modal para optimizar componente
  const handleSetDescription = useCallback((value: string) => {
    const updatedItem: UnidadSimple = {
      ...item,
      descripcionUnidadSimple: value
    };

    setUnidadesSimples((prev) => {

      prev[indexOfDescription] = updatedItem

      return [...prev]
    })

    setShowDescriptionModal(false)
  }, [item, indexOfDescription, setUnidadesSimples]);

  useEffect(() => {
    try {
      if (data) {
        const updatedUnidadesSimples = moreRows(
          data.result.results.map(processUnidad),
          25
        )
        setUnidadesSimples(updatedUnidadesSimples)
      } else {
        setUnidadesSimples(moreRows(getUnidadesSimples(), 25))
      }
    } finally {
    }
  }, [data])

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <section >
      <div>{`${process.env.API_URL}/SimpleCatalog/GetAllPaginated?${filtroEspecialidad.length ? ` MtSpecialtyActionId=${filtroEspecialidad}&` : ''}${searchInput.length ? `SearchCriteria=${searchInput}&` : ''}PagesSize=2147483647`}</div>
      <div style={{ margin: "0 20px" }}>
        <SpreadSheet.Root>
          <SpreadSheet.Header title="Catalogo de unidades simples" description="Repositorio de unidades de obra simples">
            <div className="flex items-center py-4">
              <div className="flex">
                <Button className="rounded-r-none" type="button">
                  Filtros
                </Button>
                <div className="relative w-full">
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="w-60 max-w-sm rounded-l-none"

                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="secondary"
                    className="absolute end-0 top-0 rounded-l-none"
                  >
                    <BiSearch size={16} />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </SpreadSheet.Header>
          <SpreadSheet.Body
            loading={isLoading}
            items={unidades}
            rows={rows}
            columns={columns}
            emptyElement={getEmpty(unidades.length + 1)}
            onChangeRows={(items: UnidadSimple[]) => setUnidadesSimples(items)}
            onChangeColumns={(columns: Column[]) => setColumns(columns)}
            onChange={(changes: CellChange<any>[]) =>
              handleChange(changes)
            }
            onCellClick={handleLocationClick}
            onShowRow={() => { }}
            onUpdateRow={() => { }}
          />

        </SpreadSheet.Root>

      </div>

      {showDescriptionModal &&
          <ModalDescriptionCell
            title={'Descripción'}
            buttonText='Adicionar a Celda'
            defaultValue={item.descripcionUnidadSimple}
            onClose={() => setShowDescriptionModal(false)}
            onSave={(value: string) => handleSetDescription(value)}
          />}
      {showModalSpecialty ? (
        <ModalEspecialidadesParaSpreadsheet
          title="Subespecialidades"
          especialidad={parseInt(item.especialidad)}
          options={subEsp.map((item: any) => ({
            label: item.name,
            value: item.id,
            subcategoryId: item.mtSubCategoryActionId,
            especialityId: item.mtSpecialtyActionId,
            especialityName: item.mtSpecialtyAction,
            code: item.code,
            route: item.route,
          }))}
          // subespecialidaddes={item.subEspecialidades}
          onChange={(value: any) => {
            console.log(value)
            setUnidadesSimples([
              ...unidades.map((unidad: UnidadSimple) => ({
                ...unidad,
                subEspecialidad:
                  unidad.idauto === item.idauto
                    ? value
                    : unidad.subEspecialidad,
              })),
            ])
          }}
          onClose={() => setShowModalSpecialty(!showModalSpecialty)}
          isModalOpen={showModalSpecialty}
        />
      ) : null}

      <ModalDeleteUdSimple open={showModaldelete} onOpenChange={setShowModalDelete} id={item.id} mutate={mutate} />
    </section>
  )
}
