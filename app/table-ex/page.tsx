"use client"

import { useCallback, useMemo, useState } from "react"
import {
  CellChange,
  Column,
  ReactGrid,
  Row,
  TextCell,
} from "@silevis/reactgrid"

interface Person {
  name: string
  surname: string
}

const getPeople = (): Person[] => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
  { name: "", surname: "" },
]

const getColumns = (): Column[] => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
]

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
  ],
}

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
    ],
  })),
]

const applyChangesToPeople = (
  changes: CellChange[],
  prevPeople: Person[]
): Person[] => {
  const updatedPeople = [...prevPeople] // Clonamos prevPeople para evitar mutar el estado original
  changes.forEach((change) => {
    const personIndex = Number(change.rowId)
    if (!isNaN(personIndex) && updatedPeople[personIndex]) {
      const fieldName = change.columnId as keyof Person
      if (fieldName in updatedPeople[personIndex] && "text" in change.newCell) {
        const textCellValue = (change.newCell as TextCell).text
        updatedPeople[personIndex][fieldName] = textCellValue
      }
    }
  })
  return updatedPeople
}
export default function IndexPage() {
  const [people, setPeople] = useState<Person[]>(getPeople())

  const rows = useMemo(() => getRows(people), [people])
  const columns = useMemo(() => getColumns(), [])

  const handleChanges = useCallback(
    (changes: CellChange[]) => {
      setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople))
    },
    [setPeople]
  )
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
    </section>
  )
}