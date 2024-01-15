
import { CellChange, CellLocation, CheckboxCell, Column, DateCell, DefaultCellTypes, DropdownCell, NumberCell, Row, TextCell } from '@silevis/reactgrid';

interface DataResponse {
  status: number;
  result: ResultRoot;
  errorMessage?: any;
}
interface ResultRoot {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  recordCount: number;
  results: Result[];
}
interface Result {
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
    { columnId: "id", width: 30 , reorderable: true, resizable: true},
    { columnId: "idUnidad", width: 200, reorderable: true, resizable: true },
    { columnId: "nombreUnidadSimple", width: 200, reorderable: true, resizable: true },
    { columnId: "descripcionUnidadSimple", width: 350, reorderable: true, resizable: true },
    // { columnId: "counter", width: 200, reorderable: true, resizable: true },
    { columnId: "subCategoria", width: 200, reorderable: true, resizable: true },
    { columnId: "especialidad", width: 200, reorderable: true, resizable: true },
    { columnId: "unidadObra", width: 200, reorderable: true, resizable: true },
    { columnId: "sap", width: 200, reorderable: true, resizable: true },
    { columnId: "global", width: 70, reorderable: true, resizable: true },
    { columnId: "modal", width: 150, reorderable: true},
    { columnId: "button_save", width: 120, reorderable: true },
    { columnId: "button_delete", width: 120, reorderable: true }
    
  ];
  
  const headerRow = (columns: Column[]): Row => ({
    rowId: "header",
    height: 35,
    cells: 
      columns.map(col =>{
  
        let elem: DefaultCellTypes = { type: "header", text: "", style: {color: ''}} ;
        switch(col.columnId){
          case "id": elem =  { type: "header", text: "No", style: {color: '#666179'}}; break;
          case "nombreUnidadSimple": elem = { type: "header", text: "Nombre *", style: {color: '#666179'}}; break;
          case "descripcionUnidadSimple": elem = { type: "header", text: "Descripcion *", style: {color: '#666179'}}; break;
          case "counter": elem = { type: "header", text: "Contador", style: {color: '#666179'}}; break;
          case "subCategoria": elem = { type: "header", text: "Subcategoria *", style: {color: '#666179'}}; break;
          case "especialidad": elem = { type: "header", text: "Especialidad *", style: {color: '#666179'}}; break;
          case "unidadObra": elem = { type: "header", text: "Unidad de obra *", style: {color: '#666179'}}; break;
          case "sap": elem = { type: "header", text: "SAP", style: {color: '#666179'}}; break;
          case "global": elem = { type: "header", text: "Global", style: {color: '#666179'}}; break;
          case "idUnidad": elem = { type: "header", text: "ID Unidad (autogenerado)", style: {color: '#666179'}}; break;
          case "modal": elem = { type: "header", text: "Subespecialidad *", style: {color: '#666179'}}; break;
          case "button_save": elem = { type: "header", text: "", style: {color: '#666179'}}; break;
          case "button_delete": elem = { type: "header", text: "", style: {color: '#666179'}}; break;
          
        }
  
        return elem
      })
  });
  
  const getRows =  (unidades: UnidadSimple[], columns: Column[], subcategories: any[], especialities: any[], measurementUnits: any[]):  Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>[] => [
    headerRow(columns),
    ...unidades.map<Row<DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell>>((item, idx) => ({
      rowId: idx + 1,//item.idauto,
      reorderable: true,
      height: 35,
      cells: 
      columns.map(col =>{
  
        let elem: DefaultCellTypes | FlagCell | ButtonCell | DateCell | DropdownCell = { type: "header", text: "", style: {color: ''}} ;

        switch(col.columnId){
          case "id": elem =  { type: "header", text: `${item.idauto }`, style: {color: '#666179'}}; break;
          case "idUnidad": elem =  { type: "header", text: `${item.idUnidad }`, style: {color: '#666179'}}; break;
          case "modal": elem = { type: "button", text: item.subEspecialidad !== null ? item.subEspecialidad.label : "Editar", style: {color: '#666179'}, enabled: true, size: 1, id: item.id, onClick: ()=> {}}; break;
          case "button_save": 
            elem = { 
              type: "button", 
              text: `Guardar`, 
              style: {color: '#666179'}, 
              enabled: 
                item.nombreUnidadSimple !=  "" && 
                item.descripcionUnidadSimple !=  "" && 
                // item.counter !=  "" && 
                // item.sap !=  ""&&
                item.subCategoria != "" &&
                item.especialidad != "" &&
                item.subEspecialidad !== null, 
              size: -1, 
              id: item.id, 
              onClick: ()=>{}
            }; 
            break;
          case "button_delete":
            elem = { 
              type: "button", 
              text: `Eliminar`, 
              style: {color: '#666179'}, 
              enabled: 
                item.id  > 0, 
              size: -1, 
              id: item.id, 
              onClick: ()=>{}
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
            case "global": elem = { type: "checkbox", checked: item.global, className: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'}; break;
  
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
            
            switch(fieldName) {
              case 'subCategoria' : 
                dataRow.subcategoriaisOpen = change.newCell.isOpen as never;
                dataRow.especialidadesFilter = [...especialities.filter((el: any) => dataRow?.subCategoria == el.subcategory)];
                break;

              case 'especialidad' : 
                dataRow.especialidadisOpen = change.newCell.isOpen as never;
                break;
              case 'unidadObra' : dataRow.unidadObraisOpen = change.newCell.isOpen as never; break;
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
        ...Array.from({length: exceed}, (item,idx)=>({
            ...getEmpty(unidades.length + 1),
            idauto: unidades.length + idx + 1,
            //counter: getCounter(unidades.length + idx + 1)
        }))
    ]
)

const breadcrumbs = [
  {label: 'Inicio', link: '/'},
  {label: 'Repositorio', link: null},
  {label: 'Catálogo de unidades simples', link: null}
]

const  creator = async (url: string, { arg }: { arg: {
  simpleUdName: string, 
  description: string, 
  mtSpecialtyActionId: number,
  accountantConcept: string,
  sapId: string,
  status: number,
  mtSubspecialities : number[]
}}) => {
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
  const { data: subEspRes} = useSWR(`${process.env.API_URL}/MtSubspeciality/GetAll`, fetcher)
  const { data: subcatRes} = useSWR(`${process.env.API_URL}/MtSubCategoryAction/GetDropdownItems?fieldNameValue=Id&fieldNameText=Name`, fetcher)
  const { data: medtRes} = useSWR(`${process.env.API_URL}/MtUnitOfMeasurement/GetAll`, fetcher)
  const { data: espRes} = useSWR(`${process.env.API_URL}/MtSpecialtyAction/GetAll`, fetcher)
  const {trigger} = useSWRMutation(`${process.env.API_URL}/SimpleCatalog/Create`, creator, /* options */)
  
  const { data, mutate, isLoading} = useSWR<DataResponse>(`${process.env.API_URL}/SimpleCatalog/GetAllPaginated?MtSpecialtyActionId=${filtroEspecialidad}&SearchByProp=simpleUdName&SearchCriteria=${searchInput}`, fetcher)
  const [unidades, setUnidadesSimples] = useState<UnidadSimple[]>([]);
  const [columns, setColumns] = useState<Column[]>(getColumns());
  const [modal, setModal] = useState(false);
  const [modalNewItem, setModalNewItem] = useStateCallback(false);
  const [modalDetail, setModalDetail] = useStateCallback(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0)
  const [item, setItem] = useState<UnidadSimple>(getEmpty);
  const [loading, setLoading] = useState(false)

  

    useEffect(() => {
      try{
        
        if(data != undefined && data.status == 200){
          
          setUnidadesSimples(moreRows(data.result.results.map((item: any, idx: number) => ({
            idauto: idx + 1,
            id: item.id,
            idUnidad: item.simpleUdId,
            nombreUnidadSimple: item.simpleUdName,
            descripcionUnidadSimple: item.description ? item.description :  "",
            counter: item.accountantConcept,
            subCategoria: item.mtSubCategoryActionId,
            especialidad: String(item.mtSpecialtyActionId),
            unidadObra: String(item.mtUnitOfMeasurementId),
            sap: item.sapId,
            global: item.global,
            subEspecialidad: {label: item.mtSubspecialityName,  value: item.mtSubspecialityId}, //simpleCatalogMtSubspecialities.map((sub: any) => ({label: sub.mtSubspecialityName, value: sub.mtSubspecialityId})),
            subcategoriaisOpen: false,
            especialidadisOpen: false,
            unidadObraisOpen: false,
            especialidadesFilter: espRes !== undefined && espRes.status === 200 ?
              espRes.result.map((el: any) =>({label: el.name, value: String(el.id), subcategory: String(el.mtSubCategoryActionId)})).filter((i: any)=> i.subcategory == item.mtSubCategoryActionId) 
              : [],
            newItem: false
          })),25))
        }
        else{
          setUnidadesSimples(moreRows(getUnidadesSimples(), 25));
        }
      }
      finally{
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }, [data]);

    

    const handleSearchinput = (value: string) => {
      setSearchInput(value)
    }

    const handleLocationClick = async (location: CellLocation) => {
      if(location.columnId.toString() === "modal"){
        setModal(!modal);

        const idx = location.rowId as number;
        const item = unidades.at(idx - 1);

        if(item){
          setItem(item);
        } 
      }

      if(location.columnId.toString() === "button_delete"){
        const idx = location.rowId as number;
        const item = unidades.at(idx - 1);

        if(item != undefined){
          setDeleteItem(item.id);
          setModalDelete(true);

        }
      }

      if(location.columnId.toString() === "button_save"){
        
        const idx = location.rowId as number;
        const item = unidades.at(idx - 1);

        let toastId;
        try {
          if(item != undefined){
            if(item.nombreUnidadSimple.length > 0 && 
              item.descripcionUnidadSimple.length > 0 && 
              // item.counter.length > 0 && 
              // item.sap.length > 0 &&
              item.subCategoria != "" &&
              item.especialidad != "" &&
              item.unidadObra != "" &&
              item.subEspecialidad !== null){

                toastId = toast.loading('Enviando... 🚀');
                // Submit data
                let value: any = {
                  
                  simpleUdName: item.nombreUnidadSimple, 
                  description: item.descripcionUnidadSimple, 
                  mtUnitOfMeasurementId: parseInt(item.unidadObra),
                  mtSpecialtyActionId: parseInt(item.especialidad),
                  accountantConcept: item.counter,
                  sapId: item.sap,
                  global: item.global,
                  status: 0,
                  mtSubspecialityId: item.subEspecialidad.value//.map((item: any) => item.value)
              }

              let result: any = null;

              if(item.newItem)
                result = await trigger(value);
              else{
                value["id"] = item.id,
                result = await fetch(`${process.env.API_URL}/SimpleCatalog/Update/${item.id}`, {
                  method: 'PUT',
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify(value)
                })
              }
                

              if(result != undefined && (result.status === 200 || result.status === 201)){
                  toast.success('Enviado con éxito 🙌', { id: toastId });
              }
              if(result != undefined && result.status >= 400){
                  toast.error('No se puede enviar 😱', { id: toastId });
              }  
            }
          }  
        } catch (e) {
            toast.error('No se puede enviar 😱', { id: toastId });
        }
      }
    }

    return (
        <main>
            <Header></Header>
            <section className="w-full lg:m-auto lg:w-12/12 bg-white dark:bg-gray-900 max-h-screen">
                <Breadcrumbs items={breadcrumbs}/>
                <div style={{margin: "0 20px"}}>
                  <SpreadSheet
                    titulo="Catalogo de unidades simples"
                    descripcion="Repositorio de unidades de obra simples."
                    searchInputPlaceholder="Buscar de unidades simples"
                    filterText="Filtros"
                    hideDescripcion={false}
                    hideFilterInput={false}
                    loading={loading}
                    searchInputValue={searchInput}
                    onChangeSelect={(newValue: Option[]) => { }}
                    onChangeInput={(newValue: string) => { setSearchInput(newValue); } }
                    onSearch={async (values: any)=> { console.log(values)
                      if('subcategoria' in values && values.subcategoria !== undefined)
                          setFiltroSubcategoria(values.subcategoria.value)
                      
                      if('especialidad' in values && values.especialidad !== undefined)
                          setFiltroEspecialidad(values.especialidad.value)

                      await mutate()
                  }}
                    onUpdateRow={async (idx: any) => {
                      const item = unidades.at(idx - 1) ;

                      
                      setItemId(prev => item ? item.id: 0)
                      setModalNewItem(true, () => setItemId(item !== undefined ? item.id: 0))
                    }}
                    onShowRow={(idx: any) => {
                      const item = unidades.at(idx - 1) ;
                      console.log(item);
                      setModalDetail(true, () => setItemId(item ? item.id: 0))
                    }}
                    options={
                      {
                          filtros: {
                              subcategorias: subcatRes !== undefined && subcatRes.status === 200 ?
                                subcatRes.result.map((item: any) => ({ label: item.text, value: String(item.value) })) : [],
                              especialidades:  espRes !== undefined && espRes.status === 200 ?
                                  espRes.result.map((item: any) => ({ label: item.name, value: String(item.id), subcategory: String(item.mtSubCategoryActionId) })) : [],
                          },
                          values:{

                              subcategoria: filtroSubcategoria,
                              especialidad: filtroEspecialidad
              
                          }
                      }
                  }
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
                        : []
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
                    onCellClick={handleLocationClick}
                    onImport={(dataImported: any, columnasMapeadas: any) => {
                      const sizeData = dataImported.length;
                      const sizeColumns = columnasMapeadas.length;
                      let imported = [];
                      setUnidadesSimples([]);
                      for (let i = 0; i < sizeData; i++) {
                        let unidad: any = getEmpty(i + 1);
                        for (let j = 0; j < sizeColumns; j++) {

                          const data = dataImported[i][columnasMapeadas[j].columnaMapeada.value];

                          switch (typeof unidad[columnasMapeadas[j].columna.value]) {

                            case "number": unidad[columnasMapeadas[j].columna.value] = Number(data); break;
                            case "boolean": unidad[columnasMapeadas[j].columna.value] = (data == "Si" || data == "SI" || data == "YES" || data == "TRUE" || data == "Yes" || data == "True" || data == "1"); break;
                            default: unidad[columnasMapeadas[j].columna.value] = data; break;
                          }

                        }
                        imported.push(unidad);
                      }

                      setUnidadesSimples(imported);

                    } } 
                    onNewItem={()=>{
                      setItemId(prev=> 0)
                      setModalNewItem(true, ()=> setItemId(prev=> 0))
                    }}              
                  />
                </div>
                {
                    modalNewItem ? (
                
                      <ModalNewItem 
                          isModalOpen={modalNewItem}
                          title={itemId === 0 ? "Nueva unidad" : "Actualizar unidad"}
                          itemSelected={unidades.find((item: UnidadSimple)=> item.id === itemId)}
                          subespecialidaddes={
                            subEspRes !== undefined && subEspRes.status === 200 ?
                              subEspRes.result.map((item: any) =>({
                                label: item.name,
                                value: item.id, 
                                subcategoryId: item.mtSubCategoryActionId,
                                especialityId: item.mtSpecialtyActionId,
                                especialityName: item.mtSpecialtyAction,
                                code: item.code,
                                route: item.route
                              }))
                            :[]
                          }
                          unidadesObra={
                            medtRes !== undefined && medtRes.status === 200 ?
                              medtRes.result.map((item: any) => ({ label: item.name, value: String(item.id) }))
                              : []
                          }

                          subcategorias={
                            subcatRes !== undefined && subcatRes.status === 200 ?
                              subcatRes.result.map((item: any) => ({ label: item.text, value: item.value }))
                              : []
                          }

                          especialidades={
                            espRes !== undefined && espRes.status === 200 ?
                            espRes.result.map((item: any) => ({ label: item.name, value: String(item.id), subcategory: item.mtSubCategoryActionId }))
                            : []
                          }
                        
                        

                          onMutate={async (values: any)=> {
                            
                              // await mutate();
                              // if(itemId !== 0){
                              //     setModalNewItem(false)
                              // }

                              let toastId;
                              try {
                                

                                toastId = toast.loading('Enviando... 🚀');
                                // Submit data
                                let value: any = {
                                  id: itemId,
                                  simpleUdName: values.nombreUnidadSimple, 
                                  description: values.descripcionUnidadSimple, 
                                  mtUnitOfMeasurementId: parseInt(values.udObra),
                                  mtSpecialtyActionId: parseInt(values.especialidadActuacion),
                                  accountantConcept: "",
                                  global: values.global,
                                  sapId: values.sap,
                                  status: 0,
                                  //mtSubspecialities: [values.subEspecialidades],
                                  mtSubspecialityId: values.subEspecialidad.value,
                                }

                               

                                let result: any = null;

                                if(itemId === 0)
                                  result = await trigger(value);
                                else{
                                  result = await fetch(`${process.env.API_URL}/SimpleCatalog/Update/${itemId}`, {
                                    method: 'PUT',
                                    headers: {
                                      "Content-Type": "application/json",
                                          // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: JSON.stringify(value)
                                  })
                                }
                                      
                                if(result != undefined && (result.status === 200 || result.status === 201)){
                                  toast.success('Enviado con éxito 🙌', { id: toastId });
                                }
                                if(result != undefined && result.status >= 400){

                                  console.log(result)
                          
                                  toast.error(`No se puede enviar. ${result.errorMessage}😱`, { id: toastId });
                                  
                                }

                                await mutate();
                                if(itemId !== 0){
                                  setModalNewItem(false)
                                }
                                
                              } catch (e) {
                                console.log(e)
                                  toast.error(`No se puede enviar. Error en el servidor. Consulte a servicios 😱`, { id: toastId });
                                  
                              }
                              
                          }} 
                          onClose={()=> setModalNewItem(false)}
                      />
                    ): null
                }
                {
                    modalDetail ? (

                    <ModalDetail 
                        isModalOpen={modalDetail}
                        title="Detalles de unidad"
                        itemSelected={unidades.find((item: UnidadSimple)=> item.id === itemId)}

                        unidadesObra={
                          medtRes !== undefined && medtRes.status === 200 ?
                            medtRes.result.map((item: any) => ({ label: item.name, value: String(item.id) }))
                            : []
                        }

                        subcategorias={
                          subcatRes !== undefined && subcatRes.status === 200 ?
                            subcatRes.result.map((item: any) => ({ label: item.text, value: item.value }))
                            : []
                        }

                        especialidades={
                          espRes !== undefined && espRes.status === 200 ?
                          espRes.result.map((item: any) => ({ label: item.name, value: String(item.id), subcategory: item.mtSubCategoryActionId }))
                          : []
                        }
                        
                        onClose={()=> setModalDetail(false)}
            
                    />

                    ): null
                }
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
                {
                  modalDelete ? (
                      <ModalDeleteRow 
                          titulo={`Eliminar unidad`}
                          mensaje={`¿Estás seguro de que deseas eliminar esta unidad simple } de la lista? Una vez eliminada, no podrás recuperar los datos asociados. `} 
                          onClose={()=>setModalDelete(false)}
                          onDelete={async ()=>{
                            if(deleteItem > 0){
                              const res = await fetch(`${process.env.API_URL}/SimpleCatalog/Delete/${deleteItem}`, {
                                method: 'DELETE',
                                headers: {
                                  "Content-Type": "application/json",
                                },
                              })

                              setModalDelete(false)

                            }
                          }}
                      />
                  ): null
               }
            </section>
        </main>
    )
}


