"use client"

import * as React from "react";
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  CheckboxCell,
  DropdownCell,
  NumberCell,
  TextCell
} from "@silevis/reactgrid";


// We have to handle the isOpen property on our own
// CHANGED: Added an isOpen property
interface Person {
  id: number;
  name: string;
  surname: string;
  isOpen: boolean;
}

const getPeople = (): Person[] => [
  { id: 1, name: "Thomas", surname: "Goldman", isOpen: false },
  { id: 2, name: "Susie", surname: "Quattro", isOpen: false },
  { id: 3, name: "", surname: "", isOpen: false }
];

const getColumns = (): Column[] => [
  { columnId: "id", width: 150 },
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 }
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Id" },
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" }
  ]
};

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: person.id,
    cells: [
      { type: "number", value: person.id },
      {
        type: "dropdown",
        selectedValue: person.name,
        inputValue: person.name,
        isOpen: person.isOpen,
        values: getPeople().map((p) => ({ label: p.name, value: p.name }))
      },
      { type: "text", text: person.surname }
    ]
  }))
];

const applyChanges = (
  changes: CellChange<TextCell | NumberCell | CheckboxCell | DropdownCell>[],
  prevDetails: Person[],
  getEmptyDataRow: () => Person
): Person[] => {
  changes.forEach((change) => {
    const dataRowId = change.rowId as number;
    const fieldName = change.columnId as keyof Person;
    let dataRow = prevDetails.find((d) => d.id === dataRowId);
    if (!dataRow) {
      dataRow = getEmptyDataRow();
      prevDetails.push(dataRow);
    }
    if (change.type === "text" && typeof dataRow[fieldName] === "string") {
      dataRow[fieldName] = change.newCell.text as never;
    } else if (
      change.type === "number" &&
      typeof dataRow[fieldName] === "number"
    ) {
      dataRow[fieldName] = change.newCell.value as never;
    } else if (
      change.type === "checkbox" &&
      typeof dataRow[fieldName] === "boolean"
    ) {
      dataRow[fieldName] = change.newCell.checked as never;
    } else if (change.type === "dropdown") {
      dataRow[fieldName] = change.newCell.inputValue as never;
      // CHANGED: set the isOpen property to the value received.
      dataRow.isOpen = change.newCell.isOpen as never;
    } else {
      console.log("ERROR", change.type, dataRow[fieldName]);
    }
  });
  return [...prevDetails];
};

export default function App() {
  const [people, setPeople] = React.useState<Person[]>(getPeople());

  const rows = getRows(people);
  const columns = getColumns();
  const getEmpty = (): Person => ({
    id: people.length + 1,
    name: "",
    surname: "",
    // CHANGED: Added an isOpen property
    isOpen: false
  });

  const handleChanges = (changes: CellChange<any>[]) => {
    setPeople((prevPeople) => applyChanges(changes, prevPeople, getEmpty));
  };

  return (
    <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges} />
  );
}