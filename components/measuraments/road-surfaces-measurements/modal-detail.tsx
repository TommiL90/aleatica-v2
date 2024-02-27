interface PropsModalDetailItem {
  title: string
  especialidad: any
  isModalOpen: boolean
  itemSelected: any
  tramos: any[]
  entronques: any[]
  gazas: any[]
  carriles: any[]
  prioridades: any[]
  actuaciones: any[]
  compuestas: any[]
  // deterioros: any[];
  onClose: Function
}

export default function ModalDetail(props: PropsModalDetailItem) {
  return (
    <>
      <div
        id="staticModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex w-[700px] items-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div className="max-w-7xlxl relative mx-auto max-h-full w-[780px]">
          <div className="relative bg-white  shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t  p-4 dark:border-gray-600">
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

            <div className="h-[750px] space-y-6 overflow-y-auto p-6">
              {props.itemSelected !== undefined ? (
                <>
                  <div className="mb-2 w-full border-gray-300  p-2 ">
                    <h2 className="mb-2 text-sm font-semibold text-gray-800">
                      Id
                    </h2>
                    <p className="text-sm text-gray-700">
                      {props.itemSelected.idIntervencion}
                    </p>
                  </div>
                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Fecha Previa
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.itemSelected.fechaPrevia.split('T')[0]}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Especialidad
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.especialidad.label}
                      </p>
                    </div>
                  </div>
                  <div className="mb-6 grid gap-6 md:grid-cols-4">
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Tramo
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.tramos.filter(
                          (item: any) =>
                            item.value === props.itemSelected.tramo,
                        ).length > 0
                          ? props.tramos.filter(
                              (item: any) =>
                                item.value === props.itemSelected.tramo,
                            )[0].label
                          : null}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Entronques
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.entronques.filter(
                          (item: any) =>
                            item.value === props.itemSelected.entronque,
                        ).length > 0
                          ? props.entronques.filter(
                              (item: any) =>
                                item.value === props.itemSelected.entronque,
                            )[0].label
                          : null}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Cuerpo
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.gazas.filter(
                          (item: any) =>
                            item.value === props.itemSelected.cuerpo,
                        ).length > 0
                          ? props.gazas.filter(
                              (item: any) =>
                                item.value === props.itemSelected.cuerpo,
                            )[0].label
                          : null}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Carril
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.carriles.filter(
                          (item: any) =>
                            item.value === props.itemSelected.carril,
                        ).length > 0
                          ? props.carriles.filter(
                              (item: any) =>
                                item.value === props.itemSelected.carril,
                            )[0].label
                          : null}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Actuacion
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.actuaciones.filter(
                          (item: any) =>
                            item.value === props.itemSelected.actuacion,
                        ).length > 0
                          ? props.actuaciones.filter(
                              (item: any) =>
                                item.value === props.itemSelected.actuacion,
                            )[0].label
                          : null}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Compuesta
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.compuestas.filter(
                          (item: any) =>
                            item.value === props.itemSelected.compuesta,
                        ).length > 0
                          ? props.compuestas.filter(
                              (item: any) =>
                                item.value === props.itemSelected.compuesta,
                            )[0].label
                          : null}
                      </p>
                    </div>
                    <div className="mb-2 w-full border-gray-300  p-2 ">
                      <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Prioridad
                      </h2>
                      <p className="text-sm text-gray-700">
                        {props.prioridades.filter(
                          (item: any) =>
                            item.value === props.itemSelected.prioridad,
                        ).length > 0
                          ? props.prioridades.filter(
                              (item: any) =>
                                item.value === props.itemSelected.prioridad,
                            )[0].label
                          : null}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2 w-full rounded  border-gray-300 p-2">
                    <h2 className="mb-2 text-sm font-semibold text-gray-800">
                      Deterioros{' '}
                    </h2>
                    {props.itemSelected.deterioros.length > 0 ? (
                      props.itemSelected.deterioros.map(
                        (item: any, idx: number) => (
                          <span
                            key={idx}
                            id="badge-dismiss-green"
                            className="me-2 mt-2 inline-flex items-center rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            {item.label}
                          </span>
                        ),
                      )
                    ) : (
                      <span className="my-8 bg-white text-sm  hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        No hay deterioros para esta medicion.
                      </span>
                    )}
                  </div>
                  <div className="mb-2 w-full rounded  border-gray-300 p-2">
                    <h2 className="mb-2 text-sm font-semibold text-gray-800">
                      Observaciones
                    </h2>
                    <p className="text-sm text-gray-700">
                      {props.itemSelected.observacion}
                    </p>
                  </div>

                  <div className="mb-2 w-full rounded  border-gray-300 p-2">
                    <h2 className="mb-2 bg-gray-50 text-sm font-semibold text-gray-800">
                      Cadenamientos
                    </h2>
                    <div className="mb-6 grid gap-6 md:grid-cols-5">
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Cad.Inicial
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.cadenamientoInicial}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Km
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.km}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          M
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.M}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          L
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.L}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Dist. Seg.
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.distanciaSeguimientoCad}
                        </p>
                      </div>

                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Cad. Final
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.cadenamientoFinal}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Km2
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.km2}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          M4
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.m4}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          O
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.O}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Dist. Prev.
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.distanciaPreviaCad}
                        </p>
                      </div>
                    </div>
                    <h2 className="mb-2 bg-gray-50 text-sm font-semibold text-gray-800">
                      Mediciones
                    </h2>
                    <div className="mb-6 grid gap-6 md:grid-cols-5">
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Longitud
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.longitud}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Ancho
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.ancho}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Area
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.area}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Espesor
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.espesor}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Volumen
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.volumen}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          % de afectación
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.porcentajeAfectacion} %
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Densidad
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.densidad}
                        </p>
                      </div>
                      <div className="mb-2 w-full rounded  border-gray-300 p-2">
                        <h2 className="mb-2 text-sm font-semibold text-gray-800">
                          Tonelada
                        </h2>
                        <p className="text-sm text-gray-700">
                          {props.itemSelected.tonelada}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
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
