"use client"

import dayjs from "dayjs"
import { FormattedPollenData } from "../../lib/pollenData/formatData"
import { memo } from "react"
import { dateFormat } from "."

import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm"
import "chart.js/auto"
import zoomPlugin from "chartjs-plugin-zoom"
import { Chart } from "react-chartjs-2"

import { ChartOptions, Chart as ChartJS } from "chart.js"
ChartJS.register(zoomPlugin)

type Props = {
    dateUpperLimit: number
    dateLowerLimit: number
    showsDailyTotal: boolean
    pollenData: FormattedPollenData
}

// includes bar chart & line chart on same axis
const MultiChart = memo(function MultiChart({
    dateUpperLimit = dayjs("2024-07-24").valueOf(),
    dateLowerLimit = dayjs("2024-08-24").valueOf(),
    pollenData,
    showsDailyTotal,
}: Props) {
    const { pollenTypes, pollenValues, dailyTotals } = pollenData

    const chartData = {
        labels: pollenValues[0].map(({ x }) => dayjs(x).valueOf()),
        datasets: [
            ...pollenTypes.map((pollenType, index) => {
                const numPollenTypes = pollenTypes.length
                const towerEffectWeighting = 0.4

                return {
                    label: pollenType,
                    data: pollenValues[index].map(({ x, y }) => ({ x, y: y * -1 })),
                    categoryPercentage:
                        1 - towerEffectWeighting + (towerEffectWeighting * (numPollenTypes - index)) / numPollenTypes,
                    barPercentage: 0.8,
                    type: "bar",
                    stack: "barStack",
                    backgroundColor: selectColour(index),
                    borderColor: selectColour(index),
                }
            }),

            ...pollenTypes.map((pollenType, index) => {
                return {
                    data: pollenValues[index],
                    label: pollenType,
                    type: "line",
                    borderColor: selectColour(index),
                    backgroundColor: selectColour(index),
                }
            }),

            showsDailyTotal && {
                label: "Total Pollen",
                data: dailyTotals,
                borderColor: "black",

                borderDash: [5, 5],
                type: "line",
            },
        ],
    }

    const chartOptions: ChartOptions = {
        plugins: {
            legend: {
                labels: {
                    filter: (item, _) =>
                        item.datasetIndex != undefined &&
                        ((item.datasetIndex >= 0 && item.datasetIndex < pollenTypes.length) ||
                            (showsDailyTotal && item.text === "Total Pollen")),
                },
            },
            zoom: {
                limits: {
                    x: {
                        min: dateLowerLimit,
                        max: dateUpperLimit + 50,
                    },
                },
                zoom: {
                    mode: "x",

                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                },
                pan: {
                    enabled: true,
                    mode: "x",
                },
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        return "Date: " + dayjs(context[0].parsed.x).format(dateFormat)
                    },
                    label: function (context) {
                        let label = context.dataset.label || ""

                        if (label) {
                            label += ": "
                        }
                        if (context.parsed.y !== null) {
                            label += Math.abs(context.parsed.y)
                        }
                        return label
                    },
                },
            },
        },

        maintainAspectRatio: false,
        parsing: false,

        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                },

                min: dateLowerLimit,
                max: dateUpperLimit + 50, //+50ms so right most pollen values don't get cut off from chart
                title: { text: "Date", display: true },
                ticks: {
                    // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                    callback: function (val: string | number) {
                        return dayjs(val).format(dateFormat)
                    },
                },
            },

            y: {
                suggestedMin: -10,
                suggestedMax: 10,
                title: {
                    display: true,
                    text: "Pollen grains per cubic metre of air",
                },

                ticks: {
                    // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                    callback: function (val: string | number, _: number) {
                        return Math.abs(val as number)
                    },
                },
            },
        },
    }

    function selectColour(number: number) {
        const hue = number * 137.508 // use golden angle approximation
        return `hsl(${hue},50%,75%)`
    }

    return (
        <div className="flex">
            {chartData && (
                <Chart type="line" id="multi-chart" data={chartData as any} options={chartOptions} height="420"></Chart>
            )}
        </div>
    )
})

export default MultiChart
