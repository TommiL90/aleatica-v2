'use client'
import { cn } from "@/lib/utils";
import { disjoinLists } from "@/utils/disjoin-lists";
import { ChangeEvent, useEffect, useId, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DeteriorosProps {

  deteriorosSelected: any[],
  onChange: Function
}

let ids: string[] = new Array();

export function RoadSurfaceDamages(props: DeteriorosProps) {
  const [currentSelectValue, setCurrentSelectValue] = useState('');
  const [items, setItems] = useState(props.deteriorosSelected);
  const deteriorosList: any[] = []
  const options = disjoinLists(
    deteriorosList,
    items,
    "value"

  )

  const [_document, set_document] = useState<Document>();
  useEffect(() => {
    set_document(document)
  }, [])

  const newId = useId();

  for (let i = 0; i < props.deteriorosSelected.length; i++) {
    const val = crypto.randomUUID();
    ids.push(val);
  }

  const handleAgregarDeterioro = (e: any, id: any) => {

    if (currentSelectValue == null) {
      return;
    }
    const list: any = [
      ...items,
      {
        id: crypto.randomUUID(),
        label: currentSelectValue['label'],
        value: currentSelectValue['value'],
      }
    ];

    setItems(list)
    setCurrentSelectValue(null)

    if (typeof props.onChange === 'function') {
      props.onChange(list);
    }
  }

  const handleEliminarDeterioro = (e: any, id: number) => {

    if (id == 0) {
      return;
    }

    const list: any = items.filter(item => item['value'] !== id);

    setItems(list);

    if (typeof props.onChange === 'function') {
      props.onChange(list);
    }
  }

  return (
    <div className="my-4">
      <div className="flex w-full">
        <div className='w-7/12'>
          <div className='mb-6'>
            <Select onValueChange={(newValue) => setCurrentSelectValue(newValue)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona deterioro" />
              </SelectTrigger>
              <SelectContent>
                {options.map(item => <SelectItem key={item.value} value={item}>{item.label}</SelectItem>)}
              </SelectContent>
            </Select>
  
          </div>
          <div className="mb-4 mt-2">
            <button
              disabled={currentSelectValue === null}
              onClick={(e: any) => handleAgregarDeterioro(e, 0)}
              type="button"
              className={cn(
                'w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto',
                currentSelectValue !== null
                  ? 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  : 'border-blue-300 bg-blue-400 text-gray-900 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              )}
            >
              Adicionar especialidad
            </button>
          </div>
          {/* <div >
            <label className='mb-4 font-semibold text-gray-800'> Codigo</label>
            <p className='m-4 text-sm text-gray-600'>
              {currentSelectValue !== null ? currentSelectValue["code"] : `-`}
            </p>
          </div>
          <div >
            <label className='mb-4 font-semibold text-gray-800'> Subcategoria / Especialidad</label>
            <p className='m-4 text-sm text-gray-600'>

              {currentSelectValue !== null ? currentSelectValue["subcategoria"] : `-`}
              /
              {currentSelectValue !== null ? currentSelectValue["especialidad"] : `-`}
            </p>
          </div> */}
          <div>
            <label htmlFor="idIntervencion" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Id intervencion - localizacion</label>
            <input type="text" disabled={true} name="idIntervencion" value={""} className='block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500' />
          </div>

        </div>
        <div className='mx-2 h-[430px] w-5/12  border-l'>
          <h2 className={cn(
            'py-2 pl-2 text-xs font-semibold uppercase text-gray-700',
            props.deteriorosSelected.length === 0
              ? 'border-red-400 bg-red-100 text-red-800 focus:border-red-400 focus:ring-red-400 dark:border-red-600 dark:bg-red-700 dark:text-red-400 dark:placeholder:text-red-400 dark:focus:border-red-500 dark:focus:ring-red-500'
              : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-400'
          )}
          >
            Deterioros Agregados
          </h2>
          <div className='h-[420px] w-full overflow-y-scroll'>
            <ul className='mb-2 ml-2 '>
              {
                items.length > 0 ?
                  items.map((item: any, idx: number) => (
                    // <li key={idx} className="bg-white my-1 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    //     <span className='block w-[240px] text-sm overflow-hidden text-ellipsis'>{item.label}</span>
                    //     <span className='block w-full text-right'>
                    //         <button onClick={(e: any)=>handleEliminarDeterioro(e, item.value)} className="font-medium text-xs text-blue-600 dark:text-blue-500 hover:underline">Eliminar</button>
                    //     </span>

                    // </li>

                    <span key={idx} id="badge-dismiss-green" className="me-2 mt-2 inline-flex items-center rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      {item.label}
                      <button
                        type="button"
                        onClick={(e: any) => handleEliminarDeterioro(e, item.value)}
                        className="ms-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-green-400 hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                        aria-label="Remove"
                      >
                        <svg className="size-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <   span className="sr-only">Remove badge</span>
                      </button>
                    </span>
                  ))
                  :
                  <li className="my-8 bg-white text-sm  hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    No hay deterioros para esta medicion.
                  </li>
              }

            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
