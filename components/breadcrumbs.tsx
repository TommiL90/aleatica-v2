import Link from 'next/link'
import React from 'react'

interface BreadProps {
  items: any[]
}

export default function Breadcrumbs(props: BreadProps) {
  return (
    <nav
      className="max-h-screen w-full bg-white p-2.5 dark:bg-gray-900 lg:m-auto lg:w-8/12"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {props.items.map((item, index) => {
          if (index == 0) {
            return (
              <li className="inline-flex items-center" key={index}>
                <a
                  href={item['link']}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="mr-2.5 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  {item['label']}
                </a>
              </li>
            )
          }

          if (index == props.items.length - 1) {
            return (
              <li aria-current="page" className="truncate" key={index}>
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-3 w-3 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 truncate text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                    {item['label']}
                  </span>
                </div>
              </li>
            )
          }

          return (
            <li className="truncate" key={index}>
              <div className="flex items-center">
                <svg
                  className="mx-1 h-3 w-3 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href={item['link']}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  {item['label']}
                </a>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
