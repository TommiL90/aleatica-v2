import { Link } from '@/navigation'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemHeading,
//   AccordionItemButton,
//   AccordionItemPanel,
// } from 'react-accessible-accordion'

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css'

interface Props {
  label: string
  options: any[]
  items: number[]
  onChange: Function
}

export default function PermissionList(props: Props) {
  const [openDropDown, setOpenDropDown] = useState(false)

  console.log(props.options)
  return (
    <>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        {props.label}
      </h3>
      <div className="w-full">
        {/* <Accordion>
          {Object.keys(props.options).map((key: any, idx: number) => (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>{key}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="max-h-[400px] overflow-hidden overflow-y-auto">
                  {props.options[key].map(
                    (item: any, permissionIdx: number) => (
                      <div
                        key={permissionIdx}
                        className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700"
                      >
                        <input
                          id={item.id}
                          onChange={() => {
                            props.onChange(
                              props.items.includes(item.id)
                                ? props.items.filter(
                                    (value: any) => value !== item.id,
                                  )
                                : [...props.items, item.id],
                            )
                          }}
                          value={item.id}
                          checked={props.items.includes(item.id)}
                          type="checkbox"
                          name={`checkbox-${item.id}`}
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="diferido"
                          className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {item.description}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion> */}
      </div>
    </>
  )
}
