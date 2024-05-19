import dayjs from "dayjs"
import { useState } from "react"
import { dateFormat } from "."
import { makeTimestampForDateMidday } from "./util"

export default function DateInput({
    lowerLimit,
    upperLimit,
    setUpperLimit,
    setLowerLimit,
    lowestPossibleValue = dayjs("2022-01-01").valueOf(), // first AAPC pollen data was after this date
    highestPossibleValue = dayjs().valueOf(), // AAPC can't have data for the future
}: any) {
    const lowerLimitString = dayjs(lowerLimit).format("YYYY-MM-DD")
    const upperLimitString = dayjs(upperLimit).format("YYYY-MM-DD")

    const [inputError, setInputError] = useState<null | string>(null)

    const errorMessage = (newDateValue: number) =>
        `No pollen data for ${dayjs(newDateValue).format(dateFormat)}. Possible date range for available data is from ${dayjs(lowestPossibleValue).format(dateFormat)} to ${dayjs(highestPossibleValue).format(dateFormat)}.`

    function dateWithinRange(date: number): boolean {
        return date >= lowestPossibleValue && date <= highestPossibleValue
    }

    return (
        <div>
            <label className="form-label">
                From
                <input
                    className="form-input"
                    type="date"
                    defaultValue={lowerLimitString}
                    onChange={(e) => {
                        const newDateValue = makeTimestampForDateMidday(e.target.valueAsNumber)
                        if (dateWithinRange(newDateValue)) {
                            setLowerLimit(newDateValue)
                            setInputError(null)
                        } else {
                            setInputError(errorMessage(newDateValue))
                        }
                    }}
                />
            </label>

            <label className="form-label">
                to
                <input
                    className="form-input"
                    type="date"
                    defaultValue={upperLimitString}
                    onChange={(e) => {
                        const newDateValue = makeTimestampForDateMidday(e.target.valueAsNumber)
                        if (dateWithinRange(newDateValue)) {
                            setUpperLimit(newDateValue)
                            setInputError(null)
                        } else {
                            setInputError(errorMessage(newDateValue))
                        }
                    }}
                />
            </label>
            {inputError && <p className="form-error">{inputError}</p>}
        </div>
    )
}
