// obtiene los elementos diferentes entre 2 listas usando como criterio el argumento property
export const disjoinLists = (
  array1: any[],
  array2: any[],
  property: string
) => {
  let diferencias = array1.filter(
    (item: any) => !array2.map((el: any) => el).includes(item[property])
  )

  return diferencias
}
