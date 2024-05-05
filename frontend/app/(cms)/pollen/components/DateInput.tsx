import dayjs from "dayjs"

export default function DateInput({ lowerLimit, upperLimit, setUpperLimit, setLowerLimit }: any) {
    const lowerLimitString = dayjs(lowerLimit).format("YYYY-MM-DD")
    const upperLimitString = dayjs(upperLimit).format("YYYY-MM-DD")

    function makeTimestampForDateMidday(timestamp: number) {
        return dayjs(timestamp).set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).valueOf()
    }

    return (
        <div>
            <label className="form-label">
                From
                <input
                    className="form-input"
                    type="date"
                    defaultValue={lowerLimitString}
                    onChange={(e) => setLowerLimit(makeTimestampForDateMidday(e.target.valueAsNumber))}
                />
            </label>

            <label className="form-label">
                to
                <input
                    className="form-input"
                    type="date"
                    defaultValue={upperLimitString}
                    onChange={(e) => setUpperLimit(makeTimestampForDateMidday(e.target.valueAsNumber))}
                />
            </label>
        </div>
    )
}
