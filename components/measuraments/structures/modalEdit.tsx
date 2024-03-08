import MedicionFichaCampoForm from '@/components/forms/mediciones/medicionFichaCampoEstructuras'
import Loading from '@/components/loading'

interface PropsModalNewItem {
  title: string
  isModalOpen: boolean
  itemSelected: any
  especialidad: any
  tramos: any[]
  // entronques: any[];
  gazas: any[]
  carriles: any[]
  deterioros: any[]
  actuaciones: any[]
  // compuestas: any[];
  prioridades: any[]

  numeroEstructura: any[]
  tipoEstructura: any[]
  eje: any[]
  lado: any[]
  elementoEstructura: any[]
  // posicion: any[];
  // disposicion: any[];
  calificacion: any[]

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
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[900px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
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
                  // entronques={props.entronques}
                  gazas={props.gazas}
                  carriles={props.carriles}
                  deterioros={props.deterioros}
                  actuaciones={props.actuaciones}
                  // compuestas={props.compuestas}
                  prioridades={props.prioridades}
                  numeroEstructura={props.numeroEstructura}
                  tipoEstructura={props.tipoEstructura}
                  eje={props.eje}
                  lado={props.lado}
                  elementoEstructura={props.elementoEstructura}
                  // posicion={props.posicion}
                  // disposicion={props.disposicion}
                  calificacion={props.calificacion}
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
                          lado: props.itemSelected.lado,
                          tipoEstructura: props.itemSelected.tipoEstructura,
                          numeroEstructura: props.itemSelected.numeroEstructura,
                          elementoEstructura:
                            props.itemSelected.elementoEstructura,
                          calificacion: props.itemSelected.calificacion,
                          eje: props.itemSelected.eje,

                          compuesta: props.itemSelected.compuesta,
                          prioridad: props.itemSelected.prioridad,
                          observaciones: props.itemSelected.observacion,
                          anchoCalzada: props.itemSelected.anchoCalzada,
                          esviaje: props.itemSelected.esviaje,
                          coseno: props.itemSelected.coseno,
                          longitudCadaJunta:
                            props.itemSelected.longitudCadaJunta,
                          noElementos: props.itemSelected.noElementos,
                          longitudTotalJuntas:
                            props.itemSelected.longitudTotalJuntas,
                          porcentajeAfectacion:
                            props.itemSelected.porcentajeAfectacion,
                          longitudJuntasAfectadas:
                            props.itemSelected.longitudJuntasAfectadas,
                          noEjes: props.itemSelected.noEjes,
                          noApoyos: props.itemSelected.noApoyos,
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
