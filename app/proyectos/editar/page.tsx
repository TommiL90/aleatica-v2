import React, { Suspense, Fragment } from 'react'
import ProyectoEditarComponent from './proyeto-editar-component'

const ProyectoEditar = () => {
  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <ProyectoEditarComponent />
      </Suspense>
    </Fragment>
  )
}

export default ProyectoEditar
