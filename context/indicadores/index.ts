import { IComplementoTextual, IIndicador, IUnidad } from '@/types/type'

export const responsables: any[] = [
  { label: 'Rodrigo Peralta', value: 'rodrigo-peralta-001' },
  { label: 'John Souza', value: 'john-souza-002' },
  { label: 'Ecatherina Salas', value: 'ecatherina-salas-003' },
  { label: 'Francisco Albiol Suazo', value: 'francisco-albiol-suazo-004' },
  { label: 'Gema Morales', value: 'gema-morales-005' },
]

export const aprobadosIndicadores: any[] = [
  { label: 'Jaime Noriega', value: 'jaime-noriega-001' },
  { label: 'Ursula Tebas', value: 'ursula-tebas-002' },
  { label: 'Lucas Rosetti', value: 'lucas-rosetti-003' },
  { label: 'Eduardo Montiel Suazo', value: 'eduardo-montiel-suazo-004' },
  { label: 'Elsa Pataki', value: 'elsa-pataki-005' },
]

export const Formularios: any[] = [
  {
    label: 'Catálogo de Deterioros',
    value: 'CDD',
    link: '/catalogos/deterioros',
  },
  { label: 'Catálogo Ud Simples', value: 'CUS', link: '/catalogos/udsimples' },
  {
    label: 'Catálogo Ud Compuestas',
    value: 'CUC',
    link: '/catalogos/udcompuestas',
  },
  {
    label: 'Catálogo Actuaciones',
    value: 'CA',
    link: '/catalogos/actuaciones',
  },
  // {label: 'Catálogo de Tramos', value: 'CT'},
  {
    label: 'Mediciones Ficha Campo',
    value: 'MFC',
    link: '/mediciones/ficha_campo',
  },
  // {label: 'Mediciones Resumen Ud Simples', value: 'MRUS', link: '/mediciones/udsimples'},
  // {label: 'Mediciones Resumen Ud Compuestas', value: 'MRUC', link: '/mediciones/udcompuestas'},
  // {label: 'Mediciones Resumen Actuaciones', value: 'MRA', link: '/mediciones/actuaciones'},
  { label: 'Precios Ud Simples', value: 'PUSP', link: '/precios/udsimples' },
  {
    label: 'Precios Ud Compuestas',
    value: 'PUCP',
    link: '/precios/udcompuestas',
  },
  // {label: 'Presupuesto Técnico PxQ Ud Simples', value: 'PTPQUS', link: '/pxq/udsimples'},
  // {label: 'Presupuesto Técnico PxQ Ud Compuestas', value: 'PTPQUC', link: 'pxq/udcompuestas'},
  // {label: 'Presupuesto Técnico PxQ Actuacion 1', value: 'PTPQA', link: 'pxq/actuacion1'},
  // {label: 'PxQ Ratio P', value: 'PTPQA', link: 'pxq/ratioP'}
]

export const categoriaProyecto: IIndicador[] = [
  { nombre: 'Mantenimiento Mayor', codigo: 'MM', subcat: '' },
  { nombre: 'Conservación Rutinaria', codigo: 'CR', subcat: '' },
  { nombre: 'Proyectos de inversión', codigo: 'IP', subcat: '' },
  { nombre: 'Proyectos Greenfield/Iniciales', codigo: 'I0', subcat: '' },
]

export const categoriaActuacion: IIndicador[] = [
  { nombre: 'Mantenimiento Mayor Ordinario', codigo: 'O', subcat: '' },
  { nombre: 'Mantenimiento Mayor Correctivo', codigo: 'C', subcat: '' },
  { nombre: 'Urgencia', codigo: 'U', subcat: '' },
]

export const subCategoriaActuacionIndicadores: IIndicador[] = [
  { nombre: 'Pavimentos', codigo: 'P', subcat: '' },
  { nombre: 'Estructuras', codigo: 'E', subcat: '' },
  { nombre: 'Safety', codigo: 'S', subcat: '' },
  { nombre: 'Equipamiento', codigo: 'Q', subcat: '' },
  { nombre: 'Obra civil', codigo: 'C', subcat: '' },
  { nombre: 'Estudios', codigo: 'I', subcat: '' },
  { nombre: 'Otros', codigo: 'O', subcat: '' },
  { nombre: 'Maquinaria y equipos de conservación', codigo: 'M', subcat: '' },
]

export const especialidadActuacionIndicadores: IIndicador[] = [
  { nombre: 'Pavimento asfáltico', codigo: 'PF', subcat: 'P' },
  { nombre: 'Pavimento rígido', codigo: 'PR', subcat: 'P' },
  { nombre: 'Estructuras', codigo: 'ST', subcat: 'E' },
  { nombre: 'Neoprenos', codigo: 'NE', subcat: 'E' },
  { nombre: 'Juntas de calzada', codigo: 'JU', subcat: 'E' },
  { nombre: 'Topes sísmicos', codigo: 'TS', subcat: 'E' },
  { nombre: 'Taludes', codigo: 'TA', subcat: 'E' },
  { nombre: 'Túneles', codigo: 'TU', subcat: 'E' },
  { nombre: 'Señalamiento vertical', codigo: 'SV', subcat: 'S' },
  { nombre: 'Señalamiento horizontal', codigo: 'SH', subcat: 'S' },
  { nombre: 'Defensas y barreras', codigo: 'DB', subcat: 'S' },
  { nombre: 'Equipamiento', codigo: 'EQ', subcat: 'Q' },
  { nombre: 'Edificación', codigo: 'ED', subcat: 'C' },
  { nombre: 'Drenaje', codigo: 'OD', subcat: 'C' },
  { nombre: 'Derecho de vía (cercado)', codigo: 'DC', subcat: 'C' },
  { nombre: 'Derecho de vía (área)', codigo: 'DV', subcat: 'C' },
  { nombre: 'Iluminación e instalaciones', codigo: 'LU', subcat: 'C' },
  {
    nombre: 'Estudios (ingeniería, auscultaciones, inventarios...)',
    codigo: 'IN',
    subcat: 'I',
  },
  { nombre: 'Supervisión', codigo: 'SU', subcat: 'I' },
  { nombre: 'Otros', codigo: 'OT', subcat: 'O' },
  { nombre: 'Maquinaria y equipos de conservación', codigo: 'MA', subcat: 'M' },
]

export const unidadNegocioIndicadores: IIndicador[] = [
  { nombre: 'CONMEX', codigo: 'CEM', subcat: '' },
  { nombre: 'Viaducto Bicentenario', codigo: 'VEB', subcat: '' },
  { nombre: 'Autopista Urbana Norte', codigo: 'AUN', subcat: '' },
  { nombre: 'Super Vía Poetas', codigo: 'SVP', subcat: '' },
  { nombre: 'GANA', codigo: 'GNA', subcat: '' },
  { nombre: 'Libramiento Elevado Puebla', codigo: 'LEP', subcat: '' },
  { nombre: 'Autopista del Norte', codigo: 'ADN', subcat: '' },
  { nombre: 'Euroglosa M-45', codigo: 'E45', subcat: '' },
  { nombre: 'Autopista A2', codigo: 'AA2', subcat: '' },
  { nombre: 'Terminal Martítima Sur', codigo: 'TMS', subcat: '' },
  { nombre: 'Terminal de Tenerife', codigo: 'TTF', subcat: '' },
  { nombre: 'BREBEMI', codigo: 'BBM', subcat: '' },
  { nombre: 'Autopista Atizapan Atlacamulco', codigo: 'AAA', subcat: '' },
  { nombre: 'Autopista Río Magdalena', codigo: 'ARM', subcat: '' },
  { nombre: 'A. Camino Nogales Puchuncaví', codigo: 'CNP', subcat: '' },
  { nombre: 'Puente Industrial', codigo: 'PIN', subcat: '' },
  { nombre: 'A. Vespucio Oriente', codigo: 'AVO', subcat: '' },
  { nombre: 'M6Toll', codigo: 'MEL', subcat: '' },
]

export const tareaIndicadores: IIndicador[] = [
  { nombre: 'Catálogos y tablas generales', codigo: '1', subcat: '' },
  { nombre: 'Q - Mediciones técnicas', codigo: '2', subcat: '' },
  { nombre: 'P - Obtención de precios', codigo: '3', subcat: '' },
  {
    nombre:
      'Entrega preliminar técnica: PxQ técnicas (sin restricciones financieras/ operacionales/ viabilidad de ejecución …)',
    codigo: '4',
    subcat: '',
  },
  {
    nombre: 'Q- Mediciones ajustadas en coordinación con la UN',
    codigo: '5',
    subcat: '',
  },
  {
    nombre: 'P ajustado + Entrega preliminar: PxQ ajustado',
    codigo: '6',
    subcat: '',
  },
  { nombre: 'Ajuste PxQ según Reapreciado 7+5', codigo: '7', subcat: '' },
  {
    nombre: 'Planificación de tareas pre-constructivas y ejecución',
    codigo: '8',
    subcat: '',
  },
]

export const unidadObraFinalizadaIndicadores: IUnidad[] = [
  { codigo: 'ml' },
  { codigo: 'm' },
  { codigo: 'm2' },
  { codigo: 'm3' },
  { codigo: 'kg' },
  { codigo: 't' },
  { codigo: 'l' },
  { codigo: 'Ud' },
  { codigo: 'P.A' },
]

export const ambitoActuacion: any[] = [
  { nombre: 'Carril', codigo: '0001' },
  { nombre: 'Carril + acotamiento', codigo: '0002' },
  { nombre: 'Cuerpo completo', codigo: '0003' },
  { nombre: 'No aplica', codigo: '0004' },
]

export const unidadMoneda: any[] = [
  { nombre: 'Unidad', codigo: 'Unidad' },
  { nombre: 'Miles', codigo: 'Miles' },
  { nombre: 'Millones', codigo: 'Millones' },
]

export const moneda: any[] = [
  { nombre: '$ MEX', codigo: 'MEX' },
  { nombre: '$ USD', codigo: 'USD' },
  { nombre: '$ EURO', codigo: 'EURO' },
]

export const indicadoresDesempeno: any[] = [
  // {codigo: 'N/A'},
  { nombre: 'MR1', codigo: 'MR1' },
  { nombre: 'MR2', codigo: 'MR2' },
  { nombre: 'MR3', codigo: 'MR3' },
  { nombre: 'MR4', codigo: 'MR4' },
  { nombre: 'MR5', codigo: 'MR5' },
  { nombre: 'MR6', codigo: 'MR6' },
  { nombre: 'MR7', codigo: 'MR7' },
  { nombre: 'MR8', codigo: 'MR8' },
  { nombre: 'MR9', codigo: 'MR9' },
  { nombre: 'MR10', codigo: 'MR10' },
  { nombre: 'MR11', codigo: 'MR11' },
  { nombre: 'MR12', codigo: 'MR12' },
  { nombre: 'MR13', codigo: 'MR13' },
  { nombre: 'MR14', codigo: 'MR14' },
  { nombre: 'MR15', codigo: 'MR15' },
  { nombre: 'MR16', codigo: 'MR16' },
  { nombre: 'MR17', codigo: 'MR17' },
  { nombre: 'MR18', codigo: 'MR18' },
  { nombre: 'MR19', codigo: 'MR19' },
  { nombre: 'MR20', codigo: 'MR20' },
  { nombre: 'O1', codigo: 'O1' },
  { nombre: 'O2', codigo: 'O2' },
  { nombre: 'O3', codigo: 'O3' },
  { nombre: 'O4', codigo: 'O4' },
  { nombre: 'O5', codigo: 'O5' },
  { nombre: 'O6', codigo: 'O6' },
  { nombre: 'O7', codigo: 'O7' },
  { nombre: 'O8', codigo: 'O8' },
  { nombre: 'O9', codigo: 'O9' },
  { nombre: 'O10', codigo: 'O10' },
  { nombre: 'O11', codigo: 'O11' },
  { nombre: 'O12', codigo: 'O12' },
  { nombre: 'O13', codigo: 'O13' },
  { nombre: 'O14', codigo: 'O14' },
  { nombre: 'O15', codigo: 'O15' },
  { nombre: 'O16', codigo: 'O16' },
  { nombre: 'O17', codigo: 'O17' },
  { nombre: 'O18', codigo: 'O18' },
  { nombre: 'O19', codigo: 'O19' },
  { nombre: 'O20', codigo: 'O20' },
]

export const faseIndicadores: any[] = [
  {
    id: '7833-53453-5454-5655',
    idTramo: 'E06',
    nombre: 'Libramiento',
    codigo: 'E06-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '456233-53453-5454-5655',
    idTramo: 'E08',
    nombre: 'Entronque E08',
    codigo: 'E08-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '2233-53453-5454-5655',
    idTramo: 'TPL',
    nombre: 'Tronco principal',
    codigo: 'TPL-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '6233-53453-5454-5655',
    idTramo: 'G',
    nombre: 'GAZA',
    codigo: 'G-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '00233-53453-5454-5655',
    idTramo: 'E11',
    nombre: 'Libramiento',
    codigo: 'E11-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '7233-53453-5454-5655',
    idTramo: 'E12',
    nombre: 'Libramiento',
    codigo: 'E12-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '0595-53453-5454-5655',
    idTramo: 'E13',
    nombre: 'Libramiento',
    codigo: 'E13-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '236-53453-5454-5655',
    idTramo: 'E14',
    nombre: 'Libramiento',
    codigo: 'E14-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '929308-53453-5454-5655',
    idTramo: 'E15',
    nombre: 'Libramiento',
    codigo: 'E15-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '23542-53453-5454-5655',
    idTramo: 'E16',
    nombre: 'Libramiento',
    codigo: 'E16-CEM',
    unidadNegocio: 'CEM',
  },
  {
    id: '236267-53453-5454-5655',
    idTramo: 'E17',
    nombre: 'Libramiento',
    codigo: 'E17-CEM',
    unidadNegocio: 'CEM',
  },
]

export const tramosIndicadores: any[] = [
  {
    id: 'u3u8-9392-2772-2882',
    nombre: 'GNA 1',
    codigo: 'E06',
    unidadNegocio: 'CEM',
  },
  {
    id: '4322-9392-2772-2882',
    nombre: 'Libramiento',
    codigo: 'E08',
    unidadNegocio: 'CEM',
  },
  {
    id: '9982-9392-2772-2882',
    nombre: 'Ecatepec - Peñón, y Ramal Periférico',
    codigo: 'TPL',
    unidadNegocio: 'CEM',
  },
  {
    id: '1255-9392-2772-2882',
    nombre: 'Texcoco - Aut. México - Puebla y Ramal Bordo de Xochiaca',
    codigo: 'E13',
    unidadNegocio: 'CEM',
  },
  {
    id: '2211-9392-2772-2882',
    nombre: 'Lago de Guadalupe - Tultepec',
    codigo: 'E16',
    unidadNegocio: 'CEM',
  },
]

export const deterioroIndicadores: any[] = [
  {
    id: 'u3u8-9392-2772-2882',
    nombre: 'Regularidad superficial',
    codigo: 'IRI',
  },
  { id: '2338-9392-2772-2882', nombre: 'Fricción', codigo: 'CFR' },
  { id: '0997-9392-2772-2882', nombre: 'Macrotextura', codigo: 'TEX' },
  { id: '6554-9392-2772-2882', nombre: 'Roderas', codigo: 'ROD' },
  {
    id: 'asa3-9392-2772-2882',
    nombre: 'Falta de capacidad portante',
    codigo: 'DEF',
  },
  {
    id: '1289-9392-2772-2882',
    nombre: 'Fisuración longitudinal fuera de rodadas',
    codigo: 'FL1',
  },
  {
    id: '5655-9392-2772-2882',
    nombre: 'Fisuración longitudinal en rodadas',
    codigo: 'FL2',
  },
  {
    id: '3434-9392-2772-2882',
    nombre: 'Fisuración longitudinal ramificada en rodadas',
    codigo: 'FL3',
  },
  {
    id: '6562-9392-2772-2882',
    nombre: 'Fisuración en malla gruesa en rodadas',
    codigo: 'MGR',
  },
  {
    id: '6666-9392-2772-2882',
    nombre: 'Fisuración en malla fina en rodadas',
    codigo: 'MFR',
  },
  {
    id: '7777-9392-2772-2882',
    nombre: 'Fisuración en malla gruesa fuera de rodadas',
    codigo: 'MGF',
  },
  {
    id: '1111-9392-2772-2882',
    nombre: 'Fisuración en malla fina fuera de rodadas',
    codigo: 'MFF',
  },
  {
    id: '4433-9392-2772-2882',
    nombre: 'Fisuración transversal aislada',
    codigo: 'FTA',
  },
  {
    id: '7675-9392-2772-2882',
    nombre: 'Fisuración transversal sistemática',
    codigo: 'FTS',
  },
  { id: '9865-9392-2772-2882', nombre: 'Fisuración errática', codigo: 'FER' },
  {
    id: '1256-9392-2772-2882',
    nombre: 'Peladuras / pérdida de agregados',
    codigo: 'PEA',
  },
  { id: '9802-9392-2772-2882', nombre: 'Baches', codigo: 'BAC' },
  {
    id: '7895-9392-2772-2882',
    nombre: 'Exudaciones de asfalto',
    codigo: 'EXA',
  },
  {
    id: '4322-9392-2772-2882',
    nombre: 'Hundimientos localizados',
    codigo: 'HUN',
  },
  {
    id: '5687-9392-2772-2882',
    nombre: 'Textura cerrada o con sensación de arrastre',
    codigo: 'ARR',
  },
  {
    id: '3225-9392-2772-2882',
    nombre: 'Rotura de esquina en base tratada con cemento',
    codigo: 'ESO',
  },
  {
    id: '3225-9392-2772-2882',
    nombre: 'Escalonamiento de base tratada con cemento',
    codigo: 'ESC',
  },
]

export const gazaIndicadores: any[] = [
  { nombre: 'Gaza', codigo: 'G' },
  { nombre: 'Sentido creciente', codigo: 'SC' },
  { nombre: 'Sentido decreciente', codigo: 'SD' },
]

export const carrilIndicadores: any[] = [
  { nombre: 'Alta + Acotamiento', codigo: 'AA' },
  { nombre: 'Baja + Acotamiento', codigo: 'BA' },
  { nombre: 'Cuerpo completo', codigo: 'CC' },
]

export const seguimientoIndicadores: any[] = [
  { nombre: 'SOM', codigo: 'SOM' },
  { nombre: 'MSI', codigo: 'MSI' },
  { nombre: 'MST', codigo: 'MST' },
  { nombre: 'Tekia', codigo: 'Tekia' },
  { nombre: 'Otros', codigo: 'Otros' },
]
