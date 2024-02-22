import { MutableRefObject, useCallback, useState } from "react"

interface Dimensions {
  width: number
  height: number
}

interface Translate {
  x: number
  y: number
}

export const useCenteredTree = (
  defaultTranslate: Translate = { x: 0, y: 0 }
): [
  Dimensions | undefined,
  Translate,
  (containerElem: HTMLElement | null) => void,
] => {
  const [translate, setTranslate] = useState<Translate>(defaultTranslate)
  const [dimensions, setDimensions] = useState<Dimensions>()

  const containerRef = useCallback((containerElem: HTMLElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect()
      setDimensions({ width, height })
      setTranslate({ x: width / 2, y: 50 })
    }
  }, [])

  return [dimensions, translate, containerRef]
}
