import dayjs from "dayjs"
import { FormattedPollenData } from "./formatData"
import { useEffect, useState } from "react"

import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm"
import "chart.js/auto"
import { Chart } from "react-chartjs-2"

import { ChartOptions } from "chart.js"

// includes bar chart & line chart on same axis
export default function MultiChart({
    dateUpperLimit = dayjs("2024-07-24").valueOf(),
    dateLowerLimit = dayjs("2024-08-24").valueOf(),
    pollenData,
}: {
    dateUpperLimit: number
    dateLowerLimit: number
    pollenData: FormattedPollenData
}) {
    const { pollenTypes, pollenValues, dailyTotals } = pollenData
    const [maxPollenValue, setMaxPollenValue] = useState(80)
    const dateFormat = "DD/MM/YY"

    useEffect(() => {
        setMaxPollenValue(
            Math.max(...dailyTotals.filter(({ x }) => x <= dateUpperLimit && x >= dateLowerLimit).map(({ y }) => y))
        )
    }, [dailyTotals, dateLowerLimit, dateUpperLimit])

    const [chartData, setChartData] = useState(null as any)

    function selectColour(number: number) {
        const hue = number * 137.508 // use golden angle approximation
        return `hsl(${hue},50%,75%)`
    }

    useEffect(() => {
        setChartData({
            labels: pollenValues[0].map(({ x }) => dayjs(x).valueOf()),
            datasets: [
                ...pollenTypes.map((pollenType, index) => {
                    const numPollenTypes = pollenTypes.length
                    const towerEffectWeighting = 0.4

                    return {
                        label: pollenType,
                        data: pollenValues[index].map(({ x, y }) => ({ x, y: y * -1 })),
                        categoryPercentage:
                            1 -
                            towerEffectWeighting +
                            (towerEffectWeighting * (numPollenTypes - index)) / numPollenTypes,
                        barPercentage: 0.8,
                        type: "bar",
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
                        yAxisID: "yLine",
                    }
                }),
                {
                    label: "Total Pollen",
                    data: dailyTotals,
                    borderColor: "black",
                    // fill: true,

                    // backgroundColor: "red",
                    borderDash: [5, 5],
                    yAxisID: "yLine",
                    type: "line",
                },
            ],
        })
    }, [pollenTypes, pollenValues, dailyTotals])

    const chartOptions: ChartOptions = {
        plugins: {
            legend: { display: false },
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

        scales: {
            x: {
                stacked: true,
                // display: false,

                // The axis for this scale is determined from the first letter of the id as `'x'`
                // It is recommended to specify `position` and / or `axis` explicitly.
                type: "timeseries",

                min: dateLowerLimit,
                max: dateUpperLimit,
                // position: "top",
                title: { text: "Date", display: true },
                ticks: {
                    // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                    callback: function (val: string | number) {
                        // Show every 5th tick
                        return dayjs(val).format(dateFormat)
                    },
                },
            },

            y: {
                stacked: true,
                // reverse: true,
                min: -1 * maxPollenValue,
                max: maxPollenValue,

                title: {
                    display: true,
                    text: "Pollen grains per cubic metre of air",
                },

                ticks: {
                    // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                    callback: function (val: string | number, index: number) {
                        // Show every 5th tick
                        return Math.abs(val as number)
                    },
                },
            },

            yLine: {
                min: -1 * maxPollenValue,
                max: maxPollenValue,
                display: false,
            },
        },
    }

    // useEffect(() => {
    //     console.log({ chartData })
    // }, [chartData])

    return (
        <div className="flex">{chartData && <Chart type="line" data={chartData} options={chartOptions}></Chart>}</div>
    )
}
