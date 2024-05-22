import { memo, useEffect, useState } from "react"
import dayjs from "dayjs"
import { PollenData } from "@aapc/types"
import icons from "@/app/lib/icons"
import { formatPollenData, FormattedPollenData } from "@/app/(cms)/pollen/components/util/formatData"
import Button from "@/app/components/Button"
import PollenTypeInput from "@/app/components/pollen/PollenTypeInput"
import DateInput from "@/app/components/pollen/DateInput"
import MultiChart from "@/app/components/pollen/MultiChart"
import { dateFormat } from "."
import { makeTimestampForDateMidday } from "./util"

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
            <div className="flex flex-col justify-between mt-2 sm:mt-3 md:mt-0">
                <div className={`flex flex-col flex-shrink-0 self-start bg-accent-dark mb-4 w-auto
                    -ml-pc px-[calc(theme(spacing.pc)+0.625rem)] pr-6 pb-2 mt-4 rounded-r-[2rem] gap-y-2 
                    
                    sm:-ml-pc-sm sm:px-[calc(theme(spacing.pc-sm)+0.75rem)] sm:pr-7 sm:pb-2.5 sm:gap-y-2.5
                    sm:max-w-[calc(100%+theme(spacing.pc-sm)-4rem)] sm:rounded-r-[3rem]
                    
                    md:-ml-pc-md md:px-[calc(theme(spacing.pc-md)+0.875rem)] md:gap-y-3 md:pb-3 md:pt-2 md:mt-0
                    md:rounded-br-[2rem] md:rounded-r-none md:max-w-[calc(100%+theme(spacing.pc-md)-5rem)]
                    
                    xl:-ml-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md))]
                    xl:pl-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md)+0.85rem)]
                    xl:max-w-[calc(100%+100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md)-5rem)]
                `}>
                    <h4 className="-mt-3 sm:-mt-4 md:mt-0 drop-shadow-md md:drop-shadow-none w-full">Filter by</h4>
                    <div className="flex gap-y-2 flex-col">
                        <Button
                            icon={icons.filter}
                            text={"Pollen Type"}
                            onClick={() => setShowsPollenTypeFilter(c => !c)}
                            className={"min-w-44"}
                        />
                        <div className={"pl-4"}>
                            {allPollenTypes && showsPollenTypeFilter && (
                                <PollenTypeInput
                                    allPollenTypes={allPollenTypes}
                                    setDisplayedPollenTypes={setDisplayedPollenTypes}
                                    setShowsDailyTotal={setShowsDailyTotal}
                                    showsDailyTotal={showsDailyTotal}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex gap-y-2 flex-col">
                        <Button
                            icon={icons.calendar}
                            text={"Date Range"}
                            onClick={() => setShowsDateFilter(c => !c)}
                            className={"min-w-44"}
                        />
                        <div className={"pl-4"}>
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
