import { SimpleUd } from '@/respaldo/contexts/types'
import { getEmpty } from './get-empty'

export const moreRows = (unidades: SimpleUd[], exceed = 100) => [
  ...unidades,
  ...Array.from({ length: exceed }, (item, idx) => ({
    ...getEmpty(unidades.length + 1),
    idauto: unidades.length + idx + 1,
    // counter: getCounter(unidades.length + idx + 1)
  })),
]
