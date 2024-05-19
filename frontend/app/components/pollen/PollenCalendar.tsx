import { memo, useEffect, useState } from "react"
import dayjs from "dayjs"
import { PollenData } from "@aapc/types"
import { formatPollenData, FormattedPollenData } from "@/app/(cms)/pollen/components/util/formatData"
import PollenTypeInput from "@/app/components/pollen/PollenTypeInput"
import DateInput from "@/app/components/pollen/DateInput"
import MultiChart from "@/app/components/pollen/MultiChart"

const PollenCalendar = memo(function PollenCalendar({ pollenData }: { pollenData: PollenData[] }) {
    const [showsDateFilter, setShowsDateFilter] = useState(false)
    const [dateLowerLimit, setDateLowerLimit] = useState(dayjs().subtract(1, "week").valueOf())
    const [dateUpperLimit, setDateUpperLimit] = useState(dayjs().valueOf())

    const [showsPollenTypeFilter, setShowsPollenTypeFilter] = useState(false)
    const [allPollenTypes, setAllPollenTypes] = useState<string[]>([])
    const [displayedPollenTypes, setDisplayedPollenTypes] = useState<string[]>([])
    const [showsDailyTotal, setShowsDailyTotal] = useState(true)

    const [formattedPollenData, setFormattedPollenData] = useState<null | FormattedPollenData>(null)
    const [filteredPollenData, setFilteredPollenData] = useState<null | FormattedPollenData>(null)

    useEffect(() => {
        if (!pollenData.length) return setFormattedPollenData(null)

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

    if (!pollenData.length)
        return (
            <>
                <br />
                <b>There is no pollen data at the moment, come back later 🙂</b>
                <br />
                <br />
            </>
        )

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col  gap-4">
                    <h3>Filter by</h3>

                    <div className="flex gap-4 items-center">
                        <button
                            className="button w-40 inline-block  text-nowrap"
                            onClick={() => setShowsPollenTypeFilter((currentState) => !currentState)}>
                            Pollen Type
                        </button>
                        <div>
                            {allPollenTypes && showsPollenTypeFilter && (
                                <PollenTypeInput
                                    allPollenTypes={allPollenTypes}
                                    displayPollenTypes={setDisplayedPollenTypes}
                                    setShowsDailyTotal={setShowsDailyTotal}
                                    showsDailyTotal={showsDailyTotal}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <button
                            className="button w-40 inline-block"
                            onClick={() => setShowsDateFilter((currentState) => !currentState)}>
                            Date
                        </button>
                        {showsDateFilter && (
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
                            pollenData={filteredPollenData}
                            showsDailyTotal={showsDailyTotal}
                        />
                    </div>
                ) : (
                    <p>No pollen types selected 🥲</p>
                )}
            </div>
        </>
    )
})

export default PollenCalendar
