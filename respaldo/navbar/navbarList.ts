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
    title: "Panel",
    href: "/",
  },
  {
    title: "Datos Generales",
    firstSubItems: [
      {
        title: "Unidades de Negocios",
        description: "Información de unidad de negocios",
        secondSubItems: [
          {
            title: "Maestro unidad de negocios",
            description: "Informacion de unidad de negocios",
            thirdSubItems: [
              {
                title: "Ficha unidad de negocios",
                description: "Repositorio de unidad de negocios",
                href: "#FichaUnidadDeNegocios",
              },
              {
                title: "Indicadores MR",
                description: "Breve texto introductorio del menú",
                href: "#IndicadoresMR",
              },
              {
                title: "País",
                description: "Breve texto introductorio del menú",
                href: "#Pais",
              },
              {
                title: "Zonas geográficas",
                description: "Breve texto introductorio del menú",
                href: "#ZonasGeograficas",
              },
              {
                title: "Administración competente",
                description: "Breve texto introductorio del menú",
                href: "#AdministracionCompetente",
              },
            ],
          },
          {
            title: "Inventario de tramos",
            description: "Datos de inventarios de tramos",
            thirdSubItems: [
              {
                title: "Tramos",
                description: "Inventario de tramos",
                href: "#Tramos",
              },
              {
                title: "Entronques",
                description: "Inventario de entronques",
                href: "#Entronques",
              },
              {
                title: "Gaza / Cuerpo",
                description: "Inventario de gazas / cuerpos",
                href: "#GazaCuerpo",
              },
              {
                title: "Calzada",
                description: "Inventario de calzadas",
                href: "#Calzada",
              },
              {
                title: "Carril",
                description: "Inventario de carriles",
                href: "#Carril",
              },
            ],
          },
          {
            title: "TCA",
            description: "Tramos de concentracion de accidentes",
            thirdSubItems: [
              {
                title: "Catálogo de TCA",
                description: "Inventario de TCAs",
                href: "#CatalogoTCA",
              },
            ],
          },
        ],
      },
      {
        title: "Identificadores",
        description: "Principales indicadores del sistema",
        secondSubItems: [
          {
            title: "Anno",
            description: "Configuración de años de los proyectos",
            href: "#Anno",
          },
          {
            title: "Formularios de procesos",
            description: "Repositorio de formularios de procesos",
            href: "#FormulariosDeProcesos",
          },
          {
            title: "Categorías del Proyecto",
            description: "Repositorio de categorías del Proyecto",
            href: "#CategoriasDelProyecto",
          },
          {
            title: "Categorías de Actuación",
            description: "Repositorio de categorías de actuación",
            href: "#CategoriasDeActuacion",
          },
          {
            title: "Subcategorías de Actuación",
            description: "Repositorio de subcategorías de actuación",
            href: "#SubcategoriasDeActuacion",
          },
          {
            title: "Especialidades de Actuación",
            description: "Repositorio de especialidades de actuación",
            href: "#EspecialidadesDeActuacion",
          },
          {
            title: "Ámbito de Actuación",
            description: "Repositorio de ámbitos de actuación",
            href: "#AmbitoDeActuacion",
          },
          {
            title: "Unidad de obra",
            description: "Repositorio de unidades de obra",
            href: "#UnidadDeObra",
          },
          {
            title: "Moneda",
            description: "Tipos de monedas",
            href: "#Moneda",
          },
          {
            title: "Posición",
            description: "Repositorio de posiciones",
            href: "#Posicion",
          },
          {
            title: "Disposición",
            description: "Repositorio de disposiciones",
            href: "#Disposicion",
          },
          {
            title: "Lado",
            description: "Repositorio de lados",
            href: "#Lado",
          },
          {
            title: "Calificación",
            description: "Repositorio de calificaciones",
            href: "#Calificacion",
          },
          {
            title: "Número de estructuras",
            description: "Repositorio de número de estructuras",
            href: "#NumeroDeEstructuras",
          },
          {
            title: "Tipo de estructura",
            description: "Repositorio de tipos de estructuras",
            href: "#TipoDeEstructura",
          },
          {
            title: "Elemento",
            description: "Repositorio de elementos",
            href: "#Elemento",
          },
          {
            title: "Eje",
            description: "Repositorio de ejes",
            href: "#Eje",
          },
          {
            title: "Tipología",
            description: "Repositorio de tipologías",
            href: "#Tipologia",
          },
          {
            title: "Prioridad",
            description: "Repositorio de prioridades",
            href: "#Prioridad",
          },
        ],
      },
    ],
  },
  {
    title: "Proyectos",
    firstSubItems: [
      {
        title: "Nuevo Proyecto",
        description: "Crea nuevo proyecto",
        href: "#NuevoProyecto",
      },
      {
        title: "Proyectos en desarrollo",
        description: "Listado de proyectos en desarrollo",
        href: "#ProyectosEnDesarrollo",
      },
      {
        title: "Proyectos cerrados",
        description: "Listado de proyectos cerrados",
        href: "#ProyectosCerrados",
      },
    ],
  },
  {
    title: "Catálogos Globales",
    firstSubItems: [
      {
        title: "Subespecialidades de Actuación",
        description: "Repositorio de subespecialidades de actuación",
        href: "#SubespecialidadesActuacion",
      },
      {
        title: "Unidades simples",
        description: "Breve texto introductorio del menú",
        href: "#UnidadesSimples",
      },
      {
        title: "Unidades compuestas",
        description: "Breve texto introductorio del menú",
        href: "#UnidadesCompuestas",
      },
      {
        title: "Deterioros",
        description: "Breve texto introductorio del menú",
        href: "#Deterioros",
      },
    ],
  },
  {
    title: "Consultas y Reportes",
    firstSubItems: [
      {
        title: "Mediciones",
        description: "Reportes preconfigurados de mediciones de proyecto",
        secondSubItems: [
          {
            title: "Mediciones Resumen US",
            description: "Breve texto introductorio del menú",
            href: "#MedicionesResumenUS",
          },
          {
            title: "Mediciones Resumen UC",
            description: "Breve texto introductorio del menú",
            href: "#MedicionesResumenUC",
          },
          {
            title: "Mediciones Resumen Actuaciones",
            description: "Breve texto introductorio del menú",
            href: "#MedicionesResumenActuaciones",
          },
          {
            title: "Mediciones Resumen Actuaciones vs UOC",
            description: "Breve texto introductorio del menú",
            href: "#MedicionesResumenActuacionesVsUOC",
          },
          {
            title: "Mediciones Resumen Tramos",
            description: "Breve texto introductorio del menú",
            href: "#MedicionesResumenTramos",
          },
          {
            title: "Ficha de Mediciones",
            description: "Breve texto introductorio del menú",
            href: "#FichaDeMediciones",
          },
        ],
      },
      {
        title: "Precios planificación",
        description:
          "Reportes preconfigurados de planificación de precios de proyecto",
        secondSubItems: [
          {
            title: "Precios Unidades Simples",
            description: "Breve texto introductorio del menú",
            href: "#PreciosUnidadesSimples",
          },
          {
            title: "Precios Unidades Compuestas",
            description: "Breve texto introductorio del menú",
            href: "#PreciosUnidadesCompuestas",
          },
        ],
      },
      {
        title: "Presupuesto planificación",
        description:
          "Reportes preconfigurados de planificación de precios de proyecto",
        secondSubItems: [
          {
            title: "Presupuesto Técnico PxQ US",
            description: "Breve texto introductorio del menú",
            href: "#PresupuestoTecnicoPxQUS",
          },
          {
            title: "Presupuesto Técnico PxQ UC",
            description: "Breve texto introductorio del menú",
            href: "#PresupuestoTecnicoPxQUC",
          },
          {
            title: "Presupuesto Técnico PxQ Actuaciones 1",
            description: "Breve texto introductorio del menú",
            href: "#PresupuestoTecnicoPxQActuaciones1",
          },
          {
            title: "Presupuesto Técnico PxQ Actuaciones 2",
            description: "Breve texto introductorio del menú",
            href: "#PresupuestoTecnicoPxQActuaciones2",
          },
          {
            title: "Ratio Promedio de Actuaciones",
            description: "Breve texto introductorio del menú",
            href: "#RatioPromedioActuaciones",
          },
        ],
      },
      {
        title: "Otras consultas",
        description: "Reportes dinámicos por proyecto de presupuesto",
        secondSubItems: [
          {
            title: "Costo de Proyectos",
            description: "Breve texto introductorio del menú",
            href: "#CostoDeProyectos",
          },
          {
            title: "Proyectos por Subcategoría",
            description: "Breve texto introductorio del menú",
            href: "#ProyectosPorSubcategoria",
          },
        ],
      },
    ],
  },
  {
    title: "Usuario",
    firstSubItems: [
      {
        title: "Mi perfil",
        description: "Configurar mi cuenta de usuario",
        href: "#MiPerfil",
      },
      {
        title: "Configuración de usuarios",
        description: "Defina usuarios y sus privilegios",
        href: "#ConfiguracionUsuarios",
      },
      {
        title: "Roles",
        description: "Configuración de roles",
        href: "#Roles",
      },
      {
        title: "Permisos",
        description: "Configuración de permisos",
        href: "#Permisos",
      },
      {
        title: "Departamentos",
        description: "Lista de departamentos de la organización",
        href: "#Departamentos",
      },
      {
        title: "Cargos",
        description: "Lista de cargos de la organización",
        href: "#Cargos",
      },
      {
        title: "Tareas y actividades",
        description: "Tareas y actividades del usuario",
        href: "#TareasActividades",
      },
      {
        title: "Cerrar sesión",
        description: "Salir de su cuenta de usuario",
        href: "#CerrarSesion",
      },
    ],
  },
  {
    title: "Documentación",
    href: "#",
  },
]
