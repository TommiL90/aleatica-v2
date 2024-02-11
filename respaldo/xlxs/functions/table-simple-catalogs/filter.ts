export const filtro = (item: any, subespecialities: any[]): boolean => {
  const cond = subespecialities.some(
    (sub) => sub.especialityId === Number(item.especialidad),
  )

  if (!cond) {
    return (
      item.nombreUnidadSimple !== '' &&
      item.descripcionUnidadSimple !== '' &&
      item.subCategoria !== '' &&
      item.especialidad !== ''
    )
  } else {
    return (
      item.nombreUnidadSimple !== '' &&
      item.descripcionUnidadSimple !== '' &&
      item.subCategoria !== '' &&
      item.especialidad !== '' &&
      item.subEspecialidad !== null
    )
  }
}
