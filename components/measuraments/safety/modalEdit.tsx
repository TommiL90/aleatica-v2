import MedicionFichaCampoForm from '@/components/forms/mediciones/medicionFichaCampoSafety'
import Loading from '@/components/loading'

interface PropsModalNewItem {
  title: string
  isModalOpen: boolean
  itemSelected: any
  especialidad: any
  tramos: any[]
  entronques: any[]
  gazas: any[]
  carriles: any[]
  deterioros: any[]
  actuaciones: any[]

  prioridades: any[]

  tipologias: any[]
  posiciones: any[]

  onClose: Function
  onMutate: Function
}

export default function ModalNewItem(props: PropsModalNewItem) {
  return (
    <>
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[850px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full w-full">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {props.title}
              </h3>
              <button
                type="button"
                onClick={() => props.onClose()}
                className="ml-auto inline-flex h-8 w-8  items-center justify-center bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="space-y-6 p-6">
              {props.itemSelected !== undefined ? (
                <MedicionFichaCampoForm
                  especialidad={props.especialidad}
                  tramos={props.tramos}
                  entronques={props.entronques}
                  gazas={props.gazas}
                  carriles={props.carriles}
                  deterioros={props.deterioros}
                  actuaciones={props.actuaciones}
                  // compuestas={props.compuestas}
                  prioridades={props.prioridades}
                  tipologias={props.tipologias}
                  posiciones={props.posiciones}
                  initValue={
                    props.itemSelected !== null
                      ? {
                          fechaEstudioPrevio:
                            props.itemSelected.fechaPrevia.split('T')[0],
                          tramo: props.itemSelected.tramo,
                          entronque: props.itemSelected.entronque,
                          gaza: props.itemSelected.cuerpo,
                          carril: props.itemSelected.carril,
                          cadenamientoInicial:
                            props.itemSelected.cadenamientoInicial,
                          cadenamientoFinal:
                            props.itemSelected.cadenamientoFinal,
                          deterioros: props.itemSelected.deterioros,
                          actuacion: props.itemSelected.actuacion,
                          compuesta: props.itemSelected.compuesta,
                          prioridad: props.itemSelected.prioridad,
                          ancho: props.itemSelected.ancho,
                          espesor: props.itemSelected.espesor,
                          litro: props.itemSelected.litro,
                          tonelada: props.itemSelected.tonelada,
                          observaciones: props.itemSelected.observacion,

                          longitud: props.itemSelected.longitud,
                          unidad: props.itemSelected.ud,
                          porcentajeAfectacion:
                            props.itemSelected.porcentajeAfectacion,
                          longitudAfectadas:
                            props.itemSelected.longitudAfectadas,
                          areaElemento: props.itemSelected.areaElemento,
                          areaTotal: props.itemSelected.areaTotal,
                          noElementosPuntuales:
                            props.itemSelected.noElementosPuntuales,
                          alternativeUnitMeasurementValue:
                            props.itemSelected.alternativeUnitMeasurementValue,
                        }
                      : null
                  }
                  buttonText="Guardar Medicion"
                  onSubmit={(values: any) => props.onMutate(values)}
                />
              ) : (
                <Loading label={''} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  )
}
