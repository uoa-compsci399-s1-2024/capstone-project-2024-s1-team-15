import { PollenData } from "@/app/(cms)/pollen/edit/PollenDataType"
import dayjs from "dayjs"

// format that works well for charts
export type FormattedPollenData = {
    pollenTypes: string[]
    pollenValues: { x: number; y: number }[][]
    dailyTotals: { x: number; y: number }[]
}

export function formatPollenData(pollenData: PollenData): FormattedPollenData {
    const indexOfTotalCount = pollenData.findIndex((pollenType) => pollenType.pollenName === "Total pollen counted")

    const dailyTotals = pollenData[indexOfTotalCount].pollenValues
        .filter(({ value }) => value != undefined)
        .map(({ date, value }) => ({
            x: dayjs(date).valueOf(),
            y: value as number,
        }))

    pollenData = pollenData.slice(0, indexOfTotalCount)

    const pollenTypes = pollenData.map((row) => row.pollenName)

    const pollenValues = pollenData.map((row) => {
        return { ...row }.pollenValues
            .filter(({ value }) => value != undefined)
            .map(({ date, value }) => ({
                x: dayjs(date).valueOf(),
                y: value as number,
            }))
    })

    return { pollenTypes, pollenValues, dailyTotals }
}
