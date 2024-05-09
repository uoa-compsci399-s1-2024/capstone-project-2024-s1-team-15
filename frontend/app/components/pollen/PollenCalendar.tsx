import { memo, useEffect, useState } from "react"
import dayjs from "dayjs"
import { PollenData } from "@aapc/types"
import { formatPollenData, FormattedPollenData } from "@/app/(cms)/pollen/components/util/formatData"
import PollenTypeInput from "@/app/components/pollen/PollenTypeInput"
import DateInput from "@/app/components/pollen/DateInput"
import MultiChart from "@/app/components/pollen/MultiChart"

const PollenCalendar = memo(function PollenCalendar({ pollenData }: { pollenData: PollenData[] }) {
    const [showsDateFilter, setShowsDateFilter] = useState(false)
    const [dateLowerLimit, setDateLowerLimit] = useState(dayjs("2024-11-28").valueOf())
    const [dateUpperLimit, setDateUpperLimit] = useState(dayjs("2024-12-2").valueOf())

    const [showsPollenTypeFilter, setShowsPollenTypeFilter] = useState(false)
    const [allPollenTypes, setAllPollenTypes] = useState<string[]>([])
    const [displayedPollenTypes, setDisplayedPollenTypes] = useState<string[]>([])

    const [formattedPollenData, setFormattedPollenData] = useState<null | FormattedPollenData>(null)
    const [filteredPollenData, setFilteredPollenData] = useState<null | FormattedPollenData>(null)

    useEffect(() => {
        const formatted = formatPollenData(pollenData)
        setFormattedPollenData(formatted)

        const allPollenNames = formatted.pollenTypes.map((pollenType) => pollenType)
        setAllPollenTypes(allPollenNames)
        setDisplayedPollenTypes(allPollenNames)
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
            <div className="flex justify-between">
                <div className="flex flex-col gap-4 bg-purpletwo px-5 py-5">
                    <p>Filter by</p>
                    <div className="flex gap-4 items-center">
                        <button
                            className="button w-40 inline-block  text-nowrap"
                            onClick={() => setShowsPollenTypeFilter((currentState) => !currentState)}>
                            Pollen Type
                        </button>
                    </div>

                    <div className="flex gap-4 items-center">
                        <button
                            className="button w-40 inline-block"
                            onClick={() => setShowsDateFilter((currentState) => !currentState)}>
                            Date
                        </button>
                    </div>
                    <div>
                        {allPollenTypes && showsPollenTypeFilter && (
                        <PollenTypeInput
                            allPollenTypes={allPollenTypes}
                            displayPollenTypes={setDisplayedPollenTypes}/>
                        )}
                        {showsDateFilter && (
                        <DateInput
                            lowerLimit={dateLowerLimit}
                            upperLimit={dateUpperLimit}
                            setUpperLimit={setDateUpperLimit}
                            setLowerLimit={setDateLowerLimit}/>
                        )}
                    </div>
                </div>

                {filteredPollenData && displayedPollenTypes.length ? (
                    <div className="flex flex-col mt-8">
                        <MultiChart
                            dateUpperLimit={dateUpperLimit}
                            dateLowerLimit={dateLowerLimit}
                            pollenData={filteredPollenData}></MultiChart>
                    </div>
                ) : (
                    <p>No pollen types selected :/</p>
                )}
            </div>
        </>
    )
})

export default PollenCalendar
