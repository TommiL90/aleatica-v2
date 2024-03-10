import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
// import Chart from 'chart.js/auto'

interface Props {}

export default function LineChart(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  }

  useEffect(() => {
    if (canvasRef.current == null) {
      return
    }

    const ctx = canvasRef.current?.getContext('2d')

    if (ctx == null) {
      return
    }

    const gradient = ctx.createLinearGradient(0, 16, 0, 600)
    gradient.addColorStop(0, colors.purple.half)
    gradient.addColorStop(0.65, colors.purple.quarter)
    gradient.addColorStop(1, colors.purple.zero)

    const weight1 = [60.0, 40.2, 59.1, 61.4, 79.9, 30.2, 89.8, 58.6, 59.6, 59.2]
    const weight2 = [50.0, 20.2, 56.1, 31.4, 59.9, 69.2, 39.8, 28.6, 49.6, 39.2]

    const labels = [
      'Tarea 1',
      'Tarea 2',
      'Tarea 3',
      'Tarea 4',
      'Tarea 5',
      'Tarea 6',
      'Tarea 7',
      'Tarea 8',
      'Tarea 9',
      'Tarea 10',
    ]
    const data = {
      labels,
      datasets: [
        {
          backgroundColor: colors.indigo.default,
          label: 'Proyecto 1',
          data: weight1,
          // fill: true,
          borderWidth: 2,
          borderColor: colors.indigo.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.indigo.default,
          pointRadius: 3,
        },
        {
          backgroundColor: gradient,
          label: 'Proyecto 2',
          data: weight2,
          // fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    }
    const config: any = {
      type: 'line',
      data,
    }
    // const myLineChart = new Chart(ctx, config)

    // return function cleanup() {
    //   myLineChart.destroy()
    // }
  })

  return (
    <div className="App">
      <span>Ejecucion de proyectos comparados</span>
      <canvas id="myChart" ref={canvasRef} height="100" />
    </div>
  )
}
