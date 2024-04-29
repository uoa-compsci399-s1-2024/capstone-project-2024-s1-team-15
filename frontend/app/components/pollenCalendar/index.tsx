import { formatPollenData, FormattedPollenData } from "./formatData"

import PollenTypeInput from "./PollenTypeInput"
import dayjs from "dayjs"
import DateInput from "./DateInput"
import { PollenData } from "@/app/(cms)/pollen/edit/PollenDataType"
import { useEffect, useState } from "react"
import MultiChart from "./MultiChart"

export default function PollenCalendar({ pollenData }: { pollenData: PollenData }) {
    const dateLowerLimit = dayjs("2024-11-28").valueOf()
    const dateUpperLimit = dayjs("2024-12-2").valueOf()
    const [showingDateFilter, showDateFilter] = useState(false)
    const [showingPollenTypeFilter, showPollenTypeFilter] = useState(false)
    const [allPollenTypes, setAllPollenTypes] = useState<string[]>([])
    const [showingPollenTypes, showPollenTypes] = useState<string[]>([])

    const [formattedPollenData, setFormattedData] = useState<null | FormattedPollenData>(null)

    useEffect(() => {
        const formatted = formatPollenData(pollenData)
        setFormattedData(formatted)
        const allPollenNames = formatted.pollenTypes.map((pollenType) => pollenType)
        setAllPollenTypes(allPollenNames)
        showPollenTypes(allPollenNames)
        console.log({ allPollenNames })
    }, [pollenData])

    return (
        <>
            <div className="flex flex-col max-w-[100vw] h-[80vh]">
                {formattedPollenData && showingPollenTypes.length ? (
                    <div className="flex flex-col w-full h-[100vh]">
                        <MultiChart
                            dateUpperLimit={dateUpperLimit}
                            dateLowerLimit={dateLowerLimit}
                            pollenData={formattedPollenData}></MultiChart>
                    </div>
                ) : (
                    <p>No pollen types selected 🥲</p>
                )}
            </div>
        </>
    )
}
