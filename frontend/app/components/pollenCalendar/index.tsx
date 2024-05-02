import { formatPollenData, FormattedPollenData } from "./formatData"

import PollenTypeInput from "./PollenTypeInput"
import dayjs from "dayjs"
import DateInput from "./DateInput"
import { PollenData } from "@aapc/types"
import { memo, useEffect, useState } from "react"
import MultiChart from "./MultiChart"

const PollenCalendar = memo(function PollenCalendar({ pollenData }: { pollenData: PollenData[] }) {
    const [showingDateFilter, showDateFilter] = useState(false)
    const [dateLowerLimit, setDateLowerLimit] = useState(dayjs("2024-11-28").valueOf())
    const [dateUpperLimit, setDateUpperLimit] = useState(dayjs("2024-12-2").valueOf())

    const [showingPollenTypeFilter, showPollenTypeFilter] = useState(false)
    const [allPollenTypes, setAllPollenTypes] = useState<string[]>([])
    const [displayedPollenTypes, displayPollenTypes] = useState<string[]>([])

    const [formattedPollenData, setFormattedPollenData] = useState<null | FormattedPollenData>(null)
    const [filteredPollenData, setFilteredPollenData] = useState<null | FormattedPollenData>(null)

    useEffect(() => {
        const formatted = formatPollenData(pollenData)
        setFormattedPollenData(formatted)

        const allPollenNames = formatted.pollenTypes.map((pollenType) => pollenType)
        setAllPollenTypes(allPollenNames)
        displayPollenTypes(allPollenNames)
    }, [pollenData])

    useEffect(() => {
        if (!formattedPollenData || !displayedPollenTypes.length) return setFilteredPollenData(null)

        const filtered: FormattedPollenData = {
            dailyTotals: formattedPollenData.dailyTotals,
            pollenTypes: [],
            pollenValues: [],
        }

        formattedPollenData.pollenTypes.map((pollenType, index) => {
            if (!displayedPollenTypes.includes(pollenType)) return

            filtered.pollenTypes.push(pollenType)
            filtered.pollenValues.push(formattedPollenData.pollenValues[index])
        })

        setFilteredPollenData(filtered)
    }, [formattedPollenData, displayedPollenTypes])

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col  gap-4">
                    <p>Filter by</p>
                    <div className="flex gap-4 items-center">
                        <button
                            className="button w-40 inline-block  text-nowrap"
                            onClick={() => showPollenTypeFilter((currentState) => !currentState)}>
                            Pollen Type
                        </button>
                        <div>
                            {allPollenTypes && showingPollenTypeFilter && (
                                <PollenTypeInput
                                    allPollenTypes={allPollenTypes}
                                    displayPollenTypes={displayPollenTypes}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <button
                            className="button w-40 inline-block"
                            onClick={() => showDateFilter((currentState) => !currentState)}>
                            Date
                        </button>
                        {showingDateFilter && (
                            <DateInput
                                lowerLimit={dateLowerLimit}
                                upperLimit={dateUpperLimit}
                                setUpperLimit={setDateUpperLimit}
                                setLowerLimit={setDateLowerLimit}
                            />
                        )}
                    </div>
                </div>

                {filteredPollenData && displayedPollenTypes.length ? (
                    <div className="flex flex-col w-full mt-8">
                        <MultiChart
                            dateUpperLimit={dateUpperLimit}
                            dateLowerLimit={dateLowerLimit}
                            pollenData={filteredPollenData}></MultiChart>
                    </div>
                ) : (
                    <p>No pollen types selected 🥲</p>
                )}
            </div>
        </>
    )
})

export default PollenCalendar
