export interface NavBarThirdSubItem {
  title: string
  description: string
  href: string
}

export interface NavBarSecondSubItem {
  title: string
  description: string
  href?: string
  thirdSubItems?: NavBarThirdSubItem[]
}

export interface NavBarFirstSubItem {
  title: string
  description: string
  href?: string
  secondSubItems?: NavBarSecondSubItem[]
}

export interface NavbarItem {
  title: string
  href?: string
  firstSubItems?: NavBarFirstSubItem[]
}

export const navbarList: NavbarItem[] = [
  {
    title: 'dashboard',
    href: '/',
  },
  {
    title: 'generalData',
    firstSubItems: [
      {
        title: 'businessUnits',
        description: 'Información de unidad de negocios',
        secondSubItems: [
          {
            title: 'businessUnitMaster',
            description: 'Informacion de unidad de negocios',
            thirdSubItems: [
              {
                title: 'businessUnitRepository',
                description: 'Repositorio de unidad de negocios',
                href: '#FichaUnidadDeNegocios',
              },
              {
                title: 'MRIndicators',
                description: 'Breve texto introductorio del menú',
                href: '#IndicadoresMR',
              },
              {
                title: 'country',
                description: 'Breve texto introductorio del menú',
                href: '#Pais',
              },
              {
                title: 'geographicZones',
                description: 'Breve texto introductorio del menú',
                href: '#ZonasGeograficas',
              },
              {
                title: 'competentAdministration',
                description: 'Breve texto introductorio del menú',
                href: '#AdministracionCompetente',
              },
            ],
          },
          {
            title: 'segmentInventory',
            description: 'Datos de inventarios de tramos',
            thirdSubItems: [
              {
                title: 'segments',
                description: 'Inventario de tramos',
                href: '#Tramos',
              },
              {
                title: 'junctions',
                description: 'Inventario de entronques',
                href: '#Entronques',
              },
              {
                title: 'gaza',
                description: 'Inventario de gazas / cuerpos',
                href: '#GazaCuerpo',
              },
              {
                title: 'roadway',
                description: 'Inventario de calzadas',
                href: '#Calzada',
              },
              {
                title: 'lane',
                description: 'Inventario de carriles',
                href: '#Carril',
              },
            ],
          },
          {
            title: 'TCA',
            description: 'Tramos de concentracion de accidentes',
            thirdSubItems: [
              {
                title: 'TCACatalog',
                description: 'Inventario de TCAs',
                href: '#CatalogoTCA',
              },
            ],
          },
        ],
      },
      {
        title: 'identifiers',
        description: 'Principales indicadores del sistema',
        secondSubItems: [
          {
            title: 'year',
            description: 'Configuración de años de los proyectos',
            href: '#Anno',
          },
          {
            title: 'processForms',
            description: 'Repositorio de formularios de procesos',
            href: '#FormulariosDeProcesos',
          },
          {
            title: 'projectCategories',
            description: 'Repositorio de categorías del Proyecto',
            href: '#CategoriasDelProyecto',
          },
          {
            title: 'actingCategories',
            description: 'Repositorio de categorías de actuación',
            href: '#CategoriasDeActuacion',
          },
          {
            title: 'actingSubcategories',
            description: 'Repositorio de subcategorías de actuación',
            href: '#SubcategoriasDeActuacion',
          },
          {
            title: 'actingSpecialties',
            description: 'Repositorio de especialidades de actuación',
            href: '#EspecialidadesDeActuacion',
          },
          {
            title: 'scopeOfAction',
            description: 'Repositorio de ámbitos de actuación',
            href: '#AmbitoDeActuacion',
          },
          {
            title: 'unitOfMeasure',
            description: 'Repositorio de unidades de obra',
            href: '#UnidadDeObra',
          },
          {
            title: 'currency',
            description: 'Tipos de monedas',
            href: '#Moneda',
          },
          {
            title: 'position',
            description: 'Repositorio de posiciones',
            href: '#Posicion',
          },
          {
            title: 'disposition',
            description: 'Repositorio de disposiciones',
            href: '#Disposicion',
          },
          {
            title: 'side',
            description: 'Repositorio de lados',
            href: '#Lado',
          },
          {
            title: 'rating',
            description: 'Repositorio de calificaciones',
            href: '#Calificacion',
          },
          {
            title: 'numberOfStructures',
            description: 'Repositorio de número de estructuras',
            href: '#NumeroDeEstructuras',
          },
          {
            title: 'structureType',
            description: 'Repositorio de tipos de estructuras',
            href: '#TipoDeEstructura',
          },
          {
            title: 'elementType',
            description: 'Repositorio de elementos',
            href: '#Elemento',
          },
          {
            title: 'axis',
            description: 'Repositorio de ejes',
            href: '#Eje',
          },
          {
            title: 'typology',
            description: 'Repositorio de tipologías',
            href: '#Tipologia',
          },
          {
            title: 'priority',
            description: 'Repositorio de prioridades',
            href: '#Prioridad',
          },
        ],
      },
    ],
  },
  {
    title: 'projects',
    firstSubItems: [
      {
        title: 'newProject',
        description: 'Crea nuevo proyecto',
        href: '#',
      },
      {
        title: 'projectsInDevelopment',
        description: 'Listado de proyectos en desarrollo',
        href: '/proyectos',
      },
      {
        title: 'closedProjects',
        description: 'Listado de proyectos cerrados',
        href: '#ProyectosCerrados',
      },
    ],
  },
  {
    title: 'globalCatalogs',
    firstSubItems: [
      {
        title: 'actingSubspecialties',
        description: 'Repositorio de subespecialidades de actuación',
        href: '#SubespecialidadesActuacion',
      },
      {
        title: 'simpleUnits',
        description: 'Breve texto introductorio del menú',
        href: '/catalogos/udsimples',
      },
      {
        title: 'compoundUnits',
        description: 'Breve texto introductorio del menú',
        href: '/catalogos/udcompuestas',
      },
      {
        title: 'deteriorations',
        description: 'Breve texto introductorio del menú',
        href: '#Deterioros',
      },
    ],
  },
  {
    title: 'queriesAndReports',
    firstSubItems: [
      {
        title: 'measurements',
        description: 'Reportes preconfigurados de mediciones de proyecto',
        secondSubItems: [
          {
            title: 'USSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '#MedicionesResumenUS',
          },
          {
            title: 'UCSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '#MedicionesResumenUC',
          },
          {
            title: 'actingSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '#MedicionesResumenActuaciones',
          },
          {
            title: 'actingVsUOCSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '#MedicionesResumenActuacionesVsUOC',
          },
          {
            title: 'segmentsSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '#MedicionesResumenTramos',
          },
          {
            title: 'measurementSheet',
            description: 'Breve texto introductorio del menú',
            href: '#FichaDeMediciones',
          },
        ],
      },
      {
        title: 'planningPrices',
        description:
          'Reportes preconfigurados de planificación de precios de proyecto',
        secondSubItems: [
          {
            title: 'simpleUnitsPrices',
            description: 'Breve texto introductorio del menú',
            href: '#PreciosUnidadesSimples',
          },
          {
            title: 'compoundUnitsPrices',
            description: 'Breve texto introductorio del menú',
            href: '#PreciosUnidadesCompuestas',
          },
        ],
      },
      {
        title: 'planningBudget',
        description:
          'Reportes preconfigurados de planificación de precios de proyecto',
        secondSubItems: [
          {
            title: 'technicalBudgetPxQUS',
            description: 'Breve texto introductorio del menú',
            href: '#PresupuestoTecnicoPxQUS',
          },
          {
            title: 'technicalBudgetPxQUC',
            description: 'Breve texto introductorio del menú',
            href: '#PresupuestoTecnicoPxQUC',
          },
          {
            title: 'technicalBudgetPxQActions1',
            description: 'Breve texto introductorio del menú',
            href: '#PresupuestoTecnicoPxQActuaciones1',
          },
          {
            title: 'technicalBudgetPxQActions2',
            description: 'Breve texto introductorio del menú',
            href: '#PresupuestoTecnicoPxQActuaciones2',
          },
          {
            title: 'averageActionsRatio',
            description: 'Breve texto introductorio del menú',
            href: '#RatioPromedioActuaciones',
          },
        ],
      },
      {
        title: 'otherQueries',
        description: 'Reportes dinámicos por proyecto de presupuesto',
        secondSubItems: [
          {
            title: 'projectCosts',
            description: 'Breve texto introductorio del menú',
            href: '#CostoDeProyectos',
          },
          {
            title: 'projectsBySubcategory',
            description: 'Breve texto introductorio del menú',
            href: '#ProyectosPorSubcategoria',
          },
        ],
      },
    ],
  },
  {
    title: 'user',
    firstSubItems: [
      {
        title: 'profile',
        description: 'Configurar mi cuenta de usuario',
        href: '#MiPerfil',
      },
      {
        title: 'userConfiguration',
        description: 'Defina usuarios y sus privilegios',
        href: '#ConfiguracionUsuarios',
      },
      {
        title: 'userRoles',
        description: 'Configuración de roles',
        href: '#Roles',
      },
      {
        title: 'permissions',
        description: 'Configuración de permisos',
        href: '#Permisos',
      },
      {
        title: 'departments',
        description: 'Lista de departamentos de la organización',
        href: '#Departamentos',
      },
      {
        title: 'userPosition',
        description: 'Lista de cargos de la organización',
        href: '#Cargos',
      },
      {
        title: 'tasks',
        description: 'Tareas y actividades del usuario',
        href: '#TareasActividades',
      },
      {
        title: 'logout',
        description: 'Salir de su cuenta de usuario',
        href: '#CerrarSesion',
      },
    ],
  },
  {
    title: 'documentation',
    href: '#',
  },
]
