import { memo, useEffect, useState } from "react"
import dayjs from "dayjs"
import { PollenData } from "@aapc/types"
import { formatPollenData, FormattedPollenData } from "@/app/(cms)/pollen/components/util/formatData"
import PollenTypeInput from "@/app/components/pollen/PollenTypeInput"
import DateInput from "@/app/components/pollen/DateInput"
import MultiChart from "@/app/components/pollen/MultiChart"
import { makeTimestampForDateMidday } from "./util"
import { dateFormat } from "."

const PollenCalendar = memo(function PollenCalendar({ pollenData }: { pollenData: PollenData[] }) {
    const [showsDateFilter, setShowsDateFilter] = useState(false)
    const [dateLowerLimit, setDateLowerLimit] = useState(
        makeTimestampForDateMidday(dayjs().subtract(1, "week").valueOf())
    )
    const [dateUpperLimit, setDateUpperLimit] = useState(makeTimestampForDateMidday(dayjs().valueOf()))

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
        function isDateWithinFilterRange(date: number) {
            return dateLowerLimit <= date && date <= dateUpperLimit
        }

        if (!formattedPollenData || !displayedPollenTypes.length) return setFilteredPollenData(null)

        const filtered: FormattedPollenData = {
            dailyTotals: formattedPollenData.dailyTotals.filter(
                ({ x }, i) =>
                    isDateWithinFilterRange(x) ||
                    (i - 1 >= 0 && isDateWithinFilterRange(formattedPollenData.dailyTotals[i - 1].x)) ||
                    (i + 1 < formattedPollenData.dailyTotals.length &&
                        isDateWithinFilterRange(formattedPollenData.dailyTotals[i + 1].x))
            ),
            pollenTypes: [],
            pollenValues: [],
        }

        formattedPollenData.pollenTypes.map((pollenType, index) => {
            if (!displayedPollenTypes.includes(pollenType)) return

            let valuesInDateRange = formattedPollenData.pollenValues[index].filter(
                ({ x }, i) =>
                    isDateWithinFilterRange(x) ||
                    (i - 1 >= 0 && isDateWithinFilterRange(formattedPollenData.pollenValues[index][i - 1].x)) ||
                    (i + 1 < formattedPollenData.pollenValues[index].length &&
                        isDateWithinFilterRange(formattedPollenData.pollenValues[index][i + 1].x))
            )

            if (!valuesInDateRange.length) return

            filtered.pollenTypes.push(pollenType)
            filtered.pollenValues.push(valuesInDateRange)
        })

        if (!filtered.dailyTotals.length && !filtered.pollenValues.length) return setFilteredPollenData(null)

        setFilteredPollenData(filtered)
    }, [formattedPollenData, displayedPollenTypes, dateLowerLimit, dateUpperLimit])

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
            <div className="flex flex-col justify-between">
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
                ) : displayedPollenTypes.length ? (
                    <p>
                        No pollen data in range: {dayjs(dateLowerLimit).format(dateFormat)} to{" "}
                        {dayjs(dateUpperLimit).format(dateFormat)}. Try adjusting the date filter range above.
                    </p>
                ) : (
                    <p>No pollen types selected 🥲</p>
                )}
            </div>
        </>
    )
})

export default PollenCalendar
