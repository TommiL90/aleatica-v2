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
                href: '/maestros/unidades_negocios',
              },
              {
                title: 'MRIndicators',
                description: 'Breve texto introductorio del menú',
                href: '/maestros/desempeno',
              },
              {
                title: 'country',
                description: 'Breve texto introductorio del menú',
                href: '/zonas_geograficas/pais',
              },
              {
                title: 'geographicZones',
                description: 'Breve texto introductorio del menú',
                href: '/zonas_geograficas/zonas',
              },
              {
                title: 'competentAdministration',
                description: 'Breve texto introductorio del menú',
                href: '/zonas_geograficas/administracion',
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
                href: '/elementos_carretera/tramos',
              },
              {
                title: 'junctions',
                description: 'Inventario de entronques',
                href: '/elementos_carretera/entronque',
              },
              {
                title: 'gaza',
                description: 'Inventario de gazas / cuerpos',
                href: '/elementos_carretera/gaza',
              },
              {
                title: 'roadway',
                description: 'Inventario de calzadas',
                href: '/elementos_carretera/calzada',
              },
              {
                title: 'lane',
                description: 'Inventario de carriles',
                href: '/elementos_carretera/carril',
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
                href: '/elementos_carretera/tca',
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
            href: 'maestros/year',
          },
          {
            title: 'processForms',
            description: 'Repositorio de formularios de procesos',
            href: 'maestros/formularios',
          },
          {
            title: 'projectCategories',
            description: 'Repositorio de categorías del Proyecto',
            href: '/maestros/categorias_proyecto',
          },
          {
            title: 'actingCategories',
            description: 'Repositorio de categorías de actuación',
            href: '/maestros/categorias_actuacion',
          },
          {
            title: 'actingSubcategories',
            description: 'Repositorio de subcategorías de actuación',
            href: '/maestros/subcategorias_actuacion',
          },
          {
            title: 'actingSpecialties',
            description: 'Repositorio de especialidades de actuación',
            href: '/maestros/especialidades_actuacion',
          },
          {
            title: 'scopeOfAction',
            description: 'Repositorio de ámbitos de actuación',
            href: '/maestros/ambito',
          },
          {
            title: 'unitOfMeasure',
            description: 'Repositorio de unidades de obra',
            href: '/maestros/unidad_obra',
          },
          {
            title: 'currency',
            description: 'Tipos de monedas',
            href: '/maestros/moneda',
          },
          {
            title: 'position',
            description: 'Repositorio de posiciones',
            href: '/maestros/posicion',
          },
          {
            title: 'disposition',
            description: 'Repositorio de disposiciones',
            href: '/maestros/disposicion',
          },
          {
            title: 'side',
            description: 'Repositorio de lados',
            href: '/maestros/lado',
          },
          {
            title: 'rating',
            description: 'Repositorio de calificaciones',
            href: '/maestros/calificacion',
          },
          {
            title: 'numberOfStructures',
            description: 'Repositorio de número de estructuras',
            href: '/maestros/numero_estructura',
          },
          {
            title: 'structureType',
            description: 'Repositorio de tipos de estructuras',
            href: '/maestros/estructura',
          },
          {
            title: 'elementType',
            description: 'Repositorio de elementos',
            href: '/maestros/elemento',
          },
          {
            title: 'axis',
            description: 'Repositorio de ejes',
            href: '/maestros/eje',
          },
          {
            title: 'typology',
            description: 'Repositorio de tipologías',
            href: '/maestros/tipologia',
          },
          {
            title: 'priority',
            description: 'Repositorio de prioridades',
            href: '/maestros/prioridad',
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
        href: '/proyectos/nuevo',
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
        href: '/maestros/subespecialidades_actuacion',
      },
      {
        title: 'simpleUnits',
        description: 'Breve texto introductorio del menú',
        href: '/maestros/udsimples',
      },
      {
        title: 'compoundUnits',
        description: 'Breve texto introductorio del menú',
        href: '/maestros/udcompuestos',
      },
      {
        title: 'deteriorations',
        description: 'Breve texto introductorio del menú',
        href: '/maestros/deterioros',
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
            href: '/consultas/mediciones/udsimples',
          },
          {
            title: 'UCSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/mediciones/udcompuestas',
          },
          {
            title: 'actingSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/mediciones/actuaciones',
          },
          {
            title: 'actingVsUOCSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/mediciones/actuaciones-uoc',
          },
          {
            title: 'segmentsSummaryMeasurements',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/mediciones/resumen_tramos',
          },
          {
            title: 'measurementSheet',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/mediciones/ficha_mediciones',
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
            href: '/precios/udsimples',
          },
          {
            title: 'compoundUnitsPrices',
            description: 'Breve texto introductorio del menú',
            href: '/precios/udcompuestas',
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
            href: '/consultas/pxq/udsimples',
          },
          {
            title: 'technicalBudgetPxQUC',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/pxq/udcompuestas',
          },
          {
            title: 'technicalBudgetPxQActions1',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/pxq/actuacion1',
          },
          {
            title: 'technicalBudgetPxQActions2',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/pxq/actuacion2',
          },
          {
            title: 'averageActionsRatio',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/pxq/ratioP',
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
            href: '/consultas/costos/proyecto',
          },
          {
            title: 'projectsBySubcategory',
            description: 'Breve texto introductorio del menú',
            href: '/consultas/costos/tareas',
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
        href: '/usuarios/perfil',
      },
      {
        title: 'userConfiguration',
        description: 'Defina usuarios y sus privilegios',
        href: '/usuarios',
      },
      {
        title: 'userRoles',
        description: 'Configuración de roles',
        href: '/usuarios/roles',
      },
      {
        title: 'permissions',
        description: 'Configuración de permisos',
        href: '/usuarios/permisos',
      },
      {
        title: 'departments',
        description: 'Lista de departamentos de la organización',
        href: '/usuarios/departamentos',
      },
      {
        title: 'userPosition',
        description: 'Lista de cargos de la organización',
        href: '/usuarios/cargos',
      },
      {
        title: 'tasks',
        description: 'Tareas y actividades del usuario',
        href: '/usuarios/tareas',
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
