'use client'



import { CellChange, CellLocation, CheckboxCell, Column, DateCell, DefaultCellTypes, DropdownCell, Id, NumberCell, Row, TextCell } from '@silevis/reactgrid';
import { ButtonCell } from '../components/cells/button';
import { FlagCell } from '../components/cells/flag';
import fetcher from '@/services/fetcher';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useStateCallback } from '@/hooks/useStateCallback';
import ModalEspecialidadesParaSpreadsheet from '../udsimples/modalEspecialidadesParaSpreadsheet';
import SpreadSheet from '../components/spread-sheet';


interface DataResponse<T> {
  status: number;
  result: T;
  errorMessage?: any;
}
interface ResponseSimpleUNPaginated {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  recordCount: number;
  results: ResponseSimpleUN[];
}
interface ResponseSimpleUN {
  simpleUdId: string;
  count: number;
  mtUnitOfMeasurement: string;
  mtSpecialtyAction: string;
  mtSubCategoryAction: string;
  mtSubspecialityName: string;
  mtSubspecialityRoute?: any;
  mtSubCategoryActionId: string;
  code: string;
  simpleUdName: string;
  description?: any;
  mtUnitOfMeasurementId: number;
  mtSpecialtyActionId: number;
  mtSubspecialityId: number;
  accountantConcept?: any;
  sapId: string;
  global: boolean;
  id: number;
}

interface UnidadSimple {
  idauto: number;
  id: number;
  idUnidad: string;
  nombreUnidadSimple: string;
  descripcionUnidadSimple: string;
  counter: string;
  global: boolean;
  unidadObra: any;
  subCategoria: any;
  especialidad: any;
  sap: string;
  subEspecialidad: any;
  unidadObraisOpen: boolean;
  subcategoriaisOpen: boolean;
  especialidadisOpen: boolean;
  especialidadesFilter: any[];
  newItem: boolean; // indica si es elemento nuevo: true, o cagado desde bd: false
}


const getUnidadesSimples = (): UnidadSimple[] => [];

const getColumns = (): Column[] => [
  { columnId: "id", width: 30, reorderable: true, resizable: true },
  { columnId: "idUnidad", width: 200, reorderable: true, resizable: true },
  { columnId: "nombreUnidadSimple", width: 200, reorderable: true, resizable: true },
  { columnId: "descripcionUnidadSimple", width: 350, reorderable: true, resizable: true },
  // { columnId: "counter", width: 200, reorderable: true, resizable: true },
  { columnId: "subCategoria", width: 200, reorderable: true, resizable: true },
  { columnId: "especialidad", width: 200, reorderable: true, resizable: true },
  { columnId: "unidadObra", width: 200, reorderable: true, resizable: true },
  { columnId: "sap", width: 200, reorderable: true, resizable: true },
  { columnId: "global", width: 70, reorderable: true, resizable: true },
  { columnId: "modal", width: 150, reorderable: true },
  { columnId: "button_save", width: 120, reorderable: true },
  { columnId: "button_delete", width: 120, reorderable: true }

];

const headerRow = (columns: Column[]): Row => ({
  rowId: "header",
  height: 35,
  cells:
    columns.map(col => {

      let elem: DefaultCellTypes = { type: "header", text: "", style: { color: '' } };
      switch (col.columnId) {
        case "id": elem = { type: "header", text: "No", style: { color: '#666179' } }; break;
        case "nombreUnidadSimple": elem = { type: "header", text: "Nombre *", style: { color: '#666179' } }; break;
        case "descripcionUnidadSimple": elem = { type: "header", text: "Descripcion *", style: { color: '#666179' } }; break;
        case "counter": elem = { type: "header", text: "Contador", style: { color: '#666179' } }; break;
        case "subCategoria": elem = { type: "header", text: "Subcategoria *", style: { color: '#666179' } }; break;
        case "especialidad": elem = { type: "header", text: "Especialidad *", style: { color: '#666179' } }; break;
        case "unidadObra": elem = { type: "header", text: "Unidad de obra *", style: { color: '#666179' } }; break;
        case "sap": elem = { type: "header", text: "SAP", style: { color: '#666179' } }; break;
        case "global": elem = { type: "header", text: "Global", style: { color: '#666179' } }; break;
        case "idUnidad": elem = { type: "header", text: "ID Unidad (autogenerado)", style: { color: '#666179' } }; break;
        case "modal": elem = { type: "header", text: "Subespecialidad *", style: { color: '#666179' } }; break;
        case "button_save": elem = { type: "header", text: "", style: { color: '#666179' } }; break;
        case "button_delete": elem = { type: "header", text: "", style: { color: '#666179' } }; break;

      }

      return elem
    })
});

const filtro = (item: any, subespecialities: any[]): boolean => {
  const cond = subespecialities.some(sub => sub.especialityId === Number(item.especialidad));


  if (!cond) {
    return (
      item.nombreUnidadSimple !== "" &&
      item.descripcionUnidadSimple !== "" &&
      item.subCategoria !== "" &&
      item.especialidad !== ""
    );
  } else {
    return (
      item.nombreUnidadSimple !== "" &&
      item.descripcionUnidadSimple !== "" &&
      item.subCategoria !== "" &&
      item.especialidad !== "" &&
      item.subEspecialidad !== null
    );
  }
};

const getRows = (unidades: UnidadSimple[], columns: Column[], subcategories: any[], especialities: any[], measurementUnits: any[], subespecialities: any[]): Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>[] => [
  headerRow(columns),
  ...unidades.map<Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>>((item, idx) => ({
    rowId: idx + 1,//item.idauto,
    reorderable: true,
    height: 35,
    cells:
      columns.map(col => {

        let elem: DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell = { type: "header", text: "", style: { color: '' } };

        switch (col.columnId) {
          case "id": elem = { type: "header", text: `${item.idauto}`, style: { color: '#666179' } }; break;
          case "idUnidad": elem = { type: "header", text: `${item.idUnidad}`, style: { color: '#666179' } }; break;
          case "modal": elem = { type: "button", text: item.subEspecialidad !== null ? item.subEspecialidad.label : "Editar", style: { color: '#666179' }, enabled: true, size: 1, id: item.id, onClick: () => { } }; break;
          case "button_save":
            elem = {
              type: "button",
              text: `Guardar`,
              style: { color: '#666179' },
              enabled:
                filtro(item, subespecialities),
              size: -1,
              id: item.id,
              onClick: () => {  console.log( item ) }
            };
            break;
          case "button_delete":
            elem = {
              type: "button",
              text: `Eliminar`,
              style: { color: '#666179' },
              enabled:
                item.id > 0,
              size: -1,
              id: item.id,
              onClick: () => { }
            };
            break;
          case "sap": elem = { type: "text", text: item.sap, className: 'text-sm block w-full text-gray-800' }; break;

          case "nombreUnidadSimple": elem = { type: "text", text: item.nombreUnidadSimple, className: 'text-sm block w-full text-gray-800 focus:text-gray-800' }; break;
          case "descripcionUnidadSimple": elem = { type: "text", text: item.descripcionUnidadSimple, className: 'text-sm block w-full text-gray-800 focus:text-gray-800' }; break;
          case "counter": elem = { type: "text", text: item.counter, className: 'text-sm block w-full text-gray-800' }; break;

          case "subCategoria":
            elem = {
              type: "dropdown",
              selectedValue: item.subCategoria,
              // inputValue: item.subcategoriaActuacion,
              isOpen: item.subcategoriaisOpen,
              values: subcategories,
              className: 'text-sm  block w-full bg-gray-100 text-gray-800'
            };
            break;

          case "especialidad":
            elem = {
              type: "dropdown",
              selectedValue: item.especialidad,
              //inputValue: item.especialidadActuacion,
              isOpen: item.especialidadisOpen,
              values: item.especialidadesFilter,
              className: 'text-sm  block w-full bg-gray-100 text-gray-800'
            };
            break;

          case "unidadObra":
            elem = {
              type: "dropdown",
              selectedValue: item.unidadObra,
              // inputValue: item.subcategoriaActuacion,
              isOpen: item.unidadObraisOpen,
              values: measurementUnits,
              className: 'text-sm  block w-full bg-gray-100 text-gray-800'
            };
            break;
          case "global": elem = { type: "checkbox", checked: item.global, className: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' }; break;

        }

        return elem
      })
  }))
];

const getEmpty = (id: number = 1): UnidadSimple => ({
  idauto: id,
  id: 0,
  idUnidad: '',
  nombreUnidadSimple: ``,
  descripcionUnidadSimple: ``,
  counter: "",
  subCategoria: null,
  especialidad: null,
  unidadObra: null,
  sap: ``,
  global: false,
  subEspecialidad: null,
  unidadObraisOpen: false,
  subcategoriaisOpen: false,
  especialidadisOpen: false,
  especialidadesFilter: [],
  newItem: true
});



const applyChanges = (
  changes: CellChange<TextCell | NumberCell | CheckboxCell | DropdownCell | DateCell>[],
  prevDetails: UnidadSimple[],
  especialities: any[],
  getEmptyDataRow: () => UnidadSimple
): UnidadSimple[] => {

  changes.forEach((change) => {
    const dataRowId = change.rowId as number;
    const fieldName = change.columnId as keyof UnidadSimple;

    let dataRow = prevDetails.find((d) => d.idauto === dataRowId);

    if (!dataRow) {
      dataRow = getEmptyDataRow();
      prevDetails.push(dataRow);

      //return;
    }
    if (change.type === "text" && typeof dataRow[fieldName] === "string") {
      dataRow[fieldName] = change.newCell.text as never;
    } else if (
      change.type === "number" &&
      typeof dataRow[fieldName] === "number"
    ) {
      dataRow[fieldName] = change.newCell.value as never;
    } else if (
      change.type === "checkbox" &&
      typeof dataRow[fieldName] === "boolean"
    ) {
      dataRow[fieldName] = change.newCell.checked as never;
    } else if (change.type === "dropdown") {

      /**
       * Checking for an opening/closing of a dropdown list
       */

      if (change.previousCell.isOpen !== change.newCell.isOpen) {

        switch (fieldName) {
          case 'subCategoria':
            dataRow.subcategoriaisOpen = change.newCell.isOpen as never;
            dataRow.especialidadesFilter = [...especialities.filter((el: any) => dataRow?.subCategoria == el.subcategory)];
            break;

          case 'especialidad':
            dataRow.especialidadisOpen = change.newCell.isOpen as never;
            break;
          case 'unidadObra': dataRow.unidadObraisOpen = change.newCell.isOpen as never; break;
        }
      }

      if (change.previousCell.selectedValue !== change.newCell.selectedValue) {
        dataRow[fieldName] = change.newCell.selectedValue as never;

      }
    }
  });

  return [...prevDetails];
};

interface Option {
  label: string;
  value: string;
  checked: boolean;
}

const moreRows = (unidades: UnidadSimple[], exceed: number = 100) => (
  [
    ...unidades,
    ...Array.from({ length: exceed }, (item, idx) => ({
      ...getEmpty(unidades.length + 1),
      idauto: unidades.length + idx + 1,
      //counter: getCounter(unidades.length + idx + 1)
    }))
  ]
)

const breadcrumbs = [
  { label: 'Inicio', link: '/' },
  { label: 'Repositorio', link: null },
  { label: 'Catálogo de unidades simples', link: null }
]

const creator = async (url: string, { arg }: {
  arg: {
    simpleUdName: string,
    description: string,
    mtSpecialtyActionId: number,
    accountantConcept: string,
    sapId: string,
    status: number,
    mtSubspecialities: number[]
  }
}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

export default function CatalogoSimples() {
  const [itemId, setItemId] = useState(0);
  const [searchInput, setSearchInput] = useState('')
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const { data: subEspRes } = useSWR(`${process.env.API_URL}/MtSubspeciality/GetAll`, fetcher)
  const { data: subcatRes } = useSWR(`${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`, fetcher)
  const { data: medtRes } = useSWR(`${process.env.API_URL}/MtUnitOfMeasurement/GetAll`, fetcher)
  const { data: espRes } = useSWR(`${process.env.API_URL}/MtSpecialtyAction/GetAll`, fetcher)
  const { trigger } = useSWRMutation(`${process.env.API_URL}/SimpleCatalog/Create`, creator, /* options */)

  const { data, mutate, isLoading } = useSWR<DataResponse<ResponseSimpleUNPaginated>>(`${process.env.API_URL}/SimpleCatalog/GetAllPaginated?MtSpecialtyActionId=${filtroEspecialidad}&SearchByProp=simpleUdName&SearchCriteria=${searchInput}&PagesSize=2147483647`, fetcher)
  // const { data, mutate, isLoading } = useSWR<DataResponse<ResponseSimpleUN>>(`${process.env.API_URL}/SimpleCatalog/GetAll`, fetcher)

  const [unidades, setUnidadesSimples] = useState<UnidadSimple[]>([]);
  const [columns, setColumns] = useState<Column[]>(getColumns());
  const [modal, setModal] = useState(false);
  const [modalNewItem, setModalNewItem] = useStateCallback(false);
  const [modalDetail, setModalDetail] = useStateCallback(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<UnidadSimple>(getEmpty);
  const [loading, setLoading] = useState(false)
  const [descriptionCell, setDescriptionCell] = useState({
    descripcionUnidadSimple: "",
    idx: 0
  })
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)




  useEffect(() => {
    try {

      if (data != undefined && data.status == 200) {

        setUnidadesSimples(moreRows(data.result.results.map((item: any, idx: number) => ({
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
          subEspecialidad: item.mtSubspecialityId !== null ? { label: item.mtSubspecialityName, value: item.mtSubspecialityId } : null, //simpleCatalogMtSubspecialities.map((sub: any) => ({label: sub.mtSubspecialityName, value: sub.mtSubspecialityId})),
          subcategoriaisOpen: false,
          especialidadisOpen: false,
          unidadObraisOpen: false,
          especialidadesFilter: espRes !== undefined && espRes.status === 200 ?
            espRes.result.map((el: any) => ({ label: el.name, value: String(el.id), subcategory: String(el.mtSubCategoryActionId) })).filter((i: any) => i.subcategory == item.mtSubCategoryActionId)
            : [],
          newItem: false
        })), 25))
      }
      else {
        setUnidadesSimples(moreRows(getUnidadesSimples(), 25));
      }
    }
    finally {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [data]);




  return (
    <main>

      <section className="lg:w-12/12 max-h-screen w-full bg-white dark:bg-gray-900 lg:m-auto">

        <div style={{ margin: "0 20px" }}>
          <SpreadSheet

            loading={loading}
            items={unidades}

            rows={getRows(
              unidades,
              columns,
              subcatRes !== undefined && subcatRes.status === 200 ?
                subcatRes.result.map((item: any) => ({ label: item.text, value: item.value }))
                : [],
              espRes !== undefined && espRes.status === 200 ?
                espRes.result.map((item: any) => ({ label: item.name, value: String(item.id), subcategory: item.mtSubCategoryActionId }))
                : [],
              medtRes !== undefined && medtRes.status === 200 ?
                medtRes.result.map((item: any) => ({ label: item.name, value: String(item.id) }))
                : [],

              subEspRes !== undefined && subEspRes.status === 200 ?
                subEspRes.result.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                  subcategoryId: item.mtSubCategoryActionId,
                  especialityId: item.mtSpecialtyActionId,
                }))
                : [],
            )}
            columns={columns}
            emptyElement={getEmpty(unidades.length + 1)}
            onChangeRows={(items: UnidadSimple[]) => setUnidadesSimples(items)}
            onChangeColumns={(columns: Column[]) => setColumns(columns)}
            onChange={(changes: CellChange<any>[]) => setUnidadesSimples(applyChanges(
              changes,
              unidades,
              espRes !== undefined && espRes.status === 200 ?
                espRes.result.map((item: any) => ({ label: item.name, value: String(item.id), subcategory: item.mtSubCategoryActionId }))
                : [],
              getEmpty))}
            onCellClick={() => {}}

            onShowRow={()=> {}}

            onUpdateRow={()=> {}}
           
          />
        </div>
       
        {
          modal ?
            (
              <ModalEspecialidadesParaSpreadsheet
                title="Subespecialidades"
                especialidad={parseInt(item.especialidad)}
                options={subEspRes !== undefined && subEspRes.status === 200 ?
                  subEspRes.result.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                    subcategoryId: item.mtSubCategoryActionId,
                    especialityId: item.mtSpecialtyActionId,
                    especialityName: item.mtSpecialtyAction,
                    code: item.code,
                    route: item.route
                  }))
                  : []}
                // subespecialidaddes={item.subEspecialidades}
                onChange={(value: any) => {
                  console.log(value)
                  setUnidadesSimples([...unidades.map((unidad: UnidadSimple) => ({ ...unidad, subEspecialidad: unidad.idauto === item.idauto ? value : unidad.subEspecialidad }))])
                }}
                onClose={() => setModal(!modal)}
                isModalOpen={modal}
              />
            )
            : null
        }
      </section>
    </main>
  )
}


