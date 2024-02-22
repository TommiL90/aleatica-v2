"use client"

import React from "react"
import Tree from "react-d3-tree"

import { useCenteredTree } from "@/hooks/useCenteredTree"

interface Props {
  data: any
  height: number
  orientation: "horizontal" | "vertical"
}

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
}

export default function Treeview(props: Props) {
  const [dimensions, translate, containerRef] = useCenteredTree()
  console.log(props.data)
  return (
    <div className="w-full">
      <div
        id="treeWrapper"
        style={{
          width: "100%",
          height: `${props.height}px`,
          backgroundColor: "#f7f7f7",
        }}
        ref={containerRef}
      >
        <Tree
          data={props.data}
          orientation={props.orientation}
          dimensions={dimensions}
          nodeSize={{
            x: 200,
            y: props.orientation === "horizontal" ? 50 : 100,
          }}
          translate={translate}
          separation={{ siblings: 3, nonSiblings: 3 }}
          renderCustomNodeElement={(rd3tProps) => (
            <g>
              <circle r="15" onClick={() => rd3tProps.toggleNode()} />
              <text
                fill="black"
                strokeWidth="0"
                x="-5"
                y="35"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                {rd3tProps.nodeDatum.name}
              </text>
              {rd3tProps.nodeDatum.attributes?.department && (
                <text
                  fill="black"
                  x="-5"
                  y="50"
                  strokeWidth="0"
                  style={{ fontSize: "12px" }}
                >
                  Department: {rd3tProps.nodeDatum.attributes?.department}
                </text>
              )}
            </g>
          )}
          enableLegacyTransitions
        />
      </div>
    </div>
  )
}
